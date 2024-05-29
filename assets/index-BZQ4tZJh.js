(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const c of s)if(c.type==="childList")for(const a of c.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function o(s){const c={};return s.integrity&&(c.integrity=s.integrity),s.referrerPolicy&&(c.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?c.credentials="include":s.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function r(s){if(s.ep)return;s.ep=!0;const c=o(s);fetch(s.href,c)}})();const p=(t,e)=>{let o;return(...r)=>{clearTimeout(o),o=setTimeout(()=>{t(...r)},e)}},w=()=>{const t=document.querySelector(".header"),e=document.body;let o=t.offsetHeight;const r=()=>{o=t.offsetHeight},s=()=>{window.scrollY>200?(t.classList.add("header_fixed"),e.style.paddingTop=`${o}px`):(t.classList.remove("header_fixed"),e.style.paddingTop="0")};window.addEventListener("resize",p(r,100)),window.addEventListener("scroll",p(s,100))},m=(t,e=0)=>{const o=t.getBoundingClientRect(),r=window.innerWidth;o.left<0?(t.style.left="0",t.style.right="auto",t.style.transform="translateX(0)"):o.right>r?(t.style.left="auto",t.style.right="0",t.style.transform="translateX(0)"):(t.style.left="50%",t.style.right="auto",t.style.transform="translateX(-50%)");const s=t.getBoundingClientRect();(s.left<0||s.right>r)&&e<3&&(e++,m(t,e))},S=()=>{const t=document.querySelectorAll(".choices"),e=({target:o})=>{o.closest(".choices")||(t.forEach(s=>{s.querySelector(".choices__box").classList.remove("choices__box_open")}),document.removeEventListener("click",e))};t.forEach(o=>{const r=o.querySelector(".choices__btn"),s=o.querySelector(".choices__box");r.addEventListener("click",()=>{s.classList.toggle("choices__box_open"),t.forEach(c=>{c!==o&&c.querySelector(".choices__box").classList.remove("choices__box_open")}),s.classList.contains("choices__box_open")?document.addEventListener("click",e):document.removeEventListener("click",e),m(s)}),window.addEventListener("resize",p(()=>{m(s)}))})},d="https://outgoing-strong-nail.glitch.me",L=t=>{if(Object.keys(t).length===0)return"";const e=new URLSearchParams;return Object.entries(t).forEach(([o,r])=>{e.append(o,r)}),`?${e.toString()}`},x=async(t={})=>{try{const e=await fetch(`${d}/api/products${L(t)}`);if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`);return await e.json()}catch(e){return console.error(`Ошибка при получении данных: ${e}`),[]}},E=async t=>{try{const e=await fetch(`${d}/api/orders`,{method:"POST",credentials:"include",headers:{"Content-type":"application/json"},body:JSON.stringify(t)});if(!e.ok)throw new Error(`Ошибка при заказе! Попробуйте позже. Код ошибки: ${e.status}`);return await e.json()}catch(e){console.error(e)}};class v{constructor(){this.observers=[]}subscribe(e){this.observers.push(e)}notifyObservers(){this.observers.forEach(e=>e())}}class P extends v{constructor(){super(),this._products=[],this.categories=new Set,this._loading=!1,this.error=null}fetchProducts(){const e=this;return async o=>{try{e.error=null,e.loading=!0,e.products=await x(o),e.loading=!1,e.notifyObservers()}catch(r){e.error=r,e.products([]),e.loading=!1,e.notifyObservers()}}}get products(){return this._products}get loading(){return this._loading}set loading(e){this._loading=e,this.notifyObservers()}set products(e){this._products=e,this.updateCategories(e),this.notifyObservers()}getCategories(){return this.categories}updateCategories(e){this.categories.clear(),e.forEach(o=>{o.categories&&o.categories.forEach(r=>{this.categories.add(r)})}),this.notifyObservers()}}class q extends v{constructor(){super(),this.cart=[]}async init(){await this.registerCart(),await this.fetchCart()}async registerCart(){try{const e=await fetch(`${d}/api/cart/register`,{method:"POST",credentials:"include"});if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`)}catch(e){console.error(e)}}getCart(){return this.cart}async fetchCart(){try{const e=await fetch(`${d}/api/cart`,{method:"GET",credentials:"include"});if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`);const o=await e.json();this.cart=o,this.notifyObservers()}catch(e){console.error(e)}}async postCart({id:e,quantity:o}){try{const r=await fetch(`${d}/api/cart/items`,{method:"POST",credentials:"include",headers:{"Content-type":"application/json"},body:JSON.stringify({productId:e,quantity:o})});if(!r.ok)throw new Error(`HTTP error! Status: ${r.status}`);const s=await r.json();this.cart=s,this.notifyObservers()}catch(r){console.error(r)}}async addProductCart(e){await this.postCart({id:e,quantity:1})}clearCart(){this.cart=[],this.notifyObservers()}}const l=new P,i=new q;function n(t,e={},...o){if(e=e||{},typeof t=="function")return t(e,...o);const r=document.createElement(t);return Object.entries(e).forEach(([s,c])=>{s==="class"?r.classList.add(...c.trim().split(" ")):s.startsWith("on")&&s.toLowerCase()in window?r.addEventListener(s.toLowerCase().substring(2),c):s==="style"&&typeof c=="object"?Object.assign(r.style,c):r.setAttribute(s,c)}),o.forEach(s=>{typeof s=="string"||typeof s=="number"?r.append(document.createTextNode(s.toString())):Array.isArray(s)?s.forEach(c=>r.append(c)):r.append(s)}),r}const O=t=>n("li",{class:"cart__item"},n("img",{class:"cart__img",src:`${d}${t.photoUrl}`,alt:`${t.name}`}),n("h4",{class:"cart__item-title"},`${t.name}`,"в"),n("div",{class:"cart__counter"},n("button",{class:"cart__counter-btn",onClick:()=>{i.postCart({id:t.id,quantity:t.quantity-1})}},"-"),n("input",{class:"cart__counter-input",type:"number",max:"99",min:"0",value:t.quantity,onInput:p(({target:e})=>{i.postCart({id:t.id,quantity:isNaN(parseInt(e.value))?t.quantity:parseInt(e.value)})},500)}),n("button",{class:"cart__counter-btn",onClick:()=>{i.postCart({id:t.id,quantity:t.quantity+1})}},"+")),n("p",{class:"cart__price"},t.price*t.quantity," ₽")),$=()=>{const t=document.querySelector(".cart__list");document.querySelector(".cart__price__total");const e=()=>{const o=i.getCart();if(t.textContent="",!o.length){const s=document.createElement("li");s.textContent="Корзина пуста",s.classList.add("cart__no-product"),t.append(s);return}const r=o.map(O);t.append(...r)};i.subscribe(e),e()},f=document.querySelector(".header__cart-button"),T=document.querySelector(".cart__close"),h=document.querySelector(".cart"),D=document.querySelector(".cart__price__total"),j=()=>{h.classList.toggle("cart_open"),h.classList.contains("cart_open")&&window.innerWidth>1360&&h.scrollIntoView({behavior:"smooth"})},k=async()=>{await i.init(),f.textContent=i.getCart().length.toString(),$(),i.subscribe(()=>{const t=i.getCart();f.textContent=t.length.toString();const e=t.reduce((o,r)=>o+r.price*r.quantity,0);D.innerHTML=`${e}&nbsp;₽`}),f.addEventListener("click",j),T.addEventListener("click",()=>{h.classList.remove("cart_open")})},H=t=>{const{photoUrl:e}=t,{price:o}=t;return n("li",{class:"goods__item"},n("article",{class:"goods__card card"},n("img",{class:"card__image",src:`${d}${e}`,alt:t.name}),n("div",{class:"card__content"},n("h3",{class:"card__title"},t.name),n("div",{class:"card__footer"},n("p",{class:"card__date-delivery"},"сегодня в 14:00"),n("button",{class:"card__button",onMouseEnter:r=>{r.target.textContent="В корзину"},onMouseLeave:r=>{r.target.innerHTML=`${o}&nbsp;₽`},onClick:()=>{i.addProductCart(t.id)}},o," ₽")))))},I=async()=>{const t=document.querySelector(".goods__list"),e=()=>{const o=l.products;if(t.innerHTML="",o.length===0&&!l.loading){const r=document.createElement("li");r.textContent="Товары не найдены",r.classList.add("goods__no-product"),t.append(r);return}o.forEach(r=>{const s=H(r);t.append(s)})};l.subscribe(e),e()},F=t=>n("li",{class:"filter__type-item"},n("button",{class:"filter__type-button",type:"button"},t)),M=t=>n("ul",{class:"filter__type-list"},t.map(F)),W=()=>{const t=document.querySelector(".filter__choices_type"),e=document.querySelector(".filter__choices-box_type"),o=()=>{const r=l.getCategories();if(r.size){t.style.display="",e.textContent="";const s=M([...r]);e.append(s)}else t.style.display="none";l.subscribe(o)};o()},C=async function(t,e,...o){const r=document.createElement("div");r.classList.add("preload"),t.append(r),t.style.position="relative",r.style.display="flex";try{return await e(...o)}finally{r.style.display="none",r.remove(),r.style.position=""}},N=()=>{const t=document.querySelector(".filter__form"),e=document.querySelector(".goods__title"),o=document.querySelector(".goods"),r=c=>{const a=new FormData(t),_=a.get("type"),y=a.get("minPrice"),g=a.get("maxPrice"),u={};_&&(u.type=_),y&&(u.minPrice=y),g&&(u.maxPrice=g),c&&(u.category=c),l.fetchProducts(),C(o,l.fetchProducts(),u)};r();const s=p(r,500);t.addEventListener("input",c=>{const a=c.target;if(a.name==="type"){e.textContent=a.labels[0].textContent,t.minPrice.value="",t.maxPrice.value="",r();return}(a.name==="minPrice"||a.name==="maxPrice")&&s()}),t.addEventListener("click",({target:c})=>{c.closest(".filter__type-button")&&r(c.textContent)})},A=()=>{const t=document.querySelector(".header__form"),e=document.querySelector(".goods__title"),o=document.querySelector(".goods");t.addEventListener("submit",r=>{r.preventDefault();const c=new FormData(t).get("search").trim();c&&(e.textContent="Результат поиска",C(o,l.fetchProducts(),{search:c}))})},B=()=>{document.querySelector(".order__select-wrapper").classList.add("order__select-wrapper_active")},R=()=>{document.querySelector(".order__select-wrapper").classList.remove("order__select-wrapper_active")},U=t=>{const e=new Date;e.setDate(e.getDate()+1);const o=e.getDate()<10?`0${e.getDate()}`:e.getDate(),r=e.getMonth()+1<10?`0${e.getMonth()+1}`:e.getMonth()+1,s=`${o}.${r}`;return n("div",{class:"order"},n("div",{class:"order__wrapper"},n("h2",{class:"order__title"},"Оформить заказ"),n("form",{class:"order__form",id:"order"},n("fieldset",{class:"order__fieldset"},n("legend",{class:"order__legend"},"Данные заказчика"),n("div",{class:"order__input-group"},n("input",{class:"order__input",type:"text",name:"name-buyer",placeholder:"Имя"}),n("input",{class:"order__input",type:"text",name:"phone-buyer",placeholder:"Телефон"}))),n("fieldset",{class:"order__fieldset"},n("legend",{class:"order__legend"},"Данные получателя"),n("div",{class:"order__input-group"},n("input",{class:"order__input",type:"text",name:"name-recipient",placeholder:"Имя"}),n("input",{class:"order__input",type:"text",name:"phone-recipient",placeholder:"Телефон"}))),n("fieldset",{class:"order__fieldset"},n("legend",{class:"order__legend"},"Адрес"),n("div",{class:"order__input-group"},n("input",{class:"order__input",type:"text",name:"street",placeholder:"Улица"}),n("input",{class:"order__input order__input_min",type:"text",name:"house",placeholder:"Дом"}),n("input",{class:"order__input order__input_min",type:"text",name:"apartment",placeholder:"Квартира"}))),n("fieldset",{class:"order__fieldset"},n("div",{class:"order__payment"},n("label",{class:"order__label-radio"},n("input",{class:"order__radio",type:"radio",name:"payment-online",value:"true",checked:!0}),"Оплата онлайн"," ")),n("div",{class:"order__delivery"},n("label",{for:"delivery"},"Доставка ",s),n("input",{type:"hidden",name:"delivery-date",value:s}),n("div",{class:"order__select-wrapper"},n("select",{class:"order__select",name:"delivery-time",id:"delivery",onFocus:B,onBlur:R},n("option",{value:"9-12"},"с 9:00 до 12:00"),n("option",{value:"12-15"},"с 12:00 до 15:00"),n("option",{value:"15-18"},"с 15:00 до 18:00"),n("option",{value:"18-21"},"с 18:00 до 21:00")))))),n("div",{class:"order__footer"},n("p",{class:"order__total"},t," ₽"),n("button",{class:"order__button",type:"submit",form:"order"},"Заказать"))),n("button",{class:"order__close",type:"button"},"×"))},V=t=>n("div",{class:"order__wrapper"},n("h2",{class:"order__title"},"Заказ оформлен"),n("p",{class:"order__id"},"Ваш номер заказа: ",t)),b=document.querySelector(".cart__order-btn"),z=document.querySelector(".cart"),X=()=>{const e=i.getCart().reduce((s,c)=>s+c.price*c.quantity,0),o=U(e);document.body.append(o),o.addEventListener("click",({target:s})=>{(s===o||s.closest(".order__close"))&&o.remove()});const r=o.querySelector(".order__form");r.addEventListener("submit",async s=>{s.preventDefault();const c=new FormData(r),a={buyer:{name:c.get("name-buyer"),phone:c.get("phone-buyer")},recipient:{name:c.get("name-buyer"),phone:c.get("phone-recipient")},address:`${c.get("street")}, ${c.get("house")}-${c.get("apartment")}`,paymentOnline:`${c.get("payment-online")==="true"}`,deliveryDate:c.get("delivery-date"),deliveryTime:c.get("delivery-time")},_=await E(a),y=V(_.orderId);o.textContent="",o.append(y),i.clearCart(),z.classList.remove("cart_open")})},J=()=>{const t=()=>{const e=i.getCart();b.disabled=!e.length};i.subscribe(t),b.addEventListener("click",X)},Q=async()=>{w(),S(),W(),k(),A(),I(),N(),J()};document.addEventListener("DOMContentLoaded",Q);
