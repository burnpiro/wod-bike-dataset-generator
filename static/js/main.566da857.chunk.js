(this.webpackJsonpapplication=this.webpackJsonpapplication||[]).push([[0],{109:function(e,a,t){},110:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),o=t(9),c=t.n(o),l=(t(83),t(10)),i=t(44),s=t(23),u=t(158),m=t(174),d=t(163),p=t(165),b=t(113),f=t(166),h=t(167),g=t(168),v=t(170),E=t(173),j=t(169),O=t(175),y=t(171),x=t(164),w=t(160),k=t(159),C=t(161),N=t(111),M=t(65),S=t.n(M);function T(){return r.a.createElement(N.a,{variant:"body2",color:"textSecondary",align:"center"},"Copyright \xa9 ",(new Date).getFullYear(),".")}var I=Object(u.a)((function(e){return{icon:{marginRight:e.spacing(2)},main:{minHeight:"calc(100vh - 70px)"},logo:{maxHeight:32,marginRight:e.spacing(2)},footer:{position:"fixed",bottom:0,width:"100vw",backgroundColor:e.palette.background.paper,padding:e.spacing(2,2)}}}));function L(e){var a=e.children,t=I();return r.a.createElement(r.a.Fragment,null,r.a.createElement(k.a,null),r.a.createElement(w.a,{position:"relative"},r.a.createElement(C.a,null,r.a.createElement("img",{src:S.a,alt:"WRM Logo",className:t.logo}),r.a.createElement(N.a,{variant:"h6",color:"inherit",noWrap:!0},"WRM Network"))),r.a.createElement("main",{className:t.main},a),r.a.createElement("footer",{className:t.footer},r.a.createElement(T,null)))}var A=t(50),z=t(162),H=t(67),P=t.n(H),R=t(52),D=t.n(R),F=t(68),_=t(69),B=t.n(_),U=function(e,a){switch(a.type){case"FETCH_INIT":return Object(s.a)(Object(s.a)({},e),{},{isLoading:!0,isError:!1});case"FETCH_SUCCESS":return Object(s.a)(Object(s.a)({},e),{},{isLoading:!1,isError:!1,data:a.payload});case"FETCH_FAILURE":return Object(s.a)(Object(s.a)({},e),{},{isLoading:!1,isError:!0});default:throw new Error}},W=function(e,a){var t=Object(n.useState)(e),r=Object(l.a)(t,2),o=r[0],c=r[1],i=Object(n.useReducer)(U,{isLoading:!1,isError:!1,data:a}),s=Object(l.a)(i,2),u=s[0],m=s[1];return Object(n.useEffect)((function(){var e=!1;return function(){var a=Object(F.a)(D.a.mark((function a(){var t;return D.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return m({type:"FETCH_INIT"}),a.prev=1,a.next=4,B()(o);case 4:t=a.sent,e||m({type:"FETCH_SUCCESS",payload:t.data}),a.next=11;break;case 8:a.prev=8,a.t0=a.catch(1),e||m({type:"FETCH_FAILURE"});case 11:case"end":return a.stop()}}),a,null,[[1,8]])})));return function(){return a.apply(this,arguments)}}()(),function(){e=!0}}),[o]),[u,c]},J=[{name:"Degree",value:"k"},{name:"In Degree",value:"ik"},{name:"Out Degree",value:"ok"},{name:"PageRank",value:"p"}],V=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=e.map((function(e){return e.lat})),t=e.map((function(e){return e.lng})),n=e.map((function(e){return e.id})),r=e.map((function(e){return e.name}));return[{type:"scattermapbox",lat:a,lon:t,ids:n,mode:"markers",marker:{size:14,color:"blue"},hoverinfo:"text",text:r}]},X=[[0,"rgb(0, 0, 200)"],[.25,"rgb(0, 25, 255)"],[.375,"rgb(0, 152, 255)"],[.5,"rgb(44, 255, 150)"],[.625,"rgb(151, 255, 0)"],[.75,"rgb(255, 234, 0)"],[.875,"rgb(255, 111, 0)"],[1,"rgb(255, 0, 0)"]],Y=function(){var e=W("nodes_list.json",{}),a=Object(l.a)(e,2),t=a[0],n=t.data,r=t.isLoading,o=t.isError,c=(a[1],W("paths_reduced-e10.json",{})),i=Object(l.a)(c,2),s=i[0],u=s.data,m=s.isLoading,d=s.isError;i[1];return[{nodes:{list:V(Object.values(n)),obj:n},paths:{obj:u}},r||m,o||d]},$=function(e){var a=e.initialTime,t=void 0===a?0:a,r=e.interval,o=void 0===r?2e3:r,c=e.step,i=void 0===c?1:c,s=e.timerType,u=void 0===s?"INCREMENTAL":s,m=e.endTime,d=e.onTimeOver,p=Object(n.useState)(t),b=Object(l.a)(p,2),f=b[0],h=b[1],g=Object(n.useState)(!1),v=Object(l.a)(g,2),E=v[0],j=v[1],O=Object(n.useState)(!1),y=Object(l.a)(O,2),x=y[0],w=y[1],k=Object(n.useCallback)((function(e){j(!1),w(!1),h(e||t)}),[t]),C=Object(n.useCallback)((function(e){x&&k(),e&&k(e),j(!0)}),[k,x]),N=Object(n.useCallback)((function(){j(!1)}),[]);return Object(n.useEffect)((function(){E&&f===m&&(j(!1),w(!0),"function"===typeof d&&d())}),[m,d,f,E]),Object(n.useEffect)((function(){var e=null;return E?e=setInterval((function(){h((function(e){return"DECREMENTAL"===u?e-i:e+i}))}),o):e&&clearInterval(e),function(){e&&clearInterval(e)}}),[E,i,u,o]),{isRunning:E,pause:N,reset:k,start:C,time:f}},q=Object(u.a)((function(e){return{overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vw",paddingTop:"25%",backgroundColor:"rgba(0,0,0,0.5)",display:"flex",flexDirection:"column",alignItems:"center",color:"white"}}})),G={dragmode:"zoom",mapbox:{style:"open-street-map",center:{lat:51.11,lon:17.03},margin:{r:0,t:0,b:0,l:0},zoom:11},autosize:!0,showlegend:!1,updatemenus:[{buttons:[{method:"update",args:["play"],label:"Play"},{method:"update",args:["pause"],label:"Pause"}],name:"action",direction:"left",pad:{t:10},showactive:!0,type:"buttons",x:0,xanchor:"left",y:1.1,yanchor:"top"},{buttons:[{args:[3,31],label:"March",method:"update"},{args:[4,30],label:"April",method:"update"},{args:[5,31],label:"May",method:"update"},{args:[6,30],label:"June",method:"update"},{args:[7,31],label:"July",method:"update"},{args:[8,31],label:"August",method:"update"},{args:[9,30],label:"September",method:"update"},{args:[10,31],label:"October",method:"update"},{args:[11,30],label:"November",method:"update"},{args:[12,31],label:"December",method:"update"}],name:"month",direction:"down",pad:{t:10},showactive:!0,type:"dropdown",x:0,xanchor:"left",y:1.15,yanchor:"top",active:1,font:{color:"#5072a8"}}],sliders:[{pad:{t:10,b:10},x:.15,y:1.11,len:.85,currentvalue:{visible:!1,xanchor:"right",prefix:"Hour: ",font:{color:"#888",size:20}},active:0,name:"Hour",steps:Array(96).fill(0).map((function(e,a){return{label:"".concat(Math.floor(15*a/60),":").concat(15*a%60===0?"00":15*a%60),args:[a],method:"update"}}))}]},K=function(e){var a=e.showNodes,t=void 0===a||a,o=e.showPaths,c=void 0===o||o,i=e.nodeMetric,s=void 0===i?"k":i,u=e.maxNumOfPaths,m=void 0===u?50:u,d=e.useTrend,p=void 0!==d&&d,b=q(),f=Object(n.useState)([]),h=Object(l.a)(f,2),g=h[0],v=h[1],E=Object(n.useState)(0),j=Object(l.a)(E,2),O=j[0],y=j[1],x=Object(n.useState)(1),w=Object(l.a)(x,2),k=w[0],C=w[1],N=Object(n.useState)({num:4,days:30}),M=Object(l.a)(N,2),S=M[0],T=M[1],I=Y(),L=Object(l.a)(I,3),H=L[0],R=H.nodes,D=H.paths,F=L[1],_=(L[2],W("".concat(S.num,"-paths.json"),{})),B=Object(l.a)(_,2),U=B[0],V=U.data,K=U.isLoading,Q=B[1],Z=W("".concat(S.num,"-metrics.json"),{}),ee=Object(l.a)(Z,2),ae=ee[0],te=ae.data,ne=ae.isLoading,re=ee[1],oe=$({endTime:96,initialTime:O}),ce=oe.time,le=oe.start,ie=oe.pause,se=oe.reset;oe.isRunning;G.title={text:"Time: ".concat(Math.floor(Number(15*ce/60)),":").concat(15*ce%60||"00"),font:{color:"#666",size:36},x:.05,y:.98},G.sliders[0].active=ce,G.sliders[1]={pad:{t:5,b:10},x:.15,y:1.22,len:.85,currentvalue:{visible:!0,xanchor:"right",prefix:"Day: ",font:{color:"#888",size:12}},active:k-1,name:"Day",steps:Array(S.days).fill(0).map((function(e,a){return{label:a+1,args:[a+1],method:"update"}}))},Object(n.useEffect)((function(){null!=V&&null!=V[1]&&null!=te&&null!=te[1]?v(Array(96).fill(0).map((function(e,a){return[].concat(Object(A.a)((t?R.list:[]).map(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"k",t=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=arguments.length>3?arguments[3]:void 0,r=arguments.length>4?arguments[4]:void 0;return function(){var o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{type:"scattermapbox",lat:o.lat,lon:o.lon,ids:o.ids,mode:"markers",marker:{size:o.ids.map((function(t){var n=e.find((function(e){return e.o===t}));if(null==n)return 4;var r="p"===a?Math.max((56+7*Math.ceil(Math.log2(n[a])))/3,1):n[a];return 8*Math.ceil(Math.log2(r))})),color:o.ids.map((function(o){var c=e.find((function(e){return e.o===o}));if(null==c)return"blue";var l="p"===a?Math.max((72+9*Math.ceil(Math.log2(c[a])))/3,0):c[a];return t?2*(l-[c,n.find((function(e){return e.o===o}))||c,r.find((function(e){return e.o===o}))||c].reduce((function(e,t,n,r){return e+="p"===a?Math.max((72+9*Math.ceil(Math.log2(t.p)))/3,0)/r.length:t[a]/r.length}),0))+5:l})),colorscale:X,cmin:0,cmax:15,opacity:.8},hoverinfo:"text",hoverlabel:{bgcolor:"rgb(255, 234, 0)"},hovertext:o.ids.map((function(a){var t=e.find((function(e){return e.o===a}));return null==t?'<span style="font-size: 14px"><b>Name:</b> '.concat(o.text[a],"</span> <br><b>Metrics:</b> UNAVAILABLE"):'<span style="font-size: 14px"><b>Name:</b> '.concat(o.text[a],"</span> <br><b>Metrics:</b><br>").concat(J.map((function(e){return"".concat(e.name,": ").concat(t[e.value],"<br>")})).join(""))}))}}}(te[k][15*a]||[],s,p,te[k][15*a-15]||[],te[k][15*a-30]||[]))),Object(A.a)((c&&V[k][15*a]||[]).map(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e["".concat(t.o,"-").concat(t.d)];return{type:"scattermapbox",lat:null==n?[]:n.lng,lon:null==n?[]:n.lat,mode:"lines",line:{width:2*t.c,color:"rgba(255,0,0,0.5)"},id:null==n?[]:n.id,hoverinfo:"text",hovertext:null==n?"unknown":'<span style="font-size: 18px">"'.concat(a[t.o].name,'" <b>&#8658;</b> "').concat(a[t.d].name,'"</span> <br>Bicycles on path: ').concat(t.c)}}}(D.obj,R.obj)).slice(0,m)))}))):v(Array(96).fill(0).map((function(e,a){return Object(A.a)(R.list)})))}),[F,K,ne,k,t,c,s,m,p]),Object(n.useEffect)((function(){96===ce&&k<S.days&&(G.sliders[0].active=1,C(k+1),le(1))}),[ce,k]);var ue=g[ce]||[];return r.a.createElement(r.a.Fragment,null,r.a.createElement(P.a,{data:ue,layout:G,frames:Array(g.length).fill(0).map((function(e,a){return{name:a}})),onButtonClicked:function(e){var a=e.menu.name,t=e.button.args;if("month"===a)y(0),se(0),T({num:t[0],days:t[1]}),C(1),Q("".concat(t[0],"-paths.json")),re("".concat(t[0],"-metrics.json"));else switch(t[0]){case"play":le();break;case"pause":ie();break;default:console.log(t[0])}},onSliderChange:function(e){var a=e.slider.name,t=e.step.args;"Hour"===a&&(y(t[0]),se(t[0])),"Day"===a&&(C(t[0]),y(0),se(0))},useResizeHandler:!0,style:{width:"100%",minHeight:"calc(100vh - 70px)"}}),F&&r.a.createElement("div",{className:b.overlay},r.a.createElement(z.a,{color:"secondary",size:80,thickness:4}),r.a.createElement("h1",null,"Network data is loading... Please wait :)")))},Q=(t(109),Object(u.a)((function(e){return{toolbarIcon:Object(s.a)({display:"flex",alignItems:"center",justifyContent:"flex-end",padding:"0 8px"},e.mixins.toolbar),drawerPaper:{position:"absolute",height:"calc(100% - 64px)",marginTop:"64px",whiteSpace:"nowrap",width:280,transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},drawerPaperClose:Object(i.a)({overflowX:"hidden",transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),width:e.spacing(6)},e.breakpoints.up("sm"),{width:e.spacing(9)}),menuContainer:{paddingTop:e.spacing(2),display:"flex",flexDirection:"column"},formElement:{marginTop:e.spacing(2)}}}))),Z=[{name:20,value:20},{name:50,value:50},{name:80,value:80},{name:100,value:100},{name:150,value:150},{name:300,value:300}];var ee=function(){var e=Q(),a=r.a.useState(!1),t=Object(l.a)(a,2),n=t[0],o=t[1],c=r.a.useState(!1),i=Object(l.a)(c,2),s=i[0],u=i[1],w=r.a.useState(!0),k=Object(l.a)(w,2),C=k[0],N=k[1],M=r.a.useState(!0),S=Object(l.a)(M,2),T=S[0],I=S[1],A=r.a.useState(J[0].value),z=Object(l.a)(A,2),H=z[0],P=z[1],R=r.a.useState(50),D=Object(l.a)(R,2),F=D[0],_=D[1];return r.a.createElement(L,null,r.a.createElement(m.a,{variant:"permanent",classes:{paper:e.drawerPaper+" "+(n?"":e.drawerPaperClose)},open:n},r.a.createElement("div",{className:e.toolbarIcon},n&&r.a.createElement(d.a,{onClick:function(){o(!1)}},"\u276e"),!n&&r.a.createElement(d.a,{onClick:function(){o(!0)}},"\u276f")),r.a.createElement(x.a,null),n&&r.a.createElement(p.a,{className:e.menuContainer},r.a.createElement(f.a,{component:"fieldset"},r.a.createElement(b.a,{component:"legend"},"Display Option"),r.a.createElement(h.a,null,r.a.createElement(g.a,{control:r.a.createElement(E.a,{checked:C,onChange:function(e){N(e.target.checked)},name:"nodes"}),label:"Show Nodes?"}),r.a.createElement(g.a,{control:r.a.createElement(E.a,{checked:T,onChange:function(e){I(e.target.checked)},name:"paths"}),label:"Show Paths?"}))),r.a.createElement(f.a,{className:e.formElement},r.a.createElement(j.a,{id:"nodeMetric-label"},"Node Metric"),r.a.createElement(y.a,{labelId:"nodeMetric-label",id:"nodeMetric",value:H,onChange:function(e){P(e.target.value)}},J.map((function(e){return r.a.createElement(O.a,{key:e.value,value:e.value},e.name)})))),r.a.createElement(f.a,{className:e.formElement},r.a.createElement(j.a,{id:"numOfNodes-label"},"Max num. of paths"),r.a.createElement(y.a,{labelId:"numOfNodes-label",id:"numOfNodes",value:F,onChange:function(e){_(e.target.value)}},Z.map((function(e){return r.a.createElement(O.a,{key:e.value,value:e.value},e.name)}))),r.a.createElement(v.a,null,"Be careful it might affect performance")),r.a.createElement(f.a,{className:e.formElement},r.a.createElement(h.a,null,r.a.createElement(g.a,{control:r.a.createElement(E.a,{checked:s,onChange:function(e){u(e.target.checked)},name:"useTrend"}),label:"Calculate Trend?"}))))),r.a.createElement(K,{showNodes:C,showPaths:T,nodeMetric:H,maxNumOfPaths:F,useTrend:s}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(ee,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},65:function(e,a,t){e.exports=t.p+"static/media/logo.559ba900.svg"},78:function(e,a,t){e.exports=t(110)},83:function(e,a,t){}},[[78,1,2]]]);
//# sourceMappingURL=main.566da857.chunk.js.map