(this["webpackJsonpbpm-analyzer"]=this["webpackJsonpbpm-analyzer"]||[]).push([[0],{67:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(40),i=n.n(c),s=n(38),l=n.n(s),o=n(41),j=n(16),d=n(99),u=n(100),b=n(95),h=n(92),p=n(101),O=n(96),f=n(98),x=n(2),m=function(){return Object(x.jsx)(O.a,{position:"sticky",children:Object(x.jsx)(f.a,{children:Object(x.jsx)(b.a,{variant:"h6",children:"BPM Analyzer"})})})},g=n(45),y=n.n(g),v=n(93),w=n(90),B=new AudioContext,C=function(){var e=r.a.useState(null),t=Object(j.a)(e,2),n=t[0],a=t[1],c=r.a.useState(!1),i=Object(j.a)(c,2),s=i[0],O=i[1],f=r.a.useState(null),g=Object(j.a)(f,2),C=g[0],k=g[1];return Object(x.jsxs)("div",{children:[Object(x.jsx)(d.a,{}),Object(x.jsx)(m,{}),Object(x.jsxs)(u.a,{style:{marginTop:30},children:[Object(x.jsx)(b.a,{variant:"h4",children:"BPM \uce21\uc815\ud558\uae30"}),C&&Object(x.jsxs)(h.a,{severity:"success",style:{marginBottom:10,marginTop:5},children:["BPM: ",C]}),Object(x.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:8},children:[Object(x.jsx)("input",{type:"file",accept:"audio/*",style:{display:"none"},id:"file-select",onChange:function(e){e.target.files[0]&&(a(e.target.files[0]),k(null))}}),Object(x.jsx)("label",{htmlFor:"file-select",children:Object(x.jsx)(p.a,{variant:"contained",color:"primary",component:"span",children:"\ud30c\uc77c \uc120\ud0dd"})}),Object(x.jsx)(b.a,{variant:"h6",component:"span",children:n?n.name:"\ud30c\uc77c\uc744 \uc120\ud0dd\ud574\uc8fc\uc138\uc694"})]}),Object(x.jsx)(v.a,{loading:s,variant:"outlined",color:"primary",startIcon:Object(x.jsx)(w.a,{}),style:{marginTop:10},disabled:!n,loadingPosition:"start",onClick:Object(o.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:O(!0),(t=new FileReader).onload=function(e){B.decodeAudioData(e.target.result,(function(e){var t=[];if(2===e.numberOfChannels)for(var n=e.getChannelData(0),a=e.getChannelData(1),r=n.length,c=0;c<r;c++)t[c]=(n[c]+a[c])/2;else t=e.getChannelData(0);var i=new y.a(t);O(!1),k(Math.round(i.tempo))}))},t.readAsArrayBuffer(n);case 4:case"end":return e.stop()}}),e)}))),children:"BPM \uce21\uc815\ud558\uae30"})]})]})};i.a.render(Object(x.jsx)(C,{}),document.getElementById("root"))}},[[67,1,2]]]);
//# sourceMappingURL=main.5a1593c7.chunk.js.map