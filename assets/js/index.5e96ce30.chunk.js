(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{124:function(e,t,n){},125:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(26),u=n.n(o),c=(n(73),n(1)),s=n.n(c),l=n(45),i=n(64),f=n.n(i),p=n(4),d=n(3),m=n(8),v=n.n(m),b=n(19),h=n.n(b),y=n(16);function E(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var w=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.marks=new Map}var t,n,r;return t=e,(n=[{key:"now",value:function(){return performance?performance.now():Date.now()}},{key:"mark",value:function(e){this.marks.set(e,this.now())}},{key:"duration",value:function(e,t){return t?this.marks.get(t)-this.marks.get(e):this.now()-this.marks.get(e)}}])&&E(t.prototype,n),r&&E(t,r),e}();function g(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var n=[],r=!0,a=!1,o=void 0;try{for(var u,c=e[Symbol.iterator]();!(r=(u=c.next()).done)&&(n.push(u.value),!t||n.length!==t);r=!0);}catch(s){a=!0,o=s}finally{try{r||null==c.return||c.return()}finally{if(a)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var O=5e3,S=8,N="http://${host}/ping",x=v()({REQUEST:null,RESPONSE:null});var j=function(){var e=g(Object(p.b)(),2),t=e[0],n=e[1],o=function(){var e=function(e){var t,n,r;return s.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return t=e.host,n=new w,a.prev=2,r=new AbortController,n.mark(x.REQUEST),a.next=7,s.a.awrap(h()(fetch(Object(y.a)(N)({host:t}),{signal:r.signal}),O,(function(){return r.abort()})));case 7:n.mark(x.RESPONSE),a.next=14;break;case 10:return a.prev=10,a.t0=a.catch(2),console.error(a.t0),a.abrupt("return");case 14:return a.abrupt("return",n.duration(x.REQUEST,x.RESPONSE));case 15:case"end":return a.stop()}}),null,null,[[2,10]])};return{ping:function(t){var n,r,a,o;return s.a.async((function(u){for(;;)switch(u.prev=u.next){case 0:n=t.host,r=[],a=0;case 3:if(!(a<S)){u.next=11;break}return u.next=6,s.a.awrap(e({host:n}));case 6:(o=u.sent)&&r.push(o);case 8:a++,u.next=3;break;case 11:if(r.length){u.next=13;break}return u.abrupt("return",{duration:null});case 13:return u.abrupt("return",{duration:r.reduce((function(e,t){return e+t}),0)/r.length});case 14:case"end":return u.stop()}}))}}}().ping;return Object(r.useEffect)((function(){!function(){var e;s.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,s.a.awrap(o({host:t.host}));case 2:e=r.sent,n({type:"setPing",value:e.duration});case 4:case"end":return r.stop()}}))}()}),[]),a.a.createElement("div",{className:"ping"},a.a.createElement("h3",null,"Testing Ping Speed ..."))};function k(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var n=[],r=!0,a=!1,o=void 0;try{for(var u,c=e[Symbol.iterator]();!(r=(u=c.next()).done)&&(n.push(u.value),!t||n.length!==t);r=!0);}catch(s){a=!0,o=s}finally{try{r||null==c.return||c.return()}finally{if(a)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var A=5e3,P=2e4,T="http://${host}/download",D=v()({REQUEST:null,RESPONSE:null,CONTENT:null});var R=function(){var e=k(Object(p.b)(),2),t=e[0],n=e[1],o={download:function(e){var t,n,r,a,o,u,c,l,i;return s.a.async((function(f){for(;;)switch(f.prev=f.next){case 0:return t=e.host,n=new w,r=0,a=function(e){var t;return s.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return t=function t(){var n,a,o;return s.a.async((function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,s.a.awrap(e.read());case 2:if(n=u.sent,a=n.done,o=n.value,!a){u.next=7;break}return u.abrupt("return");case 7:return r+=o.byteLength,u.next=10,s.a.awrap(t());case 10:case"end":return u.stop()}}))},n.next=3,s.a.awrap(t());case 3:case"end":return n.stop()}}))},f.prev=4,o=new AbortController,u=o.signal,n.mark(D.REQUEST),f.next=10,s.a.awrap(h()(fetch(Object(y.a)(T)({host:t}),{signal:u}),A,(function(){return o.abort()})));case 10:return c=f.sent,n.mark(D.RESPONSE),f.next=14,s.a.awrap(h()(a(c.body.getReader()),P,(function(){return o.abort()})));case 14:f.next=19;break;case 16:f.prev=16,f.t0=f.catch(4),console.error(f.t0);case 19:return f.prev=19,n.mark(D.CONTENT),f.finish(19);case 22:if(l=n.duration(D.RESPONSE,D.CONTENT),i=r/(l/1e3),r){f.next=26;break}return f.abrupt("return",{size:null,duration:null,speed:null});case 26:return f.abrupt("return",{size:r,duration:l,speed:i});case 27:case"end":return f.stop()}}),null,null,[[4,16,19,22]])}}.download;return Object(r.useEffect)((function(){!function(){var e;s.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,s.a.awrap(o({host:t.host}));case 2:e=r.sent,n({type:"setDownload",value:e.speed});case 4:case"end":return r.stop()}}))}()}),[]),a.a.createElement("div",{className:"download"},a.a.createElement("h3",null,"Testing Download Speed ..."))},U=n(65);function I(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var n=[],r=!0,a=!1,o=void 0;try{for(var u,c=e[Symbol.iterator]();!(r=(u=c.next()).done)&&(n.push(u.value),!t||n.length!==t);r=!0);}catch(s){a=!0,o=s}finally{try{r||null==c.return||c.return()}finally{if(a)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var C=n.n(U)()("speedtest:upload"),L=20971520,H=2e4,Q="http://${host}/upload",Y=v()({START:null,END:null}),z=function(e){var t,n,r,a;return s.a.async((function(o){for(;;)switch(o.prev=o.next){case 0:return t=e.url,n=e.body,r=e.timeout,a=e.onProgress,o.abrupt("return",new Promise((function(e,o){var u=new XMLHttpRequest;u.onload=function(t){return e(t)},u.onerror=function(e){return o(e)},u.ontimeout=function(e){return o(new Error("timeout"))},u.upload.onprogress=a,u.timeout=r,u.open("POST",t),u.send(n)})));case 2:case"end":return o.stop()}}))};var F=function(){var e=I(Object(p.b)(),2),t=e[0],n=e[1],o={upload:function(e){var t,n,r,a,o,u;return s.a.async((function(c){for(;;)switch(c.prev=c.next){case 0:return t=e.host,n=new w,c.prev=2,a=new Uint8Array(L),n.mark(Y.START),c.next=7,s.a.awrap(z({url:Object(y.a)(Q)({host:t}),body:a.buffer,timeout:H,onProgress:function(e){r=e.loaded}}));case 7:r=a.byteLength,c.next=13;break;case 10:c.prev=10,c.t0=c.catch(2),C(c.t0);case 13:if(n.mark(Y.END),o=n.duration(Y.START,Y.END),u=r/(o/1e3),r){c.next=18;break}return c.abrupt("return",{size:null,duration:null,speed:null});case 18:return c.abrupt("return",{size:r,duration:o,speed:u});case 19:case"end":return c.stop()}}),null,null,[[2,10]])}}.upload;return Object(r.useEffect)((function(){!function(){var e;s.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,s.a.awrap(o({host:t.host}));case 2:e=r.sent,n({type:"setUpload",value:e.speed});case 4:case"end":return r.stop()}}))}()}),[]),a.a.createElement("div",{className:"upload"},a.a.createElement("h3",null,"Testing Upload Speed ..."))},G=n(66),W=n.n(G),$=n(67),J=n.n($),M=function(e){return e&&J()(e,1)};function _(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var n=[],r=!0,a=!1,o=void 0;try{for(var u,c=e[Symbol.iterator]();!(r=(u=c.next()).done)&&(n.push(u.value),!t||n.length!==t);r=!0);}catch(s){a=!0,o=s}finally{try{r||null==c.return||c.return()}finally{if(a)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var q=function(){var e,t=_(Object(p.b)(),2),n=t[0],r=t[1];return a.a.createElement("div",{className:"screen"},a.a.createElement("div",{className:"result"},a.a.createElement("h1",null,"Result"),a.a.createElement("div",{className:"information"},a.a.createElement("div",{className:"item"},a.a.createElement("div",{className:"name"},"Ping"),a.a.createElement("div",{className:"value"},(e=n.ping,W()(e)))),a.a.createElement("div",{className:"item"},a.a.createElement("div",{className:"name"},"Download"),a.a.createElement("div",{className:"value"},M(n.download))),a.a.createElement("div",{className:"item"},a.a.createElement("div",{className:"name"},"Upload"),a.a.createElement("div",{className:"value"},M(n.upload)))),a.a.createElement("button",{className:"primary-button",onClick:function(){return r({type:"ready"})}},"Test Again")))};n(124);function B(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var n=[],r=!0,a=!1,o=void 0;try{for(var u,c=e[Symbol.iterator]();!(r=(u=c.next()).done)&&(n.push(u.value),!t||n.length!==t);r=!0);}catch(s){a=!0,o=s}finally{try{r||null==c.return||c.return()}finally{if(a)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var X=function(){var e=B(Object(p.b)(),2),t=e[0],n=e[1],o=t.step,u=function(e){var t=B(Object(r.useState)(e.host||""),2),n=t[0],a=t[1];return Object(r.useEffect)((function(){!function(){var e,t,n;s.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,s.a.awrap(fetch("/agent.txt"));case 2:if((e=r.sent).ok){r.next=5;break}return r.abrupt("return");case 5:return r.next=7,s.a.awrap(e.text());case 7:if(t=r.sent,n=t.trim()){r.next=11;break}return r.abrupt("return");case 11:a(n);case 12:case"end":return r.stop()}}))}()}),[]),[[n,a]]}({host:t.host}),c=B(u,1),i=B(c[0],2),m=i[0],v=i[1],b=o!==d.d.READY;return a.a.createElement(l.a,{transitionName:"transition-view"},o!==d.d.FINISH?a.a.createElement("div",{className:f()("screen",{testing:b}),key:"control"},a.a.createElement("div",{className:"control"},a.a.createElement("h1",null,a.a.createElement("a",{href:d.c,target:"_blank"},"Speed Test"),a.a.createElement("a",{className:"author",href:d.a,target:"_blank"},"\xa9yelo")),a.a.createElement("form",{className:"form",onSubmit:function(e){e.preventDefault();var t=new FormData(e.target).get("host");n({type:"start",host:t})}},a.a.createElement("input",{className:"host",name:"host",autoComplete:"off",placeholder:"Agent IP:PORT",value:m,onChange:function(e){return v(e.target.value)},disabled:b}),a.a.createElement("button",{className:"primary-button",type:"submit",disabled:b},b?"Testing...":"Start"))),b?a.a.createElement("div",{className:"status"},o===d.d.PING?a.a.createElement(j,null):o===d.d.DOWNLOAD?a.a.createElement(R,null):o===d.d.UPLOAD?a.a.createElement(F,null):null):null,a.a.createElement(l.a,{transitionName:"transition-error"},t.error?a.a.createElement("div",{className:"error"},t.error):null)):a.a.createElement(q,{key:"result"}))},K=function(){return a.a.createElement(p.a,null,a.a.createElement(X,null))};u.a.render(a.a.createElement(K,null),document.getElementById("app"))},3:function(e,t,n){"use strict";n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return o})),n.d(t,"d",(function(){return u})),n.d(t,"b",(function(){return c}));var r=n(8),a="https://github.com/imyelo/speedtest",o="https://yelo.cc",u=n.n(r)()({READY:null,PING:null,DOWNLOAD:null,UPLOAD:null,FINISH:null}),c=function(){var e={HOST:"host"};for(var t in e)e[t]="".concat("speedtest:").concat(e[t]);return e}()},4:function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return d}));var r=n(0),a=n(44),o=n.n(a),u=n(3);function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var l={step:u.d.READY,host:o()(u.b.HOST),ping:null,download:null,upload:null,error:null},i=function(e,t){var n=function(t){return function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},e,{},t)},r=function(e){return n({error:e,step:u.d.READY})};switch(t.type){case"ready":return n({step:u.d.READY});case"start":return t.host?(o()(u.b.HOST,t.host),n({error:null,host:t.host,step:u.d.PING})):r("Please enter your agent's address.");case"setHost":return n({ping:t.value});case"setPing":return t.value?n({ping:t.value,step:u.d.DOWNLOAD}):r("Unable to connect to the server.");case"setDownload":return t.value?n({download:t.value,step:u.d.UPLOAD}):r("Unable to connect to the server.");case"setUpload":return t.value?n({upload:t.value,step:u.d.FINISH}):r("Unable to connect to the server.");default:throw new Error("Unexpected action")}},f=Object(r.createContext)(),p=function(t){var n=t.children,a=Object(r.useReducer)(i,l);return e.createElement(f.Provider,{value:a},n)},d=function(){return Object(r.useContext)(f)}}).call(this,n(0))},68:function(e,t,n){e.exports=n(125)},73:function(e,t,n){}},[[68,2,0]]]);