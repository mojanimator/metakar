import{o as s,b as c,a as n,x as u,h as i,A as p}from"./app-2d4b6406.js";function v(e,o){return s(),c("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor","aria-hidden":"true"},[n("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"}),n("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M15 12a3 3 0 11-6 0 3 3 0 016 0z"})])}const h=["value"],x={__name:"Checkbox",props:{checked:{type:[Array,Boolean],default:!1},value:{default:null}},emits:["update:checked"],setup(e,{emit:o}){const d=e,t=u({get(){return d.checked},set(r){o("update:checked",r)}});return(r,a)=>i((s(),c("input",{type:"checkbox",value:e.value,"onUpdate:modelValue":a[0]||(a[0]=l=>t.value=l),class:"rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"},null,8,h)),[[p,t.value]])}};export{x as _,v as r};
