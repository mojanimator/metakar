import{S as b}from"./Scaffold-7fe58d4a.js";import{P as _}from"./Panel-590b1c9e.js";import{Z as f,i as k,r as l,o as d,c as y,w as c,a as s,t as r,d as h,b as p,z as v,F as w,g as n}from"./app-13053125.js";import{_ as j}from"./_plugin-vue_export-helper-c27b6911.js";import{l as C}from"./WindowIcon-57bef033.js";import{r as O}from"./TicketIcon-f301fe8b.js";import"./Image-78bbee45.js";import"./UserIcon-a7b72702.js";import"./Navbar.vue_vue_type_style_index_0_lang-836f2738.js";import"./ApplicationLogo-82d085b2.js";const z={data(){return{open:!1,isDark:!1,loading:!1,showDialog:!1,isMobileMainMenuOpen:!1,isMobileSubMenuOpen:!1,isOn:!1,user:this.$page.props.auth.user,tickets:this.$page.props.tickets}},components:{Panel:_,Scaffold:b,CurrencyDollarIcon:C,TicketIcon:O,Head:f,Link:k},mounted(){}},D={class:"flex items-center justify-between px-4 py-2 border-b lg:py-4 dark:border-primary-darker"},I={class:"text-2xl font-semibold"},L={class:"mt-2"},B={class:"grid grid-cols-1 gap-8 p-4 lg:grid-cols-2 xl:grid-cols-3"},M={class:"flex shadow-sm items-center justify-between p-4 bg-white rounded-lg dark:bg-darker"},P={class:"text-xs font-bold py-2 tracking-wider text-gray-500 uppercase dark:text-primary-light"},S={class:"text-xl font-semibold"},T={class:"flex flex-col grow"},F={class:"text-xs font-bold py-2 tracking-wider text-gray-500 uppercase dark:text-primary-light"},N={class:"justify-center flex"},U={class:"align-middle flex flex-col text-center"},V={class:"flex"},A={class:"grid grid-cols-1 p-4 space-y-8 lg:gap-8 lg:space-y-0 lg:grid-cols-3"},E={class:"col-span-2 bg-white rounded-md dark:bg-darker","x-data":"{ isOn: false }"},H={class:"flex items-center justify-between p-4 border-b dark:border-primary"},Z=s("h4",{class:"text-lg font-semibold text-gray-500 dark:text-light"},"Bar Chart",-1),q={class:"flex items-center space-x-2"},G=s("span",{class:"text-sm text-gray-500 dark:text-light"},"Last year",-1),J=s("div",{class:"w-12 h-6 transition rounded-full outline-none bg-primary-100 dark:bg-primary-darker"},null,-1),K=s("div",{class:"relative p-4 h-72"},[s("div",{class:"chartjs-size-monitor"},[s("div",{class:"chartjs-size-monitor-expand"},[s("div",{class:""})]),s("div",{class:"chartjs-size-monitor-shrink"},[s("div",{class:""})])]),s("canvas",{id:"barChart",style:{display:"block",width:"505px",height:"256px"},width:"505",height:"256",class:"chartjs-render-monitor"})],-1),Q={class:"bg-white rounded-md dark:bg-darker","x-data":"{ isOn: false }"},R={class:"flex items-center justify-between p-4 border-b dark:border-primary"},W=s("h4",{class:"text-lg font-semibold text-gray-500 dark:text-light"},"Doughnut Chart",-1),X={class:"flex items-center"},Y=s("div",{class:"w-12 h-6 transition rounded-full outline-none bg-primary-100 dark:bg-primary-darker"},null,-1),$=s("div",{class:"relative p-4 h-72"},[s("div",{class:"chartjs-size-monitor"},[s("div",{class:"chartjs-size-monitor-expand"},[s("div",{class:""})]),s("div",{class:"chartjs-size-monitor-shrink"},[s("div",{class:""})])]),s("canvas",{id:"doughnutChart",width:"505",height:"256",style:{display:"block",width:"505px",height:"256px"},class:"chartjs-render-monitor"})],-1),ss={class:"grid grid-cols-1 p-4 space-y-8 lg:gap-8 lg:space-y-0 lg:grid-cols-3"},es=s("div",{class:"col-span-1 bg-white rounded-md dark:bg-darker"},[s("div",{class:"p-4 border-b dark:border-primary"},[s("h4",{class:"text-lg font-semibold text-gray-500 dark:text-light"},"Active users right now")]),s("p",{class:"p-4"},[s("span",{class:"text-2xl font-medium text-gray-500 dark:text-light",id:"usersCount"},"104"),s("span",{class:"text-sm font-medium text-gray-500 dark:text-primary"},"Users")]),s("div",{class:"relative p-4"},[s("div",{class:"chartjs-size-monitor"},[s("div",{class:"chartjs-size-monitor-expand"},[s("div",{class:""})]),s("div",{class:"chartjs-size-monitor-shrink"},[s("div",{class:""})])]),s("canvas",{id:"activeUsersChart",width:"505",height:"150",style:{display:"block",width:"505px",height:"150px"},class:"chartjs-render-monitor"})])],-1),ts={class:"col-span-2 bg-white rounded-md dark:bg-darker","x-data":"{ isOn: false }"},rs={class:"flex items-center justify-between p-4 border-b dark:border-primary"},is=s("h4",{class:"text-lg font-semibold text-gray-500 dark:text-light"},"Line Chart",-1),as={class:"flex items-center"},ns=s("div",{class:"w-12 h-6 transition rounded-full outline-none bg-primary-100 dark:bg-primary-darker"},null,-1),os=s("div",{class:"relative p-4 h-72"},[s("div",{class:"chartjs-size-monitor"},[s("div",{class:"chartjs-size-monitor-expand"},[s("div",{class:""})]),s("div",{class:"chartjs-size-monitor-shrink"},[s("div",{class:""})])]),s("canvas",{id:"lineChart",width:"505",height:"256",style:{display:"block",width:"505px",height:"256px"},class:"chartjs-render-monitor"})],-1);function ls(t,i,ds,cs,e,hs){const m=l("CurrencyDollarIcon"),g=l("TicketIcon"),u=l("Link"),x=l("Panel");return d(),y(x,null,{header:c(()=>[s("title",null,r(t.__("panel")),1)]),content:c(()=>[s("div",D,[s("h1",I,r(t.__("statistics")),1)]),s("div",L,[s("div",B,[s("div",M,[s("div",null,[s("h6",P,r(t.__("wallet")),1),s("span",S,r(t.asPrice(e.user.wallet))+" "+r(t.__("currency")),1)]),s("div",null,[h(m,{class:"w-12 h-12 text-primary-300 dark:text-pink-50"})])]),h(u,{href:t.route("panel.ticket.index"),class:"flex hover:scale-[101%] transition duration-300 cursor-pointer shadow-sm items-center justify-around p-4 bg-white rounded-lg dark:bg-darker"},{default:c(()=>[s("div",T,[s("h6",F,r(t.__("tickets")),1),s("div",N,[(d(!0),p(w,null,v(e.tickets,(a,o)=>(d(),p("span",U,[s("span",{class:n([o==0?"text-red-500":o==1?"text-primary-500":"text-green-500","text-xl font-semibold"])},r(a.value),3),s("span",{class:n([o==0?"bg-red-100 text-red-500":o==1?"bg-primary-100 text-primary-500":"bg-green-100 text-green-500","mx-1 px-2 py-1 text-xs rounded-md"])},r(a.title),3)]))),256))])]),s("div",V,[h(g,{class:"w-12 h-12 text-primary-300 dark:text-pink-50"})])]),_:1},8,["href"])]),s("div",A,[s("div",E,[s("div",H,[Z,s("div",q,[G,s("button",{class:"relative focus:outline-none",onClick:i[0]||(i[0]=a=>{e.isOn=!e.isOn})},[J,s("div",{class:n(["absolute top-0 left-0 inline-flex items-center justify-center w-6 h-6 transition-all duration-200 ease-in-out transform scale-110 rounded-full shadow-sm translate-x-0 bg-white dark:bg-primary-100",{"translate-x-0  bg-white dark:bg-primary-100":!e.isOn,"translate-x-6 bg-primary-light dark:bg-primary":e.isOn}])},null,2)])])]),K]),s("div",Q,[s("div",R,[W,s("div",X,[s("button",{class:"relative focus:outline-none",onClick:i[1]||(i[1]=a=>{e.isOn=!e.isOn,t.$parent.updateDoughnutChart(e.isOn)})},[Y,s("div",{class:n(["absolute top-0 left-0 inline-flex items-center justify-center w-6 h-6 transition-all duration-200 ease-in-out transform scale-110 rounded-full shadow-sm translate-x-0 bg-white dark:bg-primary-100",{"translate-x-0  bg-white dark:bg-primary-100":!e.isOn,"translate-x-6 bg-primary-light dark:bg-primary":e.isOn}])},null,2)])])]),$])]),s("div",ss,[es,s("div",ts,[s("div",rs,[is,s("div",as,[s("button",{class:"relative focus:outline-none",onClick:i[2]||(i[2]=a=>{e.isOn=!e.isOn,t.$parent.updateLineChart()})},[ns,s("div",{class:n(["absolute top-0 left-0 inline-flex items-center justify-center w-6 h-6 transition-all duration-200 ease-in-out transform scale-110 rounded-full shadow-sm translate-x-0 bg-white dark:bg-primary-100",{"translate-x-0  bg-white dark:bg-primary-100":!e.isOn,"translate-x-6 bg-primary-light dark:bg-primary":e.isOn}])},null,2)])])]),os])])])]),_:1})}const vs=j(z,[["render",ls]]);export{vs as default};
