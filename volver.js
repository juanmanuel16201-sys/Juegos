/* Botón "Volver a juegos": se carga en cada juego y regresa al menú de discos.
   Primer toque lo despliega y el segundo vuelve, para no salir por accidente en medio de la partida. */
(() => {
  if (window.__volverJuegos) return;
  window.__volverJuegos = true;

  const css = `
  #volver-juegos{position:fixed;z-index:2147483647;top:calc(10px + env(safe-area-inset-top));left:calc(10px + env(safe-area-inset-left));
    display:flex;align-items:center;gap:0;height:34px;padding:0 9px;border-radius:17px;border:1px solid rgba(255,255,255,.35);
    background:rgba(8,12,28,.55);color:#fff;font:600 13px/1 system-ui,-apple-system,"Segoe UI",sans-serif;letter-spacing:.04em;
    backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);cursor:pointer;opacity:.6;
    transition:opacity .2s,gap .2s,background .2s;box-shadow:0 2px 10px rgba(0,0,0,.35);-webkit-tap-highlight-color:transparent;user-select:none}
  #volver-juegos .o{width:16px;height:16px;border-radius:50%;border:2px solid #fff;flex:none;position:relative}
  #volver-juegos .o::after{content:"";position:absolute;left:3px;top:50%;width:5px;height:5px;border-left:2px solid #fff;border-bottom:2px solid #fff;transform:translateY(-50%) rotate(45deg)}
  #volver-juegos span{max-width:0;overflow:hidden;white-space:nowrap;transition:max-width .25s}
  #volver-juegos.abierto,#volver-juegos:hover,#volver-juegos:focus-visible{opacity:1;gap:8px;background:rgba(8,12,28,.85)}
  #volver-juegos.abierto span,#volver-juegos:hover span,#volver-juegos:focus-visible span{max-width:160px}
  @media print{#volver-juegos{display:none}}`;

  const add = () => {
    if (document.getElementById("volver-juegos")) return;
    const st = document.createElement("style");
    st.textContent = css;
    document.head.appendChild(st);

    const b = document.createElement("button");
    b.id = "volver-juegos";
    b.type = "button";
    b.setAttribute("aria-label", "Volver al menú de juegos");
    b.innerHTML = '<i class="o"></i><span>Volver a juegos</span>';
    document.body.appendChild(b);

    let t = 0;
    const stop = e => { e.stopPropagation(); };
    ["pointerdown", "pointerup", "mousedown", "mouseup", "touchstart", "touchend", "keydown"].forEach(ev => b.addEventListener(ev, stop));
    b.addEventListener("click", e => {
      e.preventDefault(); e.stopPropagation();
      const tactil = matchMedia("(hover: none)").matches;
      if (tactil && !b.classList.contains("abierto")) {
        b.classList.add("abierto");
        clearTimeout(t);
        t = setTimeout(() => b.classList.remove("abierto"), 3000);
        return;
      }
      if (document.fullscreenElement) { try { document.exitFullscreen(); } catch (_) {} }
      location.href = "../";
    });
  };

  if (document.body) add(); else document.addEventListener("DOMContentLoaded", add);
})();
