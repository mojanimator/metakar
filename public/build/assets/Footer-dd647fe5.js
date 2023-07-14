import{i as g,r as d,o as h,b as p,d as s,w as l,a as r,g as m,t as i,k as u,f as B,c as I,B as S,C as A,Z as R,z as w,D as N}from"./app-2d4b6406.js";import{_ as b}from"./_plugin-vue_export-helper-c27b6911.js";import{r as D,I as j,a as M}from"./Image-c24fded1.js";import{r as L}from"./UserIcon-0596f151.js";import{A as $}from"./ApplicationLogo-5729ac50.js";const U={components:{Link:g},props:{},setup(e){},computed:{selectable_locale(){return this.$page.locale=="fa"?"en":this.$page.locale=="en"?"ar":"fa"}}},V={class:""},z={key:0,class:""},F={key:1},H={key:2};function E(e,t,f,o,n,a){const v=d("Link");return h(),p("div",V,[s(v,{href:e.route("language",[a.selectable_locale]),class:"flex mx-1 border-2 text-primary-500 bg-primary-100 hover:bg-primary-200 border-transparent text-sm font-medium leading-5 focus:outline-none focus:text-gray-700 focus:border- gray-300 transition duration-300 ease-in-out border-primary-500 p-2 rounded-lg"},{default:l(()=>[a.selectable_locale=="fa"?(h(),p("div",z,"Fa")):a.selectable_locale=="ar"?(h(),p("div",F,"AR")):(h(),p("div",H,"EN"))]),_:1},8,["href"])])}const q=b(U,[["render",E]]);function O(e,t){return h(),p("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor","aria-hidden":"true"},[r("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"})])}const T={data(){return{chevronRotate:!1,chevronShow:!1,user:this.$page.props.auth.user}},components:{Link:g,UserIcon:L,ChevronDownIcon:D,Image:j,ArrowRightOnRectangleIcon:O},props:{},setup(e){},computed:{selectable_locale(){return this.$page.locale=="fa"?"en":this.$page.locale=="en"?"ar":"fa"}},watch:{},methods:{profileLink(){return this.$page.props.auth.user?this.route("panel.index"):this.route("login")}}},C=e=>(S("data-v-c3fe1316"),e=e(),A(),e),Y={class:"flex items-center"},W={key:0},Z={class:"group flex relative dropdown text-start"},G={class:"mx-1"},P={class:"flex-col mx-1"},Q={class:"text-sm font-semibold text-gray-700 dark:text-gray-200"},J={class:"text-sm text-gray-500 dark:text-gray-400"},K=C(()=>r("hr",{class:"border-gray-200 dark:border-gray-700"},null,-1)),X=C(()=>r("hr",{class:"border-gray-200 dark:border-gray-700"},null,-1)),ee={class:"flex items-center justify-center p-4 m-3 w-full hover:scale-110 focus:outline-none px-4 py-2 rounded font-bold cursor-pointer hover:bg-red-700 hover:text-red-100 bg-red-100 text-red-500 border duration-200 ease-in-out border-red-600 transition"};function te(e,t,f,o,n,a){const v=d("ChevronDownIcon"),c=d("Image"),_=d("Link"),y=d("ArrowRightOnRectangleIcon"),k=d("UserIcon");return h(),p("div",Y,[n.user?(h(),p("div",W,[r("div",Z,[r("button",{onClick:t[0]||(t[0]=x=>n.chevronShow=!n.chevronShow),onMouseover:t[1]||(t[1]=x=>{n.chevronRotate=!0,n.chevronShow=!0}),onMouseleave:t[2]||(t[2]=x=>n.chevronRotate=!1),class:"relative z-10 flex items-center p-2 text-sm text-gray-600 bg-white border border-transparent rounded-md focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:text-white dark:bg-gray-800 focus:outline-none"},[r("span",{class:m([n.chevronRotate?"rotate-90":"","transition duration-500"])},[s(v,{class:"h-5 w-5"})],2),r("span",G,i(n.user.phone||n.user.email),1)],32),n.chevronShow?(h(),p("ul",{key:0,onMouseover:t[3]||(t[3]=x=>n.chevronRotate=!0),onMouseleave:t[4]||(t[4]=x=>n.chevronRotate=!1),class:"flex-col bg-white border shadow-xl rounded-lg transform scale-0 group-hover:scale-100 absolute end-0 top-10 transition duration-200 ease-in-out origin-top overflow-hidden"},[s(_,{href:"#",class:"flex px-6 py-4 justify-around text-sm text-gray-600 transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"},{default:l(()=>[s(c,{classes:" flex-shrink-0  object-cover mx-1 rounded-full w-9 h-9",src:"https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d29tYW4lMjBibHVlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=face&w=500&q=200",alt:"jane avatar",type:"user"}),r("div",P,[r("h1",Q,i(n.user.fullname),1),r("div",J,i(n.user.phone||n.user.email),1)])]),_:1}),K,s(_,{href:e.route("panel.index"),class:"flex px-4 py-4 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"},{default:l(()=>[u(i(e.__("dashboard")),1)]),_:1},8,["href"]),X,s(_,{href:e.route("logout"),class:"flex"},{default:l(()=>[r("button",ee,[u(i(e.__("signout"))+" ",1),s(y,{class:"h-5 w-5 text-red-500"})])]),_:1},8,["href"])],32)):B("",!0)])])):(h(),I(_,{key:1,href:a.profileLink(),class:"flex mx-1 border-2 text-white border-transparent font-medium focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-300 ease-in-out border-primary-500 p-2 rounded-lg bg-primary-500 rounded-lg hover:bg-primary-400"},{default:l(()=>[s(k,{class:"h-5 w-5"})]),_:1},8,["href"]))])}const se=b(T,[["render",te],["__scopeId","data-v-c3fe1316"]]);const re={components:{ApplicationLogo:$,LanguageButton:q,UserButton:se,Bars3Icon:M,UserIcon:L,Link:g,Head:R},data(){return{}},mounted(){const e=document.querySelector("button.mobile-menu-button"),t=document.querySelector(".mobile-menu");e.addEventListener("click",()=>{t.classList.toggle("hidden")}),this.setScrollListener()},methods:{navClasses(e){let t="py-4 px-1 lg:px-2  text-white font-semibold  transition  duration-300 hover:border-primary-500 hover:text-primary-900 hover:border-b-4 transition  duration-300 ";return e&&(this.route().current(`${e}.*`)||this.route().current(`${e}`))&&(t+="border-b-4 border-primary-500"),t},setScrollListener(){var e=window.scrollY,t=document.getElementsByTagName("nav")[0],f=document.querySelectorAll(".nav-item");if(this.route().current("/")){t.classList.add("bg-transparent"),t.classList.remove("bg-white"),t.classList.add("text-white"),t.classList.remove("text-primary-500"),t.classList.remove("shadow-lg");for(let o of f)o.classList.add("text-white"),o.classList.remove("text-primary-500")}else{t.classList.remove("bg-transparent"),t.classList.add("bg-white"),t.classList.remove("text-white"),t.classList.add("text-primary-500"),t.classList.add("shadow-lg");for(let o of f)o.classList.remove("text-white"),o.classList.add("text-primary-500");return}document.addEventListener("scroll",function(){e=window.scrollY;for(let o of f)o.classList.remove("text-primary-500"),o.classList.add("text-white");if(e>10){t.classList.remove("bg-transparent"),t.classList.add("bg-white"),t.classList.remove("text-white"),t.classList.add("text-primary-500"),t.classList.add("shadow-lg");for(let o of f)o.classList.remove("text-white"),o.classList.add("text-primary-500")}else{t.classList.add("bg-transparent"),t.classList.remove("bg-white"),t.classList.add("text-white"),t.classList.remove("text-primary-500"),t.classList.remove("shadow-lg");for(let o of f)o.classList.add("text-white"),o.classList.remove("text-primary-500")}})}}},oe={class:"fixed w-full z-30 top-0"},ne={class:"max-w-6xl mx-auto px-2 lg:px-4"},ae={class:"flex justify-between"},le={class:"flex space-x-4"},ie={class:"font-semibold text-white nav-item text-lg"},ce={class:"hidden md:flex items-center grow justify-around text-xs transition-all duration-500"},de={class:"flex items-center"},ue={class:"flex items-center"},me={class:"flex items-center space-x-3"},he={class:"md:hidden flex items-center nav-item"},pe={class:"h-9 w-9 border-2 rounded mobile-menu-button"},fe=w('<div class="hidden mobile-menu"><ul class=""><li class="active"><a href="index.html" class="block text-sm px-2 py-4 text-white bg-green-500 font-semibold">Home</a></li><li><a href="#services" class="block text-sm px-2 py-4 hover:text-white hover:bg-green-500 transition duration-300">Services</a></li></ul></div>',1);function ve(e,t,f,o,n,a){const v=d("ApplicationLogo"),c=d("Link"),_=d("UserButton"),y=d("LanguageButton"),k=d("Bars3Icon");return h(),p("nav",oe,[r("div",ne,[r("div",ae,[r("div",le,[r("div",null,[s(c,{href:e.route("/"),class:"flex items-center py-4 px-2"},{default:l(()=>[s(v,{class:"w-9 h-9 fill-current text-primary-600"}),r("span",ie,i(e.__("app_name")),1)]),_:1},8,["href"])])]),r("div",ce,[r("div",de,[s(c,{href:e.route("/"),class:m(["px-4 nav-item",a.navClasses("/")])},{default:l(()=>[u(i(e.__("home")),1)]),_:1},8,["href","class"]),s(c,{href:e.route("business.index"),class:m(["nav-item",a.navClasses("business")])},{default:l(()=>[u(i(e.__("businesses")),1)]),_:1},8,["href","class"]),s(c,{href:e.route("article.index"),class:m(["nav-item",a.navClasses("article")])},{default:l(()=>[u(i(e.__("articles")),1)]),_:1},8,["href","class"]),s(c,{href:e.route("video.index"),class:m(["nav-item",a.navClasses("video")])},{default:l(()=>[u(i(e.__("videos")),1)]),_:1},8,["href","class"]),s(c,{href:e.route("podcast.index"),class:m(["nav-item",a.navClasses("podcast")])},{default:l(()=>[u(i(e.__("podcasts")),1)]),_:1},8,["href","class"]),s(c,{href:e.route("site.index"),class:m(["nav-item",a.navClasses("site")])},{default:l(()=>[u(i(e.__("sites")),1)]),_:1},8,["href","class"]),s(c,{href:e.route("page.make_money"),class:m(["nav-item",a.navClasses("make_money")])},{default:l(()=>[u(i(e.__("make_money")),1)]),_:1},8,["href","class"])]),r("div",ue,[s(c,{href:e.route("page.prices"),class:m(["nav-item",a.navClasses("prices")])},{default:l(()=>[u(i(e.__("prices")),1)]),_:1},8,["href","class"]),s(c,{href:e.route("page.help"),class:m(["nav-item",a.navClasses("help")])},{default:l(()=>[u(i(e.__("help")),1)]),_:1},8,["href","class"]),s(c,{href:e.route("page.contact_us"),class:m(["nav-item",a.navClasses("contact_us")])},{default:l(()=>[u(i(e.__("contact_us")),1)]),_:1},8,["href","class"])])]),r("div",me,[s(_),s(y)]),r("div",he,[r("button",pe,[s(k,{class:"",className:"  "})])])])]),fe])}const Se=b(re,[["render",ve]]),_e=N({components:{ApplicationLogo:$,Link:g}}),xe={class:"bg-white"},ge={class:"container mx-auto px-8"},be={class:"w-full flex flex-col md:flex-row py-6"},ye={class:"flex-1 mb-6 text-black"},ke=w('<div class="flex-1"><p class="uppercase text-gray-500 md:mb-6">Links</p><ul class="list-reset mb-6"><li class="mt-2 inline-block mr-2 md:block md:mr-0"><a href="#" class="no-underline hover:underline text-gray-800 hover:text-pink-500">FAQ</a></li><li class="mt-2 inline-block mr-2 md:block md:mr-0"><a href="#" class="no-underline hover:underline text-gray-800 hover:text-pink-500">Help</a></li><li class="mt-2 inline-block mr-2 md:block md:mr-0"><a href="#" class="no-underline hover:underline text-gray-800 hover:text-pink-500">Support</a></li></ul></div><div class="flex-1"><p class="uppercase text-gray-500 md:mb-6">Legal</p><ul class="list-reset mb-6"><li class="mt-2 inline-block mr-2 md:block md:mr-0"><a href="#" class="no-underline hover:underline text-gray-800 hover:text-pink-500">Terms</a></li><li class="mt-2 inline-block mr-2 md:block md:mr-0"><a href="#" class="no-underline hover:underline text-gray-800 hover:text-pink-500">Privacy</a></li></ul></div><div class="flex-1"><p class="uppercase text-gray-500 md:mb-6">Social</p><ul class="list-reset mb-6"><li class="mt-2 inline-block mr-2 md:block md:mr-0"><a href="#" class="no-underline hover:underline text-gray-800 hover:text-pink-500">Facebook</a></li><li class="mt-2 inline-block mr-2 md:block md:mr-0"><a href="#" class="no-underline hover:underline text-gray-800 hover:text-pink-500">Linkedin</a></li><li class="mt-2 inline-block mr-2 md:block md:mr-0"><a href="#" class="no-underline hover:underline text-gray-800 hover:text-pink-500">Twitter</a></li></ul></div><div class="flex-1"><p class="uppercase text-gray-500 md:mb-6">Company</p><ul class="list-reset mb-6"><li class="mt-2 inline-block mr-2 md:block md:mr-0"><a href="#" class="no-underline hover:underline text-gray-800 hover:text-pink-500">Official Blog</a></li><li class="mt-2 inline-block mr-2 md:block md:mr-0"><a href="#" class="no-underline hover:underline text-gray-800 hover:text-pink-500">About Us</a></li><li class="mt-2 inline-block mr-2 md:block md:mr-0"><a href="#" class="no-underline hover:underline text-gray-800 hover:text-pink-500">Contact</a></li></ul></div>',4);function we(e,t,f,o,n,a){const v=d("ApplicationLogo"),c=d("Link");return h(),p("footer",xe,[r("div",ge,[r("div",be,[r("div",ye,[s(c,{href:e.route("/"),class:"text-pink-600 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"},{default:l(()=>[s(v)]),_:1},8,["href"])]),ke])])])}const Ae=b(_e,[["render",we]]);export{Ae as F,Se as N,O as r};
