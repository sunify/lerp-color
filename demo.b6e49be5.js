parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"Sa0M":[function(require,module,exports) {
function e(e,n,o){return e*(1-o)+n*o}module.exports=e;
},{}],"O9DC":[function(require,module,exports) {
var r=require("lerp");module.exports=function(e,n,t,u){if("number"==typeof e&&"number"==typeof n)return r(e,n,t);var o=Math.min(e.length,n.length);u=u||new Array(o);for(var a=0;a<o;a++)u[a]=r(e[a],n[a],t);return u};
},{"lerp":"Sa0M"}],"VgR0":[function(require,module,exports) {
"use strict";module.exports=((e,t,r,o)=>{const n=(e+(o||"")).toString().includes("%");if("string"==typeof e){const n=e.match(/(0?\.?\d{1,3})%?\b/g).map(Number);e=n[0],t=n[1],r=n[2],o=n[3]}else void 0!==o&&(o=parseFloat(o));if("number"!=typeof e||"number"!=typeof t||"number"!=typeof r||e>255||t>255||r>255)throw new TypeError("Expected three numbers below 256");if("number"==typeof o){if(!n&&o>=0&&o<=1)o=Math.round(255*o);else{if(!(n&&o>=0&&o<=100))throw new TypeError("Expected alpha value (".concat(o,") as a fraction or percentage"));o=Math.round(255*o/100)}o=(256|o).toString(16).slice(1)}else o="";return(r|t<<8|e<<16|1<<24).toString(16).slice(1)+o});
},{}],"LJ5r":[function(require,module,exports) {
"use strict";var e="a-f\\d",t="#?[".concat(e,"]{3}[").concat(e,"]?"),r="#?[".concat(e,"]{6}([").concat(e,"]{2})?"),n=new RegExp("[^#".concat(e,"]"),"gi"),a=new RegExp("^".concat(t,"$|^").concat(r,"$"),"i");module.exports=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if("string"!=typeof e||n.test(e)||!a.test(e))throw new TypeError("Expected a valid hex string");var r=255;8===(e=e.replace(/^#/,"")).length&&(r=parseInt(e.slice(6,8),16)/255,e=e.substring(0,6)),4===e.length&&(r=parseInt(e.slice(3,4).repeat(2),16)/255,e=e.substring(0,3)),3===e.length&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]);var c=parseInt(e,16),s=c>>16,o=c>>8&255,i=255&c;return"array"===t.format?[s,o,i,r]:{red:s,green:o,blue:i,alpha:r}};
},{}],"4Uld":[function(require,module,exports) {
"use strict";var t=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var r=t(require("rgb-hex")),e=t(require("hex-rgb")),s=/^#(?=[0-9a-fA-F]*$)(?:.{3}|.{4}|.{6}|.{8})$/,a=/^rgb\((\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\)$/,u=/^rgba\((\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d+(?:\.\d+)?|\.\d+)\)$/;exports.isColor=function(t){return s.test(String(t))||a.test(String(t))||u.test(String(t))},exports.parseColor=function(t){if(s.test(t)){var r=e.default(t,{format:"array"}),i=r[0],n=r[1],o=r[2],d=r[3];return[i,n,o,255===d?1:d]}var f;if(a.test(t)&&(f=t.match(a)))return f.slice(1,4).map(Number).concat([1]);if(u.test(t)&&(f=t.match(u)))return f.slice(1,5).map(Number)},exports.stringifyColor=function(t,e){var u=t.slice(0,3).map(Math.round),i=u[0],n=u[1],o=u[2],d=t[3];return s.test(e)?1===d?"#"+r.default(i,n,o):"#"+r.default(i,n,o,d):a.test(e)&&1===d?"rgb("+i+", "+n+", "+o+")":"rgba("+i+", "+n+", "+o+", "+d+")"};
},{"rgb-hex":"VgR0","hex-rgb":"LJ5r"}],"9B6d":[function(require,module,exports) {
"use strict";var r=this&&this.__importDefault||function(r){return r&&r.__esModule?r:{default:r}};Object.defineProperty(exports,"__esModule",{value:!0});var e=r(require("lerp-array")),t=require("./utils"),o=require("./utils");exports.isColor=o.isColor;var i=function(r,o,i){if(0===i||r===o)return r;if(1===i)return o;var u=t.parseColor(r),s=t.parseColor(o);return u&&s?t.stringifyColor(e.default(u,s,i),o):void 0};exports.default=i;
},{"lerp-array":"O9DC","./utils":"4Uld"}],"lgAh":[function(require,module,exports) {
"use strict";var e=t(require("./src/index"));function t(e){return e&&e.__esModule?e:{default:e}}var n=document.getElementById("steps"),r=document.getElementById("color1"),l=document.getElementById("color2"),a=document.getElementById("color"),o=document.getElementById("percent"),c=document.querySelector("h1 a"),d=Array.from(c.querySelectorAll("h1 span"));function u(){n.innerHTML="";for(var t=r.value,u=l.value,s=0;s<=5;s+=1){var i=(0,e.default)(t,u,s/5),m=document.createElement("div");m.style.backgroundColor=i,n.appendChild(m)}a.style.backgroundColor=(0,e.default)(t,u,Number(o.value)/100),d.forEach(function(n,r,l){n.style.color=(0,e.default)(t,u,r/(l.length-1))}),c.style.backgroundImage="linear-gradient(to right, ".concat(c.querySelector("span:first-child").style.color,", ").concat(c.querySelector("span:last-child").style.color,")")}r.value="#00aaaa",l.value="#fd8878",u(),r.addEventListener("change",u),l.addEventListener("change",u),o.addEventListener("change",u),o.addEventListener("input",u);
},{"./src/index":"9B6d"}]},{},["lgAh"], null)
//# sourceMappingURL=demo.b6e49be5.map