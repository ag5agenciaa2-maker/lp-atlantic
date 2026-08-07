/* ===========================================================
   Atlântic Soluções Ambientais — script.js (Vanilla ES6)
   =========================================================== */
(() => {
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ---------- Navbar: estado "scrolled" (compacta + opaca) ---------- */
  const navEl = $('.nav');
  if (navEl) {
    const setScrolled = () => navEl.classList.toggle('is-scrolled', window.scrollY > 24);
    setScrolled();
    window.addEventListener('scroll', setScrolled, { passive: true });
  }

  /* ---------- Menu mobile (Drawer Premium) ---------- */
  const toggle = $('#navToggle');
  const drawer = $('#drawer');
  const drawerOverlay = $('#drawerOverlay');
  const drawerClose = $('#drawerClose');
  const drawerMenu = $('#drawerMenu');
  if (toggle && drawer && drawerOverlay) {
    const openDrawer = () => {
      drawer.classList.add('is-open');
      drawerOverlay.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };
    const closeDrawer = () => {
      drawer.classList.remove('is-open');
      drawerOverlay.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };
    toggle.addEventListener('click', openDrawer);
    drawerClose?.addEventListener('click', closeDrawer);
    drawerOverlay.addEventListener('click', closeDrawer);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) closeDrawer();
    });
    drawerMenu?.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') closeDrawer();
    });
  }

  /* ---------- Hero: vídeo lateral (showcase) — só carrega/toca em telas ≥1024px ---------- */
  const sideVideo = $('#heroSideVideo');
  if (sideVideo) {
    const mqDesktop = window.matchMedia('(min-width: 1024px)');
    const showSide = () => { if (sideVideo.readyState >= 2) sideVideo.classList.add('is-ready'); };
    const loadSideVideo = () => {
      if (!mqDesktop.matches || sideVideo.dataset.loaded) return;
      sideVideo.dataset.loaded = 'true';
      sideVideo.preload = 'auto';
      sideVideo.load();
      sideVideo.addEventListener('loadeddata', showSide);
      sideVideo.addEventListener('canplay', showSide);
      const p = sideVideo.play();
      if (p && p.catch) p.catch(() => {});
    };
    loadSideVideo();
    mqDesktop.addEventListener('change', loadSideVideo);

    /* Botões de som e expandir do vídeo hero */
    const heroMute = $('#heroMute');
    const heroExpand = $('#heroExpand');
    const heroSource = $('#heroSideSource');
    const fsModal = $('#videoFullscreen');
    const fsPlayer = $('#videoFsPlayer');

    const muteIcon = '<svg viewBox="0 0 24 24" fill="none"><path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor"/><path d="M16 9c1 1 1 5 0 6M18.5 7.5c2 2 2 7 0 9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
    const mutedIcon = '<svg viewBox="0 0 24 24" fill="none"><path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor"/><path d="M15.5 9.5 20 14M20 9.5l-4.5 4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
    heroMute?.addEventListener('click', () => {
      sideVideo.muted = !sideVideo.muted;
      heroMute.classList.toggle('is-muted', sideVideo.muted);
      heroMute.innerHTML = sideVideo.muted ? mutedIcon : muteIcon;
      heroMute.setAttribute('aria-label', sideVideo.muted ? 'Ativar som' : 'Silenciar');
    });

    if (heroExpand && fsModal && fsPlayer && heroSource) {
      let lastFocused = null;
      const openFs = () => {
        fsPlayer.src = heroSource.getAttribute('src');
        fsPlayer.currentTime = sideVideo.currentTime;
        fsPlayer.muted = false;
        lastFocused = document.activeElement;
        fsModal.classList.add('is-open');
        fsModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        fsPlayer.play().catch(() => {});
        fsModal.querySelector('.video-fs__close').focus();
      };
      const closeFs = () => {
        fsModal.classList.remove('is-open');
        fsModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        fsPlayer.pause();
        fsPlayer.removeAttribute('src');
        fsPlayer.load();
        if (lastFocused) lastFocused.focus();
      };
      heroExpand.addEventListener('click', openFs);
      $$('[data-fs-close]', fsModal).forEach((el) => el.addEventListener('click', closeFs));
      document.addEventListener('keydown', (e) => {
        if (fsModal.classList.contains('is-open') && e.key === 'Escape') closeFs();
      });
    }
  }

  /* ---------- Reveal on scroll (IntersectionObserver + stagger) ---------- */
  const reveals = $$('.reveal');
  if (reduce) {
    reveals.forEach((el) => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const top = el.getBoundingClientRect().top;
        const group = reveals.filter((r) => Math.abs(r.getBoundingClientRect().top - top) < 40);
        const idx = Math.max(0, group.indexOf(el));
        el.style.transitionDelay = `${idx * 90}ms`;
        el.classList.add('is-in');
        io.unobserve(el);
      });
    }, { threshold: 0.16 });
    reveals.forEach((el) => io.observe(el));
  }

  /* ---------- Contadores ---------- */
  const counters = $$('[data-count]');
  const format = (val, dec) => (dec ? (val / 10).toFixed(1).replace('.', ',') : String(Math.round(val)));
  const cio = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      cio.unobserve(el);
      const target = parseFloat(el.dataset.count);
      const dec = el.dataset.decimal === '1';
      if (reduce) { el.textContent = format(target, dec); return; }
      const dur = 1200;
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = format(target * eased, dec);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.5 });
  counters.forEach((el) => cio.observe(el));

  /* ---------- FAQ: painel de consulta (desktop) / modal (mobile) ---------- */
  const consultaQs = $$('.consulta__q');
  const consultaText = $('#consultaText');
  const consultaData = $('#consultaData');
  const mqMobile = window.matchMedia('(max-width: 768px)');
  const faqModal = $('#faqModal');
  const faqModalTitle = $('#faqModalTitle');
  const faqModalText = $('#faqModalText');

  if (consultaQs.length && consultaData) {
    let faqLastFocused = null;
    const closeFaqModal = () => {
      faqModal?.classList.remove('is-open');
      faqModal?.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (faqLastFocused) faqLastFocused.focus();
    };
    if (faqModal) {
      $$('[data-faq-close]', faqModal).forEach((el) => el.addEventListener('click', closeFaqModal));
      document.addEventListener('keydown', (e) => {
        if (faqModal.classList.contains('is-open') && e.key === 'Escape') closeFaqModal();
      });
    }

    consultaQs.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        const answer = consultaData.querySelector(`[data-a="${i}"]`);
        if (!answer) return;

        if (mqMobile.matches && faqModal && faqModalText) {
          if (faqModalTitle) faqModalTitle.textContent = btn.querySelector('.consulta__q-t')?.textContent.trim() || '';
          faqModalText.textContent = answer.textContent;
          faqLastFocused = document.activeElement;
          faqModal.classList.add('is-open');
          faqModal.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden';
          faqModal.querySelector('.faq-modal__close')?.focus();
          return;
        }

        if (btn.classList.contains('is-active')) return;
        consultaQs.forEach((b) => {
          b.classList.remove('is-active');
          b.setAttribute('aria-expanded', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-expanded', 'true');
        if (consultaText) {
          consultaText.textContent = answer.textContent;
          consultaText.style.animation = 'none';
          void consultaText.offsetWidth;
          consultaText.style.animation = '';
        }
      });
    });
  }

  /* ---------- Formulário → WhatsApp ---------- */
  const form = $('#form');
  if (form) {
    const err = $('#formError');
    const tel = $('#telefone');

    // máscara simples de telefone BR
    tel.addEventListener('input', () => {
      const d = tel.value.replace(/\D/g, '').slice(0, 11);
      tel.value = d.length <= 10
        ? d.replace(/^(\d{0,2})(\d{0,4})(\d{0,4}).*/, (m, a, b, c) => [a && `(${a}`, a.length === 2 ? ') ' : '', b, c && `-${c}`].join(''))
        : d.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = form.nome.value.trim();
      const digits = tel.value.replace(/\D/g, '');
      if (nome.length < 2 || digits.length < 10) {
        err.classList.add('is-visible');
        (nome.length < 2 ? form.nome : tel).focus();
        return;
      }
      err.classList.remove('is-visible');
      const detalhes = form.mensagem.value.trim();
      // ▼ MENSAGEM OBRIGATÓRIA — estrutura fixa (Skill AG5: Padrão de Mensagens WhatsApp) ▼
      let texto = `Olá, me chamo ${nome}, vim através do site e gostaria de uma informação.\n`;
      texto += `\n- Telefone: ${tel.value.trim()}`;
      texto += `\n- Serviço: ${form.servico.value} (${form.tipo.value})`;
      if (detalhes) texto += `\n- Mensagem: ${detalhes}`;
      // ▲ ────────────────────────────────────────────────────────────────────────────── ▲
      window.open(`https://wa.me/5521995230044?text=${encodeURIComponent(texto)}`, '_blank', 'noopener');
    });
  }
})();

/* ──────────────────────────────────────────────
   WHATSAPP PREMIUM — Balão flutuante (AG5 V4)

   Timeline:
     • t=0s  → usuário chega na 3ª seção (servicos) → botão verde aparece imediatamente
     • t=25s → balão sobe ("digitando..." por 2.5s → mensagem real)
     • t=40s → balão some automaticamente (visível por 15s)
     • t=45s → badge vermelho "1" aparece (5s depois de sumir) — só em nicho tranquilo

   Se o usuário fechar manualmente: badge aparece 5s depois (tranquilo) ou nada (rigoroso).
   Se o usuário clicar no botão WhatsApp: tudo é limpo (sem badge), abre wa.me.
─────────────────────────────────────────────── */
(function initWaPremium() {
  // ─── CONFIGURAÇÃO POR PROJETO ───
  const MODO_COMPLIANCE = true; // Atlântic Soluções: B2B condomínios/síndicos, tom sóbrio → SEM badge

  const bubble        = document.getElementById('wa-message-bubble');
  const typing        = document.getElementById('wa-typing');
  const realMessage   = document.getElementById('wa-real-message');
  const badge         = document.getElementById('wa-notification');
  const closeBtn      = document.getElementById('wa-close-btn');
  const mainBtn       = document.getElementById('wa-main-btn');
  const targetSection = document.getElementById('servicos');

  if (!bubble || !typing || !realMessage || !closeBtn || !mainBtn || !targetSection) return;

  const DELAY_BALAO            = 25000; // 25s após entrar na seção
  const DURATION_TYPING        = 2500;  // 2.5s de "digitando..."
  const DURATION_BALAO_VISIVEL = 15000; // 15s exibido depois de aparecer
  const DELAY_BADGE_APOS_SUMIR = 5000;  // 5s após sumir → badge

  let triggered = false;
  let autoHideTimer = null;
  let badgeTimer = null;
  let userClosed = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !triggered) {
        triggered = true;

        // Botão flutuante aparece imediatamente
        mainBtn.classList.add('visible');

        // t=25s → balão sobe
        setTimeout(() => {
          if (userClosed) return;
          bubble.classList.add('show');

          // 2.5s de "digitando..." → mensagem real (via classes utilitárias, sem inline style)
          setTimeout(() => {
            if (userClosed) return;
            typing.classList.add('is-hidden');
            realMessage.classList.add('is-visible');
            requestAnimationFrame(() => realMessage.classList.add('is-in'));
          }, DURATION_TYPING);

          // t=40s → balão some automaticamente
          autoHideTimer = setTimeout(() => {
            if (userClosed) return;
            bubble.classList.remove('show');

            // t=45s → badge "1" aparece (só se NÃO for Compliance)
            if (!MODO_COMPLIANCE && badge) {
              badgeTimer = setTimeout(() => {
                if (userClosed) return;
                badge.classList.add('show');
              }, DELAY_BADGE_APOS_SUMIR);
            }
          }, DURATION_BALAO_VISIVEL);
        }, DELAY_BALAO);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(targetSection);

  closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    userClosed = true;
    bubble.classList.remove('show');
    if (autoHideTimer) clearTimeout(autoHideTimer);
    if (badgeTimer) clearTimeout(badgeTimer);
    // Badge pós-close: só em nicho tranquilo
    if (!MODO_COMPLIANCE && badge) {
      setTimeout(() => { badge.classList.add('show'); }, DELAY_BADGE_APOS_SUMIR);
    }
  });

  mainBtn.addEventListener('click', () => {
    bubble.classList.remove('show');
    if (badge) badge.classList.remove('show');
    if (autoHideTimer) clearTimeout(autoHideTimer);
    if (badgeTimer) clearTimeout(badgeTimer);
  });
})();

/* ---------- Lightbox da galeria (seção Bastidores) ---------- */
(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  const triggers = $$('[data-lightbox-open]');
  const lightbox = $('#lightbox');
  if (!triggers.length || !lightbox) return;

  const items = triggers.map((btn) => {
    const figure = btn.closest('.galeria__item');
    return {
      src: btn.querySelector('img').getAttribute('src'),
      alt: btn.querySelector('img').getAttribute('alt') || '',
      idx: figure.querySelector('.galeria__idx')?.textContent.trim() || '',
      title: figure.querySelector('.galeria__title')?.textContent.trim() || '',
      desc: figure.querySelector('.galeria__desc')?.textContent.trim() || '',
    };
  });

  const imgEl = $('#lightboxImg');
  const idxEl = $('#lightboxIdx');
  const titleEl = $('#lightboxTitle');
  const counterEl = $('#lightboxCounter');
  const prevBtn = $('[data-lightbox-prev]');
  const nextBtn = $('[data-lightbox-next]');
  let current = 0;
  let lastFocused = null;

  const render = () => {
    const item = items[current];
    imgEl.src = item.src;
    imgEl.alt = item.alt;
    idxEl.textContent = item.idx;
    titleEl.textContent = item.title;
    counterEl.textContent = `${current + 1} / ${items.length}`;
  };

  const open = (i) => {
    current = i;
    lastFocused = document.activeElement;
    render();
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lightbox.querySelector('.lightbox__close').focus();
  };
  const close = () => {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  };
  const step = (dir) => {
    current = (current + dir + items.length) % items.length;
    render();
  };

  triggers.forEach((btn, i) => btn.addEventListener('click', () => open(i)));
  $$('[data-lightbox-close]', lightbox).forEach((el) => el.addEventListener('click', close));
  prevBtn?.addEventListener('click', () => step(-1));
  nextBtn?.addEventListener('click', () => step(1));

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });
})();

/* ---------- Player de vídeos + playlist (seção compacta) ---------- */
(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  const items = $$('.player__item');
  const playerEl = $('.player');
  const stage = $('.player__stage');
  const stageVideo = $('#playerVideo');
  const stageSource = $('#playerSource');
  const toggle = $('#playerToggle');
  const titleEl = $('#playerTitle');
  const extras = $('#playerExtras');
  const muteBtn = $('#playerMute');
  const expandBtn = $('#playerExpand');
  const fsModal = $('#videoFullscreen');
  const fsPlayer = $('#videoFsPlayer');
  if (!items.length || !stageVideo || !toggle) return;

  const playIcon = '<svg viewBox="0 0 24 24" fill="none"><path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor"/></svg>';
  const pauseIcon = '<svg viewBox="0 0 24 24" fill="none"><rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor"/><rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor"/></svg>';

  stageVideo.addEventListener('loadedmetadata', () => {
    if (!playerEl || !stage || !stageVideo.videoWidth || !stageVideo.videoHeight) return;
    const stageH = stage.clientHeight || 480;
    const idealW = stageH * (stageVideo.videoWidth / stageVideo.videoHeight);
    playerEl.style.setProperty('--stage-w', `${Math.round(idealW)}px`);
  });

  const select = (i, autoplay) => {
    const item = items[i];
    items.forEach((it, n) => it.classList.toggle('is-active', n === i));
    stageSource.setAttribute('src', item.dataset.src);
    stageVideo.load();
    if (titleEl) titleEl.textContent = item.textContent.trim().replace(/^\d{2}|"/, '').trim();
    if (autoplay) {
      stageVideo.muted = false;
      stageVideo.play().catch(() => {});
    }
  };

  items.forEach((item, i) => item.addEventListener('click', () => select(i, true)));

  toggle.addEventListener('click', () => {
    if (stageVideo.paused) {
      stageVideo.muted = false;
      stageVideo.play().catch(() => {});
    } else {
      stageVideo.pause();
    }
  });
  stageVideo.addEventListener('play', () => {
    toggle.innerHTML = pauseIcon; toggle.classList.add('is-playing'); toggle.setAttribute('aria-label', 'Pausar');
    extras?.classList.add('is-visible');
  });
  stageVideo.addEventListener('pause', () => {
    toggle.innerHTML = playIcon; toggle.classList.remove('is-playing'); toggle.setAttribute('aria-label', 'Reproduzir com som');
    extras?.classList.remove('is-visible');
  });
  stageVideo.addEventListener('ended', () => select((items.findIndex((it) => it.classList.contains('is-active')) + 1) % items.length, true));

  // Pausa e reinicia o vídeo ao sair/entrar na seção
  const videosSection = document.getElementById('videos');
  if (videosSection) {
    let wasPlaying = false;
    const sectionIo = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (wasPlaying) {
            stageVideo.currentTime = 0;
            stageVideo.play().catch(() => {});
          }
        } else {
          wasPlaying = !stageVideo.paused;
          stageVideo.pause();
          stageVideo.currentTime = 0;
        }
      });
    }, { threshold: 0.15 });
    sectionIo.observe(videosSection);
  }

  // Botão de som
  const muteIcon = '<svg viewBox="0 0 24 24" fill="none"><path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor"/><path d="M16 9c1 1 1 5 0 6M18.5 7.5c2 2 2 7 0 9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
  const mutedIcon = '<svg viewBox="0 0 24 24" fill="none"><path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor"/><path d="M15.5 9.5 20 14M20 9.5l-4.5 4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
  muteBtn?.addEventListener('click', () => {
    stageVideo.muted = !stageVideo.muted;
    muteBtn.classList.toggle('is-muted', stageVideo.muted);
    muteBtn.innerHTML = stageVideo.muted ? mutedIcon : muteIcon;
    muteBtn.setAttribute('aria-label', stageVideo.muted ? 'Ativar som' : 'Silenciar');
  });

  // Botão de expandir → modal em tela cheia
  if (expandBtn && fsModal && fsPlayer) {
    let lastFocused = null;
    const openFs = () => {
      fsPlayer.src = stageSource.getAttribute('src');
      fsPlayer.currentTime = stageVideo.currentTime;
      fsPlayer.muted = false;
      lastFocused = document.activeElement;
      fsModal.classList.add('is-open');
      fsModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      stageVideo.pause();
      fsPlayer.play().catch(() => {});
      fsModal.querySelector('.video-fs__close').focus();
    };
    const closeFs = () => {
      fsModal.classList.remove('is-open');
      fsModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      fsPlayer.pause();
      fsPlayer.removeAttribute('src');
      fsPlayer.load();
      if (lastFocused) lastFocused.focus();
    };
    expandBtn.addEventListener('click', openFs);
    $$('[data-fs-close]', fsModal).forEach((el) => el.addEventListener('click', closeFs));
    document.addEventListener('keydown', (e) => {
      if (fsModal.classList.contains('is-open') && e.key === 'Escape') closeFs();
    });
  }
})();

/* ---------- Vídeos mobile: cards roláveis ---------- */
(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const cards = $$('.video-mobile__card');
  const fsModal = $('#videoFullscreen');
  const fsPlayer = $('#videoFsPlayer');
  if (!cards.length || !fsModal || !fsPlayer) return;

  // Preview mudo em loop ao entrar na viewport
  if (!reduce) {
    const pio = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const vid = entry.target.querySelector('video');
        if (!vid) return;
        if (entry.isIntersecting) vid.play().catch(() => {});
        else vid.pause();
      });
    }, { threshold: 0.6 });
    cards.forEach((c) => pio.observe(c));
  }

  let lastFocused = null;
  const open = (i) => {
    const card = cards[i];
    const src = card.querySelector('source')?.getAttribute('src').replace('#t=0.5', '') || '';
    fsPlayer.src = src;
    fsPlayer.currentTime = 0;
    fsPlayer.muted = false;
    lastFocused = document.activeElement;
    fsModal.classList.add('is-open');
    fsModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    fsPlayer.play().catch(() => {});
    fsModal.querySelector('.video-fs__close').focus();
  };
  const close = () => {
    fsModal.classList.remove('is-open');
    fsModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    fsPlayer.pause();
    fsPlayer.removeAttribute('src');
    fsPlayer.load();
    if (lastFocused) lastFocused.focus();
  };

  cards.forEach((card, i) => card.addEventListener('click', () => open(i)));
  $$('[data-fs-close]', fsModal).forEach((el) => el.addEventListener('click', close));
  document.addEventListener('keydown', (e) => {
    if (fsModal.classList.contains('is-open') && e.key === 'Escape') close();
  });
})();

/* ---------- Modal de depoimento (dossiê "O que dizem") ---------- */
(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  const triggers = $$('[data-depo-open]');
  const modal = $('#depoModal');
  if (!triggers.length || !modal) return;

  const items = triggers.map((btn) => ({
    num: btn.querySelector('.dossie__num')?.textContent.trim() || '',
    text: btn.querySelector('.dossie__quote-p')?.textContent.trim() || '',
    name: btn.querySelector('.dossie__foot-name')?.textContent.trim() || '',
    meta: btn.querySelector('.dossie__meta')?.textContent.trim() || '',
  }));

  const numEl = $('#depoModalNum');
  const textEl = $('#depoModalText');
  const nameEl = $('#depoModalName');
  const metaEl = $('#depoModalMeta');
  let lastFocused = null;

  const open = (i) => {
    const item = items[i];
    numEl.textContent = item.num;
    textEl.textContent = item.text;
    nameEl.textContent = item.name;
    metaEl.textContent = item.meta;
    lastFocused = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.depo-modal__close').focus();
  };
  const close = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  };

  triggers.forEach((btn, i) => btn.addEventListener('click', () => open(i)));
  $$('[data-depo-close]', modal).forEach((el) => el.addEventListener('click', close));
  document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('is-open') && e.key === 'Escape') close();
  });
})();
