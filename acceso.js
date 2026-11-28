// Clave de acceso del espacio docente: una cortina, no una cerradura.
// Pide la clave antes de enseñar la página y la recuerda en este navegador.
// La clave no está aquí escrita: solo su huella cifrada (SHA-256). Para cambiarla: node tools/clave.js
// Si ACCESO_HUELLA está vacía, no se pide clave.
window.ACCESO_HUELLA = "";

(function(){
  var H=window.ACCESO_HUELLA,CLAVE="aula_acceso",SAL="aula-taller|";
  if(!H)return;
  var ok=false;try{ok=localStorage.getItem(CLAVE)===H}catch(e){}
  window.ACCESO_SALIR=function(){try{localStorage.removeItem(CLAVE)}catch(e){}location.reload()};
  if(ok)return;
  document.documentElement.classList.add("bloqueado");
  var css=document.createElement("style");
  css.textContent=
    "html.bloqueado body>*:not(#puerta){display:none!important}"+
    "#puerta{position:fixed;inset:0;display:grid;place-items:center;background:#16314F;color:#E8EEF5;padding:20px;z-index:99;font-family:'Atkinson Hyperlegible',system-ui,sans-serif}"+
    "#puerta form{width:min(360px,100%);display:grid;gap:12px}"+
    "#puerta .t{font-family:'Barlow Condensed','Arial Narrow',sans-serif;font-weight:700;font-size:2.2rem;line-height:1;text-transform:uppercase}"+
    "#puerta .s{opacity:.8;font-size:.95rem}"+
    "#puerta input{font:inherit;font-size:1.1rem;padding:.7rem .8rem;border-radius:10px;border:2px solid #4A5F78;background:#0B1826;color:#fff;min-height:3rem}"+
    "#puerta input:focus{outline:3px solid #8FA8FF;outline-offset:1px}"+
    "#puerta button{font:inherit;font-weight:700;font-size:1.05rem;border:0;border-radius:10px;padding:.7rem;background:#8FA8FF;color:#0B1826;min-height:3rem;cursor:pointer}"+
    "#puerta .mal{color:#FFB4B4;min-height:1.4em;font-size:.95rem}";
  document.head.appendChild(css);

  function huella(txt){
    return crypto.subtle.digest("SHA-256",new TextEncoder().encode(SAL+txt)).then(function(b){
      return Array.prototype.map.call(new Uint8Array(b),function(x){return ("0"+x.toString(16)).slice(-2)}).join("");
    });
  }
  function pinta(){
    var d=document.createElement("div");d.id="puerta";
    d.innerHTML='<form autocomplete="off"><div class="s">De Xurxo para el mundo</div><div class="t">Aula-taller de soldadura</div>'+
      '<label class="s" for="clavePuerta">Clave de acceso del profesorado</label>'+
      '<input id="clavePuerta" type="password" autocomplete="current-password" required>'+
      '<button type="submit">Entrar</button><div class="mal" role="alert"></div></form>';
    document.body.appendChild(d);
    var f=d.querySelector("form"),inp=d.querySelector("input"),mal=d.querySelector(".mal");
    inp.focus();
    f.addEventListener("submit",function(e){
      e.preventDefault();
      if(!window.crypto||!crypto.subtle){mal.textContent="Este navegador no puede comprobar la clave. Ábrela desde la web (https).";return}
      huella(inp.value.trim()).then(function(h){
        if(h===H){try{localStorage.setItem(CLAVE,H)}catch(e){}document.documentElement.classList.remove("bloqueado");d.remove()}
        else{mal.textContent="Clave incorrecta.";inp.select()}
      });
    });
  }
  if(document.body)pinta();else document.addEventListener("DOMContentLoaded",pinta);
})();
