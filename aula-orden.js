// Reordenar tarjetas con el dedo o el ratón.
// Mantén pulsada una tarjeta (medio segundo) y arrástrala; o arrastra desde su asa «⠿» sin esperar.
// Uso: AULA_ORDEN(contenedor, ".selector-de-tarjeta", function(claves){ ... })
// Cada tarjeta lleva data-k con su clave; al soltar se llama a la función con las claves en el nuevo orden.
// La página puede volver a pintarse y llamar otra vez a AULA_ORDEN: los oyentes de la ventana se ponen una sola vez.
(function(){
  var ESPERA=450, TOLERA=8;
  var s=null; // arrastre en curso: {cont,sel,fin,item,timer,activo,x0,y0,dx0,dy0,px,py,movido}
  var raf=0;

  function tarjetas(){return Array.prototype.slice.call(s.cont.querySelectorAll(s.sel))}
  function limpiaTimer(){if(s&&s.timer){clearTimeout(s.timer);s.timer=null}}
  function coloca(){
    var it=s.item;it.style.transform="none";
    var r=it.getBoundingClientRect();
    it.style.transform="translate("+(s.px-s.dx0-r.left)+"px,"+(s.py-s.dy0-r.top)+"px)";
    return r;
  }
  function empieza(){
    s.activo=true;s.movido=false;
    s.item.classList.add("arrastrando");s.cont.classList.add("ordenando");
    var r=s.item.getBoundingClientRect();s.dx0=s.px-r.left;s.dy0=s.py-r.top;
    if(navigator.vibrate)try{navigator.vibrate(25)}catch(e){}
  }
  function mueve(){
    raf=0;if(!s||!s.activo)return;
    var r=coloca();
    var otras=tarjetas().filter(function(t){return t!==s.item});
    for(var i=0;i<otras.length;i++){
      var o=otras[i].getBoundingClientRect();
      if(s.px>=o.left&&s.px<=o.right&&s.py>=o.top&&s.py<=o.bottom){
        var fila=Math.abs(o.top-r.top)<o.height/2; // misma fila de la rejilla → decide por x
        var antes=fila?s.px<o.left+o.width/2:s.py<o.top+o.height/2;
        var ref=antes?otras[i]:otras[i].nextSibling;
        if(ref!==s.item&&s.item.nextSibling!==ref){s.cont.insertBefore(s.item,ref);s.movido=true;coloca()}
        break;
      }
    }
    if(s.py<70)window.scrollBy(0,-12);else if(s.py>window.innerHeight-90)window.scrollBy(0,12);
  }
  function termina(){
    if(!s)return;
    limpiaTimer();
    var a=s;s=null;
    if(!a.item)return;
    a.item.classList.remove("arrastrando");a.item.style.transform="";a.cont.classList.remove("ordenando");
    if(a.activo){
      // el toque final no abre el enlace de la tarjeta
      var tapa=function(e){e.preventDefault();e.stopPropagation()};
      a.item.addEventListener("click",tapa,true);setTimeout(function(){a.item.removeEventListener("click",tapa,true)},400);
      if(a.movido){
        var claves=Array.prototype.slice.call(a.cont.querySelectorAll(a.sel)).map(function(t){return t.getAttribute("data-k")});
        a.fin(claves);
      }
    }
  }

  window.addEventListener("pointermove",function(e){
    if(!s)return;
    s.px=e.clientX;s.py=e.clientY;
    if(!s.activo){if(Math.abs(s.px-s.x0)>TOLERA||Math.abs(s.py-s.y0)>TOLERA){limpiaTimer();s=null}return}
    if(!raf)raf=requestAnimationFrame(mueve);
  });
  // mientras se arrastra, el dedo no desplaza la página
  window.addEventListener("touchmove",function(e){if(s&&s.activo)e.preventDefault()},{passive:false});
  window.addEventListener("pointerup",termina);
  window.addEventListener("pointercancel",function(){if(s&&!s.activo){limpiaTimer();s=null}else termina()});
  window.addEventListener("contextmenu",function(e){if(s)e.preventDefault()});

  window.AULA_ORDEN=function(cont,sel,fin){
    cont.addEventListener("pointerdown",function(e){
      var t=e.target.closest(sel);if(!t||!cont.contains(t)||e.button>0)return;
      var asa=e.target.closest(".asa");
      if(!asa&&e.target.closest("button,input,select,textarea,summary"))return;
      termina();
      s={cont:cont,sel:sel,fin:fin,item:t,timer:null,activo:false,x0:e.clientX,y0:e.clientY,px:e.clientX,py:e.clientY};
      if(asa){e.preventDefault();empieza();return}
      s.timer=setTimeout(function(){if(s&&s.item===t){s.timer=null;empieza()}},ESPERA);
    });
  };
})();
