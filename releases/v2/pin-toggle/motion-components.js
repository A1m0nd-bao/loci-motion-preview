var lo={"motion-reveal":"motion-reveal:not(:defined){opacity:0}","motion-stagger":"motion-stagger:not(:defined)>*{opacity:0}","motion-split":"motion-split:not(:defined){opacity:0}","motion-headline":"motion-headline:not(:defined){opacity:0}","motion-ticker":"motion-ticker:not(:defined){opacity:0}","motion-slider":"motion-slider:not(:defined){opacity:0}","motion-gallery":"motion-gallery:not(:defined)>*{opacity:0}","motion-blur":"motion-blur:not(:defined){opacity:0}","motion-blur-in":"motion-blur-in:not(:defined){opacity:0}","motion-counter":"motion-counter:not(:defined){opacity:0}","motion-glitch":"motion-glitch:not(:defined){opacity:0}","motion-gravity":"motion-gravity:not(:defined){opacity:0}","motion-perspective":"motion-perspective:not(:defined){opacity:0}","motion-curve":"motion-curve:not(:defined){opacity:0}","motion-text-mask":"motion-text-mask:not(:defined){opacity:0}","motion-scramble":"motion-scramble:not(:defined){opacity:0}","motion-typewriter":"motion-typewriter:not(:defined){opacity:0}","motion-flip-card":"motion-flip-card:not(:defined){opacity:0}","motion-swap":"motion-swap:not(:defined){opacity:0}","motion-dialog":"motion-dialog:not(:defined){display:none}","motion-chart":"motion-chart:not(:defined){display:block;height:var(--mc-chart-height,16rem);overflow:hidden;visibility:hidden}","motion-pie":"motion-pie:not(:defined){display:block;height:var(--mc-chart-height,16rem);overflow:hidden;visibility:hidden}"},Mh=Object.values(lo).join("");function Th(t=Object.keys(lo)){if(typeof document>"u")return;let e=t.map(s=>lo[s]).filter(Boolean).join("");if(!e)return;let i=document.createElement("style");i.textContent=e,document.head.appendChild(i)}var ls=new Set,Zs=new Set,ho=new WeakSet,as=new Map,ti=new Set;function Nn(t){ls.add(t)}function In(t){ls.delete(t)}function re(t){Zs.add(t)}function oe(t){Zs.delete(t)}function Dn(t,e){as.set(t,e)}function Vn(t){as.delete(t)}function Bn(t){return ti.has(t)}function Lh(t=document){for(let e of ls)t.contains(e)&&e.playState==="running"&&e.pause();for(let e of Zs)t.contains(e)&&!e.disabled&&(e.disabled=!0,ho.add(e));for(let[e,i]of as)!t.contains(e)||ti.has(e)||(i()?.pause(),ti.add(e))}function _h(t=document){for(let e of ls)t.contains(e)&&e.playState==="paused"&&e.play();for(let e of Zs)t.contains(e)&&ho.has(e)&&(e.disabled=!1,ho.delete(e));for(let[e,i]of as)!t.contains(e)||!ti.has(e)||(ti.delete(e),i()?.play());for(let e of ti)as.has(e)||ti.delete(e)}function Oh(t=document){for(let e of ls)t.contains(e)&&e.cancel()}function ye(t,e){typeof customElements>"u"||customElements.get(t)||customElements.define(t,e)}var x=t=>e=>ye(t,e),Ei=globalThis.HTMLElement??class{};var Js=t=>t!==null&&t!=="false",y={fromAttribute:Js,toAttribute:t=>t?"":null};function ei(t,e,i){return t.hasAttribute(e)?Js(t.getAttribute(e)):i}function a(t,e,i,s){var r=arguments.length,o=r<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,i):s,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(t,e,i,s);else for(var h=t.length-1;h>=0;h--)(n=t[h])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Qs=globalThis,tr=Qs.ShadowRoot&&(Qs.ShadyCSS===void 0||Qs.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,po=Symbol(),zn=new WeakMap,hs=class{constructor(e,i,s){if(this._$cssResult$=!0,s!==po)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=i}get styleSheet(){let e=this.o,i=this.t;if(tr&&e===void 0){let s=i!==void 0&&i.length===1;s&&(e=zn.get(i)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&zn.set(i,e))}return e}toString(){return this.cssText}},Fn=t=>new hs(typeof t=="string"?t:t+"",void 0,po),v=(t,...e)=>{let i=t.length===1?t[0]:e.reduce((s,r,o)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+t[o+1],t[0]);return new hs(i,t,po)},Hn=(t,e)=>{if(tr)t.adoptedStyleSheets=e.map(i=>i instanceof CSSStyleSheet?i:i.styleSheet);else for(let i of e){let s=document.createElement("style"),r=Qs.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=i.cssText,t.appendChild(s)}},co=tr?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let i="";for(let s of e.cssRules)i+=s.cssText;return Fn(i)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var{is:Ph,defineProperty:Rh,getOwnPropertyDescriptor:Nh,getOwnPropertyNames:Ih,getOwnPropertySymbols:Dh,getPrototypeOf:Vh}=Object,er=globalThis,Un=er.trustedTypes,Bh=Un?Un.emptyScript:"",zh=er.reactiveElementPolyfillSupport,ps=(t,e)=>t,cs={toAttribute(t,e){switch(e){case Boolean:t=t?Bh:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=t!==null;break;case Number:i=t===null?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch{i=null}}return i}},ir=(t,e)=>!Ph(t,e),Wn={attribute:!0,type:String,converter:cs,reflect:!1,useDefault:!1,hasChanged:ir};Symbol.metadata??=Symbol("metadata"),er.litPropertyMetadata??=new WeakMap;var ge=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,i=Wn){if(i.state&&(i.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((i=Object.create(i)).wrapped=!0),this.elementProperties.set(e,i),!i.noAccessor){let s=Symbol(),r=this.getPropertyDescriptor(e,s,i);r!==void 0&&Rh(this.prototype,e,r)}}static getPropertyDescriptor(e,i,s){let{get:r,set:o}=Nh(this.prototype,e)??{get(){return this[i]},set(n){this[i]=n}};return{get:r,set(n){let h=r?.call(this);o?.call(this,n),this.requestUpdate(e,h,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Wn}static _$Ei(){if(this.hasOwnProperty(ps("elementProperties")))return;let e=Vh(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(ps("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ps("properties"))){let i=this.properties,s=[...Ih(i),...Dh(i)];for(let r of s)this.createProperty(r,i[r])}let e=this[Symbol.metadata];if(e!==null){let i=litPropertyMetadata.get(e);if(i!==void 0)for(let[s,r]of i)this.elementProperties.set(s,r)}this._$Eh=new Map;for(let[i,s]of this.elementProperties){let r=this._$Eu(i,s);r!==void 0&&this._$Eh.set(r,i)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let i=[];if(Array.isArray(e)){let s=new Set(e.flat(1/0).reverse());for(let r of s)i.unshift(co(r))}else e!==void 0&&i.push(co(e));return i}static _$Eu(e,i){let s=i.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,i=this.constructor.elementProperties;for(let s of i.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Hn(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,i,s){this._$AK(e,s)}_$ET(e,i){let s=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,s);if(r!==void 0&&s.reflect===!0){let o=(s.converter?.toAttribute!==void 0?s.converter:cs).toAttribute(i,s.type);this._$Em=e,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(e,i){let s=this.constructor,r=s._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let o=s.getPropertyOptions(r),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:cs;this._$Em=r;let h=n.fromAttribute(i,o.type);this[r]=h??this._$Ej?.get(r)??h,this._$Em=null}}requestUpdate(e,i,s,r=!1,o){if(e!==void 0){let n=this.constructor;if(r===!1&&(o=this[e]),s??=n.getPropertyOptions(e),!((s.hasChanged??ir)(o,i)||s.useDefault&&s.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,s))))return;this.C(e,i,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,i,{useDefault:s,reflect:r,wrapped:o},n){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??i??this[e]),o!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(i=void 0),this._$AL.set(e,i)),r===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(i){Promise.reject(i)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,o]of this._$Ep)this[r]=o;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[r,o]of s){let{wrapped:n}=o,h=this[r];n!==!0||this._$AL.has(r)||h===void 0||this.C(r,void 0,o,h)}}let e=!1,i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(i)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(i)}willUpdate(e){}_$AE(e){this._$EO?.forEach(i=>i.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(i=>this._$ET(i,this[i])),this._$EM()}updated(e){}firstUpdated(e){}};ge.elementStyles=[],ge.shadowRootOptions={mode:"open"},ge[ps("elementProperties")]=new Map,ge[ps("finalized")]=new Map,zh?.({ReactiveElement:ge}),(er.reactiveElementVersions??=[]).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var uo=globalThis,qn=t=>t,sr=uo.trustedTypes,jn=sr?sr.createPolicy("lit-html",{createHTML:t=>t}):void 0,fo="$lit$",ve=`lit$${Math.random().toFixed(9).slice(2)}$`,yo="?"+ve,Fh=`<${yo}>`,ri=document,ms=()=>ri.createComment(""),us=t=>t===null||typeof t!="object"&&typeof t!="function",go=Array.isArray,Jn=t=>go(t)||typeof t?.[Symbol.iterator]=="function",mo=`[ 	
\f\r]`,ds=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Kn=/-->/g,Gn=/>/g,ii=RegExp(`>|${mo}(?:([^\\s"'>=/]+)(${mo}*=${mo}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Yn=/'/g,Xn=/"/g,Qn=/^(?:script|style|textarea|title)$/i,vo=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),u=vo(1),O=vo(2),zd=vo(3),be=Symbol.for("lit-noChange"),k=Symbol.for("lit-nothing"),Zn=new WeakMap,si=ri.createTreeWalker(ri,129);function ta(t,e){if(!go(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return jn!==void 0?jn.createHTML(e):e}var ea=(t,e)=>{let i=t.length-1,s=[],r,o=e===2?"<svg>":e===3?"<math>":"",n=ds;for(let h=0;h<i;h++){let p=t[h],c,d,m=-1,g=0;for(;g<p.length&&(n.lastIndex=g,d=n.exec(p),d!==null);)g=n.lastIndex,n===ds?d[1]==="!--"?n=Kn:d[1]!==void 0?n=Gn:d[2]!==void 0?(Qn.test(d[2])&&(r=RegExp("</"+d[2],"g")),n=ii):d[3]!==void 0&&(n=ii):n===ii?d[0]===">"?(n=r??ds,m=-1):d[1]===void 0?m=-2:(m=n.lastIndex-d[2].length,c=d[1],n=d[3]===void 0?ii:d[3]==='"'?Xn:Yn):n===Xn||n===Yn?n=ii:n===Kn||n===Gn?n=ds:(n=ii,r=void 0);let b=n===ii&&t[h+1].startsWith("/>")?" ":"";o+=n===ds?p+Fh:m>=0?(s.push(c),p.slice(0,m)+fo+p.slice(m)+ve+b):p+ve+(m===-2?h:b)}return[ta(t,o+(t[i]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]},fs=class t{constructor({strings:e,_$litType$:i},s){let r;this.parts=[];let o=0,n=0,h=e.length-1,p=this.parts,[c,d]=ea(e,i);if(this.el=t.createElement(c,s),si.currentNode=this.el.content,i===2||i===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(r=si.nextNode())!==null&&p.length<h;){if(r.nodeType===1){if(r.hasAttributes())for(let m of r.getAttributeNames())if(m.endsWith(fo)){let g=d[n++],b=r.getAttribute(m).split(ve),S=/([.?@])?(.*)/.exec(g);p.push({type:1,index:o,name:S[2],strings:b,ctor:S[1]==="."?or:S[1]==="?"?nr:S[1]==="@"?ar:ni}),r.removeAttribute(m)}else m.startsWith(ve)&&(p.push({type:6,index:o}),r.removeAttribute(m));if(Qn.test(r.tagName)){let m=r.textContent.split(ve),g=m.length-1;if(g>0){r.textContent=sr?sr.emptyScript:"";for(let b=0;b<g;b++)r.append(m[b],ms()),si.nextNode(),p.push({type:2,index:++o});r.append(m[g],ms())}}}else if(r.nodeType===8)if(r.data===yo)p.push({type:2,index:o});else{let m=-1;for(;(m=r.data.indexOf(ve,m+1))!==-1;)p.push({type:7,index:o}),m+=ve.length-1}o++}}static createElement(e,i){let s=ri.createElement("template");return s.innerHTML=e,s}};function oi(t,e,i=t,s){if(e===be)return e;let r=s!==void 0?i._$Co?.[s]:i._$Cl,o=us(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),o===void 0?r=void 0:(r=new o(t),r._$AT(t,i,s)),s!==void 0?(i._$Co??=[])[s]=r:i._$Cl=r),r!==void 0&&(e=oi(t,r._$AS(t,e.values),r,s)),e}var rr=class{constructor(e,i){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:i},parts:s}=this._$AD,r=(e?.creationScope??ri).importNode(i,!0);si.currentNode=r;let o=si.nextNode(),n=0,h=0,p=s[0];for(;p!==void 0;){if(n===p.index){let c;p.type===2?c=new Ci(o,o.nextSibling,this,e):p.type===1?c=new p.ctor(o,p.name,p.strings,this,e):p.type===6&&(c=new lr(o,this,e)),this._$AV.push(c),p=s[++h]}n!==p?.index&&(o=si.nextNode(),n++)}return si.currentNode=ri,r}p(e){let i=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,i),i+=s.strings.length-2):s._$AI(e[i])),i++}},Ci=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,i,s,r){this.type=2,this._$AH=k,this._$AN=void 0,this._$AA=e,this._$AB=i,this._$AM=s,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,i=this._$AM;return i!==void 0&&e?.nodeType===11&&(e=i.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,i=this){e=oi(this,e,i),us(e)?e===k||e==null||e===""?(this._$AH!==k&&this._$AR(),this._$AH=k):e!==this._$AH&&e!==be&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Jn(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==k&&us(this._$AH)?this._$AA.nextSibling.data=e:this.T(ri.createTextNode(e)),this._$AH=e}$(e){let{values:i,_$litType$:s}=e,r=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=fs.createElement(ta(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===r)this._$AH.p(i);else{let o=new rr(r,this),n=o.u(this.options);o.p(i),this.T(n),this._$AH=o}}_$AC(e){let i=Zn.get(e.strings);return i===void 0&&Zn.set(e.strings,i=new fs(e)),i}k(e){go(this._$AH)||(this._$AH=[],this._$AR());let i=this._$AH,s,r=0;for(let o of e)r===i.length?i.push(s=new t(this.O(ms()),this.O(ms()),this,this.options)):s=i[r],s._$AI(o),r++;r<i.length&&(this._$AR(s&&s._$AB.nextSibling,r),i.length=r)}_$AR(e=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);e!==this._$AB;){let s=qn(e).nextSibling;qn(e).remove(),e=s}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},ni=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,i,s,r,o){this.type=1,this._$AH=k,this._$AN=void 0,this.element=e,this.name=i,this._$AM=r,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=k}_$AI(e,i=this,s,r){let o=this.strings,n=!1;if(o===void 0)e=oi(this,e,i,0),n=!us(e)||e!==this._$AH&&e!==be,n&&(this._$AH=e);else{let h=e,p,c;for(e=o[0],p=0;p<o.length-1;p++)c=oi(this,h[s+p],i,p),c===be&&(c=this._$AH[p]),n||=!us(c)||c!==this._$AH[p],c===k?e=k:e!==k&&(e+=(c??"")+o[p+1]),this._$AH[p]=c}n&&!r&&this.j(e)}j(e){e===k?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},or=class extends ni{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===k?void 0:e}},nr=class extends ni{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==k)}},ar=class extends ni{constructor(e,i,s,r,o){super(e,i,s,r,o),this.type=5}_$AI(e,i=this){if((e=oi(this,e,i,0)??k)===be)return;let s=this._$AH,r=e===k&&s!==k||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,o=e!==k&&(s===k||r);r&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},lr=class{constructor(e,i,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){oi(this,e)}},ia={M:fo,P:ve,A:yo,C:1,L:ea,R:rr,D:Jn,V:oi,I:Ci,H:ni,N:nr,U:ar,B:or,F:lr},Hh=uo.litHtmlPolyfillSupport;Hh?.(fs,Ci),(uo.litHtmlVersions??=[]).push("3.3.3");var sa=(t,e,i)=>{let s=i?.renderBefore??e,r=s._$litPart$;if(r===void 0){let o=i?.renderBefore??null;s._$litPart$=r=new Ci(e.insertBefore(ms(),o),o,void 0,i??{})}return r._$AI(t),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var bo=globalThis,w=class extends ge{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=sa(i,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return be}};w._$litElement$=!0,w.finalized=!0,bo.litElementHydrateSupport?.({LitElement:w});var Uh=bo.litElementPolyfillSupport;Uh?.({LitElement:w});(bo.litElementVersions??=[]).push("4.2.2");/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *//**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *//**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Wh={attribute:!0,type:String,converter:cs,reflect:!1,hasChanged:ir},qh=(t=Wh,e,i)=>{let{kind:s,metadata:r}=i,o=globalThis.litPropertyMetadata.get(r);if(o===void 0&&globalThis.litPropertyMetadata.set(r,o=new Map),s==="setter"&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),s==="accessor"){let{name:n}=i;return{set(h){let p=e.get.call(this);e.set.call(this,h),this.requestUpdate(n,p,t,!0,h)},init(h){return h!==void 0&&this.C(n,void 0,t,h),h}}}if(s==="setter"){let{name:n}=i;return function(h){let p=this[n];e.call(this,h),this.requestUpdate(n,p,t,!0,h)}}throw Error("Unsupported decorator location: "+s)};function l(t){return(e,i)=>typeof i=="object"?qh(t,e,i):((s,r,o)=>{let n=r.hasOwnProperty(o);return r.constructor.createProperty(o,s),n?Object.getOwnPropertyDescriptor(r,o):void 0})(t,e,i)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function D(t){return l({...t,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *//**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ai=(t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,i),i);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function at(t,e){return(i,s,r)=>{let o=n=>n.renderRoot?.querySelector(t)??null;if(e){let{get:n,set:h}=typeof s=="object"?i:r??(()=>{let p=Symbol();return{get(){return this[p]},set(c){this[p]=c}}})();return ai(i,s,{get(){let p=n.call(this);return p===void 0&&(p=o(this),(p!==null||this.hasUpdated)&&h.call(this,p)),p}})}return ai(i,s,{get(){return o(this)}})}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *//**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *//**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *//**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function xo(t,e){t.indexOf(e)===-1&&t.push(e)}function Kt(t,e){let i=t.indexOf(e);i>-1&&t.splice(i,1)}var xt=(t,e,i)=>i>e?e:i<t?t:i;function ra(t,e){return e?`${t}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${e}`:t}var Gt=()=>{},$t=()=>{};var Mt={};var ys=t=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t);var li=t=>typeof t=="object"&&t!==null;var gs=t=>/^0[^.\s]+$/u.test(t);function vs(t){let e;return()=>(e===void 0&&(e=t()),e)}var lt=t=>t;var hi=(...t)=>t.reduce((e,i)=>s=>i(e(s)));var Yt=(t,e,i)=>{let s=e-t;return s?(i-t)/s:1};var Mi=class{constructor(){this.subscriptions=[]}add(e){return xo(this.subscriptions,e),()=>this.remove(e)}remove(e){Kt(this.subscriptions,e)}notify(e,i,s){let r=this.subscriptions.length;if(r)if(r===1)this.subscriptions[0](e,i,s);else for(let o=0;o<r;o++){let n=this.subscriptions[o];n&&n(e,i,s)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}};var K=t=>t*1e3,wt=t=>t/1e3;var pi=(t,e)=>e?t*(1e3/e):0;var oa=new Set;function wo(t,e,i){t||oa.has(e)||(console.warn(ra(e,i)),oa.add(e))}var na=(t,e,i)=>{let s=e-t;return((i-t)%s+s)%s+t};var aa=(t,e,i)=>(((1-3*i+3*e)*t+(3*i-6*e))*t+3*e)*t,jh=1e-7,Kh=12;function Gh(t,e,i,s,r){let o,n,h=0;do n=e+(i-e)/2,o=aa(n,s,r)-t,o>0?i=n:e=n;while(Math.abs(o)>jh&&++h<Kh);return n}function Re(t,e,i,s){if(t===e&&i===s)return lt;let r=o=>Gh(o,0,1,t,i);return o=>o===0||o===1?o:aa(r(o),e,s)}var hr=t=>e=>e<=.5?t(2*e)/2:(2-t(2*(1-e)))/2;var ci=t=>e=>1-t(1-e);var pr=Re(.33,1.53,.69,.99),Ti=ci(pr),bs=hr(Ti);var xs=t=>t>=1?1:(t*=2)<1?.5*Ti(t):.5*(2-Math.pow(2,-10*(t-1)));var ws=t=>1-Math.sin(Math.acos(t)),ko=ci(ws),ks=hr(ws);var So=Re(.42,0,1,1),$o=Re(0,0,.58,1),Li=Re(.42,0,.58,1);var Ss=t=>Array.isArray(t)&&typeof t[0]!="number";function $s(t,e){return Ss(t)?t[na(0,t.length,e)]:t}var As=t=>Array.isArray(t)&&typeof t[0]=="number";var la={linear:lt,easeIn:So,easeInOut:Li,easeOut:$o,circIn:ws,circInOut:ks,circOut:ko,backIn:Ti,backInOut:bs,backOut:pr,anticipate:xs},Yh=t=>typeof t=="string",_i=t=>{if(As(t)){$t(t.length===4,"Cubic bezier arrays must contain four numerical values.","cubic-bezier-length");let[e,i,s,r]=t;return Re(e,i,s,r)}else if(Yh(t))return $t(la[t]!==void 0,`Invalid easing type '${t}'`,"invalid-easing-type"),la[t];return t};var Tt={delta:0,timestamp:0,isProcessing:!1};var cr;function Xh(){cr=void 0}var ht={now:()=>(cr===void 0&&ht.set(Tt.isProcessing||Mt.useManualTiming?Tt.timestamp:performance.now()),cr),set:t=>{cr=t,queueMicrotask(Xh)}};var ne=t=>Math.round(t*1e5)/1e5;var Zh=t=>e=>typeof e=="string"&&e.startsWith(t);var Jh=Zh("var(--"),Oi=t=>Jh(t)?Qh.test(t.split("/*")[0].trim()):!1,Qh=/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;function Ao(t){return typeof t!="string"?!1:t.split("/*")[0].includes("var(--")}var ae={test:t=>typeof t=="number",parse:parseFloat,transform:t=>t},xe={...ae,transform:t=>xt(0,1,t)},Es={...ae,default:1};var Pi=/-?(?:\d+(?:\.\d+)?|\.\d+)/gu;function ha(t){return t==null}var pa=/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu;var Ri=(t,e)=>i=>!!(typeof i=="string"&&pa.test(i)&&i.startsWith(t)||e&&!ha(i)&&Object.prototype.hasOwnProperty.call(i,e)),dr=(t,e,i)=>s=>{if(typeof s!="string")return s;let[r,o,n,h]=s.match(Pi);return{[t]:parseFloat(r),[e]:parseFloat(o),[i]:parseFloat(n),alpha:h!==void 0?parseFloat(h):1}};var tp=t=>xt(0,255,t),Eo={...ae,transform:t=>Math.round(tp(t))},le={test:Ri("rgb","red"),parse:dr("red","green","blue"),transform:({red:t,green:e,blue:i,alpha:s=1})=>"rgba("+Eo.transform(t)+", "+Eo.transform(e)+", "+Eo.transform(i)+", "+ne(xe.transform(s))+")"};function ep(t){let e="",i="",s="",r="";return t.length>5?(e=t.substring(1,3),i=t.substring(3,5),s=t.substring(5,7),r=t.substring(7,9)):(e=t.substring(1,2),i=t.substring(2,3),s=t.substring(3,4),r=t.substring(4,5),e+=e,i+=i,s+=s,r+=r),{red:parseInt(e,16),green:parseInt(i,16),blue:parseInt(s,16),alpha:r?parseInt(r,16)/255:1}}var Cs={test:Ri("#"),parse:ep,transform:le.transform};var Ms=t=>({test:e=>typeof e=="string"&&e.endsWith(t)&&e.split(" ").length===1,parse:parseFloat,transform:e=>`${e}${t}`}),Xt=Ms("deg"),Ne=Ms("%"),A=Ms("px"),ca=Ms("vh"),da=Ms("vw"),Co={...Ne,parse:t=>Ne.parse(t)/100,transform:t=>Ne.transform(t*100)};var Ie={test:Ri("hsl","hue"),parse:dr("hue","saturation","lightness"),transform:({hue:t,saturation:e,lightness:i,alpha:s=1})=>"hsla("+Math.round(t)+", "+Ne.transform(ne(e))+", "+Ne.transform(ne(i))+", "+ne(xe.transform(s))+")"};var it={test:t=>le.test(t)||Cs.test(t)||Ie.test(t),parse:t=>le.test(t)?le.parse(t):Ie.test(t)?Ie.parse(t):Cs.parse(t),transform:t=>typeof t=="string"?t:t.hasOwnProperty("red")?le.transform(t):Ie.transform(t),getAnimatableNone:t=>{let e=it.parse(t);return e.alpha=0,it.transform(e)}};var ma=/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;var fa=new RegExp(Pi.source),ya=new RegExp(ma.source,"i");function ip(t){return isNaN(t)&&typeof t=="string"&&(fa.test(t)||ya.test(t))}var ga="number",va="color",sp="var",rp="var(",ua="${}",op=/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;function ba(t){let e=t.toString();return fa.test(e)||ya.test(e)}function Ni(t){let e=t.toString(),i=[],s={color:[],number:[],var:[]},r=[],o=0,h=e.replace(op,p=>(it.test(p)?(s.color.push(o),r.push(va),i.push(it.parse(p))):p.startsWith(rp)?(s.var.push(o),r.push(sp),i.push(p)):(s.number.push(o),r.push(ga),i.push(parseFloat(p))),++o,ua)).split(ua);return{values:i,split:h,indexes:s,types:r}}function np(t){return Ni(t).values}function xa({split:t,types:e}){let i=t.length;return s=>{let r="";for(let o=0;o<i;o++)if(r+=t[o],s[o]!==void 0){let n=e[o];n===ga?r+=ne(s[o]):n===va?r+=it.transform(s[o]):r+=s[o]}return r}}function ap(t){return xa(Ni(t))}var lp=t=>typeof t=="number"?0:it.test(t)?it.getAnimatableNone(t):t,hp=(t,e)=>typeof t=="number"?e?.trim().endsWith("/")?t:0:lp(t);function pp(t){let e=Ni(t);return xa(e)(e.values.map((s,r)=>hp(s,e.split[r])))}var At={test:ip,parse:np,createTransformer:ap,getAnimatableNone:pp};function Mo(t,e,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?t+(e-t)*6*i:i<1/2?e:i<2/3?t+(e-t)*(2/3-i)*6:t}function wa({hue:t,saturation:e,lightness:i,alpha:s}){t/=360,e/=100,i/=100;let r=0,o=0,n=0;if(!e)r=o=n=i;else{let h=i<.5?i*(1+e):i+e-i*e,p=2*i-h;r=Mo(p,h,t+1/3),o=Mo(p,h,t),n=Mo(p,h,t-1/3)}return{red:Math.round(r*255),green:Math.round(o*255),blue:Math.round(n*255),alpha:s}}function Ii(t,e){return i=>i>0?e:t}var Vt=(t,e,i)=>t+(e-t)*i;var To=(t,e,i)=>{let s=t*t,r=i*(e*e-s)+s;return r<0?0:Math.sqrt(r)},cp=[Cs,le,Ie],dp=t=>cp.find(e=>e.test(t));function ka(t){let e=dp(t);if(!e)return Gt(!1,`'${t}' is not an animatable color. Use the equivalent color code instead.`,"color-not-animatable"),!1;let i=e.parse(t);return e===Ie&&(i=wa(i)),i}var Lo=(t,e)=>{let i=ka(t),s=ka(e);if(!i||!s)return Ii(t,e);let r={...i};return o=>(r.red=To(i.red,s.red,o),r.green=To(i.green,s.green,o),r.blue=To(i.blue,s.blue,o),r.alpha=Vt(i.alpha,s.alpha,o),le.transform(r))};var mr=new Set(["none","hidden"]);function Sa(t,e){return mr.has(t)?i=>i<=0?t:e:i=>i>=1?e:t}function mp(t,e){return i=>Vt(t,e,i)}function ur(t){return typeof t=="number"?mp:typeof t=="string"?Oi(t)?Ii:it.test(t)?Lo:yp:Array.isArray(t)?$a:typeof t=="object"?it.test(t)?Lo:up:Ii}function $a(t,e){let i=[...t],s=i.length,r=t.map((o,n)=>ur(o)(o,e[n]));return o=>{for(let n=0;n<s;n++)i[n]=r[n](o);return i}}function up(t,e){let i={...t,...e},s={};for(let r in i)t[r]!==void 0&&e[r]!==void 0&&(s[r]=ur(t[r])(t[r],e[r]));return r=>{for(let o in s)i[o]=s[o](r);return i}}function fp(t,e){let i=[],s={color:0,var:0,number:0};for(let r=0;r<e.values.length;r++){let o=e.types[r],n=t.indexes[o][s[o]],h=t.values[n]??0;i[r]=h,s[o]++}return i}var yp=(t,e)=>{let i=At.createTransformer(e),s=Ni(t),r=Ni(e);return s.indexes.var.length===r.indexes.var.length&&s.indexes.color.length===r.indexes.color.length&&s.indexes.number.length>=r.indexes.number.length?mr.has(t)&&!r.values.length||mr.has(e)&&!s.values.length?Sa(t,e):hi($a(fp(s,r),r.values),i):(Gt(!0,`Complex values '${t}' and '${e}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`,"complex-values-different"),Ii(t,e))};var Aa=/^(-?(?:\d+(?:\.\d*)?|\.\d+))([a-z%]*)$/iu;function gp(t,e){let i=Aa.exec(t);if(!i)return;let s=Aa.exec(e);if(!s||i[2]!==s[2])return;let r=i[2],o=parseFloat(i[1]),n=parseFloat(s[1]);return h=>ne(Vt(o,n,h))+r}function Di(t,e,i){if(typeof t=="number"&&typeof e=="number"&&typeof i=="number")return Vt(t,e,i);if(typeof t=="string"&&typeof e=="string"){let r=gp(t,e);if(r)return r}return ur(t)(t,e)}var Ts=["setup","read","resolveKeyframes","preUpdate","update","preRender","render","postRender"];function Ea(t){let e=new Set,i=new Set,s=!1,r=!1,o=new Set,n={delta:0,timestamp:0,isProcessing:!1};function h(c){o.has(c)&&(i.add(c),t()),c(n)}let p={schedule:(c,d=!1,m=!1)=>{let b=m&&s?e:i;return d&&o.add(c),b.add(c),c},cancel:c=>{i.delete(c),o.delete(c)},process:c=>{if(n=c,s){r=!0;return}s=!0;let d=e;e=i,i=d,e.forEach(h),e.clear(),s=!1,r&&(r=!1,p.process(c))}};return p}var vp=40;function fr(t,e,i={delta:0,timestamp:0,isProcessing:!1}){let s=!1,r=!0,o=()=>s=!0,n=Ts.reduce((B,P)=>(B[P]=Ea(o),B),{}),{setup:h,read:p,resolveKeyframes:c,preUpdate:d,update:m,preRender:g,render:b,postRender:S}=n,E=()=>{let B=Mt.useManualTiming,P=B?i.timestamp:performance.now();s=!1,B||(i.delta=r?1e3/60:Math.max(Math.min(P-i.timestamp,vp),1)),i.timestamp=P,i.isProcessing=!0,h.process(i),p.process(i),c.process(i),d.process(i),m.process(i),g.process(i),b.process(i),S.process(i),i.isProcessing=!1,s&&e&&(r=!1,t(E))},T=()=>{s=!0,r=!0,i.isProcessing||t(E)};return{schedule:Ts.reduce((B,P)=>{let U=n[P];return B[P]=(G,$=!1,L=!1)=>(s||T(),U.schedule(G,$,L)),B},{}),cancel:B=>{for(let P=0;P<Ts.length;P++)n[Ts[P]].cancel(B)},state:i,steps:n}}var{schedule:st,cancel:Vi,steps:bp}=fr(typeof requestAnimationFrame<"u"?requestAnimationFrame:lt,!0,Tt);var Ca=t=>{let e=({timestamp:i})=>t(i);return{start:(i=!0)=>st.update(e,i),stop:()=>Vi(e),now:()=>Tt.isProcessing?Tt.timestamp:ht.now()}};var yr=(t,e,i=10)=>{let s="",r=Math.max(Math.round(e/i),2);for(let o=0;o<r;o++)s+=Math.round(t(o/(r-1))*1e4)/1e4+", ";return`linear(${s.substring(0,s.length-2)})`};function Bi(t,e=50,i=2e4,s){let r=0,o=t.next(r);for(s?.push(o.value);!o.done&&r<i;)r+=e,o=t.next(r),s?.push(o.value);return r>=i?1/0:r}function Ls(t,e=100,i){let s=i({...t,keyframes:[0,e]}),r=Math.min(Bi(s),2e4);return{type:"keyframes",ease:o=>s.next(r*o).value/e,duration:wt(r)}}var mt={stiffness:100,damping:10,mass:1,duration:800,bounce:.3,visualDuration:.3,restSpeed:{granular:.01,default:2},restDelta:{granular:.005,default:.5},minDuration:.01,maxDuration:10,minDamping:.05},Ma=t=>t<0?1/Math.max(1+t,mt.minDamping):Math.max(1-t,mt.minDamping);function Ta(t,e){if(!(t>1))return 1;let i=Math.sqrt(t*t-1),s=t-i,r=t+i,o=2*i*Math.exp(-e)*(1+e);return La(n=>r*Math.exp(-s*n)-s*Math.exp(-r*n)-o,n=>Math.exp(-r*n)-Math.exp(-s*n),e)/e}function Ro(t,e){return t*Math.sqrt(1-e*e)}var xp=12;function La(t,e,i){let s=i;for(let r=1;r<xp;r++)s=s-t(s)/e(s);return s}var Oo=.001;function wp({duration:t=mt.duration,bounce:e=mt.bounce}){let i,s;Gt(t<=K(mt.maxDuration),"Spring duration must be 10 seconds or less","spring-duration-limit");let r=Ma(e);t=xt(mt.minDuration,mt.maxDuration,wt(t)),r<1?(i=c=>{let d=c*r,m=d*t,g=Ro(c,r),b=Math.exp(-m);return Oo-d/g*b},s=c=>{let m=c*r*t,g=r*r*c*c*t,b=Math.exp(-m),S=Ro(c*c,r);return(-i(c)+Oo>0?-1:1)*-g*b/S}):(i=c=>{let d=Math.exp(-c*t),m=c*t+1;return-Oo+d*m},s=c=>{let d=Math.exp(-c*t),m=-c*(t*t);return d*m});let o=5/t,n=La(i,s,o),h=n*Ta(r,n*t),p=h*h;return{stiffness:p,damping:r*2*Math.sqrt(p),duration:K(t)}}var No=(t,e)=>(e?t>=0:t>0)&&t<1/0;function Po(t,e){if(No(t,e))return t}function kp(t){let e=Po(t.stiffness),i=Po(t.damping,!0),s=Po(t.mass),r={...t,stiffness:e??mt.stiffness,damping:i??mt.damping,mass:s??mt.mass,isResolvedFromDuration:!1,isTimeDefined:(e??i??s)===void 0&&(t.duration!==void 0||t.bounce!==void 0)};if(r.isTimeDefined){if(t.visualDuration){let o=Ma(t.bounce||0),n=2*Math.PI/(t.visualDuration*1.2)*Ta(o,2*Math.PI/1.2);r.stiffness=n*n,r.damping=2*o*Math.sqrt(r.stiffness)}else Object.assign(r,wp(r)),r.isResolvedFromDuration=!0;(!No(r.stiffness)||!No(r.damping,!0))&&(r.stiffness=mt.stiffness,r.damping=mt.damping)}return r}function we(t=mt.visualDuration,e=mt.bounce){let i=typeof t!="object"?{visualDuration:t,keyframes:[0,1],bounce:e}:t,s=i.keyframes[0],r=i.keyframes[i.keyframes.length-1],o={done:!1,value:s},{stiffness:n,damping:h,mass:p,duration:c,isResolvedFromDuration:d,isTimeDefined:m}=kp({...i}),g=$=>m?0:-wt($),b=h/(2*Math.sqrt(n*p)),S=wt(Math.sqrt(n/p)),E=b*S,T={target:r,delta:r-s,velocity:g(i.velocity||0)||0,restSpeed:0,restDelta:0},V=()=>{let $=Math.abs(T.delta)<5;T.restSpeed=i.restSpeed||($?mt.restSpeed.granular:mt.restSpeed.default),T.restDelta=i.restDelta||($?mt.restDelta.granular:mt.restDelta.default)};V();let j,B,P;if(b<1){let $=Ro(S,b),L={A:0,sinC:0,cosC:0,t:-1,env:0,sin:0,cos:0};P=()=>{L.A=(T.velocity+E*T.delta)/$,L.sinC=E*L.A+T.delta*$,L.cosC=E*T.delta-L.A*$};let R=H=>{H!==L.t&&(L.t=H,L.env=Math.exp(-E*H),L.sin=Math.sin($*H),L.cos=Math.cos($*H))};j=H=>(R(H),T.target-L.env*(L.A*L.sin+T.delta*L.cos)),B=H=>(R(H),L.env*(L.sinC*L.sin+L.cosC*L.cos))}else if(b===1){j=L=>T.target-Math.exp(-S*L)*(T.delta+(T.velocity+S*T.delta)*L);let $={C:0};P=()=>{$.C=T.velocity+S*T.delta},B=L=>Math.exp(-S*L)*(S*$.C*L-T.velocity)}else{let $=S*Math.sqrt(b*b-1),L=E-$,R=E+$,H=m?1/0:300/$,pt=(J,ue)=>Math.exp(ue>H?-J*H-E*(ue-H):-J*ue),Pt={S:0,F:0};P=()=>{let J=(T.velocity+E*T.delta)/$;Pt.S=(T.delta+J)/2,Pt.F=(T.delta-J)/2},j=J=>T.target-Pt.S*pt(L,J)-Pt.F*pt(R,J),B=J=>L*Pt.S*pt(L,J)+R*Pt.F*pt(R,J)}P();let U=d&&c||null,G={calculatedDuration:U,retarget:($,L)=>{T.target=$[$.length-1],T.delta=T.target-$[0],T.velocity=g(L),i.restSpeed&&i.restDelta||V(),G.calculatedDuration=U,o.done=!1,P()},velocity:$=>K(B($)),next:$=>{let L=j($);if(d)o.done=$>=c;else{let R=K(B($));o.done=Math.abs(R)<=T.restSpeed&&Math.abs(T.target-L)<=T.restDelta}return o.value=o.done?T.target:L,o},toString:()=>{let $=Math.min(Bi(G),2e4),L=yr(R=>G.next($*R).value,$,30);return $+"ms "+L},toTransition:()=>{}};return G}we.applyToOptions=t=>{let e=Ls(t,100,we);return t.ease=e.ease,t.duration=K(e.duration),t.type="keyframes",t};function _s({keyframes:t,velocity:e=0,power:i=.8,timeConstant:s=325,bounceDamping:r=10,bounceStiffness:o=500,modifyTarget:n,min:h,max:p,restDelta:c=.5,restSpeed:d}){let m=t[0],g={done:!1,value:m},b=$=>$<h||$>p,S=$=>h===void 0?p:p===void 0||Math.abs(h-$)<Math.abs(p-$)?h:p,E=i*e,T=m+E,V=n===void 0?T:n(T);V!==T&&(E=V-m);let j=$=>-E*Math.exp(-$/s),B=$=>{let L=j($);g.done=Math.abs(L)<=c,g.value=g.done?V:V+L},P,U,G=$=>{b(g.value)&&(P=$,U=we({keyframes:[g.value,S(g.value)],velocity:-j($)/s*1e3,damping:r,stiffness:o,restDelta:c,restSpeed:d}))};return G(0),{calculatedDuration:null,next:$=>{let L=!1;return!U&&P===void 0&&(L=!0,B($),G($)),P!==void 0&&$>=P?U.next($-P):(!L&&B($),g)}}}function Sp(t,e,i){let s=[],r=i||Mt.mix||Di,o=t.length-1;for(let n=0;n<o;n++){let h=r(t[n],t[n+1]);if(e){let p=Array.isArray(e)?e[n]||lt:e;h=hi(p,h)}s.push(h)}return s}function _a(t,e,{clamp:i=!0,ease:s,mixer:r}={}){let o=t.length;if($t(o===e.length,"Both input and output ranges must be the same length","range-length"),o===1)return()=>e[0];if(o===2&&e[0]===e[1])return()=>e[1];let n=t[0]===t[1];t[0]>t[o-1]&&(t=[...t].reverse(),e=[...e].reverse());let h=Sp(e,s,r),p=h.length,c=d=>{if(n&&d<t[0])return e[0];let m=0;if(p>1)for(;m<t.length-2&&!(d<t[m+1]);m++);let g=Yt(t[m],t[m+1],d);return h[m](g)};return i?d=>c(xt(t[0],t[o-1],d)):c}function Os(t,e){let i=t[t.length-1];for(let s=1;s<=e;s++){let r=Yt(0,e,s);t.push(Vt(i,1,r))}}function Ps(t){let e=[0];return Os(e,t.length-1),e}function Oa(t,e){return t.map(i=>i*e)}function $p(t,e){return t.map(()=>e||Li).splice(0,t.length-1)}function di({duration:t=300,keyframes:e,times:i,ease:s="easeInOut"}){let r=Ss(s)?s.map(_i):_i(s)||Li,o={done:!1,value:e[0]};if(e.length===2&&!Array.isArray(r)&&(!i||i.length!==2||i[0]===0&&i[1]===1)){let[p,c]=e,d=p===c?void 0:(Mt.mix||Di)(p,c);return{calculatedDuration:t,next:m=>(o.value=d?d(r(t>0?xt(0,1,m/t):1)):c,o.done=m>=t,o)}}let n=Oa(i&&i.length===e.length?i:Ps(e),t),h=_a(n,e,{ease:Array.isArray(r)?r:$p(e,r)});return{calculatedDuration:t,next:p=>(o.value=h(p),o.done=p>=t,o)}}var Ap=5;function Ep(t,e,i){let s=Math.max(e-Ap,0);return pi(i-t(s),e-s)}function Pa(t,e,i=0){return e<=0?i:t.velocity?t.velocity(e):Ep(s=>t.next(s).value,e,t.next(e).value)}var Cp=t=>t!==null;function De(t,{repeat:e,repeatType:i="loop"},s,r=1){let o=t.filter(Cp),h=r<0||e&&i!=="loop"&&e%2===1?0:o.length-1;return!h||s===void 0?o[h]:s}var Mp={decay:_s,inertia:_s,tween:di,keyframes:di,spring:we};function gr(t){typeof t.type=="string"&&(t.type=Mp[t.type])}function Tp(t,e){return{kind:t,animation:e,timestamp:ht.now(),frameTimestamp:Tt.timestamp,frameIsProcessing:Tt.isProcessing}}function zi(t,e,i){let s=globalThis.__MOTION_INSPECT__;if(s)try{s({...Tp("animation-start",t),options:i?{...e,...i}:e})}catch{}}var Ve=class{constructor(){this.isResolved=!1}get finished(){return this._finished||(this._finished=this.isResolved?Promise.resolve():new Promise(e=>{this._resolve=e})),this._finished}updateFinished(){this._finished=this._resolve=void 0,this.isResolved=!1}notifyFinished(){this.isResolved=!0,this._resolve?.()}then(e,i){return this.finished.then(e,i)}};var Lp=t=>t/100,ke=class extends Ve{constructor(e){super(),this.state="idle",this.startTime=null,this.isStopped=!1,this.currentTime=0,this.holdTime=null,this.playbackSpeed=1,this.delayState={done:!1,value:void 0},this.stop=()=>{let{motionValue:i}=this.options;i&&i.updatedAt!==ht.now()&&this.tick(ht.now()),this.isStopped=!0,this.state!=="idle"&&(this.teardown(),this.options.onStop?.())},this.options=e,this.initAnimation(),this.play(),e.autoplay===!1&&this.pause(),zi(this,this.options)}initAnimation(){let{options:e}=this;gr(e);let{type:i=di,repeat:s=0,repeatDelay:r=0,repeatType:o,velocity:n=0}=e,{keyframes:h}=e,p=i||di;p!==di&&typeof h[0]!="number"&&(this.mixKeyframes=hi(Lp,Di(h[0],h[1])),h=[0,100]);let c=p(h===e.keyframes?e:{...e,keyframes:h});o==="mirror"&&(this.mirroredGenerator=p({...e,keyframes:[...h].reverse(),velocity:-n})),c.calculatedDuration===null&&(c.calculatedDuration=Bi(c));let{calculatedDuration:d}=c;this.calculatedDuration=d,this.resolvedDuration=d+r,this.totalDuration=this.resolvedDuration*(s+1)-r,this.generator=c}updateTime(e){let i=Math.round(e-this.startTime)*this.playbackSpeed;this.holdTime!==null?this.currentTime=this.holdTime:this.currentTime=i}tick(e,i=!1){let{generator:s,totalDuration:r,mixKeyframes:o,mirroredGenerator:n,resolvedDuration:h,calculatedDuration:p}=this;if(this.startTime===null)return s.next(0);let{delay:c=0,keyframes:d,repeat:m,repeatType:g,repeatDelay:b,type:S,onUpdate:E,finalKeyframe:T}=this.options;this.speed>0?this.startTime=Math.min(this.startTime,e):this.speed<0&&(this.startTime=Math.min(e-r/this.speed,this.startTime)),i?this.currentTime=e:this.updateTime(e);let V=this.currentTime-c*(this.playbackSpeed>=0?1:-1),j=this.playbackSpeed>=0?V<0:V>r;this.currentTime=Math.max(V,0),this.state==="finished"&&this.holdTime===null&&(this.currentTime=r);let B=this.currentTime,P=s;if(m){let L=Math.min(this.currentTime,r)/h,R=Math.floor(L),H=L%1;!H&&L>=1&&(H=1),H===1&&R--,R=Math.min(R,m+1),R%2&&(g==="reverse"?(H=1-H,b&&(H-=b/h)):g==="mirror"&&(P=n)),B=xt(0,1,H)*h}let U;j?(this.delayState.value=d[0],U=this.delayState):U=P.next(B),o&&!j&&(U.value=o(U.value));let{done:G}=U;!j&&p!==null&&(G=this.playbackSpeed>=0?this.currentTime>=r:this.currentTime<=0);let $=this.holdTime===null&&(this.state==="finished"||this.state==="running"&&G);return $&&S!==_s&&(U.value=De(d,this.options,T,this.speed)),E&&E(U.value),$&&this.finish(),U}then(e,i){return this.finished.then(e,i)}get duration(){return wt(this.calculatedDuration)}get iterationDuration(){let{delay:e=0}=this.options||{};return this.duration+wt(e)}get time(){return wt(this.currentTime)}set time(e){e=K(e),this.currentTime=e,this.startTime===null||this.holdTime!==null||this.playbackSpeed===0?this.holdTime=e:this.driver&&(this.startTime=this.driver.now()-e/this.playbackSpeed),this.driver?this.driver.start(!1):(this.startTime=0,this.state="paused",this.holdTime=e,this.tick(e))}getGeneratorVelocity(){return Pa(this.generator,this.currentTime,this.options.velocity)}get speed(){return this.playbackSpeed}set speed(e){let i=this.playbackSpeed!==e;i&&this.driver&&this.updateTime(ht.now()),this.playbackSpeed=e,i&&this.driver&&(this.time=wt(this.currentTime))}play(){if(this.isStopped)return;let{driver:e=Ca,startTime:i}=this.options;this.driver||(this.driver=e(r=>this.tick(r))),this.options.onPlay?.();let s=this.driver.now();this.state==="finished"?(this.updateFinished(),this.startTime=s):this.holdTime!==null?this.startTime=s-this.holdTime:this.startTime||(this.startTime=i??s),this.state==="finished"&&this.speed<0&&(this.startTime+=this.calculatedDuration),this.holdTime=null,this.state="running",this.driver.start()}pause(){this.state="paused",this.updateTime(ht.now()),this.holdTime=this.currentTime}complete(){this.state!=="running"&&this.play(),this.state="finished",this.holdTime=null}finish(){this.notifyFinished(),this.teardown(),this.state="finished",this.options.onComplete?.()}cancel(){this.holdTime=null,this.startTime=0,this.tick(0),this.teardown(),this.options.onCancel?.()}teardown(){this.state="idle",this.stopDriver(),this.startTime=this.holdTime=null}stopDriver(){this.driver&&(this.driver.stop(),this.driver=void 0)}sample(e){return this.startTime=0,this.tick(e,!0)}attachTimeline(e){return this.options.allowFlatten&&(this.options.type="keyframes",this.options.ease="linear",this.initAnimation()),this.driver?.stop(),e.observe(this)}};var _p=new Set(["brightness","contrast","saturate","opacity"]);function Op(t){let[e,i]=t.slice(0,-1).split("(");if(e==="drop-shadow")return t;let[s]=i.match(Pi)||[];if(!s)return t;let r=i.replace(s,""),o=_p.has(e)?1:0;return s!==i&&(o*=100),e+"("+o+r+")"}var Pp=/\b([a-z-]*)\(.*?\)/gu,Rs={...At,getAnimatableNone:t=>{let e=t.match(Pp);return e?e.map(Op).join(" "):t}};var Ns={...At,getAnimatableNone:t=>{let e=At.parse(t);return At.createTransformer(t)(e.map(s=>typeof s=="number"?0:typeof s=="object"?{...s,alpha:1}:s))}};var Io={...ae,transform:Math.round};var Is={rotate:Xt,pathRotation:Xt,rotateX:Xt,rotateY:Xt,rotateZ:Xt,scale:Es,scaleX:Es,scaleY:Es,scaleZ:Es,skew:Xt,skewX:Xt,skewY:Xt,distance:A,translateX:A,translateY:A,translateZ:A,x:A,y:A,z:A,perspective:A,transformPerspective:A,opacity:xe,originX:Co,originY:Co,originZ:A};var Zt={borderWidth:A,borderTopWidth:A,borderRightWidth:A,borderBottomWidth:A,borderLeftWidth:A,borderRadius:A,borderTopLeftRadius:A,borderTopRightRadius:A,borderBottomRightRadius:A,borderBottomLeftRadius:A,width:A,maxWidth:A,height:A,maxHeight:A,top:A,right:A,bottom:A,left:A,inset:A,insetBlock:A,insetBlockStart:A,insetBlockEnd:A,insetInline:A,insetInlineStart:A,insetInlineEnd:A,padding:A,paddingTop:A,paddingRight:A,paddingBottom:A,paddingLeft:A,paddingBlock:A,paddingBlockStart:A,paddingBlockEnd:A,paddingInline:A,paddingInlineStart:A,paddingInlineEnd:A,margin:A,marginTop:A,marginRight:A,marginBottom:A,marginLeft:A,marginBlock:A,marginBlockStart:A,marginBlockEnd:A,marginInline:A,marginInlineStart:A,marginInlineEnd:A,fontSize:A,backgroundPositionX:A,backgroundPositionY:A,...Is,zIndex:Io,fillOpacity:xe,strokeOpacity:xe,numOctaves:Io};var Rp={...Zt,color:it,backgroundColor:it,outlineColor:it,fill:it,stroke:it,borderColor:it,borderTopColor:it,borderRightColor:it,borderBottomColor:it,borderLeftColor:it,filter:Rs,WebkitFilter:Rs,mask:Ns,WebkitMask:Ns},Ra=t=>Rp[t];var Np=new Set([Rs,Ns]);function vr(t,e){let i=Ra(t);return Np.has(i)||(i=At),i.getAnimatableNone?i.getAnimatableNone(e):void 0}function Na(t){for(let e=1;e<t.length;e++)t[e]??(t[e]=t[e-1])}var mi=t=>t*180/Math.PI,Do=t=>{let e=mi(Math.atan2(t[1],t[0]));return Vo(e)},Ip={x:4,y:5,translateX:4,translateY:5,scaleX:0,scaleY:3,scale:t=>(Math.abs(t[0])+Math.abs(t[3]))/2,rotate:Do,rotateZ:Do,skewX:t=>mi(Math.atan(t[1])),skewY:t=>mi(Math.atan(t[2])),skew:t=>(Math.abs(t[1])+Math.abs(t[2]))/2},Vo=t=>(t=t%360,t<0&&(t+=360),t),Ia=Do,Da=t=>Math.sqrt(t[0]*t[0]+t[1]*t[1]),Va=t=>Math.sqrt(t[4]*t[4]+t[5]*t[5]),Dp={x:12,y:13,z:14,translateX:12,translateY:13,translateZ:14,scaleX:Da,scaleY:Va,scale:t=>(Da(t)+Va(t))/2,rotateX:t=>Vo(mi(Math.atan2(t[6],t[5]))),rotateY:t=>Vo(mi(Math.atan2(-t[2],t[0]))),rotateZ:Ia,rotate:Ia,skewX:t=>mi(Math.atan(t[4])),skewY:t=>mi(Math.atan(t[1])),skew:t=>(Math.abs(t[1])+Math.abs(t[4]))/2};function Ba(t){return t.includes("scale")?1:0}function br(t,e){if(!t||t==="none")return Ba(e);let i=t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u),s,r;if(i)s=Dp,r=i;else{let h=t.match(/^matrix\(([-\d.e\s,]+)\)$/u);s=Ip,r=h}if(!r)return Ba(e);let o=s[e],n=r[1].split(",").map(Vp);return typeof o=="function"?o(n):n[o]}var za=(t,e)=>{let{transform:i="none"}=getComputedStyle(t);return br(i,e)};function Vp(t){return parseFloat(t.trim())}var Be=["transformPerspective","x","y","z","translateX","translateY","translateZ","scale","scaleX","scaleY","rotate","rotateX","rotateY","rotateZ","skew","skewX","skewY"],ze=new Set([...Be,"pathRotation"]);var Bo=t=>t===ae||t===A,Bp=new Set(["x","y","z"]),zp=Be.filter(t=>!Bp.has(t));function Ha(t){let e=[];return zp.forEach(i=>{let s=t.getValue(i);if(s!==void 0){let r=s.get(),o=i.startsWith("scale")?1:0;if(r===o)return;e.push([i,r]),s.set(o)}}),e}var Ua=new Set(["bottom","right"]);function Fa(t,e,i,s,r,o){let n=parseFloat(t);if(!isNaN(n))return n;let{min:h,max:p}=e()[i],c=p-h;return o==="border-box"?c:c-parseFloat(s)-parseFloat(r)}var Fe={width:({width:t,paddingLeft:e="0",paddingRight:i="0",boxSizing:s},r)=>Fa(t,r,"x",e,i,s),height:({height:t,paddingTop:e="0",paddingBottom:i="0",boxSizing:s},r)=>Fa(t,r,"y",e,i,s),top:({top:t})=>parseFloat(t),left:({left:t})=>parseFloat(t),bottom:({top:t},e)=>{let{y:i}=e();return parseFloat(t)+(i.max-i.min)},right:({left:t},e)=>{let{x:i}=e();return parseFloat(t)+(i.max-i.min)},x:({transform:t})=>br(t,"x"),y:({transform:t})=>br(t,"y")};Fe.translateX=Fe.x;Fe.translateY=Fe.y;var ui=new Set,zo=!1,Fo=!1,Ho=!1;function Wa(){if(Fo){let t=[],e=new Set,i=new Set;ui.forEach(r=>{r.needsMeasurement&&(t.push(r),e.add(r.element),Ua.has(r.name)&&i.add(r.element))});let s=new Map;i.forEach(r=>{let o=Ha(r);o.length&&(s.set(r,o),r.render())}),t.forEach(r=>r.measureInitialState()),e.forEach(r=>{r.render();let o=s.get(r);o&&o.forEach(([n,h])=>{r.getValue(n)?.set(h)})}),t.forEach(r=>r.measureEndState()),t.forEach(r=>{r.suspendedScrollY!==void 0&&window.scrollTo(0,r.suspendedScrollY)})}Fo=!1,zo=!1,ui.forEach(t=>t.complete(Ho)),ui.clear()}function qa(){ui.forEach(t=>{t.readKeyframes(),t.needsMeasurement&&(Fo=!0)})}function ja(){Ho=!0,qa(),Wa(),Ho=!1}function Fp(t,e,i){if(typeof t=="string"){if(ys(t)||gs(t))return parseFloat(t);if(!At.test(t)&&At.test(i))return vr(e,i)}return t??void 0}var Fi=class{constructor(e,i,s,r,o,n=!1){this.state="pending",this.isAsync=!1,this.needsMeasurement=!1,this.unresolvedKeyframes=[...e],this.onComplete=i,this.name=s,this.motionValue=r,this.element=o,this.isAsync=n}scheduleResolve(){this.state="scheduled",this.isAsync?(ui.add(this),zo||(zo=!0,st.read(qa),st.resolveKeyframes(Wa))):(this.readKeyframes(),this.complete())}readKeyframes(){let{unresolvedKeyframes:e,name:i,element:s,motionValue:r}=this;if(e[0]===null){let o=r?.get(),n=e[e.length-1];if(o!==void 0)e[0]=o;else if(s&&i){let h=Fp(s.readValue(i,n),i,n);h!==void 0&&(e[0]=h)}e[0]===void 0&&(e[0]=n),r&&o===void 0&&r.set(e[0])}Na(e)}setFinalKeyframe(){}measureInitialState(){}renderEndStyles(){}measureEndState(){}complete(e=!1){this.state="complete",this.onComplete(this.unresolvedKeyframes,this.finalKeyframe,e),ui.delete(this)}cancel(){this.state==="scheduled"&&(ui.delete(this),this.state="pending")}resume(){this.state==="pending"&&this.scheduleResolve()}};var He=t=>t.startsWith("--");function xr(t,e,i){He(e)?t.style.setProperty(e,i):t.style[e]=i}var Ka={};function Ds(t,e){let i=vs(t);return()=>Ka[e]??i()}var Vs=Ds(()=>window.ScrollTimeline!==void 0,"scrollTimeline"),Uo=Ds(()=>window.ViewTimeline!==void 0,"viewTimeline");var wr=Ds(()=>{try{document.createElement("div").animate({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0},"linearEasing");var fi=([t,e,i,s])=>`cubic-bezier(${t}, ${e}, ${i}, ${s})`;var Wo={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",circIn:fi([0,.65,.55,1]),circOut:fi([.55,0,1,.45]),backIn:fi([.31,.01,.66,-.59]),backOut:fi([.33,1.53,.69,.99])};function Hi(t,e){if(t)return typeof t=="function"?wr()?yr(t,e):"ease-out":As(t)?fi(t):Array.isArray(t)?t.map(i=>Hi(i,e)||Wo.easeOut):Wo[t]}function Ga(t,e,i,{delay:s=0,duration:r=300,repeat:o=0,repeatType:n="loop",ease:h="easeOut",times:p}={},c=void 0){let d={[e]:i};p&&(d.offset=p);let m=Hi(h,r);Array.isArray(m)&&(d.easing=m);let g={delay:s,duration:r,easing:Array.isArray(m)?"linear":m,fill:"both",iterations:o+1,direction:n==="reverse"?"alternate":"normal"};return c&&(g.pseudoElement=c),t.animate(d,g)}function yi(t){return typeof t=="function"&&"applyToOptions"in t}function Bs({type:t,...e}){return yi(t)&&wr()?t.applyToOptions(e):(e.duration??(e.duration=300),e.ease??(e.ease="easeOut"),e)}var Se=class extends Ve{constructor(e){if(super(),this.finishedTime=null,this.isStopped=!1,this.manualStartTime=null,!e)return;let{element:i,name:s,keyframes:r,pseudoElement:o,allowFlatten:n=!1,finalKeyframe:h,onComplete:p}=e;this.isPseudoElement=!!o,this.allowFlatten=n,this.options=e,$t(typeof e.type!="string",`Mini animate() doesn't support "type" as a string.`,"mini-spring");let c=Bs(e);this.animation=Ga(i,s,r,c,o),c.autoplay===!1&&this.animation.pause(),this.animation.onfinish=()=>{if(this.finishedTime=this.time,!o){let d=De(r,this.options,h,this.speed);this.updateMotionValue&&this.updateMotionValue(d),xr(i,s,d),this.animation.cancel()}p?.(),this.notifyFinished()},zi(this,e,c)}play(){this.isStopped||(this.manualStartTime=null,this.animation.play(),this.state==="finished"&&this.updateFinished())}pause(){this.animation.pause()}complete(){this.animation.finish?.()}cancel(){try{this.animation.cancel()}catch{}}stop(){if(this.isStopped)return;this.isStopped=!0;let{state:e}=this;e==="idle"||e==="finished"||(this.updateMotionValue?this.updateMotionValue():this.commitStyles(),this.isPseudoElement||this.cancel())}commitStyles(){let e=this.options?.element;!this.isPseudoElement&&e?.isConnected&&this.animation.commitStyles?.()}get duration(){let e=this.animation.effect?.getComputedTiming?.().duration||0;return wt(Number(e))}get iterationDuration(){let{delay:e=0}=this.options||{};return this.duration+wt(e)}get time(){return wt(Number(this.animation.currentTime)||0)}set time(e){let i=this.finishedTime!==null;this.manualStartTime=null,this.finishedTime=null,this.animation.currentTime=K(e),i&&this.animation.pause()}get speed(){return this.animation.playbackRate}set speed(e){e<0&&(this.finishedTime=null),this.animation.playbackRate=e}get state(){return this.finishedTime!==null?"finished":this.animation.playState}get startTime(){return this.manualStartTime??Number(this.animation.startTime)}set startTime(e){this.manualStartTime=this.animation.startTime=e}attachTimeline({timeline:e,onAttach:i,observe:s,...r}){return this.allowFlatten&&this.animation.effect?.updateTiming({easing:"linear"}),this.animation.onfinish=null,e&&Vs()?(this.animation.timeline=e,Object.assign(this.animation,r),i?.(this.animation),lt):s(this)}};var Ya={anticipate:xs,backInOut:bs,circInOut:ks};function Hp(t){return t in Ya}function Xa(t){typeof t.ease=="string"&&Hp(t.ease)&&(t.ease=Ya[t.ease])}var qo=10,kr=class extends Se{constructor(e){Xa(e),gr(e),super(e),e.startTime!==void 0&&e.autoplay!==!1&&(this.startTime=e.startTime),this.options=e}updateMotionValue(e){let{motionValue:i,onUpdate:s,onComplete:r,element:o,...n}=this.options;if(!i)return;if(e!==void 0){i.set(e);return}let h=new ke({...n,autoplay:!1}),p=Math.max(qo,ht.now()-this.startTime),c=xt(0,qo,p-qo),d=h.sample(p).value,{name:m}=this.options;o&&m&&xr(o,m,d),i.setWithVelocity(h.sample(Math.max(0,p-c)).value,d,c),h.stop()}};var jo=(t,e)=>e==="zIndex"?!1:!!(typeof t=="number"||Array.isArray(t)||typeof t=="string"&&(At.test(t)||t==="0")&&!t.startsWith("url("));function Up(t){let e=t[0];if(t.length===1)return!0;for(let i=0;i<t.length;i++)if(t[i]!==e)return!0}function Za(t,e,i,s){let r=t[0];if(r===null)return!1;if(e==="display"||e==="visibility")return!0;let o=t[t.length-1],n=jo(r,e),h=jo(o,e);return!n||!h?(n!==h&&Gt(!1,`You are trying to animate ${e} from "${r}" to "${o}". "${n?o:r}" is not an animatable value.`,"value-not-animatable"),!1):Up(t)||(i==="spring"||yi(i))&&s}function zs(t){t.duration=0,t.type="keyframes"}var Ko=new Set(["opacity","clipPath","filter","transform","backgroundColor"]);var Wp=/^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;function Ja(t){for(let e=0;e<t.length;e++)if(typeof t[e]=="string"&&Wp.test(t[e]))return!0;return!1}var Qa=new Set(["color","backgroundColor","outlineColor","fill","stroke","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"]),qp=vs(()=>Object.hasOwnProperty.call(Element.prototype,"animate"));function tl(t){let{motionValue:e,name:i,repeatDelay:s,repeatType:r,damping:o,type:n,keyframes:h}=t;if(!i||!(Ko.has(i)||Qa.has(i)))return!1;let p=e?.owner?.current;if(!(p instanceof HTMLElement)&&!(p instanceof SVGElement))return!1;let{onUpdate:c,transformTemplate:d}=e.owner.getProps();return qp()&&(Ko.has(i)||Qa.has(i)&&Ja(h))&&(i!=="transform"||!d)&&!c&&!s&&r!=="mirror"&&o!==0&&n!=="inertia"}var jp=40,Sr=class extends Ve{constructor(e){super(),this.stop=()=>{this._animation&&(this._animation.stop(),this.stopTimeline?.()),this.keyframeResolver?.cancel()},this.createdAt=ht.now();let{keyframes:i,name:s,motionValue:r,element:o}=e,n=e;n.autoplay??(n.autoplay=!0),n.delay??(n.delay=0),n.type??(n.type="keyframes"),n.repeat??(n.repeat=0),n.repeatDelay??(n.repeatDelay=0),n.repeatType??(n.repeatType="loop");let h=o?.KeyframeResolver||Fi;this.keyframeResolver=new h(i,(p,c,d)=>this.onKeyframesResolved(p,c,n,!d),s,r,o),this.keyframeResolver?.scheduleResolve()}onKeyframesResolved(e,i,s,r){this.keyframeResolver=void 0;let{name:o,type:n,velocity:h,delay:p,isHandoff:c,onUpdate:d}=s;this.resolvedAt=ht.now();let m=!0;Za(e,o,n,h)||(m=!1,(Mt.instantAnimations||!p)&&d?.(De(e,s,i)),e[0]=e[e.length-1],zs(s),s.repeat=0);let g=r?this.resolvedAt?this.resolvedAt-this.createdAt>jp?this.resolvedAt:this.createdAt:this.createdAt:void 0,{onComplete:b}=s;s.startTime??(s.startTime=g),s.finalKeyframe=i,s.keyframes=e,s.onComplete=()=>{b?.(),this.notifyFinished()};let S=m&&!c&&tl(s),E;if(S){s.element=s.motionValue?.owner?.current;try{E=new kr(s)}catch{E=new ke(s)}}else E=new ke(s);this.pendingTimeline&&(this.stopTimeline=E.attachTimeline(this.pendingTimeline),this.pendingTimeline=void 0),this._animation=E}get finished(){return this._animation?this._animation.finished:super.finished}then(e,i){return this.finished.finally(e).then(()=>{})}get animation(){return this._animation||(this.keyframeResolver?.resume(),ja()),this._animation}get duration(){return this.animation.duration}get iterationDuration(){return this.animation.iterationDuration}get time(){return this.animation.time}set time(e){this.animation.time=e}get speed(){return this.animation.speed}get state(){return this.animation.state}set speed(e){this.animation.speed=e}get startTime(){return this.animation.startTime}attachTimeline(e){return this._animation?this.stopTimeline=this.animation.attachTimeline(e):this.pendingTimeline=e,()=>this.stop()}play(){this.animation.play()}pause(){this.animation.pause()}complete(){this.animation.complete()}cancel(){this._animation&&this.animation.cancel(),this.keyframeResolver?.cancel()}};var Ue=class{constructor(e){this.stop=()=>this.runAll("stop"),this.animations=e.filter(Boolean)}get finished(){return Promise.all(this.animations.map(e=>e.finished))}getAll(e){return this.animations[0][e]}setAll(e,i){for(let s=0;s<this.animations.length;s++)this.animations[s][e]=i}attachTimeline(e){let i=this.animations.map(s=>s.attachTimeline(e));return()=>{i.forEach((s,r)=>{s&&s(),this.animations[r].stop()})}}get time(){return this.getAll("time")}set time(e){this.setAll("time",e)}get speed(){return this.getAll("speed")}set speed(e){this.setAll("speed",e)}get state(){return this.getAll("state")}get startTime(){return this.getAll("startTime")}get duration(){return el(this.animations,"duration")}get iterationDuration(){return el(this.animations,"iterationDuration")}runAll(e){this.animations.forEach(i=>i[e]())}play(){this.runAll("play")}pause(){this.runAll("pause")}cancel(){this.runAll("cancel")}complete(){this.runAll("complete")}};function el(t,e){let i=0;for(let s=0;s<t.length;s++){let r=t[s][e];r!==null&&r>i&&(i=r)}return i}var gi=class extends Ue{then(e,i){return this.finished.finally(e).then(()=>{})}};var Fs=class extends Se{constructor(e){super(),this.animation=e,e.onfinish=()=>{this.finishedTime=this.time,this.notifyFinished()},zi(this,{})}};var il=30,Kp=t=>!isNaN(parseFloat(t)),Go={current:void 0},he=class{constructor(e,i={}){this.canTrackVelocity=null,this.events={},this.updateAndNotify=s=>{let r=ht.now();if(this.updatedAt!==r&&this.setPrevFrameValue(),this.prev=this.current,this.setCurrent(s),this.current!==this.prev&&(this.notifyChange(),this.dependents))for(let o of this.dependents)o.dirty()},this.hasAnimated=!1,this.setCurrent(e),this.owner=i.owner}setCurrent(e){this.current=e,this.updatedAt=ht.now(),this.canTrackVelocity===null&&e!==void 0&&(this.canTrackVelocity=Kp(this.current))}setPrevFrameValue(e=this.current){this.prevFrameValue=e,this.prevUpdatedAt=this.updatedAt}onChange(e){return this.on("change",e)}on(e,i){var s;return e==="change"?this.onChangeSubscribe(i):((s=this.events)[e]||(s[e]=new Mi)).add(i)}onChangeSubscribe(e){let{events:i}=this;return!i.change&&!this.changeSubscriber?this.changeSubscriber=e:(i.change||(i.change=new Mi,i.change.add(this.changeSubscriber),this.changeSubscriber=void 0),i.change.add(e)),()=>{this.changeSubscriber===e?this.changeSubscriber=void 0:i.change?.remove(e),this.stopIfUnobserved()}}stopIfUnobserved(){st.read(()=>{!this.changeSubscriber&&!this.events.change?.getSize()&&this.stop()})}clearListeners(){this.changeSubscriber=void 0;for(let e in this.events)this.events[e].clear()}attach(e,i){this.passiveEffect=e,this.stopPassiveEffect=i}set(e){this.passiveEffect?this.passiveEffect(e,this.updateAndNotify):this.updateAndNotify(e)}setWithVelocity(e,i,s){this.set(i),this.prev=void 0,this.prevFrameValue=e,this.prevUpdatedAt=this.updatedAt-s}jump(e,i=!0){this.updateAndNotify(e),this.prev=e,this.prevUpdatedAt=this.prevFrameValue=void 0,i&&this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}dirty(){this.notifyChange()}notifyChange(){let{current:e,changeSubscriber:i}=this;i?i(e):this.events.change?.notify(e)}addDependent(e){this.dependents||(this.dependents=new Set),this.dependents.add(e)}removeDependent(e){this.dependents&&this.dependents.delete(e)}get(){return Go.current&&Go.current.push(this),this.current}getPrevious(){return this.prev}getVelocity(){let e=ht.now();if(!this.canTrackVelocity||this.prevFrameValue===void 0||e-this.updatedAt>il)return 0;let i=Math.min(this.updatedAt-this.prevUpdatedAt,il);return pi(parseFloat(this.current)-parseFloat(this.prevFrameValue),i)}start(e){return this.stop(),new Promise(i=>{this.hasAnimated=!0;let s=!1,r;r=e(()=>{s=!0,this.events.animationComplete?.notify(),this.animation===r&&this.clearAnimation(),i()}),s||(this.animation=r),this.events.animationStart?.notify()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){this.animation=void 0}destroy(){this.dependents?.clear(),this.events.destroy?.notify(),this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}};function pe(t,e){return new he(t,e)}function sl(t,e){if(t?.inherit&&e){let{inherit:i,...s}=t;return{...e,...s}}return t}function vi(t,e){let i=t?.[e]??t?.default??t;return i!==t?sl(i,t):i}var Gp={type:"spring",stiffness:500,damping:25,restSpeed:10},Yp=t=>({type:"spring",stiffness:550,damping:t===0?2*Math.sqrt(550):30,restSpeed:10}),Xp={type:"keyframes",duration:.8},Zp={type:"keyframes",ease:[.25,.1,.35,1],duration:.3},rl=(t,{keyframes:e})=>e.length>2?Xp:ze.has(t)?t.startsWith("scale")?Yp(e[1]):Gp:Zp;var Jp=new Set(["when","delay","delayChildren","staggerChildren","staggerDirection","repeat","repeatType","repeatDelay","from","elapsed"]);function ol(t){for(let e in t)if(!Jp.has(e))return!0;return!1}var $r=(t,e,i,s={},r,o)=>n=>{let h=vi(s,t)||{},p=h.delay||s.delay||0,{elapsed:c=0}=s;c=c-K(p);let d={keyframes:Array.isArray(i)?i:[null,i],ease:"easeOut",velocity:e.getVelocity(),...h,delay:-c,onUpdate:g=>{e.set(g),h.onUpdate&&h.onUpdate(g)},onComplete:()=>{n(),h.onComplete&&h.onComplete()},name:t,motionValue:e,element:o?void 0:r};ol(h)||Object.assign(d,rl(t,d)),d.duration&&(d.duration=K(d.duration)),d.repeatDelay&&(d.repeatDelay=K(d.repeatDelay)),d.from!==void 0&&(d.keyframes[0]=d.from);let m=!1;if((d.type===!1||d.duration===0&&!d.repeatDelay)&&(zs(d),d.delay===0&&(m=!0)),(Mt.instantAnimations||Mt.skipAnimations||r?.shouldSkipAnimations||h.skipAnimations)&&(m=!0,zs(d),d.delay=0),d.allowFlatten=!h.type&&!h.ease,m&&!o&&e.get()!==void 0){let g=De(d.keyframes,h);if(g!==void 0){st.update(()=>{d.onUpdate(g),d.onComplete()});return}}return h.isSync?new ke(d):new Sr(d)};var Qp=/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;function tc(t){let e=Qp.exec(t);if(!e)return[,];let[,i,s,r]=e;return[`--${i??s}`,r]}var ec=4;function Yo(t,e,i=1){$t(i<=ec,`Max CSS variable fallback depth detected in property "${t}". This may indicate a circular fallback dependency.`,"max-css-var-depth");let[s,r]=tc(t);if(!s)return;let o=window.getComputedStyle(e).getPropertyValue(s);if(o){let n=o.trim();return ys(n)?parseFloat(n):n}return Oi(r)?Yo(r,e,i+1):r}var Ar=new Set(["width","height","top","left","right","bottom",...Be]);var bi=t=>!!(t&&t.getVelocity);function Hs(t){return t.replace(/([A-Z])/g,e=>`-${e.toLowerCase()}`)}var nl={test:t=>t==="auto",parse:t=>t};var al=t=>e=>e.test(t);var ic=[ae,A,Ne,Xt,da,ca,nl],Xo=t=>ic.find(al(t));function ll(t){return typeof t=="number"?t===0:t!==null?t==="none"||t==="0"||gs(t):!0}var sc=new Set(["auto","none","0"]);function hl(t,e,i){let s=0,r;for(;s<t.length&&!r;){let o=t[s];typeof o=="string"&&!sc.has(o)&&ba(o)&&(r=t[s]),s++}if(r&&i)for(let o of e)t[o]!==r&&(t[o]=vr(i,r))}var Er=class extends Fi{constructor(e,i,s,r,o){super(e,i,s,r,o,!0)}readKeyframes(){let{unresolvedKeyframes:e,element:i,name:s}=this;if(!i||!i.current)return;super.readKeyframes();for(let d=0;d<e.length;d++){let m=e[d];if(typeof m=="string"&&(m=m.trim(),Oi(m))){let g=Yo(m,i.current);g!==void 0&&(e[d]=g),d===e.length-1&&(this.finalKeyframe=m)}}if(this.resolveNoneKeyframes(),!Ar.has(s)||e.length!==2)return;let[r,o]=e;if(typeof r=="number"&&typeof o=="number")return;let n=Xo(r),h=Xo(o),p=Ao(r),c=Ao(o);if(p!==c&&Fe[s]){this.needsMeasurement=!0;return}if(n!==h)if(Bo(n)&&Bo(h))for(let d=0;d<e.length;d++){let m=e[d];typeof m=="string"&&(e[d]=parseFloat(m))}else Fe[s]&&(this.needsMeasurement=!0)}resolveNoneKeyframes(){let{unresolvedKeyframes:e,name:i}=this,s=[];for(let r=0;r<e.length;r++)(e[r]===null||ll(e[r]))&&s.push(r);s.length&&hl(e,s,i)}measure(){let{element:e,name:i}=this;return Fe[i](window.getComputedStyle(e.current),()=>e.measureViewportBox())}measureInitialState(){let{element:e,unresolvedKeyframes:i,name:s}=this;if(!e||!e.current)return;s==="height"&&(this.suspendedScrollY=window.pageYOffset),this.measuredOrigin=this.measure(),i[0]=this.measuredOrigin;let r=i[i.length-1];r!==void 0&&this.motionValue?.jump(r,!1)}measureEndState(){let{element:e,unresolvedKeyframes:i}=this;if(!e||!e.current)return;this.motionValue?.jump(this.measuredOrigin,!1);let s=i.length-1,r=i[s];i[s]=this.measure(),r!==null&&this.finalKeyframe===void 0&&(this.finalKeyframe=r),this.removedTransforms?.length&&this.removedTransforms.forEach(([o,n])=>{e.getValue(o).set(n)}),this.resolveNoneKeyframes()}};var Zo=["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"];var Jo=[];function Qo(t){$t(typeof t.test=="function"&&typeof t.read=="function","Effects passed to animate.addEffect() need test() and read().","effect-missing-test"),Cr(t),Jo.unshift(t)}function Cr(t){Kt(Jo,t)}function tn(t){return Jo.find(e=>e.test(t))}function Mr(t,e,i={},s){let r=[],{velocity:o}=i,n=i.reduceMotion??s?.shouldReduceMotion;for(let p in e){if(p==="transition"||p==="transitionEnd")continue;let c=e[p];if(c===void 0)continue;let d=t(p),m=d.get();if(m!==void 0&&!d.isAnimating()&&!Array.isArray(c)&&c===m&&!o){st.update(()=>d.set(c));continue}d.start($r(p,d,c,n&&Ar.has(p)?{type:!1}:i,s)),d.animation&&r.push(d.animation)}let{transitionEnd:h}=e;if(h){let p=()=>st.update(()=>{for(let c in h)t(c).set(h[c])});r.length?Promise.all(r).then(p):p()}return r}function Us(t,e,i,s,r){return Mr(o=>{let n=t.get(e,o);if(!n){let h;if(!r){let p=i[o];h=rc(p)??t.read(e,o,p),$t(h!==void 0,`"${o}" can't be read from the animated subject. Provide [from, to] keyframes.`,"effect-unreadable-value")}n=pe(h,{owner:r}),t(e,{[o]:n})}return n},i,s,r)}function rc(t){let e=Array.isArray(t)?t[0]:void 0;return e===null?void 0:e}function Ui(t){return li(t)&&"offsetHeight"in t&&!("ownerSVGElement"in t)}function We(t){return li(t)&&"ownerSVGElement"in t}var $e=(t,e)=>e&&typeof t=="number"?e.transform(t):t;function Ae(t,e,i){if(t==null)return[];if(t instanceof EventTarget)return[t];if(typeof t=="string"){let s=document;e&&(s=e.current);let r=i?.[t]??s.querySelectorAll(t);return r?Array.from(r):[]}return Array.from(t).filter(s=>s!=null)}var Tr=class{constructor(e=st.render){this.step=e,this.values=new Map,this.pending=[],this.numPending=0,this.flush=()=>{let{pending:i,numPending:s}=this;this.numPending=0;for(let r=0;r<s;r++)i[r]()}}set(e,i,s,r){if(this.values.get(e)?.onRemove(),r)for(let p of this.values.values())p.value===r&&(s=p.render);let o=()=>s&&this.schedule(s);i.get()!==void 0&&o();let n=i.on("change",o),h=()=>{n(),s&&!r&&this.cancel(s),this.values.get(e)?.onRemove===h&&this.values.delete(e)};return this.values.set(e,{value:i,render:r?void 0:s,onRemove:h}),h}get(e){return this.values.get(e)?.value}release(){let e=new Map;return this.values.forEach((i,s)=>{e.set(s,i.value),i.onRemove()}),this.transformKeys=this.transformValues=void 0,e}schedule(e){let{pending:i,numPending:s}=this;for(let r=0;r<s;r++)if(i[r]===e)return;s||this.step(this.flush),i[this.numPending++]=e}cancel(e){let{pending:i}=this;for(let s=0;s<this.numPending;s++)if(i[s]===e){i[s]=i[--this.numPending];return}}};function Wi(t,{step:e,...i}={}){let s=new WeakMap;return Object.assign((o,n)=>{let h=s.get(o)??new Tr(e);s.set(o,h);let p=[];for(let c in n){let d=n[c],m=t(o,h,c,d);p.push(m)}return()=>{for(let c of p)c()}},i,{get:(o,n)=>s.get(o)?.get(n),flush:o=>s.get(o)?.flush(),state:o=>s.get(o)})}var oc={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"},pl={};function cl(t){let e="",{transformKeys:i=[],transformValues:s={}}=t;for(let o=0;o<i.length;o++){let n=i[o],h=s[n].get();if(h===void 0)continue;(typeof h=="number"?h:parseFloat(h))!==(n.startsWith("scale")?1:0)&&(e+=(e&&" ")+(pl[n]||(pl[n]=(oc[n]||n)+"("))+$e(h,Is[n])+")")}let r=t.get("pathRotation")?.get();return r&&(e+=(e&&" ")+"rotate("+$e(r,Is.pathRotation)+")"),e||"none"}var sn=new Set(["originX","originY","originZ"]),en=(t,e)=>$e(t.get(e)?.get(),Zt[e]),Lr=(t,e,i,s)=>{let r,o;if(ze.has(i)){if(i!=="pathRotation"){let n=e.transformKeys??(e.transformKeys=[]);(e.transformValues??(e.transformValues={}))[i]=s,n.includes(i)||(n.push(i),n.sort((h,p)=>Be.indexOf(h)-Be.indexOf(p)))}e.get("transform")||(!Ui(t)&&!e.get("transformBox")&&Lr(t,e,"transformBox",new he("fill-box")),e.set("transform",new he("none"),()=>{t.style.transform=cl(e)})),o=e.get("transform")}else sn.has(i)?(e.get("transformOrigin")||e.set("transformOrigin",new he(""),()=>{let n=en(e,"originX")??"50%",h=en(e,"originY")??"50%",p=en(e,"originZ")??0;t.style.transformOrigin=`${n} ${h} ${p}`}),o=e.get("transformOrigin")):He(i)?r=()=>{t.style.setProperty(i,s.get())}:r=()=>{t.style[i]=$e(s.get(),Zt[i])};return e.set(i,s,r,o)},nc=t=>Ui(t)||We(t),rn=(t,e)=>{if(ze.has(e))return za(t,e);let i=getComputedStyle(t),s=He(e)?i.getPropertyValue(e):i[e];return typeof s=="string"&&s.trim()||0},dl=Wi(Lr,{test:nc,read:rn});var ml=["transform","opacity","offsetDistance","offsetPath","offsetRotate","offsetAnchor"];function ac(t,e){if(!(e in t))return!1;let i=Object.getOwnPropertyDescriptor(Object.getPrototypeOf(t),e)||Object.getOwnPropertyDescriptor(t,e);return i&&typeof i.set=="function"}var on=(t,e,i,s,r=i)=>{let o=ac(t,r);!o&&(r.startsWith("data")||r.startsWith("aria"))&&(r=Hs(r));let n=Zt[i]||Zt[r],h=o?()=>{t[r]=$e(s.get(),Zt[i])}:()=>{let p=$e(s.get(),n);p==null?t.removeAttribute(r):t.setAttribute(r,String(p))};return e.set(i,s,h)};function lc(t,e,i,s){return st.render(()=>t.setAttribute("pathLength","1")),i==="pathOffset"?e.set(i,s,()=>{let r=s.get();t.setAttribute("stroke-dashoffset",`${-r}`)}):(e.get("stroke-dasharray")||e.set("stroke-dasharray",new he("1 1"),()=>{let r=e.get("pathLength")?.get()??1,o=e.get("pathSpacing")?.get();t.setAttribute("stroke-dasharray",`${r} ${o??1-Number(r)}`)}),e.set(i,s,void 0,e.get("stroke-dasharray")))}var hc=(t,e,i,s)=>i.startsWith("path")?lc(t,e,i,s):i.startsWith("attr")?on(t,e,i,s,fl(i)):(ze.has(i)||sn.has(i)||He(i)||i in t.style?Lr:on)(t,e,i,s),pc=(t,e)=>ze.has(e)?Zt[e]?.default||0:He(e)||ml.includes(e)?rn(t,e)||t.getAttribute(Hs(e))||0:(e=fl(e),t.getAttribute(Hs(e))??t.getAttribute(e)??void 0),ul=Wi(hc,{test:We,read:pc});function fl(t){return t.replace(/^attr([A-Z])/,(e,i)=>i.toLowerCase())}function yl({top:t,left:e,right:i,bottom:s}){return{x:{min:e,max:i},y:{min:t,max:s}}}function gl(t,e){if(!e)return t;let i=e({x:t.left,y:t.top}),s=e({x:t.right,y:t.bottom});return{top:i.y,left:i.x,bottom:s.y,right:s.x}}function vl(t,e){return yl(gl(t.getBoundingClientRect(),e))}var cc={},dc=t=>We(t)?ul:dl,nn=class{constructor(e,i){this.effect=e,this.current=i,this.KeyframeResolver=Er}getValue(e){return this.effect.get(this.current,e)}readValue(e,i){return this.effect.read(this.current,e,i)}render(){this.effect.flush(this.current)}measureViewportBox(){return vl(this.current)}getProps(){return cc}};function an(t,e,i,s){if(s)return Mr(o=>s.getValue(o,null),e,i,s);let r=dc(t);return Us(r,t,e,i,new nn(r,t))}var ln=Wi((t,e,i,s)=>e.set(i,s,()=>{t[i]=s.get()}),{test:t=>li(t),read:(t,e)=>{let i=t[e];return typeof i=="string"||typeof i=="number"?i:void 0}});var{schedule:bl,cancel:Ex}=fr(queueMicrotask,!1);var _r=new WeakMap,Or,xl=(t,e,i)=>(s,r)=>r&&r[0]?r[0][t+"Size"]:We(s)&&"getBBox"in s?s.getBBox()[e]:s[i],mc=xl("inline","width","offsetWidth"),uc=xl("block","height","offsetHeight");function fc({target:t,borderBoxSize:e}){_r.get(t)?.forEach(i=>{i(t,{get width(){return mc(t,e)},get height(){return uc(t,e)}})})}function yc(t){t.forEach(fc)}function gc(){typeof ResizeObserver>"u"||(Or=new ResizeObserver(yc))}function wl(t,e){Or||gc();let i=Ae(t);return i.forEach(s=>{let r=_r.get(s);r||(r=new Set,_r.set(s,r)),r.add(e),Or?.observe(s)}),()=>{i.forEach(s=>{let r=_r.get(s);r?.delete(e),r?.size||Or?.unobserve(s)})}}var Pr=new Set,qi;function vc(){qi=()=>{let t={get width(){return window.innerWidth},get height(){return window.innerHeight}};Pr.forEach(e=>e(t))},window.addEventListener("resize",qi)}function kl(t){return Pr.add(t),qi||vc(),()=>{Pr.delete(t),!Pr.size&&typeof qi=="function"&&(window.removeEventListener("resize",qi),qi=void 0)}}function ji(t,e){return typeof t=="function"?kl(t):wl(t,e)}function Sl(t,e){if(t==="first")return 0;{let i=e-1;return t==="last"?i:i/2}}function Lt(t=.1,{startDelay:e=0,from:i=0,ease:s}={}){return(r,o)=>{let n=typeof i=="number"?i:Sl(i,o),h=Math.abs(n-r),p=t*h;if(s){let c=o*t;p=_i(s)(p/c)*c}return e+p}}var bc=0,$l=()=>`motion-view-${bc++}`,xc=t=>t.startsWith("motion-view-");function Al(t,e,i){e&&(t.style?.setProperty("view-transition-class",e),i.push(t))}function El(t,e,i,s,r){if(i&&(t.style?.setProperty("view-transition-group",i),s.push(t),i!=="none"&&r)){let o=getComputedStyle(t);(o.overflowX!=="visible"||o.overflowY!=="visible")&&r.add(e)}}function Rr(t,e,i,s,r,o=[],n,h=[],p){let c=Ae(t);if(s)return c.map((m,g)=>{let b=e.get(m);if(b)return b;let S=s[g]??$l();return m.style?.setProperty("view-transition-name",S),i.push(m),e.set(m,S),Al(m,r,o),El(m,S,n,h,p),S});let d=c.map(m=>e.has(m)?void 0:getComputedStyle(m).getPropertyValue("view-transition-name"));return c.map((m,g)=>{let b=e.get(m);if(b)return b;let S=d[g],E;return S&&S!=="none"&&S!=="auto"&&S!=="match-element"&&!xc(S)?E=S:(E=$l(),m.style?.setProperty("view-transition-name",E),i.push(m)),e.set(m,E),Al(m,r,o),El(m,E,n,h,p),E})}function Cl(t,e=[],i=[]){for(let s of t)s.style?.removeProperty("view-transition-name");for(let s of e)s.style?.removeProperty("view-transition-class");for(let s of i)s.style?.removeProperty("view-transition-group")}function Ml(t){return t==="layout"?"group":t==="enter"||t==="new"?"new":"old"}var Nr={},Ee=null,qe={set:(t,e)=>{Nr[t]=e},commit:()=>{Ee||(Ee=document.createElement("style"),Ee.id="motion-view");let t="";for(let e in Nr){let i=Nr[e];t+=`${e} {
`;for(let[s,r]of Object.entries(i))t+=`  ${s}: ${r};
`;t+=`}
`}Ee.textContent=t,document.head.appendChild(Ee),Nr={}},remove:()=>{Ee&&Ee.parentElement&&Ee.parentElement.removeChild(Ee)}};function Tl(t){let e=t.match(/::view-transition-(old|new|group-children|group|image-pair)\((.*?)\)/);return e?{layer:e[2],type:e[1]}:null}function Ll(){return document.getAnimations().filter(t=>{let{effect:e}=t;return!!e&&e.target===document.documentElement&&e.pseudoElement?.startsWith("::view-transition")})}function _l(t,e){return e.has(t)&&Object.keys(e.get(t)).length>0}var wc=["layout","enter","exit","new","old"],Ol=t=>t.split(" ").every(e=>parseFloat(e)===0),kc={group:["layout"],new:["new","enter"],old:["old","exit"]},Sc={new:{opacity:0,scale:.85},old:{opacity:1,scale:1}},$c=.2;function Rl(t){let{update:e,targets:i,resolveDefs:s,cropOverride:r,pairs:o,classNames:n,flatGroups:h,options:p}=t;if(!document.startViewTransition)return(async()=>(await e(),new Ue([])))();let c=new Map,d=[],m=[],g=[],b=new Set,S=new Map,E=new Set,T=new Map,V=new Map,j=new Map,B=new Map,P=z=>{i.forEach((N,_)=>{let Q=n.get(_),ot=_==="root"||!s.has(_)?void 0:h.has(_)?"none":"contain",Y;if(_==="root"||!s.has(_))Y=[_];else if(o.has(_))if(z==="old")B.set(_,Ae(_)),Y=Rr(_,c,d,void 0,Q,m,ot,g,b),j.set(_,Y);else{for(let F of B.get(_)??[])F.style?.removeProperty("view-transition-name"),c.delete(F);Y=Rr(o.get(_),c,d,j.get(_),Q,m,ot,g,b)}else Y=Rr(_,c,d,void 0,Q,m,ot,g,b);let W=r.get(_);Y.forEach((F,vt)=>{let I=S.get(F);S.set(F,I&&I!==N?{...I,...N}:N),W!==void 0&&T.set(F,W);let bt=V.get(F)??{};bt[z]=[vt,Y.length],V.set(F,bt)})})},U=(z,N)=>{let _=V.get(z);return(N==="old"?_?.old:N==="new"?_?.new:_?.new??_?.old)??[-1,1]},G=(z,N,_,Q,ot)=>{let Y=Pl(vi(p,_),vi(Ac(z,N)??{},_));return typeof Y.delay=="function"&&(Y.delay=Y.delay(Q,ot)),Y},$=z=>{let[N,_]=U(z,"group"),Q=G(S.get(z),"group","layout",N===-1?0:N,_);Q.duration&&(Q.duration=K(Q.duration));let{delay:ot=0,duration:Y,ease:W}=Bs(Q);return{delay:K(ot),duration:Y,ease:W}},L=new Map,R=z=>c.forEach((N,_)=>{let Q=_,ot=Q.getBoundingClientRect?.();if(ot&&ot.height){let Y=getComputedStyle(Q),W={};for(let vt of Zo)W[vt]=Y[vt];let F=L.get(N)??{};F[z]={width:ot.width,height:ot.height,radii:W},L.set(N,F)}}),H=()=>{E.clear();for(let z of V.keys())z!=="root"&&(T.get(z)??pt(z))&&E.add(z)},pt=z=>{let N=L.get(z);return!N?.old||!N?.new||!N.old.height||!N.new.height?!1:Math.abs(N.old.width/N.old.height-N.new.width/N.new.height)>$c},Pt=()=>{_l("root",i)||qe.set(":root",{"view-transition-name":"none"}),qe.set("::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*)",{"animation-timing-function":"linear !important"}),E.forEach(z=>{qe.set(`::view-transition-group(${z})`,{overflow:"clip"}),qe.set(`::view-transition-old(${z}), ::view-transition-new(${z})`,{width:"100%",height:"100%","object-fit":"cover"})}),b.forEach(z=>{qe.set(`::view-transition-group-children(${z})`,{overflow:"clip"})}),qe.commit()},J=()=>{Cl(d,m,g),qe.remove()},ue=async()=>{await e(),P("new"),R("new"),H(),Pt()},Je;try{P("old"),R("old"),Pt(),Je=document.startViewTransition(ue)}catch(z){return J(),Promise.reject(z)}return Je.finished.finally(J),new Promise((z,N)=>{Je.ready.then(()=>{let _=Ll(),Q=[],ot=new Set,Y=new Set;S.forEach((W,F)=>{let vt=V.get(F),I=!!vt?.new&&!vt?.old,bt=!!vt?.old&&!vt?.new;for(let tt of wc){if(!W[tt]||tt==="enter"&&!I||tt==="exit"&&!bt)continue;let ct=Ml(tt),[Dt,Pe]=U(F,ct);if(Dt===-1)continue;let{keyframes:qt,options:dt}=W[tt];for(let[nt,fe]of Object.entries(qt)){if(fe==null)continue;if(nt==="x"||nt==="y"){wo(!1,`animateView() animates view-transition layers with CSS properties; the "${nt}" shorthand has no effect - use transform, e.g. { transform: "translateX(40px)" }.`);continue}if(tt==="new"&&I&&W.enter?.keyframes[nt]!=null||tt==="old"&&bt&&W.exit?.keyframes[nt]!=null)continue;let et=Pl(vi(p,nt),vi(dt,nt));if(!Array.isArray(fe)){let jt=tt==="enter"?W.exit?.keyframes[nt]:void 0,Qe=nt==="opacity"||(ct==="new"?I:bt),Rn=jt!=null?Array.isArray(jt)?jt[jt.length-1]:jt:Qe?Sc[ct]?.[nt]:void 0;Rn!==void 0&&(fe=[Rn,fe])}typeof et.delay=="function"&&(et.delay=et.delay(Dt,Pe)),et.duration&&(et.duration=K(et.duration)),et.delay&&(et.delay=K(et.delay)),Q.push(new Se({...et,element:document.documentElement,name:nt,pseudoElement:`::view-transition-${ct}(${F})`,keyframes:fe})),ot.add(`${F}:${ct}`),nt==="opacity"&&Y.add(`${F}:${ct}`)}}});for(let W of _){if(W.playState==="finished")continue;let{effect:F}=W;if(!F||!(F instanceof KeyframeEffect))continue;let{pseudoElement:vt}=F;if(!vt)continue;let I=Tl(vt);if(!I)continue;let bt=S.get(I.layer);if(ot.has(`${I.layer}:${I.type}`)){Y.has(`${I.layer}:new`)&&Y.has(`${I.layer}:old`)&&F.getKeyframes().some(dt=>dt.mixBlendMode)?Q.push(new Fs(W)):W.cancel();continue}let tt=I.type==="old"?"new":I.type==="new"?"old":void 0;if(tt&&ot.has(`${I.layer}:${tt}`)&&!Y.has(`${I.layer}:${tt}`)){W.cancel();continue}let ct=V.get(I.layer),Dt=(I.type==="old"||I.type==="new")&&!!ct?.old&&!!ct?.new,Pe;if(I.type.startsWith("group")){let{delay:qt,duration:dt,ease:nt}=$(I.layer);Pe={delay:qt,duration:dt,easing:Hi(nt,dt)}}else{let qt=Dt?"group":I.type,[dt,nt]=U(I.layer,qt),et=G(bt,qt,qt==="group"?"layout":"",dt===-1?0:dt,nt),jt=et.visualDuration;et.duration&&(et.duration=K(et.duration)),et=Bs(et),Pe={delay:K(et.delay??0),duration:Dt&&jt!==void 0?K(jt):et.duration,easing:Dt?"linear":Hi(et.ease,et.duration)}}F.updateTiming(Pe),Q.push(new Fs(W))}L.forEach((W,F)=>{if(!E.has(F))return;let{delay:vt,duration:I,ease:bt}=$(F);for(let tt of Zo){let ct=W.old?.radii[tt]||W.new?.radii[tt]||"0px",Dt=W.new?.radii[tt]||W.old?.radii[tt]||"0px";Ol(ct)&&Ol(Dt)||Q.push(new Se({element:document.documentElement,name:tt,pseudoElement:`::view-transition-group(${F})`,keyframes:[ct,Dt],delay:vt,duration:I,ease:bt}))}}),z(new Ue(Q))}).catch(()=>Je.updateCallbackDone.then(()=>z(new Ue([])),N))})}function Ac(t,e){for(let i of kc[e]??[]){let s=t?.[i]?.options;if(s)return s}}function Pl(t,e){let i={...t,...e};return e.duration!==void 0&&(e.visualDuration===void 0&&delete i.visualDuration,e.type===void 0&&delete i.type),i}var Ce=[],hn=null;function Nl(){hn=null;let[t]=Ce;t&&Ec(t)}function Ec(t){Kt(Ce,t),hn=t,Rl(t).then(e=>(t.notifyReady(e),e.finished)).catch(e=>t.notifyReject(e)).finally(Nl)}function Cc(){for(let t=Ce.length-1;t>=0;t--){let e=Ce[t],{interrupt:i}=e.options;if(i==="immediate"){let s=Ce.slice(0,t+1).map(o=>o.update),r=Ce.slice(t+1);e.update=()=>{s.forEach(o=>o())},Ce=[e,...r];break}}(!hn||Ce[0]?.options.interrupt==="immediate")&&Nl()}function Il(t){Ce.push(t),bl.render(Cc)}var Ir=class{constructor(e,i={}){this.currentSubject="root",this.targets=new Map,this.resolveDefs=new Set,this.cropOverride=new Map,this.pairs=new Map,this.classNames=new Map,this.flatGroups=new Set,this.notifyReady=lt,this.notifyReject=lt,this.readyPromise=new Promise((s,r)=>{this.notifyReady=s,this.notifyReject=r}),this.update=e,this.options={interrupt:"wait",...i},this.readyPromise.catch(lt),Il(this)}add(e,i){return this.currentSubject=e,this.resolveDefs.add(e),i!==void 0&&this.pairs.set(e,i),this.targets.has(e)||this.targets.set(e,{}),this}crop(e=!0){return this.cropOverride.set(this.currentSubject,e),this}group(e=!0){return e?this.flatGroups.delete(this.currentSubject):this.flatGroups.add(this.currentSubject),this}class(e){return this.classNames.set(this.currentSubject,e),this}layout(e={}){return this.updateTarget("layout",{},e),this}enter(e,i){return this.updateTarget("enter",e,i),this}exit(e,i){return this.updateTarget("exit",e,i),this}new(e,i){return this.updateTarget("new",e,i),this}old(e,i){return this.updateTarget("old",e,i),this}updateTarget(e,i,s={}){let{currentSubject:r,targets:o}=this;o.has(r)||o.set(r,{});let n=o.get(r);n[e]={keyframes:i,options:s}}then(e,i){return this.readyPromise.then(e,i)}};function pn(t,e={}){return new Ir(t,e)}var cn=new WeakMap;function dn(t,e,i){let s=bi(t)?t:pe(t);return s.start($r("",s,e,i)),s.animation}function Ws(t){return typeof t=="object"&&!Array.isArray(t)}function Dr(t,e,i,s){return t==null?[]:typeof t=="string"&&Ws(e)?Ae(t,i,s):t instanceof NodeList?Array.from(t):Array.isArray(t)?t.filter(r=>r!=null):[t]}function Dl(t,e,i){return t*(e+1)+i*e}function mn(t,e,i,s){return typeof e=="number"?e:e.startsWith("-")||e.startsWith("+")?Math.max(0,t+parseFloat(e)):e==="<"?i:e.startsWith("<")?Math.max(0,i+parseFloat(e.slice(1))):s.get(e)??t}function Mc(t,e,i){for(let s=0;s<t.length;s++){let r=t[s];r.at>e&&r.at<i&&(Kt(t,r),s--)}}function Vl(t,e,i,s,r,o){Mc(t,r,o);for(let n=0;n<e.length;n++)t.push({value:e[n],at:Vt(r,o,s[n]),easing:$s(i,n)})}function Bl(t,e,i=0){let s=e+1+e*i;for(let r=0;r<t.length;r++)t[r]=t[r]/s}function zl(t,e){return t.at===e.at?t.value===null?1:e.value===null?-1:0:t.at-e.at}var Tc="easeInOut",un=20;function Ul(t,{defaultTransition:e={},...i}={},s,r){let o=e.duration||.3,n=new Map,h=new Map,p={},c=new Map,d=0,m=0,g=0;for(let b=0;b<t.length;b++){let S=t[b];if(typeof S=="string"){c.set(S,m);continue}else if(!Array.isArray(S)){c.set(S.name,mn(m,S.at,d,c));continue}let[E,T,V={}]=S;V.at!==void 0&&(m=mn(m,V.at,d,c));let j=0,B=(P,U,G,$=0,L=0)=>{let R=Lc(P),{delay:H=0,times:pt=Ps(R),type:Pt=e.type||"keyframes",repeat:J,repeatType:ue,repeatDelay:Je=0,...z}=U,{ease:N=e.ease||"easeOut",duration:_}=U,Q=typeof H=="function"?H($,L):H,ot=R.length,Y=yi(Pt)?Pt:r?.[Pt||"keyframes"];if(ot<=2&&Y){let I=100;if(ot===2&&Pc(R)){let ct=R[1]-R[0];I=Math.abs(ct)}let bt={...e,...z};_!==void 0&&(bt.duration=K(_));let tt=Ls(bt,I,Y);N=tt.ease,_=tt.duration}_??(_=o);let W=m+Q;pt.length===1&&pt[0]===0&&(pt[1]=1);let F=pt.length-R.length;if(F>0&&Os(pt,F),R.length===1&&R.unshift(null),J&&Gt(J<un,`Sequence segments can't repeat ${J} times \u2014 ignoring repeat option. Use a value below ${un} or apply repeat at the sequence level instead.`),J&&J<un){let I=_>0?Je/_:0;_=Dl(_,J,Je);let bt=[...R],tt=[...pt];N=Array.isArray(N)?[...N]:[N];let ct=[...N],Dt=ue==="reverse"||ue==="mirror",Pe=bt,qt=ct;Dt&&(Pe=[...bt].reverse(),ue==="reverse"&&(qt=[...ct].reverse().map(dt=>typeof dt=="function"?ci(dt):dt)));for(let dt=0;dt<J;dt++){let nt=Dt&&dt%2===0,fe=nt?Pe:bt,et=nt?qt:ct,jt=(dt+1)*(1+I);I>0&&(R.push(R[R.length-1]),pt.push(jt),N.push("linear")),R.push(...fe);for(let Qe=0;Qe<fe.length;Qe++)pt.push(tt[Qe]+jt),N.push(Qe===0?"linear":$s(et,Qe-1))}Bl(pt,J,I)}let vt=W+_;Vl(G,R,N,pt,W,vt),j=Math.max(Q+_,j),g=Math.max(vt,g)};if(bi(E)){let P=Fl(E,h);B(T,V,Hl("default",P))}else{let P=Dr(E,T,s,p),U=P.length;for(let G=0;G<U;G++){T=T,V=V;let $=P[G],L=Fl($,h);for(let R in T)B(T[R],_c(V,R),Hl(R,L),G,U)}}d=m,m+=j}return h.forEach((b,S)=>{for(let E in b){let T=b[E];T.sort(zl);let V=[],j=[],B=[];for(let $=0;$<T.length;$++){let{at:L,value:R,easing:H}=T[$];V.push(R),j.push(Yt(0,g,L)),B.push(H||"easeOut")}j[0]!==0&&(j.unshift(0),V.unshift(V[0]),B.unshift(Tc)),j[j.length-1]!==1&&(j.push(1),V.push(null)),n.has(S)||n.set(S,{keyframes:{},transition:{}});let P=n.get(S);P.keyframes[E]=V;let{type:U,...G}=e;P.transition[E]={...G,duration:g,ease:B,times:j,...i}}}),n}function Fl(t,e){return!e.has(t)&&e.set(t,{}),e.get(t)}function Hl(t,e){return e[t]||(e[t]=[]),e[t]}function Lc(t){return Array.isArray(t)?t:[t]}function _c(t,e){return t&&t[e]?{...t,...t[e]}:{...t}}var Oc=t=>typeof t=="number",Pc=t=>t.every(Oc);function Rc(t,e){return bi(t)||typeof t=="number"||typeof t=="string"&&!Ws(e)}function Vr(t,e,i,s){let r=[];if(Rc(t,e))r.push(dn(t,Ws(e)&&e.default||e,i&&(i.default||i)));else{if(t==null)return r;let o=Dr(t,e,s),n=o.length;$t(!!n,"No valid elements provided.","no-valid-elements");for(let h=0;h<n;h++){let p=o[h],c={...i};"delay"in c&&typeof c.delay=="function"&&(c.delay=c.delay(h,n)),p instanceof Element?r.push(...an(p,e,c,cn.get(p))):r.push(...Us(tn(p)??ln,p,e,c))}}return r}function Wl(t,e,i){let s=[],r=t.map(n=>{if(Array.isArray(n)&&typeof n[0]=="function"){let h=n[0],p=pe(0);return p.on("change",h),n.length===1?[p,[0,1]]:n.length===2?[p,[0,1],n[1]]:[p,n[1],n[2]]}return n});return Ul(r,e,i,{spring:we}).forEach(({keyframes:n,transition:h},p)=>{s.push(...Vr(p,n,h))}),s}function Nc(t){return Array.isArray(t)&&t.some(Array.isArray)}function ql(t={}){let{scope:e,reduceMotion:i,skipAnimations:s}=t;function r(o,n,h){let p=[],c,d={};if(i!==void 0&&(d.reduceMotion=i),s!==void 0&&(d.skipAnimations=s),Nc(o)){let{onComplete:g,...b}=n||{};typeof g=="function"&&(c=g),p=Wl(o,{...d,...b},e)}else{let{onComplete:g,...b}=h||{};typeof g=="function"&&(c=g),p=Vr(o,n,{...d,...b},e)}let m=new gi(p);return c&&m.finished.then(c),e&&(e.animations.push(m),m.finished.then(()=>{Kt(e.animations,m)})),m}return r}var f=Object.assign(ql(),{addEffect:Qo,removeEffect:Cr});var Ic=50,jl=()=>({current:0,offset:[],progress:0,scrollLength:0,targetOffset:0,targetLength:0,containerLength:0,velocity:0}),fn=()=>({time:0,x:jl(),y:jl()}),Br={x:{length:"Width",position:"Left"},y:{length:"Height",position:"Top"}};function Dc(t,e,i,s){let r=i[e],{length:o,position:n}=Br[e],h=r.current,p=i.time;r.current=Math.abs(t[`scroll${n}`]),r.containerLength=t[`client${o}`],r.targetLength=t[`scroll${o}`],r.scrollLength=r.targetLength-r.containerLength,r.offset.length=0,r.offset[0]=0,r.offset[1]=r.scrollLength,r.progress=Yt(0,r.scrollLength,r.current);let c=s-p;r.velocity=c>Ic?0:pi(r.current-h,c)}function Kl(t,e,i){for(let s in Br)Dc(t,s,e,i);e.time=i}var zr={start:0,center:.5,end:1};function yn(t,e,i=0){let s=0;if(t in zr&&(t=zr[t]),typeof t=="string"){let r=parseFloat(t);t.endsWith("px")?s=r:t.endsWith("%")?t=r/100:t.endsWith("vw")?s=r/100*document.documentElement.clientWidth:t.endsWith("vh")?s=r/100*document.documentElement.clientHeight:t=r}return typeof t=="number"&&(s=e*t),i+s}var Vc=[0,0];function Ki(t,e,i,s){let r=Array.isArray(t)?t:Vc,o=0,n=0;return typeof t=="number"?r=[t,t]:typeof t=="string"&&(t=t.trim(),t.includes(" ")?r=t.split(" "):r=[t,zr[t]?t:"0"]),o=yn(r[0],i,s),n=yn(r[1],e),o-n}var Fr={All:[[0,0],[1,1]]};function Bc(t,e){let i=t.length-1;if(i<1)return 0;let s=t[0]>t[i],r=h=>t[s?i-h:h];if(t[0]===t[1]&&e<r(0))return s?1:0;let o=0;for(;o<i-1&&e>=r(o+1);)o++;let n=(o+Yt(r(o),r(o+1),e))/i;return s?1-n:n}function Gl(t,e){let{offset:i=Fr.All,axis:s="y"}=e,r=t[s];r.offset.length=0;let o=i.length;for(let n=0;n<o;n++)r.offset[n]=Ki(i[n],r.containerLength,r.targetLength,r.targetOffset);r.progress=xt(0,1,Bc(r.offset,r.current))}function Yl(t,e){let i={x:0,y:0},s=t;for(;s&&s!==e;)if(Ui(s))i.x+=s.offsetLeft,i.y+=s.offsetTop,s=s.offsetParent;else if(s.tagName==="svg"){let r=s.getBoundingClientRect();s=s.parentElement;let o=s.getBoundingClientRect();i.x+=r.left-o.left,i.y+=r.top-o.top}else if(s instanceof SVGGraphicsElement){let{x:r,y:o}=s.getBBox();i.x+=r,i.y+=o;let n=null,h=s.parentNode;for(;!n;)h.tagName==="svg"&&(n=h),h=s.parentNode;s=n}else break;return i}function zc(t){return"getBBox"in t&&t.tagName!=="svg"?t.getBBox():{width:t.clientWidth,height:t.clientHeight}}function Xl(t,e,i,s={}){let{target:r}=s,o=r||s.offset;return{measure:n=>{if(o){i.time=n.time;for(let h in Br){let p=h,{offset:c}=i[p];Object.assign(i[p],n[p]),i[p].offset=c}if(r&&r!==t){let h=Yl(r,t),p=zc(r);i.x.targetOffset=h.x,i.y.targetOffset=h.y,i.x.targetLength=p.width,i.y.targetLength=p.height}Gl(i,s)}},notify:n=>e(o?i:n)}}var Gi=new WeakMap,Zl=new WeakMap,Hr=new WeakMap,Ur=new WeakMap,Jl=t=>t===document.scrollingElement?window:t;function Wr(t,{container:e=document.scrollingElement,trackContentSize:i=!1,...s}={}){if(!e)return lt;let r=Hr.get(e);r||(r=new Set,Hr.set(e,r));let o=fn(),n=Xl(e,t,o,s);if(r.add(n),!Gi.has(e)){let p=fn(),c=()=>{Kl(e,p,Tt.timestamp);for(let b of r)b.measure(p);st.preUpdate(d)},d=()=>{for(let b of r)b.notify(p)},m=()=>st.read(c);Gi.set(e,m);let g=Jl(e);window.addEventListener("resize",m),e!==document.documentElement&&Zl.set(e,ji(e,m)),g.addEventListener("scroll",m),m()}if(i&&!Ur.has(e)){let p=Gi.get(e),c={width:e.scrollWidth,height:e.scrollHeight},d=()=>{let g=e.scrollWidth,b=e.scrollHeight;(c.width!==g||c.height!==b)&&(p(),c.width=g,c.height=b)},m=st.read(d,!0);Ur.set(e,m)}let h=Gi.get(e);return st.read(h,!1,!0),()=>{Vi(h);let p=Hr.get(e);if(!p||(p.delete(n),p.size))return;Hr.delete(e);let c=Gi.get(e);Gi.delete(e),c&&(Jl(e).removeEventListener("scroll",c),Zl.get(e)?.(),window.removeEventListener("resize",c));let d=Ur.get(e);d&&(Vi(d),Ur.delete(e))}}function Ql(t){return typeof window>"u"?!1:t?Uo():Vs()}var th=new Map;function eh({container:t,target:e,axis:i}){let s=th.get(t);s||(s=new Map,th.set(t,s));let r=e??"self",o=s.get(r);return o||(o={},s.set(r,o)),o[i]||(o[i]=e?new ViewTimeline({subject:e,axis:i}):new ScrollTimeline({source:t,axis:i}))}var Fc=t=>{if(/v/u.test(t))return[];let e=Ki(t,0,0,0);return[Ki(t,0,1,0)-e,e-Ki(t,1,0,0),e]},ih=([t,e,i])=>!i&&(e===0||e===1)&&`${e?"entry":"exit"}-crossing ${t*100}%`;function sh(t=Fr.All){if(t.length!==2)return;let[e,i]=t.map(Fc),s=[ih(e),ih(i)],r=i[0]-e[0],o=e[1]-i[1];if(s[0]&&s[1]&&(r||o))return{points:s,a:r,b:o,cover:!e[0]&&r===1&&o===1}}function rh(t,e){let{target:i,container:s,axis:r}=e,o=i&&sh(e.offset),n=Ql(i)&&(i?!!o:!e.offset),h=new Map,p=new Set,c,d=!1,m=(b,S)=>{let[E,T]=o.points;S.effect.updateTiming({direction:d?b==="normal"?"reverse":"alternate-reverse":b}),Object.assign(S,{rangeStart:d?T:E,rangeEnd:d?E:T}),S.play()},g=[t.attachTimeline({get timeline(){return n?eh(e):void 0},onAttach:o&&(b=>{let S=b.effect.getTiming().direction;h.set(b,S),m(S,b)}),observe:b=>(b.pause(),p.add(b),c||(c=Wr(S=>{p.forEach(E=>{E.time=E.iterationDuration*S[r].progress})},e)),()=>p.delete(b))})];if(n&&o){let{a:b,b:S}=o,E=r==="y"?"clientHeight":"clientWidth",T=()=>{d!==(d=b*i[E]+S*s[E]<0)&&h.forEach(m)};T(),b*S<0&&g.push(ji(T),ji([i,s],T))}return()=>{g.forEach(b=>b()),c?.()}}function Et(t,{axis:e="y",source:i,container:s=document.scrollingElement,...r}={}){if(!s)return lt;let o={axis:e,container:i||s,...r};return typeof t=="function"?Wr(n=>t(n[e].progress,n),o):rh(t,o)}var Jt=class extends w{constructor(...t){super(...t),this.scale=1.05,this.x=0,this.y=0,this.rotate=0,this.skew=0,this.duration=.3,this.bounce=.3,this.disabled=!1,this.onEnter=()=>{this.disabled||this.reduced||f(this,{scale:this.scale,x:this.x,y:this.y,rotate:this.rotate,skewX:this.skew},this.spring)},this.onLeave=()=>{this.disabled||this.reduced||this.settle()}}static{this.styles=v`
    :host {
      display: inline-block;
    }
  `}get reduced(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}connectedCallback(){super.connectedCallback(),re(this),this.addEventListener("mouseenter",this.onEnter),this.addEventListener("mouseleave",this.onLeave)}disconnectedCallback(){super.disconnectedCallback(),oe(this),this.removeEventListener("mouseenter",this.onEnter),this.removeEventListener("mouseleave",this.onLeave)}updated(t){t.get("disabled")===!1&&this.disabled&&!this.reduced&&this.settle()}get spring(){return{type:"spring",bounce:this.bounce,duration:this.duration}}settle(){f(this,{scale:1,x:0,y:0,rotate:0,skewX:0},this.spring)}render(){return u`<slot></slot>`}};a([l({type:Number})],Jt.prototype,"scale",void 0),a([l({type:Number})],Jt.prototype,"x",void 0),a([l({type:Number})],Jt.prototype,"y",void 0),a([l({type:Number})],Jt.prototype,"rotate",void 0),a([l({type:Number})],Jt.prototype,"skew",void 0),a([l({type:Number})],Jt.prototype,"duration",void 0),a([l({type:Number})],Jt.prototype,"bounce",void 0),a([l({type:Boolean,converter:y,reflect:!0})],Jt.prototype,"disabled",void 0),Jt=a([x("motion-hover")],Jt);var xi=class extends w{constructor(...t){super(...t),this.scale=.95,this.duration=.15,this.bounce=.4,this.disabled=!1,this.onPress=()=>{this.disabled||this.reduced||f(this,{scale:this.scale},{type:"spring",bounce:0,duration:this.duration})},this.onRelease=()=>{this.disabled||this.reduced||this.settle()}}static{this.styles=v`
    :host {
      display: inline-block;
    }
  `}get reduced(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}connectedCallback(){super.connectedCallback(),re(this),this.addEventListener("pointerdown",this.onPress),this.addEventListener("pointerup",this.onRelease),this.addEventListener("pointerleave",this.onRelease)}disconnectedCallback(){super.disconnectedCallback(),oe(this),this.removeEventListener("pointerdown",this.onPress),this.removeEventListener("pointerup",this.onRelease),this.removeEventListener("pointerleave",this.onRelease)}updated(t){t.get("disabled")===!1&&this.disabled&&!this.reduced&&this.settle()}settle(){f(this,{scale:1},{type:"spring",bounce:this.bounce,duration:this.duration})}render(){return u`<slot></slot>`}};a([l({type:Number})],xi.prototype,"scale",void 0),a([l({type:Number})],xi.prototype,"duration",void 0),a([l({type:Number})],xi.prototype,"bounce",void 0),a([l({type:Boolean,converter:y,reflect:!0})],xi.prototype,"disabled",void 0),xi=a([x("motion-press")],xi);var Yi={type:"spring",bounce:.2};var Hc=()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches,C=class{constructor(t,e){this.host=t,this.delegate=e,this.state="idle",this.handle=null,this.done=Promise.resolve(),this.resolveDone=null,this.runId=0}get playState(){return this.state}get finished(){return this.done}play(){if(this.state==="running")return this.done;if(this.state==="paused")return this.handle?.resume(),this.state="running",this.done;let t=++this.runId;if(this.done=new Promise(i=>{this.resolveDone=i}),this.emit("motion-start"),Hc()&&!this.delegate.runsUnderReducedMotion)return this.delegate.applyFinalState(),this.settle("finished","motion-finish"),this.done;this.state="running";let e=this.delegate.start();return this.handle=e.handle,e.done?.then(()=>{t===this.runId&&this.state==="running"&&this.settle("finished","motion-finish")}),this.done}pause(){this.state==="running"&&(this.handle?.pause(),this.state="paused")}finish(){this.state!=="finished"&&(this.runId++,this.handle?this.handle.finish():this.delegate.applyFinalState(),this.settle("finished","motion-finish"))}cancel(){this.state!=="idle"&&(this.runId++,this.handle?.cancel(),this.delegate.applyInitialState(),this.settle("idle","motion-cancel"))}teardown(){this.runId++,this.handle?.cancel(),this.handle=null,this.resolveDone?.(),this.resolveDone=null,this.state="idle"}settle(t,e){this.handle=null,this.state=t,this.resolveDone?.(),this.resolveDone=null,this.emit(e)}emit(t){this.host.dispatchEvent(new CustomEvent(t,{bubbles:!0,composed:!0}))}};function wi(t){return{pause:()=>t.pause(),resume:()=>t.play(),finish:()=>t.complete(),cancel:()=>t.cancel()}}function X(t){return{handle:wi(t),done:t}}function je(t){let e=null,i=0,s=r=>{t(r-i),i=r,e=requestAnimationFrame(s)};return{start(){e===null&&(i=performance.now(),e=requestAnimationFrame(s))},stop(){e!==null&&cancelAnimationFrame(e),e=null},get running(){return e!==null}}}function M(t){class e extends t{play(){return this.playback.play()}pause(){this.playback.pause()}finish(){this.playback.finish()}cancel(){this.playback.cancel()}get playState(){return this.playback.playState}get finished(){return this.playback.finished}connectedCallback(){super.connectedCallback?.(),Nn(this)}disconnectedCallback(){super.disconnectedCallback?.(),In(this),this.playback?.teardown()}}return e}var ki=class extends M(w){constructor(...t){super(...t),this.duration=.6,this.y=24,this.threshold=.1,this.once=!0,this.observer=null,this.revealed=!1,this.playback=new C(this,{start:()=>X(f(this,{opacity:[0,1],y:[this.y,0]},{...Yi,duration:this.duration})),applyFinalState:()=>{this.style.opacity="1",this.style.transform=""},applyInitialState:()=>{this.style.opacity="0",this.style.transform=""}}),this.onIntersect=e=>{for(let i of e)i.isIntersecting&&!this.revealed&&this.playState==="idle"?(this.play(),this.once&&(this.revealed=!0,this.observer?.disconnect())):i.isIntersecting||!this.once&&this.playState!=="idle"&&this.cancel()}}static{this.styles=v`
    :host {
      display: block;
    }
  `}get reduced(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}connectedCallback(){this.style.opacity=this.reduced?"1":"0",super.connectedCallback(),!this.reduced&&(this.observer=new IntersectionObserver(this.onIntersect,{threshold:this.threshold}),this.observer.observe(this))}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect()}replay(){this.revealed=!1,this.cancel(),this.play()}render(){return u`<slot></slot>`}};a([l({type:Number})],ki.prototype,"duration",void 0),a([l({type:Number})],ki.prototype,"y",void 0),a([l({type:Number})],ki.prototype,"threshold",void 0),a([l({type:Boolean,converter:y})],ki.prototype,"once",void 0),ki=a([x("motion-reveal")],ki);var Me=class extends M(w){constructor(...t){super(...t),this.interval=.06,this.duration=.5,this.y=16,this.from="first",this.once=!0,this.observer=null,this.animated=!1,this.playback=new C(this,{start:()=>X(f(this.slotEl.assignedElements(),{opacity:[0,1],y:[this.y,0]},{delay:Lt(this.interval,{from:this.from}),...Yi,duration:this.duration})),applyFinalState:()=>{for(let e of this.slotEl.assignedElements())e.style.opacity="1",e.style.transform=""},applyInitialState:()=>{for(let e of this.slotEl.assignedElements())e.style.opacity="0",e.style.transform=""}}),this.onSlotChange=()=>{let e=this.slotEl.assignedElements();if(e.length&&!this.reduced){if(this.playState!=="idle"){f(e,{opacity:1,y:0},{duration:0});return}f(e,{opacity:0,y:this.y},{duration:0}),this.observer?.disconnect(),this.observer=new IntersectionObserver(this.onIntersect,{threshold:.1}),this.observer.observe(e[0])}},this.onIntersect=e=>{for(let i of e)i.isIntersecting&&!this.animated&&this.playState==="idle"?(this.play(),this.once&&(this.animated=!0,this.observer?.disconnect())):i.isIntersecting||!this.once&&this.playState!=="idle"&&this.cancel()}}static{this.styles=v`
    :host {
      display: contents;
    }
  `}get reduced(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}connectedCallback(){super.connectedCallback(),!this.reduced&&Array.from(this.children).forEach(t=>{t.style.opacity="0"})}firstUpdated(){this.slotEl.addEventListener("slotchange",this.onSlotChange)}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect()}replay(){this.animated=!1,this.cancel(),this.play()}render(){return u`<slot></slot>`}};a([l({type:Number})],Me.prototype,"interval",void 0),a([l({type:Number})],Me.prototype,"duration",void 0),a([l({type:Number})],Me.prototype,"y",void 0),a([l({type:String})],Me.prototype,"from",void 0),a([l({type:Boolean,converter:y})],Me.prototype,"once",void 0),a([at("slot")],Me.prototype,"slotEl",void 0),Me=a([x("motion-stagger")],Me);function Bt(t,e,i,s){let r=new IntersectionObserver(([o])=>{o.isIntersecting?i():s?.()},{threshold:e});return r.observe(t),()=>r.disconnect()}var ut=class{constructor(t){this.timer=null,this.pending=null,this.dueAt=0,this.remaining=0,this.leg=null,this.running=!1,this.frozen=!1,this.options=t}get active(){return this.running}get paused(){return this.frozen}start(){return this.stop(),this.running=!0,this.remaining=0,this.schedule(()=>this.runLeg(!1),(this.options.delay?.()??0)*1e3),{pause:()=>this.pause(),resume:()=>this.resume(),finish:()=>this.stop(),cancel:()=>this.stop()}}stop(){this.running=!1,this.frozen=!1,this.timer&&clearTimeout(this.timer),this.timer=null,this.pending=null,this.leg?.cancel(),this.leg=null}pause(){this.frozen=!0,this.timer?(clearTimeout(this.timer),this.timer=null,this.remaining=Math.max(0,this.dueAt-performance.now())):this.remaining=0,this.leg?.pause()}resume(){this.frozen=!1,this.leg?.resume(),this.pending&&this.schedule(this.pending,this.remaining)}schedule(t,e){this.pending=t,this.dueAt=performance.now()+e,this.timer=setTimeout(()=>{this.timer=null,this.pending=null,t()},e)}runLeg(t){if(!this.running)return;let e=this.options.leg(t);if(!e){this.wait(t);return}this.leg=e.handle,e.done?.then(()=>{this.running&&(this.leg=null,this.wait(t))})}wait(t){let e=t?this.options.gap?.()??0:this.options.hold?.()??0;this.schedule(()=>this.runLeg(!t),e*1e3)}};function oh(t,e){let i=null,s=0,r=t()*1e3,o=null,n=null,h=new Promise(c=>{n=c}),p=c=>{r=c,s=performance.now()+c,i=setTimeout(()=>{i=null;let d=e();o=d.handle,d.done?.then(()=>n?.())},c)};return p(r),{handle:{pause:()=>{i&&(clearTimeout(i),i=null,r=Math.max(0,s-performance.now())),o?.pause()},resume:()=>{!i&&!o&&r>0&&p(r),o?.resume()},finish:()=>{i?(clearTimeout(i),i=null):o?.finish()},cancel:()=>{i?(clearTimeout(i),i=null):o?.cancel()}},done:h}}var kt=class{constructor(t,e){this.host=t,this.options=e,this.disconnect=null,this.triggered=!1}arm(){this.disarm(),this.disconnect=Bt(this.options.observe?.()??this.host,this.options.threshold(),()=>{if(this.options.loop()){this.host.playState==="idle"&&this.host.play();return}this.triggered||this.host.playState!=="idle"||(this.host.play(),this.options.once()&&(this.triggered=!0,this.disconnect?.()))},()=>{(this.options.loop()||!this.options.once())&&this.host.playState!=="idle"&&this.host.cancel()})}reset(){this.triggered=!1}disarm(){this.disconnect?.(),this.disconnect=null}};function q(t,e,i,s){let r=!1,o=()=>{r||!e()||t.playState!=="running"||(r=!0,i())},n=()=>{r&&(r=!1,t.playState==="paused"&&s())};return t.addEventListener("pointermove",o),t.addEventListener("pointerleave",n),()=>{t.removeEventListener("pointermove",o),t.removeEventListener("pointerleave",n)}}var zt=class extends M(w){constructor(...t){super(...t),this.duration=.9,this.delay=0,this.threshold=.2,this.once=!0,this.loop=!1,this.hold=1.6,this.gap=.5,this.pauseOnHover=!1,this.detachPauseOnHover=null,this.cycle=new ut({leg:e=>this.slide(e,0),hold:()=>this.hold,gap:()=>this.gap,delay:()=>this.delay}),this.viewport=new kt(this,{threshold:()=>this.threshold,once:()=>this.once,loop:()=>this.loop}),this.playback=new C(this,{start:()=>this.loop?{handle:this.cycle.start()}:this.slide(!1),applyFinalState:()=>{this.cycle.stop(),this.inner.style.transform=""},applyInitialState:()=>{this.cycle.stop(),this.inner.style.transform="translateY(110%)"}})}static{this.styles=v`
    :host {
      display: inline-block;
      overflow: hidden;
      vertical-align: bottom;
    }
    .inner {
      display: block;
      will-change: transform;
    }
  `}get reduced(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}slide(t,e=this.delay){return X(f(this.inner,t?{y:["0%","110%"]}:{y:["110%","0%"]},{duration:this.duration,...t?{}:{delay:e},type:"spring",bounce:.05}))}connectedCallback(){super.connectedCallback()}firstUpdated(){this.reduced||(this.inner.style.transform="translateY(110%)"),this.viewport.arm(),this.detachPauseOnHover=q(this,()=>this.loop&&this.pauseOnHover,()=>this.pause(),()=>this.play())}disconnectedCallback(){super.disconnectedCallback(),this.viewport.disarm(),this.detachPauseOnHover?.(),this.detachPauseOnHover=null}replay(){this.viewport.reset(),this.cancel(),this.play()}render(){return u`<div class="inner"><slot></slot></div>`}};a([l({type:Number})],zt.prototype,"duration",void 0),a([l({type:Number})],zt.prototype,"delay",void 0),a([l({type:Number})],zt.prototype,"threshold",void 0),a([l({type:Boolean,converter:y})],zt.prototype,"once",void 0),a([l({type:Boolean,converter:y})],zt.prototype,"loop",void 0),a([l({type:Number})],zt.prototype,"hold",void 0),a([l({type:Number})],zt.prototype,"gap",void 0),a([l({type:Boolean,converter:y,attribute:"pause-on-hover"})],zt.prototype,"pauseOnHover",void 0),a([at(".inner")],zt.prototype,"inner",void 0),zt=a([x("motion-text-mask")],zt);var Si=class extends M(w){constructor(...t){super(...t),this.intensity=10,this.y=12,this.once=!0,this.direction="in",this.cleanup=null,this.latched=!1,this.playback=new C(this,{start:()=>(this.latched=!1,this.bind(),{handle:{pause:()=>this.unbind(),resume:()=>this.bind(),finish:()=>{this.unbind(),this.applyEnd()},cancel:()=>this.unbind()}}),applyFinalState:()=>this.reduced?this.showPlain():this.applyEnd(),applyInitialState:()=>{if(this.reduced)return this.showPlain();this.style.opacity=this.direction==="out"?"":"0",this.style.filter="",this.style.transform=""}})}static{this.styles=v`
    :host {
      display: block;
    }
  `}get reduced(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}connectedCallback(){super.connectedCallback(),this.direction!=="out"&&!this.reduced&&(this.style.opacity="0")}firstUpdated(){this.play()}showPlain(){this.style.opacity="1",this.style.filter="",this.style.transform=""}applyEnd(){this.direction==="in"?(this.style.opacity="1",this.style.filter="",this.style.transform=""):(this.style.opacity="0",this.style.filter=`blur(${this.intensity}px)`,this.style.transform=`translateY(${-this.y}px)`)}bind(){this.unbind(),this.direction==="in"?this.cleanup=Et(t=>{if(this.latched)return;let e=Math.max(0,Math.min(1,t));this.style.opacity=String(e),this.style.filter=`blur(${this.intensity*(1-e)}px)`,this.style.transform=`translateY(${this.y*(1-e)}px)`,this.once&&e>=1&&(this.latched=!0,this.finish())},{target:this,offset:["start end","center center"]}):this.direction==="out"?this.cleanup=Et(t=>{let e=Math.max(0,Math.min(1,t));this.style.opacity=String(1-e),this.style.filter=`blur(${this.intensity*e}px)`,this.style.transform=`translateY(${-this.y*e}px)`},{target:this,offset:["center center","end start"]}):this.cleanup=Et(t=>{let e=Math.max(0,Math.min(1,t)),i=1-Math.abs(e*2-1);this.style.opacity=String(i),this.style.filter=`blur(${this.intensity*(1-i)}px)`,this.style.transform=`translateY(${this.y*(1-2*e)}px)`},{target:this,offset:["start end","end start"]})}unbind(){this.cleanup?.(),this.cleanup=null}replay(){this.cancel(),this.play(),requestAnimationFrame(()=>{window.dispatchEvent(new Event("scroll",{bubbles:!0}))})}render(){return u`<slot></slot>`}};a([l({type:Number})],Si.prototype,"intensity",void 0),a([l({type:Number})],Si.prototype,"y",void 0),a([l({type:Boolean,converter:y})],Si.prototype,"once",void 0),a([l({type:String,reflect:!0})],Si.prototype,"direction",void 0),Si=a([x("motion-blur")],Si);var Ke=class extends M(w){constructor(...t){super(...t),this.duration=.7,this.intensity=10,this.y=12,this.threshold=.1,this.once=!0,this.observer=null,this.revealed=!1,this.playback=new C(this,{start:()=>X(f(this,{opacity:[0,1],filter:[`blur(${this.intensity}px)`,"blur(0px)"],y:[this.y,0]},{duration:this.duration,type:"spring",bounce:.1})),applyFinalState:()=>{this.style.opacity="1",this.style.filter="",this.style.transform=""},applyInitialState:()=>{this.style.opacity="0",this.style.filter=`blur(${this.intensity}px)`,this.style.transform=""}}),this.onIntersect=e=>{for(let i of e)i.isIntersecting&&!this.revealed&&this.playState==="idle"?(this.play(),this.once&&(this.revealed=!0,this.observer?.disconnect())):i.isIntersecting||!this.once&&this.playState!=="idle"&&this.cancel()}}static{this.styles=v`
    :host {
      display: block;
    }
  `}get reduced(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}connectedCallback(){super.connectedCallback(),this.reduced||(this.style.opacity="0")}firstUpdated(){this.reduced||(this.style.filter=`blur(${this.intensity}px)`),this.observer=new IntersectionObserver(this.onIntersect,{threshold:this.threshold}),this.observer.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect()}replay(){this.revealed=!1,this.cancel(),this.play()}render(){return u`<slot></slot>`}};a([l({type:Number})],Ke.prototype,"duration",void 0),a([l({type:Number})],Ke.prototype,"intensity",void 0),a([l({type:Number})],Ke.prototype,"y",void 0),a([l({type:Number})],Ke.prototype,"threshold",void 0),a([l({type:Boolean,converter:y})],Ke.prototype,"once",void 0),Ke=a([x("motion-blur-in")],Ke);var $i=class extends w{constructor(...t){super(...t),this.strength=.4,this.duration=.5,this.bounce=.4,this.disabled=!1,this.onMove=e=>{if(this.disabled||this.reduced)return;let i=this.getBoundingClientRect(),s=i.left+i.width/2,r=i.top+i.height/2,o=(e.clientX-s)*this.strength,n=(e.clientY-r)*this.strength;f(this,{x:o,y:n},{type:"spring",bounce:this.bounce,duration:this.duration})},this.onLeave=()=>{this.disabled||this.reduced||this.settle()}}static{this.styles=v`
    :host {
      display: inline-block;
    }
  `}get reduced(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}connectedCallback(){super.connectedCallback(),re(this),this.addEventListener("mousemove",this.onMove),this.addEventListener("mouseleave",this.onLeave)}disconnectedCallback(){super.disconnectedCallback(),oe(this),this.removeEventListener("mousemove",this.onMove),this.removeEventListener("mouseleave",this.onLeave)}updated(t){t.get("disabled")===!1&&this.disabled&&!this.reduced&&this.settle()}settle(){f(this,{x:0,y:0},{type:"spring",bounce:this.bounce,duration:this.duration})}render(){return u`<slot></slot>`}};a([l({type:Number})],$i.prototype,"strength",void 0),a([l({type:Number})],$i.prototype,"duration",void 0),a([l({type:Number})],$i.prototype,"bounce",void 0),a([l({type:Boolean,converter:y,reflect:!0})],$i.prototype,"disabled",void 0),$i=a([x("motion-magnetic")],$i);var Ft=class extends w{constructor(...t){super(...t),this.max=15,this.duration=.5,this.bounce=.2,this.scale=1.04,this.gloss=!1,this.disabled=!1,this.glossAnim=null,this.onEnter=()=>{this.disabled||this.reduced||!this.gloss||!this.glossEl||(this.glossAnim?.stop(),this.glossAnim=f(this.glossEl,{opacity:[0,1]},{type:"spring",bounce:0,duration:.3}))},this.onMove=e=>{if(this.disabled||this.reduced)return;let i=this.getBoundingClientRect(),s=(e.clientX-i.left)/i.width,r=(e.clientY-i.top)/i.height,o=(.5-r)*this.max*2,n=(s-.5)*this.max*2;f(this.inner,{rotateX:o,rotateY:n,scale:this.scale},{type:"spring",duration:this.duration,bounce:this.bounce});let h=(Math.abs(o)+Math.abs(n))/(this.max*4),p=-n*.6,c=o*.6,d=.1+h*.22;if(this.inner.style.filter=`drop-shadow(${p}px ${c}px 22px rgba(0,0,0,${d.toFixed(2)}))`,this.gloss&&this.glossEl){let m=s*100,g=r*100;this.glossEl.style.background=[`radial-gradient(circle at ${m}% ${g}%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.04) 50%, transparent 70%)`,"linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 55%)"].join(", ")}},this.onLeave=()=>{this.disabled||this.reduced||this.settle()}}static{this.styles=v`
    :host {
      display: inline-block;
      perspective: 900px;
    }

    .inner {
      position: relative;
      will-change: transform;
    }

    .gloss {
      position: absolute;
      inset: 0;
      pointer-events: none;
      opacity: 0;
      z-index: 1;
      border-radius: inherit;
    }
  `}get reduced(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}connectedCallback(){super.connectedCallback(),re(this),this.addEventListener("mouseenter",this.onEnter),this.addEventListener("mousemove",this.onMove),this.addEventListener("mouseleave",this.onLeave)}disconnectedCallback(){super.disconnectedCallback(),oe(this),this.removeEventListener("mouseenter",this.onEnter),this.removeEventListener("mousemove",this.onMove),this.removeEventListener("mouseleave",this.onLeave),this.glossAnim?.stop()}updated(t){t.get("disabled")===!1&&this.disabled&&!this.reduced&&this.settle()}firstUpdated(){this.syncRadius(),this.slotEl.addEventListener("slotchange",()=>this.syncRadius())}syncRadius(){let t=this.slotEl?.assignedElements()[0];if(t){let e=getComputedStyle(t).borderRadius;this.inner.style.borderRadius=e}}settle(){f(this.inner,{rotateX:0,rotateY:0,scale:1},{type:"spring",duration:this.duration,bounce:this.bounce}),this.inner.style.filter="",this.gloss&&this.glossEl&&(this.glossAnim?.stop(),this.glossAnim=f(this.glossEl,{opacity:0},{type:"spring",bounce:0,duration:.2}))}render(){return u`
      <div class="inner">
        <slot></slot>
        ${this.gloss?u`<div class="gloss"></div>`:""}
      </div>
    `}};a([l({type:Number})],Ft.prototype,"max",void 0),a([l({type:Number})],Ft.prototype,"duration",void 0),a([l({type:Number})],Ft.prototype,"bounce",void 0),a([l({type:Number})],Ft.prototype,"scale",void 0),a([l({type:Boolean,converter:y})],Ft.prototype,"gloss",void 0),a([l({type:Boolean,converter:y,reflect:!0})],Ft.prototype,"disabled",void 0),a([at(".inner")],Ft.prototype,"inner",void 0),a([at(".gloss")],Ft.prototype,"glossEl",void 0),a([at("slot")],Ft.prototype,"slotEl",void 0),Ft=a([x("motion-tilt")],Ft);var Xi=t=>t.split(/(?<=-)/);var Uc={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Ht=t=>t.replace(/[&<>"']/g,e=>Uc[e]),qr=(t,e)=>Xi(t).map(i=>`<span style="display:inline-block;white-space:nowrap" aria-hidden="true">${[...i].map(e).join("")}</span>`).join(""),gn=t=>`<span style="position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap;user-select:none">${Ht(t)}</span>`;function jr(t,e,i=!1){let s=t.textContent?.trim()??"";if(!s)return{spans:[],originalText:s};let r=e==="lines"?qc(t,s,i):Wc(s,e,i);return t.innerHTML=gn(s)+r,{spans:[...t.querySelectorAll("[data-unit]")],originalText:s}}function Wc(t,e,i){let s=t.split(/\s+/);return e==="chars"?i?s.map(r=>qr(r,o=>`<span style="display:inline-block;overflow:hidden;vertical-align:bottom"><span data-unit style="display:inline-block;will-change:transform;transform:translateY(110%)">${Ht(o)}</span></span>`)).join(" "):s.map(r=>qr(r,o=>`<span data-unit style="display:inline-block;will-change:transform,opacity;opacity:0">${Ht(o)}</span>`)).join(" "):i?s.map(r=>`<span style="display:inline-block;overflow:hidden;vertical-align:bottom" aria-hidden="true"><span data-unit style="display:inline-block;will-change:transform;transform:translateY(110%)">${Ht(r)}</span></span>`).join(" "):s.map(r=>`<span data-unit style="display:inline-block;will-change:transform,opacity;opacity:0" aria-hidden="true">${Ht(r)}</span>`).join(" ")}function qc(t,e,i){t.innerHTML=e.split(/\s+/).map(n=>`<span style="display:inline">${Ht(n)}</span>`).join(" ");let s=[...t.querySelectorAll("span")],r=new Map;s.forEach(n=>{let h=Math.round(n.getBoundingClientRect().top);r.has(h)||r.set(h,[]),r.get(h).push(n.textContent??"")});let o=[...r.values()];return i?o.map(n=>`<span style="display:block;overflow:hidden;vertical-align:bottom" aria-hidden="true"><span data-unit style="display:block;will-change:transform;transform:translateY(110%)">${Ht(n.join(" "))}</span></span>`).join(""):o.map(n=>`<span data-unit style="display:block;will-change:transform,opacity;opacity:0" aria-hidden="true">${Ht(n.join(" "))}</span>`).join("")}var Ut=class extends M(w){constructor(...t){super(...t),this.by="words",this.interval=.05,this.duration=.6,this.y=20,this.once=!0,this.loop=!1,this.hold=1.6,this.gap=.5,this.pauseOnHover=!1,this.spans=[],this.detachPauseOnHover=null,this.cycle=new ut({leg:e=>this.animateUnits(e),hold:()=>this.hold,gap:()=>this.gap}),this.viewport=new kt(this,{threshold:()=>.1,once:()=>this.once,loop:()=>this.loop,observe:()=>this.spans[0]??this}),this.playback=new C(this,{start:()=>this.loop?{handle:this.cycle.start()}:this.animateUnits(!1),applyFinalState:()=>{this.cycle.stop(),this.placeUnits(0)},applyInitialState:()=>{this.cycle.stop(),this.placeUnits(this.y)}})}static{this.styles=v`
    :host {
      display: block;
    }
    :host(:not([data-ready])) {
      visibility: hidden;
    }
  `}get reduced(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}animateUnits(t){return X(f(this.spans,t?{opacity:[1,0],y:[0,this.y]}:{opacity:[0,1],y:[this.y,0]},{...t?{}:{delay:Lt(this.interval)},...Yi,duration:this.duration}))}placeUnits(t){for(let e of this.spans)e.style.opacity=t===0?"1":"0",e.style.transform=t===0?"":`translateY(${t}px)`}firstUpdated(){let{spans:t}=jr(this,this.by);if(!t.length){this.setAttribute("data-ready","");return}if(this.spans=t,this.setAttribute("data-ready",""),this.reduced){this.finish();return}this.placeUnits(this.y),this.viewport.arm(),this.detachPauseOnHover=q(this,()=>this.loop&&this.pauseOnHover,()=>this.pause(),()=>this.play())}disconnectedCallback(){super.disconnectedCallback(),this.viewport.disarm(),this.detachPauseOnHover?.(),this.detachPauseOnHover=null}replay(){this.viewport.reset(),this.cancel(),this.play()}render(){return u`<slot></slot>`}};a([l({type:String,reflect:!0})],Ut.prototype,"by",void 0),a([l({type:Number})],Ut.prototype,"interval",void 0),a([l({type:Number})],Ut.prototype,"duration",void 0),a([l({type:Number})],Ut.prototype,"y",void 0),a([l({type:Boolean,converter:y})],Ut.prototype,"once",void 0),a([l({type:Boolean,converter:y})],Ut.prototype,"loop",void 0),a([l({type:Number})],Ut.prototype,"hold",void 0),a([l({type:Number})],Ut.prototype,"gap",void 0),a([l({type:Boolean,converter:y,attribute:"pause-on-hover"})],Ut.prototype,"pauseOnHover",void 0),Ut=a([x("motion-split")],Ut);var _t=class extends M(w){constructor(...t){super(...t),this.by="words",this.variant="slide",this.interval=.06,this.duration=1,this.delay=0,this.threshold=.2,this.once=!0,this.loop=!1,this.hold=1.6,this.gap=.5,this.pauseOnHover=!1,this.units=[],this.detachPauseOnHover=null,this.cycle=new ut({leg:e=>this.animateUnits(e,0),hold:()=>this.hold,gap:()=>this.gap,delay:()=>this.delay}),this.viewport=new kt(this,{threshold:()=>this.threshold,once:()=>this.once,loop:()=>this.loop}),this.playback=new C(this,{start:()=>this.loop?{handle:this.cycle.start()}:this.animateUnits(!1),applyFinalState:()=>{this.cycle.stop(),this.placeUnits(!1)},applyInitialState:()=>{this.cycle.stop(),this.placeUnits(!0)}})}static{this.styles=v`
    :host {
      display: block;
    }
    :host(:not([data-ready])) {
      visibility: hidden;
    }
  `}animateUnits(t,e=this.delay){let i=this.variant==="flip",s=t?{}:{delay:Lt(this.interval,{startDelay:e})};return X(f(this.units,i?t?{rotateX:[0,90],opacity:[1,0]}:{rotateX:[90,0],opacity:[0,1]}:t?{y:["0%","110%"]}:{y:["110%","0%"]},{...s,duration:this.duration,type:"spring",bounce:i?.1:.05}))}placeUnits(t){for(let e of this.units)t?(e.style.transform=this.variant==="flip"?"perspective(400px) rotateX(90deg)":"translateY(110%)",this.variant==="flip"&&(e.style.opacity="0")):(e.style.transform="",e.style.opacity="1")}get reduced(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}firstUpdated(){if(this.variant==="flip")this.buildFlip();else{let{spans:t}=jr(this,this.by,!0);this.units=t}if(!this.units.length){this.setAttribute("data-ready","");return}if(this.setAttribute("data-ready",""),this.reduced){this.finish();return}this.viewport.arm(),this.detachPauseOnHover=q(this,()=>this.loop&&this.pauseOnHover,()=>this.pause(),()=>this.play())}buildFlip(){let t=this.textContent?.trim()??"";if(!t)return;let e=this.by==="lines"?"words":this.by,i=t.split(/\s+/);this.style.perspective="600px";let s=o=>`<span data-unit style="display:inline-block;will-change:transform;transform:perspective(400px) rotateX(90deg);transform-origin:center bottom;opacity:0" aria-hidden="true">${Ht(o)}</span>`,r=e==="chars"?i.map(o=>qr(o,s)):i.map(s);this.innerHTML=gn(t)+r.join(" "),this.units=[...this.querySelectorAll("[data-unit]")]}disconnectedCallback(){super.disconnectedCallback(),this.viewport.disarm(),this.detachPauseOnHover?.(),this.detachPauseOnHover=null}replay(){this.viewport.reset(),this.cancel(),this.play()}render(){return u`<slot></slot>`}};a([l({type:String,reflect:!0})],_t.prototype,"by",void 0),a([l({type:String,reflect:!0})],_t.prototype,"variant",void 0),a([l({type:Number})],_t.prototype,"interval",void 0),a([l({type:Number})],_t.prototype,"duration",void 0),a([l({type:Number})],_t.prototype,"delay",void 0),a([l({type:Number})],_t.prototype,"threshold",void 0),a([l({type:Boolean,converter:y})],_t.prototype,"once",void 0),a([l({type:Boolean,converter:y})],_t.prototype,"loop",void 0),a([l({type:Number})],_t.prototype,"hold",void 0),a([l({type:Number})],_t.prototype,"gap",void 0),a([l({type:Boolean,converter:y,attribute:"pause-on-hover"})],_t.prototype,"pauseOnHover",void 0),_t=a([x("motion-headline")],_t);var Zi=class extends M(w){constructor(...t){super(...t),this.intensity=5,this.trigger="loop",this.interval=2,this.main=null,this.r=null,this.b=null,this.loopId=null,this.nextFireAt=0,this.remaining=0,this.bursts=[],this.playback=new C(this,{start:()=>{if(this.runGlitch(),this.trigger!=="loop"){let e=this.bursts;return{handle:{pause:()=>e.forEach(i=>i.pause()),resume:()=>e.forEach(i=>i.play()),finish:()=>this.settleBursts("complete"),cancel:()=>this.settleBursts("cancel")},done:{then:i=>Promise.all(e).then(i)}}}return this.schedule(this.interval*1e3),{handle:{pause:()=>{this.remaining=Math.max(0,this.nextFireAt-performance.now()),this.stopLoop()},resume:()=>this.schedule(this.remaining),finish:()=>{this.stopLoop(),this.settleBursts("complete")},cancel:()=>{this.stopLoop(),this.settleBursts("cancel")}}}},applyFinalState:()=>this.settleBursts("complete"),applyInitialState:()=>this.settleBursts("cancel")}),this.runGlitch=()=>{if(this.reduced)return;let{main:e,r:i,b:s}=this;if(!e||!i||!s)return;let r=this.intensity,o=.38;this.bursts=[f(i,{x:[0,r*1.4,-r*.9,r*2,-r*1.1,0],opacity:[0,.9,.65,.95,.75,0]},{duration:o,ease:"linear"}),f(s,{x:[0,-r*1,r*1.6,-r*1.3,r*.7,0],opacity:[0,.8,.95,.6,.85,0]},{duration:o,ease:"linear"}),f(e,{x:[0,-r*.3,r*.5,-r*.25,0]},{duration:o*.65,ease:"linear"})]},this.onEnter=()=>this.replay()}static{this.styles=v`
    :host {
      display: inline-block;
    }
  `}get reduced(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}firstUpdated(){let t=this.textContent?.trim()??"";if(!t)return;let e=Ht(t);this.innerHTML=`<span style="position:relative;display:inline-block"><span data-mg-main style="display:block">${e}</span><span data-mg-r aria-hidden="true" style="position:absolute;inset:0;display:block;color:#ff0040;opacity:0;pointer-events:none">${e}</span><span data-mg-b aria-hidden="true" style="position:absolute;inset:0;display:block;color:#00e5ff;opacity:0;pointer-events:none">${e}</span></span>`,this.main=this.querySelector("[data-mg-main]"),this.r=this.querySelector("[data-mg-r]"),this.b=this.querySelector("[data-mg-b]"),this.arm()}connectedCallback(){super.connectedCallback(),this.hasUpdated&&this.main&&this.trigger!=="mount"&&this.arm()}arm(){this.trigger==="hover"?this.addEventListener("pointerenter",this.onEnter):this.play()}schedule(t){this.nextFireAt=performance.now()+t,this.loopId=setTimeout(()=>{this.runGlitch(),this.schedule(this.interval*1e3)},t)}stopLoop(){this.loopId!==null&&clearTimeout(this.loopId),this.loopId=null}settleBursts(t){for(let e of this.bursts)e[t]();this.bursts=[]}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("pointerenter",this.onEnter)}replay(){this.cancel(),this.play()}glitch(){this.trigger==="loop"&&this.playState==="running"?this.runGlitch():this.replay()}render(){return u`<slot></slot>`}};a([l({type:Number})],Zi.prototype,"intensity",void 0),a([l({type:String,reflect:!0})],Zi.prototype,"trigger",void 0),a([l({type:Number})],Zi.prototype,"interval",void 0),Zi=a([x("motion-glitch")],Zi);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Kr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},qs=t=>(...e)=>({_$litDirective$:t,values:e}),Ji=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,i,s){this._$Ct=e,this._$AM=i,this._$Ci=s}_$AS(e,i){return this.update(e,i)}update(e,i){return this.render(...i)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var js=class extends Ji{constructor(e){if(super(e),this.it=k,e.type!==Kr.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===k||e==null)return this._t=void 0,this.it=e;if(e===be)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let i=[e];return i.raw=i,this._t={_$litType$:this.constructor.resultType,strings:i,values:[]}}};js.directiveName="unsafeHTML",js.resultType=1;var vn=qs(js);var ft=class extends M(w){constructor(...t){super(...t),this.filename="app.html",this.codeLang="",this.hideChrome=!1,this.copy=!1,this.copyLabel=!1,this.compact=!1,this.typing=!1,this.typingSpeed=80,this.typingDelay=0,this.typingLoop=!0,this.typingHold=1.5,this.copied=!1,this.highlighted="",this.visibleChars=-1,this.typingNow=!1,this.tokens=[],this.raw="",this.codeSet=!1,this.typePhase="delay",this.phaseElapsed=0,this.typeLoop=je(e=>this.typeTick(e)),this.resolveTyped=null,this.cursorControls=null,this.revealObserver=null,this.isIntersecting=!1,this.hasCode=!1,this.playback=new C(this,{start:()=>this.totalChars?(this.beginTyping(),this.typingLoop?{handle:this.typeHandle()}:{handle:this.typeHandle(),done:new Promise(e=>{this.resolveTyped=e})}):{handle:this.typeHandle(),done:Promise.resolve()},applyFinalState:()=>{this.visibleChars=this.totalChars,this.typingNow=!1},applyInitialState:()=>{this.visibleChars=this.typing?0:-1,this.typingNow=!1}})}static{this.styles=v`
    :host {
      display: flex;
      flex-direction: column;
      width: 100%;
      min-width: 0;
      background: var(--mc-color-surface-2, #f0f0f8);
      border: 1px solid var(--mc-color-border, #dddde8);
      border-radius: 16px;
      overflow: hidden;
      font-family: ui-monospace, 'Cascadia Code', 'Fira Code', monospace;
      container-type: inline-size;
      -webkit-text-size-adjust: 100%;
      text-size-adjust: 100%;
    }

    :host([compact]) {
      border-radius: 10px;
    }

    .chrome {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 0.75rem 1.25rem;
      border-bottom: 1px solid var(--mc-color-border, #dddde8);
    }

    :host([compact]) .chrome {
      padding: 0.3rem 0.75rem;
      gap: 5px;
    }

    .dot {
      width: 11px;
      height: 11px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    :host([compact]) .dot {
      width: 7px;
      height: 7px;
    }

    .dot-red {
      background: #ff5f57;
    }
    .dot-yellow {
      background: #febc2e;
    }
    .dot-green {
      background: #28c840;
    }

    .filename {
      font-size: 0.78rem;
      color: var(--mc-color-muted, #60608a);
      margin-left: 0.5rem;
      flex: 1;
    }

    :host([compact]) .filename {
      font-size: 0.68rem;
      margin-left: 0.35rem;
    }

    .copy-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.4em;
      background: transparent;
      border: 1px solid var(--mc-color-border, #dddde8);
      border-radius: 6px;
      padding: 0.3rem;
      font-size: 0.72rem;
      color: var(--mc-color-muted, #60608a);
      cursor: pointer;
      font-family: inherit;
      transition:
        color 0.15s,
        border-color 0.15s;
      line-height: 1;
    }

    .copy-btn:hover {
      color: var(--mc-color-accent, #2563eb);
      border-color: var(--mc-color-accent, #2563eb);
    }

    .copy-btn.has-label {
      padding: 0.25rem 0.5rem;
    }

    .copy-btn svg {
      width: 13px;
      height: 13px;
      display: block;
    }

    .body {
      flex: 1;
      background: var(--mc-color-surface, #ffffff);
      padding: 1.5rem 1.75rem;
      overflow-x: auto;
    }

    .code-area {
      display: grid;
    }

    .code-area > pre {
      grid-area: 1 / 1;
    }

    .sizer {
      visibility: hidden;
    }

    :host([compact]) .body {
      padding: 0.75rem 1rem;
    }

    pre {
      margin: 0;
      font-size: 0.875rem;
      line-height: 1.85;
      font-family: inherit;
      white-space: pre;
    }

    :host([compact]) pre {
      font-size: 0.8rem;
      line-height: 1.6;
    }

    @container (max-width: 30rem) {
      .chrome {
        padding: 0.6rem 1rem;
      }

      .body {
        padding: 1rem 1.1rem;
      }

      pre {
        font-size: 0.78rem;
        line-height: 1.7;
      }
    }

    .cursor {
      display: inline-block;
      width: 2px;
      height: 1em;
      background: var(--mc-color-muted, #60608a);
      vertical-align: text-bottom;
      margin-left: 1px;
    }

    /* ── Token colours — all overridable via CSS custom properties ──────────
       Map any external theme's values to these variables on :root.           */
    .cw-comment {
      color: var(--mc-code-comment, var(--mc-color-muted, #60608a));
    }
    .cw-keyword {
      color: var(--mc-code-keyword, #7c3aed);
    }
    .cw-string {
      color: var(--mc-code-string, #16a34a);
    }
    .cw-tag {
      color: var(--mc-code-tag, #0369a1);
    }
    .cw-attr {
      color: var(--mc-code-attr, #be123c);
    }
    .cw-num {
      color: var(--mc-code-num, #b45309);
    }
  `}connectedCallback(){super.connectedCallback(),this.injectThemeVars(),this.codeSet?this.setCode(this.raw):this.processCode()}disconnectedCallback(){super.disconnectedCallback(),this.cursorControls?.stop(),this.cursorControls=null,this.revealObserver?.disconnect()}replay(){this.typing&&(this.cancel(),this.play())}get code(){return this.raw}set code(t){this.setCode(t)}setCode(t){if(this.raw=t,this.codeSet=!0,!this.isConnected)return;let e=this.dedent(t);this.tokens=this.tokenize(e),this.highlighted=this.renderTokens(this.tokens),this.hasCode=!0,this.playState==="running"||this.playState==="paused"?this.cancel():this.playback.teardown(),this.typing&&(this.typingLoop?requestAnimationFrame(()=>{this.play()}):(this.hideUntilTyped(),this.setupRevealObserver())),this.requestUpdate()}updated(){if(this.typingNow){let t=this.shadowRoot?.querySelector(".cursor");if(t&&!this.cursorControls){if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;this.cursorControls=f(t,{opacity:[1,0]},{duration:.45,repeat:1/0,repeatType:"reverse"})}}else this.cursorControls?.stop(),this.cursorControls=null}injectThemeVars(){let t="cw-token-vars";if(document.getElementById(t))return;let e=document.createElement("style");e.id=t,e.textContent=`
      :root {
        --mc-code-keyword: #7c3aed; --mc-code-string: #16a34a;
        --mc-code-tag:     #0369a1; --mc-code-attr:   #be123c; --mc-code-num: #b45309;
      }
      [data-theme="dark"] {
        --mc-code-keyword: #c084fc; --mc-code-string: #86efac;
        --mc-code-tag:     #7dd3fc; --mc-code-attr:   #fda4af; --mc-code-num: #fcd34d;
      }
      @media (prefers-color-scheme: dark) {
        :root:not([data-theme="light"]) {
          --mc-code-keyword: #c084fc; --mc-code-string: #86efac;
          --mc-code-tag:     #7dd3fc; --mc-code-attr:   #fda4af; --mc-code-num: #fcd34d;
        }
      }
    `,document.head.appendChild(e)}processCode(){let t=this.extractRaw();this.raw=t,this.tokens=this.tokenize(t),this.highlighted=this.renderTokens(this.tokens),t&&(this.hasCode=!0,this.typing&&(this.typingLoop?this.play():(this.hideUntilTyped(),this.setupRevealObserver())))}hideUntilTyped(){this.playState==="idle"&&(this.visibleChars=window.matchMedia("(prefers-reduced-motion: reduce)").matches?-1:0)}setupRevealObserver(){this.revealObserver?.disconnect(),this.revealObserver=new IntersectionObserver(t=>{for(let e of t)this.isIntersecting=e.isIntersecting,e.isIntersecting&&this.hasCode&&(this.play(),this.revealObserver?.disconnect(),this.revealObserver=null)},{threshold:.2}),this.revealObserver.observe(this)}extractRaw(){let t=this.querySelector('script[type="text/plain"]');if(t)return this.dedent(t.textContent??"");let e=this.querySelector("pre");return e?this.dedent(e.textContent??""):this.dedent(Array.from(this.querySelectorAll("div")).map(i=>i.textContent??"").join(`
`))}dedent(t){let e=t.split(`
`);for(;e.length&&!e[0].trim();)e.shift();for(;e.length&&!e[e.length-1].trim();)e.pop();let i=Math.min(...e.filter(s=>s.trim()).map(s=>(s.match(/^(\s*)/)??["",""])[1].length));return e.map(s=>s.slice(i)).join(`
`)}getLang(){if(this.codeLang)return this.codeLang;let t=this.filename.split(".").pop()?.toLowerCase()??"";return["html","astro","svelte","vue"].includes(t)?"html":["js","ts","jsx","tsx","mjs","cjs"].includes(t)?"js":["css","scss"].includes(t)?"css":["sh","bash","zsh"].includes(t)?"sh":t==="json"?"json":t==="py"?"python":"text"}get totalChars(){return this.tokens.reduce((t,e)=>t+e.text.length,0)}typeHandle(){return{pause:()=>{this.typeLoop.stop(),this.cursorControls?.pause()},resume:()=>{this.typeLoop.start(),this.cursorControls?.play()},finish:()=>{this.stopTyping(),this.visibleChars=this.totalChars,this.typingNow=!1},cancel:()=>this.stopTyping()}}beginTyping(){this.typePhase="delay",this.phaseElapsed=0,this.visibleChars=0,this.typingNow=!0,this.typeLoop.start()}stopTyping(){this.typeLoop.stop(),this.resolveTyped=null}typeTick(t){if(this.phaseElapsed+=t,this.typePhase==="delay"){if(this.phaseElapsed<this.typingDelay*1e3)return;this.typePhase="typing",this.phaseElapsed=0;return}if(this.typePhase==="typing"){let e=this.totalChars,i=e/this.typingSpeed*1e3,s=Math.min(this.phaseElapsed/i,1);if(this.visibleChars=Math.floor(s*e),s<1)return;if(this.typingNow=!1,!this.typingLoop){this.typeLoop.stop(),this.resolveTyped?.(),this.resolveTyped=null;return}this.typePhase="gap",this.phaseElapsed=0;return}this.phaseElapsed>=this.typingHold*1e3&&(this.typePhase="delay",this.phaseElapsed=0,this.visibleChars=0,this.typingNow=!0)}renderPartial(){if(!this.typing||this.visibleChars<0)return this.highlighted;let t=this.visibleChars,e="";for(let i of this.tokens){if(t<=0)break;let s=t>=i.text.length?i.text:i.text.slice(0,t);e+=i.cls?`<span class="${i.cls}">${this.esc(s)}</span>`:this.esc(s),t-=i.text.length}return e}tokenize(t){let e=this.getLang();return e==="html"?this.tokenizeHtml(t):e==="js"?this.tokenizeJs(t):e==="css"?this.tokenizeCss(t):e==="json"?this.tokenizeJson(t):e==="python"?this.tokenizePython(t):e==="sh"?this.tokenizeSh(t):[{text:t}]}renderTokens(t){return t.map(e=>e.cls?`<span class="${e.cls}">${this.esc(e.text)}</span>`:this.esc(e.text)).join("")}esc(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}tokenizeHtml(t){let e=[],i=0;for(;i<t.length;){if(t.startsWith("<!--",i)){let r=t.indexOf("-->",i+4),o=r===-1?t.slice(i):t.slice(i,r+3);e.push({text:o,cls:"cw-comment"}),i+=o.length;continue}if(t[i]==="<"&&/[a-zA-Z/!?]/.test(t[i+1]??"")){let r=this.findTagEnd(t,i);e.push(...this.tokenizeHtmlTag(t.slice(i,r))),i=r;continue}let s=i+1;for(;s<t.length&&t[s]!=="<";)s++;e.push({text:t.slice(i,s)}),i=s}return e}findTagEnd(t,e){let i=e+1,s=null;for(;i<t.length;){let r=t[i];if(s)r===s&&(s=null);else if(r==='"'||r==="'")s=r;else if(r===">")return i+1;i++}return i}tokenizeHtmlTag(t){let e=[],i=0,s=t.match(/^(<\/?)((?:[a-zA-Z][a-zA-Z0-9-]*(?::[a-zA-Z][a-zA-Z0-9-]*)?)?)/);if(!s)return e.push({text:t,cls:"cw-tag"}),e;for(e.push({text:s[1]+s[2],cls:"cw-tag"}),i=s[1].length+s[2].length;i<t.length;){let r=t.slice(i),o=r.match(/^\s+/);if(o){e.push({text:o[0]}),i+=o[0].length;continue}if(r[0]===">"||r.startsWith("/>")){let h=r.startsWith("/>")?"/>":">";e.push({text:h,cls:"cw-tag"}),i+=h.length;continue}let n=r.match(/^[a-zA-Z_:@#.][a-zA-Z0-9_:\-.@#]*/);if(n){e.push({text:n[0],cls:"cw-attr"}),i+=n[0].length;continue}if(r[0]==="="){e.push({text:"="}),i++;continue}if(r[0]==='"'||r[0]==="'"){let h=r[0],p=r.indexOf(h,1),c=p===-1?r:r.slice(0,p+1);e.push({text:c,cls:"cw-string"}),i+=c.length;continue}if(r[0]==="{"){let h=r.indexOf("}"),p=h===-1?r:r.slice(0,h+1);e.push({text:p}),i+=p.length;continue}e.push({text:r[0]}),i++}return e}tokenizeJs(t){let e=new Set("import.export.from.default.as.const.let.var.function.class.extends.return.if.else.for.while.do.switch.case.break.continue.new.this.typeof.instanceof.in.of.async.await.try.catch.finally.throw.true.false.null.undefined.type.interface.enum.declare.abstract.readonly.keyof".split(".")),i=[],s=0;for(;s<t.length;){if(t[s]==="/"&&t[s+1]==="/"){let r=t.indexOf(`
`,s),o=r===-1?t.slice(s):t.slice(s,r);i.push({text:o,cls:"cw-comment"}),s+=o.length;continue}if(t[s]==="/"&&t[s+1]==="*"){let r=t.indexOf("*/",s+2),o=r===-1?t.slice(s):t.slice(s,r+2);i.push({text:o,cls:"cw-comment"}),s+=o.length;continue}if(t[s]==="`"){let r=s+1;for(;r<t.length&&t[r]!=="`";)t[r]==="\\"&&r++,r++;i.push({text:t.slice(s,r+1),cls:"cw-string"}),s=r+1;continue}if(t[s]==='"'||t[s]==="'"){let r=t[s],o=s+1;for(;o<t.length&&t[o]!==r&&t[o]!==`
`;)t[o]==="\\"&&o++,o++;i.push({text:t.slice(s,o+1),cls:"cw-string"}),s=o+1;continue}if(/\d/.test(t[s])&&(s===0||/[^a-zA-Z$_]/.test(t[s-1]))){let r=t.slice(s).match(/^\d+(\.\d+)?/);if(r){i.push({text:r[0],cls:"cw-num"}),s+=r[0].length;continue}}if(/[a-zA-Z_$]/.test(t[s])){let r=t.slice(s).match(/^[a-zA-Z_$][a-zA-Z0-9_$]*/);if(r){i.push({text:r[0],cls:e.has(r[0])?"cw-keyword":void 0}),s+=r[0].length;continue}}i.push({text:t[s]}),s++}return i}tokenizeCss(t){let e=[],i=0;for(;i<t.length;){if(t.startsWith("/*",i)){let s=t.indexOf("*/",i+2),r=s===-1?t.slice(i):t.slice(i,s+2);e.push({text:r,cls:"cw-comment"}),i+=r.length;continue}if(t[i]==='"'||t[i]==="'"){let s=t[i],r=i+1;for(;r<t.length&&t[r]!==s;)r++;e.push({text:t.slice(i,r+1),cls:"cw-string"}),i=r+1;continue}if(/\d/.test(t[i])&&(i===0||/[^a-zA-Z]/.test(t[i-1]))){let s=t.slice(i).match(/^\d+(\.\d+)?(px|em|rem|%|vh|vw|dvh|dvw|s|ms|deg|fr|ch|ex)?/);if(s){e.push({text:s[0],cls:"cw-num"}),i+=s[0].length;continue}}if(/[a-zA-Z-]/.test(t[i])){let s=t.slice(i).match(/^-?[a-zA-Z][a-zA-Z0-9-]*/);if(s){let r=t.slice(i+s[0].length).match(/^\s*(:)(?!:)/);e.push({text:s[0],cls:r?"cw-attr":"cw-tag"}),i+=s[0].length;continue}}e.push({text:t[i]}),i++}return e}tokenizeJson(t){let e=[],i=0;for(;i<t.length;){if(t[i]==='"'){let r=i+1;for(;r<t.length&&!(t[r]==='"'&&t[r-1]!=="\\");)r++;let o=t.slice(i,r+1),n=t.slice(r+1).match(/^\s*:/);e.push({text:o,cls:n?"cw-attr":"cw-string"}),i=r+1;continue}if(/[-\d]/.test(t[i])&&(i===0||/[^a-zA-Z]/.test(t[i-1]))){let r=t.slice(i).match(/^-?\d+(\.\d+)?([eE][+-]?\d+)?/);if(r){e.push({text:r[0],cls:"cw-num"}),i+=r[0].length;continue}}let s=t.slice(i).match(/^(true|false|null)/);if(s){e.push({text:s[0],cls:"cw-keyword"}),i+=s[0].length;continue}e.push({text:t[i]}),i++}return e}tokenizeSh(t){let e=[],i=0,s=!0;for(;i<t.length;){let r=t[i],o=i===0||t[i-1]===`
`;if(r===`
`){e.push({text:r}),s=!0,i++;continue}if(o&&(t.startsWith("$ ",i)||t.startsWith("> ",i))){e.push({text:t.slice(i,i+2),cls:"cw-comment"}),i+=2;continue}if(r==="#"&&(o||/\s/.test(t[i-1]))){let c=t.indexOf(`
`,i),d=c===-1?t.slice(i):t.slice(i,c);e.push({text:d,cls:"cw-comment"}),i+=d.length;continue}if(r==='"'||r==="'"){let c=i+1;for(;c<t.length&&t[c]!==r;)c+=t[c]==="\\"&&r==='"'?2:1;let d=t.slice(i,c+1);e.push({text:d,cls:"cw-string"}),i+=d.length,s=!1;continue}if(r==="$"&&/[{A-Za-z_]/.test(t[i+1]??"")){let c=/^\$(\{[^}\n]*\}?|[A-Za-z_][A-Za-z0-9_]*)/.exec(t.slice(i))[0];e.push({text:c,cls:"cw-num"}),i+=c.length,s=!1;continue}let n=/^(&&|\|\||&>>?|>>?&?|[|;&])/.exec(t.slice(i));if(n){e.push({text:n[0],cls:"cw-tag"}),i+=n[0].length,s=!n[0].includes(">");continue}if(/\s/.test(r)){e.push({text:r}),i++;continue}let h=/^[^\s|;&>'"]+/.exec(t.slice(i))?.[0]??r,p=s?"cw-keyword":h.startsWith("-")?"cw-attr":void 0;e.push(p?{text:h,cls:p}:{text:h}),i+=h.length,s=!1}return e}tokenizePython(t){let e=new Set("def.class.import.from.return.if.elif.else.for.while.with.as.try.except.finally.raise.yield.lambda.not.and.or.in.is.pass.break.continue.True.False.None.async.await.global.nonlocal.del.assert".split(".")),i=[],s=0;for(;s<t.length;){if(t[s]==="#"){let r=t.indexOf(`
`,s),o=r===-1?t.slice(s):t.slice(s,r);i.push({text:o,cls:"cw-comment"}),s+=o.length;continue}if(t.startsWith('"""',s)||t.startsWith("'''",s)){let r=t.slice(s,s+3),o=t.indexOf(r,s+3),n=o===-1?t.slice(s):t.slice(s,o+3);i.push({text:n,cls:"cw-string"}),s+=n.length;continue}if(t[s]==='"'||t[s]==="'"){let r=t[s],o=s+1;for(;o<t.length&&t[o]!==r&&t[o]!==`
`;)t[o]==="\\"&&o++,o++;i.push({text:t.slice(s,o+1),cls:"cw-string"}),s=o+1;continue}if(t[s]==="@"){let r=t.slice(s).match(/^@[a-zA-Z_][a-zA-Z0-9_.]*/);if(r){i.push({text:r[0],cls:"cw-attr"}),s+=r[0].length;continue}}if(/\d/.test(t[s])&&(s===0||/[^a-zA-Z_]/.test(t[s-1]))){let r=t.slice(s).match(/^\d+(\.\d+)?/);if(r){i.push({text:r[0],cls:"cw-num"}),s+=r[0].length;continue}}if(/[a-zA-Z_]/.test(t[s])){let r=t.slice(s).match(/^[a-zA-Z_][a-zA-Z0-9_]*/);if(r){i.push({text:r[0],cls:e.has(r[0])?"cw-keyword":void 0}),s+=r[0].length;continue}}i.push({text:t[s]}),s++}return i}async handleCopy(){await navigator.clipboard.writeText(this.raw||this.extractRaw()),this.copied=!0,setTimeout(()=>{this.copied=!1},1800)}copyIcon(){return this.copied?O`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="2 8 6 12 14 4"/>
      </svg>`:O`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="5" y="5" width="9" height="9" rx="2"/>
      <path d="M11 5V3a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>
    </svg>`}render(){return u`
      ${this.hideChrome?k:u` <div class="chrome">
            <span class="dot dot-red"></span>
            <span class="dot dot-yellow"></span>
            <span class="dot dot-green"></span>
            <span class="filename">${this.filename}</span>
            ${this.copy?u` <button
                  class="copy-btn ${this.copyLabel?"has-label":""}"
                  @click=${this.handleCopy}
                  aria-label=${this.copied?"Copied":"Copy"}
                >
                  ${this.copyIcon()}
                  ${this.copyLabel?u`<span>${this.copied?"Copied!":"Copy"}</span>`:k}
                </button>`:k}
          </div>`}
      <div class="body">
        <div class="code-area">
          ${this.typing?u`<pre class="sizer" aria-hidden="true">${vn(this.highlighted)}</pre>`:k}
          <pre>
${vn(this.renderPartial())}${this.typingNow?u`<span class="cursor"></span>`:k}</pre
          >
        </div>
      </div>
    `}};a([l({type:String})],ft.prototype,"filename",void 0),a([l({type:String,attribute:"code-lang"})],ft.prototype,"codeLang",void 0),a([l({type:Boolean,converter:y,attribute:"hide-chrome"})],ft.prototype,"hideChrome",void 0),a([l({type:Boolean,converter:y})],ft.prototype,"copy",void 0),a([l({type:Boolean,converter:y,attribute:"copy-label"})],ft.prototype,"copyLabel",void 0),a([l({type:Boolean,converter:y,reflect:!0})],ft.prototype,"compact",void 0),a([l({type:Boolean,converter:y})],ft.prototype,"typing",void 0),a([l({type:Number,attribute:"typing-speed"})],ft.prototype,"typingSpeed",void 0),a([l({type:Number,attribute:"typing-delay"})],ft.prototype,"typingDelay",void 0),a([l({type:Boolean,converter:y,attribute:"typing-loop"})],ft.prototype,"typingLoop",void 0),a([l({type:Number,attribute:"typing-hold"})],ft.prototype,"typingHold",void 0),a([D()],ft.prototype,"copied",void 0),a([D()],ft.prototype,"highlighted",void 0),a([D()],ft.prototype,"visibleChars",void 0),a([D()],ft.prototype,"typingNow",void 0),ft=a([x("motion-code")],ft);var Gr=1.05,bn={menu:{shapes:O`<line class="top" x1="4" y1="6" x2="20" y2="6" />
      <line class="mid" x1="4" y1="12" x2="20" y2="12" />
      <line class="bot" x1="4" y1="18" x2="20" y2="18" />`,off:{top:{y:0,rotate:0},mid:{opacity:1,scaleX:1},bot:{y:0,rotate:0}},on:{top:{y:6,rotate:45},mid:{opacity:0,scaleX:0},bot:{y:-6,rotate:-45}}},play:{shapes:O`<path class="tri" d="M7 4.5v15l12-7.5z" />
      <line class="bar1" x1="9" y1="5" x2="9" y2="19" />
      <line class="bar2" x1="15" y1="5" x2="15" y2="19" />`,off:{tri:{opacity:1,scale:1,rotate:0},bar1:{opacity:0,scaleY:0},bar2:{opacity:0,scaleY:0}},on:{tri:{opacity:0,scale:.5,rotate:90},bar1:{opacity:1,scaleY:1},bar2:{opacity:1,scaleY:1}}},copy:{shapes:O`<rect class="sheet" x="8" y="8" width="13" height="13" rx="2" />
      <path class="back" d="M4 15V5a1 1 0 0 1 1-1h10" />
      <path class="check dash" d="M5 12.5l4.5 4.5L19 7.5" pathLength="1" />`,off:{sheet:{opacity:1,scale:1},back:{opacity:1,scale:1},check:{strokeDashoffset:Gr}},on:{sheet:{opacity:0,scale:.7},back:{opacity:0,scale:.7},check:{strokeDashoffset:0}}},plus:{shapes:O`<line class="h" x1="5" y1="12" x2="19" y2="12" />
      <line class="v" x1="12" y1="5" x2="12" y2="19" />`,off:{v:{rotate:0}},on:{v:{rotate:90}}},chevron:{shapes:O`<path class="c" d="M6 9l6 6 6-6" />`,off:{c:{rotate:0}},on:{c:{rotate:180}}},heart:{shapes:O`<path
      class="h fill"
      d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
    />`,off:{h:{fillOpacity:0,scale:1}},on:{h:{fillOpacity:1,scale:[.7,1]}}},loading:{shapes:O`<circle class="track" cx="12" cy="12" r="9" opacity="0.2" />
      <g class="arc"><circle cx="12" cy="12" r="9" stroke="none" /><path d="M21 12a9 9 0 0 0-9-9" /></g>
      <circle class="ring dash" cx="12" cy="12" r="9" pathLength="1" />
      <path class="check dash" d="M8 12.5l3 3 5-6" pathLength="1" />`,off:{arc:{opacity:1},ring:{strokeDashoffset:Gr},check:{strokeDashoffset:Gr}},on:{arc:{opacity:0},ring:{strokeDashoffset:0},check:{strokeDashoffset:0}},spin:"arc"},eye:{shapes:O`<path
        class="lid"
        d="M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0"
      />
      <circle class="pupil" cx="12" cy="12" r="3" />
      <line class="slash dash" x1="3" y1="3" x2="21" y2="21" pathLength="1" />`,off:{pupil:{scale:1},slash:{strokeDashoffset:Gr}},on:{pupil:{scale:.7},slash:{strokeDashoffset:0}}}},Qt=class extends w{constructor(...t){super(...t),this.name="menu",this.active=!1,this.toggle=!1,this.label="",this.duration=.45,this.bounce=.3,this.spin=null,this.warned=!1,this.onClick=()=>{this.toggle&&this.flip()},this.onKey=e=>{!this.toggle||e.key!==" "&&e.key!=="Enter"||(e.preventDefault(),this.flip())}}static{this.styles=v`
    :host {
      display: inline-block;
      width: var(--mc-icon-size, 1.5em);
      height: var(--mc-icon-size, 1.5em);
      color: var(--mc-icon-color, inherit);
      line-height: 0;
      vertical-align: middle;
    }
    :host([active]) svg {
      color: var(--mc-icon-color-active, inherit);
    }
    :host([toggle]) {
      cursor: pointer;
      border-radius: 4px;
    }
    :host([toggle]:focus-visible) {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }
    svg {
      width: 100%;
      height: 100%;
      overflow: visible;
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    svg * {
      transform-box: fill-box;
      transform-origin: center;
    }
    .dash {
      stroke-dasharray: 1 2;
      stroke-dashoffset: 1.05;
    }
    .fill {
      fill: currentColor;
      fill-opacity: 0;
    }
  `}get reduced(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}connectedCallback(){super.connectedCallback(),Dn(this,()=>this.spin),this.addEventListener("click",this.onClick),this.addEventListener("keydown",this.onKey),this.hasUpdated&&this.updateSpin()}disconnectedCallback(){super.disconnectedCallback(),Vn(this),this.removeEventListener("click",this.onClick),this.removeEventListener("keydown",this.onKey),this.spin?.stop(),this.spin=null}updated(t){if((t.has("toggle")||t.has("label")||t.has("active"))&&this.applyRole(),t.has("name")||t.has("active")){let e=t.has("name")||t.get("active")===void 0;this.pose(e||this.reduced),this.updateSpin()}}applyRole(){this.toggle&&!this.label&&!this.warned&&(this.warned=!0,console.warn(`<motion-icon-state toggle> needs a label so screen readers announce what it does. Falling back to "${this.name}".`,this));let t=this.label||(this.toggle?this.name:"");this.toggle?(this.setAttribute("role","button"),this.setAttribute("aria-pressed",String(this.active)),this.hasAttribute("tabindex")||(this.tabIndex=0)):(this.removeAttribute("aria-pressed"),this.setAttribute("role",this.label?"img":"presentation")),t?(this.setAttribute("aria-label",t),this.removeAttribute("aria-hidden")):(this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}pose(t){let e=bn[this.name];if(!e)return;let i=this.active?e.on:e.off;for(let[s,r]of Object.entries(i)){let o=this.renderRoot.querySelector(`.${s}`);if(!o)continue;let n="strokeDashoffset"in r||"opacity"in r;f(o,t?Object.fromEntries(Object.entries(r).map(([h,p])=>[h,Array.isArray(p)?p[p.length-1]:p])):r,t?{duration:0}:{type:"spring",duration:this.duration,bounce:n?0:this.bounce})}}updateSpin(){let t=bn[this.name]?.spin,e=t?this.renderRoot.querySelector(`.${t}`):null,i=!!e&&!this.active&&!this.reduced;i&&!this.spin?(this.spin=f(e,{rotate:[0,360]},{duration:.9,repeat:1/0,ease:"linear"}),Bn(this)&&this.spin.pause()):!i&&this.spin&&(this.spin.stop(),this.spin=null)}flip(){this.active=!this.active,this.dispatchEvent(new CustomEvent("motion-change",{detail:{active:this.active},bubbles:!0,composed:!0}))}render(){let t=bn[this.name];return u`<svg viewBox="0 0 24 24" aria-hidden="true">${t?t.shapes:k}</svg>`}};a([l({type:String,reflect:!0})],Qt.prototype,"name",void 0),a([l({type:Boolean,converter:y,reflect:!0})],Qt.prototype,"active",void 0),a([l({type:Boolean,converter:y,reflect:!0})],Qt.prototype,"toggle",void 0),a([l({type:String})],Qt.prototype,"label",void 0),a([l({type:Number})],Qt.prototype,"duration",void 0),a([l({type:Number})],Qt.prototype,"bounce",void 0),Qt=a([x("motion-icon-state")],Qt);var Qi=class extends w{constructor(...t){super(...t),this.copy=!1,this.copyVisible=!1,this.copied=!1}static{this.styles=v`
    :host {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 0.3em;
      vertical-align: middle;
    }

    code {
      font-family: ui-monospace, 'Cascadia Code', 'Fira Code', monospace;
      font-size: 0.875em;
      color: var(--mc-color-accent, #2563eb);
      background: var(--mc-color-accent-dim, #2563eb18);
      padding: 0.15em 0.45em;
      border-radius: 5px;
      white-space: nowrap;
    }

    button {
      font: inherit;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: none;
      border: none;
      padding: 0.1em;
      cursor: pointer;
      color: var(--mc-color-muted, #60608a);
      border-radius: 4px;
      opacity: 0;
      transition:
        opacity 0.15s,
        color 0.15s;
      line-height: 1;
    }

    :host(:not([copy-visible])) button {
      position: absolute;
      left: 100%;
      margin-left: 0.2em;
    }

    :host(:hover) button,
    :host([copy-visible]) button,
    button:focus-visible {
      opacity: 1;
    }

    button:focus-visible {
      outline: 2px solid var(--mc-color-accent, #2563eb);
      outline-offset: 1px;
    }

    button:hover {
      color: var(--mc-color-accent, #2563eb);
    }

    motion-icon-state {
      --mc-icon-size: 1em;
      display: block;
    }
  `}async doCopy(){let t=this.textContent?.trim()??"";await navigator.clipboard.writeText(t),this.copied=!0,setTimeout(()=>{this.copied=!1},1800)}render(){return u`
      <code><slot></slot></code>
      ${this.copy||this.copyVisible?u`<button @click=${this.doCopy} aria-label=${this.copied?"Copied":"Copy"}>
            <motion-icon-state name="copy" .active=${this.copied}></motion-icon-state>
          </button>`:k}
    `}};a([l({type:Boolean,converter:y})],Qi.prototype,"copy",void 0),a([l({type:Boolean,converter:y,attribute:"copy-visible",reflect:!0})],Qi.prototype,"copyVisible",void 0),a([D()],Qi.prototype,"copied",void 0),Qi=a([x("motion-code-inline")],Qi);var te=class extends M(w){constructor(...t){super(...t),this.interval=.05,this.delay=0,this.hold=1.8,this.loop=!1,this.gap=.5,this.pauseOnHover=!1,this.cursor=!0,this.displayed="",this.full="",this.timer=null,this.index=0,this.observer=null,this.pendingStep=null,this.nextFireAt=0,this.remaining=0,this.resolveRun=null,this.blink=null,this.detachPauseOnHover=null,this.playback=new C(this,{start:()=>{this.index=0,this.displayed="";let e=this.loop?void 0:new Promise(i=>{this.resolveRun=i});return this.schedule(()=>this.type(),this.delay*1e3),{handle:{pause:()=>{this.timer&&clearTimeout(this.timer),this.timer=null,this.remaining=Math.max(0,this.nextFireAt-performance.now())},resume:()=>{this.pendingStep&&this.schedule(this.pendingStep,this.remaining)},finish:()=>{this.stopTimer(),this.applyTyped()},cancel:()=>this.stopTimer()},done:e}},applyFinalState:()=>this.applyTyped(),applyInitialState:()=>{this.index=0,this.displayed=""}})}static{this.styles=v`
    :host {
      display: inline;
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }

    .cursor {
      display: inline-block;
      width: 2px;
      height: 1.1em;
      background: currentColor;
      margin-left: 2px;
      vertical-align: text-bottom;
    }
  `}get reduced(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}connectedCallback(){if(this.full=this.textContent?.trim()||this.full,this.textContent="",super.connectedCallback(),this.reduced){this.displayed=this.full;return}this.observer=new IntersectionObserver(([t])=>{t.isIntersecting&&(this.observer?.disconnect(),this.playState==="idle"&&this.play())},{threshold:.2}),this.observer.observe(this),this.detachPauseOnHover=q(this,()=>this.loop&&this.pauseOnHover,()=>this.pause(),()=>this.play())}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect(),this.detachPauseOnHover?.(),this.detachPauseOnHover=null,this.stopTimer(),this.stopBlink()}updated(){let t=this.renderRoot.querySelector(".cursor");t?!this.blink&&!this.reduced&&(this.blink=f(t,{opacity:[1,0]},{duration:.5,repeat:1/0,repeatType:"reverse"})):this.stopBlink()}stopBlink(){this.blink?.stop(),this.blink=null}schedule(t,e){this.pendingStep=t,this.nextFireAt=performance.now()+e,this.timer=setTimeout(t,e)}stopTimer(){this.timer&&clearTimeout(this.timer),this.timer=null,this.pendingStep=null}applyTyped(){this.index=this.full.length+1,this.displayed=this.full,this.resolveRun=null}type(){if(this.index>this.full.length){this.loop?this.schedule(()=>this.erase(),this.hold*1e3):(this.stopTimer(),this.resolveRun?.(),this.resolveRun=null);return}this.displayed=this.full.slice(0,this.index),this.index++,this.schedule(()=>this.type(),this.interval*1e3)}erase(){if(this.index<=0){this.schedule(()=>this.type(),this.gap*1e3);return}this.index--,this.displayed=this.full.slice(0,this.index),this.schedule(()=>this.erase(),this.interval*500)}replay(){this.cancel(),this.play()}render(){return u`<span class="sr-only">${this.full}</span
      ><span aria-hidden="true"
        >${this.displayed}${this.cursor?u`<span class="cursor"></span>`:""}</span
      >`}};a([l({type:Number})],te.prototype,"interval",void 0),a([l({type:Number})],te.prototype,"delay",void 0),a([l({type:Number})],te.prototype,"hold",void 0),a([l({type:Boolean,converter:y})],te.prototype,"loop",void 0),a([l({type:Number})],te.prototype,"gap",void 0),a([l({type:Boolean,converter:y,attribute:"pause-on-hover"})],te.prototype,"pauseOnHover",void 0),a([l({type:Boolean,converter:y})],te.prototype,"cursor",void 0),a([D()],te.prototype,"displayed",void 0),te=a([x("motion-typewriter")],te);var Ct=class extends M(w){constructor(...t){super(...t),this.from=0,this.to=100,this.duration=1.5,this.decimals=0,this.prefix="",this.suffix="",this.once=!0,this.loop=!1,this.hold=1.6,this.gap=.5,this.pauseOnHover=!1,this.value=0,this.playback=new C(this,{start:()=>this.loop?{handle:this.cycle.start()}:this.count(),applyFinalState:()=>{this.cycle.stop(),this.value=this.to},applyInitialState:()=>{this.cycle.stop(),this.value=this.from}}),this.cycle=new ut({leg:e=>e?(this.value=this.from,null):this.count(),hold:()=>this.hold,gap:()=>this.gap}),this.viewport=new kt(this,{threshold:()=>.2,once:()=>this.once,loop:()=>this.loop}),this.detachPauseOnHover=null}static{this.styles=v`
    :host {
      display: inline;
      font-variant-numeric: tabular-nums;
    }
  `}count(){let t={value:this.from};return X(f(t,{value:this.to},{duration:this.duration,type:"spring",bounce:.05,onUpdate:()=>{this.value=t.value},onComplete:()=>{this.value=this.to}}))}connectedCallback(){super.connectedCallback(),this.value=this.from,this.viewport.arm(),this.detachPauseOnHover=q(this,()=>this.loop&&this.pauseOnHover,()=>this.pause(),()=>this.play())}disconnectedCallback(){super.disconnectedCallback(),this.viewport.disarm(),this.detachPauseOnHover?.(),this.detachPauseOnHover=null}replay(){this.viewport.reset(),this.cancel(),this.play()}render(){let t=this.value.toFixed(this.decimals);return u`${this.prefix}${t}${this.suffix}`}};a([l({type:Number})],Ct.prototype,"from",void 0),a([l({type:Number})],Ct.prototype,"to",void 0),a([l({type:Number})],Ct.prototype,"duration",void 0),a([l({type:Number})],Ct.prototype,"decimals",void 0),a([l({type:String})],Ct.prototype,"prefix",void 0),a([l({type:String})],Ct.prototype,"suffix",void 0),a([l({type:Boolean,converter:y})],Ct.prototype,"once",void 0),a([l({type:Boolean,converter:y})],Ct.prototype,"loop",void 0),a([l({type:Number})],Ct.prototype,"hold",void 0),a([l({type:Number})],Ct.prototype,"gap",void 0),a([l({type:Boolean,converter:y,attribute:"pause-on-hover"})],Ct.prototype,"pauseOnHover",void 0),a([D()],Ct.prototype,"value",void 0),Ct=a([x("motion-counter")],Ct);var jc="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&",Rt=class extends M(w){constructor(...t){super(...t),this.interval=.04,this.delay=0,this.iterations=2,this.once=!0,this.loop=!1,this.hold=1.6,this.gap=.5,this.pauseOnHover=!1,this.trigger="view",this.displayed="",this.full="",this.frame=0,this.iter=0,this.elapsed=0,this.ticker=je(e=>{this.elapsed+=e,!(this.elapsed<this.interval*1e3)&&(this.elapsed=0,this.scramble())}),this.resolveSettled=null,this.detachPauseOnHover=null,this.cycle=new ut({leg:e=>e?null:this.scrambleRun(),hold:()=>this.hold,gap:()=>this.gap,delay:()=>this.delay}),this.viewport=new kt(this,{threshold:()=>.2,once:()=>this.once,loop:()=>this.loop}),this.playback=new C(this,{start:()=>this.loop?{handle:this.cycle.start()}:oh(()=>this.delay,()=>this.scrambleRun()),applyFinalState:()=>{this.cycle.stop(),this.displayed=this.full},applyInitialState:()=>{this.cycle.stop(),this.displayed=this.full}}),this.begin=()=>{this.cancel(),this.play()}}static{this.styles=v`
    :host {
      display: inline;
      font-variant-numeric: tabular-nums;
    }
  `}scrambleRun(){this.frame=0,this.iter=0,this.elapsed=0;let t=new Promise(e=>{this.resolveSettled=e});return this.ticker.start(),{handle:{pause:()=>this.ticker.stop(),resume:()=>this.ticker.start(),finish:()=>this.settle(),cancel:()=>{this.ticker.stop(),this.resolveSettled=null}},done:t}}connectedCallback(){this.full=this.textContent?.trim()??"",this.displayed=this.full,this.textContent="",super.connectedCallback(),!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&(this.trigger==="hover"?this.addEventListener("pointerenter",this.begin):this.viewport.arm(),this.detachPauseOnHover=q(this,()=>this.loop&&this.pauseOnHover,()=>this.pause(),()=>this.play()))}disconnectedCallback(){super.disconnectedCallback(),this.viewport.disarm(),this.removeEventListener("pointerenter",this.begin),this.detachPauseOnHover?.(),this.detachPauseOnHover=null}settle(){this.ticker.stop(),this.resolveSettled?.(),this.resolveSettled=null,this.displayed=this.full}scramble(){let t=this.full.length,e=Math.floor(this.iter/this.iterations);this.displayed=this.full.split("").map((i,s)=>i===" "?" ":s<e?i:this.frame%3==0?jc[Math.floor(Math.random()*67)]:this.displayed[s]??i).join(""),this.frame++,this.iter++,e>=t&&this.settle()}replay(){this.viewport.reset(),this.begin()}render(){return u`${this.displayed}`}};a([l({type:Number})],Rt.prototype,"interval",void 0),a([l({type:Number})],Rt.prototype,"delay",void 0),a([l({type:Number})],Rt.prototype,"iterations",void 0),a([l({type:Boolean,converter:y})],Rt.prototype,"once",void 0),a([l({type:Boolean,converter:y})],Rt.prototype,"loop",void 0),a([l({type:Number})],Rt.prototype,"hold",void 0),a([l({type:Number})],Rt.prototype,"gap",void 0),a([l({type:Boolean,converter:y,attribute:"pause-on-hover"})],Rt.prototype,"pauseOnHover",void 0),a([l({type:String,reflect:!0})],Rt.prototype,"trigger",void 0),a([D()],Rt.prototype,"displayed",void 0),Rt=a([x("motion-scramble")],Rt);var xn=.05,nh=class extends M(Ei){constructor(...t){super(...t),this.ctrls=null,this.track=null,this.setA=null,this.targetRate=1,this.currentRate=1,this.rateRaf=null,this.waveRaf=null,this.wavePhase=0,this.itemLocalPositions=[],this.resizeObserver=null,this.originalItems=[],this.playback=new C(this,{start:()=>(this.startMarquee(),{handle:{pause:()=>{this.ctrls?.pause(),this.stopWave(),this.rateRaf!==null&&(cancelAnimationFrame(this.rateRaf),this.rateRaf=null)},resume:()=>{this.resumeCtrls(),this.wave&&this.startWave(),this.currentRate<1&&this.lerpRate(1)},finish:()=>{this.ctrls?.stop(),this.ctrls=null,this.stopWave(),this.rateRaf!==null&&(cancelAnimationFrame(this.rateRaf),this.rateRaf=null),this.rest()},cancel:()=>{this.ctrls?.stop(),this.ctrls=null,this.stopWave(),this.rateRaf!==null&&(cancelAnimationFrame(this.rateRaf),this.rateRaf=null)}}}),applyFinalState:()=>this.rest(),applyInitialState:()=>this.rest()}),this.hoverHeld=!1,this.selfPausing=!1,this.onEnter=()=>{this.playState==="running"&&(this.hoverHeld=!0,this.lerpRate(0))},this.onLeave=()=>{this.hoverHeld&&(this.hoverHeld=!1,!this.keyboardPaused&&(this.playState==="paused"&&this.play(),this.lerpRate(1)))},this.keyboardPaused=!1,this.onKeyDown=e=>{e.target!==this||e.key!==" "&&e.key!=="Enter"||(e.preventDefault(),this.keyboardPaused?(this.keyboardPaused=!1,this.playState==="paused"&&this.play(),this.lerpRate(1)):(this.keyboardPaused=!0,this.lerpRate(0)))}}static{this.observedAttributes=["speed","gap","direction","pause-on-hover","wave","wave-amplitude","wave-length"]}rest(){if(!this.track||!this.setA)return;let t=this.setA.offsetWidth+this.gap,e=this.direction==="left"?0:-t;this.track.style.transform=`translateX(${e}px)`,f(this.track,{x:e},{duration:0})}get speed(){return Number(this.getAttribute("speed")??60)}get gap(){return Number(this.getAttribute("gap")??32)}get direction(){return this.getAttribute("direction")??"left"}get pauseOnHover(){return ei(this,"pause-on-hover",!0)}get wave(){return ei(this,"wave",!1)}get waveAmplitude(){return Number(this.getAttribute("wave-amplitude")??10)}get waveLength(){return Number(this.getAttribute("wave-length")??300)}connectedCallback(){super.connectedCallback(),this.style.display="block",this.style.overflow=this.wave?"visible":"hidden",this.style.width="100%",!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&(this.setAttribute("tabindex","0"),this.setAttribute("role","region"),this.setAttribute("aria-label","Scrolling ticker. Press Space to pause."),requestAnimationFrame(()=>this.build()))}disconnectedCallback(){super.disconnectedCallback(),this.ctrls?.stop(),this.rateRaf!==null&&cancelAnimationFrame(this.rateRaf),this.stopWave(),this.resizeObserver?.disconnect(),this.removeEventListener("mouseenter",this.onEnter),this.removeEventListener("mouseleave",this.onLeave),this.removeEventListener("focus",this.onEnter),this.removeEventListener("blur",this.onLeave),this.removeEventListener("keydown",this.onKeyDown)}attributeChangedCallback(){this.rebuildMarquee()}build(){let t=Array.from(this.children);if(!t.length)return;this.originalItems=t;let e=wn("div",{display:"flex",alignItems:"center",width:"max-content",willChange:"transform"}),i=wn("div",{display:"flex",alignItems:"center",flexShrink:"0"}),s=wn("div",{display:"flex",alignItems:"center",flexShrink:"0"});s.setAttribute("aria-hidden","true"),s.inert=!0,t.forEach(r=>i.appendChild(r)),e.appendChild(i),e.appendChild(s),this.appendChild(e),this.track=e,this.setA=i,this.applyGap(),requestAnimationFrame(()=>{this.fillSet(t),this.play()}),this.resizeObserver?.disconnect(),this.resizeObserver=new ResizeObserver(()=>this.onResize()),this.resizeObserver.observe(this)}fillSet(t){if(!this.setA)return;let e=this.offsetWidth;if(!e)return;let i=50,s=!1;for(;this.setA.offsetWidth<e&&i-- >0;)t.forEach(o=>this.setA.appendChild(Kc(o))),s=!0;let r=this.setA.nextElementSibling;r&&(s||r.childElementCount!==this.setA.childElementCount)&&(r.replaceChildren(),Array.from(this.setA.children).forEach(o=>r.appendChild(o.cloneNode(!0))))}startMarquee(){if(!this.track||!this.setA)return;this.applyGap();let t=this.setA.offsetWidth+this.gap;if(!t){requestAnimationFrame(()=>this.startMarquee());return}this.ctrls?.stop(),this.currentRate=1,this.targetRate=1,this.ctrls=f(this.track,{x:this.direction==="left"?[0,-t]:[-t,0]},{duration:t/this.speed,repeat:1/0,ease:"linear"}),this.removeEventListener("mouseenter",this.onEnter),this.removeEventListener("mouseleave",this.onLeave),this.removeEventListener("focus",this.onEnter),this.removeEventListener("blur",this.onLeave),this.removeEventListener("keydown",this.onKeyDown),this.pauseOnHover&&(this.addEventListener("mouseenter",this.onEnter),this.addEventListener("mouseleave",this.onLeave)),this.addEventListener("focus",this.onEnter),this.addEventListener("blur",this.onLeave),this.addEventListener("keydown",this.onKeyDown),this.refreshWave()}refreshWave(){if(!this.setA)return;if(this.style.overflow=this.wave?"visible":"hidden",!this.wave){this.stopWave();return}let t=this.setA.getBoundingClientRect().left;this.itemLocalPositions=Array.from(this.setA.children).map(e=>{let i=e.getBoundingClientRect();return i.left+i.width/2-t}),this.playState==="running"&&this.startWave()}onResize(){this.rebuildMarquee()}applyGap(){if(!this.setA)return;let t=`${this.gap}px`;this.setA.style.columnGap=t,this.setA.style.marginRight=t;let e=this.setA.nextElementSibling;e&&(e.style.columnGap=t)}rebuildMarquee(){if(this.playState!=="running"&&this.playState!=="paused"||!this.ctrls||!this.setA||!this.track)return;this.applyGap(),this.fillSet(this.originalItems);let t=this.setA.offsetWidth+this.gap;if(!t)return;let e=this.renderedProgress(t);this.ctrls.stop();let i=t/this.speed;this.ctrls=f(this.track,{x:this.direction==="left"?[0,-t]:[-t,0]},{duration:i,repeat:1/0,ease:"linear"}),this.ctrls.duration,this.ctrls.speed=Math.max(this.currentRate,xn),this.playState==="paused"&&this.ctrls.pause(),this.ctrls.time=e*i,this.refreshWave()}renderedProgress(t){let e=getComputedStyle(this.track).transform;if(e==="none")return 0;let i=new DOMMatrix(e).m41;return((this.direction==="left"?-i/t:i/t+1)%1+1)%1}resumeCtrls(){if(!this.ctrls)return;let t=this.ctrls.time;this.currentRate=Math.max(this.currentRate,xn),this.ctrls.speed=this.currentRate,this.ctrls.play(),this.ctrls.time=t}lerpRate(t){if(this.targetRate=t,this.rateRaf!==null)return;let e=()=>{if(!this.ctrls){this.rateRaf=null;return}let i=this.targetRate-this.currentRate;if(this.targetRate===0&&this.currentRate<=xn||Math.abs(i)<.003){this.rateRaf=null,this.targetRate===0?(this.currentRate=0,this.selfPausing=!0,this.pause(),this.selfPausing=!1):(this.currentRate=this.targetRate,this.ctrls.speed=this.currentRate);return}this.currentRate+=i*.1,this.ctrls.speed=this.currentRate,this.rateRaf=requestAnimationFrame(e)};this.rateRaf=requestAnimationFrame(e)}pause(){this.selfPausing||(this.hoverHeld=!1),super.pause()}startWave(){this.stopWave();let t=this.waveAmplitude,e=this.waveLength,i=this.speed/e*Math.PI*2*(this.direction==="right"?-1:1),s=(this.setA?.offsetWidth??0)+this.gap,r=null,o=n=>{this.track&&(r!==null&&(this.wavePhase+=i*((n-r)/1e3)),r=n,Array.from(this.track.children).forEach((h,p)=>{let c=p*s;Array.from(h.children).forEach((d,m)=>{let g=(this.itemLocalPositions[m]??0)+c;d.style.transform=`translateY(${t*Math.sin(g/e*Math.PI*2-this.wavePhase)}px)`})}),this.waveRaf=requestAnimationFrame(o))};this.waveRaf=requestAnimationFrame(o)}stopWave(){this.waveRaf!==null&&(cancelAnimationFrame(this.waveRaf),this.waveRaf=null),this.track&&Array.from(this.track.children).forEach(t=>Array.from(t.children).forEach(e=>e.style.transform=""))}};function wn(t,e={}){let i=document.createElement(t);return Object.assign(i.style,e),i}function Kc(t){let e=t.cloneNode(!0);return e.setAttribute("aria-hidden","true"),e.inert=!0,e}ye("motion-ticker",nh);var ah=t=>t.split(/,(?![^(]*\))/).map(e=>e.trim()).filter(Boolean),Ai=class extends M(w){constructor(...t){super(...t),this.words="",this.colors="",this.interval=2,this.index=0,this.wordList=[],this.colorList=[],this.timer=null,this.busy=!1,this.nextFireAt=0,this.remaining=0,this.cycleToken=0,this.active=[],this.playback=new C(this,{start:()=>(this.schedule(this.interval*1e3),{handle:{pause:()=>{this.holdTimer();for(let e of this.active)e.pause()},resume:()=>{for(let e of this.active)e.play();this.schedule(this.remaining)},finish:()=>this.settle("complete"),cancel:()=>this.settle("cancel")}}),applyFinalState:()=>this.applyRest(),applyInitialState:()=>{this.index=0,this.applyRest()},runsUnderReducedMotion:!0})}static{this.styles=v`
    :host {
      display: inline-block;
      overflow: hidden;
      vertical-align: bottom;
      font-size: inherit;
      font-weight: inherit;
      font-family: inherit;
      font-style: inherit;
      letter-spacing: inherit;
      line-height: inherit;
    }

    .word {
      display: inline-block;
      white-space: nowrap;
      will-change: transform, opacity, filter;
      font-size: inherit;
      font-weight: inherit;
      font-family: inherit;
      font-style: inherit;
      letter-spacing: inherit;
      line-height: inherit;
    }
  `}get reduced(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}connectedCallback(){super.connectedCallback(),this.parseLists(),this.start()}willUpdate(t){(t.has("words")||t.has("colors"))&&this.parseLists()}updated(t){t.get("words")!==void 0&&(this.stopTimer(),this.cancel(),this.start())}parseLists(){this.wordList=ah(this.words),this.colorList=ah(this.colors)}start(){this.index=0,!(this.wordList.length<2)&&this.play()}disconnectedCallback(){super.disconnectedCallback(),this.stopTimer()}schedule(t){this.nextFireAt=performance.now()+t,this.timer=setTimeout(()=>{this.cycle(),this.schedule(this.interval*1e3)},t)}stopTimer(){this.timer&&clearTimeout(this.timer),this.timer=null}holdTimer(){this.remaining=Math.max(0,this.nextFireAt-performance.now()),this.stopTimer()}settle(t){this.cycleToken++,this.stopTimer();for(let e of this.active)e[t]();this.active=[],t==="complete"?this.applyRest():this.busy=!1}applyRest(){this.busy=!1,this.style.width="";let t=this.shadowRoot?.querySelector(".word");t&&(t.style.transform="",t.style.opacity="",t.style.filter="")}cycle(){if(this.busy)return;let t=this.shadowRoot?.querySelector(".word");if(!t)return;let e=(this.index+1)%this.wordList.length;if(this.reduced){this.index=e;return}this.busy=!0;let i=this.cycleToken,s=this.offsetWidth;this.style.width=`${s}px`;let r=f(t,{y:-16,opacity:0,filter:"blur(8px)"},{type:"spring",stiffness:400,damping:30});this.active=[r],r.then(()=>{i===this.cycleToken&&(this.index=e,this.updateComplete.then(()=>{if(i!==this.cycleToken)return;let o=this.shadowRoot?.querySelector(".word");if(!o)return;let n=o.offsetWidth,h=f(this,{width:[`${s}px`,`${n}px`]},{type:"spring",stiffness:300,damping:32});o.style.transform="translateY(16px)",o.style.opacity="0",o.style.filter="blur(8px)";let p=f(o,{y:[16,0],opacity:[0,1],filter:["blur(8px)","blur(0px)"]},{type:"spring",stiffness:320,damping:40});this.active=[h,p],this.playState==="paused"&&(h.pause(),p.pause()),p.then(()=>{i===this.cycleToken&&(this.active=[],this.busy=!1)})}))})}render(){let t=this.wordList[this.index]??"";return u`<span class="word" style="color:${this.colorList[this.index]||"currentColor"}">${t}</span>`}};a([l({type:String})],Ai.prototype,"words",void 0),a([l({type:String})],Ai.prototype,"colors",void 0),a([l({type:Number})],Ai.prototype,"interval",void 0),a([D()],Ai.prototype,"index",void 0),Ai=a([x("motion-words")],Ai);var Yr=(t,e)=>t.split(/(\s+)/).filter(Boolean).map(i=>/^\s+$/.test(i)?" ":Xi(i).map(s=>u`<span class="word">${[...s].map(e)}</span>`));var Nt=class extends M(w){constructor(...t){super(...t),this.amplitude=24,this.waveLength=280,this.waveDuration=2.5,this.loop=!1,this.loopSpeed=80,this.loopGap=48,this.noPad=!1,this.pauseOnHover=!1,this.numSets=2,this.xPositions=[],this.waveLoop=null,this.loopControls=null,this.playback=new C(this,{start:()=>(this.waveLoop=je(e=>this.tick(e/1e3)),this.waveLoop.start(),this.loop&&this.setupLoopControls(),{handle:{pause:()=>{this.waveLoop?.stop(),this.loopControls?.pause()},resume:()=>{this.waveLoop?.start(),this.loopControls?.play()},finish:()=>{this.waveLoop?.stop(),this.waveLoop=null,this.loopControls?.complete()},cancel:()=>{this.waveLoop?.stop(),this.waveLoop=null,this.loopControls?.stop(),this.loopControls=null,this.phase=0}}}),applyFinalState:()=>{},applyInitialState:()=>{this.phase=0}}),this.phase=0,this.detachHover=null}static{this.styles=v`
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }
    :host {
      display: inline-block;
      font-size: inherit;
      font-weight: inherit;
      font-family: inherit;
      font-style: inherit;
      letter-spacing: inherit;
      line-height: inherit;
    }

    :host([loop]) {
      display: block;
      width: 100%;
    }

    .track {
      display: inline-flex;
      will-change: transform;
    }

    .set {
      display: inline-flex;
      flex-shrink: 0;
    }

    .word {
      display: inline-block;
      white-space: nowrap;
    }
    .char {
      display: inline-block;
      will-change: transform;
      white-space: pre;
    }
  `}connectedCallback(){this.text||=this.textContent?.trim()??"",this.textContent="",super.connectedCallback(),this.detachHover=q(this,()=>this.pauseOnHover,()=>this.pause(),()=>{this.play()})}disconnectedCallback(){super.disconnectedCallback(),this.detachHover?.(),this.detachHover=null}updated(t){(t.has("text")||t.has("loop")||t.has("loopSpeed")||t.has("waveDuration")||t.has("amplitude")||t.has("waveLength")||t.has("loopGap")||t.has("noPad")||t.has("numSets"))&&this.setup()}setup(){if(this.cancel(),this.style.paddingTop=this.noPad?"0":`${this.amplitude}px`,this.style.paddingBottom=this.noPad?"0":`${this.amplitude}px`,!this.loop){let t=Array.from(this.shadowRoot.querySelectorAll(".char")),e=t[0]?.offsetLeft??0;this.xPositions=t.map(i=>i.offsetLeft-e)}this.play()}tick(t){this.waveDuration>0&&(this.phase+=2*Math.PI*t/this.waveDuration);let e=Array.from(this.shadowRoot.querySelectorAll(".char")),i=this.amplitude,s=2*Math.PI/this.waveLength;if(this.loop){let r=this.getBoundingClientRect().left,o=e.map(n=>{let h=n.getBoundingClientRect();return h.left+h.width/2-r});e.forEach((n,h)=>{let p=s*o[h]-this.phase;n.style.transform=`translateY(${i*Math.sin(p)}px) rotate(${Math.atan(i*s*Math.cos(p))*(180/Math.PI)}deg)`})}else e.forEach((r,o)=>{let n=s*(this.xPositions[o]??0)-this.phase;r.style.transform=`translateY(${i*Math.sin(n)}px) rotate(${Math.atan(i*s*Math.cos(n))*(180/Math.PI)}deg)`})}setupLoopControls(){if(this.loopControls?.stop(),this.loopControls=null,window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;let t=this.shadowRoot.querySelector(".track");if(!t)return;let e=this.shadowRoot.querySelector(".set");if(!e)return;let i=e.offsetWidth;if(!i)return;let s=i+this.loopGap,r=Math.max(2,Math.ceil(this.offsetWidth/s)+1);if(r!==this.numSets){this.numSets=r;return}this.loopControls=f(t,{x:[0,-s]},{duration:s/this.loopSpeed,repeat:1/0,ease:"linear"})}render(){let t=()=>[...this.text??""].map(e=>u`<span class="char">${e===" "?"\xA0":e}</span>`);return this.loop?u`
        <span class="sr-only">${this.text}</span>
        <span class="track" aria-hidden="true">
          ${Array.from({length:this.numSets},(e,i)=>u`<span class="set" style="margin-right:${this.loopGap}px" data-set=${i}
                >${t()}</span
              >`)}
        </span>
      `:u`<span class="sr-only">${this.text}</span
      ><span aria-hidden="true"
        >${Yr(this.text??"",e=>u`<span class="char">${e}</span>`)}</span
      >`}};a([l({type:String})],Nt.prototype,"text",void 0),a([l({type:Number})],Nt.prototype,"amplitude",void 0),a([l({type:Number,attribute:"wave-length"})],Nt.prototype,"waveLength",void 0),a([l({type:Number,attribute:"wave-duration"})],Nt.prototype,"waveDuration",void 0),a([l({type:Boolean,converter:y,reflect:!0})],Nt.prototype,"loop",void 0),a([l({type:Number,attribute:"loop-speed"})],Nt.prototype,"loopSpeed",void 0),a([l({type:Number,attribute:"loop-gap"})],Nt.prototype,"loopGap",void 0),a([l({type:Boolean,converter:y,attribute:"no-pad"})],Nt.prototype,"noPad",void 0),a([l({type:Boolean,converter:y,attribute:"pause-on-hover"})],Nt.prototype,"pauseOnHover",void 0),a([D()],Nt.prototype,"numSets",void 0),Nt=a([x("motion-curve")],Nt);var Te=class extends M(w){constructor(...t){super(...t),this.radius=80,this.duration=8,this.direction="cw",this.upright=!1,this.pauseOnHover=!1,this.playback=new C(this,{start:()=>this.startRun(),applyFinalState:()=>this.resetRing(),applyInitialState:()=>this.resetRing()}),this.detachHover=null}static{this.styles=v`
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }
    :host {
      display: inline-block;
      font-size: inherit;
      font-weight: inherit;
      font-family: inherit;
      font-style: inherit;
      letter-spacing: inherit;
      line-height: 1;
    }

    .container {
      position: relative;
    }

    .ring {
      position: absolute;
      inset: 0;
      will-change: transform;
    }

    .center {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .char {
      position: absolute;
      top: 50%;
      left: 50%;
      display: inline-block;
      white-space: pre;
    }
  `}connectedCallback(){super.connectedCallback(),this.detachHover=q(this,()=>this.pauseOnHover,()=>this.pause(),()=>{this.play()})}disconnectedCallback(){super.disconnectedCallback(),this.detachHover?.(),this.detachHover=null}updated(t){(t.has("text")||t.has("radius")||t.has("duration")||t.has("direction")||t.has("upright"))&&this.restart()}restart(){this.playback.teardown(),this.play()}startRun(){let t=this.shadowRoot?.querySelector(".ring");if(!t)return{handle:{pause:()=>{},resume:()=>{},finish:()=>{},cancel:()=>{}},done:Promise.resolve()};let e=f(t,{rotate:[0,this.direction==="ccw"?-360:360]},{duration:this.duration,repeat:1/0,ease:"linear"});return{handle:{pause:()=>e.pause(),resume:()=>e.play(),finish:()=>e.complete(),cancel:()=>e.cancel()}}}resetRing(){let t=this.shadowRoot?.querySelector(".ring");t&&(t.style.transform="")}render(){let t=[...this.text??""],e=t.length,i=this.radius*2;return u`
      <span class="sr-only">${this.text}</span>
      <div class="container" style="width:${i}px;height:${i}px">
        <div class="ring" aria-hidden="true">
          ${t.map((s,r)=>{let o=360/e*r-90,n=this.upright?` rotate(${-o}deg)`:"";return u`<span class="char" style="transform:${`translate(-50%,-50%) rotate(${o}deg) translateY(${-this.radius}px)${n}`}"
              >${s===" "?"\xA0":s}</span
            >`})}
        </div>
        <div class="center"><slot></slot></div>
      </div>
    `}};a([l({type:String})],Te.prototype,"text",void 0),a([l({type:Number})],Te.prototype,"radius",void 0),a([l({type:Number})],Te.prototype,"duration",void 0),a([l({type:String})],Te.prototype,"direction",void 0),a([l({type:Boolean,converter:y})],Te.prototype,"upright",void 0),a([l({type:Boolean,converter:y,attribute:"pause-on-hover"})],Te.prototype,"pauseOnHover",void 0),Te=a([x("motion-circle")],Te);var lh={pause(){},resume(){},finish(){},cancel(){}},ee=class extends M(w){constructor(...t){super(...t),this.radius=100,this.arc=180,this.align="top",this.duration=0,this.direction="cw",this.upright=!1,this.pauseOnHover=!1,this.playback=new C(this,{start:()=>{if(this.duration<=0)return{handle:lh,done:Promise.resolve()};let e=this.shadowRoot?.querySelector(".ring");return e?X(f(e,{rotate:[0,this.direction==="ccw"?-360:360]},{duration:this.duration,repeat:1/0,ease:"linear"})):{handle:lh}},applyFinalState:()=>{let e=this.shadowRoot?.querySelector(".ring");e&&(e.style.rotate=this.direction==="ccw"?"-360deg":"360deg")},applyInitialState:()=>{let e=this.shadowRoot?.querySelector(".ring");e&&(e.style.rotate="")}}),this.detachHover=null}static{this.styles=v`
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }
    :host {
      display: inline-block;
      font-size: inherit;
      font-weight: inherit;
      font-family: inherit;
      font-style: inherit;
      letter-spacing: inherit;
      line-height: 1;
    }

    .container {
      position: relative;
    }

    .ring {
      position: absolute;
      inset: 0;
      will-change: transform;
    }

    .center {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .char {
      position: absolute;
      top: 50%;
      left: 50%;
      display: inline-block;
      white-space: pre;
    }
  `}connectedCallback(){super.connectedCallback(),this.detachHover=q(this,()=>this.pauseOnHover,()=>this.pause(),()=>{this.play()})}disconnectedCallback(){super.disconnectedCallback(),this.detachHover?.(),this.detachHover=null}updated(t){(t.has("text")||t.has("radius")||t.has("arc")||t.has("align")||t.has("duration")||t.has("direction")||t.has("upright"))&&(this.cancel(),this.play())}render(){let t=[...this.text??""],e=t.length,i=this.radius*2,s=this.align==="bottom",r=e>1?this.arc/(e-1):0,o=s?this.arc/2:-this.arc/2,n=s?this.radius:-this.radius;return u`
      <span class="sr-only">${this.text}</span>
      <div class="container" style="width:${i}px;height:${i}px">
        <div class="ring" aria-hidden="true">
          ${t.map((h,p)=>{let c=e>1?o+(s?-p:p)*r:0;return u`<span class="char" style="transform:${`translate(-50%,-50%) rotate(${c}deg) translateY(${n}px)${this.upright?` rotate(${-c}deg)`:""}`}"
              >${h===" "?"\xA0":h}</span
            >`})}
        </div>
        <div class="center"><slot></slot></div>
      </div>
    `}};a([l({type:String})],ee.prototype,"text",void 0),a([l({type:Number})],ee.prototype,"radius",void 0),a([l({type:Number})],ee.prototype,"arc",void 0),a([l({type:String})],ee.prototype,"align",void 0),a([l({type:Number})],ee.prototype,"duration",void 0),a([l({type:String})],ee.prototype,"direction",void 0),a([l({type:Boolean,converter:y})],ee.prototype,"upright",void 0),a([l({type:Boolean,converter:y,attribute:"pause-on-hover"})],ee.prototype,"pauseOnHover",void 0),ee=a([x("motion-arc")],ee);var Le=class extends M(w){constructor(...t){super(...t),this.depth=.65,this.vanish="left",this.loop=!1,this.duration=3,this.pauseOnHover=!1,this.ticker=null,this.phase=0,this.playback=new C(this,{start:()=>(this.ticker=je(e=>this.tick(e/1e3)),this.ticker.start(),{handle:{pause:()=>this.ticker?.stop(),resume:()=>this.ticker?.start(),finish:()=>{this.ticker?.stop(),this.ticker=null,this.applyNeutral()},cancel:()=>{this.ticker?.stop(),this.ticker=null}}}),applyFinalState:()=>this.applyNeutral(),applyInitialState:()=>{this.phase=0,this.applyNeutral()}}),this.detachHover=null}static get observedAttributes(){return[...super.observedAttributes,"oscillate"]}attributeChangedCallback(t,e,i){super.attributeChangedCallback(t,e,i),t==="oscillate"&&(this.loop=Js(i))}static{this.styles=v`
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }
    :host {
      display: inline-block;
      font-size: inherit;
      font-weight: inherit;
      font-family: inherit;
      font-style: inherit;
      letter-spacing: inherit;
      line-height: 1;
    }

    .track {
      display: inline-flex;
      align-items: flex-end;
    }

    .char {
      display: inline-block;
      white-space: pre;
      line-height: 1;
    }
  `}connectedCallback(){this.text||=this.textContent?.trim()??"",this.textContent="",super.connectedCallback(),this.detachHover=q(this,()=>this.pauseOnHover,()=>this.pause(),()=>{this.play()})}disconnectedCallback(){super.disconnectedCallback(),this.detachHover?.(),this.detachHover=null}updated(t){(t.has("text")||t.has("depth")||t.has("vanish")||t.has("loop")||t.has("duration"))&&this.setup()}setup(){if(this.cancel(),!this.loop){this.applyStatic();return}if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){this.applyStatic();return}this.play()}applyStatic(){let t=Array.from(this.shadowRoot.querySelectorAll(".char")),e=t.length;t.forEach((i,s)=>{let r=s/Math.max(e-1,1),o=this.vanish==="left"?r:1-r;i.style.fontSize=`${1-this.depth*(1-o)}em`,i.style.opacity=String(1-(1-o)*this.depth*.45)})}applyNeutral(){for(let t of this.shadowRoot?.querySelectorAll(".char")??[])t.style.fontSize="",t.style.opacity=""}tick(t){this.duration>0&&(this.phase+=t/this.duration);let e=Array.from(this.shadowRoot.querySelectorAll(".char")),i=e.length;e.forEach((s,r)=>{let o=r/Math.max(i-1,1),n=(Math.cos(this.phase*Math.PI*2+o*Math.PI)+1)/2;s.style.fontSize=`${1-this.depth*(1-n)}em`,s.style.opacity=String(1-(1-n)*this.depth*.45)})}render(){return u`
      <span class="sr-only">${this.text}</span>
      <span class="track" aria-hidden="true">
        ${[...this.text??""].map(t=>u`<span class="char">${t===" "?"\xA0":t}</span>`)}
      </span>
    `}};a([l({type:String})],Le.prototype,"text",void 0),a([l({type:Number})],Le.prototype,"depth",void 0),a([l({type:String})],Le.prototype,"vanish",void 0),a([l({type:Boolean,converter:y,attribute:"loop"})],Le.prototype,"loop",void 0),a([l({type:Number})],Le.prototype,"duration",void 0),a([l({type:Boolean,converter:y,attribute:"pause-on-hover"})],Le.prototype,"pauseOnHover",void 0),Le=a([x("motion-perspective")],Le);var Ge=class extends w{constructor(...t){super(...t),this.spread=12,this.duration=.77,this.bounce=.55,this.disabled=!1,this.controls=[],this.onEnter=()=>{if(this.disabled||this.reduced)return;this.stopAll();let e=Array.from(this.shadowRoot.querySelectorAll(".char")),i=e.length,s={type:"spring",duration:this.duration,bounce:this.bounce};this.controls=e.map((r,o)=>f(r,{x:(i>1?o/(i-1)-.5:0)*this.spread*2},s))},this.onLeave=()=>{this.stopAll();let e=Array.from(this.shadowRoot.querySelectorAll(".char"));if(this.reduced){e.forEach(s=>f(s,{x:0},{duration:0}));return}let i={type:"spring",duration:this.duration,bounce:this.bounce};this.controls=e.map(s=>f(s,{x:0},i))}}static{this.styles=v`
    :host {
      display: inline-block;
      font-size: inherit;
      font-weight: inherit;
      font-family: inherit;
      font-style: inherit;
      line-height: inherit;
      cursor: default;
    }

    .track {
      display: inline-flex;
    }

    .char {
      display: inline-block;
      white-space: pre;
      will-change: transform;
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `}get reduced(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}connectedCallback(){this.text||=this.textContent?.trim()??"",this.textContent="",super.connectedCallback(),re(this),this.addEventListener("mouseenter",this.onEnter),this.addEventListener("mouseleave",this.onLeave)}disconnectedCallback(){super.disconnectedCallback(),oe(this),this.stopAll(),this.removeEventListener("mouseenter",this.onEnter),this.removeEventListener("mouseleave",this.onLeave)}stopAll(){this.controls.forEach(t=>t.stop()),this.controls=[]}updated(t){t.get("disabled")===!1&&this.disabled&&this.onLeave()}render(){return u`
      <span class="sr-only">${this.text}</span>
      <span class="track" aria-hidden="true">
        ${[...this.text??""].map(t=>u`<span class="char">${t===" "?"\xA0":t}</span>`)}
      </span>
    `}};a([l({type:String})],Ge.prototype,"text",void 0),a([l({type:Number})],Ge.prototype,"spread",void 0),a([l({type:Number})],Ge.prototype,"duration",void 0),a([l({type:Number})],Ge.prototype,"bounce",void 0),a([l({type:Boolean,converter:y,reflect:!0})],Ge.prototype,"disabled",void 0),Ge=a([x("motion-stretch")],Ge);var _e=class extends M(w){constructor(...t){super(...t),this.intensity=10,this.duration=4.5,this.pauseOnHover=!1,this.resizeObserver=null,this.playback=new C(this,{start:()=>(this.svgEl?.unpauseAnimations(),{handle:{pause:()=>this.svgEl?.pauseAnimations(),resume:()=>this.svgEl?.unpauseAnimations(),finish:()=>this.still(),cancel:()=>this.still()}}),applyFinalState:()=>this.still(),applyInitialState:()=>this.still()}),this.detachHover=null}static{this.styles=v`
    :host {
      display: inline-block;
      font-size: inherit;
      font-weight: inherit;
      font-family: inherit;
      font-style: inherit;
      letter-spacing: inherit;
      line-height: inherit;
    }

    svg {
      display: inline-block;
      overflow: visible;
      vertical-align: baseline;
    }

    text {
      fill: currentColor;
    }
  `}still(){this.svgEl?.pauseAnimations(),this.svgEl?.setCurrentTime(0)}connectedCallback(){this.text||=this.textContent?.trim()??"",this.textContent="",super.connectedCallback(),this.detachHover=q(this,()=>this.pauseOnHover,()=>this.pause(),()=>{this.play()}),typeof ResizeObserver<"u"&&(this.resizeObserver=new ResizeObserver(()=>this.fit()),this.resizeObserver.observe(this)),this.hasUpdated&&this.shouldAnimate&&this.play()}disconnectedCallback(){super.disconnectedCallback(),this.detachHover?.(),this.detachHover=null,this.resizeObserver?.disconnect(),this.resizeObserver=null}firstUpdated(){"fonts"in document&&document.fonts.ready.then(()=>this.fit()),this.shouldAnimate&&this.play()}updated(t){t.has("text")&&this.fit()}fit(){let t=this.svgEl,e=this.textEl;if(!t||!e)return;if(!this.text)return this.resetFit(t);let i;try{i=e.getBBox()}catch{return}if(!i.width||!i.height)return this.resetFit(t);t.setAttribute("viewBox",`${i.x} ${i.y} ${i.width} ${i.height}`),t.setAttribute("width",String(i.width)),t.setAttribute("height",String(i.height)),t.style.verticalAlign=`${-(i.y+i.height)}px`}resetFit(t){t.removeAttribute("viewBox"),t.setAttribute("width","0"),t.setAttribute("height","0"),t.style.verticalAlign=""}get shouldAnimate(){return!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&this.duration>0}render(){let t=this.shouldAnimate,e=`${this.duration.toFixed(3)}s`,i=`${(this.duration*.582).toFixed(3)}s`,s=(this.intensity*.3).toFixed(3),r=this.intensity.toFixed(3);return u`
      <svg role="img" aria-label=${this.text} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="liquid-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.018 0.018"
              numOctaves="3"
              seed="2"
              result="noise"
            >
              ${t?O`<animate
                    attributeName="baseFrequency"
                    dur=${e}
                    values="0.018 0.018; 0.027 0.012; 0.012 0.027; 0.018 0.018"
                    repeatCount="indefinite"
                    calcMode="spline"
                    keyTimes="0; 0.33; 0.66; 1"
                    keySplines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1"
                  />`:k}
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale=${this.intensity}
              xChannelSelector="R"
              yChannelSelector="G"
            >
              ${t?O`<animate
                    attributeName="scale"
                    dur=${i}
                    values="${s}; ${r}; ${s}"
                    repeatCount="indefinite"
                    calcMode="spline"
                    keyTimes="0; 0.5; 1"
                    keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
                  />`:k}
            </feDisplacementMap>
          </filter>
        </defs>
        <text x="0" y="0" filter=${t?"url(#liquid-filter)":k}>${this.text}</text>
      </svg>
    `}};a([l({type:String})],_e.prototype,"text",void 0),a([l({type:Number})],_e.prototype,"intensity",void 0),a([l({type:Number})],_e.prototype,"duration",void 0),a([l({type:Boolean,converter:y,attribute:"pause-on-hover"})],_e.prototype,"pauseOnHover",void 0),a([at("svg")],_e.prototype,"svgEl",void 0),a([at("text")],_e.prototype,"textEl",void 0),_e=a([x("motion-liquid")],_e);var ce=class extends M(w){constructor(...t){super(...t),this.height=60,this.interval=.05,this.duration=.6,this.bounce=.45,this.delay=0,this.trigger="mount",this.seen=!1,this.disarm=null,this.playback=new C(this,{start:()=>{let e=Array.from(this.shadowRoot.querySelectorAll(".char"));return e.length?X(f(e,{y:[-this.height,0],opacity:[0,1]},{delay:Lt(this.interval,{startDelay:this.delay}),duration:this.duration,type:"spring",bounce:this.bounce})):{handle:{pause(){},resume(){},finish(){},cancel(){}},done:Promise.resolve()}},applyFinalState:()=>{let e=this.shadowRoot?.querySelectorAll(".char");if(e)for(let i of e)i.style.opacity="1",i.style.transform=""},applyInitialState:()=>this.hide()})}static{this.styles=v`
    :host {
      display: inline-block;
      font-size: inherit;
      font-weight: inherit;
      font-family: inherit;
      font-style: inherit;
      letter-spacing: inherit;
      line-height: inherit;
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }
    .word {
      display: inline-block;
      white-space: nowrap;
    }
    .char {
      display: inline-block;
      white-space: pre;
      will-change: transform, opacity;
    }
  `}hide(){for(let t of this.shadowRoot?.querySelectorAll(".char")??[])t.style.opacity="0",t.style.transform=`translateY(${-this.height}px)`}get waitsForView(){return this.trigger==="view"&&!this.seen&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches}arm(){this.disarm?.(),this.disarm=Bt(this,.5,()=>{this.seen=!0,this.disarm?.(),this.disarm=null,this.play()})}connectedCallback(){this.text||=this.textContent?.trim()??"",this.textContent="",super.connectedCallback(),this.hasUpdated&&this.waitsForView&&this.arm()}disconnectedCallback(){super.disconnectedCallback(),this.disarm?.(),this.disarm=null}updated(t){(t.has("text")||t.has("height")||t.has("interval")||t.has("duration")||t.has("bounce")||t.has("delay")||t.has("trigger"))&&(this.cancel(),this.waitsForView?(this.hide(),this.arm()):this.play())}replay(){this.cancel(),this.play()}render(){return u`
      <span class="sr-only">${this.text}</span>
      <span aria-hidden="true">
        ${Yr(this.text??"",t=>u`<span class="char">${t}</span>`)}
      </span>
    `}};a([l({type:String})],ce.prototype,"text",void 0),a([l({type:Number})],ce.prototype,"height",void 0),a([l({type:Number})],ce.prototype,"interval",void 0),a([l({type:Number})],ce.prototype,"duration",void 0),a([l({type:Number})],ce.prototype,"bounce",void 0),a([l({type:Number})],ce.prototype,"delay",void 0),a([l({type:String,reflect:!0})],ce.prototype,"trigger",void 0),ce=a([x("motion-gravity")],ce);var Gc=0,St=class extends M(w){static{this.styles=v`
    :host {
      display: inline;
    }
  `}constructor(){super(),this.axis="wght",this.axes="",this.from=300,this.to=700,this.duration=.6,this.bounce=0,this.delay=0,this.trigger="view",this.once=!0,this.loop=!1,this.hold=1.6,this.gap=.5,this.pauseOnHover=!1,this.axesDef=[],this.scrollCleanup=null,this.hoverAnim=null,this.detachPauseOnHover=null,this.viewport=new kt(this,{threshold:()=>.2,once:()=>this.once,loop:()=>this.loop}),this.playback=new C(this,{start:()=>this.trigger==="scroll"?this.scrollStart():this.loop?{handle:this.cycle.start()}:this.autoStart(),applyFinalState:()=>{this.cycle.stop(),this.setAll(t=>t.to)},applyInitialState:()=>{this.cycle.stop(),this.setAll(t=>t.from)}}),this.cycle=new ut({leg:t=>X(this.springAxes(e=>t?e.to:e.from,e=>t?e.from:e.to,0)),hold:()=>this.hold,gap:()=>this.gap,delay:()=>this.delay}),this.onHoverIn=()=>this.hoverTo(t=>t.to),this.onHoverOut=()=>this.hoverTo(t=>t.from),this.baseProp=`--mc-_font-${Gc++}`}get reduced(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}springAxes(t,e,i=this.delay){return new gi(this.axesDef.map(s=>{let r={value:t(s)};return f(r,{value:e(s)},{duration:this.duration,type:"spring",bounce:this.bounce,delay:i,onUpdate:()=>this.style.setProperty(s.prop,String(r.value))})}))}autoStart(){return X(this.springAxes(t=>t.from,t=>t.to))}scrollStart(){return this.scrollCleanup?.(),this.scrollCleanup=Et(t=>{for(let e of this.axesDef){let i=e.from+t*(e.to-e.from);this.style.setProperty(e.prop,String(i))}},{target:this,offset:["start end","end start"]}),{handle:{pause:()=>this.unbindScroll(),resume:()=>this.scrollStart(),finish:()=>{this.unbindScroll(),this.setAll(t=>t.to)},cancel:()=>this.unbindScroll()}}}unbindScroll(){this.scrollCleanup?.(),this.scrollCleanup=null}parseAxes(){return this.axes.trim()?this.axes.trim().split(/\s+/).map((t,e)=>{let[i,s,r]=t.split(":");return{axis:i,from:Number(s),to:Number(r),prop:`${this.baseProp}-${e}`}}):[{axis:this.axis,from:this.from,to:this.to,prop:this.baseProp}]}firstUpdated(){this.axesDef=this.parseAxes();for(let t of this.axesDef)try{CSS.registerProperty({name:t.prop,syntax:"<number>",inherits:!1,initialValue:String(t.from)})}catch{}for(let t of this.axesDef)this.style.setProperty(t.prop,String(t.from));if(this.style.fontVariationSettings=this.axesDef.map(t=>`'${t.axis}' var(${t.prop})`).join(", "),this.trigger==="hover"){this.addEventListener("mouseenter",this.onHoverIn),this.addEventListener("mouseleave",this.onHoverOut),this.addEventListener("focusin",this.onHoverIn),this.addEventListener("focusout",this.onHoverOut);return}if(this.reduced){this.setAll(t=>t.to);return}if(this.trigger==="scroll"){this.play();return}this.setupIntersect(),this.detachPauseOnHover=q(this,()=>this.loop&&this.pauseOnHover,()=>this.pause(),()=>this.play())}disconnectedCallback(){super.disconnectedCallback(),this.viewport.disarm(),this.unbindScroll(),this.detachPauseOnHover?.(),this.detachPauseOnHover=null,this.removeEventListener("mouseenter",this.onHoverIn),this.removeEventListener("mouseleave",this.onHoverOut),this.removeEventListener("focusin",this.onHoverIn),this.removeEventListener("focusout",this.onHoverOut)}setupIntersect(){this.viewport.arm()}hoverTo(t){if(this.hoverAnim?.stop(),this.reduced){this.setAll(t);return}this.hoverAnim=this.springAxes(e=>Number(this.style.getPropertyValue(e.prop)||e.from),t)}setAll(t){for(let e of this.axesDef)this.style.setProperty(e.prop,String(t(e)))}replay(){this.trigger==="view"&&(this.viewport.reset(),this.cancel(),this.play())}render(){return u`<slot></slot>`}};a([l({type:String})],St.prototype,"axis",void 0),a([l({type:String})],St.prototype,"axes",void 0),a([l({type:Number})],St.prototype,"from",void 0),a([l({type:Number})],St.prototype,"to",void 0),a([l({type:Number})],St.prototype,"duration",void 0),a([l({type:Number})],St.prototype,"bounce",void 0),a([l({type:Number})],St.prototype,"delay",void 0),a([l({type:String,reflect:!0})],St.prototype,"trigger",void 0),a([l({type:Boolean,converter:y})],St.prototype,"once",void 0),a([l({type:Boolean,converter:y})],St.prototype,"loop",void 0),a([l({type:Number})],St.prototype,"hold",void 0),a([l({type:Number})],St.prototype,"gap",void 0),a([l({type:Boolean,converter:y,attribute:"pause-on-hover"})],St.prototype,"pauseOnHover",void 0),St=a([x("motion-font")],St);var Ot=class extends M(w){constructor(...t){super(...t),this.trigger="hover",this.reverse=!0,this.interval=.03,this.duration=.7,this.bounce=.3,this.once=!0,this.loop=!1,this.hold=1.6,this.gap=.5,this.pauseOnHover=!1,this.delay=0,this.pairs=[],this.oAnim=null,this.dAnim=null,this.swapped=!1,this.detachPauseOnHover=null,this.viewport=new kt(this,{threshold:()=>.1,once:()=>this.once,loop:()=>this.loop}),this.anims=[],this.playback=new C(this,{start:()=>this.loop?{handle:this.cycle.start()}:this.swap(!0,this.delay),applyFinalState:()=>{this.cycle.stop(),this.setPose(!0)},applyInitialState:()=>{this.cycle.stop(),this.setPose(!1)}}),this.cycle=new ut({leg:e=>this.swap(!e),hold:()=>this.hold,gap:()=>this.gap,delay:()=>this.delay}),this.onEnter=()=>{this.trigger==="hover"&&(this.delay?setTimeout(()=>this.animateSwap(!0),this.delay*1e3):this.animateSwap(!0))},this.onLeave=()=>{this.trigger==="hover"&&(this.delay?setTimeout(()=>this.animateSwap(!1),this.delay*1e3):this.animateSwap(!1))}}static{this.styles=v`
    :host {
      display: inline;
    }
    :host(:not([data-ready])) {
      visibility: hidden;
    }
  `}get reduced(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}swap(t,e=0){this.stopAnims();let i=this.pairs.map(p=>p.original),s=this.pairs.map(p=>p.duplicate),r=Lt(this.interval,{startDelay:e}),o=this.reverse?"-100%":"100%",n=this.reverse?"100%":"-100%",h=f(i,t?{y:["0%",o],opacity:[1,0]}:{y:[o,"0%"],opacity:[0,1]},{delay:r,type:"spring",duration:this.duration,bounce:this.bounce});return this.anims=[h,f(s,t?{y:[n,"0%"],opacity:[0,1]}:{y:["0%",n],opacity:[1,0]},{delay:r,type:"spring",duration:this.duration,bounce:this.bounce})],this.swapped=t,{handle:{pause:()=>{for(let p of this.anims)p.pause()},resume:()=>{for(let p of this.anims)p.play()},finish:()=>{for(let p of this.anims)p.complete()},cancel:()=>{for(let p of this.anims)p.cancel()}},done:h}}setPose(t){let e=this.pairs.map(o=>o.original),i=this.pairs.map(o=>o.duplicate),s=t?this.reverse?"-100%":"100%":"0%",r=t?"0%":this.reverse?"100%":"-100%";f(e,{y:s,opacity:t?0:1},{duration:0}),f(i,{y:r,opacity:t?1:0},{duration:0})}firstUpdated(){let t=this.textContent?.trim();t&&(this.replaceChildren(),this.build(t),this.setPose(!1),this.setAttribute("data-ready",""),!this.reduced&&(this.trigger==="hover"?(this.addEventListener("mouseenter",this.onEnter),this.addEventListener("mouseleave",this.onLeave)):this.viewport.arm(),this.detachPauseOnHover=q(this,()=>this.loop&&this.pauseOnHover,()=>this.pause(),()=>this.play())))}stopAnims(){for(let t of this.anims)t.stop();this.anims=[]}disconnectedCallback(){super.disconnectedCallback(),this.stopAnims(),this.oAnim?.stop(),this.dAnim?.stop(),this.removeEventListener("mouseenter",this.onEnter),this.removeEventListener("mouseleave",this.onLeave),this.viewport.disarm(),this.detachPauseOnHover?.(),this.detachPauseOnHover=null}build(t){let e=t.split(/\s+/);this.pairs=[];let i=document.createElement("span");i.textContent=e.join(" "),i.style.cssText="position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap;",this.appendChild(i),e.forEach((s,r)=>{r>0&&this.appendSpace();for(let o of Xi(s)){let n=document.createElement("span");n.style.cssText="display: inline-block; white-space: nowrap;",n.setAttribute("aria-hidden","true"),[...o].forEach(h=>{let p=this.createCharPair(h);this.pairs.push(p),n.appendChild(p.container)}),this.appendChild(n)}})}appendSpace(){let t=document.createElement("span");t.textContent=" ",t.style.whiteSpace="pre",t.setAttribute("aria-hidden","true"),this.appendChild(t)}createCharPair(t){let e=document.createElement("span");e.style.cssText="display: inline-block; position: relative; overflow: hidden; vertical-align: bottom;";let i=document.createElement("span");i.textContent=t,i.style.cssText="display: inline-block; will-change: transform; transform: translateY(0%);",e.appendChild(i);let s=document.createElement("span");s.textContent=t;let r=this.reverse?"100%":"-100%";return s.style.cssText=`display: inline-block; position: absolute; left: 0; top: 0; will-change: transform, opacity; transform: translateY(${r}); opacity: 0;`,e.appendChild(s),{container:e,original:i,duplicate:s}}animateSwap(t){if(this.reduced)return;this.oAnim?.stop(),this.dAnim?.stop();let e=this.pairs.map(n=>n.original),i=this.pairs.map(n=>n.duplicate),s=t?this.reverse?"-100%":"100%":"0%",r=t?"0%":this.reverse?"100%":"-100%",o=Lt(this.interval);this.oAnim=f(e,{y:s,opacity:t?0:1},{delay:o,type:"spring",duration:this.duration,bounce:this.bounce}),this.dAnim=f(i,{y:r,opacity:t?1:0},{delay:o,type:"spring",duration:this.duration,bounce:this.bounce}),this.swapped=t}replay(){this.viewport.reset(),this.swapped=!1,this.cancel(),this.play()}render(){return u`<slot></slot>`}};a([l({type:String})],Ot.prototype,"trigger",void 0),a([l({type:Boolean,converter:y,reflect:!0})],Ot.prototype,"reverse",void 0),a([l({type:Number})],Ot.prototype,"interval",void 0),a([l({type:Number})],Ot.prototype,"duration",void 0),a([l({type:Number})],Ot.prototype,"bounce",void 0),a([l({type:Boolean,converter:y})],Ot.prototype,"once",void 0),a([l({type:Boolean,converter:y})],Ot.prototype,"loop",void 0),a([l({type:Number})],Ot.prototype,"hold",void 0),a([l({type:Number})],Ot.prototype,"gap",void 0),a([l({type:Boolean,converter:y,attribute:"pause-on-hover"})],Ot.prototype,"pauseOnHover",void 0),a([l({type:Number})],Ot.prototype,"delay",void 0),Ot=a([x("motion-swap")],Ot);var ts="--mc-_mark-progress",Xr="--mc-_mark-tail",yt=class extends M(w){constructor(...t){super(...t),this.trigger="view",this.duration=.6,this.delay=0,this.bounce=0,this.loop=!1,this.hold=1.6,this.gap=.5,this.pauseOnHover=!1,this.once=!0,this.threshold=.6,this.hoverTarget=this,this.hoverGoal=null,this.sweepNext=!1,this.keep=!1,this.resizer=null,this.detachPauseOnHover=null,this.viewport=new kt(this,{threshold:()=>this.threshold,once:()=>this.once,loop:()=>this.loop}),this.playback=new C(this,{start:()=>this.sweepNext?(this.sweepNext=!1,this.sweepRun()):this.hoverGoal===null?this.loop?{handle:this.cycle.start()}:this.startDraw():this.hoverRun(this.hoverGoal),applyFinalState:()=>{this.cycle.stop(),this.setTail(0),this.setProgress(this.hoverGoal===0?0:1)},applyInitialState:()=>{this.keep||(this.cycle.stop(),this.setTail(0),this.setProgress(0))}}),this.cycle=new ut({leg:e=>e?this.erase():X(f(this,{[ts]:[this.progress,1]},this.spring)),hold:()=>this.hold,gap:()=>this.gap,delay:()=>this.delay}),this.onEnter=()=>this.drawTo(1),this.onLeave=()=>this.drawTo(0)}get reduced(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}get spring(){return{type:"spring",duration:this.duration,bounce:this.bounce}}erase(){let t=f(this,{[Xr]:[this.tail,1]},{...this.spring,bounce:0}),e=!0;return{handle:{...wi(t),finish:()=>{e=!1,t.complete()},cancel:()=>{e=!1,this.keep?t.stop():t.cancel()}},done:{then:i=>t.then(()=>{e&&(this.setTail(0),this.setProgress(0)),i()})}}}hoverRun(t){let e=f(this,{[ts]:[this.progress,t],[Xr]:[this.tail,0]},this.spring);return{handle:{...wi(e),cancel:()=>this.keep?e.stop():e.cancel(),finish:()=>{e.stop(),this.setTail(0),this.setProgress(t)}},done:e}}sweepRun(){let t=this.erase(),e=t.handle,i=!1,s=()=>{},r=new Promise(o=>s=o);return t.done?.then(()=>{if(i)return;let o=f(this,{[ts]:[0,1]},this.spring);e={...wi(o),cancel:()=>this.keep?o.stop():o.cancel()},o.then(()=>s())}),{handle:{pause:()=>e.pause(),resume:()=>e.resume(),finish:()=>{i=!0,e.cancel(),this.setTail(0),this.setProgress(1)},cancel:()=>{i=!0,e.cancel()}},done:r}}startDraw(){return X(f(this,{[ts]:[this.progress,1]},{...this.spring,delay:this.delay}))}connectedCallback(){super.connectedCallback(),this.setTail(0),this.setProgress(0),this.resizer=new ResizeObserver(()=>this.layout()),this.resizer.observe(this),this.hasUpdated&&this.setup()}disconnectedCallback(){super.disconnectedCallback(),this.teardown(),this.resizer?.disconnect(),this.resizer=null}firstUpdated(){this.setup()}updated(t){(t.has("trigger")&&t.get("trigger")!==void 0||t.has("loop")&&t.get("loop")!==void 0)&&(this.viewport.reset(),this.cancel(),this.setup()),this.layout()}layout(){}replay(){this.viewport.reset(),this.hoverGoal=null,this.cancel(),this.play()}sweep(){this.reduced||this.playState!=="finished"||this.progress<1||(this.sweepNext=!0,this.play())}setup(){this.teardown(),this.trigger==="mount"?this.play():this.trigger==="hover"?(this.hoverTarget=this.closest('a, button, [role="button"]')??this,this.hoverTarget.addEventListener("pointerenter",this.onEnter),this.hoverTarget.addEventListener("pointerleave",this.onLeave)):this.viewport.arm(),this.detachPauseOnHover=q(this,()=>this.loop&&this.pauseOnHover,()=>this.pause(),()=>this.play())}teardown(){this.hoverGoal=null,this.viewport.disarm(),this.hoverTarget.removeEventListener("pointerenter",this.onEnter),this.hoverTarget.removeEventListener("pointerleave",this.onLeave),this.detachPauseOnHover?.(),this.detachPauseOnHover=null}drawTo(t){this.hoverGoal=t,(this.playState==="running"||this.playState==="paused")&&(this.keep=!0,this.cancel(),this.keep=!1),this.play()}get progress(){return Number(this.style.getPropertyValue(ts))||0}setProgress(t){this.style.setProperty(ts,String(t))}get tail(){return Number(this.style.getPropertyValue(Xr))||0}setTail(t){this.style.setProperty(Xr,String(t))}};a([l({type:String,reflect:!0})],yt.prototype,"trigger",void 0),a([l({type:Number})],yt.prototype,"duration",void 0),a([l({type:Number})],yt.prototype,"delay",void 0),a([l({type:Number})],yt.prototype,"bounce",void 0),a([l({type:Boolean,converter:y})],yt.prototype,"loop",void 0),a([l({type:Number})],yt.prototype,"hold",void 0),a([l({type:Number})],yt.prototype,"gap",void 0),a([l({type:Boolean,converter:y,attribute:"pause-on-hover"})],yt.prototype,"pauseOnHover",void 0),a([l({type:Boolean,converter:y})],yt.prototype,"once",void 0),a([l({type:Number})],yt.prototype,"threshold",void 0);function Zr(t,e,i,s,r,o=!1){let n=o?Math.max(2,Math.round(e/(r*2))*2):Math.max(2,Math.round(e/r)),h=e/n,p=o?`M${t} ${i+s}`:`M${t} ${i} Q${t+h/2} ${i-s*2} ${t+h} ${i}`;for(let c=o?1:2;c<=n;c++)p+=o?` L${t+h*c} ${c%2?i-s:i+s}`:` T${t+h*c} ${i}`;return p}var Jr=class extends yt{constructor(...t){super(...t),this.shape="line"}static{this.styles=v`
    :host {
      --mc-_mark-ink: var(--mc-marker-color, rgb(250 204 21 / 0.4));
      --mc-_mark-drawn: min(var(--mc-_mark-progress, 0), 1);
      --mc-_mark-from: clamp(0, var(--mc-_mark-tail, 0), 1);
      --mc-_mark-len: max(calc(var(--mc-_mark-drawn) - var(--mc-_mark-from)), 0);
      --mc-_mark-at: calc(var(--mc-_mark-from) / max(calc(1 - var(--mc-_mark-len)), 0.0001));
      display: inline;
      padding: 0 0.15em;
      margin: 0 -0.15em;
      border-radius: 0.2em;
      background-image: linear-gradient(var(--mc-_mark-ink), var(--mc-_mark-ink));
      background-repeat: no-repeat;
      background-position: calc(var(--mc-_mark-at) * 100%) 85%;
      background-size: calc(var(--mc-_mark-len) * 100%) 75%;
      -webkit-box-decoration-break: clone;
      box-decoration-break: clone;
    }
    :host([shape='wave']) {
      display: inline-block;
      position: relative;
      isolation: isolate;
      white-space: nowrap;
      background: none;
    }
    svg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      overflow: visible;
      pointer-events: none;
    }
    path {
      fill: none;
      stroke: var(--mc-_mark-ink);
      stroke-width: 0.8em;
      stroke-linecap: round;
      stroke-dasharray: var(--mc-_mark-len) 2;
      stroke-dashoffset: calc(-1 * var(--mc-_mark-from));
      stroke-opacity: clamp(0, calc(var(--mc-_mark-len) * 50), 1);
    }
  `}layout(){let t=this.renderRoot.querySelector("path"),e=this.offsetWidth;if(!t||!e)return;let i=parseFloat(getComputedStyle(this).fontSize),s=i*.4;t.setAttribute("d",Zr(s,e-s*2,this.offsetHeight/2+i*.1,i*.07,i*.6))}render(){return u`<slot></slot>${this.shape==="wave"?u`<svg aria-hidden="true">${O`<path pathLength="1"></path>`}</svg>`:k}`}};a([l({type:String,reflect:!0})],Jr.prototype,"shape",void 0),Jr=a([x("motion-marker")],Jr);var Qr=class extends yt{constructor(...t){super(...t),this.shape="line"}static{this.styles=v`
    :host {
      --mc-_mark-ink: var(--mc-mark-color, currentColor);
      --mc-_mark-drawn: min(var(--mc-_mark-progress, 0), 1);
      --mc-_mark-from: clamp(0, var(--mc-_mark-tail, 0), 1);
      --mc-_mark-len: max(calc(var(--mc-_mark-drawn) - var(--mc-_mark-from)), 0);
      --mc-_mark-at: calc(var(--mc-_mark-from) / max(calc(1 - var(--mc-_mark-len)), 0.0001));
      display: inline;
      padding-bottom: 0.08em;
      background-image: linear-gradient(var(--mc-_mark-ink), var(--mc-_mark-ink));
      background-repeat: no-repeat;
      background-position: calc(var(--mc-_mark-at) * 100%) 100%;
      background-size: calc(var(--mc-_mark-len) * 100%) var(--mc-mark-thickness, 2px);
      -webkit-box-decoration-break: clone;
      box-decoration-break: clone;
    }
    :host([shape='dashed']) {
      background-image: repeating-linear-gradient(
        90deg,
        var(--mc-_mark-ink) 0 0.35em,
        transparent 0 0.55em
      );
    }
    :host([shape='dotted']) {
      --mc-_mark-dot: var(--mc-mark-thickness, 2px);
      background-image: repeating-linear-gradient(
        90deg,
        var(--mc-_mark-ink) 0 var(--mc-_mark-dot),
        transparent 0 calc(var(--mc-_mark-dot) * 2.5)
      );
    }
    :host([shape='wave']),
    :host([shape='zigzag']) {
      display: inline-block;
      position: relative;
      white-space: nowrap;
      padding-bottom: 0;
      background: none;
    }
    svg {
      position: absolute;
      left: 0;
      overflow: visible;
      pointer-events: none;
    }
    path {
      fill: none;
      stroke: var(--mc-_mark-ink);
      stroke-width: var(--mc-mark-thickness, 2px);
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-dasharray: var(--mc-_mark-len) 2;
      stroke-dashoffset: calc(-1 * var(--mc-_mark-from));
      stroke-opacity: clamp(0, calc(var(--mc-_mark-len) * 50), 1);
    }
  `}layout(){let t=this.renderRoot.querySelector("svg"),e=t?.querySelector("path"),i=this.offsetWidth;if(!t||!e||!i)return;let s=parseFloat(getComputedStyle(this).fontSize),r=s*.08,o=this.shape==="zigzag";e.setAttribute("d",Zr(0,i,r,r,s*(o?.25:.4),o)),t.setAttribute("width",String(i)),t.setAttribute("height",String(r*2)),t.style.top=`${(this.offsetHeight+s)/2+s*.06}px`}render(){return u`<slot></slot>${this.shape==="wave"||this.shape==="zigzag"?u`<svg aria-hidden="true">${O`<path pathLength="1"></path>`}</svg>`:k}`}};a([l({type:String,reflect:!0})],Qr.prototype,"shape",void 0),Qr=a([x("motion-underline")],Qr);var kn=class extends yt{constructor(...t){super(...t),this.resizeParent=null}static{this.styles=v`
    :host {
      --mc-_mark-ink: var(--mc-mark-color, currentColor);
      display: inline;
      position: relative;
      padding-bottom: 0.08em;
      -webkit-box-decoration-break: clone;
      box-decoration-break: clone;
    }
    .lines {
      position: absolute;
      top: 0;
      left: 0;
      pointer-events: none;
    }
    .line {
      --mc-_mark-drawn: clamp(
        0,
        (var(--mc-_mark-progress, 0) - var(--mc-_line-from)) / var(--mc-_line-span),
        1
      );
      --mc-_mark-from: clamp(
        0,
        (var(--mc-_mark-tail, 0) - var(--mc-_line-from)) / var(--mc-_line-span),
        1
      );
      --mc-_mark-len: max(calc(var(--mc-_mark-drawn) - var(--mc-_mark-from)), 0);
      --mc-_mark-at: calc(var(--mc-_mark-from) / max(calc(1 - var(--mc-_mark-len)), 0.0001));
      position: absolute;
      background-image: linear-gradient(var(--mc-_mark-ink), var(--mc-_mark-ink));
      background-repeat: no-repeat;
      background-position: calc(var(--mc-_mark-at) * 100%) 58%;
      background-size: calc(var(--mc-_mark-len) * 100%) var(--mc-mark-thickness, 2px);
    }
  `}connectedCallback(){super.connectedCallback(),this.resizeParent=new ResizeObserver(()=>this.layout()),this.parentElement&&this.resizeParent.observe(this.parentElement),document.fonts?.ready.then(()=>this.layout())}disconnectedCallback(){super.disconnectedCallback(),this.resizeParent?.disconnect(),this.resizeParent=null}layout(){let t=this.renderRoot.querySelector(".lines");if(!t)return;let e=t.getBoundingClientRect(),i=[...this.getClientRects()].filter(o=>o.width>0),s=i.reduce((o,n)=>o+n.width,0),r=0;t.replaceChildren(...i.map(o=>{let n=document.createElement("span");return n.className="line",Object.assign(n.style,{left:`${o.left-e.left}px`,top:`${o.top-e.top}px`,width:`${o.width}px`,height:`${o.height}px`}),n.style.setProperty("--mc-_line-from",String(r/s)),n.style.setProperty("--mc-_line-span",String(o.width/s)),r+=o.width,n}))}render(){return u`<slot></slot><span class="lines" aria-hidden="true"></span>`}};kn=a([x("motion-strike")],kn);var Ks=class extends yt{constructor(...t){super(...t),this.shape="ellipse",this.padding=6}static{this.styles=v`
    :host {
      --mc-_mark-drawn: min(var(--mc-_mark-progress, 0), 1);
      --mc-_mark-from: clamp(0, var(--mc-_mark-tail, 0), 1);
      --mc-_mark-len: max(calc(var(--mc-_mark-drawn) - var(--mc-_mark-from)), 0);
      --mc-_ring-start: 0;
      display: inline-block;
      position: relative;
      white-space: nowrap;
      margin-inline: calc(var(--mc-_ring-space, 0px) + var(--mc-mark-thickness, 2px) / 2);
    }
    svg {
      position: absolute;
      overflow: visible;
      pointer-events: none;
    }
    .stroke {
      fill: none;
      stroke: var(--mc-mark-color, var(--mc-color-accent, #2563eb));
      stroke-width: var(--mc-mark-thickness, 2px);
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-dasharray: var(--mc-_mark-len) calc(1 - var(--mc-_mark-len));
      stroke-dashoffset: calc(-1 * (var(--mc-_ring-start) + var(--mc-_mark-from)));
      stroke-opacity: clamp(0, calc(var(--mc-_mark-len) * 50), 1);
    }
    ellipse.stroke {
      --mc-_ring-start: 0.58;
    }
  `}layout(){let t=this.renderRoot.querySelector("svg"),e=t?.querySelector(".stroke"),i=document.createRange();i.selectNodeContents(this);let s=i.getBoundingClientRect(),r=this.getBoundingClientRect();if(!t||!e||!s.width||!r.width)return;let o=Math.abs(r.width-this.offsetWidth)>1?this.offsetWidth/r.width:1,n=this.padding,h=s.height*o,p=this.shape==="box"?n:n+h*.1,c=s.width*o+p*2,d=h+n*2,m=this.shape==="box"?{width:c,height:d,rx:Math.min(6,d/4)}:{cx:c/2,cy:d/2,rx:c/2,ry:d/2};Object.entries(m).forEach(([g,b])=>e.setAttribute(g,String(b))),t.setAttribute("width",String(c)),t.setAttribute("height",String(d)),t.style.left=`${(s.left-r.left)*o-p}px`,t.style.top=`${(s.top-r.top)*o-n}px`,this.style.setProperty("--mc-_ring-space",`${p}px`)}render(){return u`<slot></slot
      ><svg aria-hidden="true">
        ${this.shape==="box"?O`<rect class="stroke" pathLength="1"></rect>`:O`<ellipse class="stroke" pathLength="1"></ellipse>`}
      </svg>`}};a([l({type:String,reflect:!0})],Ks.prototype,"shape",void 0),a([l({type:Number})],Ks.prototype,"padding",void 0),Ks=a([x("motion-ring")],Ks);var ph=class extends Ei{constructor(...t){super(...t),this.track=null,this.slides=[],this.dots=[],this.arrows=null,this.anim=null,this.current=0,this.built=!1,this.lastW=0,this.ro=null,this.dragging=!1,this.startX=0,this.baseOffset=0,this.samples=[],this.onDown=e=>{this.dragging=!0,this.startX=e.clientX,this.baseOffset=this.readOffset(),this.samples=[{x:e.clientX,t:performance.now()}],this.anim?.stop(),this.track.style.cursor="grabbing",e.currentTarget.setPointerCapture(e.pointerId)},this.onMove=e=>{if(!this.dragging)return;let i=e.clientX-this.startX;this.writeOffset(this.resist(this.baseOffset+i)),this.samples.push({x:e.clientX,t:performance.now()}),this.samples.length>6&&this.samples.shift()},this.onUp=()=>{this.dragging&&(this.dragging=!1,this.track&&(this.track.style.cursor="grab"),this.snap(this.velocity()))},this.onKey=e=>{e.key==="ArrowLeft"&&this.goTo(this.current-1),e.key==="ArrowRight"&&this.goTo(this.current+1)}}get gap(){return Number(this.getAttribute("gap")??24)}get showArrows(){return ei(this,"arrows",!0)}get reduced(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}connectedCallback(){Object.assign(this.style,{display:"block",position:"relative",overflow:"hidden"}),this.tryBuild()}disconnectedCallback(){this.track?.removeEventListener("pointerdown",this.onDown),window.removeEventListener("pointermove",this.onMove),window.removeEventListener("pointerup",this.onUp),window.removeEventListener("pointercancel",this.onUp),this.removeEventListener("keydown",this.onKey),this.ro?.disconnect()}tryBuild(){let t=this.offsetWidth;if(!t){requestAnimationFrame(()=>this.tryBuild());return}this.build(t)}build(t){if(this.built)return;this.built=!0,this.lastW=t;let e=Array.from(this.children);if(!e.length)return;let i=Sn("div",{display:"flex",gap:`${this.gap}px`,cursor:"grab",userSelect:"none",touchAction:"pan-y",willChange:"transform"});if(e.forEach(s=>{Object.assign(s.style,{flex:`0 0 ${t}px`,minWidth:"0",boxSizing:"border-box"}),i.appendChild(s)}),this.appendChild(i),this.track=i,this.slides=Array.from(i.children),this.showArrows&&this.slides.length>1){let s=this.makeArrow("prev"),r=this.makeArrow("next");this.appendChild(s),this.appendChild(r),this.arrows=[s,r]}if(this.slides.length>1){let s=Sn("div",{position:"absolute",bottom:"16px",left:"0",right:"0",display:"flex",justifyContent:"center",alignItems:"center",gap:"6px",zIndex:"10",pointerEvents:"none"});this.slides.forEach((r,o)=>{let n=Sn("div",{height:"6px",borderRadius:"99px",transition:"width 0.3s ease, background 0.25s ease",pointerEvents:"auto",cursor:"pointer",boxShadow:"0 1px 3px rgba(0,0,0,0.25)"});n.addEventListener("click",()=>this.goTo(o)),s.appendChild(n),this.dots.push(n)}),this.appendChild(s)}i.addEventListener("pointerdown",this.onDown),window.addEventListener("pointermove",this.onMove,{passive:!0}),window.addEventListener("pointerup",this.onUp),window.addEventListener("pointercancel",this.onUp),this.tabIndex=0,this.addEventListener("keydown",this.onKey),this.ro=new ResizeObserver(()=>this.onResize()),this.ro.observe(this),this.current=this.clamp(this.current),this.writeOffset(-this.current*this.slideW()),this.updateDots(),this.updateArrows()}onResize(){let t=this.offsetWidth;!t||t===this.lastW||!this.track||(this.lastW=t,this.slides.forEach(e=>{e.style.flex=`0 0 ${t}px`,e.style.boxSizing="border-box"}),this.anim?.stop(),this.writeOffset(-this.current*this.slideW()))}makeArrow(t){let e=document.createElement("button");return Object.assign(e.style,{all:"unset",outlineOffset:"2px",position:"absolute",top:"50%",transform:"translateY(-50%)",[t==="prev"?"left":"right"]:"12px",zIndex:"10",display:"flex",alignItems:"center",justifyContent:"center",width:"36px",height:"36px",borderRadius:"50%",background:"rgba(0,0,0,0.45)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",border:"1px solid rgba(255,255,255,0.15)",color:"#fff",cursor:"pointer",boxSizing:"border-box",transition:"background 0.18s, transform 0.18s, opacity 0.18s",boxShadow:"0 2px 8px rgba(0,0,0,0.25)"}),e.innerHTML=Yc(t==="prev"?"left":"right"),e.setAttribute("aria-label",t==="prev"?"Previous slide":"Next slide"),e.addEventListener("click",()=>{e.getAttribute("aria-disabled")!=="true"&&this.goTo(this.current+(t==="prev"?-1:1))}),e.addEventListener("focus",()=>{e.matches(":focus-visible")&&(e.style.outline="2px solid var(--mc-color-accent, #2563eb)")}),e.addEventListener("blur",()=>{e.style.outline="none"}),e.addEventListener("mouseenter",()=>{e.style.opacity!=="0.3"&&(e.style.background="rgba(0,0,0,0.65)",e.style.transform="translateY(-50%) scale(1.08)")}),e.addEventListener("mouseleave",()=>{e.style.background="rgba(0,0,0,0.45)",e.style.transform="translateY(-50%) scale(1)"}),e}slideW(){return(this.slides[0]?.offsetWidth??0)+this.gap}readOffset(){return new DOMMatrix(getComputedStyle(this.track).transform).m41}writeOffset(t){this.track.style.transform=`translateX(${t}px)`}resist(t){let e=this.slideW(),i=-(this.slides.length-1)*e;return t>0?Math.sqrt(t)*12:t<i?i-Math.sqrt(i-t)*12:t}velocity(){let t=this.samples;if(t.length<2)return 0;let e=t[t.length-1].t-t[0].t;return e<1?0:(t[t.length-1].x-t[0].x)/e}snap(t){let e=this.slideW();if(!e)return;let i=this.readOffset(),s=.3,r;r=t<-s?Math.min(this.slides.length-1,this.current+1):t>s?Math.max(0,this.current-1):Math.round(-i/e),this.goTo(r,t*1e3)}get index(){return this.current}next(){this.goTo(this.current+1)}prev(){this.goTo(this.current-1)}goTo(t,e=0){if(!this.track){let r=Math.max(0,this.children.length-1);this.current=Math.max(0,Math.min(r,Math.round(t)||0));return}let i=this.current;this.current=this.clamp(t);let s=-this.current*this.slideW();this.anim?.stop(),this.reduced?this.writeOffset(s):this.anim=f(this.track,{x:s},{type:"spring",stiffness:360,damping:42,velocity:e}),this.updateDots(),this.updateArrows(),this.current!==i&&this.dispatchEvent(new CustomEvent("motion-change",{detail:{index:this.current},bubbles:!0,composed:!0}))}clamp(t){return Math.max(0,Math.min(this.slides.length-1,Math.round(t)))}updateDots(){this.dots.forEach((t,e)=>{let i=e===this.current;t.style.width=i?"22px":"6px",t.style.background=i?"rgba(255,255,255,0.95)":"rgba(255,255,255,0.3)"})}updateArrows(){if(!this.arrows)return;let[t,e]=this.arrows;hh(t,this.current===0),hh(e,this.current===this.slides.length-1)}};function Sn(t,e={}){let i=document.createElement(t);return Object.assign(i.style,e),i}function hh(t,e){t.setAttribute("aria-disabled",String(e)),t.style.opacity=e?"0.3":"1",t.style.pointerEvents=e?"none":"auto"}function Yc(t){return`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="${t==="left"?"15 18 9 12 15 6":"9 6 15 12 9 18"}"></polyline></svg>`}ye("motion-slider",ph);var Xc={type:"spring",stiffness:380,damping:40,restDelta:.001},Zc={type:"spring",stiffness:460,damping:48,restDelta:.001},ch=class extends Ei{constructor(...t){super(...t),this.items=[],this.backdrop=null,this.controls=null,this.clone=null,this.expandAnim=null,this.active=null,this.currentIndex=-1,this.lastFocus=null,this.brCache=new WeakMap,this.hoverWrappers=[],this.prevBtn=null,this.nextBtn=null,this.closeBtn=null,this.counterEl=null,this.captionEl=null,this.initialized=!1,this.onClick=e=>{let i=e.target.closest('[role="button"]');i&&this.items.includes(i)&&this.expand(i)},this.onItemKey=e=>{if(e.key!=="Enter"&&e.key!==" ")return;let i=e.target.closest('[role="button"]');i&&this.items.includes(i)&&(e.preventDefault(),this.expand(i))},this.onKey=e=>{if(e.key==="Escape"){this.collapse();return}if(e.key==="ArrowRight"){e.preventDefault(),this.next();return}if(e.key==="ArrowLeft"){e.preventDefault(),this.prev();return}if(e.key==="Tab"){let i=[this.closeBtn,this.prevBtn,this.nextBtn].filter(o=>o!==null&&!o.disabled);if(!i.length)return;let s=i[0],r=i[i.length-1];e.shiftKey?document.activeElement===s&&(e.preventDefault(),r.focus()):document.activeElement===r&&(e.preventDefault(),s.focus())}}}static{this.observedAttributes=["columns","gap","aspect-ratio","stagger"]}get columns(){return Number(this.getAttribute("columns")??3)}get gap(){return Number(this.getAttribute("gap")??16)}get aspectRatio(){return this.getAttribute("aspect-ratio")??""}get showStagger(){return ei(this,"stagger",!0)}get reduced(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}connectedCallback(){if(this.initialized){if(!this.items.length)return;this.addEventListener("click",this.onClick),this.addEventListener("keydown",this.onItemKey);return}if(this.initialized=!0,this.setAttribute("role","group"),this.setAttribute("aria-label","Image gallery"),Object.assign(this.style,{display:"grid",gridTemplateColumns:`repeat(${this.columns}, 1fr)`,gap:`${this.gap}px`,contain:"layout style"}),this.items=Array.from(this.children),this.items.length&&(this.items.forEach((t,e)=>{t.setAttribute("tabindex","0"),t.setAttribute("role","button"),t.setAttribute("aria-haspopup","dialog"),t.setAttribute("aria-label",t.dataset.caption??`Open item ${e+1} of ${this.items.length}`),t.style.cursor="zoom-in",t.style.transformOrigin="center",t.style.display="block",t.style.width="100%",this.aspectRatio&&(t.style.aspectRatio=this.aspectRatio),this.brCache.set(t,getComputedStyle(t).borderRadius||"4px");let i=document.createElement("motion-hover");i.setAttribute("scale","1.03"),i.setAttribute("y","-4"),i.setAttribute("bounce","0.1"),i.style.display="block",this.hoverWrappers.push(i),t.replaceWith(i),i.appendChild(t)}),this.addEventListener("click",this.onClick),this.addEventListener("keydown",this.onItemKey),this.showStagger)){let t=document.createElement("motion-stagger");t.setAttribute("interval","0.055"),t.setAttribute("duration","0.6"),t.setAttribute("y","16"),this.hoverWrappers.forEach(e=>t.appendChild(e)),this.appendChild(t)}}disconnectedCallback(){this.backdrop?.remove(),this.controls?.remove(),document.removeEventListener("keydown",this.onKey),this.removeEventListener("click",this.onClick),this.removeEventListener("keydown",this.onItemKey),this.expandAnim?.stop(),this.expandAnim=null,this.clone?.remove(),this.clone=null;let t=this.active;t&&(t.style.opacity=""),this.active=null,this.currentIndex=-1,this.lastFocus=null,this.hoverWrappers.forEach(e=>{e.style.pointerEvents=""}),this.backdrop=null,this.controls=null,t&&this.emit("motion-close")}attributeChangedCallback(){this.initialized&&(Object.assign(this.style,{gridTemplateColumns:`repeat(${this.columns}, 1fr)`,gap:`${this.gap}px`}),this.aspectRatio&&this.items.forEach(t=>{t.style.aspectRatio=this.aspectRatio}))}ensureOverlay(){this.backdrop||(this.backdrop=this.buildBackdrop(),this.controls=this.buildControls(),document.body.appendChild(this.backdrop),document.body.appendChild(this.controls))}buildBackdrop(){let t=document.createElement("div");return Object.assign(t.style,{position:"fixed",inset:"0",background:"rgba(0,0,0,0.82)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",zIndex:"9998",opacity:"0",display:"none"}),t.addEventListener("click",()=>this.collapse()),t}buildControls(){let t=document.createElement("div");t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-label","Image lightbox"),Object.assign(t.style,{position:"fixed",inset:"0",zIndex:"10000",display:"none",pointerEvents:"none"});let e=this.buildBtn("\u2715",{top:"1.25rem",right:"1.25rem"},"Close lightbox");e.addEventListener("click",()=>this.collapse()),t.appendChild(e),this.closeBtn=e;let i=this.buildBtn("\u2190",{left:"1.25rem",top:"50%",transform:"translateY(-50%)"},"Previous item");i.addEventListener("click",()=>this.prev()),t.appendChild(i),this.prevBtn=i;let s=this.buildBtn("\u2192",{right:"1.25rem",top:"50%",transform:"translateY(-50%)"},"Next item");s.addEventListener("click",()=>this.next()),t.appendChild(s),this.nextBtn=s;let r=document.createElement("div");r.setAttribute("aria-live","polite"),r.setAttribute("aria-atomic","true"),Object.assign(r.style,{position:"absolute",bottom:"1.25rem",left:"50%",transform:"translateX(-50%)",color:"rgba(255,255,255,0.5)",fontSize:"0.78rem",fontFamily:"ui-monospace, monospace",letterSpacing:"0.08em"}),t.appendChild(r),this.counterEl=r;let o=document.createElement("div");return Object.assign(o.style,{position:"absolute",bottom:"2.75rem",left:"50%",transform:"translateX(-50%)",color:"rgba(255,255,255,0.85)",fontSize:"0.92rem",textAlign:"center",maxWidth:"560px",display:"none"}),t.appendChild(o),this.captionEl=o,t}buildBtn(t,e,i){let s=document.createElement("button");return s.textContent=t,s.setAttribute("aria-label",i),Object.assign(s.style,{position:"absolute",pointerEvents:"auto",background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.16)",backdropFilter:"blur(12px)",color:"#fff",width:"2.5rem",height:"2.5rem",borderRadius:"50%",fontSize:"1rem",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.15s",outline:"2px solid transparent",outlineOffset:"2px",...e}),s.addEventListener("mouseenter",()=>{s.style.background="rgba(255,255,255,0.2)"}),s.addEventListener("mouseleave",()=>{s.style.background="rgba(255,255,255,0.1)"}),s.addEventListener("focus",()=>{s.matches(":focus-visible")&&(s.style.outline="2px solid rgba(255,255,255,0.6)")}),s.addEventListener("blur",()=>{s.style.outline="2px solid transparent"}),s}showOverlay(){this.backdrop.style.display="block",this.controls.style.display="block",f(this.backdrop,{opacity:[0,1]},{type:"spring",bounce:0,duration:this.reduced?0:.3}),document.addEventListener("keydown",this.onKey)}hideOverlay(){document.removeEventListener("keydown",this.onKey),f(this.backdrop,{opacity:0},{type:"spring",bounce:0,duration:this.reduced?0:.22}).then(()=>{this.backdrop.style.display="none"}),this.controls.style.display="none"}expand(t){if(this.active||!this.items.length)return;this.ensureOverlay(),this.lastFocus=document.activeElement,this.active=t,this.currentIndex=this.items.indexOf(t),this.hoverWrappers.forEach(p=>{p.style.pointerEvents="none"});let e=t.getBoundingClientRect(),{x:i,y:s,w:r,h:o}=this.targetRect(e);this.showOverlay();let n=this.brCache.get(t)??"4px",h=this.makeClone(t,e.left,e.top,e.width,e.height);h.style.borderRadius=n,document.body.appendChild(h),this.clone=h,t.style.opacity="0",this.reduced?Object.assign(h.style,{left:`${i}px`,top:`${s}px`,width:`${r}px`,height:`${o}px`,borderRadius:"16px"}):this.expandAnim=f(h,{left:i,top:s,width:r,height:o,borderRadius:"16px"},Xc),h.addEventListener("click",()=>this.collapse()),requestAnimationFrame(()=>this.closeBtn?.focus()),this.updateUI(),this.emit("motion-open",{index:this.currentIndex})}collapse(){let t=this.clone,e=this.active;if(!t||!e)return;let i=this.lastFocus;if(this.active=null,this.clone=null,this.currentIndex=-1,this.lastFocus=null,this.hoverWrappers.forEach(o=>{o.style.pointerEvents=""}),this.hideOverlay(),this.expandAnim?.stop(),this.expandAnim=null,this.reduced){t.remove(),e.style.opacity="",i?.focus(),this.emit("motion-close");return}let s=e.getBoundingClientRect(),r=this.brCache.get(e)??"4px";f(t,{left:s.left,top:s.top,width:s.width,height:s.height,borderRadius:r},Zc).then(()=>{t.remove(),e.style.opacity=""}),i?.focus(),this.emit("motion-close")}get index(){return this.currentIndex}open(t=0){let e=Math.max(0,Math.min(this.items.length-1,Math.round(t)));if(this.active){e!==this.currentIndex&&this.navigateTo(e);return}let i=this.items[e];i&&this.expand(i)}close(){this.collapse()}prev(){this.currentIndex>0&&this.navigateTo(this.currentIndex-1)}next(){this.active&&this.currentIndex<this.items.length-1&&this.navigateTo(this.currentIndex+1)}emit(t,e){this.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}navigateTo(t){let e=this.clone,i=this.active;if(!e||!i)return;this.expandAnim?.stop(),this.expandAnim=null,this.active=null,this.clone=null,this.currentIndex=t,i.style.opacity="";let s=this.items[t],r=s.getBoundingClientRect(),{x:o,y:n,w:h,h:p}=this.targetRect(r);e.remove();let c=this.makeClone(s,o,n,h,p);c.style.opacity="0",document.body.appendChild(c),s.style.opacity="0",this.active=s,this.clone=c,this.reduced?c.style.opacity="1":f(c,{opacity:[0,1],scale:[1.04,1]},{type:"spring",bounce:.1,duration:.32}),c.addEventListener("click",()=>this.collapse()),this.updateUI(),this.emit("motion-change",{index:t})}makeClone(t,e,i,s,r){let o=t.cloneNode(!0);return o.removeAttribute("tabindex"),o.removeAttribute("role"),o.removeAttribute("aria-haspopup"),Object.assign(o.style,{position:"fixed",left:`${e}px`,top:`${i}px`,width:`${s}px`,height:`${r}px`,margin:"0",zIndex:"9999",cursor:"zoom-out",borderRadius:"16px",boxSizing:"border-box",transition:"none",overflow:"hidden",willChange:"transform"}),o}updateUI(){let t=this.items.length,e=this.currentIndex;if(this.counterEl&&(this.counterEl.textContent=`${e+1} / ${t}`),this.prevBtn){let s=e===0;this.prevBtn.style.opacity=s?"0.3":"1",this.prevBtn.disabled=s,this.prevBtn.setAttribute("aria-disabled",String(s))}if(this.nextBtn){let s=e===t-1;this.nextBtn.style.opacity=s?"0.3":"1",this.nextBtn.disabled=s,this.nextBtn.setAttribute("aria-disabled",String(s))}let i=this.items[e]?.dataset.caption??"";this.captionEl&&(this.captionEl.textContent=i,this.captionEl.style.display=i?"block":"none")}targetRect(t){let e=window.innerWidth,i=window.innerHeight,s=e-160,r=i-160,o=t.width/t.height,n=s,h=n/o;return h>r&&(h=r,n=h*o),{x:(e-n)/2,y:(i-h)/2,w:n,h}}};ye("motion-gallery",ch);/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var{I:RM}=ia;var dh=t=>t.strings===void 0;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Gs=(t,e)=>{let i=t._$AN;if(i===void 0)return!1;for(let s of i)s._$AO?.(e,!1),Gs(s,e);return!0},to=t=>{let e,i;do{if((e=t._$AM)===void 0)break;i=e._$AN,i.delete(t),t=e}while(i?.size===0)},mh=t=>{for(let e;e=t._$AM;t=e){let i=e._$AN;if(i===void 0)e._$AN=i=new Set;else if(i.has(t))break;i.add(t),td(e)}};function Jc(t){this._$AN!==void 0?(to(this),this._$AM=t,mh(this)):this._$AM=t}function Qc(t,e=!1,i=0){let s=this._$AH,r=this._$AN;if(r!==void 0&&r.size!==0)if(e)if(Array.isArray(s))for(let o=i;o<s.length;o++)Gs(s[o],!1),to(s[o]);else s!=null&&(Gs(s,!1),to(s));else Gs(this,t)}var td=t=>{t.type==Kr.CHILD&&(t._$AP??=Qc,t._$AQ??=Jc)},eo=class extends Ji{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,i,s){super._$AT(e,i,s),mh(this),this.isConnected=e._$AU}_$AO(e,i=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),i&&(Gs(this,e),to(this))}setValue(e){if(dh(this._$Ct))this._$Ct._$AI(e,this);else{let i=[...this._$Ct._$AH];i[this._$Ci]=e,this._$Ct._$AI(i,this,0)}}disconnected(){}reconnected(){}};/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var $n=new WeakMap,An=qs(class extends eo{render(t){return k}update(t,[e]){let i=e!==this.G;return i&&this.rt(void 0),(i||this.lt!==this.ct)&&(this.G=e,this.ht=t.options?.host,this.rt(this.ct=t.element)),k}rt(t){if(this.G!==void 0)if(this.isConnected||(t=void 0),typeof this.G=="function"){let e=this.ht??globalThis,i=$n.get(e);i===void 0&&(i=new WeakMap,$n.set(e,i)),i.get(this.G)!==void 0&&this.G.call(this.ht,void 0),i.set(this.G,t),t!==void 0&&this.G.call(this.ht,t)}else this.G.value=t}get lt(){return typeof this.G=="function"?$n.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});var uh={type:"spring",stiffness:160,damping:22},ed={days:"Days",hours:"Hours",minutes:"Minutes",seconds:"Seconds"},id=["days","hours","minutes","seconds"],fh=[0,1,2,3,4,5,6,7,8,9,0],Ys=t=>`${-t*100/fh.length}%`,Ye=class extends M(w){constructor(...t){super(...t),this.to="",this.format="days hours minutes seconds",this.labels=!0,this.roll=!1,this.time={days:0,hours:0,minutes:0,seconds:0},this.prevDigits=new Map,this.els=new Map,this.refCache=new Map,this.interval=null,this.ready=!1,this.flips=new Set,this.flipEpoch=0,this.resolveRun=null,this.playback=new C(this,{start:()=>{let e=new Promise(i=>{this.resolveRun=i});return this.startTicking(),{done:e,handle:{pause:()=>this.stopTicking(),resume:()=>this.startTicking(),finish:()=>{this.stopTicking(),this.applyTime({days:0,hours:0,minutes:0,seconds:0})},cancel:()=>this.stopTicking()}}},applyFinalState:()=>{this.stopTicking(),this.applyTime({days:0,hours:0,minutes:0,seconds:0})},applyInitialState:()=>this.applyTime(this.timeLeft()),runsUnderReducedMotion:!0})}get reduced(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}static{this.styles=v`
    :host {
      display: inline-flex;
      align-items: flex-start;
      gap: var(--mc-countdown-gap, 0.75rem);
      font-variant-numeric: tabular-nums;
    }

    .unit {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      font-size: var(--mc-countdown-size, 3.5rem);
    }

    .digits {
      display: flex;
      gap: 0.02em;
    }

    .reel {
      height: 1em;
      overflow: hidden;
    }

    .strip {
      display: flex;
      flex-direction: column;
      will-change: transform;
    }

    .flip-wrap {
      overflow: hidden;
      line-height: 1;
    }

    .flip-digit {
      display: block;
      line-height: 1;
    }

    .digit {
      display: block;
      font-size: 1em;
      font-weight: 800;
      color: var(--mc-countdown-color, currentColor);
      letter-spacing: -0.04em;
      line-height: 1;
      user-select: none;
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }

    .label {
      font-size: var(--mc-countdown-label-size, 0.65rem);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: var(--mc-countdown-label-color, currentColor);
      opacity: 0.4;
    }

    .sep {
      font-size: var(--mc-countdown-size, 3.5rem);
      font-weight: 800;
      color: var(--mc-countdown-color, currentColor);
      opacity: 0.2;
      line-height: 1;
      align-self: flex-start;
      user-select: none;
    }
  `}connectedCallback(){super.connectedCallback(),this.play()}disconnectedCallback(){super.disconnectedCallback(),this.stopTicking()}async firstUpdated(){await this.updateComplete,requestAnimationFrame(()=>{this.ready=!0})}updated(t){t.has("to")&&(this.interval===null?this.playState==="finished"&&new Date(this.to).getTime()>Date.now()&&this.play():this.tick())}startTicking(){this.interval=setInterval(()=>this.tick(),1e3),this.tick()}stopTicking(){this.interval!==null&&clearInterval(this.interval),this.interval=null}timeLeft(){let t=new Date(this.to).getTime(),e=isNaN(t)?0:Math.max(0,t-Date.now());return{days:Math.floor(e/864e5),hours:Math.floor(e%864e5/36e5),minutes:Math.floor(e%36e5/6e4),seconds:Math.floor(e%6e4/1e3)}}setDigit(t,e){this.roll?f(t,{y:Ys(e)},{duration:0}):t.textContent=String(e)}applyTime(t){this.stopFlips(),this.time=t;for(let e of this.activeUnits()){let i=this.pad(t[e]);for(let s=0;s<i.length;s++){let r=`${e}-${s}`,o=parseInt(i[s]);this.prevDigits.set(r,o);let n=this.els.get(r);n&&(this.setDigit(n,o),this.roll||(n.style.transform="",n.style.opacity=""))}}}tick(){let t=new Date(this.to).getTime();if(isNaN(t))return;let e=this.timeLeft();for(let i of this.activeUnits()){let s=this.pad(e[i]);for(let r=0;r<s.length;r++){let o=`${i}-${r}`,n=parseInt(s[r]),h=this.prevDigits.get(o);if(h===void 0){this.prevDigits.set(o,n);let p=this.els.get(o);p&&this.setDigit(p,n)}else if(this.ready&&n!==h){this.prevDigits.set(o,n);let p=this.els.get(o);p&&(this.roll?this.rollDigit(p,h,n):this.flipDigit(p,String(n)))}}}this.time=e,t<=Date.now()&&this.timeUp()}timeUp(){this.stopTicking(),this.playState==="idle"?this.finish():this.resolveRun?.()}rollDigit(t,e,i){if(this.reduced){f(t,{y:Ys(i)},{duration:0});return}let s={type:"spring",stiffness:220,damping:28};if(i>e){let r=this.flipEpoch;f(t,{y:Ys(10)},{duration:0}),requestAnimationFrame(()=>{r===this.flipEpoch&&this.retain(f(t,{y:Ys(9)},s))})}else this.retain(f(t,{y:Ys(i)},s))}retain(t){this.flips.add(t),t.then(()=>this.flips.delete(t))}stopFlips(){this.flipEpoch++;for(let t of this.flips)t.stop();this.flips.clear()}async flipDigit(t,e){if(this.reduced){t.textContent=e;return}let i=this.flipEpoch,s=f(t,{y:"-40%",opacity:0},uh);this.retain(s),await s,i===this.flipEpoch&&(t.textContent=e,this.retain(f(t,{y:["30%","0%"],opacity:[0,1]},uh)))}pad(t){return String(t).padStart(2,"0")}activeUnits(){let t=new Set(this.format.split(/\s+/));return id.filter(e=>t.has(e))}ref(t){return this.refCache.has(t)||this.refCache.set(t,e=>{if(e){this.els.set(t,e);let i=this.prevDigits.get(t)??0;this.roll?requestAnimationFrame(()=>{let s=this.els.get(t);s&&this.setDigit(s,i)}):e.textContent=String(i)}else this.els.delete(t)}),this.refCache.get(t)}render(){return u`
      ${this.activeUnits().map((t,e)=>{let i=this.pad(this.time[t]);return u`
          ${e>0?u`<span class="sep" aria-hidden="true">:</span>`:""}
          <div class="unit">
            <div class="digits">
              ${this.roll?u`<span class="sr-only">${i}</span>`:""}
              ${Array.from({length:i.length},(s,r)=>{let o=`${t}-${r}`;return this.roll?u` <div class="reel" aria-hidden="true">
                      <div class="strip" ${An(this.ref(o))}>
                        ${fh.map(n=>u`<span class="digit">${n}</span>`)}
                      </div>
                    </div>`:u` <div class="flip-wrap">
                      <span class="digit flip-digit" ${An(this.ref(o))}></span>
                    </div>`})}
            </div>
            ${this.labels?u`<span class="label">${ed[t]}</span>`:""}
          </div>
        `})}
    `}};a([l({type:String,reflect:!0})],Ye.prototype,"to",void 0),a([l({type:String,reflect:!0})],Ye.prototype,"format",void 0),a([l({type:Boolean,converter:y,reflect:!0})],Ye.prototype,"labels",void 0),a([l({type:Boolean,converter:y,reflect:!0})],Ye.prototype,"roll",void 0),a([D()],Ye.prototype,"time",void 0),Ye=a([x("motion-countdown")],Ye);var es=class extends w{constructor(...t){super(...t),this.size=400,this.duration=.35,this.bounce=0,this.spot=null,this.x=pe(0),this.y=pe(0),this.seeded=!1,this.fadeControls=null,this.stopPaint=[],this.onEnter=()=>this.fade(1),this.onLeave=()=>{this.seeded=!1,this.fade(0)},this.onFocus=()=>{this.reduced||(this.seeded||this.place(this.offsetWidth/2,this.offsetHeight/2),this.fade(1))},this.onBlur=()=>this.fade(0),this.onMove=e=>{if(this.reduced)return;let i=this.getBoundingClientRect(),s=e.clientX-i.left,r=e.clientY-i.top;if(!this.seeded){this.place(s,r),this.seeded=!0;return}f(this.x,s,this.spring),f(this.y,r,this.spring)},this.paint=()=>{this.spot&&(this.spot.style.background=`radial-gradient(${this.size}px circle at ${this.x.get()}px ${this.y.get()}px, var(--mc-spotlight-color, rgba(255,255,255,0.18)), transparent 60%)`)}}static{this.styles=v`
    :host {
      display: block;
      position: relative;
      isolation: isolate;
    }
    .spot {
      position: absolute;
      inset: 0;
      pointer-events: none;
      opacity: 0;
      border-radius: inherit;
    }
    :host(:focus-within) .spot {
      opacity: 1;
    }
  `}get reduced(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}get spring(){return{type:"spring",duration:this.duration,bounce:this.bounce}}firstUpdated(){this.spot=this.renderRoot.querySelector(".spot"),this.stopPaint=[this.x.on("change",this.paint),this.y.on("change",this.paint)],this.addEventListener("pointerenter",this.onEnter),this.addEventListener("pointermove",this.onMove),this.addEventListener("pointerleave",this.onLeave),this.addEventListener("focusin",this.onFocus),this.addEventListener("focusout",this.onBlur)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("pointerenter",this.onEnter),this.removeEventListener("pointermove",this.onMove),this.removeEventListener("pointerleave",this.onLeave),this.removeEventListener("focusin",this.onFocus),this.removeEventListener("focusout",this.onBlur),this.fadeControls?.stop(),this.x.stop(),this.y.stop(),this.stopPaint.forEach(t=>t())}fade(t){this.reduced||!this.spot||(this.fadeControls?.stop(),this.fadeControls=f(this.spot,{opacity:t},{type:"spring",bounce:0,duration:this.duration}))}place(t,e){this.x.jump(t),this.y.jump(e),this.paint()}render(){return u`<slot></slot> <div class="spot" aria-hidden="true"></div>`}};a([l({type:Number,reflect:!0})],es.prototype,"size",void 0),a([l({type:Number})],es.prototype,"duration",void 0),a([l({type:Number})],es.prototype,"bounce",void 0),es=a([x("motion-spotlight")],es);var Xe=class extends M(w){constructor(...t){super(...t),this.position="top",this.thickness=3,this.target="",this.bounce=.15,this.duration=.4,this.bar=null,this.controls=null,this.cleanup=null,this.playback=new C(this,{start:()=>(this.bind(),{handle:{pause:()=>this.unbind(),resume:()=>this.bind(),finish:()=>{this.release(),this.setScale(1)},cancel:()=>this.release()}}),applyFinalState:()=>this.setScale(1),applyInitialState:()=>{this.release(),this.setScale(0)},runsUnderReducedMotion:!0})}static{this.styles=v`
    :host {
      display: contents;
    }
    .bar {
      position: fixed;
      left: 0;
      right: 0;
      transform-origin: 0 50%;
      transform: scaleX(0);
      will-change: transform;
      z-index: 9999;
      pointer-events: none;
    }
  `}get reduced(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}firstUpdated(){this.bar=this.renderRoot.querySelector(".bar"),this.apply(),this.play()}updated(){this.apply(),this.cleanup&&this.bind()}disconnectedCallback(){super.disconnectedCallback(),this.release()}apply(){this.bar&&(this.bar.style.background="var(--mc-progress-color, var(--mc-color-accent, #2563eb))",this.bar.style.height=`${this.thickness}px`,this.bar.style.top=this.position==="top"?"0":"auto",this.bar.style.bottom=this.position==="bottom"?"0":"auto")}bind(){if(!this.bar)return;this.release();let t=this.target?document.querySelector(this.target):null,e=t?{target:t}:void 0;if(this.reduced){this.cleanup=Et(i=>this.setScale(i),e);return}this.controls=f(this.bar,{scaleX:[0,1]},{type:"spring",bounce:this.bounce,duration:this.duration}),this.cleanup=Et(this.controls,e)}unbind(){this.cleanup?.(),this.cleanup=null}release(){this.unbind(),this.controls?.cancel(),this.controls=null}setScale(t){this.bar&&(this.bar.style.transform=`scaleX(${t})`)}render(){return u`<div class="bar" aria-hidden="true"></div>`}};a([l({type:String,reflect:!0})],Xe.prototype,"position",void 0),a([l({type:Number,reflect:!0})],Xe.prototype,"thickness",void 0),a([l({type:String})],Xe.prototype,"target",void 0),a([l({type:Number})],Xe.prototype,"bounce",void 0),a([l({type:Number})],Xe.prototype,"duration",void 0),Xe=a([x("motion-progress")],Xe);var Ze=class extends w{constructor(...t){super(...t),this.start=50,this.orientation="horizontal",this.bounce=.25,this.duration=.45,this.pos=50,this.dragging=!1,this.goal=null,this.motion=null,this.onDown=e=>{e.button===0&&(this.dragging=!0,this.setPointerCapture(e.pointerId),this.moveTo(this.fromEvent(e),!0))},this.onMove=e=>{this.dragging&&this.moveTo(this.fromEvent(e),!1)},this.onUp=()=>{this.dragging=!1},this.onKey=e=>{let i=e.shiftKey?10:2,s=this.position;if(e.key==="Home")s=0;else if(e.key==="End")s=100;else if(this.orientation==="horizontal")if(e.key==="ArrowLeft")s-=i;else if(e.key==="ArrowRight")s+=i;else return;else if(e.key==="ArrowUp")s-=i;else if(e.key==="ArrowDown")s+=i;else return;e.preventDefault(),this.moveTo(this.clamp(s),!0)}}static{this.styles=v`
    :host {
      display: block;
      position: relative;
      overflow: hidden;
      touch-action: none;
      -webkit-user-select: none;
      user-select: none;
      cursor: ew-resize;
      isolation: isolate;
    }
    :host([orientation='vertical']) {
      cursor: ns-resize;
    }
    .pane {
      position: absolute;
      inset: 0;
    }
    .after {
      will-change: clip-path;
    }
    ::slotted(*) {
      -webkit-user-select: none;
      user-select: none;
      -webkit-user-drag: none;
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      pointer-events: none;
    }
    .handle {
      position: absolute;
      background: white;
      box-shadow: 0 0 12px rgba(0, 0, 0, 0.4);
      will-change: transform;
      pointer-events: none;
      top: 0;
      bottom: 0;
      width: 2px;
      left: 0;
      transform: translateX(-1px);
    }
    :host([orientation='vertical']) .handle {
      top: 0;
      left: 0;
      right: 0;
      width: auto;
      height: 2px;
      bottom: auto;
      transform: translateY(-1px);
    }
    .knob {
      position: absolute;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: white;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #333;
      font-size: 14px;
      font-weight: 700;
      cursor: inherit;
      pointer-events: auto;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .knob:focus-visible {
      outline: 2px solid var(--mc-color-accent, #2563eb);
      outline-offset: 3px;
    }
  `}get reduced(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}connectedCallback(){super.connectedCallback(),this.addEventListener("pointerdown",this.onDown),this.addEventListener("pointermove",this.onMove),this.addEventListener("pointerup",this.onUp),this.addEventListener("pointercancel",this.onUp),this.addEventListener("lostpointercapture",this.onUp)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("pointerdown",this.onDown),this.removeEventListener("pointermove",this.onMove),this.removeEventListener("pointerup",this.onUp),this.removeEventListener("pointercancel",this.onUp),this.removeEventListener("lostpointercapture",this.onUp),this.stop()}firstUpdated(){this.pos=this.goal??this.clamp(this.start),this.goal=null,this.apply()}updated(t){(t.has("orientation")||t.has("start"))&&(t.has("start")&&t.get("start")!==void 0&&(this.stop(),this.pos=this.clamp(this.start)),this.apply())}get position(){return this.goal??this.pos}set position(t){let e=this.clamp(Number(t)||0);if(!this.hasUpdated){this.goal=e;return}this.spring(e)}clamp(t){return Math.max(0,Math.min(100,t))}moveTo(t,e){t!==this.position&&(e?this.spring(t):(this.stop(),this.pos=t,this.apply()),this.dispatchEvent(new CustomEvent("motion-change",{detail:{position:t},bubbles:!0,composed:!0})))}fromEvent(t){let e=this.getBoundingClientRect(),i=this.orientation==="horizontal"?(t.clientX-e.left)/e.width:(t.clientY-e.top)/e.height;return this.clamp(i*100)}stop(){this.motion?.stop(),this.motion=null,this.goal=null}spring(t){if(this.stop(),this.reduced){this.pos=t,this.apply();return}let e={v:this.pos};this.goal=t,this.motion=f(e,{v:t},{type:"spring",bounce:this.bounce,duration:this.duration,onUpdate:i=>{this.pos=i,this.apply()}})}apply(){let t=this.renderRoot.querySelector(".after"),e=this.renderRoot.querySelector(".handle"),i=this.pos;if(t&&(t.style.clipPath=this.orientation==="horizontal"?`inset(0 0 0 ${i}%)`:`inset(${i}% 0 0 0)`),e){let s=this.orientation==="horizontal";e.style.left=s?`${i}%`:"",e.style.top=s?"":`${i}%`}}render(){return u`
      <div class="pane before"><slot name="before"></slot></div>
      <div class="pane after"><slot name="after"></slot></div>
      <div class="handle">
        <div
          class="knob"
          role="slider"
          tabindex="0"
          aria-label="Image comparison"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow=${Math.round(this.pos)}
          aria-orientation=${this.orientation}
          @keydown=${this.onKey}
        >
          <span aria-hidden="true">⇆</span>
        </div>
      </div>
    `}};a([l({type:Number,reflect:!0})],Ze.prototype,"start",void 0),a([l({type:String,reflect:!0})],Ze.prototype,"orientation",void 0),a([l({type:Number})],Ze.prototype,"bounce",void 0),a([l({type:Number})],Ze.prototype,"duration",void 0),a([D()],Ze.prototype,"pos",void 0),Ze=a([x("motion-image-compare")],Ze);var Oe=class extends w{constructor(...t){super(...t),this.trigger="hover",this.axis="y",this.duration=.7,this.bounce=.2,this.perspective=1e3,this.flipped=!1,this.scene=null,this.shown=!1,this.onEnter=()=>{this.trigger==="hover"&&this.applyFlip(!0)},this.onLeave=()=>{this.trigger==="hover"&&this.applyFlip(!1)},this.onClick=()=>{this.trigger==="click"&&this.applyFlip(!this.flipped)},this.onKey=e=>{this.trigger!=="click"||e.key!==" "&&e.key!=="Enter"||(e.preventDefault(),this.applyFlip(!this.flipped))}}get reduced(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}static{this.styles=v`
    :host {
      display: inline-block;
      position: relative;
    }
    .scene {
      position: relative;
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
      transform: rotateY(0.0001deg);
    }
    .face {
      position: absolute;
      inset: 0;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
    }
    .face.back {
      transform: rotateY(180deg);
    }
    :host([axis='x']) .face.back {
      transform: rotateX(180deg);
    }
    ::slotted(*) {
      display: block;
      width: 100%;
      height: 100%;
    }
  `}connectedCallback(){super.connectedCallback(),this.addEventListener("pointerenter",this.onEnter),this.addEventListener("pointerleave",this.onLeave),this.addEventListener("click",this.onClick),this.addEventListener("keydown",this.onKey)}firstUpdated(){this.scene=this.renderRoot.querySelector(".scene"),this.style.perspective=`${this.perspective}px`,this.shown=this.flipped,this.flipped&&(this.scene.style.transform=`${this.key}(180deg)`)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("pointerenter",this.onEnter),this.removeEventListener("pointerleave",this.onLeave),this.removeEventListener("click",this.onClick),this.removeEventListener("keydown",this.onKey)}updated(t){t.has("perspective")&&(this.style.perspective=`${this.perspective}px`),t.has("trigger")&&this.syncTrigger(t.get("trigger")),this.flipped!==this.shown&&this.turn(),this.trigger==="click"&&this.setAttribute("aria-pressed",String(this.flipped))}syncTrigger(t){this.trigger==="click"?(this.setAttribute("tabindex","0"),this.setAttribute("role","button")):t==="click"&&(this.removeAttribute("tabindex"),this.removeAttribute("role"),this.removeAttribute("aria-pressed"))}applyFlip(t){t===this.flipped||!this.scene||(this.flipped=t,this.turn(),this.dispatchEvent(new CustomEvent("motion-change",{detail:{flipped:t},bubbles:!0,composed:!0})))}get key(){return this.axis==="y"?"rotateY":"rotateX"}turn(){if(!this.scene)return;this.shown=this.flipped;let t=this.flipped?180:0;if(this.reduced){this.scene.style.transform=`${this.key}(${t}deg)`;return}f(this.scene,{[this.key]:t},{type:"spring",bounce:this.bounce,duration:this.duration})}flip(){this.applyFlip(!this.flipped)}render(){return u`
      <div class="scene">
        <div class="face front"><slot name="front"></slot></div>
        <div class="face back"><slot name="back"></slot></div>
      </div>
    `}};a([l({type:String,reflect:!0})],Oe.prototype,"trigger",void 0),a([l({type:String,reflect:!0})],Oe.prototype,"axis",void 0),a([l({type:Number})],Oe.prototype,"duration",void 0),a([l({type:Number})],Oe.prototype,"bounce",void 0),a([l({type:Number,reflect:!0})],Oe.prototype,"perspective",void 0),a([l({type:Boolean,converter:y,reflect:!0})],Oe.prototype,"flipped",void 0),Oe=a([x("motion-flip-card")],Oe);var io="--mc-_backdrop",de=class extends w{constructor(...t){super(...t),this.open=!1,this.duration=.5,this.bounce=.25,this.y=40,this.noBackdrop=!1,this.lightDismiss=!1,this.generation=0,this.onDocumentClick=e=>{if(!this.lightDismiss||!this.dialogEl?.open)return;let i=e.composedPath();if(i[0]!==this.dialogEl&&i.includes(this.dialogEl))return;let s=this.dialogEl.getBoundingClientRect();e.clientX>=s.left&&e.clientX<=s.right&&e.clientY>=s.top&&e.clientY<=s.bottom||(this.open=!1)},this.onCancel=e=>{e.preventDefault(),this.open=!1}}static{this.styles=v`
    :host {
      display: contents;
    }

    dialog {
      border: none;
      border-radius: var(--mc-dialog-radius, 16px);
      padding: var(--mc-dialog-padding, 2rem);
      max-width: var(--mc-dialog-max-width, min(560px, calc(100vw - 2rem)));
      max-height: var(--mc-dialog-max-height, calc(100dvh - 4rem));
      overflow: auto;
      background: var(--mc-dialog-bg, var(--mc-color-surface, Canvas));
      color: var(--mc-dialog-color, var(--mc-color-text, CanvasText));
      box-shadow: var(
        --mc-dialog-shadow,
        0 8px 32px rgba(0, 0, 0, 0.18),
        0 0 0 1px var(--mc-color-border, rgba(0, 0, 0, 0.08))
      );
      opacity: 0;
    }

    dialog::backdrop {
      background: var(--mc-dialog-backdrop-color, rgba(0, 0, 0, 0.48));
      backdrop-filter: var(--mc-dialog-backdrop-blur, blur(6px));
      -webkit-backdrop-filter: var(--mc-dialog-backdrop-blur, blur(6px));
      opacity: var(--mc-_backdrop, 1);
    }

    :host([no-backdrop]) dialog::backdrop {
      display: none;
    }
  `}get reduced(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this.onDocumentClick,!0)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this.onDocumentClick,!0)}updated(t){t.has("open")&&(this.open?this.animateIn():this.animateOut())}animateIn(){let t=this.dialogEl;if(!t)return;this.generation++;let e=t.open;if(e||(this.setBackdrop(0),t.showModal(),this.dispatchEvent(new CustomEvent("motion-open",{bubbles:!0,composed:!0}))),this.reduced){this.setBackdrop(1),t.style.opacity="1";return}f(t,{[io]:[this.backdrop,1]},{type:"spring",bounce:0,duration:this.duration}),f(t,e?{opacity:1,y:0}:{opacity:[0,1],y:[this.y,0]},{type:"spring",bounce:this.bounce,duration:this.duration})}async animateOut(){let t=this.dialogEl;if(!t||!t.open)return;let e=++this.generation;if(this.reduced)this.setBackdrop(0),t.style.opacity="0";else{let i=this.duration*.65;await Promise.all([f(t,{[io]:[this.backdrop,0]},{ease:"easeInOut",duration:i}),f(t,{opacity:0,y:this.y*.6},{opacity:{ease:"easeIn",duration:i*.7},y:{type:"spring",bounce:0,duration:i}})])}this.generation===e&&(t.close(),this.dispatchEvent(new Event("motion-close",{bubbles:!0,composed:!0})))}get backdrop(){return Number(this.dialogEl.style.getPropertyValue(io))||0}setBackdrop(t){this.dialogEl.style.setProperty(io,String(t))}show(){this.open=!0}close(){this.open=!1}render(){return u`
      <dialog @cancel=${this.onCancel}>
        <slot></slot>
      </dialog>
    `}};a([l({type:Boolean,converter:y,reflect:!0})],de.prototype,"open",void 0),a([l({type:Number})],de.prototype,"duration",void 0),a([l({type:Number})],de.prototype,"bounce",void 0),a([l({type:Number})],de.prototype,"y",void 0),a([l({type:Boolean,converter:y,attribute:"no-backdrop",reflect:!0})],de.prototype,"noBackdrop",void 0),a([l({type:Boolean,converter:y,attribute:"light-dismiss"})],de.prototype,"lightDismiss",void 0),a([at("dialog")],de.prototype,"dialogEl",void 0),de=a([x("motion-dialog")],de);var yh={light:{core:{scale:.56},cut:{x:14,y:-14},half:{x:12},ring:{opacity:0},rays:{scale:1,rotate:0,opacity:1},body:{rotate:0}},dark:{core:{scale:1},cut:{x:0,y:0},half:{x:12},ring:{opacity:0},rays:{scale:0,rotate:-90,opacity:0},body:{rotate:-30}},system:{core:{scale:.89},cut:{x:14,y:-14},half:{x:0},ring:{opacity:1},rays:{scale:0,rotate:90,opacity:0},body:{rotate:0}}},sd=Array.from({length:8},(t,e)=>{let i=e*Math.PI/4,s=p=>[12+Math.cos(i)*p,12+Math.sin(i)*p].map(c=>c.toFixed(2)),[r,o]=s(7.5),[n,h]=s(10);return O`<line x1=${r} y1=${o} x2=${n} y2=${h} />`}),rd=0,is=class extends w{constructor(...t){super(...t),this.mode="light",this.duration=.5,this.bounce=.25,this.maskId=`motion-theme-icon-${++rd}`}static{this.styles=v`
    :host {
      display: inline-block;
      width: var(--mc-theme-icon-size, 1.5em);
      height: var(--mc-theme-icon-size, 1.5em);
      line-height: 0;
    }
    svg {
      width: 100%;
      height: 100%;
      overflow: visible;
    }
    .core,
    .cut,
    .half,
    .rays,
    .body {
      transform-box: fill-box;
      transform-origin: center;
    }
    .rays {
      transform-box: view-box;
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
    }
    .ring {
      fill: none;
      stroke: currentColor;
      stroke-width: 1.5;
    }
  `}get reduced(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}updated(t){if(!t.has("mode"))return;let e=t.get("mode")===void 0||this.reduced;this.pose(yh[this.mode]??yh.light,e)}pose(t,e){let i=e?{duration:0}:{type:"spring",duration:this.duration,bounce:this.bounce};for(let[s,r]of Object.entries(t)){let o=this.renderRoot.querySelector(`.${s}`);o&&f(o,r,i)}}render(){return u`
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
        <defs>
          <mask id=${this.maskId}>
            <rect x="-6" y="-6" width="36" height="36" fill="white" />
            <circle class="cut" cx="16" cy="8" r="8" fill="black" />
            <rect class="half" x="12" y="-6" width="18" height="36" fill="black" />
          </mask>
        </defs>
        <g class="body">
          <circle class="core" cx="12" cy="12" r="9" mask="url(#${this.maskId})" />
          <circle class="ring" cx="12" cy="12" r="8" />
        </g>
        <g class="rays">${sd}</g>
      </svg>
    `}};a([l({type:String,reflect:!0})],is.prototype,"mode",void 0),a([l({type:Number})],is.prototype,"duration",void 0),a([l({type:Number})],is.prototype,"bounce",void 0),is=a([x("motion-theme-icon")],is);var gh="motion-theme",od="(prefers-color-scheme: dark)",nd='link[rel~="stylesheet"][media*="prefers-color-scheme"], link[data-motion-theme-media]',Cn=()=>window.matchMedia(od),ro=()=>Cn().matches?"dark":"light",Mn=t=>t==="light"||t==="dark"||t==="system",ad=t=>t==="system"?ro():t,so=t=>{let e=t.trim();return!e||e==="html"||e===":root"?gh:`${gh}:${e}`};function ld(t){try{let e=localStorage.getItem(t);return Mn(e)?e:null}catch{return null}}function vh(t,e){try{e?localStorage.setItem(t,e):localStorage.removeItem(t)}catch{return}}function bh(t){return t&&document.querySelector(t)||document.documentElement}var hd=t=>{let e=t.dataset.theme;return e==="light"||e==="dark"?e:null};function pd(t,e){t.dataset.theme=e,t.style.colorScheme=e,t===document.documentElement&&cd(e)}function cd(t){for(let e of document.querySelectorAll(nd)){let i=e.dataset.motionThemeMedia??=e.media;e.media=(/prefers-color-scheme:\s*dark/.test(i)?"dark":"light")===t?"all":"not all"}}var xh=["light","dark","system"],En=new Set,dd=0,Z=class extends w{constructor(...t){super(...t),this.mode="light",this.appearance="icon",this.system=!1,this.permanent=!1,this.legend="",this.light="Light",this.dark="Dark",this.systemLabel="System",this.remember="",this.target="html",this.wipe=!1,this.iconOnly=!1,this.duration=.5,this.bounce=.25,this.scheme="light",this.open=!1,this.uid=`motion-theme-toggle-${++dd}`,this.committed=!1,this.silent=!1,this.emitted="",this.menuGeneration=0,this.layout=null,this.onSystemChange=()=>{this.mode==="system"?this.requestUpdate():this.permanent||(this.mode=ro())},this.onStorage=e=>{e.key===so(this.target)&&(Mn(e.newValue)?(this.permanent=!0,this.mode=e.newValue):this.permanent=!1)},this.onOutside=e=>{this.open&&!e.composedPath().includes(this)&&(this.open=!1)},this.cycle=()=>{let e=this.modes;this.select(e[(e.indexOf(this.mode)+1)%e.length])},this.flip=()=>this.select(this.scheme==="dark"?"light":"dark"),this.onRadio=e=>this.select(e.target.value),this.onRemember=e=>this.permanent=e.target.checked,this.toggleMenu=()=>this.open=!this.open,this.onItem=e=>{this.select(e.currentTarget.dataset.mode),this.closeMenu(!0)},this.onTriggerKey=e=>{e.key!=="ArrowDown"&&e.key!=="ArrowUp"||(e.preventDefault(),this.open=!0)},this.onMenuKey=e=>{let i=this.items(),s=i.indexOf(e.target),r=o=>i[(o+i.length)%i.length]?.focus();if(e.key==="Tab")return void(this.open=!1);if(e.key==="ArrowDown")r(s+1);else if(e.key==="ArrowUp")r(s-1);else if(e.key==="Home")r(0);else if(e.key==="End")r(i.length-1);else if(e.key==="Escape")this.closeMenu(!0);else return;e.preventDefault()}}static{this.styles=v`
    :host {
      display: inline-block;
      position: relative;
      --mc-_toggle-surface: var(
        --mc-theme-toggle-surface,
        color-mix(in srgb, currentColor 6%, transparent)
      );
      --mc-_toggle-border: var(
        --mc-theme-toggle-border,
        color-mix(in srgb, currentColor 16%, transparent)
      );
      --mc-_toggle-accent: var(
        --mc-theme-toggle-accent,
        color-mix(in srgb, currentColor 14%, transparent)
      );
      --mc-_toggle-radius: var(--mc-theme-toggle-radius, 999px);
      --mc-theme-icon-size: 1.25em;
    }
    .root {
      display: inline-flex;
      align-items: center;
      gap: 0.75em;
    }
    button {
      font: inherit;
      color: inherit;
      background: none;
      border: 0;
      padding: 0;
      cursor: pointer;
    }
    button:focus-visible,
    .segment:has(input:focus-visible) {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }
    .icon-button,
    .trigger {
      display: grid;
      place-items: center;
      width: 2.5em;
      height: 2.5em;
      border-radius: var(--mc-_toggle-radius);
    }
    .trigger {
      background: var(--mc-_toggle-surface);
      box-shadow: inset 0 0 0 1px var(--mc-_toggle-border);
    }
    fieldset {
      border: 0;
      margin: 0;
      padding: 0;
      min-width: 0;
    }
    legend,
    .label {
      font-size: 0.875em;
      padding: 0;
      margin-bottom: 0.5em;
    }
    .segments {
      position: relative;
      display: inline-flex;
      padding: 3px;
      border-radius: var(--mc-_toggle-radius);
      background: var(--mc-_toggle-surface);
      box-shadow: inset 0 0 0 1px var(--mc-_toggle-border);
    }
    .indicator {
      position: absolute;
      top: 3px;
      bottom: 3px;
      left: 0;
      width: 0;
      border-radius: var(--mc-_toggle-radius);
      background: var(--mc-_toggle-accent);
    }
    .segment {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 0.4em;
      padding: 0.4em 0.85em;
      border-radius: var(--mc-_toggle-radius);
      cursor: pointer;
      user-select: none;
    }
    :host([icon-only]) .segment {
      padding: 0.45em 0.6em;
    }
    .visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }
    .segment input,
    .remember input:not(:focus-visible) {
      position: absolute;
      opacity: 0;
      pointer-events: none;
    }
    .switch {
      display: inline-flex;
      align-items: center;
      gap: 0.6em;
    }
    .switch .label {
      margin: 0;
      font-weight: 600;
    }
    .side {
      font-size: 0.875em;
    }
    .track {
      position: relative;
      width: 3.5em;
      height: 2em;
      border-radius: var(--mc-_toggle-radius);
      background: var(--mc-_toggle-surface);
      box-shadow: inset 0 0 0 1px var(--mc-_toggle-border);
    }
    .thumb {
      position: absolute;
      top: 3px;
      left: 3px;
      display: grid;
      place-items: center;
      width: calc(2em - 6px);
      height: calc(2em - 6px);
      border-radius: var(--mc-_toggle-radius);
      background: var(--mc-_toggle-accent);
      --mc-theme-icon-size: 1em;
    }
    .menu {
      position: relative;
    }
    .panel {
      position: absolute;
      top: calc(100% + 6px);
      inset-inline-end: 0;
      z-index: 10;
      display: grid;
      min-width: 10em;
      padding: 4px;
      border-radius: 12px;
      background: var(--mc-theme-toggle-menu-bg, Canvas);
      box-shadow:
        0 8px 24px rgba(0, 0, 0, 0.16),
        0 0 0 1px var(--mc-_toggle-border);
      transform-origin: top right;
    }
    .panel[hidden] {
      display: none;
    }
    .item {
      display: flex;
      align-items: center;
      gap: 0.6em;
      padding: 0.5em 0.75em;
      border-radius: 8px;
      text-align: start;
    }
    .item:hover,
    .item:focus-visible {
      background: var(--mc-_toggle-surface);
      outline: none;
    }
    .item[aria-checked='true'] {
      background: var(--mc-_toggle-accent);
    }
    .remember {
      display: inline-flex;
      align-items: center;
      gap: 0.4em;
      font-size: 0.875em;
      cursor: pointer;
    }
    .remember input {
      position: static;
      opacity: 1;
      pointer-events: auto;
      margin: 0;
    }
  `}get reduced(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}get spring(){return this.reduced?{duration:0}:{type:"spring",duration:this.duration,bounce:this.bounce}}get modes(){return this.system&&this.appearance!=="switch"?xh:xh.slice(0,2)}connectedCallback(){super.connectedCallback();let t=ld(so(this.target));t?(this.mode=t,this.permanent=!0):this.hasAttribute("mode")||(this.mode=this.system?"system":ro()),En.add(this),Cn().addEventListener("change",this.onSystemChange),window.addEventListener("storage",this.onStorage),this.hasUpdated&&this.observeLayout(),document.addEventListener("pointerdown",this.onOutside,!0)}disconnectedCallback(){super.disconnectedCallback(),this.layout?.disconnect(),En.delete(this),Cn().removeEventListener("change",this.onSystemChange),window.removeEventListener("storage",this.onStorage),document.removeEventListener("pointerdown",this.onOutside,!0)}willUpdate(){Mn(this.mode)||(this.mode="light"),this.mode==="system"&&!this.modes.includes("system")&&(this.mode=ro()),this.scheme=ad(this.mode)}firstUpdated(){this.panel&&f(this.panel,{opacity:0,y:-4,scale:.96},{duration:0})}updated(t){(t.has("appearance")||t.has("system"))&&this.observeLayout(),(t.has("mode")||t.has("scheme")||t.has("target"))&&this.commit(),t.has("permanent")&&t.get("permanent")!==void 0&&this.persist(),t.has("open")&&this.animateMenu(),this.animateSelection(!t.has("appearance")||t.get("appearance")!==void 0)}observeLayout(){this.layout??=new ResizeObserver(()=>this.animateSelection(!1));for(let t of this.renderRoot.querySelectorAll(".segments, .track"))this.layout.observe(t)}commit(){if(this.silent)this.silent=!1;else{this.committed&&this.permanent&&vh(so(this.target),this.mode);let e=bh(this.target),i=()=>pd(e,this.scheme);if(this.committed&&hd(e)!==this.scheme&&this.canWipe()?this.reveal(i):i(),this.committed)for(let s of En)s===this||s.mode===this.mode||bh(s.target)!==e||(s.silent=!0,s.mode=this.mode)}this.committed=!0;let t=`${this.mode}:${this.scheme}`;t!==this.emitted&&(this.emitted=t,this.dispatchEvent(new CustomEvent("colorschemechange",{detail:{colorScheme:this.scheme,mode:this.mode},bubbles:!0,composed:!0})))}persist(){vh(so(this.target),this.permanent?this.mode:null),this.dispatchEvent(new CustomEvent("permanentcolorschemechange",{detail:{permanent:this.permanent},bubbles:!0,composed:!0}))}canWipe(){return this.wipe&&!this.reduced&&"startViewTransition"in document&&document.visibilityState==="visible"}reveal(t){let e=this.getBoundingClientRect(),i=e.left+e.width/2,s=e.top+e.height/2,r=Math.hypot(Math.max(i,innerWidth-i),Math.max(s,innerHeight-s));pn(t,{interrupt:"immediate"}).new({clipPath:[`circle(0px at ${i}px ${s}px)`,`circle(${r}px at ${i}px ${s}px)`]},{type:"spring",duration:this.duration,bounce:0})}animateMenu(){let t=this.panel;if(!t)return;let e=++this.menuGeneration;if(this.open){t.hidden=!1,this.items().find(i=>i.getAttribute("aria-checked")==="true")?.focus(),f(t,{opacity:1,y:0,scale:1},this.spring);return}f(t,{opacity:0,y:-4,scale:.96},{...this.spring,bounce:0}).then(()=>{e===this.menuGeneration&&(t.hidden=!0)})}animateSelection(t){let e=t?this.spring:{duration:0};if(this.indicator){let i=this.renderRoot.querySelector(`.segment-wrap[data-mode='${this.mode}']`);i&&f(this.indicator,{x:i.offsetLeft,width:i.offsetWidth},e)}if(this.track&&this.thumb){let i=this.track.clientWidth-this.thumb.offsetWidth-this.thumb.offsetLeft*2;f(this.thumb,{x:this.scheme==="dark"?i:0},e)}}select(t){this.modes.includes(t)&&(this.mode=t)}items(){return[...this.renderRoot.querySelectorAll(".item")]}closeMenu(t){this.open=!1,t&&this.trigger?.focus()}labelFor(t){return t==="light"?this.light:t==="dark"?this.dark:this.systemLabel}icon(t){return u`<motion-theme-icon
      mode=${t}
      duration=${this.duration}
      bounce=${this.bounce}
    ></motion-theme-icon>`}renderIcon(){let t=this.legend||"Theme",e=this.system?u`<button
          class="icon-button"
          part="button"
          aria-label="${t}: ${this.labelFor(this.mode)}"
          @click=${this.cycle}
        >
          ${this.icon(this.mode)}
        </button>`:u`<button
          class="icon-button"
          part="button"
          role="switch"
          aria-checked=${this.scheme==="dark"}
          aria-label=${this.legend||this.dark}
          @click=${this.cycle}
        >
          ${this.icon(this.mode)}
        </button>`;return u`<motion-hover scale="1.08" bounce=${this.bounce}
      ><motion-press>${e}</motion-press></motion-hover
    >`}renderToggle(){return u`
      <fieldset aria-label=${this.legend?k:"Theme"}>
        ${this.legend?u`<legend>${this.legend}</legend>`:k}
        <div class="segments">
          <span class="indicator"></span>
          ${this.modes.map(t=>u`
              <motion-press class="segment-wrap" data-mode=${t}>
                <label
                  class="segment"
                  part="segment"
                  title=${this.iconOnly?this.labelFor(t):k}
                >
                  <input
                    type="radio"
                    name=${this.uid}
                    .value=${t}
                    .checked=${t===this.mode}
                    @change=${this.onRadio}
                  />
                  ${this.icon(t)}
                  <span class=${this.iconOnly?"visually-hidden":""}
                    >${this.labelFor(t)}</span
                  >
                </label>
              </motion-press>
            `)}
        </div>
      </fieldset>
    `}renderSwitch(){return u`
      <div class="switch">
        ${this.legend?u`<span class="label" id="${this.uid}-label">${this.legend}</span>`:k}
        <span class="side" aria-hidden="true">${this.light}</span>
        <motion-press>
          <button
            class="track"
            part="track"
            role="switch"
            aria-checked=${this.scheme==="dark"}
            aria-label=${this.legend?k:this.dark}
            aria-labelledby=${this.legend?`${this.uid}-label`:k}
            @click=${this.flip}
          >
            <span class="thumb" part="thumb">${this.icon(this.scheme)}</span>
          </button>
        </motion-press>
        <span class="side" aria-hidden="true">${this.dark}</span>
      </div>
    `}renderMenu(){let t=this.legend||"Theme";return u`
      <div class="menu">
        <motion-hover scale="1.05" bounce=${this.bounce}>
          <motion-press>
            <button
              class="trigger"
              part="button"
              aria-haspopup="menu"
              aria-expanded=${this.open}
              aria-controls="${this.uid}-menu"
              aria-label="${t}: ${this.labelFor(this.mode)}"
              @click=${this.toggleMenu}
              @keydown=${this.onTriggerKey}
            >
              ${this.icon(this.mode)}
            </button>
          </motion-press>
        </motion-hover>
        <div
          class="panel"
          part="menu"
          role="menu"
          id="${this.uid}-menu"
          aria-label=${t}
          hidden
          @keydown=${this.onMenuKey}
        >
          ${this.modes.map(e=>u`
              <button
                class="item"
                part="item"
                role="menuitemradio"
                tabindex="-1"
                data-mode=${e}
                aria-checked=${e===this.mode}
                @click=${this.onItem}
              >
                ${this.icon(e)}
                <span>${this.labelFor(e)}</span>
              </button>
            `)}
        </div>
      </div>
    `}renderRemember(){return this.remember?u`
      <label class="remember">
        <input type="checkbox" .checked=${this.permanent} @change=${this.onRemember} />
        ${this.remember}
      </label>
    `:k}render(){return u`<div class="root">${this.appearance==="toggle"?this.renderToggle():this.appearance==="switch"?this.renderSwitch():this.appearance==="menu"?this.renderMenu():this.renderIcon()}${this.renderRemember()}</div>`}};a([l({type:String,reflect:!0})],Z.prototype,"mode",void 0),a([l({type:String,reflect:!0})],Z.prototype,"appearance",void 0),a([l({type:Boolean,converter:y,reflect:!0})],Z.prototype,"system",void 0),a([l({type:Boolean,converter:y,reflect:!0})],Z.prototype,"permanent",void 0),a([l({type:String})],Z.prototype,"legend",void 0),a([l({type:String})],Z.prototype,"light",void 0),a([l({type:String})],Z.prototype,"dark",void 0),a([l({type:String,attribute:"system-label"})],Z.prototype,"systemLabel",void 0),a([l({type:String})],Z.prototype,"remember",void 0),a([l({type:String})],Z.prototype,"target",void 0),a([l({type:Boolean,converter:y,reflect:!0})],Z.prototype,"wipe",void 0),a([l({type:Boolean,converter:y,attribute:"icon-only",reflect:!0})],Z.prototype,"iconOnly",void 0),a([l({type:Number})],Z.prototype,"duration",void 0),a([l({type:Number})],Z.prototype,"bounce",void 0),a([D()],Z.prototype,"scheme",void 0),a([D()],Z.prototype,"open",void 0),a([at(".panel")],Z.prototype,"panel",void 0),a([at(".trigger")],Z.prototype,"trigger",void 0),a([at(".indicator")],Z.prototype,"indicator",void 0),a([at(".track")],Z.prototype,"track",void 0),a([at(".thumb")],Z.prototype,"thumb",void 0),Z=a([x("motion-theme-toggle")],Z);var md="path, line, polyline, polygon, circle, rect, ellipse",ud=new Set(["pop","bounce","rotate","wiggle","pulse","slide-up","slide-down","slide-left","slide-right"]),wh={"slide-up":[0,-1],"slide-down":[0,1],"slide-left":[-1,0],"slide-right":[1,0]};function fd(t){let e=getComputedStyle(t).transform;if(!e||e==="none")return{x:0,y:0,scale:1,rotate:0};let{a:i,b:s,e:r,f:o}=new DOMMatrixReadOnly(e);return{x:r,y:o,scale:Math.hypot(i,s),rotate:Math.atan2(s,i)*180/Math.PI}}var yd=new Set("svg g path line polyline polygon circle rect ellipse defs use symbol clippath mask lineargradient radialgradient stop title desc".split(" "));function gd(t){return t.replace(/\\([0-9a-f]{1,6})\s?|\\([\s\S])/gi,(e,i,s)=>{if(!i)return s;let r=parseInt(i,16);return r&&r<=1114111?String.fromCodePoint(r):"\uFFFD"})}function vd(t,e){if(/^on/i.test(t)||t.toLowerCase()==="style")return!0;if(/(^|:)href$/i.test(t))return!e.trim().startsWith("#");let i=gd(e);return/javascript:|image(-set)?\(/i.test(i)||/url\(\s*['"]?\s*[^'"\s#]/i.test(i)}function bd(t){let e=/<svg[^>]*\sxmlns=/.test(t)?t.trim():t.trim().replace(/<svg/,'<svg xmlns="http://www.w3.org/2000/svg"'),i=new DOMParser().parseFromString(e,"image/svg+xml"),s=i.documentElement;if(s.localName!=="svg"||i.querySelector("parsererror"))return null;for(let r of[...s.querySelectorAll("*")])yd.has(r.localName.toLowerCase())||r.remove();for(let r of[s,...s.querySelectorAll("*")])for(let o of[...r.attributes])vd(o.name,o.value)&&r.removeAttribute(o.name);return s.hasAttribute("fill")||s.setAttribute("fill","currentColor"),s.removeAttribute("width"),s.removeAttribute("height"),document.importNode(s,!0)}function xd(t,e){for(let i=t;i;i=i===e?null:i.parentElement){let s=i.style.stroke||i.getAttribute("stroke");if(s)return s}return null}var Tn=new Map;function wd(t){let e=Tn.get(t);return e||(e=fetch(t).then(i=>{if(!i.ok)throw Error(`${i.status} ${t}`);return i.text()}),e.catch(()=>Tn.delete(t)),Tn.set(t,e)),e}var It=class extends M(w){constructor(...t){super(...t),this.src="",this.icon="",this.animation="draw",this.trigger="hover",this.duration=.6,this.bounce=.4,this.delay=0,this.interval=1.2,this.once=!0,this.label="",this.markup="",this.target=this,this.svg=null,this.strokes=[],this.disconnectIntersect=null,this.hovering=!1,this.keepPose=!1,this.playback=new C(this,{start:()=>this.trigger==="loop"?{handle:this.cycle.start()}:this.runOnce(),applyFinalState:()=>{this.cycle.stop(),this.settle()},applyInitialState:()=>{this.keepPose||(this.cycle.stop(),this.startsHidden?this.hide():this.settle())}}),this.cycle=new ut({leg:e=>e?null:this.runOnce(),gap:()=>this.interval}),this.onSlotChange=()=>{this.markup||this.setup()},this.onHover=()=>{this.hovering=!0,this.trigger==="hover"&&this.restart()},this.onLeave=()=>{this.hovering=!1,this.holdsSlide&&this.restart()},this.onClick=()=>{this.trigger==="click"&&this.restart()}}static{this.styles=v`
    :host {
      display: inline-block;
      width: var(--mc-icon-size, 1.5em);
      height: var(--mc-icon-size, 1.5em);
      color: var(--mc-icon-color, inherit);
      line-height: 0;
      vertical-align: middle;
    }
    .icon,
    ::slotted(svg) {
      width: 100%;
      height: 100%;
    }
    .icon:not(:empty) + slot {
      display: none;
    }
    .icon svg,
    ::slotted(svg) {
      width: 100%;
      height: 100%;
      overflow: visible;
      transform-origin: 50% 50%;
    }
  `}get parts(){let t=this.animation.trim().split(/\s+/),e=t.find(s=>ud.has(s))??null,i=t.includes("draw")&&this.strokes.length>0;return{draw:i,motion:e??(i?null:"pop")}}get startsHidden(){return this.parts.draw&&(this.trigger==="view"||this.trigger==="mount"||this.trigger==="loop")}runOnce(){if(!this.svg)return{handle:{pause(){},resume(){},finish(){},cancel(){}},done:Promise.resolve()};let t=this.run();return{handle:{...wi(t),cancel:()=>this.keepPose?t.stop():t.cancel()},done:t}}connectedCallback(){super.connectedCallback(),this.target=this.closest('button, a, summary, [role="button"]')??this,this.target.addEventListener("pointerenter",this.onHover),this.target.addEventListener("pointerleave",this.onLeave),this.target.addEventListener("click",this.onClick),this.hasUpdated&&this.setup()}disconnectedCallback(){super.disconnectedCallback(),this.target.removeEventListener("pointerenter",this.onHover),this.target.removeEventListener("pointerleave",this.onLeave),this.target.removeEventListener("click",this.onClick),this.disconnectIntersect?.(),this.cycle.stop()}updated(t){t.has("label")&&this.applyLabel(),t.has("icon")||t.has("src")?this.load():(t.has("animation")||t.has("trigger"))&&this.setup()}async load(){let{icon:t,src:e}=this;if(t||!e)return this.setup(t);let i=await wd(e).catch(()=>(this.dispatchEvent(new Event("error")),""));this.icon===t&&this.src===e&&this.setup(i)}applyLabel(){this.label?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}setup(t=this.markup){this.markup=t,this.disconnectIntersect?.(),this.disconnectIntersect=null,this.cycle.stop();let e=this.renderRoot.querySelector(".icon");if(t&&e){let i=bd(t);e.replaceChildren(...i?[i]:[]),this.svg=i}else e?.replaceChildren(),this.svg=this.querySelector("svg");this.svg?.getAttribute("fill")==="none"&&(this.svg.style.fill="var(--mc-icon-fill, none)"),this.strokes=this.svg?this.findStrokes(this.svg):[];for(let i of this.strokes)i.setAttribute("pathLength","1"),i.style.strokeDasharray="1";this.cancel(),this.startsHidden?this.hide():this.settle(),this.svg&&((this.trigger==="mount"||this.trigger==="loop")&&this.play(),this.trigger==="view"&&(this.disconnectIntersect=Bt(this,.4,()=>{this.playState==="idle"&&(this.play(),this.once&&this.disconnectIntersect?.())},()=>{!this.once&&this.playState!=="idle"&&this.cancel()})))}findStrokes(t){return[...t.querySelectorAll(md)].filter(e=>{let i=xd(e,t)??getComputedStyle(e).stroke;return!!i&&i!=="none"})}get holdsSlide(){return this.trigger==="hover"&&this.parts.motion?.startsWith("slide-")}run(){let t=this.svg,{draw:e,motion:i}=this.parts,s=this.holdsSlide&&!this.hovering;return f([...e&&!s?this.draw(t):[],...i?this.move(t,i):[]],{delay:this.delay})}get spring(){return{type:"spring",duration:this.duration,bounce:this.bounce}}draw(t){let e=this.duration*.3,i=this.strokes.some(o=>Number(o.style.strokeDashoffset||0)<.999),s=i?e:0,r=[];if(i){for(let n of this.strokes){let h=Number(n.style.strokeDashoffset||0);r.push([n,{strokeDashoffset:[h,1]},{duration:e,ease:"easeIn",at:0}])}let o=Number(getComputedStyle(t).fillOpacity);r.push([t,{fillOpacity:[o,0]},{duration:e,at:0}])}return this.strokes.forEach((o,n)=>{r.push([o,{strokeDashoffset:[1,0]},{type:"spring",bounce:0,duration:this.duration,at:s+Lt(this.duration*.12)(n,this.strokes.length)}])}),r.push([t,{fillOpacity:[0,1]},{duration:this.duration*.6,at:s+this.duration*.5}]),r}move(t,e){let i=fd(t),s=t.getBoundingClientRect().height||24,r=(h,p,c)=>[t,{[h]:[p,c]},{type:"spring",bounce:0,duration:this.duration*.35,at:0}],o=(h,p,c=this.bounce)=>[t,{[h]:[p,h==="scale"?1:0]},{type:"spring",duration:this.duration,bounce:c}],n=(h,p,c)=>[[t,{[h]:[p,c]},{type:"spring",duration:this.duration,bounce:this.bounce,at:0}]];if(e in wh){let[h,p]=wh[e],c=h?"x":"y",d=h?i.x:i.y,m=(h||p)*s*.25;return this.holdsSlide?n(c,d,this.hovering?m:0):[r(c,d,m),o(c,m)]}return e==="pop"?[r("scale",i.scale,.7),o("scale",.7)]:e==="bounce"?[r("y",i.y,-s*.3),o("y",-s*.3)]:e==="rotate"?n("rotate",(i.rotate+360)%360,360):e==="wiggle"?[r("rotate",i.rotate,-14),o("rotate",-14,Math.max(this.bounce,.6))]:[r("scale",i.scale,1.18),o("scale",1.18)]}restart(){(this.playState==="running"||this.playState==="paused")&&(this.keepPose=!0,this.cancel(),this.keepPose=!1),this.play()}hide(){for(let t of this.strokes)t.style.strokeDashoffset="1";this.svg&&(this.svg.style.fillOpacity="0")}settle(){for(let t of this.strokes)t.style.strokeDashoffset="0";this.svg&&(this.svg.style.transform="",this.svg.style.fillOpacity="")}replay(){this.cancel(),this.play()}render(){return u`<span class="icon" part="icon"></span
      ><slot @slotchange=${this.onSlotChange}></slot>`}};a([l({type:String})],It.prototype,"src",void 0),a([l({type:String})],It.prototype,"icon",void 0),a([l({type:String,reflect:!0})],It.prototype,"animation",void 0),a([l({type:String,reflect:!0})],It.prototype,"trigger",void 0),a([l({type:Number})],It.prototype,"duration",void 0),a([l({type:Number})],It.prototype,"bounce",void 0),a([l({type:Number})],It.prototype,"delay",void 0),a([l({type:Number})],It.prototype,"interval",void 0),a([l({type:Boolean,converter:y})],It.prototype,"once",void 0),a([l({type:String})],It.prototype,"label",void 0),It=a([x("motion-icon")],It);var kh=!1,Sh=class extends Qt{connectedCallback(){super.connectedCallback(),!kh&&(kh=!0,console.warn("<motion-state-icon> is now <motion-icon-state>. The old name still works and will be removed in 2.0."))}};ye("motion-state-icon",Sh);var Ln=t=>t.split(",").map(e=>e.trim()).filter(e=>e!==""),kd=/[-+]?(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?(?:e[-+]?\d+)?|[-+]?\.\d+/i,$h=t=>{let e=t.replace(/\u2212/g,"-").match(kd),i=e?Number(e[0].replace(/,/g,"")):NaN;return Number.isFinite(i)?i:0};function ss(t,e="",i=""){let s=t.split(";").map(h=>Ln(h).map($h)).filter(h=>h.length),r=Math.max(0,...s.map(h=>h.length)),o=Ln(e),n=Ln(i);return{labels:Array.from({length:r},(h,p)=>o[p]??String(p+1)),series:s.map((h,p)=>({name:n[p]??"",values:Array.from({length:r},(c,d)=>h[d]??0)}))}}function oo(t){let e=[...t.rows].map(p=>[...p.cells]);if(!e.length)return{labels:[],series:[]};let i=e[0],s=!!t.tHead||i.every(p=>p.localName==="th")||i.slice(1).every(p=>!/\d/.test(p.textContent??"")),r=p=>p?.textContent?.trim()??"",o=p=>$h(p?.dataset.value??r(p)),n=s?e.slice(1):e,h=Math.max(0,...n.map(p=>p.length));return{labels:n.map(p=>r(p[0])),series:Array.from({length:Math.max(0,h-1)},(p,c)=>({name:s?r(i[c+1]):"",values:n.map(d=>o(d[c+1]))}))}}function Ah(t,e,i=4){e<=t&&(e=t+1);let s=(e-t)/i,r=10**Math.floor(Math.log10(s)),o=s/r,n=(o>=Math.sqrt(50)?10:o>=Math.sqrt(10)?5:o>=Math.sqrt(2)?2:1)*r,h=Math.floor(t/n+1e-9)*n,p=Math.ceil(e/n-1e-9)*n,c=[];for(let d=0;h+d*n<=p+n/2;d++)c.push(Number((h+d*n).toFixed(10)));return{min:h,max:p,ticks:c}}function rs(t){let[e,i]=t.split(":").map(r=>r.trim()),s=e==="compact"?{notation:"compact"}:e==="percent"?{style:"unit",unit:"percent"}:e==="currency"?{style:"currency",currency:i||"USD"}:e==="unit"?{style:"unit",unit:i}:{};try{let r=new Intl.NumberFormat(void 0,{maximumFractionDigits:2,trailingZeroDisplay:"stripIfInteger",...s});return o=>r.format(o)}catch{let r=new Intl.NumberFormat(void 0,{maximumFractionDigits:2});return o=>r.format(o)}}var ie=class{constructor(t){this.onChange=t,this.current=[],this.targets=[],this.runs=[],this.batch=0,this.waiters=[]}set(t){this.stop(),this.current=[...t],this.targets=[...t],this.onChange(),this.release()}to(t,e){this.stop();let i=++this.batch;this.targets=[...t],this.current.length=t.length,this.runs=t.map((s,r)=>f(this.current[r]??0,s,{...e(r),onUpdate:o=>{this.current[r]=o,this.onChange()}})),Promise.all(this.runs).then(()=>{i===this.batch&&(this.runs=[],this.release())},()=>{})}settled(){return this.runs.length?new Promise(t=>this.waiters.push(t)):Promise.resolve()}pause(){this.runs.forEach(t=>t.pause())}resume(){this.runs.forEach(t=>t.play())}stop(){this.runs.forEach(t=>t.stop()),this.runs=[]}release(){this.waiters.splice(0).forEach(t=>t())}};var me=t=>`var(--mc-chart-${t+1}, var(--mc-_chart-palette-${t+1}))`,no=v`
  :host {
    --mc-_chart-palette-1: light-dark(#2a78d6, #3987e5);
    --mc-_chart-palette-2: light-dark(#eb6834, #d95926);
    --mc-_chart-palette-3: light-dark(#1baf7a, #199e70);
    --mc-_chart-palette-4: light-dark(#eda100, #c98500);
    --mc-_chart-palette-5: light-dark(#e87ba4, #d55181);
    --mc-_chart-palette-6: light-dark(#008300, #008300);
    --mc-_chart-palette-7: light-dark(#4a3aa7, #9085e9);
    --mc-_chart-palette-8: light-dark(#e34948, #e66767);
    --mc-_chart-muted: color-mix(in srgb, currentColor 62%, transparent);
    --mc-_chart-grid: color-mix(in srgb, currentColor 12%, transparent);
    display: block;
    height: var(--mc-chart-height, 16rem);
  }
  .frame {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .legend {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem 1rem;
    margin-bottom: 0.75rem;
    font-size: 0.8em;
  }
  .key {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
  }
  .swatch {
    width: 10px;
    height: 10px;
    border-radius: 2px;
    background: var(--mc-_chart-series);
  }
  .plot {
    position: relative;
    flex: 1;
    min-height: 0;
    outline: none;
    border-radius: 6px;
  }
  .plot:focus-visible {
    box-shadow: 0 0 0 2px currentColor;
  }
  svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: visible;
  }
  .tip {
    position: absolute;
    top: 0;
    left: 0;
    min-width: 6rem;
    padding: 0.5rem 0.65rem;
    border-radius: 8px;
    background: var(--mc-chart-surface, Canvas);
    box-shadow:
      0 0 0 1px var(--mc-_chart-grid),
      0 6px 20px rgb(0 0 0 / 0.12);
    font-size: 0.8em;
    pointer-events: none;
    opacity: 0;
    white-space: nowrap;
  }
  .tip-label {
    color: var(--mc-_chart-muted);
    margin-bottom: 0.25rem;
  }
  .row {
    display: flex;
    align-items: center;
    gap: 0.45rem;
  }
  .row i {
    width: 12px;
    height: 2px;
    border-radius: 1px;
    background: var(--mc-_chart-series);
  }
  .row span {
    color: var(--mc-_chart-muted);
  }
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
`;var Sd=8,$d=24,_n=2,Ad=4,Eh=6.5,Wt={top:10,right:8,bottom:24},Ed=16,On=()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches;function Cd(t,e,i,s){let r=Math.min(Ad,e/2,Math.abs(i-s)),o=s<i?1:-1;return`M${t} ${i}V${s+o*r}Q${t} ${s} ${t+r} ${s}H${t+e-r}Q${t+e} ${s} ${t+e} ${s+o*r}V${i}Z`}var rt=class extends M(w){constructor(...t){super(...t),this.type="bar",this.values="",this.labels="",this.series="",this.data=null,this.min=NaN,this.max=NaN,this.format="",this.trigger="view",this.duration=.8,this.bounce=.25,this.interval=.04,this.tooltip=!0,this.legend=!0,this.label="",this.animateScale=!0,this.model={labels:[],series:[]},this.active=-1,this.size={width:0,height:0},this.springs=new ie(()=>this.requestUpdate()),this.draw=new ie(()=>this.requestUpdate()),this.domain=new ie(()=>this.requestUpdate()),this.scaleFrom=null,this.fmt=rs(""),this.announcement="",this.tipShown=!1,this.resizer=null,this.mutations=null,this.disconnectIntersect=null,this.playback=new C(this,{start:()=>(this.type==="bar"?(this.draw.set([1]),this.springs.to(this.targets(),e=>({...this.spring(),delay:e%Math.max(1,this.model.labels.length)*this.interval}))):(this.springs.set(this.targets()),this.draw.to([1],()=>({type:"spring",bounce:0,duration:this.duration*1.6}))),{handle:{pause:()=>(this.springs.pause(),this.draw.pause()),resume:()=>(this.springs.resume(),this.draw.resume()),finish:()=>this.showFinal(),cancel:()=>(this.springs.stop(),this.draw.stop())},done:Promise.all([this.springs.settled(),this.draw.settled()])}),applyFinalState:()=>this.showFinal(),applyInitialState:()=>this.showInitial()}),this.onPointerMove=e=>{let i=this.layout(),s=e.currentTarget.getBoundingClientRect(),r=e.clientX-s.left-i.left;if(r<0||r>i.plotW||!i.band)return this.setActive(-1);this.setActive(this.type==="line"?Math.round(r/i.step):Math.floor(r/i.band))},this.onPointerLeave=()=>this.setActive(-1),this.onKeyDown=e=>{let i=this.model.labels.length-1,s={ArrowRight:Math.min(i,this.active+1),ArrowLeft:Math.max(0,this.active-1),Home:0,End:i,Escape:-1};e.key in s&&(e.preventDefault(),this.setActive(s[e.key]))},this.onFocus=e=>{e.currentTarget.matches(":focus-visible")&&this.active<0&&this.setActive(0)}}static{this.styles=[no,v`
      .swatch.line {
        height: 2px;
        width: 14px;
        border-radius: 1px;
      }
      .grid {
        stroke: var(--mc-_chart-grid);
        shape-rendering: crispEdges;
      }
      .tick {
        fill: var(--mc-_chart-muted);
        font-size: 11px;
        font-variant-numeric: tabular-nums;
      }
      .series-line {
        fill: none;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      .crosshair {
        stroke: color-mix(in srgb, currentColor 35%, transparent);
      }
    `]}connectedCallback(){super.connectedCallback(),this.mutations=new MutationObserver(()=>this.retarget()),this.mutations.observe(this,{childList:!0,subtree:!0,characterData:!0}),this.hasUpdated&&this.observe()}disconnectedCallback(){super.disconnectedCallback(),this.mutations?.disconnect(),this.resizer?.disconnect(),this.disconnectIntersect?.(),this.disconnectIntersect=null,this.springs.stop(),this.draw.stop(),this.domain.stop()}willUpdate(t){t.has("format")&&(this.fmt=rs(this.format)),["values","labels","series","data","min","max"].some(e=>t.has(e))&&this.retarget(),t.has("type")&&(this.playState==="idle"?this.showInitial():this.showFinal())}firstUpdated(){this.observe()}updated(t){t.has("trigger")&&t.get("trigger")!==void 0&&this.arm(),(t.has("active")||t.has("size"))&&this.placeTip()}replay(){this.cancel(),this.play()}spring(){return{type:"spring",duration:this.duration,bounce:this.bounce}}readData(){let t=this.querySelector("table"),e=this.data??(t?oo(t):ss(this.values,this.labels,this.series));return{labels:e.labels,series:e.series.slice(0,Sd)}}targets(t=this.model){return t.series.flatMap(e=>t.labels.map((i,s)=>e.values[s]??0))}retarget(){let t=this.model,e=this.scaleProgress()<1&&this.size.width&&t.labels.length?this.gridLines(this.layout()).filter(p=>p.o>=.5).map(p=>p.t):this.scale().ticks,i=this.readData(),s=t.labels.length,r=i.labels.length;this.springs.current=i.series.flatMap((p,c)=>i.labels.map((d,m)=>{let g=c<t.series.length?this.springs.current[c*s+Math.min(m,s-1)]:0;return m<s||this.type==="line"?g??0:0})),this.model=i,this.active>=r&&(this.active=-1);let o=this.targets(i),{min:n,max:h}=this.scale();this.playState==="idle"?this.showInitial():On()?(this.scaleFrom=null,this.springs.set(o),this.domain.set([n,h])):(this.springs.to(o,()=>this.spring()),this.animateScale?(this.scaleFrom={ticks:e,domain:[...this.domain.current],target:[n,h]},this.domain.to([n,h],()=>({...this.spring(),bounce:0}))):(this.scaleFrom=null,this.domain.set([n,h])))}scaleProgress(){let t=this.scaleFrom;if(!t||t.domain.length!==2)return 1;let[e,i]=this.domain.current,[s,r]=t.domain,[o,n]=t.target,h=Math.abs(n-r)>=Math.abs(o-s),p=h?n-r:o-s;return p?Math.max(0,Math.min(1,((h?i:e)-(h?r:s))/p)):1}gridLines(t){let e=t.scale.ticks,i=this.scaleProgress(),s=i<1?this.scaleFrom?.ticks??[]:[],r=Wt.top,o=Wt.top+t.plotH,n=h=>Math.max(0,1-Math.max(r-h,h-o,0)/Ed);return[...e.map(h=>({t:h,o:(i<1&&!s.includes(h)?i:1)*n(t.y(h))})),...s.filter(h=>!e.includes(h)).map(h=>({t:h,o:(1-i)*n(t.y(h))}))].filter(h=>h.o>.01)}showInitial(){let t=this.targets(),{min:e,max:i}=this.scale();this.scaleFrom=null,this.domain.set([e,i]),this.type==="bar"?(this.springs.set(t.map(()=>0)),this.draw.set([1])):(this.springs.set(t),this.draw.set([0]))}showFinal(){let{min:t,max:e}=this.scale();this.scaleFrom=null,this.domain.set([t,e]),this.springs.set(this.targets()),this.draw.set([1])}observe(){this.playState==="idle"&&this.showInitial();let t=this.renderRoot.querySelector(".plot");this.resizer=new ResizeObserver(([e])=>{let{width:i,height:s}=e.contentRect;this.size={width:i,height:s}}),this.resizer.observe(t),this.arm()}arm(){if(this.disconnectIntersect?.(),this.disconnectIntersect=null,this.playState==="idle"){if(this.trigger==="mount"){this.play();return}this.disconnectIntersect=Bt(this,.3,()=>{this.disconnectIntersect?.(),this.disconnectIntersect=null,this.play()})}}scale(){let t=this.targets();return Ah(Number.isNaN(this.min)?Math.min(0,...t):this.min,Number.isNaN(this.max)?Math.max(0,...t):this.max)}layout(){let{labels:t}=this.model,e=this.scale(),[i,s]=this.domain.current.length===2?this.domain.current:[e.min,e.max],r=Math.max(...e.ticks.map(g=>this.fmt(g).length))*Eh+10,o=Math.max(0,this.size.width-r-Wt.right),n=Math.max(0,this.size.height-Wt.top-Wt.bottom),h=s-i||1,p=t.length,c=p?o/p:0,d=this.type==="line",m=d?p>1?o/(p-1):o:c;return{scale:e,left:r,plotW:o,plotH:n,band:c,step:m,y:g=>Wt.top+n*(1-(g-i)/h),x:g=>d?p>1?r+m*g:r+o/2:r+c*(g+.5)}}value(t,e){return this.springs.current[t*this.model.labels.length+e]??0}target(t,e){return this.model.series[t]?.values[e]??0}renderChart(){let{labels:t,series:e}=this.model;if(!this.size.width||!t.length)return k;let i=this.layout(),s=i.y(Math.max(i.scale.min,Math.min(0,i.scale.max))),r=Math.max(...t.map(g=>g.length))*Eh+12,o=Math.max(1,Math.ceil(t.length/Math.max(1,Math.floor(i.plotW/r)))),n=e.length,h=Math.max(1,Math.min($d,(i.band*.8-_n*(n-1))/n)),p=n*h+(n-1)*_n,c=this.draw.current[0]??1,d=this.active,m=Wt.top+i.plotH;return O`<svg aria-hidden="true">
      <defs><clipPath id="plot"><rect x="0" y="0" width=${this.size.width} height=${m} /></clipPath></defs>
      ${this.gridLines(i).map(({t:g,o:b})=>O`<line class="grid" opacity=${b} x1=${i.left} x2=${i.left+i.plotW} y1=${i.y(g)} y2=${i.y(g)} />
          <text class="tick" opacity=${b} x=${i.left-8} y=${i.y(g)} text-anchor="end" dominant-baseline="middle">${this.fmt(g)}</text>`)}
      ${t.map((g,b)=>b%o?k:O`<text class="tick" x=${i.x(b)} y=${Wt.top+i.plotH+16} text-anchor=${this.labelAnchor(b)}>${g}</text>`)}
      ${this.type==="line"&&d>=0?O`<line class="crosshair" x1=${i.x(d)} x2=${i.x(d)} y1=${Wt.top} y2=${Wt.top+i.plotH} />`:k}
      <g clip-path="url(#plot)">${e.map((g,b)=>this.type==="bar"?t.map((S,E)=>O`<path fill=${me(b)} opacity=${d>=0&&d!==E?.45:1}
                  d=${Cd(i.x(E)-p/2+b*(h+_n),h,s,i.y(this.value(b,E)))} />`):O`<path class="series-line" stroke=${me(b)} pathLength="1" stroke-dasharray="1 1"
                stroke-dashoffset=${1-c}
                d=${t.map((S,E)=>`${E?"L":"M"}${i.x(E)} ${i.y(this.value(b,E))}`).join("")} />
              ${[c>=.99?t.length-1:-1,d].filter((S,E,T)=>S>=0&&T.indexOf(S)===E).map(S=>O`<circle class="point" fill=${me(b)} r="4" cx=${i.x(S)} cy=${i.y(this.value(b,S))} />`)}`)}</g>
      <rect x=${i.left} y=${Wt.top} width=${i.plotW} height=${i.plotH} fill="transparent" />
    </svg>`}renderTip(){let{labels:t,series:e}=this.model,i=Math.max(0,this.active);return u`<div class="tip" part="tooltip">
      <div class="tip-label">${t[i]}</div>
      ${e.map((s,r)=>u`<div class="row" style=${`--mc-_chart-series:${me(r)}`}>
            <i></i><strong>${this.fmt(this.target(r,i))}</strong>${s.name?u`<span>${s.name}</span>`:k}
          </div>`)}
    </div>`}renderTable(){let{labels:t,series:e}=this.model;return u`<table>
      ${this.label?u`<caption>${this.label}</caption>`:k}
      <tr>
        <th></th>
        ${e.map(i=>u`<th>${i.name||"Value"}</th>`)}
      </tr>
      ${t.map((i,s)=>u`<tr>
            <th>${i}</th>
            ${e.map((r,o)=>u`<td>${this.fmt(this.target(o,s))}</td>`)}
          </tr>`)}
    </table>`}placeTip(){let t=this.renderRoot.querySelector(".tip");if(!t)return;if(this.active<0){this.tipShown&&f(t,{opacity:0},{duration:.15}),this.tipShown=!1;return}let e=this.layout(),i=Math.max(...this.model.series.map((m,g)=>this.target(g,this.active)),e.scale.min),s=t.offsetWidth,r=t.offsetHeight,o=e.x(this.active),n=e.y(i)-r-12,h=e.step/2,p=o+h+s<=this.size.width?o+h:o-h-s,c=n>=0?Math.min(Math.max(0,o-s/2),Math.max(0,this.size.width-s)):Math.max(0,p),d=n>=0?n:Wt.top;!this.tipShown||On()?(f(t,{x:c,y:d},{duration:0}),f(t,{opacity:1},{duration:On()?0:.15})):f(t,{x:c,y:d},{type:"spring",duration:.35,bounce:.15}),this.tipShown=!0}labelAnchor(t){let e=this.model.labels.length;return this.type!=="line"||e<2?"middle":t===0?"start":t===e-1?"end":"middle"}setActive(t){let e=this.model.labels.length;if(this.active=e?Math.max(-1,Math.min(e-1,t)):-1,this.active<0)return;let i=this.model.series.map((s,r)=>`${s.name?`${s.name} `:""}${this.fmt(this.target(r,this.active))}`);this.announcement=`${this.model.labels[this.active]}: ${i.join(", ")}`}render(){let{series:t}=this.model,e=!!this.querySelector("table");return u`<div class="frame">
      ${this.legend&&t.length>1?u`<div class="legend" part="legend">
            ${t.map((i,s)=>u`<span class="key"
                  ><span
                    class="swatch ${this.type}"
                    style=${`--mc-_chart-series:${me(s)}`}
                  ></span
                  >${i.name}</span
                >`)}
          </div>`:k}
      <div
        class="plot"
        tabindex="0"
        role="group"
        aria-roledescription="chart"
        aria-label=${this.label||k}
        @pointermove=${this.onPointerMove}
        @pointerleave=${this.onPointerLeave}
        @keydown=${this.onKeyDown}
        @focus=${this.onFocus}
        @blur=${this.onPointerLeave}
      >
        ${this.renderChart()} ${this.tooltip?this.renderTip():k}
      </div>
      <div class="sr-only" aria-live="polite">${this.announcement}</div>
      <div class="sr-only"><slot></slot>${e?k:this.renderTable()}</div>
    </div>`}};a([l({type:String,reflect:!0})],rt.prototype,"type",void 0),a([l({type:String})],rt.prototype,"values",void 0),a([l({type:String})],rt.prototype,"labels",void 0),a([l({type:String})],rt.prototype,"series",void 0),a([l({attribute:!1})],rt.prototype,"data",void 0),a([l({type:Number})],rt.prototype,"min",void 0),a([l({type:Number})],rt.prototype,"max",void 0),a([l({type:String})],rt.prototype,"format",void 0),a([l({type:String,reflect:!0})],rt.prototype,"trigger",void 0),a([l({type:Number})],rt.prototype,"duration",void 0),a([l({type:Number})],rt.prototype,"bounce",void 0),a([l({type:Number})],rt.prototype,"interval",void 0),a([l({type:Boolean,converter:y})],rt.prototype,"tooltip",void 0),a([l({type:Boolean,converter:y})],rt.prototype,"legend",void 0),a([l({type:String})],rt.prototype,"label",void 0),a([l({type:Boolean,converter:y,attribute:"animate-scale"})],rt.prototype,"animateScale",void 0),a([D()],rt.prototype,"model",void 0),a([D()],rt.prototype,"active",void 0),a([D()],rt.prototype,"size",void 0),rt=a([x("motion-chart")],rt);var Ch=6,Pn=8,ao=()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches;function Md(t,e,i,s,r,o){let n=Math.min(o-r,Math.PI*2-1e-4);if(n<=0)return"";let h=r+n,p=(m,g)=>`${t+g*Math.sin(m)} ${e-g*Math.cos(m)}`,c=n>Math.PI?1:0,d=`M${p(r,i)}A${i} ${i} 0 ${c} 1 ${p(h,i)}`;return s?`${d}L${p(h,s)}A${s} ${s} 0 ${c} 0 ${p(r,s)}Z`:`${d}L${t} ${e}Z`}var gt=class extends M(w){constructor(...t){super(...t),this.values="",this.labels="",this.data=null,this.donut=!1,this.format="",this.totalLabel="Total",this.trigger="view",this.duration=.8,this.bounce=.25,this.tooltip=!0,this.legend=!0,this.label="",this.model={labels:[],values:[]},this.active=-1,this.size={width:0,height:0},this.springs=new ie(()=>this.requestUpdate()),this.sweep=new ie(()=>this.requestUpdate()),this.pops=new ie(()=>this.requestUpdate()),this.fmt=rs(""),this.percent=new Intl.NumberFormat(void 0,{style:"percent",maximumFractionDigits:0}),this.announcement="",this.tipShown=!1,this.resizer=null,this.mutations=null,this.disconnectIntersect=null,this.playback=new C(this,{start:()=>(this.springs.set(this.model.values),this.sweep.to([1],()=>({type:"spring",bounce:0,duration:this.duration*1.6})),{handle:{pause:()=>this.sweep.pause(),resume:()=>this.sweep.resume(),finish:()=>this.sweep.set([1]),cancel:()=>this.sweep.stop()},done:this.sweep.settled()}),applyFinalState:()=>{this.springs.set(this.model.values),this.sweep.set([1])},applyInitialState:()=>{this.springs.set(this.model.values),this.sweep.set([0])}}),this.onPointerMove=e=>{let i=e.currentTarget.getBoundingClientRect(),s=this.sliceAt(e.clientX-i.left,e.clientY-i.top);s!==this.active&&this.setActive(s)},this.onPointerLeave=()=>this.setActive(-1),this.onKeyDown=e=>{let i=this.model.labels.length-1,s={ArrowRight:Math.min(i,this.active+1),ArrowDown:Math.min(i,this.active+1),ArrowLeft:Math.max(0,this.active-1),ArrowUp:Math.max(0,this.active-1),Home:0,End:i,Escape:-1};e.key in s&&(e.preventDefault(),this.setActive(s[e.key]))},this.onFocus=e=>{e.currentTarget.matches(":focus-visible")&&this.active<0&&this.setActive(0)}}static{this.styles=[no,v`
      .slice {
        stroke: var(--mc-chart-surface, Canvas);
        stroke-width: 2;
        stroke-linejoin: round;
      }
      .center-value {
        fill: currentColor;
        font-weight: 700;
        font-variant-numeric: tabular-nums;
      }
      .center-label {
        fill: var(--mc-_chart-muted);
      }
    `]}connectedCallback(){super.connectedCallback(),this.mutations=new MutationObserver(()=>this.retarget()),this.mutations.observe(this,{childList:!0,subtree:!0,characterData:!0}),this.hasUpdated&&this.observe()}disconnectedCallback(){super.disconnectedCallback(),this.mutations?.disconnect(),this.resizer?.disconnect(),this.disconnectIntersect?.(),this.disconnectIntersect=null,this.springs.stop(),this.sweep.stop(),this.pops.stop()}willUpdate(t){t.has("format")&&(this.fmt=rs(this.format)),["values","labels","data"].some(e=>t.has(e))&&this.retarget()}firstUpdated(){this.observe()}updated(t){t.has("trigger")&&t.get("trigger")!==void 0&&this.arm(),(t.has("active")||t.has("size"))&&this.placeTip()}replay(){this.cancel(),this.play()}readData(){let t=this.querySelector("table"),e=t?oo(t):ss(this.values,this.labels),i=this.data??{labels:e.labels,values:e.series[0]?.values??[]},s=i.labels.map((o,n)=>Math.max(0,i.values[n]??0));if(i.labels.length<=Ch)return{labels:i.labels,values:s};let r=Ch-1;return{labels:[...i.labels.slice(0,r),"Other"],values:[...s.slice(0,r),s.slice(r).reduce((o,n)=>o+n,0)]}}retarget(){let t=this.readData();this.springs.current=t.values.map((e,i)=>this.springs.current[i]??0),this.model=t,this.active>=t.labels.length&&(this.active=-1),this.playState==="idle"?(this.springs.set(t.values),this.sweep.set([0])):ao()?this.springs.set(t.values):this.springs.to(t.values,()=>({type:"spring",duration:this.duration,bounce:this.bounce}))}observe(){this.playState==="idle"&&this.sweep.set([0]);let t=this.renderRoot.querySelector(".plot");this.resizer=new ResizeObserver(([e])=>{let{width:i,height:s}=e.contentRect;this.size={width:i,height:s}}),this.resizer.observe(t),this.arm()}arm(){if(this.disconnectIntersect?.(),this.disconnectIntersect=null,this.playState==="idle"){if(this.trigger==="mount"){this.play();return}this.disconnectIntersect=Bt(this,.3,()=>{this.disconnectIntersect?.(),this.disconnectIntersect=null,this.play()})}}get total(){return this.model.values.reduce((t,e)=>t+e,0)}share(t){return this.percent.format((this.model.values[t]??0)/(this.total||1))}geometry(){let{width:t,height:e}=this.size,i=Math.max(0,Math.min(t,e)/2-Pn-2);return{cx:t/2,cy:e/2,r:i,inner:this.donut?i*.62:0}}angles(){let t=this.springs.current.map(r=>Math.max(0,r??0)),e=t.reduce((r,o)=>r+o,0)||1,i=Math.PI*2*(this.sweep.current[0]??1),s=0;return t.map(r=>{let o=s;return s+=r/e*i,[o,s]})}sliceAt(t,e){let i=this.geometry(),s=t-i.cx,r=e-i.cy,o=Math.hypot(s,r);if(o>i.r+Pn||o<i.inner)return-1;let n=(Math.atan2(s,-r)+Math.PI*2)%(Math.PI*2);return this.angles().findIndex(([h,p])=>n>=h&&n<p)}renderPie(){let{labels:t,values:e}=this.model;if(!this.size.width||!t.length)return k;let i=this.geometry(),s=this.active;return O`<svg aria-hidden="true">
      ${this.angles().map(([r,o],n)=>{let h=(r+o)/2,p=(this.pops.current[n]??0)*Pn;return O`<path class="slice" fill=${me(n)} opacity=${s>=0&&s!==n?.7:1}
          transform=${`translate(${Math.sin(h)*p} ${-Math.cos(h)*p})`}
          d=${Md(i.cx,i.cy,i.r,i.inner,r,o)} />`})}
      ${i.inner?O`<text class="center-value" x=${i.cx} y=${i.cy} text-anchor="middle" font-size=${i.inner*.36}>${this.fmt(s>=0?e[s]:this.total)}</text>
            <text class="center-label" x=${i.cx} y=${i.cy+i.inner*.3} text-anchor="middle" font-size=${Math.max(11,i.inner*.15)}>${s>=0?t[s]:this.totalLabel}</text>`:k}
    </svg>`}renderTip(){let t=Math.max(0,this.active);return u`<div class="tip" part="tooltip">
      <div class="tip-label">${this.model.labels[t]}</div>
      <div class="row" style=${`--mc-_chart-series:${me(t)}`}>
        <i></i><strong>${this.fmt(this.model.values[t]??0)}</strong>${this.format==="percent"?k:u`<span>${this.share(t)}</span>`}
      </div>
    </div>`}renderTable(){return u`<table>
      ${this.label?u`<caption>${this.label}</caption>`:k}
      ${this.model.labels.map((t,e)=>u`<tr>
            <th>${t}</th>
            <td>${this.fmt(this.model.values[e]??0)}</td>
            <td>${this.share(e)}</td>
          </tr>`)}
    </table>`}placeTip(){let t=this.renderRoot.querySelector(".tip");if(!t)return;if(this.active<0){this.tipShown&&f(t,{opacity:0},{duration:.15}),this.tipShown=!1;return}let e=this.geometry(),[i,s]=this.angles()[this.active]??[0,0],r=(i+s)/2,o=t.offsetWidth,n=t.offsetHeight,h=e.cx+Math.sin(r)*(e.r+14),p=e.cy-Math.cos(r)*(e.r+14),c=Math.min(Math.max(0,Math.sin(r)>=0?h:h-o),Math.max(0,this.size.width-o)),d=Math.min(Math.max(0,p-n/2),Math.max(0,this.size.height-n));!this.tipShown||ao()?(f(t,{x:c,y:d},{duration:0}),f(t,{opacity:1},{duration:ao()?0:.15})):f(t,{x:c,y:d},{type:"spring",duration:.35,bounce:.15}),this.tipShown=!0}setActive(t){let e=this.model.labels.length;this.active=e?Math.max(-1,Math.min(e-1,t)):-1;let i=this.model.labels.map((r,o)=>o===this.active?1:0);if(ao()?this.pops.set(i):this.pops.to(i,()=>({type:"spring",duration:.4,bounce:.45})),this.active<0)return;let s=this.fmt(this.model.values[this.active]??0);this.announcement=`${this.model.labels[this.active]}: ${s}, ${this.share(this.active)}`}render(){let{labels:t}=this.model,e=!!this.querySelector("table");return u`<div class="frame">
      ${this.legend&&t.length>1?u`<div class="legend" part="legend">
            ${t.map((i,s)=>u`<span class="key"
                  ><span class="swatch" style=${`--mc-_chart-series:${me(s)}`}></span
                  >${i}<span class="share">${this.share(s)}</span></span
                >`)}
          </div>`:k}
      <div
        class="plot"
        tabindex="0"
        role="group"
        aria-roledescription="pie chart"
        aria-label=${this.label||k}
        @pointermove=${this.onPointerMove}
        @pointerleave=${this.onPointerLeave}
        @keydown=${this.onKeyDown}
        @focus=${this.onFocus}
        @blur=${this.onPointerLeave}
      >
        ${this.renderPie()} ${this.tooltip&&!this.donut?this.renderTip():k}
      </div>
      <div class="sr-only" aria-live="polite">${this.announcement}</div>
      <div class="sr-only"><slot></slot>${e?k:this.renderTable()}</div>
    </div>`}};a([l({type:String})],gt.prototype,"values",void 0),a([l({type:String})],gt.prototype,"labels",void 0),a([l({attribute:!1})],gt.prototype,"data",void 0),a([l({type:Boolean,converter:y,reflect:!0})],gt.prototype,"donut",void 0),a([l({type:String})],gt.prototype,"format",void 0),a([l({type:String,attribute:"total-label"})],gt.prototype,"totalLabel",void 0),a([l({type:String,reflect:!0})],gt.prototype,"trigger",void 0),a([l({type:Number})],gt.prototype,"duration",void 0),a([l({type:Number})],gt.prototype,"bounce",void 0),a([l({type:Boolean,converter:y})],gt.prototype,"tooltip",void 0),a([l({type:Boolean,converter:y})],gt.prototype,"legend",void 0),a([l({type:String})],gt.prototype,"label",void 0),a([D()],gt.prototype,"model",void 0),a([D()],gt.prototype,"active",void 0),a([D()],gt.prototype,"size",void 0),gt=a([x("motion-pie")],gt);var Xs=2.5,Td=()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches,se=class extends M(w){constructor(...t){super(...t),this.values="",this.data=null,this.area=!1,this.trigger="view",this.duration=1,this.bounce=.2,this.label="",this.size={width:0,height:0},this.points=[],this.springs=new ie(()=>this.requestUpdate()),this.draw=new ie(()=>this.requestUpdate()),this.resizer=null,this.disconnectIntersect=null,this.playback=new C(this,{start:()=>(this.springs.set(this.points),this.draw.to([1],()=>({type:"spring",bounce:0,duration:this.duration})),{handle:{pause:()=>this.draw.pause(),resume:()=>this.draw.resume(),finish:()=>this.draw.set([1]),cancel:()=>this.draw.stop()},done:this.draw.settled()}),applyFinalState:()=>{this.springs.set(this.points),this.draw.set([1])},applyInitialState:()=>{this.springs.set(this.points),this.draw.set([0])}})}static{this.styles=v`
    :host {
      display: inline-block;
      width: var(--mc-sparkline-width, 6em);
      height: var(--mc-sparkline-height, 1.5em);
      vertical-align: middle;
      color: var(--mc-sparkline-color, currentColor);
    }
    svg {
      display: block;
      width: 100%;
      height: 100%;
      overflow: visible;
    }
    .line {
      fill: none;
      stroke: currentColor;
      stroke-width: 1.5;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .area {
      fill: currentColor;
      fill-opacity: 0.1;
    }
    .dot {
      fill: var(--mc-sparkline-accent, currentColor);
    }
  `}connectedCallback(){super.connectedCallback(),this.hasUpdated&&this.observe()}disconnectedCallback(){super.disconnectedCallback(),this.resizer?.disconnect(),this.disconnectIntersect?.(),this.disconnectIntersect=null,this.springs.stop(),this.draw.stop()}willUpdate(t){if(!t.has("values")&&!t.has("data"))return;this.points=this.data??ss(this.values).series[0]?.values??[];let e=!this.hasUpdated;if(e||this.playState==="idle")this.springs.set(this.points),e&&this.draw.set([0]);else if(Td())this.springs.set(this.points);else{let i=this.springs.current[this.springs.current.length-1]??0;this.springs.current=this.points.map((s,r)=>this.springs.current[r]??i),this.springs.to(this.points,()=>({type:"spring",duration:this.duration*.6,bounce:this.bounce}))}}firstUpdated(){this.observe()}updated(t){t.has("trigger")&&t.get("trigger")!==void 0&&this.arm(),(t.has("label")||t.has("values")||t.has("data"))&&this.describe()}replay(){this.cancel(),this.play()}observe(){this.playState==="idle"&&this.draw.set([0]),this.resizer=new ResizeObserver(([t])=>{let{width:e,height:i}=t.contentRect;this.size={width:e,height:i}}),this.resizer.observe(this),this.arm()}arm(){if(this.disconnectIntersect?.(),this.disconnectIntersect=null,this.playState==="idle"){if(this.trigger==="mount"){this.play();return}this.disconnectIntersect=Bt(this,.5,()=>{this.disconnectIntersect?.(),this.disconnectIntersect=null,this.play()})}}describe(){let t=this.points,e=t.length?`from ${t[0]} to ${t[t.length-1]}, low ${Math.min(...t)}, high ${Math.max(...t)}`:"";this.setAttribute("role","img"),this.setAttribute("aria-label",this.label||e)}render(){let t=this.springs.current,{width:e,height:i}=this.size;if(t.length<2||!e)return k;let s=Math.min(...this.points),r=Math.max(...this.points)-s||1,o=d=>Xs+(e-Xs*2)*d/(t.length-1),n=d=>Xs+(i-Xs*2)*(1-(d-s)/r),h=t.map((d,m)=>`${m?"L":"M"}${o(m)} ${n(d)}`).join(""),p=this.draw.current[0]??1,c=t.length-1;return O`<svg aria-hidden="true">
      ${this.area?O`<path class="area" opacity=${p} d=${`${h}L${o(c)} ${i}L${o(0)} ${i}Z`} />`:k}
      <path class="line" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset=${1-p} d=${h} />
      ${p>=.99?O`<circle class="dot" r=${Xs} cx=${o(c)} cy=${n(t[c])} />`:k}
    </svg>`}};a([l({type:String})],se.prototype,"values",void 0),a([l({attribute:!1})],se.prototype,"data",void 0),a([l({type:Boolean,converter:y})],se.prototype,"area",void 0),a([l({type:String,reflect:!0})],se.prototype,"trigger",void 0),a([l({type:Number})],se.prototype,"duration",void 0),a([l({type:Number})],se.prototype,"bounce",void 0),a([l({type:String})],se.prototype,"label",void 0),a([D()],se.prototype,"size",void 0),se=a([x("motion-sparkline")],se);var os=class extends M(w){constructor(...t){super(...t),this.depth=.5,this.axis="y",this.container="",this.controls=null,this.cleanup=null,this.playback=new C(this,{start:()=>(this.bind(),{handle:{pause:()=>this.unbind(),resume:()=>this.bind(),finish:()=>{this.release(),this.applyEnd()},cancel:()=>this.release()}}),applyFinalState:()=>this.applyEnd(),applyInitialState:()=>{this.style.transform=""}})}static{this.styles=v`
    :host {
      display: block;
      will-change: transform;
    }
  `}get reduced(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}firstUpdated(){this.reduced||this.play()}updated(t){(t.has("depth")||t.has("axis")||t.has("container"))&&this.playState==="running"&&(this.unbind(),this.bind())}resolveContainer(){if(this.container)return document.querySelector(this.container)??void 0}bind(){this.release();let t=this.depth,e=this.axis==="x"?{x:[`${t*80}px`,`${-(t*80)}px`]}:{y:[`${t*80}px`,`${-(t*80)}px`]};this.controls=f(this,e,{ease:"linear"});let i={target:this,offset:["start end","end start"]},s=this.resolveContainer();s&&(i.container=s),this.cleanup=Et(this.controls,i)}unbind(){this.cleanup?.(),this.cleanup=null}release(){this.unbind(),this.controls?.stop(),this.controls=null}applyEnd(){let t=-(this.depth*80);this.style.transform=this.axis==="x"?`translateX(${t}px)`:`translateY(${t}px)`}render(){return u`<slot></slot>`}};a([l({type:Number})],os.prototype,"depth",void 0),a([l({type:String})],os.prototype,"axis",void 0),a([l({type:String})],os.prototype,"container",void 0),os=a([x("motion-parallax")],os);var ns=class extends M(w){constructor(...t){super(...t),this.height="200vh",this.pin=!0,this.container="",this.cleanups=[],this.transformMap=new Map,this.playback=new C(this,{start:()=>(this.bind(),{handle:{pause:()=>this.unbind(),resume:()=>this.bind(),finish:()=>{this.unbind(),this.applyProgress(1)},cancel:()=>this.unbind()}}),applyFinalState:()=>this.applyProgress(1),applyInitialState:()=>{this.style.removeProperty("--mc-progress");for(let e of[...this.querySelectorAll("[data-from]")]){let i=this.parseChild(e);if(i){e.style.transform="";for(let s of i.keys)["x","y","scale","rotate"].includes(s)||e.style.removeProperty(s)}}this.transformMap.clear()}})}static{this.styles=v`
    :host {
      display: block;
    }

    .inner {
      position: sticky;
      top: 0;
      height: var(--mc-_scene-stage-height, 100vh);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `}get reduced(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}firstUpdated(){if(this.style.height=this.height,this.reduced){this.applyProgress(1);return}this.play()}updated(t){if(t.has("height")&&(this.style.height=this.height),t.has("pin")){let e=this.shadowRoot?.querySelector(".inner");e&&(e.style.position=this.pin?"sticky":"relative")}(t.has("height")||t.has("container")||t.has("pin"))&&this.playState==="running"&&(this.unbind(),this.bind())}unbind(){for(let t of this.cleanups)t();this.cleanups=[]}resolveContainer(){if(this.container)return document.querySelector(this.container)??void 0}bind(){let t=this.resolveContainer(),e=t?`${t.clientHeight}px`:"100vh";this.style.setProperty("--mc-_scene-stage-height",e);let i={target:this,offset:["start start","end end"]};t&&(i.container=t);let s=Et(r=>{this.style.setProperty("--mc-progress",String(r))},i);this.cleanups.push(s);for(let r of[...this.querySelectorAll("[data-from]")])this.bindChild(r,t)}bindChild(t,e){let i=this.parseChild(t);if(!i)return;let s={target:this,offset:["start start","end end"]};e&&(s.container=e);let r=Et(o=>{this.applyChild(t,i,o)},s);this.cleanups.push(r)}parseChild(t){let e=parseFloat(t.dataset.start??"0"),i=parseFloat(t.dataset.end??"1"),s,r;try{s=JSON.parse(t.dataset.from??"{}"),r=JSON.parse(t.dataset.to??"{}")}catch{return null}let o=Object.keys(s);return o.length?{start:e,end:i,from:s,to:r,keys:o}:null}applyChild(t,e,i){let s=Math.max(0,Math.min(1,(i-e.start)/(e.end-e.start)));for(let r of e.keys){let o=this.lerp(e.from[r],e.to[r],s);this.applyProp(t,r,o)}}applyProgress(t){this.style.setProperty("--mc-progress",String(t));for(let e of[...this.querySelectorAll("[data-from]")]){let i=this.parseChild(e);i&&this.applyChild(e,i,t)}}lerp(t,e,i){if(typeof t=="number"&&typeof e=="number")return String(t+(e-t)*i);let s=String(t).match(/^(-?[\d.]+)(.*)$/),r=String(e).match(/^(-?[\d.]+)(.*)$/);return s&&r?`${parseFloat(s[1])+(parseFloat(r[1])-parseFloat(s[1]))*i}${s[2]}`:String(i<.5?t:e)}applyProp(t,e,i){if(["x","y","scale","rotate"].includes(e)){let s=this.transformMap.get(t)??{};s[e]=i,this.transformMap.set(t,s),t.style.transform=[s.x?`translateX(${s.x})`:"",s.y?`translateY(${s.y})`:"",s.scale?`scale(${s.scale})`:"",s.rotate?`rotate(${s.rotate})`:""].filter(Boolean).join(" ")}else t.style.setProperty(e,i)}render(){return u`
      <div class="inner">
        <slot></slot>
      </div>
    `}};a([l({type:String})],ns.prototype,"height",void 0),a([l({type:Boolean,converter:y})],ns.prototype,"pin",void 0),a([l({type:String})],ns.prototype,"container",void 0),ns=a([x("motion-scene")],ns);export{ee as MotionArc,Si as MotionBlur,Ke as MotionBlurIn,rt as MotionChart,Te as MotionCircle,ft as MotionCode,Qi as MotionCodeInline,Ye as MotionCountdown,Ct as MotionCounter,Nt as MotionCurve,de as MotionDialog,Oe as MotionFlipCard,St as MotionFont,ch as MotionGallery,Zi as MotionGlitch,ce as MotionGravity,_t as MotionHeadline,Jt as MotionHover,It as MotionIcon,Qt as MotionIconState,Ze as MotionImageCompare,_e as MotionLiquid,$i as MotionMagnetic,Jr as MotionMarker,os as MotionParallax,Le as MotionPerspective,gt as MotionPie,xi as MotionPress,Xe as MotionProgress,ki as MotionReveal,Ks as MotionRing,ns as MotionScene,Rt as MotionScramble,ph as MotionSlider,se as MotionSparkline,Ut as MotionSplit,es as MotionSpotlight,Me as MotionStagger,Sh as MotionStateIcon,Ge as MotionStretch,kn as MotionStrike,Ot as MotionSwap,zt as MotionTextMask,is as MotionThemeIcon,Z as MotionThemeToggle,nh as MotionTicker,Ft as MotionTilt,te as MotionTypewriter,Qr as MotionUnderline,Ai as MotionWords,f as animate,Oh as cancelAll,Lh as pauseAll,Th as preload,Mh as preloadCSS,_h as resumeAll};
