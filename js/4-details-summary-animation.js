"use strict";function _typeof(o){"@babel/helpers - typeof";return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},_typeof(o)}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,_toPropertyKey(descriptor.key),descriptor)}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);Object.defineProperty(Constructor,"prototype",{writable:false});return Constructor}function _toPropertyKey(t){var i=_toPrimitive(t,"string");return"symbol"==_typeof(i)?i:String(i)}function _toPrimitive(t,r){if("object"!=_typeof(t)||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var i=e.call(t,r||"default");if("object"!=_typeof(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}/**
* Accordion class handles the behavior of a custom accordion component,
* providing animations and interactivity to <details> and <summary> elements.
*
* HT: https://css-tricks.com/how-to-animate-the-details-element-using-waapi/
*/var Accordion=/*#__PURE__*/function(){function Accordion(el){var _this=this;_classCallCheck(this,Accordion);this.el=el;this.summary=el.querySelector("[data-accordion-heading]");this.content=el.querySelector("[data-accordion-content]");this.animation=null;this.isClosing=false;this.isExpanding=false;this.summary.addEventListener("click",function(e){return _this.onClick(e)})}_createClass(Accordion,[{key:"onClick",value:function onClick(e){e.preventDefault();this.el.style.overflow="hidden";if(this.isClosing||!this.el.open){this.open()}else if(this.isExpanding||this.el.open){this.shrink()}}},{key:"animateElement",value:function animateElement(startHeight,endHeight,onFinish){var _this2=this;if(this.animation)this.animation.cancel();this.animation=this.el.animate({height:[startHeight,endHeight]},{duration:100,easing:"ease-out"});this.animation.onfinish=onFinish;this.animation.oncancel=function(){_this2.isClosing=false;_this2.isExpanding=false}}},{key:"shrink",value:function shrink(){var _this3=this;this.isClosing=true;this.animateElement("".concat(this.el.offsetHeight,"px"),"".concat(this.summary.offsetHeight+5,"px"),function(){return _this3.onAnimationFinish(false)})}},{key:"open",value:function open(){var _this4=this;this.el.style.height="".concat(this.el.offsetHeight,"px");this.el.open=true;window.requestAnimationFrame(function(){return _this4.expand()})}},{key:"expand",value:function expand(){var _this5=this;this.isExpanding=true;var endHeight="".concat(this.summary.offsetHeight+this.content.offsetHeight-2,"px");this.animateElement("".concat(this.el.offsetHeight,"px"),endHeight,function(){return _this5.onAnimationFinish(true)})}},{key:"onAnimationFinish",value:function onAnimationFinish(open){this.el.open=open;this.animation=null;this.isClosing=false;this.isExpanding=false;this.el.style.height=this.el.style.overflow=""}}]);return Accordion}();function openDetailsFromURLFrag(){var urlFrag=location.hash;if(urlFrag&&!/fn:/.test(urlFrag)){var element=document.querySelector(urlFrag);if(element){element.open=true}}}document.addEventListener("DOMContentLoaded",function(){// open item if section corresponds with url fragment
openDetailsFromURLFrag();// Bind hash change handler
window.onhashchange=openDetailsFromURLFrag;//change hash onclick
var accordionHeadings=document.querySelectorAll("[data-accordion-heading]");accordionHeadings.forEach(function(heading){heading.addEventListener("click",function(event){var details=event.target.closest("details");var id=details===null||details===void 0?void 0:details.id;var urlFrag="";if(id&&!(details!==null&&details!==void 0&&details.open)){urlFrag="#".concat(id)}if(history.pushState){urlFrag=urlFrag||location.pathname+location.search;history.pushState(null,null,urlFrag)}else{location.hash=urlFrag}})});// Initialize the Accordion for each <details> element
document.querySelectorAll("details").forEach(function(el){return new Accordion(el)})});