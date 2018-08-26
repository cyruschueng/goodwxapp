function earcut(a,c,b){b=b||2;var e=c&&c.length,d=e?c[0]*b:a.length,f=linkedList(a,0,d,b,!0),g=[];if(!f)return g;var h,k,l,n;e&&(f=eliminateHoles(a,c,f,b));if(a.length>80*b){h=c=a[0];k=e=a[1];for(var m=b;m<d;m+=b)l=a[m],n=a[m+1],l<h&&(h=l),n<k&&(k=n),l>c&&(c=l),n>e&&(e=n);l=Math.max(c-h,e-k)}earcutLinked(f,g,b,h,k,l);return g}
function linkedList(a,c,b,e,d){var f;if(d===0<signedArea(a,c,b,e))for(d=c;d<b;d+=e)f=insertNode(d,a[d],a[d+1],f);else for(d=b-e;d>=c;d-=e)f=insertNode(d,a[d],a[d+1],f);f&&equals(f,f.next)&&(removeNode(f),f=f.next);return f}function filterPoints(a,c){if(!a)return a;c||(c=a);var b=a,e;do if(e=!1,b.steiner||!equals(b,b.next)&&0!==area(b.prev,b,b.next))b=b.next;else{removeNode(b);b=c=b.prev;if(b===b.next)return null;e=!0}while(e||b!==c);return c}
function earcutLinked(a,c,b,e,d,f,g){if(a){!g&&f&&indexCurve(a,e,d,f);for(var h=a,k,l;a.prev!==a.next;)if(k=a.prev,l=a.next,f?isEarHashed(a,e,d,f):isEar(a))c.push(k.i/b),c.push(a.i/b),c.push(l.i/b),removeNode(a),h=a=l.next;else if(a=l,a===h){g?1===g?(a=cureLocalIntersections(a,c,b),earcutLinked(a,c,b,e,d,f,2)):2===g&&splitEarcut(a,c,b,e,d,f):earcutLinked(filterPoints(a),c,b,e,d,f,1);break}}}
function isEar(a){var c=a.prev,b=a.next;if(0<=area(c,a,b))return!1;for(var e=a.next.next;e!==a.prev;){if(pointInTriangle(c.x,c.y,a.x,a.y,b.x,b.y,e.x,e.y)&&0<=area(e.prev,e,e.next))return!1;e=e.next}return!0}
function isEarHashed(a,c,b,e){var d=a.prev,f=a.next;if(0<=area(d,a,f))return!1;var g=d.x>a.x?d.x>f.x?d.x:f.x:a.x>f.x?a.x:f.x,h=d.y>a.y?d.y>f.y?d.y:f.y:a.y>f.y?a.y:f.y,k=zOrder(d.x<a.x?d.x<f.x?d.x:f.x:a.x<f.x?a.x:f.x,d.y<a.y?d.y<f.y?d.y:f.y:a.y<f.y?a.y:f.y,c,b,e);c=zOrder(g,h,c,b,e);for(b=a.nextZ;b&&b.z<=c;){if(b!==a.prev&&b!==a.next&&pointInTriangle(d.x,d.y,a.x,a.y,f.x,f.y,b.x,b.y)&&0<=area(b.prev,b,b.next))return!1;b=b.nextZ}for(b=a.prevZ;b&&b.z>=k;){if(b!==a.prev&&b!==a.next&&pointInTriangle(d.x,
d.y,a.x,a.y,f.x,f.y,b.x,b.y)&&0<=area(b.prev,b,b.next))return!1;b=b.prevZ}return!0}function cureLocalIntersections(a,c,b){var e=a;do{var d=e.prev,f=e.next.next;!equals(d,f)&&intersects(d,e,e.next,f)&&locallyInside(d,f)&&locallyInside(f,d)&&(c.push(d.i/b),c.push(e.i/b),c.push(f.i/b),removeNode(e),removeNode(e.next),e=a=f);e=e.next}while(e!==a);return e}
function splitEarcut(a,c,b,e,d,f){var g=a;do{for(var h=g.next.next;h!==g.prev;){if(g.i!==h.i&&isValidDiagonal(g,h)){a=splitPolygon(g,h);g=filterPoints(g,g.next);a=filterPoints(a,a.next);earcutLinked(g,c,b,e,d,f);earcutLinked(a,c,b,e,d,f);return}h=h.next}g=g.next}while(g!==a)}
function eliminateHoles(a,c,b,e){var d=[],f,g,h,k;f=0;for(g=c.length;f<g;f++)h=c[f]*e,k=f<g-1?c[f+1]*e:a.length,h=linkedList(a,h,k,e,!1),h===h.next&&(h.steiner=!0),d.push(getLeftmost(h));d.sort(compareX);for(f=0;f<d.length;f++)eliminateHole(d[f],b),b=filterPoints(b,b.next);return b}function compareX(a,c){return a.x-c.x}function eliminateHole(a,c){if(c=findHoleBridge(a,c)){var b=splitPolygon(c,a);filterPoints(b,b.next)}}
function findHoleBridge(a,c){var b=c,e=a.x,d=a.y,f=-Infinity,g;do{if(d<=b.y&&d>=b.next.y){var h=b.x+(d-b.y)*(b.next.x-b.x)/(b.next.y-b.y);if(h<=e&&h>f){f=h;if(h===e){if(d===b.y)return b;if(d===b.next.y)return b.next}g=b.x<b.next.x?b:b.next}}b=b.next}while(b!==c);if(!g)return null;if(e===f)return g.prev;for(var h=g,k=g.x,l=g.y,n=Infinity,m,b=g.next;b!==h;)e>=b.x&&b.x>=k&&pointInTriangle(d<l?e:f,d,k,l,d<l?f:e,d,b.x,b.y)&&(m=Math.abs(d-b.y)/(e-b.x),(m<n||m===n&&b.x>g.x)&&locallyInside(b,a)&&(g=b,n=m)),
b=b.next;return g}function indexCurve(a,c,b,e){var d=a;do null===d.z&&(d.z=zOrder(d.x,d.y,c,b,e)),d.prevZ=d.prev,d=d.nextZ=d.next;while(d!==a);d.prevZ.nextZ=null;d.prevZ=null;sortLinked(d)}
function sortLinked(a){var c,b,e,d,f,g,h,k=1;do{b=a;d=a=null;for(f=0;b;){f++;e=b;for(c=g=0;c<k&&(g++,e=e.nextZ,e);c++);for(h=k;0<g||0<h&&e;)0===g?(c=e,e=e.nextZ,h--):0!==h&&e?b.z<=e.z?(c=b,b=b.nextZ,g--):(c=e,e=e.nextZ,h--):(c=b,b=b.nextZ,g--),d?d.nextZ=c:a=c,c.prevZ=d,d=c;b=e}d.nextZ=null;k*=2}while(1<f);return a}
function zOrder(a,c,b,e,d){a=32767*(a-b)/d;c=32767*(c-e)/d;a=(a|a<<8)&16711935;a=(a|a<<4)&252645135;a=(a|a<<2)&858993459;c=(c|c<<8)&16711935;c=(c|c<<4)&252645135;c=(c|c<<2)&858993459;return(a|a<<1)&1431655765|((c|c<<1)&1431655765)<<1}function getLeftmost(a){var c=a,b=a;do c.x<b.x&&(b=c),c=c.next;while(c!==a);return b}function pointInTriangle(a,c,b,e,d,f,g,h){return 0<=(d-g)*(c-h)-(a-g)*(f-h)&&0<=(a-g)*(e-h)-(b-g)*(c-h)&&0<=(b-g)*(f-h)-(d-g)*(e-h)}
function isValidDiagonal(a,c){return a.next.i!==c.i&&a.prev.i!==c.i&&!intersectsPolygon(a,c)&&locallyInside(a,c)&&locallyInside(c,a)&&middleInside(a,c)}function area(a,c,b){return(c.y-a.y)*(b.x-c.x)-(c.x-a.x)*(b.y-c.y)}function equals(a,c){return a.x===c.x&&a.y===c.y}function intersects(a,c,b,e){return equals(a,c)&&equals(b,e)||equals(a,e)&&equals(b,c)?!0:0<area(a,c,b)!==0<area(a,c,e)&&0<area(b,e,a)!==0<area(b,e,c)}
function intersectsPolygon(a,c){var b=a;do{if(b.i!==a.i&&b.next.i!==a.i&&b.i!==c.i&&b.next.i!==c.i&&intersects(b,b.next,a,c))return!0;b=b.next}while(b!==a);return!1}function locallyInside(a,c){return 0>area(a.prev,a,a.next)?0<=area(a,c,a.next)&&0<=area(a,a.prev,c):0>area(a,c,a.prev)||0>area(a,a.next,c)}function middleInside(a,c){var b=a,e=!1,d=(a.x+c.x)/2,f=(a.y+c.y)/2;do b.y>f!==b.next.y>f&&d<(b.next.x-b.x)*(f-b.y)/(b.next.y-b.y)+b.x&&(e=!e),b=b.next;while(b!==a);return e}
function splitPolygon(a,c){var b=new Node(a.i,a.x,a.y),e=new Node(c.i,c.x,c.y),d=a.next,f=c.prev;a.next=c;c.prev=a;b.next=d;d.prev=b;e.next=b;b.prev=e;f.next=e;e.prev=f;return e}function insertNode(a,c,b,e){a=new Node(a,c,b);e?(a.next=e.next,a.prev=e,e.next.prev=a,e.next=a):(a.prev=a,a.next=a);return a}function removeNode(a){a.next.prev=a.prev;a.prev.next=a.next;a.prevZ&&(a.prevZ.nextZ=a.nextZ);a.nextZ&&(a.nextZ.prevZ=a.prevZ)}
function Node(a,c,b){this.i=a;this.x=c;this.y=b;this.nextZ=this.prevZ=this.z=this.next=this.prev=null;this.steiner=!1}earcut.deviation=function(a,c,b,e){var d=c&&c.length,f=Math.abs(signedArea(a,0,d?c[0]*b:a.length,b));if(d)for(var d=0,g=c.length;d<g;d++)f-=Math.abs(signedArea(a,c[d]*b,d<g-1?c[d+1]*b:a.length,b));for(d=c=0;d<e.length;d+=3){var g=e[d]*b,h=e[d+1]*b,k=e[d+2]*b;c+=Math.abs((a[g]-a[k])*(a[h+1]-a[g+1])-(a[g]-a[h])*(a[k+1]-a[g+1]))}return 0===f&&0===c?0:Math.abs((c-f)/f)};
function signedArea(a,c,b,e){for(var d=0,f=b-e;c<b;c+=e)d+=(a[f]-a[c])*(a[c+1]+a[f+1]),f=c;return d}earcut.flatten=function(a){for(var c=a[0][0].length,b={vertices:[],holes:[],dimensions:c},e=0,d=0;d<a.length;d++){for(var f=0;f<a[d].length;f++)for(var g=0;g<c;g++)b.vertices.push(a[d][f][g]);0<d&&(e+=a[d-1].length,b.holes.push(e))}return b};