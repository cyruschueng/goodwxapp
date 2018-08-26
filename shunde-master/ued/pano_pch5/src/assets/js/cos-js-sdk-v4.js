/*eslint-disable *//* cos-js-sdk-v4 1.1.0 [2017-5-25 09:13:55]*/
!function(e,t){"object"==typeof module&&"object"==typeof module.exports?module.exports=e.document?t(e,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return t(e)}:t(e)}("undefined"!=typeof window?window:this,function(e,t){function n(e){var t=e.length,n=L.type(e);return"function"!==n&&!L.isWindow(e)&&(!(1!==e.nodeType||!t)||("array"===n||0===t||"number"==typeof t&&t>0&&t-1 in e))}function r(e){var t=R[e]={};return L.each(e.match(W)||[],function(e,n){t[n]=!0}),t}function a(){F.addEventListener?(F.removeEventListener("DOMContentLoaded",i,!1),e.removeEventListener("load",i,!1)):(F.detachEvent("onreadystatechange",i),e.detachEvent("onload",i))}function i(){(F.addEventListener||"load"===event.type||"complete"===F.readyState)&&(a(),L.ready())}function o(e,t,n){if(void 0===n&&1===e.nodeType){var r="data-"+t.replace(J,"-$1").toLowerCase();if(n=e.getAttribute(r),"string"==typeof n){try{n="true"===n||"false"!==n&&("null"===n?null:+n+""===n?+n:I.test(n)?L.parseJSON(n):n)}catch(a){}L.data(e,t,n)}else n=void 0}return n}function s(e){var t;for(t in e)if(("data"!==t||!L.isEmptyObject(e[t]))&&"toJSON"!==t)return!1;return!0}function c(e,t,n,r){if(L.acceptData(e)){var a,i,o=L.expando,s=e.nodeType,c=s?L.cache:e,u=s?e[o]:e[o]&&o;if(u&&c[u]&&(r||c[u].data)||void 0!==n||"string"!=typeof t)return u||(u=s?e[o]=b.pop()||L.guid++:o),c[u]||(c[u]=s?{}:{toJSON:L.noop}),"object"!=typeof t&&"function"!=typeof t||(r?c[u]=L.extend(c[u],t):c[u].data=L.extend(c[u].data,t)),i=c[u],r||(i.data||(i.data={}),i=i.data),void 0!==n&&(i[L.camelCase(t)]=n),"string"==typeof t?(a=i[t],null==a&&(a=i[L.camelCase(t)])):a=i,a}}function u(e,t,n){if(L.acceptData(e)){var r,a,i=e.nodeType,o=i?L.cache:e,c=i?e[L.expando]:L.expando;if(o[c]){if(t&&(r=n?o[c]:o[c].data)){L.isArray(t)?t=t.concat(L.map(t,L.camelCase)):t in r?t=[t]:(t=L.camelCase(t),t=t in r?[t]:t.split(" ")),a=t.length;for(;a--;)delete r[t[a]];if(n?!s(r):!L.isEmptyObject(r))return}(n||(delete o[c].data,s(o[c])))&&(i?L.cleanData([e],!0):D.deleteExpando||o!=o.window?delete o[c]:o[c]=null)}}}function l(){return!0}function d(){return!1}function f(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,a=0,i=t.toLowerCase().match(W)||[];if(L.isFunction(n))for(;r=i[a++];)"+"===r.charAt(0)?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function p(e,t,n,r){function a(s){var c;return i[s]=!0,L.each(e[s]||[],function(e,s){var u=s(t,n,r);return"string"!=typeof u||o||i[u]?o?!(c=u):void 0:(t.dataTypes.unshift(u),a(u),!1)}),c}var i={},o=e===le;return a(t.dataTypes[0])||!i["*"]&&a("*")}function h(e,t){var n,r,a=L.ajaxSettings.flatOptions||{};for(r in t)void 0!==t[r]&&((a[r]?e:n||(n={}))[r]=t[r]);return n&&L.extend(!0,e,n),e}function v(e,t,n){for(var r,a,i,o,s=e.contents,c=e.dataTypes;"*"===c[0];)c.shift(),void 0===a&&(a=e.mimeType||t.getResponseHeader("Content-Type"));if(a)for(o in s)if(s[o]&&s[o].test(a)){c.unshift(o);break}if(c[0]in n)i=c[0];else{for(o in n){if(!c[0]||e.converters[o+" "+c[0]]){i=o;break}r||(r=o)}i=i||r}if(i)return i!==c[0]&&c.unshift(i),n[i]}function y(e,t,n,r){var a,i,o,s,c,u={},l=e.dataTypes.slice();if(l[1])for(o in e.converters)u[o.toLowerCase()]=e.converters[o];for(i=l.shift();i;)if(e.responseFields[i]&&(n[e.responseFields[i]]=t),!c&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),c=i,i=l.shift())if("*"===i)i=c;else if("*"!==c&&c!==i){if(o=u[c+" "+i]||u["* "+i],!o)for(a in u)if(s=a.split(" "),s[1]===i&&(o=u[c+" "+s[0]]||u["* "+s[0]])){o===!0?o=u[a]:u[a]!==!0&&(i=s[0],l.unshift(s[1]));break}if(o!==!0)if(o&&e["throws"])t=o(t);else try{t=o(t)}catch(d){return{state:"parsererror",error:o?d:"No conversion from "+c+" to "+i}}}return{state:"success",data:t}}function m(e,t,n,r){var a;if(L.isArray(t))L.each(t,function(t,a){n||he.test(e)?r(e,a):m(e+"["+("object"==typeof a?t:"")+"]",a,n,r)});else if(n||"object"!==L.type(t))r(e,t);else for(a in t)m(e+"["+a+"]",t[a],n,r)}function g(){try{return new e.XMLHttpRequest}catch(t){}}function x(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}var b=[],j=b.slice,T=b.concat,w=b.push,E=b.indexOf,S={},C=S.toString,k=S.hasOwnProperty,D={},_="1.11.1 -css,-css/addGetHookIf,-css/curCSS,-css/defaultDisplay,-css/hiddenVisibleSelectors,-css/support,-css/swap,-css/var/cssExpand,-css/var/isHidden,-css/var/rmargin,-css/var/rnumnonpx,-effects,-effects/Tween,-effects/animatedSelector,-effects/support,-dimensions,-offset,-deprecated,-event-alias,-wrap",L=function(e,t){return new L.fn.init(e,t)},A=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,N=/^-ms-/,O=/-([\da-z])/gi,q=function(e,t){return t.toUpperCase()};L.fn=L.prototype={jquery:_,constructor:L,selector:"",length:0,toArray:function(){return j.call(this)},get:function(e){return null!=e?e<0?this[e+this.length]:this[e]:j.call(this)},pushStack:function(e){var t=L.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return L.each(this,e,t)},map:function(e){return this.pushStack(L.map(this,function(t,n){return e.call(t,n,t)}))},slice:function(){return this.pushStack(j.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(e<0?t:0);return this.pushStack(n>=0&&n<t?[this[n]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:w,sort:b.sort,splice:b.splice},L.extend=L.fn.extend=function(){var e,t,n,r,a,i,o=arguments[0]||{},s=1,c=arguments.length,u=!1;for("boolean"==typeof o&&(u=o,o=arguments[s]||{},s++),"object"==typeof o||L.isFunction(o)||(o={}),s===c&&(o=this,s--);s<c;s++)if(null!=(a=arguments[s]))for(r in a)e=o[r],n=a[r],o!==n&&(u&&n&&(L.isPlainObject(n)||(t=L.isArray(n)))?(t?(t=!1,i=e&&L.isArray(e)?e:[]):i=e&&L.isPlainObject(e)?e:{},o[r]=L.extend(u,i,n)):void 0!==n&&(o[r]=n));return o},L.extend({expando:"jQuery"+(_+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isFunction:function(e){return"function"===L.type(e)},isArray:Array.isArray||function(e){return"array"===L.type(e)},isWindow:function(e){return null!=e&&e==e.window},isNumeric:function(e){return!L.isArray(e)&&e-parseFloat(e)>=0},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},isPlainObject:function(e){var t;if(!e||"object"!==L.type(e)||e.nodeType||L.isWindow(e))return!1;try{if(e.constructor&&!k.call(e,"constructor")&&!k.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(n){return!1}if(D.ownLast)for(t in e)return k.call(e,t);for(t in e);return void 0===t||k.call(e,t)},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?S[C.call(e)]||"object":typeof e},globalEval:function(t){t&&L.trim(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(N,"ms-").replace(O,q)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,r){var a,i=0,o=e.length,s=n(e);if(r){if(s)for(;i<o&&(a=t.apply(e[i],r),a!==!1);i++);else for(i in e)if(a=t.apply(e[i],r),a===!1)break}else if(s)for(;i<o&&(a=t.call(e[i],i,e[i]),a!==!1);i++);else for(i in e)if(a=t.call(e[i],i,e[i]),a===!1)break;return e},trim:function(e){return null==e?"":(e+"").replace(A,"")},makeArray:function(e,t){var r=t||[];return null!=e&&(n(Object(e))?L.merge(r,"string"==typeof e?[e]:e):w.call(r,e)),r},inArray:function(e,t,n){var r;if(t){if(E)return E.call(t,e,n);for(r=t.length,n=n?n<0?Math.max(0,r+n):n:0;n<r;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,t){for(var n=+t.length,r=0,a=e.length;r<n;)e[a++]=t[r++];if(n!==n)for(;void 0!==t[r];)e[a++]=t[r++];return e.length=a,e},grep:function(e,t,n){for(var r,a=[],i=0,o=e.length,s=!n;i<o;i++)r=!t(e[i],i),r!==s&&a.push(e[i]);return a},map:function(e,t,r){var a,i=0,o=e.length,s=n(e),c=[];if(s)for(;i<o;i++)a=t(e[i],i,r),null!=a&&c.push(a);else for(i in e)a=t(e[i],i,r),null!=a&&c.push(a);return T.apply([],c)},guid:1,proxy:function(e,t){var n,r,a;if("string"==typeof t&&(a=e[t],t=e,e=a),L.isFunction(e))return n=j.call(arguments,2),r=function(){return e.apply(t||this,n.concat(j.call(arguments)))},r.guid=e.guid=e.guid||L.guid++,r},now:function(){return+new Date},support:D}),L.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){S["[object "+t+"]"]=t.toLowerCase()});var H,F=e.document,P=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,M=L.fn.init=function(e,t){var n,r;if(!e)return this;if("string"==typeof e){if(n="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:P.exec(e),!n||!n[1]&&t)return!t||t.jquery?(t||H).find(e):this.constructor(t).find(e);if(n[1]){if(t=t instanceof L?t[0]:t,L.merge(this,L.parseHTML(n[1],t&&t.nodeType?t.ownerDocument||t:F,!0)),rsingleTag.test(n[1])&&L.isPlainObject(t))for(n in t)L.isFunction(this[n])?this[n](t[n]):this.attr(n,t[n]);return this}if(r=F.getElementById(n[2]),r&&r.parentNode){if(r.id!==n[2])return H.find(e);this.length=1,this[0]=r}return this.context=F,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):L.isFunction(e)?"undefined"!=typeof H.ready?H.ready(e):e(L):(void 0!==e.selector&&(this.selector=e.selector,this.context=e.context),L.makeArray(e,this))};M.prototype=L.fn,H=L(F);var W=/\S+/g,R={};L.Callbacks=function(e){e="string"==typeof e?R[e]||r(e):L.extend({},e);var t,n,a,i,o,s,c=[],u=!e.once&&[],l=function(r){for(n=e.memory&&r,a=!0,o=s||0,s=0,i=c.length,t=!0;c&&o<i;o++)if(c[o].apply(r[0],r[1])===!1&&e.stopOnFalse){n=!1;break}t=!1,c&&(u?u.length&&l(u.shift()):n?c=[]:d.disable())},d={add:function(){if(c){var r=c.length;!function a(t){L.each(t,function(t,n){var r=L.type(n);"function"===r?e.unique&&d.has(n)||c.push(n):n&&n.length&&"string"!==r&&a(n)})}(arguments),t?i=c.length:n&&(s=r,l(n))}return this},remove:function(){return c&&L.each(arguments,function(e,n){for(var r;(r=L.inArray(n,c,r))>-1;)c.splice(r,1),t&&(r<=i&&i--,r<=o&&o--)}),this},has:function(e){return e?L.inArray(e,c)>-1:!(!c||!c.length)},empty:function(){return c=[],i=0,this},disable:function(){return c=u=n=void 0,this},disabled:function(){return!c},lock:function(){return u=void 0,n||d.disable(),this},locked:function(){return!u},fireWith:function(e,n){return!c||a&&!u||(n=n||[],n=[e,n.slice?n.slice():n],t?u.push(n):l(n)),this},fire:function(){return d.fireWith(this,arguments),this},fired:function(){return!!a}};return d},L.extend({Deferred:function(e){var t=[["resolve","done",L.Callbacks("once memory"),"resolved"],["reject","fail",L.Callbacks("once memory"),"rejected"],["notify","progress",L.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return a.done(arguments).fail(arguments),this},then:function(){var e=arguments;return L.Deferred(function(n){L.each(t,function(t,i){var o=L.isFunction(e[t])&&e[t];a[i[1]](function(){var e=o&&o.apply(this,arguments);e&&L.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[i[0]+"With"](this===r?n.promise():this,o?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?L.extend(e,r):r}},a={};return r.pipe=r.then,L.each(t,function(e,i){var o=i[2],s=i[3];r[i[1]]=o.add,s&&o.add(function(){n=s},t[1^e][2].disable,t[2][2].lock),a[i[0]]=function(){return a[i[0]+"With"](this===a?r:this,arguments),this},a[i[0]+"With"]=o.fireWith}),r.promise(a),e&&e.call(a,a),a},when:function(e){var t,n,r,a=0,i=j.call(arguments),o=i.length,s=1!==o||e&&L.isFunction(e.promise)?o:0,c=1===s?e:L.Deferred(),u=function(e,n,r){return function(a){n[e]=this,r[e]=arguments.length>1?j.call(arguments):a,r===t?c.notifyWith(n,r):--s||c.resolveWith(n,r)}};if(o>1)for(t=new Array(o),n=new Array(o),r=new Array(o);a<o;a++)i[a]&&L.isFunction(i[a].promise)?i[a].promise().done(u(a,r,i)).fail(c.reject).progress(u(a,n,t)):--s;return s||c.resolveWith(r,i),c.promise()}});var X;L.fn.ready=function(e){return L.ready.promise().done(e),this},L.extend({isReady:!1,readyWait:1,holdReady:function(e){e?L.readyWait++:L.ready(!0)},ready:function(e){if(e===!0?!--L.readyWait:!L.isReady){if(!F.body)return setTimeout(L.ready);L.isReady=!0,e!==!0&&--L.readyWait>0||(X.resolveWith(F,[L]),L.fn.triggerHandler&&(L(F).triggerHandler("ready"),L(F).off("ready")))}}}),L.ready.promise=function(t){if(!X)if(X=L.Deferred(),"complete"===F.readyState)setTimeout(L.ready);else if(F.addEventListener)F.addEventListener("DOMContentLoaded",i,!1),e.addEventListener("load",i,!1);else{F.attachEvent("onreadystatechange",i),e.attachEvent("onload",i);var n=!1;try{n=null==e.frameElement&&F.documentElement}catch(r){}n&&n.doScroll&&!function o(){if(!L.isReady){try{n.doScroll("left")}catch(e){return setTimeout(o,50)}a(),L.ready()}}()}return X.promise(t)};var $,B="undefined";for($ in L(D))break;D.ownLast="0"!==$,D.inlineBlockNeedsLayout=!1,L(function(){var e,t,n,r;n=F.getElementsByTagName("body")[0],n&&n.style&&(t=F.createElement("div"),r=F.createElement("div"),r.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",n.appendChild(r).appendChild(t),typeof t.style.zoom!==B&&(t.style.cssText="display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",D.inlineBlockNeedsLayout=e=3===t.offsetWidth,e&&(n.style.zoom=1)),n.removeChild(r))}),function(){var e=F.createElement("div");if(null==D.deleteExpando){D.deleteExpando=!0;try{delete e.test}catch(t){D.deleteExpando=!1}}e=null}(),L.acceptData=function(e){var t=L.noData[(e.nodeName+" ").toLowerCase()],n=+e.nodeType||1;return(1===n||9===n)&&(!t||t!==!0&&e.getAttribute("classid")===t)};var I=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,J=/([A-Z])/g;L.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(e){return e=e.nodeType?L.cache[e[L.expando]]:e[L.expando],!!e&&!s(e)},data:function(e,t,n){return c(e,t,n)},removeData:function(e,t){return u(e,t)},_data:function(e,t,n){return c(e,t,n,!0)},_removeData:function(e,t){return u(e,t,!0)}}),L.fn.extend({data:function(e,t){var n,r,a,i=this[0],s=i&&i.attributes;if(void 0===e){if(this.length&&(a=L.data(i),1===i.nodeType&&!L._data(i,"parsedAttrs"))){for(n=s.length;n--;)s[n]&&(r=s[n].name,0===r.indexOf("data-")&&(r=L.camelCase(r.slice(5)),o(i,r,a[r])));L._data(i,"parsedAttrs",!0)}return a}return"object"==typeof e?this.each(function(){L.data(this,e)}):arguments.length>1?this.each(function(){L.data(this,e,t)}):i?o(i,e,L.data(i,e)):void 0},removeData:function(e){return this.each(function(){L.removeData(this,e)})}}),L.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=L._data(e,t),n&&(!r||L.isArray(n)?r=L._data(e,t,L.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=L.queue(e,t),r=n.length,a=n.shift(),i=L._queueHooks(e,t),o=function(){L.dequeue(e,t)};"inprogress"===a&&(a=n.shift(),r--),a&&("fx"===t&&n.unshift("inprogress"),delete i.stop,a.call(e,o,i)),!r&&i&&i.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return L._data(e,n)||L._data(e,n,{empty:L.Callbacks("once memory").add(function(){L._removeData(e,t+"queue"),L._removeData(e,n)})})}}),L.fn.extend({queue:function(e,t){var n=2;return"string"!=typeof e&&(t=e,e="fx",n--),arguments.length<n?L.queue(this[0],e):void 0===t?this:this.each(function(){var n=L.queue(this,e,t);L._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&L.dequeue(this,e)})},dequeue:function(e){return this.each(function(){L.dequeue(this,e)})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,a=L.Deferred(),i=this,o=this.length,s=function(){--r||a.resolveWith(i,[i])};for("string"!=typeof e&&(t=e,e=void 0),e=e||"fx";o--;)n=L._data(i[o],e+"queueHooks"),n&&n.empty&&(r++,n.empty.add(s));return s(),a.promise(t)}}),L.event={global:{},add:function(e,t,n,r,a){var i,o,s,c,u,l,d,f,p,h,v,y=L._data(e);if(y){for(n.handler&&(c=n,n=c.handler,a=c.selector),n.guid||(n.guid=L.guid++),(o=y.events)||(o=y.events={}),(l=y.handle)||(l=y.handle=function(e){return typeof L===B||e&&L.event.triggered===e.type?void 0:L.event.dispatch.apply(l.elem,arguments)},l.elem=e),t=(t||"").match(W)||[""],s=t.length;s--;)i=Y.exec(t[s])||[],p=v=i[1],h=(i[2]||"").split(".").sort(),p&&(u=L.event.special[p]||{},p=(a?u.delegateType:u.bindType)||p,u=L.event.special[p]||{},d=L.extend({type:p,origType:v,data:r,handler:n,guid:n.guid,selector:a,needsContext:a&&L.expr.match.needsContext.test(a),namespace:h.join(".")},c),(f=o[p])||(f=o[p]=[],f.delegateCount=0,u.setup&&u.setup.call(e,r,h,l)!==!1||(e.addEventListener?e.addEventListener(p,l,!1):e.attachEvent&&e.attachEvent("on"+p,l))),u.add&&(u.add.call(e,d),d.handler.guid||(d.handler.guid=n.guid)),a?f.splice(f.delegateCount++,0,d):f.push(d),L.event.global[p]=!0);e=null}},remove:function(e,t,n,r,a){var i,o,s,c,u,l,d,f,p,h,v,y=L.hasData(e)&&L._data(e);if(y&&(l=y.events)){for(t=(t||"").match(W)||[""],u=t.length;u--;)if(s=Y.exec(t[u])||[],p=v=s[1],h=(s[2]||"").split(".").sort(),p){for(d=L.event.special[p]||{},p=(r?d.delegateType:d.bindType)||p,f=l[p]||[],s=s[2]&&new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),c=i=f.length;i--;)o=f[i],!a&&v!==o.origType||n&&n.guid!==o.guid||s&&!s.test(o.namespace)||r&&r!==o.selector&&("**"!==r||!o.selector)||(f.splice(i,1),o.selector&&f.delegateCount--,d.remove&&d.remove.call(e,o));c&&!f.length&&(d.teardown&&d.teardown.call(e,h,y.handle)!==!1||L.removeEvent(e,p,y.handle),delete l[p])}else for(p in l)L.event.remove(e,p+t[u],n,r,!0);L.isEmptyObject(l)&&(delete y.handle,L._removeData(e,"events"))}},trigger:function(t,n,r,a){var i,o,s,c,u,l,d,f=[r||F],p=k.call(t,"type")?t.type:t,h=k.call(t,"namespace")?t.namespace.split("."):[];if(s=l=r=r||F,3!==r.nodeType&&8!==r.nodeType&&!U.test(p+L.event.triggered)&&(p.indexOf(".")>=0&&(h=p.split("."),p=h.shift(),h.sort()),o=p.indexOf(":")<0&&"on"+p,t=t[L.expando]?t:new L.Event(p,"object"==typeof t&&t),t.isTrigger=a?2:3,t.namespace=h.join("."),t.namespace_re=t.namespace?new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,t.result=void 0,t.target||(t.target=r),n=null==n?[t]:L.makeArray(n,[t]),u=L.event.special[p]||{},a||!u.trigger||u.trigger.apply(r,n)!==!1)){if(!a&&!u.noBubble&&!L.isWindow(r)){for(c=u.delegateType||p,U.test(c+p)||(s=s.parentNode);s;s=s.parentNode)f.push(s),l=s;l===(r.ownerDocument||F)&&f.push(l.defaultView||l.parentWindow||e)}for(d=0;(s=f[d++])&&!t.isPropagationStopped();)t.type=d>1?c:u.bindType||p,i=(L._data(s,"events")||{})[t.type]&&L._data(s,"handle"),i&&i.apply(s,n),i=o&&s[o],i&&i.apply&&L.acceptData(s)&&(t.result=i.apply(s,n),t.result===!1&&t.preventDefault());if(t.type=p,!a&&!t.isDefaultPrevented()&&(!u._default||u._default.apply(f.pop(),n)===!1)&&L.acceptData(r)&&o&&r[p]&&!L.isWindow(r)){l=r[o],l&&(r[o]=null),L.event.triggered=p;try{r[p]()}catch(v){}L.event.triggered=void 0,l&&(r[o]=l)}return t.result}},dispatch:function(e){e=L.event.fix(e);var t,n,r,a,i,o=[],s=j.call(arguments),c=(L._data(this,"events")||{})[e.type]||[],u=L.event.special[e.type]||{};if(s[0]=e,e.delegateTarget=this,!u.preDispatch||u.preDispatch.call(this,e)!==!1){for(o=L.event.handlers.call(this,e,c),t=0;(a=o[t++])&&!e.isPropagationStopped();)for(e.currentTarget=a.elem,i=0;(r=a.handlers[i++])&&!e.isImmediatePropagationStopped();)e.namespace_re&&!e.namespace_re.test(r.namespace)||(e.handleObj=r,e.data=r.data,n=((L.event.special[r.origType]||{}).handle||r.handler).apply(a.elem,s),void 0!==n&&(e.result=n)===!1&&(e.preventDefault(),e.stopPropagation()));return u.postDispatch&&u.postDispatch.call(this,e),e.result}},handlers:function(e,t){var n,r,a,i,o=[],s=t.delegateCount,c=e.target;if(s&&c.nodeType&&(!e.button||"click"!==e.type))for(;c!=this;c=c.parentNode||this)if(1===c.nodeType&&(c.disabled!==!0||"click"!==e.type)){for(a=[],i=0;i<s;i++)r=t[i],n=r.selector+" ",void 0===a[n]&&(a[n]=r.needsContext?L(n,this).index(c)>=0:L.find(n,this,null,[c]).length),a[n]&&a.push(r);a.length&&o.push({elem:c,handlers:a})}return s<t.length&&o.push({elem:this,handlers:t.slice(s)}),o},fix:function(e){if(e[L.expando])return e;var t,n,r,a=e.type,i=e,o=this.fixHooks[a];for(o||(this.fixHooks[a]=o=K.test(a)?this.mouseHooks:Q.test(a)?this.keyHooks:{}),r=o.props?this.props.concat(o.props):this.props,e=new L.Event(i),t=r.length;t--;)n=r[t],e[n]=i[n];return e.target||(e.target=i.srcElement||F),3===e.target.nodeType&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,o.filter?o.filter(e,i):e},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,t){var n,r,a,i=t.button,o=t.fromElement;return null==e.pageX&&null!=t.clientX&&(r=e.target.ownerDocument||F,a=r.documentElement,n=r.body,e.pageX=t.clientX+(a&&a.scrollLeft||n&&n.scrollLeft||0)-(a&&a.clientLeft||n&&n.clientLeft||0),e.pageY=t.clientY+(a&&a.scrollTop||n&&n.scrollTop||0)-(a&&a.clientTop||n&&n.clientTop||0)),!e.relatedTarget&&o&&(e.relatedTarget=o===e.target?t.toElement:o),e.which||void 0===i||(e.which=1&i?1:2&i?3:4&i?2:0),e}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==safeActiveElement()&&this.focus)try{return this.focus(),!1}catch(e){}},delegateType:"focusin"},blur:{trigger:function(){if(this===safeActiveElement()&&this.blur)return this.blur(),!1},delegateType:"focusout"},click:{trigger:function(){if(L.nodeName(this,"input")&&"checkbox"===this.type&&this.click)return this.click(),!1},_default:function(e){return L.nodeName(e.target,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var a=L.extend(new L.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?L.event.trigger(a,null,t):L.event.dispatch.call(t,a),a.isDefaultPrevented()&&n.preventDefault()}},L.removeEvent=F.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]===B&&(e[r]=null),e.detachEvent(r,n))},L.Event=function(e,t){return this instanceof L.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&e.returnValue===!1?l:d):this.type=e,t&&L.extend(this,t),this.timeStamp=e&&e.timeStamp||L.now(),void(this[L.expando]=!0)):new L.Event(e,t)};var z=/^(?:input|select|textarea)$/i,Q=/^key/,K=/^(?:mouse|pointer|contextmenu)|click/,U=/^(?:focusinfocus|focusoutblur)$/,Y=/^([^.]*)(?:\.(.+)|)$/;L.Event.prototype={isDefaultPrevented:d,isPropagationStopped:d,isImmediatePropagationStopped:d,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=l,e&&(e.preventDefault?e.preventDefault():e.returnValue=!1)},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=l,e&&(e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0)},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=l,e&&e.stopImmediatePropagation&&e.stopImmediatePropagation(),this.stopPropagation()}},D.submitBubbles||(L.event.special.submit={setup:function(){return!L.nodeName(this,"form")&&void L.event.add(this,"click._submit keypress._submit",function(e){var t=e.target,n=L.nodeName(t,"input")||L.nodeName(t,"button")?t.form:void 0;n&&!L._data(n,"submitBubbles")&&(L.event.add(n,"submit._submit",function(e){e._submit_bubble=!0}),L._data(n,"submitBubbles",!0))})},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&L.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){return!L.nodeName(this,"form")&&void L.event.remove(this,"._submit")}}),D.changeBubbles||(L.event.special.change={setup:function(){return z.test(this.nodeName)?("checkbox"!==this.type&&"radio"!==this.type||(L.event.add(this,"propertychange._change",function(e){"checked"===e.originalEvent.propertyName&&(this._just_changed=!0)}),L.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),L.event.simulate("change",this,e,!0)})),!1):void L.event.add(this,"beforeactivate._change",function(e){var t=e.target;z.test(t.nodeName)&&!L._data(t,"changeBubbles")&&(L.event.add(t,"change._change",function(e){!this.parentNode||e.isSimulated||e.isTrigger||L.event.simulate("change",this.parentNode,e,!0)}),L._data(t,"changeBubbles",!0))})},handle:function(e){var t=e.target;if(this!==t||e.isSimulated||e.isTrigger||"radio"!==t.type&&"checkbox"!==t.type)return e.handleObj.handler.apply(this,arguments)},teardown:function(){return L.event.remove(this,"._change"),!z.test(this.nodeName)}}),D.focusinBubbles||L.each({focus:"focusin",blur:"focusout"},function(e,t){var n=function(e){L.event.simulate(t,e.target,L.event.fix(e),!0)};L.event.special[t]={setup:function(){var r=this.ownerDocument||this,a=L._data(r,t);a||r.addEventListener(e,n,!0),L._data(r,t,(a||0)+1)},teardown:function(){var r=this.ownerDocument||this,a=L._data(r,t)-1;a?L._data(r,t,a):(r.removeEventListener(e,n,!0),L._removeData(r,t))}}}),L.fn.extend({on:function(e,t,n,r,a){var i,o;if("object"==typeof e){"string"!=typeof t&&(n=n||t,t=void 0);for(i in e)this.on(i,t,n,e[i],a);return this}if(null==n&&null==r?(r=t,n=t=void 0):null==r&&("string"==typeof t?(r=n,n=void 0):(r=n,n=t,t=void 0)),r===!1)r=d;else if(!r)return this;return 1===a&&(o=r,r=function(e){return L().off(e),o.apply(this,arguments)},r.guid=o.guid||(o.guid=L.guid++)),this.each(function(){L.event.add(this,e,r,n,t)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,t,n){var r,a;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,L(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(a in e)this.off(a,t,e[a]);return this}return t!==!1&&"function"!=typeof t||(n=t,t=void 0),n===!1&&(n=d),this.each(function(){L.event.remove(this,e,n,t)})},trigger:function(e,t){return this.each(function(){L.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];if(n)return L.event.trigger(e,t,n,!0)}}),L.fn.delay=function(e,t){return e=L.fx?L.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})};var G=L.now(),V=/\?/,Z=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;L.parseJSON=function(t){if(e.JSON&&e.JSON.parse)return e.JSON.parse(t+"");var n,r=null,a=L.trim(t+"");return a&&!L.trim(a.replace(Z,function(e,t,a,i){return n&&t&&(r=0),0===r?e:(n=a||t,r+=!i-!a,"")}))?Function("return "+a)():L.error("Invalid JSON: "+t)},L.parseXML=function(t){var n,r;if(!t||"string"!=typeof t)return null;try{e.DOMParser?(r=new DOMParser,n=r.parseFromString(t,"text/xml")):(n=new ActiveXObject("Microsoft.XMLDOM"),n.async="false",n.loadXML(t))}catch(a){n=void 0}return n&&n.documentElement&&!n.getElementsByTagName("parsererror").length||L.error("Invalid XML: "+t),n};var ee,te,ne=/#.*$/,re=/([?&])_=[^&]*/,ae=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,ie=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,oe=/^(?:GET|HEAD)$/,se=/^\/\//,ce=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,ue={},le={},de="*/".concat("*");try{te=location.href}catch(fe){te=F.createElement("a"),te.href="",te=te.href}ee=ce.exec(te.toLowerCase())||[],L.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:te,type:"GET",isLocal:ie.test(ee[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":de,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":L.parseJSON,"text xml":L.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?h(h(e,L.ajaxSettings),t):h(L.ajaxSettings,e)},ajaxPrefilter:f(ue),ajaxTransport:f(le),ajax:function(e,t){function n(e,t,n,r){var a,l,p,b,j,w=t;2!==T&&(T=2,s&&clearTimeout(s),u=void 0,o=r||"",E.readyState=e>0?4:0,a=e>=200&&e<300||304===e,n&&(b=v(d,E,n)),b=y(d,b,E,a),a?(d.ifModified&&(j=E.getResponseHeader("Last-Modified"),j&&(L.lastModified[i]=j),j=E.getResponseHeader("etag"),j&&(L.etag[i]=j)),204===e||"HEAD"===d.type?w="nocontent":304===e?w="notmodified":(w=b.state,l=b.data,p=b.error,a=!p)):(p=w,!e&&w||(w="error",e<0&&(e=0))),E.status=e,E.statusText=(t||w)+"",a?m.resolveWith(f,[l,w,E]):m.rejectWith(f,[E,w,p]),E.statusCode(x),x=void 0,c&&h.trigger(a?"ajaxSuccess":"ajaxError",[E,d,a?l:p]),g.fireWith(f,[E,w]),c&&(h.trigger("ajaxComplete",[E,d]),--L.active||L.event.trigger("ajaxStop")))}"object"==typeof e&&(t=e,e=void 0),t=t||{};var r,a,i,o,s,c,u,l,d=L.ajaxSetup({},t),f=d.context||d,h=d.context&&(f.nodeType||f.jquery)?L(f):L.event,m=L.Deferred(),g=L.Callbacks("once memory"),x=d.statusCode||{},b={},j={},T=0,w="canceled",E={readyState:0,getResponseHeader:function(e){var t;if(2===T){if(!l)for(l={};t=ae.exec(o);)l[t[1].toLowerCase()]=t[2];t=l[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===T?o:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return T||(e=j[n]=j[n]||e,b[e]=t),this},overrideMimeType:function(e){return T||(d.mimeType=e),this},statusCode:function(e){var t;if(e)if(T<2)for(t in e)x[t]=[x[t],e[t]];else E.always(e[E.status]);return this},abort:function(e){var t=e||w;return u&&u.abort(t),n(0,t),this}};if(m.promise(E).complete=g.add,E.success=E.done,E.error=E.fail,d.url=((e||d.url||te)+"").replace(ne,"").replace(se,ee[1]+"//"),d.type=t.method||t.type||d.method||d.type,d.dataTypes=L.trim(d.dataType||"*").toLowerCase().match(W)||[""],null==d.crossDomain&&(r=ce.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]===ee[1]&&r[2]===ee[2]&&(r[3]||("http:"===r[1]?"80":"443"))===(ee[3]||("http:"===ee[1]?"80":"443")))),d.data&&d.processData&&"string"!=typeof d.data&&(d.data=L.param(d.data,d.traditional)),p(ue,d,t,E),2===T)return E;c=d.global,c&&0===L.active++&&L.event.trigger("ajaxStart"),d.type=d.type.toUpperCase(),d.hasContent=!oe.test(d.type),i=d.url,d.hasContent||(d.data&&(i=d.url+=(V.test(i)?"&":"?")+d.data,delete d.data),d.cache===!1&&(d.url=re.test(i)?i.replace(re,"$1_="+G++):i+(V.test(i)?"&":"?")+"_="+G++)),d.ifModified&&(L.lastModified[i]&&E.setRequestHeader("If-Modified-Since",L.lastModified[i]),L.etag[i]&&E.setRequestHeader("If-None-Match",L.etag[i])),(d.data&&d.hasContent&&d.contentType!==!1||t.contentType)&&E.setRequestHeader("Content-Type",d.contentType),E.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+("*"!==d.dataTypes[0]?", "+de+"; q=0.01":""):d.accepts["*"]);for(a in d.headers)E.setRequestHeader(a,d.headers[a]);if(d.beforeSend&&(d.beforeSend.call(f,E,d)===!1||2===T))return E.abort();w="abort";for(a in{success:1,error:1,complete:1})E[a](d[a]);if(u=p(le,d,t,E)){E.readyState=1,c&&h.trigger("ajaxSend",[E,d]),d.async&&d.timeout>0&&(s=setTimeout(function(){E.abort("timeout")},d.timeout));try{T=1,u.send(b,n)}catch(S){if(!(T<2))throw S;n(-1,S)}}else n(-1,"No Transport");return E},getJSON:function(e,t,n){return L.get(e,t,n,"json")},getScript:function(e,t){return L.get(e,void 0,t,"script")}}),L.each(["get","post"],function(e,t){L[t]=function(e,n,r,a){return L.isFunction(n)&&(a=a||r,r=n,n=void 0),L.ajax({url:e,type:t,dataType:a,data:n,success:r})}}),L.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){L.fn[t]=function(e){return this.on(t,e)}}),L._evalUrl=function(e){return L.ajax({url:e,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})};var pe=/%20/g,he=/\[\]$/,ve=/\r?\n/g,ye=/^(?:submit|button|image|reset|file)$/i,me=/^(?:input|select|textarea|keygen)/i;L.param=function(e,t){var n,r=[],a=function(e,t){t=L.isFunction(t)?t():null==t?"":t,r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(void 0===t&&(t=L.ajaxSettings&&L.ajaxSettings.traditional),L.isArray(e)||e.jquery&&!L.isPlainObject(e))L.each(e,function(){
a(this.name,this.value)});else for(n in e)m(n,e[n],t,a);return r.join("&").replace(pe,"+")},L.fn.extend({serialize:function(){return L.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=L.prop(this,"elements");return e?L.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!L(this).is(":disabled")&&me.test(this.nodeName)&&!ye.test(e)&&(this.checked||!rcheckableType.test(e))}).map(function(e,t){var n=L(this).val();return null==n?null:L.isArray(n)?L.map(n,function(e){return{name:t.name,value:e.replace(ve,"\r\n")}}):{name:t.name,value:n.replace(ve,"\r\n")}}).get()}}),L.ajaxSettings.xhr=void 0!==e.ActiveXObject?function(){return!this.isLocal&&/^(get|post|head|put|delete|options)$/i.test(this.type)&&g()||x()}:g;var ge=0,xe={},be=L.ajaxSettings.xhr();e.ActiveXObject&&L(e).on("unload",function(){for(var e in xe)xe[e](void 0,!0)}),D.cors=!!be&&"withCredentials"in be,be=D.ajax=!!be,be&&L.ajaxTransport(function(e){if(!e.crossDomain||D.cors){var t;return{send:function(n,r){var a,i=e.xhr(),o=++ge;if(i.open(e.type,e.url,e.async,e.username,e.password),e.xhrFields)for(a in e.xhrFields)i[a]=e.xhrFields[a];e.mimeType&&i.overrideMimeType&&i.overrideMimeType(e.mimeType),e.crossDomain||n["X-Requested-With"]||(n["X-Requested-With"]="XMLHttpRequest");for(a in n)void 0!==n[a]&&i.setRequestHeader(a,n[a]+"");i.send(e.hasContent&&e.data||null),t=function(n,a){var s,c,u;if(t&&(a||4===i.readyState))if(delete xe[o],t=void 0,i.onreadystatechange=L.noop,a)4!==i.readyState&&i.abort();else{u={},s=i.status,"string"==typeof i.responseText&&(u.text=i.responseText);try{c=i.statusText}catch(l){c=""}s||!e.isLocal||e.crossDomain?1223===s&&(s=204):s=u.text?200:404}u&&r(s,c,u,i.getAllResponseHeaders())},e.async?4===i.readyState?setTimeout(t):i.onreadystatechange=xe[o]=t:t()},abort:function(){t&&t(void 0,!0)}}}}),L.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return L.globalEval(e),e}}}),L.ajaxPrefilter("script",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),L.ajaxTransport("script",function(e){if(e.crossDomain){var t,n=F.head||L("head")[0]||F.documentElement;return{send:function(r,a){t=F.createElement("script"),t.async=!0,e.scriptCharset&&(t.charset=e.scriptCharset),t.src=e.url,t.onload=t.onreadystatechange=function(e,n){(n||!t.readyState||/loaded|complete/.test(t.readyState))&&(t.onload=t.onreadystatechange=null,t.parentNode&&t.parentNode.removeChild(t),t=null,n||a(200,"success"))},n.insertBefore(t,n.firstChild)},abort:function(){t&&t.onload(void 0,!0)}}}});var je=[],Te=/(=)\?(?=&|$)|\?\?/;L.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=je.pop()||L.expando+"_"+G++;return this[e]=!0,e}}),L.ajaxPrefilter("json jsonp",function(t,n,r){var a,i,o,s=t.jsonp!==!1&&(Te.test(t.url)?"url":"string"==typeof t.data&&!(t.contentType||"").indexOf("application/x-www-form-urlencoded")&&Te.test(t.data)&&"data");if(s||"jsonp"===t.dataTypes[0])return a=t.jsonpCallback=L.isFunction(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,s?t[s]=t[s].replace(Te,"$1"+a):t.jsonp!==!1&&(t.url+=(V.test(t.url)?"&":"?")+t.jsonp+"="+a),t.converters["script json"]=function(){return o||L.error(a+" was not called"),o[0]},t.dataTypes[0]="json",i=e[a],e[a]=function(){o=arguments},r.always(function(){e[a]=i,t[a]&&(t.jsonpCallback=n.jsonpCallback,je.push(a)),o&&L.isFunction(i)&&i(o[0]),o=i=void 0}),"script"}),L.parseHTML=function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||F;var r=rsingleTag.exec(e),a=!n&&[];return r?[t.createElement(r[1])]:(r=L.buildFragment([e],t,a),a&&a.length&&L(a).remove(),L.merge([],r.childNodes))},"function"==typeof define&&define.amd&&define("jquery",[],function(){return L});var we=e.jQuery,Ee=e.$;return L.noConflict=function(t){return e.$===L&&(e.$=Ee),t&&e.jQuery===L&&(e.jQuery=we),L},typeof t===B&&(e.jQuery=e.$=L),L});
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && (define.amd || define.cmd) ? define(factory) :
      global.CosCloud = factory();
}(this, function () {
  'use strict';

  var $ = window.jQuery.noConflict(true);

  function CosCloud(opt) {
    this.task = {};
    this.appid = opt.appid;
    this.bucket = opt.bucket;
    this.region = opt.region;

    this.sha1CacheExpired = 3 * 24 * 3600;
    this.uploadMaxThread = 5;
    this.uploadMaxRetryTimes = 3;

        this._uploadingThreadCount = 0;

        if (opt.getAppSign) {
            this.getAppSign = getEncodeFn(opt.getAppSign, this);
        }
        if (opt.getAppSignOnce) {
            this.getAppSignOnce = getEncodeFn(opt.getAppSignOnce, this);
        }
  }

    function getEncodeFn(fn, context) {
        return function (callback) {
            fn.call(context, function (s) {
                if (decodeURIComponent(s) === s) {
          s = encodeURIComponent(s);
        }
                callback(s);
            });
        };
    }

  //512K
  var SLICE_SIZE_512K = 524288;
  //1M
  var SLICE_SIZE_1M = 1048576;
  //2M
  var SLICE_SIZE_2M = 2097152;
  //3M
  var SLICE_SIZE_3M = 3145728;
  //20M 大于20M的文件需要进行分片传输
  var MAX_UNSLICE_FILE_SIZE = 20971520;

  CosCloud.prototype.cosapi_cgi_url = "//REGION.file.myqcloud.com/files/v2/";
  CosCloud.prototype.slice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
  CosCloud.prototype.sliceSize = 3 * 1024 * 1024;
  CosCloud.prototype.getExpired = function (second) {
    return new Date().getTime() / 1000 + (second || 60);
  };

  /**
   * 分片上传获取size
   * @param  {int}   size     文件分片大小,Bytes
   * return  {int}   size        文件分片大小,Bytes
   */
  CosCloud.prototype.getSliceSize = function (size) {
    var res = SLICE_SIZE_1M;

    if (size <= SLICE_SIZE_512K) {
      res = SLICE_SIZE_512K;
    } else if (size <= SLICE_SIZE_1M) {
      res = SLICE_SIZE_1M;
    } else {
      res = SLICE_SIZE_1M;
    }


    return res;

  };


  CosCloud.prototype.set = function (opt) {

    if (opt) {
      this.appid = opt.appid;
      this.bucket = opt.bucket;
      this.region = opt.region;
      if (opt.getAppSign) {
        this.getAppSign = opt.getAppSign;
      }
      if (opt.getAppSignOnce) {
        this.getAppSignOnce = opt.getAppSignOnce;
      }
    }
  };

  CosCloud.prototype.getCgiUrl = function (destPath, sign) {
    var region = this.region;
    var bucket = this.bucket;
    var url = this.cosapi_cgi_url;
    url = url.replace('REGION', region);

    return url + this.appid + '/' + bucket + '/' + destPath + '?sign=' + sign;

  };


  CosCloud.prototype.getAppSign = function (success, error, bucketName) {
    var expired = this.getExpired();
    var url = this.sign_url + "?sign_type=appSign&expired=" + expired + "&bucketName=" + bucketName;
    $.ajax({
      url: url,
      type: "GET",
      success: success,
      error: error
    });
  };

  CosCloud.prototype.getAppSignOnce = function (success, error, path, bucketName) {
    var url = this.sign_url + "?sign_type=appSign_once&path=" + encodeURIComponent(path) + "&bucketName=" + bucketName;
    $.ajax({
      url: url,
      type: "GET",
      success: success,
      error: error
    });
  };

  CosCloud.prototype.updateFolder = function (success, error, bucketName, remotePath, bizAttribute) {
    remotePath = fixPath.call(this, remotePath, 'folder');
    this.updateBase(success, error, bucketName, remotePath, bizAttribute);
  };

  CosCloud.prototype.updateFile = function (success, error, bucketName, remotePath, bizAttribute) {
    remotePath = fixPath.call(this, remotePath);
    this.updateBase(success, error, bucketName, remotePath, bizAttribute);
  };

  CosCloud.prototype.updateBase = function (success, error, bucketName, remotePath, bizAttribute, authority, customHeaders) {
    var that = this;
    that.getAppSignOnce(function (sign) {
      var url = that.getCgiUrl(remotePath, sign);

      var formData = new FormData();
      formData.append('op', 'update');

      if (bizAttribute) {
        formData.append('biz_attr', bizAttribute);
      }
      //authority 权限类型，可选参数，可选值为eInvalid,eWRPrivate,eWPrivateRPublic
      //      文件可以与bucket拥有不同的权限类型，已经设置过权限的文件如果想要撤销，直接赋值为eInvalid，则会采用bucket的权限
      if (authority) {
        formData.append('authority', authority);
      }

      if (customHeaders) {
        customHeaders = JSON.stringify(customHeaders);
        formData.append('customHeaders', customHeaders);
      }

      $.ajax({
        type: 'POST',
        url: url,
        processData: false,
        contentType: false,
        data: formData,
        success: success,
        error: error
      });
    });
  };

  CosCloud.prototype.deleteFolder = function (success, error, bucketName, remotePath) {
    remotePath = fixPath.call(this, remotePath, 'folder');
    this.deleteBase(success, error, bucketName, remotePath);
  };

  CosCloud.prototype.deleteFile = function (success, error, bucketName, remotePath) {
    remotePath = fixPath.call(this, remotePath);
    this.deleteBase(success, error, bucketName, remotePath);
  };

  CosCloud.prototype.deleteBase = function (success, error, bucketName, remotePath) {
    if (remotePath == "/") {
      error({"code": 10003, "message": "不能删除Bucket"});
      return;
    }
    var that = this;
    this.getAppSignOnce(function (sign) {
      var url = that.getCgiUrl(remotePath, sign);
      var formData = new FormData();
      formData.append('op', 'delete');
      $.ajax({
        type: 'POST',
        url: url,
        data: formData,
        processData: false,
        contentType: false,
        success: success,
        error: error
      });
    });
  };

  CosCloud.prototype.getFolderStat = function (success, error, bucketName, remotePath) {
    remotePath = fixPath(remotePath, 'folder');
    this.statBase(success, error, bucketName, remotePath);
  };

  CosCloud.prototype.getFileStat = function (success, error, bucketName, remotePath) {
    remotePath = fixPath(remotePath);
    this.statBase(success, error, bucketName, remotePath);
  };

  CosCloud.prototype.statBase = function (success, error, bucketName, remotePath) {
    var that = this;
    this.getAppSign.call(that, function (sign) {
      var url = that.getCgiUrl(remotePath, sign);
      var data = {
        op: "stat"
      };
      $.ajax({
        url: url,
        type: "GET",
        data: data,
        success: success,
        error: error
      });
    });

  };

  CosCloud.prototype.createFolder = function (success, error, bucketName, remotePath, bizAttr) {
    var that = this;
    this.getAppSign(function (sign) {
      remotePath = fixPath(remotePath, 'folder');
      var url = that.getCgiUrl(remotePath, sign);
      var formData = new FormData();
      formData.append('op', 'create');
      formData.append('biz_attr', bizAttr || '');
      $.ajax({
        type: 'POST',
        url: url,
        data: formData,
        processData: false,
        contentType: false,
        success: success,
        error: error
      });
    });
  };

  CosCloud.prototype.copyFile = function (success, error, bucketName, remotePath, destPath, overWrite) {
    var that = this;
    this.getAppSign(function (sign) {
      remotePath = fixPath(remotePath);
      var url = that.getCgiUrl(remotePath, sign);
      var formData = new FormData();
      formData.append('op', 'copy');
      formData.append('dest_fileid', destPath);
      formData.append('to_over_write', overWrite);

      $.ajax({
        type: 'POST',
        url: url,
        data: formData,
        processData: false,
        contentType: false,
        success: success,
        error: error
      });
    });
  };

  CosCloud.prototype.moveFile = function (success, error, bucketName, remotePath, destPath, overWrite) {
    var that = this;
    this.getAppSign(function (sign) {
      remotePath = fixPath(remotePath);
      var url = that.getCgiUrl(remotePath, sign);
      var formData = new FormData();
      formData.append('op', 'move');
      formData.append('dest_fileid', destPath);
      formData.append('to_over_write', overWrite);

      $.ajax({
        type: 'POST',
        url: url,
        data: formData,
        processData: false,
        contentType: false,
        success: success,
        error: error
      });
    });
  };

  CosCloud.prototype.getFolderList = function (success, error, bucketName, remotePath, num, context, order, pattern, prefix) {
    var that = this;

    remotePath = fixPath(remotePath, 'folder');

    that.listBase(success, error, bucketName, remotePath, num, context, order, pattern);
  };

  CosCloud.prototype.listBase = function (success, error, bucketName, remotePath, num, context, order, pattern, prefix) {
    var that = this;
    that.getAppSign(function (sign) {
      var url = that.getCgiUrl(remotePath, sign);

      num = num || 20;
      order = order || 0;
      pattern = pattern || 'eListBoth';

      var data = {
        op: "list",
        num: num,
        context: context,
        order: order,
        pattern: pattern
      };
      $.ajax({
        url: url,
        type: "GET",
        data: data,
        success: success,
        error: error
      });
    });
  };

  CosCloud.prototype.uploadFile = function (success, error, onprogress, bucketName, remotePath, file, insertOnly) {
    var that = this;
    remotePath = fixPath(remotePath);
    if (file.size > MAX_UNSLICE_FILE_SIZE) {
      that.sliceUploadFile.apply(that, arguments);
      return;
    }
    that.getAppSign(function (sign) {
      var url = that.getCgiUrl(remotePath, sign);
      var formData = new FormData();
      formData.append('op', 'upload');
      formData.append('fileContent', file);
      if (insertOnly >= 0) {//insertOnly==0 表示允许覆盖文件 1表示不允许 其他值忽略
        formData.append('insertOnly', insertOnly);
      }
      $.ajax({
        type: 'POST',
        url: url,
        data: formData,
        processData: false,
        contentType: false,
        xhr: function () {

          var xhr = $.ajaxSettings.xhr();
          xhr.upload.onprogress = function (evt) {
            var percent = evt.loaded / evt.total;
            if (typeof onprogress == 'function') {
              onprogress(percent);
            }
          };

          return xhr;

        },
        success: success,
        error: error
      });
    });
  };

  CosCloud.prototype.sliceUploadFile = function (success, error, onprogress, bucketName, remotePath, file, insertOnly, optSliceSize, bizAttr) {

    var that = this;
    remotePath = fixPath(remotePath);
    that.getAppSign(function (sign) {
      var opt = {};
      optSliceSize = that.getSliceSize(optSliceSize);
      opt.bucket = bucketName;
      opt.path = remotePath;
      opt.file = file;
      opt.insertOnly = insertOnly;
      opt.sliceSize = optSliceSize || 1024 * 1024;//分片不设置的话固定1M大小
      opt.appid = that.appid;
      opt.sign = sign;
      opt.biz_attr = bizAttr || '';
            opt.onprogress = function (uploaded, sha1Check) {
                if (sha1Check === undefined) sha1Check = 1;
                onprogress(uploaded, sha1Check);
            };

      //先查看是否有上传过分片
      sliceList.call(that, opt).always(function (res) {
        res = res || {};
        var data = res.data;
        if (data && data.session) {//之前上传过，直接开始上传剩下的分片
                    if (data.filesize !== opt.file.size) {
                        return error({code: -1, message: 'filesize not match'});
                    }

                    var listparts = opt.listparts || [];
          opt.session = data.session;
                    opt.listparts = listparts;
          if (listparts && listparts.length) {
            var len = listparts.length;
            opt.offset = listparts[len - 1].offset;
          }
          if (data.sha) {
                        opt.onlineSha = data.sha.split('_')[0];
          }
          getSliceSHA1.call(that, opt).done(function (uploadparts) {

            opt.uploadparts = uploadparts;
            var len = uploadparts.length;
            opt.sha = uploadparts[len - 1].datasha;

            sliceUpload.call(that, opt).done(function () {
              sliceFinish.call(that, opt).done(function (r) {
                success(r);
              }).fail(function (d) {
                                error({code: -1, message: d && d.message || 'slice finish error'});
                            });
            }).fail(function (d) {
              error({code: -1, message: (d && d.message) || 'slice upload file error'});
                        });

          }).fail(function (errMsg) {
            error({code: -1, message: errMsg || 'get slice sha1 error'});
                    });

        } else if (data && data.access_url) {//之前已经上传完成
          if (typeof opt.onprogress === 'function') {
            opt.onprogress(1);
          }
          success(res);
        } else {//之前没上传，进行sliceInit开启上传
          getSliceSHA1.call(that, opt).done(function (uploadparts) {

            opt.uploadparts = uploadparts;
            var len = uploadparts.length;
            opt.sha = uploadparts[len - 1].datasha;

            sliceInit.call(that, opt).done(function (res) {

              res = res || {};
              var data = res.data || {};

              if (data && data.access_url) { // 之前已经上传完成
                if (typeof opt.onprogress === 'function') {
                  opt.onprogress(1);
                }
                success(res);
              } else {
                sliceFinish.call(that, opt).done(function (r) {
                  success(r);
                }).fail(function (d) {
                  error({
                    code: -1,
                    message: d.message || 'slice finish error'
                  });
                });
              }

            }).fail(function (d) {
              d = d || {};
              error({
                code: d.code || -1,
                message: d.message || 'upload slice file error'
              });
            });
          }).fail(function () {
            error({
              code: -1,
              message: 'get slice sha1 error'
            });
          });
        }
      });

    });

  };
  CosCloud.prototype.uploadError = function (error, res) {
      var that = this;
      var defer = $.Deferred();
      that.task.uploadError = 'error';
      if(that.task.uploadingAjax){
        for (var i = that.task.uploadingAjax.length - 1; i >= 0; i--) {
          var ajax = that.task.uploadingAjax[i];
          ajax && ajax.abort();
        }
      }
      // that.task.onTaskProgress(true);
      defer.reject(res);
  };

  //处理路径
  function fixPath(path, type) {

    if (!path) {
      return '';
    }
    var self = this;
    path = path.replace(/(^\/*)|(\/*$)/g, '');
    if (type == 'folder') {
      path = encodeURIComponent(path + '/').replace(/%2F/g, '/');
    } else {
      path = encodeURIComponent(path).replace(/%2F/g, '/');
    }

    if (self) {
      self.path = '/' + self.appid + '/' + self.bucket + '/' + path;
    }

    return path;
  }

    var REM_SHA1_KEY = '_cos_sdk_sha1_';
    var rememberSha1 = function (session, sha1Samples, sha1CacheExpired) {
        try {
            var data = JSON.parse(localStorage.getItem(REM_SHA1_KEY)) || {};
        } catch (e) {
        }
        var current = Date.now();
        sha1Samples['update_time'] = current;
        data[session] = sha1Samples;
        // 删除太旧的数据
        for (var i = localStorage.length - 1; i >= 0; i--) {
            var key = localStorage.key(i);
      var item = localStorage.getItem(key);
      if (current - item['update_time'] > sha1CacheExpired) {
        localStorage.removeItem(key)
      }
    }
        localStorage.setItem(REM_SHA1_KEY, JSON.stringify(data));
    };
    var restoreSha1 = function (session) {
        try {
            var data = JSON.parse(localStorage.getItem(REM_SHA1_KEY)) || {};
        } catch (e) {
        }
        return data[session];
    };

  //获取分片sha1值数组
  function getSliceSHA1(opt) {
    var defer = $.Deferred();

        var sha1Algo = new window.jsSHA('SHA-1', 'BYTES');
    var read = 0;
    var unit = opt.sliceSize;
    var reader = new FileReader();
    var uploadParts = [];
    var file = opt.file;
    var fileSize = file.size;

        // 获取已存在的 session sha1 抽样
    var sha1Samples;
        if (opt.session) {
            sha1Samples = restoreSha1(opt.session);
        }

        var pushPartAndCheck = function (part) {
            uploadParts.push(part);
            // 判读是否和已存在的文件不一致，如果不一致马上结束计算
            var sha1Index = part.offset + '-' + part.datalen;
            if (sha1Samples && sha1Samples[sha1Index]) {
                if (part.datasha !== sha1Samples[sha1Index]) {
                    return false;
                }
            }
            return true;
        };

    //为了避免内存可能过大，尝试分块读取文件并计算
    reader.onload = function (e) {
      if (!file || file.length < 1) return;

      // 计算当次分块的 sha1 值
      var middle = sha1Algo.update(this.content || this.result);

      // 获取当前分块的长度
      var len = read + unit > fileSize ? fileSize - read : unit;
      var notEnd = read + len < fileSize;
      var sha1 = notEnd ? middle : sha1Algo.getHash('HEX'); // 最后一块特殊处理

      // 保存每次计算得到的 sha1
            if (!pushPartAndCheck({offset: read, datalen: len, datasha: sha1})) {
                defer.reject('sha1 not match');
                return;
      }

            // 更新已完成百分比
            read = read + len;
            opt.onprogress(0, read / fileSize);

            // 循环读文件，到最后一块处理完之后，回调所有分片数据
            if (notEnd) {
                readAsBinStr.call(reader, file.slice(read, Math.min(read + unit, fileSize)));
      } else {
                defer.resolve(uploadParts);
      }
    };
        readAsBinStr.call(reader, file.slice(read, read + unit));

    reader.onerror = function () {
      defer.reject();
    };


    return defer.promise();
  }

  //slice upload init
  function sliceInit(opt) {
    var defer = $.Deferred();
    var file = opt.file;
    var that = this;

    var url = this.getCgiUrl(opt.path, opt.sign);

    var formData = new FormData();
    var uploadparts = opt.uploadparts;
    formData.append('uploadparts', JSON.stringify(uploadparts));
    formData.append('sha', opt.sha);
    formData.append('op', 'upload_slice_init');
    formData.append('filesize', file.size);
    formData.append('slice_size', opt.sliceSize);
    formData.append('biz_attr', opt.biz_attr);
    formData.append('insertOnly', opt.insertOnly);


    $.ajax({
      type: 'POST',
      dataType: "JSON",
      url: url,
      data: formData,
      success: function (res) {
        res = res || {};
        if (res.code == 0) {

          if (res.data.access_url) {//如果秒传命中则直接返回
            defer.resolve(res);
            return;
          }
          var session = res.data.session;
          var sliceSize = parseInt(res.data.slice_size);

          var offset = res.data.offset || 0;

          opt.session = session;
          opt.slice_size = sliceSize;
          opt.offset = offset;

          sliceUpload.call(that, opt).done(function (r) {
            defer.resolve(r);
          }).fail(function (r) {
            defer.reject(r);
          });

                    // 保存正在上传的 session 文件分片 sha1，用于下一次续传优化判断是否不一样的文件
          var sItem, sha1Samples = {};
                    for (var i = 1; i < opt.uploadparts.length; i *= 2) {
                        sItem = opt.uploadparts[i - 1];
                        sha1Samples[sItem.offset + '-' + sItem.datalen] = sItem.datasha;
                    }
                    sItem = opt.uploadparts[opt.uploadparts.length - 1];
                    sha1Samples[sItem.offset + '-' + sItem.datalen] = sItem.datasha;
                    rememberSha1(opt.session, sha1Samples, that.sha1CacheExpired);

        } else {
          defer.reject(res);
        }
      },
      error: function () {
        defer.reject();
      },
      processData: false,
      contentType: false
    });

    return defer.promise();
  }


    // 上传单个分片，分片失败重传 3 次
    var uploadSingleChunk = function (task, chunk, callback) {
    var that = this;
        var formData = new FormData();
        var opt = task.opt;
        var file = opt.file;
        var slice_size = opt.slice_size;
        var session = opt.session;
        var totalSize = file.size;
        var offsetStart = chunk.start;
        var offsetEnd = Math.min(offsetStart + slice_size, totalSize);
        var blob = that.slice.call(file, offsetStart, offsetEnd);

        var removeXhr = function (xhr) {
            for (var i = task.uploadingAjax.length - 1; i >= 0; i--) {
                if (xhr === task.uploadingAjax[i]) {
                    task.uploadingAjax.splice(i, 1);
                }
            }
        };
        var uploadChunk = function (cb) {
            formData.append('sliceSize', slice_size);
            formData.append('op', 'upload_slice_data');
            formData.append('session', session);
            formData.append('offset', offsetStart);
            opt.sha && formData.append('sha', opt.sha);
            formData.append('fileContent', blob);

            that.getAppSign(function (sign) {
                opt.sign = sign;
                var url = that.getCgiUrl(opt.path, opt.sign);

                var ajax = $.ajax({
                    type: 'POST',
                    dataType: "JSON",
                    url: url,
                    data: formData,
                    xhr: function () {
                        var xhr = $.ajaxSettings.xhr();
                        xhr.upload.onprogress = function (evt) {
                            chunk.loaded = evt.loaded;
                            task.onTaskProgress && task.onTaskProgress();
                        };
                        return xhr;
                    },
                    success: function (res) {
                        res = res || {};
                        if (res.code === 0) {
                            cb(null, res);
                        } else {
                            cb('error', res);
                        }
                    },
                    error: function () {
                        cb('error');
                    },
                    complete: function () {
                        removeXhr(ajax);
                    },
                    processData: false,
                    contentType: false
                });
                task.uploadingAjax.push(ajax);
            });
    };

        // 失败重试 3 次
        var tryUpload = function (times) {
            uploadChunk(function (err, data) {
                if (err) { // fail, retry
                    if (times >= that.uploadMaxRetryTimes || task.uploadError) {
                        callback(err, data);
                    } else {
                        tryUpload(times + 1);
          }
                } else { // success
                    callback(err, data);
                }
            });
        };
        tryUpload(1);

    };


  // 分片上传单个文件
  function sliceUpload(opt) {

    var that = this;
        var file = opt.file;
    var defer = $.Deferred();

        // 整理参数
    var progressTimer;
        var task = {
            opt: opt,
            uploadingAjax: [],
      uploadingCount: 0,
      currentIndex: 0,
            chunkCount: Math.ceil(file.size / opt.slice_size),
            chunks: [],
            loadedSize: 0,
            uploadError: false,
            onTaskProgress: function (immediately) {
              var progress = function () {
                    progressTimer = 0;
                    var loaded = 0;
                    for (var i = 0; i < task.chunks.length; i++) {
                        var chunk = task.chunks[i];
                        loaded += chunk.loaded;
                    }
                    opt.onprogress && opt.onprogress(loaded / file.size, 1);
                };
              if (immediately) {
                clearTimeout(progressTimer);
                    progress();
        } else {
                    if (progressTimer) return;
                    progressTimer = setTimeout(progress, 100);
        }
            }
        };
        that.task = task;
        // 整理所有分片数据
    (function (){
            var i, offset, partMap = {};
            if (opt.listparts) {
                for (i = 0; i < opt.listparts.length; i++) {
                    partMap[opt.listparts[i].offset] = opt.listparts[i];
                }
      }
            for (i = 0; i < task.chunkCount; i++) {
              offset = i * opt.slice_size;
              var chunk = {
                    start: offset,
                    end: Math.min(offset + opt.slice_size, file.size)
                };
                chunk.state = partMap[offset] ? 'online' : 'waiting';
                chunk.loaded = partMap[offset] ? chunk.end - chunk.start : 0;
                task.chunks.push(chunk);
            }
    })();

        // 所有分片上传完成，发起回调
        var uploadSuccess = function () {
            task.onTaskProgress(true);
            defer.resolve();
        };

        // 出错的时候，结束所有上传，发起回调
        var uploadError = function (error, res) {
            task.uploadError = 'error';
            for (var i = task.uploadingAjax.length - 1; i >= 0; i--) {
              var ajax = task.uploadingAjax[i];
                ajax && ajax.abort();
            }
            task.onTaskProgress(true);
            defer.reject(res);
        };

        // 开始上传并发上传，同一个上传实例里共用线程数限制
    var uploadNextChunk = function () {
            for (; that._uploadingThreadCount < that.uploadMaxThread && task.currentIndex < task.chunkCount; task.currentIndex++) {
        var chunk = task.chunks[task.currentIndex];
        if (chunk.state !== 'waiting') continue;
        (function (chunk) {
          chunk.state = 'uploading';
                    task.uploadingCount++;
                    that._uploadingThreadCount++;
          uploadSingleChunk.call(that, task, chunk, function (error, data) {
            task.uploadingCount--;
            that._uploadingThreadCount--;
            if (error) { // 错误马上结束
              chunk.state = 'error';
              uploadError(error, data);
            } else {
              chunk.state = 'success';
              if (task.uploadingCount <= 0 && task.currentIndex >= task.chunkCount) { // 全部完成
                uploadSuccess();
              } else { // 未完成，处理执行下一个分片
                                uploadNextChunk();
              }
            }
          });
        })(chunk);
      }
    };
        uploadNextChunk();

    return defer.promise();
  }

  //分片上传LIST接口
  function sliceList(opt) {
    var that = this;
    var defer = $.Deferred();

    var file = opt.file;

    that.getAppSign(function (sign) {

      opt.sign = sign;
      var url = that.getCgiUrl(opt.path, opt.sign);

      var formData = new FormData();
      formData.append('op', 'upload_slice_list');

      $.ajax({
        type: 'POST',
        dataType: "JSON",
        url: url,
        data: formData,
        success: function (res) {
          res = res || {};
          if (res.code == 0) {
            opt.session = res.data.session;
            opt.slice_size = res.data.slice_size;
            var listparts = res.data.listparts || [];
            opt.listparts = listparts;
            var len = listparts.length;
            if (len) {
              var lastPart = opt.listparts[len - 1];
              var last_offset = lastPart.offset;
              if (last_offset + opt.slice_size >= file.size) {
                defer.resolve();
                return defer.promise();
              }
              opt.offset = last_offset;
            }

            defer.resolve(res);
          } else {
            defer.reject(res);
          }

        },
        error: function () {
          defer.reject();
        },
        processData: false,
        contentType: false
      });


    });


    return defer.promise();
  }

  //结束分片上传
  function sliceFinish(opt) {
    var that = this;
    var defer = $.Deferred();
    var file = opt.file;

    that.getAppSign(function (sign) {

      opt.sign = sign;
      var session = opt.session;

      var url = that.getCgiUrl(opt.path, opt.sign);

      var formData = new FormData();
      if (opt.sha) {
        formData.append('sha', opt.sha);
      }
      formData.append('op', 'upload_slice_finish');
      formData.append('filesize', file.size);
      formData.append('session', session);

      $.ajax({
        type: 'POST',
        dataType: "JSON",
        url: url,
        data: formData,
        success: function (res) {
          res = res || {};
          if (res.code == 0) {
            defer.resolve(res);
          } else {
            defer.reject(res);
          }

        },
        error: function () {
          defer.reject();
        },
        processData: false,
        contentType: false
      });

    });


    return defer.promise();
  }

  function readAsBinStr(fileData) {
    var readFun;
    if (FileReader.prototype.readAsBinaryString) {
            readFun = FileReader.prototype.readAsBinaryString;
    } else if (FileReader.prototype.readAsArrayBuffer) { // 在 ie11 添加 readAsBinaryString 兼容
      readFun = function (fileData) {
                var binary = "";
                var pt = this;
                var reader = new FileReader();
                reader.onload = function (e) {
                    var bytes = new Uint8Array(reader.result);
                    var length = bytes.byteLength;
                    for (var i = 0; i < length; i++) {
                        binary += String.fromCharCode(bytes[i]);
                    }
                    //pt.result  - readonly so assign binary
                    pt.content = binary;
                    pt.onload();
                };
                reader.readAsArrayBuffer(fileData);
            };
    } else {
      console.error('FileReader not support readAsBinaryString');
    }
        readFun.call(this, fileData);
  }


  return CosCloud;


}));
/*eslint-enable */
