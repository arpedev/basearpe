(function () {
      const IMG_PORTRAIT = 'img/hero-arpe.webp';
      const IMG_CHARACTER3D = 'img/hero-arpe.webp';
      const IMG_FINTECH = 'img/projects/home-work1.jpg';
      const IMG_PRODUCT = 'img/projects/home-work4.jpg';

      const ASSET_MAP = {
        portrait: IMG_PORTRAIT,
        character3d: IMG_CHARACTER3D,
        fintech: IMG_FINTECH,
        product: IMG_PRODUCT
      };

      document.querySelectorAll('[data-asset]').forEach((img) => {
        const key = img.getAttribute('data-asset');
        if (ASSET_MAP[key]) img.src = ASSET_MAP[key];
      });

      const PROJECTS = [
        {
          id: 'arpe-audiovisual',
          title: 'Producción Audiovisual Integral',
          subtitle: 'Videos Institucionales, Comerciales & Documentales',
          year: '2026',
          live: false,
          image: 'img/projects/home-work1.jpg',
          challenge: 'Realización integral de piezas audiovisuales desde la preproducción y guionado hasta rodaje, dirección de fotografía, edición y colorimetría profesional en DaVinci Resolve.',
          services: ['Audiovisual', 'Colorimetría', 'Dirección de Rodaje'],
          role: 'Filmmaker & Director Audiovisual (ARPE)'
        },
        {
          id: 'arpe-coberturas',
          title: 'Cobertura de Eventos (Foto & Video)',
          subtitle: 'Eventos Masivos, Territoriales & Dinámicos',
          year: '2025 - 2026',
          live: false,
          image: 'img/projects/home-work7.jpg',
          challenge: 'Registro cinematográfico dinámico en eventos masivos, culturales e institucionales con entregas ágiles y optimizadas para difusión territorial.',
          services: ['Coberturas', 'Fotografía de Eventos', 'Video Dinámico'],
          role: 'Coordinador de Comunicación y Prensa'
        },
        {
          id: 'arpe-redes',
          title: 'Contenido para Redes & Storytelling',
          subtitle: 'Estrategia Transmedia & Formato Vertical',
          year: '2026',
          live: false,
          image: 'img/projects/home-work3.jpg',
          challenge: 'Transformar discursos institucionales y comerciales en formatos dinámicos (Reels y TikToks) con narrativa ágil y ganchos que retienen la atención joven.',
          services: ['Storytelling', 'Audiovisual', 'Coberturas'],
          role: 'Estratega de Contenidos & Creador Audiovisual'
        },
        {
          id: 'arpe-web',
          title: 'Desarrollo Web & Diseño UX/UI',
          subtitle: 'Sitios Modernos, React.js & Automatización con IA',
          year: '2026',
          live: false,
          image: 'img/projects/home-work4.jpg',
          challenge: 'Construcción de arquitecturas web sólidas en React.js / HTML5 / CSS3 / JS con diseño centrado en el usuario, integración de agentes y automatización de procesos.',
          services: ['Web', 'UX/UI', 'Automatización IA'],
          role: 'Técnico en Programación (UTN) & Desarrollador Web'
        }
      ];

      // 1. Character Split Hover Roll
      document.querySelectorAll('[data-stagger]').forEach((el) => {
        const text = el.getAttribute('data-stagger') || '';
        el.innerHTML = '';
        [...text].forEach((ch, idx) => {
          const span = document.createElement('span');
          span.textContent = ch === ' ' ? '\u00A0' : ch;
          span.setAttribute('data-char', ch === ' ' ? '\u00A0' : ch);
          span.style.setProperty('--i', String(idx));
          el.appendChild(span);
        });
      });

      // 2. View Navigation & SPA Hash Routing (Home / Work / About)
      const views = {
        home: document.getElementById('view-home'),
        work: document.getElementById('view-work'),
        about: document.getElementById('view-about')
      };

      const HASH_MAP = {
        '#inicio': 'home',
        '#home': 'home',
        '': 'home',
        '#proyectos': 'work',
        '#work': 'work',
        '#sobre-mi': 'about',
        '#about': 'about'
      };

      const VIEW_TO_HASH = {
        home: '#inicio',
        work: '#proyectos',
        about: '#sobre-mi'
      };

      function switchView(target, updateHash = true) {
        if (!views[target]) target = 'home';
        Object.keys(views).forEach((k) => {
          if (views[k]) views[k].classList.toggle('hidden', k !== target);
        });
        if (updateHash && VIEW_TO_HASH[target]) {
          if (window.location.hash !== VIEW_TO_HASH[target]) {
            try {
              window.history.pushState({ view: target }, '', VIEW_TO_HASH[target]);
            } catch (e) {
              window.location.hash = VIEW_TO_HASH[target];
            }
          }
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      function handleHashRouting() {
        const hash = (window.location.hash || '').toLowerCase();
        const view = HASH_MAP[hash] || 'home';
        switchView(view, false);
      }

      window.addEventListener('hashchange', handleHashRouting);
      window.addEventListener('popstate', handleHashRouting);
      // Initialize view from URL hash on first load
      if (window.location.hash) {
        handleHashRouting();
      }

      document.querySelectorAll('.nav-trigger').forEach((btn) => {
        btn.addEventListener('click', () => {
          const target = btn.getAttribute('data-nav');
          if (target) switchView(target);
        });
      });

      // 3. Copy Email & Toast Notification with Fallback
      let toastTimer = null;
      function showToast(msg) {
        const toast = document.getElementById('toast-notification');
        const msgEl = document.getElementById('toast-message');
        if (!toast || !msgEl) return;
        msgEl.textContent = msg;
        toast.classList.remove('opacity-0', 'translate-y-3');
        toast.classList.add('opacity-100', 'translate-y-0');
        if (toastTimer) clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
          toast.classList.add('opacity-0', 'translate-y-3');
          toast.classList.remove('opacity-100', 'translate-y-0');
        }, 3000);
      }

      document.querySelectorAll('.copy-email-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const email = 'arpe.estudio@gmail.com';
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(email)
              .then(() => showToast('¡Email copiado! arpe.estudio@gmail.com'))
              .catch(() => showToast('Contacto: arpe.estudio@gmail.com'));
          } else {
            showToast('Contacto: arpe.estudio@gmail.com');
          }
        });
      });

      // 5. Render Work Archive Grid
      const gridContainer = document.getElementById('projects-grid-container');
      function renderProjectsGrid(filter) {
        if (!gridContainer) return;
        const list = filter === 'all'
          ? PROJECTS
          : PROJECTS.filter((p) => p.services.some((s) => s.toLowerCase().includes(filter.toLowerCase())));

        gridContainer.innerHTML = list.map((p) => `
          <article class="rounded-2xl overflow-hidden bg-white border border-blue-100 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
            <div class="h-48 bg-[#071124] relative overflow-hidden">
              <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-[#060D1A]/85 via-transparent to-transparent flex items-end p-3">
                <span class="px-2.5 py-1 rounded-full bg-[#1849FF] text-white font-mono text-[10px] font-bold tracking-wider">ARPE</span>
              </div>
              <span class="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#071124]/80 text-[#93C5FD] font-mono text-[10px]">${p.year}</span>
            </div>
            <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div class="flex items-center justify-between">
                  <h3 class="font-display font-bold text-xl text-slate-900">${p.title}</h3>
                  <button type="button" data-project-id="${p.id}" class="open-project-modal text-xs font-mono text-[#1849FF] hover:underline font-bold">Detalles ↗</button>
                </div>
                <p class="text-xs text-[#3B82F6] font-medium">${p.subtitle}</p>
                <p class="mt-2 text-xs text-slate-500 leading-relaxed">${p.challenge}</p>
              </div>
              <div class="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                ${p.services.map((s) => `<span class="px-2 py-0.5 rounded-full bg-[#F5F9FF] text-[#3B82F6] text-[10px] font-mono font-medium">${s}</span>`).join('')}
              </div>
            </div>
          </article>
        `).join('');

        gridContainer.querySelectorAll('.open-project-modal').forEach((b) => {
          b.addEventListener('click', () => openModal(b.getAttribute('data-project-id')));
        });
      }
      renderProjectsGrid('all');

      document.querySelectorAll('.work-filter-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const f = btn.getAttribute('data-filter') || 'all';
          document.querySelectorAll('.work-filter-btn').forEach((b) => {
            const active = b.getAttribute('data-filter') === f;
            b.className = active
              ? 'work-filter-btn px-4 py-1.5 rounded-full text-xs font-medium bg-[#1849FF] text-white shadow-sm'
              : 'work-filter-btn px-4 py-1.5 rounded-full text-xs font-medium bg-white border border-blue-200 text-slate-600';
          });
          renderProjectsGrid(f);
        });
      });

      // 4. Modal Logic (with Keyboard Accessibility & Focus Management)
      const modal = document.getElementById('case-study-modal');
      let lastFocusedElement = null;

      function openModal(id) {
        lastFocusedElement = document.activeElement;
        const proj = PROJECTS.find((p) => p.id === id) || PROJECTS[0];
        if (!modal || !proj) return;
        const yearEl = document.getElementById('modal-year');
        if (yearEl) yearEl.textContent = proj.year;
        document.getElementById('modal-subtitle').textContent = proj.subtitle;
        document.getElementById('modal-title').textContent = proj.title;
        document.getElementById('modal-challenge').textContent = proj.challenge;
        document.getElementById('modal-role').textContent = proj.role;
        document.getElementById('modal-img').src = proj.image;
        document.getElementById('modal-services').innerHTML = proj.services
          .map((s) => `<span class="px-3 py-1 rounded-full bg-[#F5F9FF] text-[#1849FF] font-mono text-xs font-medium">${s}</span>`)
          .join('');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        const closeBtn = document.getElementById('close-modal-btn');
        if (closeBtn) closeBtn.focus();
      }

      function closeModal() {
        if (!modal) return;
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
          lastFocusedElement.focus();
        }
      }

      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
          closeModal();
        }
      });

      document.querySelectorAll('.open-project-modal').forEach((b) => {
        b.addEventListener('click', () => openModal(b.getAttribute('data-project-id')));
      });
      const openReelBtn = document.getElementById('open-reel-btn');
      if (openReelBtn) openReelBtn.addEventListener('click', () => openModal('arpe-audiovisual'));
      const closeModalBtn = document.getElementById('close-modal-btn');
      const modalDoneBtn = document.getElementById('modal-Done-btn');
      if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
      if (modalDoneBtn) modalDoneBtn.addEventListener('click', closeModal);
      if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

      // ===================================================================
      // 5. ACCESSIBILITY & PREFERS-REDUCED-MOTION DETECTION
      // ===================================================================
      const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isFinePointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

      // ===================================================================
      // 6. LENIS SMOOTH SCROLL & GSAP SCROLLTRIGGER
      // ===================================================================
      let lenis = null;
      if (typeof Lenis !== 'undefined' && !prefersReducedMotion) {
        lenis = new Lenis({
          duration: 1.25,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          smoothTouch: false,
          wheelMultiplier: 1.05
        });

        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        if (typeof ScrollTrigger !== 'undefined' && typeof gsap !== 'undefined') {
          gsap.registerPlugin(ScrollTrigger);
          lenis.on('scroll', ScrollTrigger.update);
          gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
          });
          gsap.ticker.lagSmoothing(0);
        }
      }

      // ===================================================================
      // 8. CUSTOM MAGNETIC CURSOR & INTERACTIVE TOOLTIP (PASO 3)
      // ===================================================================
      const cursorDot = document.getElementById('custom-cursor-dot');
      const cursorRing = document.getElementById('custom-cursor-ring');
      const cursorBadge = document.getElementById('custom-cursor-badge');

      let mouse = { x: -100, y: -100 };
      let ring = { x: -100, y: -100 };
      let cursorVisible = false;
      let magneticTarget = null;

      if (isFinePointer) {
        window.addEventListener('mousemove', (e) => {
          mouse.x = e.clientX;
          mouse.y = e.clientY;
          if (!cursorVisible) {
            cursorVisible = true;
            if (cursorDot) cursorDot.classList.remove('opacity-0');
            if (cursorRing) cursorRing.classList.remove('opacity-0');
          }
          if (cursorDot) {
            cursorDot.style.left = `${mouse.x}px`;
            cursorDot.style.top = `${mouse.y}px`;
          }
        });

        window.addEventListener('mouseleave', () => {
          cursorVisible = false;
          if (cursorDot) cursorDot.classList.add('opacity-0');
          if (cursorRing) cursorRing.classList.add('opacity-0');
        });

        function updateCursorRing() {
          if (cursorVisible && cursorRing) {
            let targetX = mouse.x;
            let targetY = mouse.y;

            // True Magnetic Pull effect when hovering magnetic buttons
            if (magneticTarget) {
              const rect = magneticTarget.getBoundingClientRect();
              const centerX = rect.left + rect.width / 2;
              const centerY = rect.top + rect.height / 2;
              // Pull ring towards center of target
              targetX = centerX + (mouse.x - centerX) * 0.28;
              targetY = centerY + (mouse.y - centerY) * 0.28;
            }

            ring.x += (targetX - ring.x) * 0.22;
            ring.y += (targetY - ring.y) * 0.22;
            cursorRing.style.left = `${ring.x}px`;
            cursorRing.style.top = `${ring.y}px`;
          }
          requestAnimationFrame(updateCursorRing);
        }
        requestAnimationFrame(updateCursorRing);
      }

      function setCursorState(state, text = '') {
        if (!cursorRing || !cursorBadge) return;
        if (state === 'pill') {
          cursorRing.classList.add('cursor-pill');
          cursorRing.classList.remove('cursor-hover');
          cursorBadge.textContent = text;
        } else if (state === 'hover') {
          cursorRing.classList.add('cursor-hover');
          cursorRing.classList.remove('cursor-pill');
          cursorBadge.textContent = '';
        } else {
          cursorRing.classList.remove('cursor-pill', 'cursor-hover');
          cursorBadge.textContent = '';
        }
      }

      // Cursor hover states for interactive targets
      document.querySelectorAll('.copy-email-btn').forEach((btn) => {
        btn.addEventListener('mouseenter', () => setCursorState('pill', "Let's talk ✉️"));
        btn.addEventListener('mouseleave', () => setCursorState('default'));
      });

      document.querySelectorAll('.cards-strip, .strip-card').forEach((card) => {
        card.addEventListener('mouseenter', () => setCursorState('pill', 'Drag ↔ View'));
        card.addEventListener('mouseleave', () => setCursorState('default'));
      });

      const folderTrigger = document.getElementById('portfolio-folder-trigger');
      if (folderTrigger) {
        folderTrigger.addEventListener('mouseenter', () => {
          setCursorState('pill', 'Archive 📂');
          magneticTarget = folderTrigger;
        });
        folderTrigger.addEventListener('mouseleave', () => {
          setCursorState('default');
          magneticTarget = null;
        });
      }

      const canvasEl = document.getElementById('blob-playground-canvas');
      if (canvasEl) {
        canvasEl.addEventListener('mouseenter', () => setCursorState('pill', 'Play 🎾'));
        canvasEl.addEventListener('mouseleave', () => setCursorState('default'));
      }

      // Magnetic hover attraction on all interactive triggers & buttons
      document.querySelectorAll('.social-icon-btn, .glass-nav-pill, .glass-monogram-btn, #pill-click-btn').forEach((btn) => {
        btn.addEventListener('mouseenter', () => {
          magneticTarget = btn;
          setCursorState('hover');
        });
        btn.addEventListener('mouseleave', () => {
          magneticTarget = null;
          setCursorState('default');
          if (typeof gsap !== 'undefined') {
            gsap.to(btn, { x: 0, y: 0, duration: 0.35, ease: 'power2.out' });
          }
        });
        btn.addEventListener('mousemove', (e) => {
          if (typeof gsap !== 'undefined') {
            const rect = btn.getBoundingClientRect();
            const relX = (e.clientX - (rect.left + rect.width / 2)) * 0.3;
            const relY = (e.clientY - (rect.top + rect.height / 2)) * 0.3;
            gsap.to(btn, { x: relX, y: relY, duration: 0.2, ease: 'power1.out' });
          }
        });
      });

      document.querySelectorAll('a, button:not(.copy-email-btn):not(.social-icon-btn):not(.glass-nav-pill)').forEach((el) => {
        el.addEventListener('mouseenter', () => {
          if (!el.closest('.cards-strip') && !el.closest('#portfolio-folder-trigger')) {
            setCursorState('hover');
          }
        });
        el.addEventListener('mouseleave', () => {
          if (!el.closest('.cards-strip') && !el.closest('#portfolio-folder-trigger')) {
            setCursorState('default');
          }
        });
      });

      // ===================================================================
      // 8B. VANILLA-TILT 3D INTERACTIVITY ON SHOWCASE CARDS & MODAL
      // ===================================================================
      if (typeof VanillaTilt !== 'undefined' && !prefersReducedMotion) {
        VanillaTilt.init(document.querySelectorAll('.strip-card'), {
          max: 8,
          speed: 400,
          glare: true,
          'max-glare': 0.18,
          scale: 1.02,
          perspective: 1000
        });
      }

      // ===================================================================
      // 9. HORIZONTAL DRAG & MOMENTUM ON SHOWCASE ROWS (PASO 3)
      // ===================================================================
      document.querySelectorAll('.cards-strip').forEach((strip) => {
        let isDown = false;
        let startX = 0;
        let scrollLeft = 0;
        let isDragging = false;

        strip.addEventListener('mousedown', (e) => {
          isDown = true;
          isDragging = false;
          startX = e.pageX - strip.offsetLeft;
          scrollLeft = strip.scrollLeft;
          strip.classList.add('is-dragging');
        });

        window.addEventListener('mouseup', () => {
          if (isDown) {
            isDown = false;
            strip.classList.remove('is-dragging');
            setTimeout(() => { isDragging = false; }, 60);
          }
        });

        strip.addEventListener('mousemove', (e) => {
          if (!isDown) return;
          e.preventDefault();
          const x = e.pageX - strip.offsetLeft;
          const walk = (x - startX) * 1.6;
          if (Math.abs(walk) > 4) isDragging = true;
          strip.scrollLeft = scrollLeft - walk;
        });

        // Suppress modal click if dragging
        strip.querySelectorAll('.open-project-modal').forEach((card) => {
          card.addEventListener('click', (e) => {
            if (isDragging) {
              e.stopImmediatePropagation();
              e.preventDefault();
            }
          }, true);
        });
      });

      // ===================================================================
      // 10. GSAP SCROLLTRIGGER SUITE (PASO 4)
      // ===================================================================
      if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        // A. Dynamic Navbar Theme on Scroll (Dark Hero -> Light Body -> Dark Narrative)
        const header = document.getElementById('main-header');
        if (header) {
          ScrollTrigger.create({
            trigger: '#services-section',
            start: 'top 90px',
            endTrigger: '#dark-narrative-section',
            end: 'top 90px',
            onEnter: () => header.classList.add('is-light-theme'),
            onLeaveBack: () => header.classList.remove('is-light-theme'),
            onEnterBack: () => header.classList.add('is-light-theme'),
            onLeave: () => header.classList.remove('is-light-theme'),
          });
        }

        // B. Showcase Rows Opposing Parallax
        const rows = document.querySelectorAll('.cards-strip');
        if (rows.length >= 3) {
          gsap.to(rows[0], {
            x: -45,
            ease: 'none',
            scrollTrigger: {
              trigger: rows[0],
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            }
          });
          gsap.to(rows[1], {
            x: 45,
            ease: 'none',
            scrollTrigger: {
              trigger: rows[1],
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            }
          });
          gsap.to(rows[2], {
            x: -35,
            ease: 'none',
            scrollTrigger: {
              trigger: rows[2],
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            }
          });
        }

        // C. Hero Studio Portrait Parallax
        const heroBg = document.getElementById('hero-bg-image');
        if (heroBg) {
          gsap.to(heroBg, {
            yPercent: 14,
            scale: 1.07,
            ease: 'none',
            scrollTrigger: {
              trigger: '#view-home section:first-child',
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            }
          });
        }

        // D. Section 4 Interactive 3D Perspective Gyroscope on Folder
        const folderSection = document.getElementById('portfolio-folder-section');
        const folderWrapper = document.getElementById('portfolio-folder-trigger');
        if (folderSection && folderWrapper) {
          folderSection.addEventListener('mousemove', (e) => {
            const rect = folderWrapper.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
            const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

            gsap.to(folderWrapper, {
              rotateY: deltaX * 18,
              rotateX: -deltaY * 16,
              duration: 0.45,
              ease: 'power2.out',
              transformPerspective: 1800,
            });
          });

          folderSection.addEventListener('mouseleave', () => {
            gsap.to(folderWrapper, {
              rotateY: 0,
              rotateX: 0,
              duration: 0.75,
              ease: 'power3.out',
            });
          });
        }
      }



      // ===================================================================
      // 12. INTERACTIVE [CLICK] & [SCROLL] VERBS + MODAL PAUSE
      // ===================================================================
      const pillClickBtn = document.getElementById('pill-click-btn');
      if (pillClickBtn) {
        pillClickBtn.addEventListener('click', (e) => {
          const rect = pillClickBtn.getBoundingClientRect();
          const originX = rect.left + rect.width / 2;
          const originY = rect.top + rect.height / 2;
          impulseShapes(originX, originY);
        });
      }

      const pillScrollBtn = document.getElementById('pill-scroll-btn');
      if (pillScrollBtn) {
        pillScrollBtn.addEventListener('click', () => {
          if (lenis) {
            lenis.scrollTo('#services-section', { duration: 1.3 });
          } else {
            const sec = document.getElementById('services-section');
            if (sec) sec.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }

      // Hook modal into Lenis to pause background scrolling
      const origOpenModal = openModal;
      openModal = function(id) {
        if (lenis) lenis.stop();
        origOpenModal(id);
      };
      const origCloseModal = closeModal;
      closeModal = function() {
        if (lenis) lenis.start();
        origCloseModal();
      };

      // ===================================================================
      // 13. FULL-BLEED 3D BUBBLES & GEOMETRIC SHAPES ENGINE (ARPE BLUE & COBALT)
      // ===================================================================
      const canvas = document.getElementById('blob-playground-canvas');
      const statementSection = document.getElementById('statement-section');
      let shapes = [];
      let pointer = { x: -999, y: -999, active: false };
      let draggedShape = null;
      let dragOffset = { x: 0, y: 0 };
      let lastDragPos = { x: 0, y: 0, t: 0 };
      let dragVelocity = { vx: 0, vy: 0 };

      function createShapes(w, h) {
        const s = Math.min(w, h);
        shapes = [
          // 1. Far-left giant soft sphere
          { id: 1, type: 'sphere', baseX: w * 0.11, baseY: h * 0.45, x: w * 0.11, y: h * 0.45, r: s * 0.28, vx: 0, vy: 0, angle: 0, va: 0.001, phase: 0, parallax: 0.06, style: 'pastel' },
          // 2. Tilted 3D Pill Capsule (left-center, ~35 deg angle)
          { id: 2, type: 'capsule', baseX: w * 0.31, baseY: h * 0.47, x: w * 0.31, y: h * 0.47, r: s * 0.15, len: s * 0.23, vx: 0, vy: 0, angle: -0.60, va: 0.0015, phase: 1.2, parallax: 0.12, style: 'slate' },
          // 3. Rounded Square with Embossed Arrow "→" (bottom-left)
          { id: 3, type: 'arrowBox', baseX: w * 0.26, baseY: h * 0.74, x: w * 0.26, y: h * 0.74, r: s * 0.15, vx: 0, vy: 0, angle: -0.15, va: -0.0012, phase: 2.1, parallax: 0.16, style: 'slate' },
          // 4. Center Giant Soft Sphere with White Orbital Ribbon Loop
          { id: 4, type: 'sphereRibbon', baseX: w * 0.52, baseY: h * 0.57, x: w * 0.52, y: h * 0.57, r: s * 0.30, vx: 0, vy: 0, angle: 0, va: 0.001, phase: 3.4, parallax: 0.08, style: 'pastel' },
          // 5. Right Giant Rounded Pentagon with Embossed Triangle "△"
          { id: 5, type: 'pentagonTri', baseX: w * 0.82, baseY: h * 0.38, x: w * 0.82, y: h * 0.38, r: s * 0.26, vx: 0, vy: 0, angle: 0.24, va: 0.0018, phase: 4.2, parallax: 0.14, style: 'pastel' },
          // 6. Bottom-Right Sphere with Embossed Plus "+"
          { id: 6, type: 'plusSphere', baseX: w * 0.81, baseY: h * 0.72, x: w * 0.81, y: h * 0.72, r: s * 0.17, vx: 0, vy: 0, angle: 0.12, va: -0.0015, phase: 5.1, parallax: 0.18, style: 'pastel' },
          // 7. Small Electric Cobalt Blue (#1849FF) Accent Pops
          { id: 7, type: 'cobaltCircle', baseX: w * 0.21, baseY: h * 0.62, x: w * 0.21, y: h * 0.62, r: s * 0.035, vx: 0, vy: 0, angle: 0, va: 0, phase: 0.8, parallax: 0.22, style: 'cobalt' },
          { id: 8, type: 'cobaltPill', baseX: w * 0.64, baseY: h * 0.26, x: w * 0.64, y: h * 0.26, r: s * 0.026, len: s * 0.065, vx: 0, vy: 0, angle: -0.50, va: 0.004, phase: 2.7, parallax: 0.25, style: 'cobalt' },
          { id: 9, type: 'cobaltPentagon', baseX: w * 0.71, baseY: h * 0.64, x: w * 0.71, y: h * 0.64, r: s * 0.032, vx: 0, vy: 0, angle: 0.36, va: -0.004, phase: 3.9, parallax: 0.20, style: 'cobalt' }
        ];
      }

      function impulseShapes(originX, originY) {
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const ox = originX !== undefined ? (originX - rect.left) : (canvas.width / 2);
        const oy = originY !== undefined ? (originY - rect.top) : (canvas.height / 2);

        shapes.forEach((sh) => {
          const dx = sh.x - ox;
          const dy = sh.y - oy;
          const dist = Math.hypot(dx, dy) || 1;
          const blast = Math.min(24, 2800 / dist);
          sh.vx += (dx / dist) * blast;
          sh.vy += (dy / dist) * blast;
          sh.va += (Math.random() - 0.5) * 0.08;
        });
      }

      if (canvas && statementSection) {
        const ctx = canvas.getContext('2d');

        function resize() {
          const w = statementSection.offsetWidth || window.innerWidth;
          const h = statementSection.offsetHeight || 800;
          canvas.width = w;
          canvas.height = h;
          createShapes(w, h);
        }
        resize();
        let resizeTimer = null;
        window.addEventListener('resize', () => {
          if (resizeTimer) clearTimeout(resizeTimer);
          resizeTimer = setTimeout(resize, 120);
        });

        // Pointer Drag & Throw Physics
        function getPos(e) {
          const rect = canvas.getBoundingClientRect();
          const clientX = e.touches ? e.touches[0].clientX : e.clientX;
          const clientY = e.touches ? e.touches[0].clientY : e.clientY;
          return {
            x: clientX - rect.left,
            y: clientY - rect.top
          };
        }

        canvas.addEventListener('mousedown', (e) => {
          const p = getPos(e);
          for (let i = shapes.length - 1; i >= 0; i--) {
            const sh = shapes[i];
            const d = Math.hypot(sh.x - p.x, sh.y - p.y);
            if (d <= sh.r * 1.15) {
              draggedShape = sh;
              dragOffset.x = sh.x - p.x;
              dragOffset.y = sh.y - p.y;
              lastDragPos = { x: p.x, y: p.y, t: performance.now() };
              dragVelocity = { vx: 0, vy: 0 };
              break;
            }
          }
        });

        window.addEventListener('mousemove', (e) => {
          const rect = canvas.getBoundingClientRect();
          const mx = e.clientX - rect.left;
          const my = e.clientY - rect.top;

          if (draggedShape) {
            const now = performance.now();
            const dt = Math.max(1, now - lastDragPos.t);
            dragVelocity.vx = ((mx - lastDragPos.x) / dt) * 16;
            dragVelocity.vy = ((my - lastDragPos.y) / dt) * 16;
            lastDragPos = { x: mx, y: my, t: now };

            draggedShape.x = mx + dragOffset.x;
            draggedShape.y = my + dragOffset.y;
            draggedShape.vx = 0;
            draggedShape.vy = 0;
          } else {
            pointer.x = mx;
            pointer.y = my;
            pointer.active = mx >= -50 && mx <= rect.width + 50 && my >= -50 && my <= rect.height + 50;
          }
        });

        window.addEventListener('mouseup', () => {
          if (draggedShape) {
            draggedShape.vx = Math.max(-20, Math.min(20, dragVelocity.vx));
            draggedShape.vy = Math.max(-20, Math.min(20, dragVelocity.vy));
            draggedShape = null;
          }
        });

        // Touch event support for mobile drag & fling
        canvas.addEventListener('touchstart', (e) => {
          if (e.touches.length === 1) {
            const p = getPos(e);
            for (let i = shapes.length - 1; i >= 0; i--) {
              const sh = shapes[i];
              const d = Math.hypot(sh.x - p.x, sh.y - p.y);
              if (d <= sh.r * 1.15) {
                draggedShape = sh;
                dragOffset.x = sh.x - p.x;
                dragOffset.y = sh.y - p.y;
                lastDragPos = { x: p.x, y: p.y, t: performance.now() };
                dragVelocity = { vx: 0, vy: 0 };
                break;
              }
            }
          }
        }, { passive: true });

        window.addEventListener('touchmove', (e) => {
          if (draggedShape && e.touches.length > 0) {
            const p = getPos(e);
            const now = performance.now();
            const dt = Math.max(1, now - lastDragPos.t);
            dragVelocity.vx = ((p.x - lastDragPos.x) / dt) * 16;
            dragVelocity.vy = ((p.y - lastDragPos.y) / dt) * 16;
            lastDragPos = { x: p.x, y: p.y, t: now };

            draggedShape.x = p.x + dragOffset.x;
            draggedShape.y = p.y + dragOffset.y;
          }
        }, { passive: true });

        window.addEventListener('touchend', () => {
          if (draggedShape) {
            draggedShape.vx = Math.max(-20, Math.min(20, dragVelocity.vx));
            draggedShape.vy = Math.max(-20, Math.min(20, dragVelocity.vy));
            draggedShape = null;
          }
        });

        function makeSoftGrad(x, y, r, style) {
          const g = ctx.createRadialGradient(x - r * 0.32, y - r * 0.32, r * 0.05, x, y, r * 1.15);
          if (style === 'slate') {
            g.addColorStop(0, '#FFFFFF');
            g.addColorStop(0.35, '#E8F1FC');
            g.addColorStop(0.70, '#BFDBFE');
            g.addColorStop(1, '#60A5FA');
          } else {
            g.addColorStop(0, '#FFFFFF');
            g.addColorStop(0.30, '#E0F2FE');
            g.addColorStop(0.68, '#BAE6FD');
            g.addColorStop(1, '#38BDF8');
          }
          return g;
        }

        function drawRoundedPoly(pts, radius) {
          ctx.beginPath();
          for (let i = 0; i < pts.length; i++) {
            const p0 = pts[i];
            const p1 = pts[(i + 1) % pts.length];
            const p2 = pts[(i + 2) % pts.length];
            if (i === 0) {
              const mx = (p0.x + p1.x) / 2;
              const my = (p0.y + p1.y) / 2;
              ctx.moveTo(mx, my);
            }
            ctx.arcTo(p1.x, p1.y, (p1.x + p2.x) / 2, (p1.y + p2.y) / 2, radius);
          }
          ctx.closePath();
        }

        let time = 0;

        function render() {
          time += 1;
          const w = canvas.width;
          const h = canvas.height;
          ctx.clearRect(0, 0, w, h);

          // 1. Draw Organic Connecting Ribbons (echoing drip lines from text)
          ctx.save();
          ctx.lineWidth = 3.5;
          ctx.lineCap = 'round';
          const ribbonGrad = ctx.createLinearGradient(w * 0.35, 0, w * 0.75, h);
          ribbonGrad.addColorStop(0, 'rgba(24, 73, 255, 0.45)');
          ribbonGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.35)');
          ribbonGrad.addColorStop(1, 'rgba(186, 230, 253, 0.05)');
          ctx.strokeStyle = ribbonGrad;

          ctx.beginPath();
          ctx.moveTo(w * 0.42, h * 0.22);
          ctx.bezierCurveTo(w * 0.40, h * 0.65, w * 0.68, h * 0.45, w * 0.72, h * 0.85);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(w * 0.44, h * 0.26);
          ctx.bezierCurveTo(w * 0.42, h * 0.70, w * 0.70, h * 0.50, w * 0.74, h * 0.90);
          ctx.stroke();
          ctx.restore();

          // 2. Inter-shape soft collision detection & bounce
          for (let i = 0; i < shapes.length; i++) {
            for (let j = i + 1; j < shapes.length; j++) {
              const s1 = shapes[i];
              const s2 = shapes[j];
              const dx = s2.x - s1.x;
              const dy = s2.y - s1.y;
              const dist = Math.hypot(dx, dy) || 1;
              const minDist = s1.r + s2.r;
              if (dist < minDist) {
                const overlap = (minDist - dist) * 0.5;
                const nx = dx / dist;
                const ny = dy / dist;
                if (s1 !== draggedShape) {
                  s1.x -= nx * overlap;
                  s1.y -= ny * overlap;
                }
                if (s2 !== draggedShape) {
                  s2.x += nx * overlap;
                  s2.y += ny * overlap;
                }
                const kx = s1.vx - s2.vx;
                const ky = s1.vy - s2.vy;
                const p = (nx * kx + ny * ky) * 0.6;
                if (s1 !== draggedShape) { s1.vx -= p * nx; s1.vy -= p * ny; }
                if (s2 !== draggedShape) { s2.vx += p * nx; s2.vy += p * ny; }
              }
            }
          }

          // 3. Update & Render Each 3D Shape
          shapes.forEach((sh) => {
            if (sh !== draggedShape) {
              // Harmonic Buoyancy Floating
              const oscX = Math.cos(time * 0.015 + sh.phase) * 12;
              const oscY = Math.sin(time * 0.02 + sh.phase) * 14;

              // Smooth Parallax from Section Scroll
              const secRect = statementSection.getBoundingClientRect();
              const secCenter = secRect.top + secRect.height / 2;
              const viewCenter = window.innerHeight / 2;
              const parallaxY = ((viewCenter - secCenter) / window.innerHeight) * (sh.parallax * 100);

              const targetX = sh.baseX + oscX;
              const targetY = sh.baseY + oscY + parallaxY;

              // Fluid Cursor Repulsion
              if (pointer.active) {
                const dx = sh.x - pointer.x;
                const dy = sh.y - pointer.y;
                const d = Math.hypot(dx, dy) || 1;
                const minD = sh.r + 130;
                if (d < minD) {
                  const f = (minD - d) / minD;
                  sh.vx += (dx / d) * f * 2.2;
                  sh.vy += (dy / d) * f * 2.2;
                }
              }

              // Position & Velocity Integration
              sh.x += (targetX - sh.x) * 0.06 + sh.vx;
              sh.y += (targetY - sh.y) * 0.06 + sh.vy;
              sh.angle += sh.va;

              sh.vx *= 0.92;
              sh.vy *= 0.92;
              sh.va *= 0.95;

              // Boundary Safety Margins
              const margin = sh.r;
              if (sh.x < margin) { sh.x = margin; sh.vx = Math.abs(sh.vx) * 0.8; }
              if (sh.x > w - margin) { sh.x = w - margin; sh.vx = -Math.abs(sh.vx) * 0.8; }
              if (sh.y < margin) { sh.y = margin; sh.vy = Math.abs(sh.vy) * 0.8; }
              if (sh.y > h - margin) { sh.y = h - margin; sh.vy = -Math.abs(sh.vy) * 0.8; }
            }

            ctx.save();
            ctx.translate(sh.x, sh.y);
            ctx.rotate(sh.angle);

            // Volumetric Drop Shadow
            ctx.shadowColor = 'rgba(24, 73, 255, 0.16)';
            ctx.shadowBlur = 28;
            ctx.shadowOffsetY = 12;

            if (sh.type === 'sphere') {
              ctx.beginPath();
              ctx.arc(0, 0, sh.r, 0, Math.PI * 2);
              ctx.fillStyle = makeSoftGrad(0, 0, sh.r, sh.style);
              ctx.fill();
            } else if (sh.type === 'sphereRibbon') {
              // Giant Sphere with White Curving Orbital Ribbon
              ctx.beginPath();
              ctx.arc(0, 0, sh.r, 0, Math.PI * 2);
              ctx.fillStyle = makeSoftGrad(0, 0, sh.r, sh.style);
              ctx.fill();

              // Curving Orbital Ribbon Arc
              ctx.strokeStyle = 'rgba(255, 255, 255, 0.92)';
              ctx.lineWidth = sh.r * 0.055;
              ctx.lineCap = 'round';
              ctx.beginPath();
              ctx.arc(0, 0, sh.r * 0.88, 0.4, 2.7);
              ctx.stroke();
            } else if (sh.type === 'capsule') {
              // 3D Tilted Pill Capsule
              ctx.beginPath();
              ctx.roundRect(-sh.len / 2, -sh.r, sh.len, sh.r * 2, sh.r);
              ctx.fillStyle = makeSoftGrad(0, 0, sh.r, sh.style);
              ctx.fill();
            } else if (sh.type === 'arrowBox') {
              // Rounded 3D Box with Embossed Arrow "→"
              const sz = sh.r * 1.6;
              ctx.beginPath();
              ctx.roundRect(-sz / 2, -sz / 2, sz, sz, sh.r * 0.42);
              ctx.fillStyle = makeSoftGrad(0, 0, sh.r, 'slate');
              ctx.fill();

              // Embossed arrow "→"
              ctx.strokeStyle = 'rgba(255, 255, 255, 0.92)';
              ctx.lineWidth = sh.r * 0.12;
              ctx.lineCap = 'round';
              ctx.lineJoin = 'round';
              const a = sh.r * 0.45;
              ctx.beginPath();
              ctx.moveTo(-a, 0); ctx.lineTo(a, 0);
              ctx.moveTo(a * 0.25, -a * 0.65); ctx.lineTo(a, 0); ctx.lineTo(a * 0.25, a * 0.65);
              ctx.stroke();
            } else if (sh.type === 'pentagonTri') {
              // 3D Rounded Pentagon with Embossed Triangle "△"
              const pts = [];
              for (let i = 0; i < 5; i++) {
                const ang = (i * 2 * Math.PI) / 5 - Math.PI / 2;
                pts.push({ x: Math.cos(ang) * sh.r, y: Math.sin(ang) * sh.r });
              }
              drawRoundedPoly(pts, sh.r * 0.28);
              ctx.fillStyle = makeSoftGrad(0, 0, sh.r, 'pastel');
              ctx.fill();

              // Inner embossed triangle "△"
              ctx.strokeStyle = 'rgba(255, 255, 255, 0.92)';
              ctx.lineWidth = sh.r * 0.088;
              ctx.lineJoin = 'round';
              const tr = sh.r * 0.36;
              ctx.beginPath();
              for (let i = 0; i < 3; i++) {
                const ang = (i * 2 * Math.PI) / 3 - Math.PI / 2;
                const tx = Math.cos(ang) * tr;
                const ty = Math.sin(ang) * tr;
                if (i === 0) ctx.moveTo(tx, ty); else ctx.lineTo(tx, ty);
              }
              ctx.closePath();
              ctx.stroke();
            } else if (sh.type === 'plusSphere') {
              // Soft 3D Sphere with Embossed Plus "+"
              ctx.beginPath();
              ctx.arc(0, 0, sh.r, 0, Math.PI * 2);
              ctx.fillStyle = makeSoftGrad(0, 0, sh.r, 'pastel');
              ctx.fill();

              // Embossed Plus "+"
              ctx.strokeStyle = 'rgba(255, 255, 255, 0.92)';
              ctx.lineWidth = sh.r * 0.125;
              ctx.lineCap = 'round';
              const pLen = sh.r * 0.38;
              ctx.beginPath();
              ctx.moveTo(-pLen, 0); ctx.lineTo(pLen, 0);
              ctx.moveTo(0, -pLen); ctx.lineTo(0, pLen);
              ctx.stroke();
            } else if (sh.type === 'cobaltCircle') {
              // Accent Cobalt Pop Sphere
              ctx.beginPath();
              ctx.arc(0, 0, sh.r, 0, Math.PI * 2);
              ctx.fillStyle = '#1849FF';
              ctx.fill();
            } else if (sh.type === 'cobaltPill') {
              // Accent Cobalt Pop Pill
              ctx.beginPath();
              ctx.roundRect(-sh.len / 2, -sh.r, sh.len, sh.r * 2, sh.r);
              ctx.fillStyle = '#1849FF';
              ctx.fill();
            } else if (sh.type === 'cobaltPentagon') {
              // Accent Cobalt Pop Mini Pentagon
              ctx.beginPath();
              for (let i = 0; i < 5; i++) {
                const ang = (i * 2 * Math.PI) / 5 - Math.PI / 2;
                const px = Math.cos(ang) * sh.r;
                const py = Math.sin(ang) * sh.r;
                if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
              }
              ctx.closePath();
              ctx.fillStyle = '#1849FF';
              ctx.fill();
            }

            ctx.restore();
          });

          if (isCanvasVisible) {
            canvasAnimationId = requestAnimationFrame(render);
          } else {
            canvasAnimationId = null;
          }
        }

        let isCanvasVisible = false;
        let canvasAnimationId = null;

        function startCanvasLoop() {
          if (!canvasAnimationId) {
            canvasAnimationId = requestAnimationFrame(render);
          }
        }

        function stopCanvasLoop() {
          if (canvasAnimationId) {
            cancelAnimationFrame(canvasAnimationId);
            canvasAnimationId = null;
          }
        }

        if ('IntersectionObserver' in window) {
          const canvasObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              isCanvasVisible = entry.isIntersecting;
              if (isCanvasVisible) {
                startCanvasLoop();
              } else {
                stopCanvasLoop();
              }
            });
          }, { threshold: 0.05 });
          canvasObserver.observe(statementSection);
        } else {
          isCanvasVisible = true;
          startCanvasLoop();
        }
      }
    
      // Mobile Hamburger Menu Toggle
      const mobileMenuBtn = document.getElementById('mobile-menu-btn');
      const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

      function closeMobileMenu() {
        if (!mobileMenuBtn || !mobileMenuOverlay) return;
        mobileMenuBtn.classList.remove('is-active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuOverlay.classList.remove('is-open');
        if (lenis) lenis.start();
      }

      function toggleMobileMenu() {
        if (!mobileMenuBtn || !mobileMenuOverlay) return;
        const isOpen = mobileMenuOverlay.classList.toggle('is-open');
        mobileMenuBtn.classList.toggle('is-active', isOpen);
        mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        if (lenis) {
          if (isOpen) lenis.stop();
          else lenis.start();
        }
      }

      if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
      }

      document.querySelectorAll('.mobile-nav-link').forEach((link) => {
        link.addEventListener('click', () => {
          const target = link.getAttribute('data-nav');
          if (target && typeof switchView === 'function') {
            switchView(target);
          }
          closeMobileMenu();
        });
      });

    })();
