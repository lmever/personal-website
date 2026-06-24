import{j as o}from"./jsx-runtime.u17CrQMm.js";import{a}from"./index.UEuQJ2Tp.js";const i=["♪","♫","♬","♩","♭","♮","♯"];function f({position:s="bottom-right"}){const n=a.useRef(null);a.useEffect(()=>{if(!n.current)return;const m=n.current,r=[];for(let t=0;t<8;t++){const e=document.createElement("span");e.textContent=i[t%i.length],e.style.cssText=`
        position: absolute;
        font-size: ${12+Math.random()*16}px;
        color: rgba(249, 115, 22, ${.3+Math.random()*.3});
        left: ${Math.random()*100}%;
        bottom: ${Math.random()*100}%;
        animation: float-up ${4+Math.random()*4}s ease-in-out infinite;
        animation-delay: ${Math.random()*3}s;
        opacity: 0;
        pointer-events: none;
        user-select: none;
      `,m.appendChild(e),r.push(e)}return()=>{r.forEach(t=>t.remove())}},[]);const c={"top-left":"top: 5.5rem; left: calc((100% - 100vw) / 2 + 0.5rem);","top-right":"top: 0; right: 0;","bottom-left":"bottom: 0; left: 0;","bottom-right":"bottom: 0; right: 0;"};return o.jsxs(o.Fragment,{children:[o.jsx("style",{children:`
        @keyframes float-up {
          0% {
            opacity: 0;
            transform: translateY(0) rotate(0deg) scale(0.5);
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-80px) rotate(20deg) scale(1.2);
          }
        }

        .music-decor-container {
          position: absolute;
          width: 200px;
          height: 200px;
          overflow: visible;
          z-index: 1;
          pointer-events: none;
          ${c[s]}
        }

        @media (max-width: 768px) {
          .music-decor-container {
            width: 120px;
            height: 120px;
            opacity: 0.6;
          }
        }
      `}),o.jsx("div",{ref:n,className:"music-decor-container"})]})}export{f as default};
