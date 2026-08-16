let current=0;
const pages=[...document.querySelectorAll(".page")], dots=document.getElementById("dots"), label=document.getElementById("pageLabel");
pages.forEach((p,i)=>{const d=document.createElement("button");d.className="dot"+(i===0?" active":"");d.setAttribute("aria-label","Go to page "+(i+1));d.onclick=()=>goTo(i);dots.appendChild(d)});
function update(dir=1){
 pages.forEach((p,i)=>{p.classList.remove("active","prev");if(i===current)p.classList.add("active");else if(i<current)p.classList.add("prev")});
 [...dots.children].forEach((d,i)=>d.classList.toggle("active",i===current));
 label.textContent=`0${current+1} / ${pages[current].dataset.title.toUpperCase()}`;
}
function goTo(i){current=(i+pages.length)%pages.length;update()}
function nextPage(){goTo(current+1)}
function prevPage(){goTo(current-1)}
function openCard(){document.getElementById("envelope").classList.toggle("open")}
let wheelLock=false;
window.addEventListener("wheel",e=>{if(wheelLock)return;if(Math.abs(e.deltaY)<20)return;wheelLock=true;e.deltaY>0?nextPage():prevPage();setTimeout(()=>wheelLock=false,900)},{passive:true});
let startX=0,startY=0;
window.addEventListener("touchstart",e=>{startX=e.touches[0].clientX;startY=e.touches[0].clientY},{passive:true});
window.addEventListener("touchend",e=>{let dx=e.changedTouches[0].clientX-startX,dy=e.changedTouches[0].clientY-startY;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)){dx<0?nextPage():prevPage()}else if(Math.abs(dy)>60&&Math.abs(dy)>Math.abs(dx)){dy<0?nextPage():prevPage()}},{passive:true});
window.addEventListener("keydown",e=>{if(["ArrowRight","ArrowDown","PageDown"," "].includes(e.key)){e.preventDefault();nextPage()}if(["ArrowLeft","ArrowUp","PageUp"].includes(e.key)){e.preventDefault();prevPage()}});
window.addEventListener("load",()=>setTimeout(()=>{const l=document.getElementById("loader");l.style.opacity=0;setTimeout(()=>l.remove(),850)},700));
update();
