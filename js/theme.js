(() => {
  const root = document.documentElement;
  const body = document.body;
  const isLocal = ['localhost', '127.0.0.1', '::1', ''].includes(window.location.hostname);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const themeToggle = document.querySelector('.theme-toggle');
  const menuToggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.site-navigation');
  const header = document.querySelector('.site-header');
  const backToTop = document.querySelector('.back-to-top');
  const progressBar = document.querySelector('.reading-progress span');
  const tocProgress = document.querySelector('.toc-progress span');

  if (isLocal) body.classList.add('is-local');

  if (!isLocal && body.dataset.busuanzi === 'true') {
    const counterScript = document.createElement('script');
    counterScript.src = '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js';
    counterScript.async = true;
    document.head.appendChild(counterScript);
  }

  const currentTheme = () => root.dataset.theme || 'light';

  const syncThemeControl = () => {
    if (!themeToggle) return;
    const dark = currentTheme() === 'dark';
    themeToggle.setAttribute('aria-label', dark ? '切换到浅色模式' : '切换到深色模式');
    themeToggle.setAttribute('title', dark ? '切换到浅色模式' : '切换到深色模式');
  };

  const syncCommentsTheme = () => {
    const iframe = document.querySelector('.utterances-frame');
    if (!iframe) return;
    iframe.contentWindow.postMessage({
      type: 'set-theme',
      theme: currentTheme() === 'dark' ? 'github-dark' : 'github-light'
    }, 'https://utteranc.es');
  };

  syncThemeControl();

  themeToggle?.addEventListener('click', () => {
    const nextTheme = currentTheme() === 'dark' ? 'light' : 'dark';
    root.dataset.theme = nextTheme;
    localStorage.setItem('ethereal-theme', nextTheme);
    syncThemeControl();
    syncCommentsTheme();
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (localStorage.getItem('ethereal-theme')) return;
    root.dataset.theme = event.matches ? 'dark' : 'light';
    syncThemeControl();
    syncCommentsTheme();
  });

  const closeMenu = () => {
    if (!menuToggle || !navigation) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', '打开导航');
    menuToggle.setAttribute('title', '打开导航');
    navigation.classList.remove('is-open');
  };

  menuToggle?.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? '关闭导航' : '打开导航');
    menuToggle.setAttribute('title', open ? '关闭导航' : '打开导航');
    navigation?.classList.toggle('is-open', open);
  });

  document.addEventListener('click', event => {
    if (!navigation?.classList.contains('is-open')) return;
    if (navigation.contains(event.target) || menuToggle?.contains(event.target)) return;
    closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) closeMenu();
  });

  const updateScrollState = () => {
    const scrollTop = window.scrollY;
    const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const percent = Math.min(scrollTop / scrollable, 1) * 100;

    header?.classList.toggle('is-scrolled', scrollTop > 12);
    backToTop?.classList.toggle('is-visible', scrollTop > 520);
    if (progressBar) progressBar.style.width = `${percent}%`;
    if (tocProgress) tocProgress.style.width = `${percent}%`;
  };

  updateScrollState();
  window.addEventListener('scroll', updateScrollState, { passive: true });
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' }));

  const revealElements = document.querySelectorAll('.reveal');
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach(element => element.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0, rootMargin: '0px 0px -36px' });
    revealElements.forEach(element => revealObserver.observe(element));
  }

  const quoteRotator = document.querySelector('[data-quote-rotator]');
  const quoteData = document.querySelector('#home-quotes');
  if (quoteRotator && quoteData && !prefersReducedMotion) {
    try {
      const quotes = JSON.parse(quoteData.textContent);
      const quoteText = quoteRotator.querySelector('.quote-text');
      const quoteAuthor = quoteRotator.querySelector('.quote-author span');
      let quoteIndex = 0;

      if (quotes.length > 1 && quoteText && quoteAuthor) {
        window.setInterval(() => {
          quoteRotator.classList.add('is-changing');
          window.setTimeout(() => {
            quoteIndex = (quoteIndex + 1) % quotes.length;
            quoteText.textContent = quotes[quoteIndex].text;
            quoteAuthor.textContent = quotes[quoteIndex].author;
            quoteRotator.classList.remove('is-changing');
          }, 360);
        }, 6200);
      }
    } catch {
      // Keep the server-rendered first quote when configuration is invalid.
    }
  }

  document.querySelectorAll('.friend-avatar img').forEach(image => {
    const showFallback = () => {
      image.closest('.friend-avatar')?.classList.add('is-fallback');
    };
    if (image.complete && !image.naturalWidth) showFallback();
    image.addEventListener('error', showFallback, { once: true });
  });

  const articleHeadings = [...document.querySelectorAll('.article-content h2[id], .article-content h3[id], .article-content h4[id]')];
  articleHeadings.forEach(heading => {
    const anchor = document.createElement('a');
    anchor.className = 'heading-anchor';
    anchor.href = `#${heading.id}`;
    anchor.setAttribute('aria-label', `定位到 ${heading.textContent.trim()}`);
    anchor.textContent = '#';
    heading.prepend(anchor);
  });

  const tocLinks = [...document.querySelectorAll('.toc-link')];
  const tocItems = [...document.querySelectorAll('.toc-item')];

  tocLinks.forEach(link => {
    link.addEventListener('click', event => {
      const targetId = decodeURIComponent(link.hash.slice(1));
      const targetHeading = document.getElementById(targetId);
      if (!targetHeading) return;

      event.preventDefault();
      history.pushState(null, '', link.hash);
      targetHeading.scrollIntoView({ block: 'start', behavior: 'auto' });
      activateTocLink(link);
    });
  });

  tocItems.forEach(item => {
    const child = [...item.children].find(element => element.classList?.contains('toc-child'));
    if (!child) return;

    item.classList.add('has-children');
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'toc-toggle';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', '展开子目录');
    toggle.innerHTML = '<span aria-hidden="true">›</span>';
    item.insertBefore(toggle, child);

    toggle.addEventListener('click', () => {
      const expanded = !item.classList.contains('is-expanded');
      item.classList.toggle('is-expanded', expanded);
      toggle.setAttribute('aria-expanded', String(expanded));
      toggle.setAttribute('aria-label', expanded ? '收起子目录' : '展开子目录');
    });
  });

  const activateTocLink = link => {
    if (!link) return;
    tocLinks.forEach(item => item.classList.remove('is-active'));
    link.classList.add('is-active');

    const activeItem = link.closest('.toc-item');
    const activeTopLevel = activeItem?.closest('.toc > .toc-item');
    document.querySelectorAll('.toc > .toc-item.is-expanded').forEach(item => {
      if (item === activeTopLevel) return;
      [item, ...item.querySelectorAll('.toc-item.is-expanded')].forEach(branch => {
        branch.classList.remove('is-expanded');
        const toggle = branch.querySelector(':scope > .toc-toggle');
        toggle?.setAttribute('aria-expanded', 'false');
        toggle?.setAttribute('aria-label', '展开子目录');
      });
    });

    let parent = activeItem;
    while (parent?.classList.contains('toc-item')) {
      if (parent.classList.contains('has-children')) {
        parent.classList.add('is-expanded');
        const toggle = parent.querySelector(':scope > .toc-toggle');
        toggle?.setAttribute('aria-expanded', 'true');
        toggle?.setAttribute('aria-label', '收起子目录');
      }
      parent = parent.parentElement?.closest('.toc-item');
    }
  };

  if (tocLinks.length) activateTocLink(tocLinks[0]);

  if (articleHeadings.length && tocLinks.length) {
    const tocMap = new Map(tocLinks.map(link => [decodeURIComponent(link.hash.slice(1)), link]));
    let tocFramePending = false;
    const updateActiveToc = () => {
      const currentHeading = [...articleHeadings].reverse().find(heading => heading.getBoundingClientRect().top <= 150) || articleHeadings[0];
      activateTocLink(tocMap.get(currentHeading.id));
      tocFramePending = false;
    };

    window.addEventListener('scroll', () => {
      if (tocFramePending) return;
      tocFramePending = true;
      window.requestAnimationFrame(updateActiveToc);
    }, { passive: true });
    updateActiveToc();
  }

  const codeBlocks = document.querySelectorAll('.article-content figure.highlight, .article-content pre');
  codeBlocks.forEach(block => {
    if (block.closest('figure.highlight') && block.tagName === 'PRE') return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'copy-code';
    button.textContent = '复制';
    button.addEventListener('click', async () => {
      const source = block.matches('figure.highlight') ? block.querySelector('.code') : block;
      try {
        await navigator.clipboard.writeText(source?.textContent || '');
        button.textContent = '已复制';
      } catch {
        button.textContent = '复制失败';
      }
      window.setTimeout(() => { button.textContent = '复制'; }, 1500);
    });
    block.appendChild(button);
  });

  const viewer = document.querySelector('.image-viewer');
  const viewerImage = viewer?.querySelector('img');
  document.querySelectorAll('.article-content img').forEach(image => {
    image.addEventListener('click', () => {
      if (!viewer || !viewerImage) return;
      viewerImage.src = image.currentSrc || image.src;
      viewerImage.alt = image.alt || '文章图片';
      viewer.showModal();
    });
  });
  viewer?.querySelector('.image-viewer-close')?.addEventListener('click', () => viewer.close());
  viewer?.addEventListener('click', event => {
    if (event.target === viewer) viewer.close();
  });

  const commentsRoot = document.querySelector('.utterances-root');
  if (commentsRoot && !isLocal) {
    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.setAttribute('repo', commentsRoot.dataset.repo);
    script.setAttribute('issue-term', commentsRoot.dataset.issueTerm);
    script.setAttribute('label', commentsRoot.dataset.label);
    script.setAttribute('theme', currentTheme() === 'dark' ? 'github-dark' : 'github-light');
    commentsRoot.appendChild(script);
  }

  if (!prefersReducedMotion) {
    document.addEventListener('click', event => {
      const link = event.target.closest('a');
      if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (link.target === '_blank' || link.hasAttribute('download')) return;
      const target = new URL(link.href, window.location.href);
      if (target.origin !== window.location.origin || target.hash || target.href === window.location.href) return;
      event.preventDefault();
      body.classList.add('is-leaving');
      window.setTimeout(() => { window.location.href = target.href; }, 150);
    });
  }
})();
