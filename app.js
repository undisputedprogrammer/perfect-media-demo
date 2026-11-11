'use strict';

// Content and portfolio imagery are retained from the supplied reference.
const services = [
  { name: 'Brand Design', image: 'identity', caption: 'IDEAS, MEET IDENTITY.', description: 'Creating a visual identity for your company that communicates its values, personality, and purpose — logos, color schemes, typography, and overall visual style.', tags: ['Paper Box & Cups', '3D Sign & Regular Signage', 'Vehicle Branding', 'Rubber Stamp & Other'] },
  { name: 'Paper Products', image: 'cups', caption: 'A BETTER KIND OF EVERYDAY.', description: 'Eco-friendly, high-quality paper cups, bags, and boxes manufactured sustainably in Qatar for businesses of all sizes.', tags: ['Paper Cups', 'Paper Bags', 'Paper Boxes', 'Food Packaging'] },
  { name: 'Signage Solutions', image: 'signage', caption: 'IMPOSSIBLE TO WALK PAST.', description: 'Eye-catching 3D and regular signage for indoor and outdoor advertising that makes your brand impossible to miss.', tags: ['3D Signs', 'Regular Signage', 'Outdoor Signs', 'LED Signs'] },
  { name: 'Vehicle Branding', image: 'vehicle', caption: 'TAKE YOUR BRAND PLACES.', description: 'Professional car wrapping and fleet branding that turns your vehicles into moving advertisements across Qatar.', tags: ['Car Wrapping', 'Fleet Branding', 'Window Graphics', 'Partial Wraps'] },
  { name: 'Printing Services', image: 'cards', caption: 'EVERY DETAIL. EVERY IMPRESSION.', description: 'Complete printing solutions from premium business cards to large-format banners, delivered with exceptional quality.', tags: ['Business Cards', 'Brochures & Flyers', 'Banners & Posters', 'Stickers & Labels'] },
  { name: 'Digital Marketing', image: 'digital', caption: 'YOUR NEXT CHAPTER, ONLINE.', description: 'Strategic digital marketing to grow your brand online and reach your target audience effectively across all channels.', tags: ['Digital Strategy', 'Online Branding', 'Growth Marketing', 'Social Media'] },
];
const products = [
  { name: 'Custom Paper Cups', image: 'cups', category: 'paper', description: 'Eco-friendly custom-printed paper cups for hot and cold beverages, perfect for cafés and events.', options: ['4oz', '8oz', '12oz', '16oz'] },
  { name: 'Branded Paper Bags', image: 'bags', category: 'paper', description: 'Custom-branded paper bags in various sizes for retail and food service businesses.', options: ['Small', 'Medium', 'Large'] },
  { name: 'Custom Paper Boxes', image: 'boxes', category: 'paper', description: 'Custom packaging boxes for food, retail, and gift items with your brand printed on every box.', options: ['Food Box', 'Gift Box', 'Retail Box'] },
  { name: 'Premium Business Cards', image: 'cards', category: 'print', description: 'Premium business cards with various finishes and materials to make a lasting impression.', options: ['Standard', 'Premium', 'Foil Stamped', 'Spot UV'] },
  { name: 'Banners & Posters', image: 'banners', category: 'print', description: 'Large-format printing for indoor and outdoor advertising with vibrant, long-lasting colors.', options: ['A4', 'A3', 'A2', 'A1', 'Custom'] },
  { name: 'Custom Stickers & Labels', image: 'stickers', category: 'print', description: 'Die-cut and roll stickers in any shape, size, and material for products and promotions.', options: ['Die-Cut', 'Roll', 'Sheet', 'Vinyl'] },
  { name: 'Rubber Stamps', image: 'stamps', category: 'print', description: 'Custom rubber stamps for business and official use, available in self-inking and traditional styles.', options: ['Self-Inking', 'Pre-Inked', 'Traditional'] },
];
const projects = [
  { name: 'Food Box', image: 'food-box', category: 'Packaging' },
  { name: 'Custom Paper Cups', image: 'cups', category: 'Paper Products' },
  { name: 'Luxury Shopping Bags', image: 'bags', category: 'Packaging' },
  { name: '3D Outdoor Signage', image: 'signage', category: 'Signage' },
  { name: 'Full Vehicle Wrap', image: 'vehicle', category: 'Vehicle Branding' },
  { name: 'Brand Identity Kit', image: 'identity', category: 'Branding' },
  { name: 'Premium Business Cards', image: 'cards', category: 'Printing' },
  { name: 'Store Front Signage', image: 'storefront', category: 'Signage' },
  { name: 'Custom Stickers & Labels', image: 'stickers', category: 'Printing' },
  { name: 'Branded T-Shirts', image: 'shirts', category: 'Branding' },
  { name: 'Event Banners', image: 'banners', category: 'Printing' },
];
const iconPaths = {
  shield: '<path d="M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6z"/><path d="m8 12 3 3 5-6"/>',
  leaf: '<path d="M20 3c-9-1-16 3-16 10a7 7 0 0 0 7 7c7 0 10-8 9-17Z"/><path d="M3 21 15 9"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  pen: '<path d="m16 3 5 5-12 12-6 1 1-6Z"/><path d="m13 6 5 5"/>',
  print: '<path d="M6 8V3h12v5M6 17H3V8h18v9h-3M6 14h12v7H6z"/><path d="M17 11h1"/>',
  layers: '<path d="m12 3 10 5-10 5L2 8zM2 12l10 5 10-5M2 16l10 5 10-5"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
};
const icon = (name) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || iconPaths.shield}</svg>`;
document.querySelectorAll('[data-icon]').forEach(el => { el.outerHTML = icon(el.dataset.icon); });

const serviceList = document.querySelector('#service-list');
serviceList.innerHTML = services.map((s, i) => `<article class="service-item"><h3><button class="service-trigger" id="service-trigger-${i}" aria-expanded="${i === 0}" aria-controls="service-body-${i}" data-service="${i}"><span class="service-num">0${i + 1}</span><span class="service-name">${s.name}</span><span class="service-arrow" aria-hidden="true">↗</span></button></h3><div class="service-body" id="service-body-${i}" role="region" aria-labelledby="service-trigger-${i}" ${i ? 'hidden' : ''}><p>${s.description}</p><div class="service-tags">${s.tags.map(t => `<span>${t}</span>`).join('')}</div><a href="#quote" data-service-quote="${i}">Let’s create something together ↗</a></div></article>`).join('');
serviceList.addEventListener('click', event => {
  const trigger = event.target.closest('[data-service]');
  if (trigger) {
    const index = Number(trigger.dataset.service);
    const wasOpen = trigger.getAttribute('aria-expanded') === 'true';
    serviceList.querySelectorAll('[data-service]').forEach(button => {
      const open = button === trigger && !wasOpen;
      button.setAttribute('aria-expanded', String(open));
      document.getElementById(button.getAttribute('aria-controls')).hidden = !open;
    });
    if (!wasOpen) {
      const image = document.querySelector('#service-image');
      image.src = `assets/${services[index].image}.webp`;
      image.alt = services[index].name;
      document.querySelector('#service-caption').textContent = services[index].caption;
    }
  }
  const quoteLink = event.target.closest('[data-service-quote]');
  if (quoteLink) document.querySelector('#quote-product').value = services[Number(quoteLink.dataset.serviceQuote)].name;
});

const productTrack = document.querySelector('#product-track');
const prevProducts = document.querySelector('#products-prev');
const nextProducts = document.querySelector('#products-next');
function updateProductArrows() {
  prevProducts.disabled = productTrack.scrollLeft <= 2;
  nextProducts.disabled = productTrack.scrollLeft + productTrack.clientWidth >= productTrack.scrollWidth - 3;
}
function renderProducts(filter = 'all') {
  productTrack.innerHTML = products.map((p, i) => ({ ...p, index: i })).filter(p => filter === 'all' || p.category === filter).map(p => `<article class="product-card"><button data-product="${p.index}" aria-label="Customize ${p.name}"><div class="product-image"><img src="assets/${p.image}.webp" alt="${p.name}" width="640" height="550" loading="lazy"><span class="product-badge">${p.options.length} CUSTOM OPTIONS</span><span class="product-open" aria-hidden="true">↗</span></div><div class="product-text"><h3>${p.name}</h3><p>${p.description}</p><div class="product-options">${p.options.map(o => `<span>${o}</span>`).join('')}</div></div></button></article>`).join('');
  productTrack.scrollLeft = 0;
  requestAnimationFrame(updateProductArrows);
}
function setFilter(container, clicked) {
  container.querySelectorAll('.filter').forEach(b => {
    b.classList.toggle('active', b === clicked);
    b.setAttribute('aria-pressed', String(b === clicked));
  });
}
document.querySelector('#product-filters').addEventListener('click', e => {
  const button = e.target.closest('[data-filter]');
  if (!button) return;
  setFilter(e.currentTarget, button);
  renderProducts(button.dataset.filter);
});
productTrack.addEventListener('scroll', updateProductArrows, { passive: true });
new ResizeObserver(updateProductArrows).observe(productTrack);
prevProducts.addEventListener('click', () => productTrack.scrollBy({ left: -productTrack.clientWidth * .85, behavior: motionPaused ? 'instant' : 'smooth' }));
nextProducts.addEventListener('click', () => productTrack.scrollBy({ left: productTrack.clientWidth * .85, behavior: motionPaused ? 'instant' : 'smooth' }));
renderProducts();

const dialog = document.querySelector('#detail-dialog');
const dialogContent = document.querySelector('#dialog-content');
let dialogOpener = null;
function showDialog(html) {
  dialogOpener = document.activeElement;
  dialogContent.innerHTML = html;
  dialog.showModal();
  document.body.style.overflow = 'hidden';
}
function closeDialog() { dialog.close(); }
document.querySelector('.dialog-close').addEventListener('click', closeDialog);
dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) closeDialog(); } });
dialog.addEventListener('close', () => { document.body.style.overflow = ''; dialogOpener?.focus({ preventScroll: true }); });
productTrack.addEventListener('click', event => {
  const button = event.target.closest('[data-product]');
  if (!button) return;
  const product = products[Number(button.dataset.product)];
  showDialog(`<div class="dialog-product"><img src="assets/${product.image}.webp" alt="${product.name}"><form class="dialog-copy" id="product-config"><p class="eyebrow">MAKE IT YOURS</p><h2 id="dialog-title">${product.name}</h2><p>${product.description}</p><label for="product-option">Size / finish<select id="product-option">${product.options.map(o => `<option>${o}</option>`).join('')}</select></label><label for="product-quantity">Quantity<input id="product-quantity" type="number" min="1" max="10000000" value="100" required></label><button type="submit" class="button button-dark">Request a quote <span>↗</span></button></form></div>`);
  document.querySelector('#product-config').addEventListener('submit', e => {
    e.preventDefault();
    const form = document.querySelector('#quote-form');
    form.elements.product.value = product.name;
    form.elements.quantity.value = document.querySelector('#product-quantity').value;
    form.elements.size.value = document.querySelector('#product-option').value;
    closeDialog();
    document.querySelector('#quote').scrollIntoView({ behavior: motionPaused ? 'instant' : 'smooth' });
    form.elements.name.focus({ preventScroll: true });
  });
});

let projectFilter = 'All';
let showAllProjects = false;
const projectGrid = document.querySelector('#project-grid');
const moreProjects = document.querySelector('#more-projects');
const projectFilters = document.querySelector('#project-filters');
projectFilters.innerHTML = ['All', 'Packaging', 'Paper Products', 'Signage', 'Branding', 'Vehicle Branding', 'Printing'].map((category, i) => `<button class="filter ${i === 0 ? 'active' : ''}" aria-pressed="${i === 0}" data-category="${category}">${category}</button>`).join('');
function renderProjects() {
  const matches = projects.map((p, i) => ({ ...p, index: i })).filter(p => projectFilter === 'All' || p.category === projectFilter);
  const visible = showAllProjects ? matches : matches.slice(0, 6);
  projectGrid.innerHTML = visible.map(p => `<article class="project-card"><button data-project="${p.index}" aria-label="View ${p.name} project"><div class="project-image"><img src="assets/${p.image}.webp" alt="${p.name}" width="640" height="640" loading="lazy"><div class="project-open"><span>VIEW PROJECT ↗</span></div></div><div class="project-info"><div><h3>${p.name}</h3><p>${p.category.toUpperCase()}</p></div><span aria-hidden="true">↗</span></div></button></article>`).join('');
  moreProjects.hidden = matches.length <= 6;
  moreProjects.innerHTML = `${showAllProjects ? 'Show selected projects' : 'Explore all projects'} <span aria-hidden="true">${showAllProjects ? '↑' : '↗'}</span>`;
}
projectFilters.addEventListener('click', event => {
  const button = event.target.closest('[data-category]');
  if (!button) return;
  projectFilter = button.dataset.category;
  showAllProjects = false;
  setFilter(projectFilters, button);
  renderProjects();
});
moreProjects.addEventListener('click', () => { showAllProjects = !showAllProjects; renderProjects(); if (!showAllProjects) document.querySelector('#projects').scrollIntoView({ behavior: motionPaused ? 'instant' : 'smooth' }); });
projectGrid.addEventListener('click', event => {
  const button = event.target.closest('[data-project]');
  if (!button) return;
  const project = projects[Number(button.dataset.project)];
  showDialog(`<div class="dialog-project"><img src="assets/${project.image}.webp" alt="${project.name}"><div class="dialog-copy"><p class="eyebrow">${project.category.toUpperCase()} / PROJECT SHOWCASE</p><h2 id="dialog-title">${project.name}</h2><p>Have something similar in mind? Tell us about your brand, materials and requirements, and we’ll help bring your project to life.</p><button class="button button-dark" id="project-enquiry">Create something like this <span>↗</span></button></div></div>`);
  document.querySelector('#project-enquiry').addEventListener('click', () => {
    document.querySelector('#quote-form').elements.requirements.value = `I'm interested in a project similar to ${project.name}.`;
    closeDialog();
    document.querySelector('#quote').scrollIntoView({ behavior: motionPaused ? 'instant' : 'smooth' });
    document.querySelector('#quote-form').elements.name.focus({ preventScroll: true });
  });
});
renderProjects();

const benefits = [
  ['pin', 'Qatar-based service', 'A local team serving businesses across Qatar with fast, on-the-ground support.'],
  ['pen', 'Custom solutions', 'Every product is tailored to your brand — sizes, materials and designs made for you.'],
  ['print', 'Professional production', 'Modern printing and production processes for consistent, high-quality output.'],
  ['shield', 'Quality-focused work', 'Careful quality control from design proof to final delivery, on every order.'],
  ['layers', 'Business branding solutions', 'Complete branding under one roof — packaging, signage, print and vehicle branding.'],
  ['heart', 'Customer-focused service', 'Personalized service and direct communication with our team at every step.'],
];
document.querySelector('#benefits').innerHTML = benefits.map(([i, title, description]) => `<article class="benefit reveal">${icon(i)}<div><h3>${title}</h3><p>${description}</p></div></article>`).join('');
const quoteProduct = document.querySelector('#quote-product');
[...products.map(p => p.name), ...services.map(s => s.name), 'Other / Custom project'].forEach(name => { const option = document.createElement('option'); option.value = name; option.textContent = name; quoteProduct.append(option); });
const quoteForm = document.querySelector('#quote-form');
const localDate = new Date();
quoteForm.elements.date.min = `${localDate.getFullYear()}-${String(localDate.getMonth() + 1).padStart(2, '0')}-${String(localDate.getDate()).padStart(2, '0')}`;
quoteForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!quoteForm.reportValidity()) return;
  const data = new FormData(quoteForm);
  const fields = [['name', 'Name'], ['company', 'Company'], ['phone', 'Phone'], ['email', 'Email'], ['product', 'Product / service'], ['quantity', 'Quantity'], ['size', 'Size / finish'], ['date', 'Required date'], ['reference', 'Reference'], ['requirements', 'Additional requirements']];
  const message = 'Hello Perfect Media! I’d like a quote.\n\n' + fields.filter(([key]) => String(data.get(key) || '').trim()).map(([key, label]) => `${label}: ${String(data.get(key)).trim()}`).join('\n');
  showDialog('<div class="quote-review"><p class="eyebrow">ONE LAST LOOK</p><h2 id="dialog-title">Your idea is ready to go.</h2><p>Review your details below. Continue to WhatsApp to send this request to Perfect Media. Nothing has been sent yet.</p><pre id="quote-message"></pre><a id="send-whatsapp" class="button button-dark" target="_blank" rel="noopener noreferrer">Continue to WhatsApp <span>↗</span></a><p class="form-note">Attach any design files in your WhatsApp conversation.</p></div>');
  document.querySelector('#quote-message').textContent = message;
  document.querySelector('#send-whatsapp').href = `https://wa.me/97477317416?text=${encodeURIComponent(message)}`;
});

const menuToggle = document.querySelector('#menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
function setMenu(open) {
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  mobileMenu.classList.toggle('open', open);
  mobileMenu.inert = !open;
}
menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
mobileMenu.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') { setMenu(false); menuToggle.focus(); } });
document.addEventListener('click', event => { if (!event.target.closest('#header')) setMenu(false); });
matchMedia('(min-width: 1024px)').addEventListener('change', e => { if (e.matches) setMenu(false); });

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let motionPaused = reducedMotion.matches;
const motionButton = document.querySelector('#motion-toggle');
function setMotion(paused) {
  motionPaused = paused;
  document.documentElement.classList.toggle('motion-paused', paused);
  motionButton.setAttribute('aria-pressed', String(paused));
  motionButton.setAttribute('aria-label', paused ? 'Resume animations' : 'Pause animations');
  motionButton.title = paused ? 'Resume animations' : 'Pause animations';
  motionButton.innerHTML = `<span aria-hidden="true">${paused ? '▷' : 'Ⅱ'}</span>`;
  window.dispatchEvent(new CustomEvent('motionchange', { detail: { paused } }));
}
motionButton.addEventListener('click', () => setMotion(!motionPaused));
reducedMotion.addEventListener('change', event => setMotion(event.matches));
setMotion(motionPaused);

const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); } });
}, { threshold: .09 });
reveals.forEach(el => revealObserver.observe(el));
document.documentElement.classList.add('js-ready');

const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    countObserver.unobserve(el);
    if (motionPaused) return;
    const target = Number(el.dataset.count);
    const start = performance.now();
    function tick(now) { const progress = Math.min((now - start) / 1300, 1); el.textContent = Math.round(target * (1 - (1 - progress) ** 3)); if (progress < 1 && !motionPaused) requestAnimationFrame(tick); else el.textContent = target; }
    requestAnimationFrame(tick);
  });
}, { threshold: .8 });
document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));

const heroArt = document.querySelector('#hero-art');
heroArt.addEventListener('pointermove', event => {
  if (motionPaused || event.pointerType !== 'mouse') return;
  const rect = heroArt.getBoundingClientRect();
  heroArt.style.setProperty('--ry', `${((event.clientX - rect.left) / rect.width - .5) * 7}deg`);
  heroArt.style.setProperty('--rx', `${((event.clientY - rect.top) / rect.height - .5) * -5}deg`);
});
heroArt.addEventListener('pointerleave', () => { heroArt.style.setProperty('--rx', '0deg'); heroArt.style.setProperty('--ry', '0deg'); });

const navLinks = [...document.querySelectorAll('.desktop-nav a')];
const navSections = navLinks.map(a => document.querySelector(a.getAttribute('href')));
let scrollTicking = false;
function updateScroll() {
  const scrollTop = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  document.querySelector('.scroll-progress').style.transform = `scaleX(${maxScroll > 0 ? scrollTop / maxScroll : 0})`;
  document.querySelector('#header').classList.toggle('scrolled', scrollTop > 20);
  document.querySelector('#header').classList.toggle('on-dark', document.querySelector('#home').getBoundingClientRect().bottom > 110);
  let active = navSections[0];
  navSections.forEach(section => { if (section.getBoundingClientRect().top <= 180 && (!active || section.offsetTop > active.offsetTop)) active = section; });
  navLinks.forEach(link => { const current = link.hash === `#${active.id}`; link.classList.toggle('active', current); if (current) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); });
  scrollTicking = false;
}
window.addEventListener('scroll', () => { if (!scrollTicking) { requestAnimationFrame(updateScroll); scrollTicking = true; } }, { passive: true });
updateScroll();
document.querySelector('#year').textContent = new Date().getFullYear();
