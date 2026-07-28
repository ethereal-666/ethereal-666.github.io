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
  if (articleHeadings.length && tocLinks.length && 'IntersectionObserver' in window) {
    const tocMap = new Map(tocLinks.map(link => [decodeURIComponent(link.hash.slice(1)), link]));
    const headingObserver = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (!visible.length) return;
      tocLinks.forEach(link => link.classList.remove('is-active'));
      tocMap.get(visible[0].target.id)?.classList.add('is-active');
    }, { rootMargin: '-110px 0px -65% 0px', threshold: [0, 1] });
    articleHeadings.forEach(heading => headingObserver.observe(heading));
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
