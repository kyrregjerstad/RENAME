const oe=()=>{};function Y(e){for(var n=0;n<e.length;n++)e[n]()}function qe(e,n,t){if(e==null)return n(void 0),t&&t(void 0),oe;const r=e.subscribe(n,t);return r.unsubscribe?()=>r.unsubscribe():r}var fe=Array.isArray,fn=Array.from,ln=Object.keys,_n=Object.assign,an=Object.isFrozen,dn=Object.defineProperty,Fe=Object.getOwnPropertyDescriptor,pn=Object.getOwnPropertyDescriptors,hn=Object.prototype,vn=Array.prototype,En=Object.getPrototypeOf;function mn(e){return typeof e=="function"}const yn=1,bn=2,An=4,kn=8,On=16,Tn=64,je=1,Ye=4,He=8,Cn=["beforeinput","click","dblclick","contextmenu","focusin","focusout","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"],wn=["touchstart","touchmove","touchend"],In={formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly"},Ue=0,de=1,pe=2,Ke=3,Rn=4,Sn=5,Be=7,Ve=8;function xn(e){return{d:null,e:null,i:e,p:null,r:null,t:Ue}}function Nn(){return{a:null,ae:null,c:null,ce:null,d:null,e:null,p:v,r:null,t:de,v:!1}}function Ln(){return{d:null,e:null,p:v,r:null,t:Ve}}function Dn(){return{d:null,e:null,p:v,r:null,t:Be}}function Mn(e,n){return{a:n,d:null,f:e,v:[],e:null,p:v,r:null,s:[],t:pe}}function Pn(e,n,t){return{a:null,d:null,e:null,i:n,k:t,v:e,p:v,r:null,s:null,t:Ke}}const he=1,H=2,B=4,I=8,D=16,R=64,M=128,b=256,y=512,U=1024,te=2048,J=4096,V=B|I|D,ve=0,ge=1,Z=Symbol(),Ee=Symbol();let g=ve,W=!1,X=!1,$=!1,z=!1,_=[],x=[],re=[],ue=[],K=0,O=null,o=null,d=null,p=0,C=null,w=!1,ce=!1,F=!1,v=null,f=null,ne=!1;function G(e){const n=e||f;return n!==null&&n.r}function me(e,n){return e===n}function ze(e,n){return{c:null,e:me,f:e,v:n,x:null}}function ye(e,n,t){return{b:t,c:null,d:null,e:null,f:e,l:0,i:null,r:null,v:n,x:null,y:null}}function be(e,n){const t=e.r;t===null?e.r=[n]:t.push(n)}function le(e){const n=e.f;if(n&y||e.v===Z)return!0;if(n&U){const t=e.d;if(t!==null){const r=t.length;let u;for(u=0;u<r;u++){const c=t[u];if(c.f&U&&!le(c)){A(c,b);continue}if(c.f&y)if(c.f&H){if(Se(c,!0),e.f&y)return!0}else return!0}}}return!1}function Ae(e){const n=e.i,t=d,r=p,u=C,c=O,h=v,i=f,l=F,E=(e.f&D)!==0,m=w;d=null,p=0,C=null,O=e,v=e.b,f=e.x,F=!z&&(e.f&M)!==0,w=!1,E&&(f==null?void 0:f.u)!=null&&f.u.e();try{let S;E?S=n(e.b,e):S=n();let s=e.d;if(d!==null){let a;if(s!==null){const k=s.length,T=p===0?d:s.slice(0,p).concat(d),ae=T.length>16?new Set(T):null;for(a=p;a<k;a++){const ee=s[a];(ae!==null&&!ae.has(ee)||!T.includes(ee))&&ke(e,ee)}}if(s!==null&&p>0)for(s.length=p+d.length,a=0;a<d.length;a++)s[p+a]=d[a];else e.d=s=d;if(!F)for(a=p;a<s.length;a++){const k=s[a],T=k.c;T===null?k.c=[e]:T[T.length-1]!==e&&T.push(e)}}else s!==null&&p<s.length&&(Q(e,p),s.length=p);return S}finally{d=t,p=r,C=u,O=c,v=h,f=i,F=l,w=m}}function ke(e,n){const t=n.c;let r=0;if(t!==null){r=t.length-1;const u=t.indexOf(e);u!==-1&&(r===0?n.c=null:(t[u]=t[r],t.pop()))}r===0&&n.f&M&&(A(n,y),Q(n,0))}function Q(e,n){const t=e.d;if(t!==null){const r=n===0?null:t.slice(0,n);let u;for(u=n;u<t.length;u++){const c=t[u];(r===null||!r.includes(c))&&ke(e,c)}}}function Oe(e){const n=e.r;if(e.r=null,n!==null){let t;for(t=0;t<n.length;t++){const r=n[t];r.f&V?Le(r):(Q(r,0),r.d=null)}}}function Ze(e,n){if(e!==null)throw n}function Te(e){if(e.f&J)return;const n=e.v,t=o;o=e;try{Oe(e),n!==null&&n();const u=Ae(e);typeof u=="function"&&(e.v=u)}catch(u){const c=e.b;if(c!==null)Ze(c,u);else throw u}finally{o=t}const r=e.x;G(r)&&e.f&I&&_.length>0&&$e(r)}function Ce(){if(K>100)throw new Error("ERR_SVELTE_TOO_MANY_UPDATES");K++}function L(e){const n=e.length;if(n>0){Ce();const t=z;z=!0;try{let r;for(r=0;r<n;r++){const u=e[r],c=u.f;c&(J|te)||(le(u)?(A(u,b),Te(u)):c&U&&A(u,b))}}finally{z=t}e.length=0}}function We(){if(W=!1,K>101)return;const e=_,n=x;_=[],x=[],L(e),L(n),W||(K=0)}function P(e,n){const t=e.f;if(n)Te(e),A(e,b);else if(g===ve&&(W||(W=!0,queueMicrotask(We))),t&B)x.push(e),t&R||xe(e,!0);else{const r=_.length;let u=r===0;if(!u){const c=e.l,h=e.b,i=(t&I)!==0;let l,E,m=r;for(;;){if(l=_[--m],l.l<=c){m+1===r?u=!0:(E=(l.f&I)!==0,(l.b!==h||E&&!i)&&m++,_.splice(m,0,e));break}if(m===0){_.unshift(e);break}}}u&&_.push(e)}}function we(){X=!1;const e=re.slice();re=[],Y(e)}function Ie(){$=!1;const e=ue.slice();ue=[],Y(e)}function qn(e){X||(X=!0,setTimeout(we,0)),re.push(e)}function Fn(e){$||($=!0,requestAnimationFrame(Ie)),ue.push(e)}function Xe(){const e=[];for(let n=0;n<_.length;n++){const t=_[n];t.f&D&&t.x===f&&(e.push(t),_.splice(n,1),n--)}L(e)}function $e(e){const n=[];for(let t=0;t<_.length;t++){const r=_[t];r.f&I&&r.x===e&&(n.push(r),_.splice(t,1),t--)}L(n)}function Re(e){const n=g,t=_,r=x;try{Ce();const u=[],c=[];g=ge,_=u,x=c,L(t),L(r),e!==void 0&&e(),(_.length>0||c.length>0)&&Re(),$&&Ie(),X&&we(),K=0}finally{g=n,_=t,x=r}}async function jn(){await Promise.resolve(),Re()}function Se(e,n){const t=ne;ne=!0;const r=Ae(e);ne=t;const u=F||e.f&M?y:b;A(e,u);const c=e.e;c(r,e.v)||(e.v=r,ie(e,y,n))}function Yn(e,n,t){let r=t[n];const u=r===void 0;u&&(r={store:null,last_value:null,value:Me(Z),unsubscribe:oe},t[n]=r),(u||r.store!==e)&&(r.unsubscribe(),r.store=e??null,r.unsubscribe=Ge(e,r.value));const c=N(r.value);return c===Z?r.last_value:c}function Ge(e,n){return e==null?(se(n,void 0),oe):qe(e,r=>{ce=!0,se(n,r),ce=!1})}function Hn(e){sn(()=>{let n;for(n in e)e[n].unsubscribe()})}function N(e){const n=e.f;if(n&J)return e.v;if(O!==null&&!(O.f&R)&&!w){const t=(O.f&M)!==0,r=O.d;d===null&&r!==null&&r[p]===e&&!(t&&o!==null)?p++:(r===null||p===0||r[p-1]!==e)&&(d===null?d=[e]:e!==d[d.length-1]&&d.push(e)),C!==null&&o!==null&&o.f&b&&C.includes(e)&&(A(o,y),P(o,!1))}return n&H&&le(e)&&Se(e,!1),e.v}function se(e,n){return Ne(e,n),n}function xe(e,n,t){const r=e.r;if(r!==null){let u;for(u=0;u<r.length;u++)r[u].f&V&&j(r[u],n,t)}}function j(e,n,t=new Set){const r=e.f;if((r&te)!==0!==n){e.f^=te,!n&&r&V&&!(r&b)&&P(e,!1);const c=e.b;if(c!==null&&!t.has(c)){t.add(c);const h=c.t;if(h===de){const i=c.e;i!==null&&c!==v&&j(i,n);const l=c.ce;l!==null&&c.v&&j(l,n,t);const E=c.ae;E!==null&&!c.v&&j(E,n,t)}else if(h===pe){const i=c.v;for(let{e:l}of i)l!==null&&j(l,n,t)}}}xe(e,n,t)}function ie(e,n,t){const r=G(e.x),u=e.c;if(u!==null){const c=u.length;let h;for(h=0;h<c;h++){const i=u[h],l=i.f,E=(l&M)!==0,m=(l&y)!==0;m&&!E||(!t||!r)&&i===o||(A(i,n),(l&b||m&&E)&&(i.f&V?P(i,!1):ie(i,U,t)))}}}function Ne(e,n){if(!w&&!ce&&O!==null&&G(e.x)&&O.f&H)throw new Error("ERR_SVELTE_UNSAFE_MUTATION");if(e.f&he&&!e.e(n,e.v)){const t=e.x;if(e.v=n,G(t)&&o!==null&&o.c===null&&o.f&b&&(d!==null&&d.includes(e)?(A(o,y),P(o,!1)):C===null?C=[e]:C.push(e)),ie(e,y,!0),o===null&&_.length===0){const r=t==null?void 0:t.u;if(r!=null){Y(r.b);const u=nn(()=>{Le(u),Y(r.a)})}}}}function Le(e){const n=e.v,t=e.y,r=e.f;Oe(e),Q(e,0),e.i=e.r=e.y=e.x=e.b=e.v=e.d=e.c=null,A(e,J),t!==null&&(fe(t)?Y(t):t()),n!==null&&r&V&&n()}function De(e){const n=o===null,t=n?H|M:H,r=ye(t|b,Z,v);return r.i=e,r.x=f,r.e=me,n||be(o,r),r}function Un(e){const n=De(e);return n.e=_e,n}function Je(e){const n=ze(he|b,e);return n.x=f,n}function Me(e){const n=Je(e);return n.e=_e,n}function Qe(e){const n=w;try{return w=!0,e()}finally{w=n}}function q(e,n,t,r,u){const c=ye(e|y,null,r);return c.i=n,c.x=f,o!==null&&(c.l=o.l+1,e&R||be(o,c)),u&&P(c,t),c}function Kn(){return o?(o.f&R)===0:!1}function en(e){if(o===null)throw new Error("ERR_SVELTE_ORPHAN_EFFECT");const n=o.f&D&&f!==null&&!f.m,t=q(B,e,!1,v,!n);if(n){let r=f.e;r===null&&(r=f.e=[]),r.push(t)}return t}function Bn(e){return q(B,e,!1,v,!0)}function nn(e){return q(B|R,e,!1,v,!0)}function Vn(e,n){return q(I|R,e,n,v,!0)}function gn(e){if(o===null)throw new Error("ERR_SVELTE_ORPHAN_EFFECT");const n=o!==null&&(o.f&D)!==0;return q(I,()=>{const t=e();return Xe(),t},n,v,!0)}function zn(e,n=v,t=!1,r=!0){let u=D;return t&&(u|=R),q(u,e,r,n,!0)}function Zn(e,n){let t=e.y;t===null?e.y=n:fe(t)?t.push(n):e.y=[t,n]}const tn=~(y|U|b);function A(e,n){e.f=e.f&tn|n}function rn(e){return typeof e=="object"&&e!==null&&typeof e.f=="number"}function un(e){return typeof e=="object"&&e!==null&&e.t===Ee}function Wn(e,n,t,r){var S;var u=(t&je)!==0,c=(S=Fe(e,n))==null?void 0:S.set,h=e[n];h===void 0&&r!==void 0&&(t&He&&(r=r()),h=r,c&&c(h));var i=()=>{var s=e[n];return s!==void 0&&(r=void 0),s===void 0?r:s};if(!(t&Ye))return i;if(c)return function(s){return arguments.length===1?(c(s),s):i()};var l=!1,E=Me(h),m=De(()=>{var s=i(),a=N(E);return l?(l=!1,a):E.v=s});return u||(m.e=_e),function(s,a=!1){var k=N(m);return arguments.length>0?((a||(u?s!==k:Pe(s,k)))&&(l=!0,se(E,a?k:s),N(m)),s):k}}function Pe(e,n){return e!=e?n==n:e!==n||e!==null&&typeof e=="object"||typeof e=="function"}function _e(e,n){return!Pe(e,n)}function Xn(){const e=f;if(e===null)throw new Error("ERR_SVELTE_ORPHAN_CONTEXT");let n=e.c;if(n===null){const t=cn(e);n=e.c=new Map(t||void 0)}return n}function cn(e){let n=e.p;for(;n!==null;){const t=n.c;if(t!==null)return t;n=n.p}return null}function $n(e,n){var c;var t=(c=e.$$events)==null?void 0:c[n.type],r=fe(t)?t.slice():t==null?[]:[t];for(var u of r)u.call(this,n)}function Gn(e,n=1){const t=N(e);return Ne(e,t+n),t}function sn(e){en(()=>()=>Qe(e))}function Jn(e,n=!1){f={a:null,c:null,e:null,m:!1,p:f,s:e,r:n,u:null}}function Qn(e){const n=f;if(n!==null){e!==void 0&&(n.a=e);const t=n.e;if(t!==null){n.e=null;for(let r=0;r<t.length;r++)P(t[r],!1)}f=n.p,n.m=!0}}function et(e,n){return{o:e,p:n,t:Ee}}function nt(e){return rn(e)?N(e):un(e)?e.o[e.p]:e}export{ln as $,En as A,qn as B,Rn as C,Bn as D,Ke as E,Vn as F,j as G,Te as H,de as I,kn as J,On as K,Fn as L,Sn as M,Be as N,pe as O,Le as P,nn as Q,Ue as R,Y as S,v as T,Z as U,o as V,Zn as W,Nn as X,_n as Y,In as Z,mn as _,Qe as a,xn as a0,fn as a1,rn as a2,Ln as a3,Dn as a4,pn as a5,Cn as a6,Re as a7,wn as a8,An as a9,et as aa,yn as ab,Ne as ac,un as ad,Mn as ae,bn as af,Pn as ag,Tn as ah,sn as ai,nt as aj,$n as ak,De as al,Un as am,Hn as b,f as c,Jn as d,Yn as e,dn as f,Xn as g,Wn as h,fe as i,gn as j,N as k,Je as l,se as m,an as n,hn as o,Qn as p,vn as q,zn as r,qe as s,jn as t,en as u,Gn as v,ne as w,Fe as x,Me as y,Kn as z};
