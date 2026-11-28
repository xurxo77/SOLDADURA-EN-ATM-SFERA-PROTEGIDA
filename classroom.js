// Google Classroom desde la web, sin servidor.
// El profesor entra con su cuenta de Google (ventana de Google) y la web trabaja con sus permisos:
// lee sus clases, crea temas y crea materiales en borrador. La llave de acceso vive solo en la memoria
// de la página y caduca en una hora; no se guarda en ningún sitio.
// Necesita window.CLASSROOM_CLIENT_ID (classroom-config.js).
(function(){
  var SCOPES=[
    "https://www.googleapis.com/auth/classroom.courses.readonly",   // ver tus clases
    "https://www.googleapis.com/auth/classroom.topics",             // ver y crear temas
    "https://www.googleapis.com/auth/classroom.courseworkmaterials" // ver y crear materiales
  ].join(" ");
  var BASE="https://classroom.googleapis.com/v1/";
  var token=null,caduca=0;

  function fallo(msg,tipo){var e=new Error(msg);e.tipo=tipo||"";return e}

  function cargarGoogle(){
    return new Promise(function(ok,ko){
      if(window.google&&google.accounts&&google.accounts.oauth2)return ok();
      var s=document.createElement("script");s.src="https://accounts.google.com/gsi/client";s.async=true;
      s.onload=function(){ok()};s.onerror=function(){ko(fallo("No se pudo cargar el inicio de sesión de Google. ¿Hay conexión a internet?"))};
      document.head.appendChild(s);
    });
  }

  function conectar(){
    if(!window.CLASSROOM_CLIENT_ID)return Promise.reject(fallo("Falta el ID de cliente de Google.","sinid"));
    if(token&&Date.now()<caduca)return Promise.resolve(token);
    return cargarGoogle().then(function(){
      return new Promise(function(ok,ko){
        var cli=google.accounts.oauth2.initTokenClient({
          client_id:window.CLASSROOM_CLIENT_ID,scope:SCOPES,
          callback:function(r){
            if(r.error)return ko(fallo(r.error==="access_denied"?"No diste permiso a la web para usar Classroom.":"Google no dio acceso ("+r.error+")."));
            if(!google.accounts.oauth2.hasGrantedAllScopes(r,SCOPES.split(" ")[0],SCOPES.split(" ")[1],SCOPES.split(" ")[2]))
              return ko(fallo("Hay que marcar todas las casillas de permisos en la ventana de Google. Vuelve a entrar y márcalas.","permisos"));
            token=r.access_token;caduca=Date.now()+((+r.expires_in||3600)-60)*1000;ok(token);
          },
          error_callback:function(e){
            ko(fallo(e&&e.type==="popup_closed"?"Cerraste la ventana de Google antes de terminar.":
                     e&&e.type==="popup_failed_to_open"?"El navegador bloqueó la ventana de Google. Permite las ventanas emergentes para esta web y vuelve a probar.":
                     "No se pudo abrir la ventana de Google."));
          }
        });
        cli.requestAccessToken();
      });
    });
  }

  function traduce(status,j){
    var m=(j&&j.error&&j.error.message)||"",st=(j&&j.error&&j.error.status)||"";
    if(status===401){token=null;return fallo("La sesión con Google ha caducado. Vuelve a entrar.","sesion")}
    if(/has not been used|is disabled|SERVICE_DISABLED/i.test(m))return fallo("La API de Classroom no está activada en tu proyecto de Google Cloud (paso 2 de la guía).","api");
    if(status===403&&/ProjectPermissionDenied|Developer Preview|not authorized|administrator|admin/i.test(m))return fallo("Tu cuenta no deja a esta web usar Classroom. Lo decide el administrador del centro (o falta añadirte como usuario de prueba).","bloqueo");
    if(status===403)return fallo("Classroom no deja hacer esto con tu cuenta ("+m+").","permiso");
    if(status===404)return fallo("No se encuentra esa clase o ese tema en Classroom.","nohay");
    if(status===429)return fallo("Demasiadas peticiones seguidas. Espera un minuto y vuelve a probar.","limite");
    return fallo("Classroom respondió con un error ("+status+(st?" "+st:"")+"): "+m);
  }

  function api(metodo,ruta,cuerpo){
    return fetch(BASE+ruta,{method:metodo,headers:{"Authorization":"Bearer "+token,"Content-Type":"application/json"},body:cuerpo?JSON.stringify(cuerpo):undefined})
      .then(function(r){return r.json().catch(function(){return{}}).then(function(j){if(!r.ok)throw traduce(r.status,j);return j})},
            function(){throw fallo("No hay conexión con Classroom. Revisa internet.")});
  }
  // Recorre todas las páginas de una lista
  function todo(ruta,campo){
    var out=[];
    function pide(pt){
      return api("GET",ruta+(ruta.indexOf("?")<0?"?":"&")+"pageSize=100"+(pt?"&pageToken="+encodeURIComponent(pt):"")).then(function(j){
        out=out.concat(j[campo]||[]);return j.nextPageToken?pide(j.nextPageToken):out;
      });
    }
    return pide();
  }

  window.CR={
    configurado:function(){return !!window.CLASSROOM_CLIENT_ID},
    conectado:function(){return !!token&&Date.now()<caduca},
    conectar:conectar,
    // Clases activas en las que eres profesor
    clases:function(){return todo("courses?teacherId=me&courseStates=ACTIVE","courses")},
    temas:function(curso){return todo("courses/"+curso+"/topics","topic")},
    crearTema:function(curso,nombre){return api("POST","courses/"+curso+"/topics",{name:nombre})},
    materiales:function(curso){return todo("courses/"+curso+"/courseWorkMaterials?courseWorkMaterialStates=PUBLISHED&courseWorkMaterialStates=DRAFT","courseWorkMaterial")},
    // Material dentro de un tema, con sus enlaces.
    // como: {estado:"DRAFT"|"PUBLISHED", programado:"2026-12-01T08:00:00.000Z"} (programado: borrador que se publica solo)
    crearMaterial:function(curso,tema,titulo,descripcion,enlaces,como){
      como=como||{};
      var cuerpo={title:titulo,description:descripcion,topicId:tema,state:como.programado?"DRAFT":(como.estado||"DRAFT"),
        materials:enlaces.slice(0,20).map(function(u){return{link:{url:u}}})};
      if(como.programado)cuerpo.scheduledTime=como.programado;
      return api("POST","courses/"+curso+"/courseWorkMaterials",cuerpo);
    }
  };
})();
