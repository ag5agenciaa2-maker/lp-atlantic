/* ===========================================================
   Atlântic Soluções Ambientais — script.js (Vanilla ES6)
   =========================================================== */
(() => {
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

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

  /* ---------- Hero: vídeo só aparece quando há frame ---------- */
  const video = $('#heroVideo');
  if (video) {
    const show = () => { if (video.readyState >= 2) video.classList.add('is-ready'); };
    video.addEventListener('loadeddata', show);
    video.addEventListener('canplay', show);
    const p = video.play();
    if (p && p.catch) p.catch(() => {});
    show();
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

  /* ---------- Carrossel de depoimentos ---------- */
  const slides = $$('.slide');
  const dots = $$('#dots button');
  let index = 0;
  let timer = null;

  const setSlide = (i) => {
    index = i;
    slides.forEach((s, n) => s.classList.toggle('is-active', n === i));
    dots.forEach((d, n) => d.classList.toggle('is-active', n === i));
  };
  const play = () => {
    if (reduce || slides.length < 2) return;
    clearInterval(timer);
    timer = setInterval(() => setSlide((index + 1) % slides.length), 5000);
  };
  dots.forEach((d) => d.addEventListener('click', () => { setSlide(Number(d.dataset.dot)); play(); }));
  play();

  /* ---------- FAQ (acordeão) ---------- */
  $$('.acc__q').forEach((btn) => {
    btn.addEventListener('click', () => {
      const panel = btn.nextElementSibling;
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      $$('.acc__q').forEach((b) => {
        b.setAttribute('aria-expanded', 'false');
        b.nextElementSibling.style.maxHeight = '0px';
      });
      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = `${panel.scrollHeight}px`;
      }
    });
  });

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
