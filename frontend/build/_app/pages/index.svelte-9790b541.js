import{S as a,i as s,s as t,e,k as n,t as o,c as i,a as r,n as c,g as u,d as l,b as f,f as v,F as h,H as d,I as m,G as p,J as g,A as I,K as b}from"../chunks/vendor-6f03b65a.js";function N(a){let s,t,I,b,N,T,y,E,U,w,B,J,O,S,q,C,D,G,P,R,V,k,x,A,j,F=JSON.stringify(a[2])+"";return{c(){s=e("main"),t=e("div"),I=e("input"),b=n(),N=e("button"),T=o("Create game"),y=n(),E=e("br"),U=n(),w=e("div"),B=e("input"),J=n(),O=e("input"),S=n(),q=e("button"),C=o("Join Game"),D=n(),G=e("div"),P=o(F),R=n(),V=e("br"),k=o("\n\t\tSecret: "),x=o(a[3]),this.h()},l(e){s=i(e,"MAIN",{});var n=r(s);t=i(n,"DIV",{class:!0});var o=r(t);I=i(o,"INPUT",{}),b=c(o),N=i(o,"BUTTON",{});var f=r(N);T=u(f,"Create game"),f.forEach(l),o.forEach(l),y=c(n),E=i(n,"BR",{}),U=c(n),w=i(n,"DIV",{class:!0});var v=r(w);B=i(v,"INPUT",{}),J=c(v),O=i(v,"INPUT",{}),S=c(v),q=i(v,"BUTTON",{});var h=r(q);C=u(h,"Join Game"),h.forEach(l),v.forEach(l),D=c(n),G=i(n,"DIV",{class:!0});var d=r(G);P=u(d,F),R=c(d),V=i(d,"BR",{}),k=u(d,"\n\t\tSecret: "),x=u(d,a[3]),d.forEach(l),n.forEach(l),this.h()},h(){f(t,"class","svelte-qemy0u"),f(w,"class","svelte-qemy0u"),f(G,"class","svelte-qemy0u")},m(e,n){v(e,s,n),h(s,t),h(t,I),d(I,a[0]),h(t,b),h(t,N),h(N,T),h(s,y),h(s,E),h(s,U),h(s,w),h(w,B),d(B,a[0]),h(w,J),h(w,O),d(O,a[1]),h(w,S),h(w,q),h(q,C),h(s,D),h(s,G),h(G,P),h(G,R),h(G,V),h(G,k),h(G,x),A||(j=[m(I,"input",a[4]),m(B,"input",a[5]),m(O,"input",a[6])],A=!0)},p(a,[s]){1&s&&I.value!==a[0]&&d(I,a[0]),1&s&&B.value!==a[0]&&d(B,a[0]),2&s&&O.value!==a[1]&&d(O,a[1])},i:p,o:p,d(a){a&&l(s),A=!1,g(j)}}}function T(a,s,t){let e,n;console.log("Refreshing...");return I((async()=>{console.log("On mount...");const a=(async()=>{console.log("Connecting...");const a=await(new b).withUrl("/api").build();return await a.start(),a})();console.log(a)})),[e,n,undefined,undefined,function(){e=this.value,t(0,e)},function(){e=this.value,t(0,e)},function(){n=this.value,t(1,n)}]}export default class extends a{constructor(a){super(),s(this,a,T,N,t,{})}}
