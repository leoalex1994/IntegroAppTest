"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[6596],{6596:(S,b,h)=>{h.r(b),h.d(b,{HttpWeb:()=>F});var c=h(8239),j=h(8781);const Z=function(){var n=(0,c.Z)(function*(o){return new Promise((t,e)=>{const s=new FileReader;s.onload=()=>{const r=s.result,u=r.substr(r.indexOf(",")+1);t(u)},s.onerror=r=>e(r),s.readAsDataURL(o)})});return function(t){return n.apply(this,arguments)}}(),k=n=>encodeURIComponent(n).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),v=n=>n.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent),m=()=>{const n=[],o={};if(!document.cookie)return n;const t=document.cookie.split(";")||[];for(const s of t){let[r,u]=s.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");r=v(r).trim(),u=v(u).trim(),o[r]=u}const e=Object.entries(o);for(const[s,r]of e)n.push({key:s,value:r});return n},x=()=>{const n=document.cookie.split(";")||[];for(const o of n)document.cookie=o.replace(/^ +/,"").replace(/=.*/,`=;expires=${(new Date).toUTCString()};path=/`)},O=(n,o={})=>{const t=Object.assign({method:n.method||"GET",headers:n.headers},o),s=((n={})=>{const o=Object.keys(n);return Object.keys(n).map(s=>s.toLocaleLowerCase()).reduce((s,r,u)=>(s[r]=n[o[u]],s),{})})(n.headers)["content-type"]||"";if("string"==typeof n.data)t.body=n.data;else if(s.includes("application/x-www-form-urlencoded")){const r=new URLSearchParams;for(const[u,a]of Object.entries(n.data||{}))r.set(u,a);t.body=r.toString()}else if(s.includes("multipart/form-data")){const r=new FormData;if(n.data instanceof FormData)n.data.forEach((a,i)=>{r.append(i,a)});else for(let a of Object.keys(n.data))r.append(a,n.data[a]);t.body=r;const u=new Headers(t.headers);u.delete("content-type"),t.headers=u}else(s.includes("application/json")||"object"==typeof n.data)&&(t.body=JSON.stringify(n.data));return t},f=function(){var n=(0,c.Z)(function*(o){const t=O(o,o.webFetchExtra),e=((n,o=!0)=>n?Object.entries(n).reduce((e,s)=>{const[r,u]=s;let a,i;return Array.isArray(u)?(i="",u.forEach(l=>{a=o?encodeURIComponent(l):l,i+=`${r}=${a}&`}),i.slice(0,-1)):(a=o?encodeURIComponent(u):u,i=`${r}=${a}`),`${e}&${i}`},"").substr(1):null)(o.params,o.shouldEncodeUrlParams),s=e?`${o.url}?${e}`:o.url,r=yield fetch(s,t),u=r.headers.get("content-type")||"";let i,{responseType:a="text"}=r.ok?o:{};switch(u.includes("application/json")&&(a="json"),a){case"arraybuffer":case"blob":const d=yield r.blob();i=yield Z(d);break;case"json":i=yield r.json();break;default:i=yield r.text()}const l={};return r.headers.forEach((d,g)=>{l[g]=d}),{data:i,headers:l,status:r.status,url:r.url}});return function(t){return n.apply(this,arguments)}}(),U=function(){var n=(0,c.Z)(function*(o){return f(Object.assign(Object.assign({},o),{method:"GET"}))});return function(t){return n.apply(this,arguments)}}(),I=function(){var n=(0,c.Z)(function*(o){return f(Object.assign(Object.assign({},o),{method:"POST"}))});return function(t){return n.apply(this,arguments)}}(),P=function(){var n=(0,c.Z)(function*(o){return f(Object.assign(Object.assign({},o),{method:"PUT"}))});return function(t){return n.apply(this,arguments)}}(),R=function(){var n=(0,c.Z)(function*(o){return f(Object.assign(Object.assign({},o),{method:"PATCH"}))});return function(t){return n.apply(this,arguments)}}(),D=function(){var n=(0,c.Z)(function*(o){return f(Object.assign(Object.assign({},o),{method:"DELETE"}))});return function(t){return n.apply(this,arguments)}}();class F extends j.Uw{constructor(){var o;super(),o=this,this.request=function(){var t=(0,c.Z)(function*(e){return f(e)});return function(e){return t.apply(this,arguments)}}(),this.get=function(){var t=(0,c.Z)(function*(e){return U(e)});return function(e){return t.apply(this,arguments)}}(),this.post=function(){var t=(0,c.Z)(function*(e){return I(e)});return function(e){return t.apply(this,arguments)}}(),this.put=function(){var t=(0,c.Z)(function*(e){return P(e)});return function(e){return t.apply(this,arguments)}}(),this.patch=function(){var t=(0,c.Z)(function*(e){return R(e)});return function(e){return t.apply(this,arguments)}}(),this.del=function(){var t=(0,c.Z)(function*(e){return D(e)});return function(e){return t.apply(this,arguments)}}(),this.getCookiesMap=function(){var t=(0,c.Z)(function*(e){const s=m(),r={};for(const u of s)r[u.key]=u.value;return r});return function(e){return t.apply(this,arguments)}}(),this.getCookies=function(){var t=(0,c.Z)(function*(e){return{cookies:m()}});return function(e){return t.apply(this,arguments)}}(),this.setCookie=function(){var t=(0,c.Z)(function*(e){const{key:s,value:r,expires:u="",path:a=""}=e;((n,o,t={})=>{const e=k(n),s=k(o),r=`; expires=${(t.expires||"").replace("expires=","")}`,u=(t.path||"/").replace("path=","");document.cookie=`${e}=${s||""}${r}; path=${u}`})(s,r,{expires:u,path:a})});return function(e){return t.apply(this,arguments)}}(),this.getCookie=function(){var t=(0,c.Z)(function*(e){return(n=>{const o=m();for(const t of o)if(t.key===n)return t;return{key:n,value:""}})(e.key)});return function(e){return t.apply(this,arguments)}}(),this.deleteCookie=function(){var t=(0,c.Z)(function*(e){document.cookie=`${e.key}=; Max-Age=0`});return function(e){return t.apply(this,arguments)}}(),this.clearCookies=function(){var t=(0,c.Z)(function*(e){return x()});return function(e){return t.apply(this,arguments)}}(),this.clearAllCookies=(0,c.Z)(function*(){return x()}),this.uploadFile=function(){var t=(0,c.Z)(function*(e){const s=new FormData;s.append(e.name,e.blob||"undefined");const r=Object.assign(Object.assign({},e),{body:s,method:"POST"});return o.post(r)});return function(e){return t.apply(this,arguments)}}(),this.downloadFile=function(){var t=(0,c.Z)(function*(e){const s=O(e,e.webFetchExtra),r=yield fetch(e.url,s);let u;if(null!=e&&e.progress)if(null!=r&&r.body){const a=r.body.getReader();let i=0,l=[];const d=r.headers.get("content-type"),g=parseInt(r.headers.get("content-length")||"0",10);for(;;){const{done:p,value:y}=yield a.read();if(p)break;l.push(y),i+=(null==y?void 0:y.length)||0,o.notifyListeners("progress",{type:"DOWNLOAD",url:e.url,bytes:i,contentLength:g})}let _=new Uint8Array(i),C=0;for(const p of l)typeof p>"u"||(_.set(p,C),C+=p.length);u=new Blob([_.buffer],{type:d||void 0})}else u=new Blob;else u=yield r.blob();return{blob:u}});return function(e){return t.apply(this,arguments)}}()}}}}]);