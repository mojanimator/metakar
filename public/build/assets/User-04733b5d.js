import{P as _}from"./User-ae2603de.js";import{L as b,Z as f,i as k,r as l,o as d,c as y,w as c,a as s,t as r,g as i,d as h,b as p,y as v,F as w}from"./app-2d4b6406.js";import{_ as j}from"./_plugin-vue_export-helper-c27b6911.js";import{l as C}from"./WindowIcon-752cae65.js";import{r as O}from"./TicketIcon-969ab163.js";import"./Image-c24fded1.js";import"./UserIcon-0596f151.js";import"./Footer-dd647fe5.js";import"./ApplicationLogo-5729ac50.js";const z={setup(t){b(()=>{})},data(){return{open:!1,isDark:!1,loading:!1,showDialog:!1,isMobileMainMenuOpen:!1,isMobileSubMenuOpen:!1,isOn:!1,user:this.$page.props.auth.user,tickets:this.$page.props.tickets,cardShadow:"shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]"}},components:{Panel:_,CurrencyDollarIcon:C,TicketIcon:O,Head:f,Link:k},mounted(){},methods:{}},D={class:"flex items-center justify-between px-4 py-2 border-b lg:py-4 dark:border-primary-darker"},L={class:"text-2xl font-semibold"},I={class:"mt-2"},B={class:"grid grid-cols-1 gap-8 p-4 lg:grid-cols-2 xl:grid-cols-3"},M={class:"text-xs font-bold py-2 tracking-wider text-gray-500 uppercase dark:text-primary-light"},P={class:"text-xl font-semibold"},S={class:"flex flex-col grow"},T={class:"text-xs font-bold py-2 tracking-wider text-gray-500 uppercase dark:text-primary-light"},U={class:"justify-center flex"},E={class:"align-middle flex flex-col text-center"},F={class:"flex"},N={class:"grid grid-cols-1 p-4 space-y-8 lg:gap-8 lg:space-y-0 lg:grid-cols-3"},V={class:"col-span-2 bg-white rounded-md dark:bg-darker","x-data":"{ isOn: false }"},A={class:"flex items-center justify-between p-4 border-b dark:border-primary"},H=s("h4",{class:"text-lg font-semibold text-gray-500 dark:text-light"},"Bar Chart",-1),Z={class:"flex items-center space-x-2"},q=s("span",{class:"text-sm text-gray-500 dark:text-light"},"Last year",-1),G=s("div",{class:"w-12 h-6 transition rounded-full outline-none bg-primary-100 dark:bg-primary-darker"},null,-1),J=s("div",{class:"relative p-4 h-72"},[s("div",{class:"chartjs-size-monitor"},[s("div",{class:"chartjs-size-monitor-expand"},[s("div",{class:""})]),s("div",{class:"chartjs-size-monitor-shrink"},[s("div",{class:""})])]),s("canvas",{id:"barChart",style:{display:"block",width:"505px",height:"256px"},width:"505",height:"256",class:"chartjs-render-monitor"})],-1),K={class:"bg-white rounded-md dark:bg-darker","x-data":"{ isOn: false }"},Q={class:"flex items-center justify-between p-4 border-b dark:border-primary"},R=s("h4",{class:"text-lg font-semibold text-gray-500 dark:text-light"},"Doughnut Chart",-1),W={class:"flex items-center"},X=s("div",{class:"w-12 h-6 transition rounded-full outline-none bg-primary-100 dark:bg-primary-darker"},null,-1),Y=s("div",{class:"relative p-4 h-72"},[s("div",{class:"chartjs-size-monitor"},[s("div",{class:"chartjs-size-monitor-expand"},[s("div",{class:""})]),s("div",{class:"chartjs-size-monitor-shrink"},[s("div",{class:""})])]),s("canvas",{id:"doughnutChart",width:"505",height:"256",style:{display:"block",width:"505px",height:"256px"},class:"chartjs-render-monitor"})],-1),$={class:"grid grid-cols-1 p-4 space-y-8 lg:gap-8 lg:space-y-0 lg:grid-cols-3"},ss=s("div",{class:"col-span-1 bg-white rounded-md dark:bg-darker"},[s("div",{class:"p-4 border-b dark:border-primary"},[s("h4",{class:"text-lg font-semibold text-gray-500 dark:text-light"},"Active users right now")]),s("p",{class:"p-4"},[s("span",{class:"text-2xl font-medium text-gray-500 dark:text-light",id:"usersCount"},"104"),s("span",{class:"text-sm font-medium text-gray-500 dark:text-primary"},"Users")]),s("div",{class:"relative p-4"},[s("div",{class:"chartjs-size-monitor"},[s("div",{class:"chartjs-size-monitor-expand"},[s("div",{class:""})]),s("div",{class:"chartjs-size-monitor-shrink"},[s("div",{class:""})])]),s("canvas",{id:"activeUsersChart",width:"505",height:"150",style:{display:"block",width:"505px",height:"150px"},class:"chartjs-render-monitor"})])],-1),es={class:"col-span-2 bg-white rounded-md dark:bg-darker","x-data":"{ isOn: false }"},ts={class:"flex items-center justify-between p-4 border-b dark:border-primary"},rs=s("h4",{class:"text-lg font-semibold text-gray-500 dark:text-light"},"Line Chart",-1),is={class:"flex items-center"},as=s("div",{class:"w-12 h-6 transition rounded-full outline-none bg-primary-100 dark:bg-primary-darker"},null,-1),ns=s("div",{class:"relative p-4 h-72"},[s("div",{class:"chartjs-size-monitor"},[s("div",{class:"chartjs-size-monitor-expand"},[s("div",{class:""})]),s("div",{class:"chartjs-size-monitor-shrink"},[s("div",{class:""})])]),s("canvas",{id:"lineChart",width:"505",height:"256",style:{display:"block",width:"505px",height:"256px"},class:"chartjs-render-monitor"})],-1);function os(t,a,ls,ds,e,cs){const g=l("CurrencyDollarIcon"),m=l("TicketIcon"),u=l("Link"),x=l("Panel");return d(),y(x,null,{header:c(()=>[s("title",null,r(t.__("panel")),1)]),content:c(()=>[s("div",D,[s("h1",L,r(t.__("statistics")),1)]),s("div",I,[s("div",B,[s("div",{class:i([e.cardShadow,"flex items-center justify-between p-4 bg-white rounded-lg dark:bg-darker"])},[s("div",null,[s("h6",M,r(t.__("wallet")),1),s("span",P,r(t.asPrice(e.user.wallet))+" "+r(t.__("currency")),1)]),s("div",null,[h(g,{class:"w-12 h-12 text-primary-300 dark:text-pink-50"})])],2),h(u,{href:t.route("panel.ticket.index"),class:i([e.cardShadow,"flex hover:scale-[101%] transition duration-300 cursor-pointer items-center justify-around p-4 bg-white rounded-lg dark:bg-darker"])},{default:c(()=>[s("div",S,[s("h6",T,r(t.__("tickets")),1),s("div",U,[(d(!0),p(w,null,v(e.tickets,(n,o)=>(d(),p("span",E,[s("span",{class:i([o==0?"text-red-500":o==1?"text-primary-500":"text-green-500","text-xl font-semibold"])},r(n.value),3),s("span",{class:i([o==0?"bg-red-100 text-red-500":o==1?"bg-primary-100 text-primary-500":"bg-green-100 text-green-500","mx-1 px-2 py-1 text-xs rounded-md"])},r(n.title),3)]))),256))])]),s("div",F,[h(m,{class:"w-12 h-12 text-primary-300 dark:text-pink-50"})])]),_:1},8,["href","class"])]),s("div",N,[s("div",V,[s("div",A,[H,s("div",Z,[q,s("button",{class:"relative focus:outline-none",onClick:a[0]||(a[0]=n=>{e.isOn=!e.isOn})},[G,s("div",{class:i(["absolute top-0 left-0 inline-flex items-center justify-center w-6 h-6 transition-all duration-200 ease-in-out transform scale-110 rounded-full shadow-sm translate-x-0 bg-white dark:bg-primary-100",{"translate-x-0  bg-white dark:bg-primary-100":!e.isOn,"translate-x-6 bg-primary-light dark:bg-primary":e.isOn}])},null,2)])])]),J]),s("div",K,[s("div",Q,[R,s("div",W,[s("button",{class:"relative focus:outline-none",onClick:a[1]||(a[1]=n=>{e.isOn=!e.isOn,t.$parent.updateDoughnutChart(e.isOn)})},[X,s("div",{class:i(["absolute top-0 left-0 inline-flex items-center justify-center w-6 h-6 transition-all duration-200 ease-in-out transform scale-110 rounded-full shadow-sm translate-x-0 bg-white dark:bg-primary-100",{"translate-x-0  bg-white dark:bg-primary-100":!e.isOn,"translate-x-6 bg-primary-light dark:bg-primary":e.isOn}])},null,2)])])]),Y])]),s("div",$,[ss,s("div",es,[s("div",ts,[rs,s("div",is,[s("button",{class:"relative focus:outline-none",onClick:a[2]||(a[2]=n=>{e.isOn=!e.isOn,t.$parent.updateLineChart()})},[as,s("div",{class:i(["absolute top-0 left-0 inline-flex items-center justify-center w-6 h-6 transition-all duration-200 ease-in-out transform scale-110 rounded-full shadow-sm translate-x-0 bg-white dark:bg-primary-100",{"translate-x-0  bg-white dark:bg-primary-100":!e.isOn,"translate-x-6 bg-primary-light dark:bg-primary":e.isOn}])},null,2)])])]),ns])])])]),_:1})}const ks=j(z,[["render",os]]);export{ks as default};
