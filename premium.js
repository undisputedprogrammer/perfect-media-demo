'use strict';

(() => {
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const paused = () => reduced.matches || root.classList.contains('motion-paused');

  // The intro ends on asset readiness, has a hard deadline, and can be skipped.
  const loader = document.querySelector('#preloader');
  const skip = document.querySelector('#skip-intro');
  let introFinished = !root.classList.contains('intro-pending');
  let introDeadline;
  const startedAt = performance.now();
  function finishIntro(immediate = false) {
    if (introFinished) return;
    introFinished = true;
    clearTimeout(window.introSafetyTimer);
    clearTimeout(introDeadline);
    const hadFocus = loader.contains(document.activeElement);
    document.querySelectorAll('[data-intro-inert]').forEach(el => {
      el.inert = false;
      delete el.dataset.introInert;
    });
    root.classList.remove('intro-pending');
    loader.removeAttribute('aria-modal');
    if (immediate || paused()) loader.hidden = true;
    else {
      loader.classList.add('leaving');
      setTimeout(() => { loader.hidden = true; loader.classList.remove('leaving'); }, 900);
    }
    if (hadFocus) {
      const main = document.querySelector('#main');
      main.setAttribute('tabindex', '-1');
      main.focus({ preventScroll: true });
    }
  }
  if (introFinished) loader.hidden = true;
  else {
    loader.setAttribute('role', 'dialog');
    loader.setAttribute('aria-modal', 'true');
    document.querySelectorAll('#header, #main, .site-footer, #motion-toggle, .skip-link').forEach(el => {
      if (!el.inert) { el.inert = true; el.dataset.introInert = ''; }
    });
    skip.focus({ preventScroll: true });
    skip.addEventListener('click', () => finishIntro(true));
    loader.addEventListener('keydown', event => {
      if (event.key === 'Escape') finishIntro(true);
      if (event.key === 'Tab') { event.preventDefault(); skip.focus(); }
    });
    const ready = Promise.allSettled([document.fonts.ready, ...[...document.querySelectorAll('[data-hero-asset]')].map(image => image.decode())]);
    ready.then(() => {
      const remaining = Math.max(0, 1450 - (performance.now() - startedAt));
      setTimeout(() => finishIntro(), remaining);
    });
    introDeadline = setTimeout(() => finishIntro(), 2800);
  }

  // Preserve the actual heading text and accessible name while staggering words.
  document.querySelectorAll('.reveal h2, h2.reveal').forEach(heading => {
    let index = 0;
    const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    const label = heading.innerText.replace(/\s+/g, ' ').trim();
    heading.setAttribute('aria-label', label);
    nodes.forEach(node => {
      const fragment = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach(word => {
        if (!word.trim()) fragment.append(document.createTextNode(word));
        else {
          const span = document.createElement('span');
          span.className = 'reveal-word';
          span.setAttribute('aria-hidden', 'true');
          span.style.setProperty('--word-index', String(index++));
          span.textContent = word;
          fragment.append(span);
        }
      });
      node.replaceWith(fragment);
    });
  });
  document.querySelectorAll('.process-grid, .benefits-grid').forEach(grid => {
    [...grid.children].forEach((el, index) => el.style.setProperty('--reveal-delay', `${(index % 3) * 90}ms`));
  });

  // Restart the service image transition only when the actual image changes.
  const serviceImage = document.querySelector('#service-image');
  new MutationObserver(() => {
    if (paused()) return;
    serviceImage.getAnimations().forEach(animation => animation.cancel());
    serviceImage.animate([{ opacity: .2, transform: 'scale(1.035)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 650, easing: 'cubic-bezier(.16,1,.3,1)' });
  }).observe(serviceImage, { attributes: true, attributeFilter: ['src'] });

  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const cursor = document.querySelector('#custom-cursor');
  const label = cursor.querySelector('.cursor-label');
  const trail = [...document.querySelectorAll('.cursor-trail')];
  const points = trail.map(() => ({ x: 0, y: 0 }));
  const position = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };
  let cursorVisible = false;
  let frame = 0;
  let lastMove = 0;
  const interactive = 'a,button,summary,[role="button"]';
  const canAnimate = () => finePointer.matches && !paused() && !document.hidden;
  function hideCursor() {
    root.classList.remove('cursor-active');
    cursorVisible = false;
    cancelAnimationFrame(frame);
    frame = 0;
    document.querySelectorAll('[data-magnetized]').forEach(el => { el.style.translate = ''; delete el.dataset.magnetized; });
  }
  function frameCursor(now) {
    frame = 0;
    if (!cursorVisible || !canAnimate()) { hideCursor(); return; }
    position.x += (target.x - position.x) * .3;
    position.y += (target.y - position.y) * .3;
    cursor.style.transform = `translate3d(${position.x}px,${position.y}px,0)`;
    let previous = position;
    let unsettled = Math.abs(target.x - position.x) + Math.abs(target.y - position.y);
    points.forEach((point, index) => {
      point.x += (previous.x - point.x) * .23;
      point.y += (previous.y - point.y) * .23;
      trail[index].style.transform = `translate3d(${point.x}px,${point.y}px,0) scale(${1 - index * .22})`;
      trail[index].classList.toggle('trail-idle', now - lastMove > 140);
      unsettled += Math.abs(previous.x - point.x) + Math.abs(previous.y - point.y);
      previous = point;
    });
    if (unsettled > .15 || now - lastMove < 450) frame = requestAnimationFrame(frameCursor);
  }
  document.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' || !canAnimate() || event.target.closest?.('dialog')) { hideCursor(); return; }
    target.x = event.clientX;
    target.y = event.clientY;
    lastMove = performance.now();
    if (!cursorVisible) {
      position.x = target.x; position.y = target.y;
      points.forEach(point => { point.x = target.x; point.y = target.y; });
      cursorVisible = true;
      root.classList.add('cursor-active');
    }
    if (!frame) frame = requestAnimationFrame(frameCursor);
  }, { passive: true });
  document.addEventListener('pointerover', event => {
    if (!canAnimate()) return;
    const el = event.target instanceof Element ? event.target : null;
    if (el?.closest('dialog')) { hideCursor(); return; }
    const control = el?.closest(interactive);
    let text = el?.closest('[data-cursor]')?.dataset.cursor || '';
    if (!text && el?.closest('[data-product]')) text = 'CREATE';
    if (!text && el?.closest('[data-project]')) text = 'VIEW';
    cursor.classList.toggle('is-link', Boolean(control));
    cursor.classList.toggle('has-label', Boolean(text));
    cursor.classList.toggle('on-input', Boolean(el?.closest('input, textarea, select')));
    label.textContent = text;
  });
  document.addEventListener('pointerdown', () => cursor.classList.add('is-down'));
  document.addEventListener('pointerup', () => cursor.classList.remove('is-down'));
  document.addEventListener('pointercancel', () => { cursor.classList.remove('is-down'); hideCursor(); });
  document.documentElement.addEventListener('pointerleave', hideCursor);
  document.addEventListener('keydown', event => { if (event.key === 'Tab') hideCursor(); });
  window.addEventListener('blur', hideCursor);
  document.addEventListener('visibilitychange', () => { if (document.hidden) hideCursor(); });
  finePointer.addEventListener('change', hideCursor);

  document.querySelectorAll('.hero-actions .button, .header-cta, .contact-circle').forEach(button => {
    button.addEventListener('pointermove', event => {
      if (event.pointerType !== 'mouse' || !canAnimate()) return;
      const box = button.getBoundingClientRect();
      const x = (event.clientX - box.left - box.width / 2) * .12;
      const y = (event.clientY - box.top - box.height / 2) * .16;
      button.style.translate = `${x}px ${y}px`;
      button.dataset.magnetized = '';
    });
    button.addEventListener('pointerleave', () => { button.style.translate = ''; delete button.dataset.magnetized; });
  });
  function onMotionChange() {
    if (!paused()) return;
    hideCursor();
    finishIntro(true);
    serviceImage.getAnimations().forEach(animation => animation.finish());
  }
  reduced.addEventListener('change', onMotionChange);
  window.addEventListener('motionchange', onMotionChange);
})();
