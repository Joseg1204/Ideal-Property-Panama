/* =========================================================
   Ideal Property Panama · script.js
   Secciones: 1 Utilidades · 2 Menú · 3 Propiedades · 4 Modal
              5 Calculadora · 6 Opiniones · 7 Formulario, cookies, FAQ y efectos
   ========================================================= */

/* ---------- 1. Utilidades ---------- */
const WA_NUMBER='50762488948';
const waLink=t=>`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t)}`;
const unsplash=(id,w=900)=>`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
const money=n=>'B/. '+Math.round(n).toLocaleString('en-US');
const toastEl=document.getElementById('toast');
function showToast(msg){toastEl.textContent=msg;toastEl.classList.add('show');clearTimeout(showToast.t);showToast.t=setTimeout(()=>toastEl.classList.remove('show'),2800)}
function el(tag,cls,text){const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n}
// Si una imagen falla al cargar, se oculta para no mostrar el ícono roto.
document.addEventListener('error',e=>{if(e.target.tagName==='IMG')e.target.style.visibility='hidden'},true);
document.querySelectorAll('img[data-img]').forEach(i=>i.src=unsplash(i.dataset.img,900));

/* ---------- 2. Menú hamburguesa ---------- */
const menuBtn=document.getElementById('menuBtn'),navLinks=document.getElementById('navLinks'),backdrop=document.getElementById('backdrop');
function setMenu(open){navLinks.classList.toggle('open',open);menuBtn.classList.toggle('active',open);backdrop.classList.toggle('show',open);document.body.classList.toggle('lock',open);menuBtn.setAttribute('aria-expanded',String(open));menuBtn.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú')}
menuBtn.addEventListener('click',()=>setMenu(!navLinks.classList.contains('open')));
backdrop.addEventListener('click',()=>setMenu(false));
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){setMenu(false);closeModal()}});

/* ---------- 3. Propiedades (datos de ejemplo: edita aquí) ---------- */
const PROPERTIES=[
 {id:1,kind:'Comercial',zone:'Ciudad de Panamá',op:'Venta',tag:'Oportunidad comercial',price:'B/. 3,250,000',loc:'Transístmica · Ciudad de Panamá',title:'Edificio comercial y galera',desc:'Espacio versátil para showroom, oficinas, almacenamiento o centro logístico.',specs:['4,596 m² de terreno','5,141 m² de construcción'],photos:['1486406146926-c627a92ad1ab','1497366216548-37526070297c','1497366811353-6870744d04b2']},
 {id:2,kind:'Comercial',zone:'Nueva Gorgona',op:'Venta',tag:'Plaza comercial',price:'B/. 2,800,000',loc:'Nueva Gorgona · Panamá Oeste',title:'Plaza comercial en Gorgona',desc:'19 locales comerciales, estacionamientos y potencial para ampliar operaciones.',specs:['3,000 m² de terreno','2,100+ m² de construcción','19 locales'],photos:['1486406146926-c627a92ad1ab','1441986300917-64674bd600d8','1555636222-cae831e670b3']},
 {id:3,kind:'Terreno',zone:'La Chorrera',op:'Venta',tag:'Terreno comercial',price:'B/. 8,835,926',loc:'La Pesa · La Chorrera',title:'Terreno frente a la Interamericana',desc:'Extensa superficie con excelente exposición sobre una vía estratégica.',specs:['2.4 hectáreas aprox.','Frente de carretera'],photos:['1500382017468-9049fed747ef','1500382017468-9049fed747ef','1472214103451-9374bd1c798e']},
 // Las siguientes 3 son EJEMPLOS para la maqueta: reemplazar con propiedades reales.
 {id:4,kind:'Residencial',zone:'Ciudad de Panamá',op:'Alquiler',tag:'Apartamento',price:'B/. 1,200 / mes',loc:'El Dorado · Ciudad de Panamá',title:'Apartamento moderno de 2 recámaras',desc:'Ambientes luminosos, cocina equipada y áreas sociales.',specs:['2 recámaras','2 baños','1 estacionamiento'],photos:['1502672260266-1c1ef2d93688','1522708323590-d24dbb6b0267','1560448204-e02f11c3d0e2']},
 {id:5,kind:'Residencial',zone:'Nueva Gorgona',op:'Venta',tag:'Casa',price:'B/. 285,000',loc:'Nueva Gorgona · Panamá Oeste',title:'Casa familiar cerca de la playa',desc:'Casa de un nivel con patio y espacio para ampliar.',specs:['3 recámaras','2 baños','Patio amplio'],photos:['1568605114967-8130f3a36994','1512917774080-9991f1c4c750','1560448204-e02f11c3d0e2']},
 {id:6,kind:'Comercial',zone:'La Chorrera',op:'Alquiler',tag:'Local comercial',price:'B/. 2,500 / mes',loc:'Centro · La Chorrera',title:'Local comercial en zona de alto tráfico',desc:'Local con vitrina a la calle, ideal para tienda o servicios.',specs:['120 m²','Vitrina frontal','Estacionamiento'],photos:['1441986300917-64674bd600d8','1555636222-cae831e670b3','1497366216548-37526070297c']}
];
const cardsEl=document.getElementById('propertyCards'),emptyEl=document.getElementById('empty');
const sel={kind:document.getElementById('kind'),zone:document.getElementById('zone'),op:document.getElementById('operation')};
function renderCards(list){
  cardsEl.innerHTML='';
  list.forEach(p=>{
    const a=el('article','property in-view');a.tabIndex=0;a.dataset.id=p.id;
    const photo=el('div','photo'),img=el('img');img.loading='lazy';img.src=unsplash(p.photos[0]);img.alt=p.title;
    photo.append(img,el('span','tag',p.tag),el('span','price',p.price));
    const body=el('div','pbody');
    const specs=el('div','specs');p.specs.slice(0,2).forEach(s=>specs.append(el('span','','▧ '+s)));
    const foot=el('div','pfoot'),more=el('span','details','Ver detalles ↗');foot.append(more,el('span','arrow','↗'));
    body.append(el('div','location',p.loc),el('h3','',p.title),el('p','',p.desc),specs,foot);
    a.append(photo,body);
    a.addEventListener('click',()=>openModal(p.id));
    a.addEventListener('keydown',e=>{if(e.key==='Enter')openModal(p.id)});
    cardsEl.append(a);
  });
  emptyEl.style.display=list.length?'none':'block';
}
function filterCards(scroll){
  const k=sel.kind.value,z=sel.zone.value,o=sel.op.value;
  renderCards(PROPERTIES.filter(p=>(k==='all'||p.kind===k)&&(z==='all'||p.zone===z)&&(o==='all'||p.op===o)));
  document.querySelectorAll('.filter').forEach(b=>b.classList.toggle('active',b.dataset.filter===k));
  if(scroll)document.getElementById('propiedades').scrollIntoView({behavior:'smooth'});
}
document.getElementById('searchBtn').addEventListener('click',()=>filterCards(true));
document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{sel.kind.value=b.dataset.filter;filterCards(false)}));
document.querySelectorAll('.zone').forEach(z=>z.addEventListener('click',()=>{sel.zone.value=z.dataset.zone;sel.kind.value='all';filterCards(true)}));
filterCards(false);

/* ---------- 4. Modal de detalle ---------- */
const modal=document.getElementById('propModal'),mImg=document.getElementById('mImg'),mThumbs=document.getElementById('mThumbs');
function openModal(id){
  const p=PROPERTIES.find(x=>x.id===id);if(!p)return;
  mImg.style.visibility='visible';mImg.src=unsplash(p.photos[0],1200);mImg.alt=p.title;
  mThumbs.innerHTML='';
  p.photos.forEach((ph,i)=>{const t=el('img',i?'':'on');t.src=unsplash(ph,200);t.alt='Foto '+(i+1);t.addEventListener('click',()=>{mImg.style.visibility='visible';mImg.src=unsplash(ph,1200);mThumbs.querySelectorAll('img').forEach(x=>x.classList.remove('on'));t.classList.add('on')});mThumbs.append(t)});
  document.getElementById('mTag').textContent=p.tag+' · '+p.op;
  document.getElementById('mLoc').textContent=p.loc;
  document.getElementById('mTitle').textContent=p.title;
  document.getElementById('mPrice').textContent=p.price;
  document.getElementById('mDesc').textContent=p.desc;
  const ul=document.getElementById('mSpecs');ul.innerHTML='';p.specs.forEach(s=>ul.append(el('li','',s)));
  document.getElementById('mCta').href=waLink(`Hola, quisiera información de: ${p.title} (${p.loc}).`);
  modal.classList.add('visible');document.body.classList.add('lock');
}
function closeModal(){modal.classList.remove('visible');if(!navLinks.classList.contains('open'))document.body.classList.remove('lock')}
document.getElementById('modalClose').addEventListener('click',closeModal);
modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});

/* ---------- 5. Calculadora de cuota ---------- */
const cIn={price:document.getElementById('cPrice'),down:document.getElementById('cDown'),years:document.getElementById('cYears'),rate:document.getElementById('cRate')};
function calc(){
  const price=Math.max(0,+cIn.price.value||0),down=+cIn.down.value,years=+cIn.years.value,rate=+cIn.rate.value;
  document.getElementById('cDownV').textContent=down;document.getElementById('cYearsV').textContent=years;document.getElementById('cRateV').textContent=rate;
  const loan=price*(1-down/100),n=years*12,r=rate/100/12;
  const monthly=r===0?loan/n:loan*r/(1-Math.pow(1+r,-n));
  document.getElementById('cMonthly').textContent=money(monthly)+' / mes';
  document.getElementById('cDownAmt').textContent=money(price-loan);
  document.getElementById('cLoan').textContent=money(loan);
  document.getElementById('cAsk').href=waLink(`Hola, estoy simulando un financiamiento: propiedad de ${money(price)}, abono ${down}%, ${years} años al ${rate}%. Cuota estimada: ${money(monthly)}/mes. Quisiera orientación.`);
}
Object.values(cIn).forEach(i=>i.addEventListener('input',calc));calc();

/* ---------- 6. Opiniones (slider + formulario) ---------- */
// Las opiniones nuevas se guardan en localStorage (solo en este navegador).
// Para un sitio real: enviar a un backend/base de datos con moderación.
const REVIEWS_KEY='ideal_reviews_v1';
const SEED_REVIEWS=[
 {name:'Cliente comprador',rating:5,text:'Me sentí acompañado durante todo el proceso. La comunicación fue clara y siempre tuve respuesta a mis preguntas.',sample:true},
 {name:'Cliente inversionista',rating:5,text:'Agradezco la orientación y la atención personalizada. Me ayudaron a entender mejor las opciones disponibles.',sample:true},
 {name:'Cliente vendedor',rating:5,text:'El seguimiento y la disposición para resolver mis dudas hicieron que el proceso fuera mucho más sencillo.',sample:true}
];
function loadUserReviews(){try{const r=JSON.parse(localStorage.getItem(REVIEWS_KEY)||'[]');return Array.isArray(r)?r:[]}catch(e){return[]}}
function saveUserReviews(r){try{localStorage.setItem(REVIEWS_KEY,JSON.stringify(r))}catch(e){}}
let userReviews=loadUserReviews(),reviewIndex=0,reviewTimer;
const track=document.getElementById('reviewTrack'),dotsEl=document.getElementById('reviewDots');
const stars=n=>'★'.repeat(n)+'☆'.repeat(5-n);
function allReviews(){return [...userReviews].reverse().concat(SEED_REVIEWS)} // las más nuevas primero
function renderReviews(){
  const list=allReviews();track.innerHTML='';dotsEl.innerHTML='';
  list.forEach((r,i)=>{
    const c=el('article','review-card'+(i===reviewIndex?' active':''));
    const meta=el('div','review-person');meta.append(el('span','',r.name));
    if(!r.sample&&i===0&&userReviews.length)meta.append(el('span','badge-new','Nueva'));
    meta.append(el('small','',r.sample?'opinión de ejemplo':new Date(r.date).toLocaleDateString('es-PA',{year:'numeric',month:'long',day:'numeric'})));
    c.append(el('div','review-stars',stars(r.rating)),el('p','review-quote','“'+r.text+'”'),meta);
    track.append(c);
    const d=el('button',i===reviewIndex?'on':'');d.setAttribute('aria-label','Ir a la opinión '+(i+1));d.addEventListener('click',()=>{showReview(i);startAuto()});dotsEl.append(d);
  });
  const avg=list.reduce((s,r)=>s+r.rating,0)/list.length;
  document.getElementById('reviewSummary').innerHTML='';
  const sum=document.getElementById('reviewSummary');sum.append(el('b','',avg.toFixed(1)),el('span','review-stars',stars(Math.round(avg))),el('span','',' · '+list.length+' opiniones'));
}
function showReview(i){const n=allReviews().length;reviewIndex=(i+n)%n;[...track.children].forEach((c,k)=>c.classList.toggle('active',k===reviewIndex));[...dotsEl.children].forEach((d,k)=>d.classList.toggle('on',k===reviewIndex))}
function startAuto(){clearInterval(reviewTimer);reviewTimer=setInterval(()=>showReview(reviewIndex+1),7000)}
document.getElementById('reviewPrev').addEventListener('click',()=>{showReview(reviewIndex-1);startAuto()});
document.getElementById('reviewNext').addEventListener('click',()=>{showReview(reviewIndex+1);startAuto()});
track.addEventListener('mouseenter',()=>clearInterval(reviewTimer));track.addEventListener('mouseleave',startAuto);
renderReviews();startAuto();
// Formulario de nueva opinión
let chosenStars=0;const starBtns=[...document.querySelectorAll('#starInput button')];
function paintStars(n){starBtns.forEach(b=>b.classList.toggle('on',+b.dataset.v<=n))}
starBtns.forEach(b=>{b.addEventListener('click',()=>{chosenStars=+b.dataset.v;paintStars(chosenStars)});b.addEventListener('mouseenter',()=>paintStars(+b.dataset.v));b.addEventListener('mouseleave',()=>paintStars(chosenStars))});
const rName=document.getElementById('rName'),rText=document.getElementById('rText');
rText.addEventListener('input',()=>document.getElementById('rCount').textContent=rText.value.length+' / 400');
document.getElementById('reviewForm').addEventListener('submit',e=>{
  e.preventDefault();
  const name=rName.value.trim(),text=rText.value.trim();
  rName.classList.toggle('invalid',name.length<2);rText.classList.toggle('invalid',text.length<10);
  if(name.length<2||text.length<10||!chosenStars){showToast(!chosenStars?'Elige una valoración de 1 a 5 estrellas.':'Escribe tu nombre y un comentario de al menos 10 caracteres.');return}
  userReviews.push({name:name.slice(0,40),rating:chosenStars,text:text.slice(0,400),date:new Date().toISOString()});
  saveUserReviews(userReviews);reviewIndex=0;renderReviews();startAuto();
  e.target.reset();chosenStars=0;paintStars(0);document.getElementById('rCount').textContent='0 / 400';
  showToast('¡Gracias! Tu opinión fue publicada.');
  document.getElementById('reviewTrack').scrollIntoView({behavior:'smooth',block:'center'});
});

/* ---------- 7. Formulario de contacto, cookies, FAQ y efectos ---------- */
document.getElementById('contactForm').addEventListener('submit',e=>{e.preventDefault();const name=document.getElementById('name').value,phone=document.getElementById('phone').value,interest=document.getElementById('interest').value,message=document.getElementById('message').value;const body=`Hola, soy ${name}. Mi teléfono es ${phone}. Estoy interesado en: ${interest}. ${message}`;window.open('https://wa.me/50762488948?text='+encodeURIComponent(body),'_blank');});
// Consentimiento de cookies: por defecto, las categorías opcionales están desactivadas.
// No hay scripts de analítica ni marketing cargados en esta maqueta.
const overlay=document.getElementById('cookieOverlay'),analytics=document.getElementById('cookieAnalytics'),marketing=document.getElementById('cookieMarketing');
const privacyOverlay=document.getElementById('privacyOverlay');
const CONSENT_KEY='ideal_cookie_consent_v2',CONSENT_VERSION='1.0';
function getConsent(){try{return JSON.parse(localStorage.getItem(CONSENT_KEY)||'null')}catch(e){return null}}
function openCookieSettings(){const c=getConsent();analytics.checked=!!(c&&c.analytics);marketing.checked=!!(c&&c.marketing);overlay.classList.add('visible');privacyOverlay.classList.remove('visible')}
function saveConsent(a,m,source='custom'){const record={necessary:true,analytics:!!a,marketing:!!m,version:CONSENT_VERSION,source,updatedAt:new Date().toISOString()};localStorage.setItem(CONSENT_KEY,JSON.stringify(record));overlay.classList.remove('visible');}
function rejectOptional(){saveConsent(false,false,'rejected')}
document.getElementById('cookieClose').addEventListener('click',rejectOptional);
document.getElementById('cookieReject').addEventListener('click',rejectOptional);
document.getElementById('cookieAccept').addEventListener('click',()=>saveConsent(true,true,'accepted-all'));
document.getElementById('cookieSave').addEventListener('click',()=>saveConsent(analytics.checked,marketing.checked,'custom'));
document.getElementById('cookieSettings').addEventListener('click',openCookieSettings);
// Privacy information and withdrawal/change path remain available from the footer.
function openPrivacy(){privacyOverlay.classList.add('visible');overlay.classList.remove('visible')}
document.getElementById('openPrivacy').addEventListener('click',openPrivacy);
document.getElementById('openPrivacyFromBanner').addEventListener('click',openPrivacy);
document.getElementById('openPrivacyFromForm').addEventListener('click',openPrivacy);
document.getElementById('privacyClose').addEventListener('click',()=>privacyOverlay.classList.remove('visible'));
document.getElementById('privacyDone').addEventListener('click',()=>privacyOverlay.classList.remove('visible'));
document.getElementById('privacyManage').addEventListener('click',openCookieSettings);
if(!getConsent())openCookieSettings();
// FAQ accordion.
document.querySelectorAll('.faq-question').forEach(q=>q.addEventListener('click',()=>{const item=q.closest('.faq-item');document.querySelectorAll('.faq-item').forEach(other=>{if(other!==item)other.classList.remove('open')});item.classList.toggle('open')}));
// Reveal effects and back-to-top button.
document.querySelectorAll('.section,.band,.property,.about-image').forEach(el=>el.classList.add('fade-in'));
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}}),{threshold:.08});document.querySelectorAll('.fade-in').forEach(el=>observer.observe(el))}else{document.querySelectorAll('.fade-in').forEach(el=>el.classList.add('in-view'))}
const toTop=document.getElementById('toTop');window.addEventListener('scroll',()=>toTop.classList.toggle('show',window.scrollY>450));toTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
