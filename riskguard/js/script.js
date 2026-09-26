const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('header[id], section[id]');

if (navLinks.length && sections.length) {
  const setActiveLink = (id) => {
    navLinks.forEach(link => {
      const isActive = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('active', isActive);
      link.setAttribute('aria-current', isActive ? 'page' : 'false');
    });
  };

  const observer = new IntersectionObserver((entries) => {
    const visibleEntry = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visibleEntry) {
      setActiveLink(visibleEntry.target.id);
    }
  }, {
    root: null,
    threshold: [0.25, 0.5, 0.75],
    rootMargin: '-10% 0px -45% 0px'
  });

  sections.forEach(section => observer.observe(section));

  const firstSection = document.getElementById('home');
  if (firstSection) {
    setActiveLink(firstSection.id);
  }
}

const page = document.querySelector('.riskguard-page');
if (!page) {
  // The legacy landing markup has no template showcase controls.
} else {
  const menuToggle = page.querySelector('.menu-toggle');
  const navLinks = page.querySelector('.nav-links');
  const themeToggle = page.querySelector('.theme-control');
  const directionToggle = page.querySelector('.direction-control');

  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
    menuToggle.innerHTML = `<i class="bi bi-${isOpen ? 'x-lg' : 'list'}"></i>`;
  });

  page.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  themeToggle.addEventListener('click', () => {
    page.classList.toggle('light-mode');
    const isLight = page.classList.contains('light-mode');
    themeToggle.innerHTML = `<i class="bi bi-${isLight ? 'moon-stars' : 'sun'}"></i><span>${isLight ? 'Dark' : 'Light'}</span>`;
  });

  directionToggle.addEventListener('click', () => {
    const isRtl = document.documentElement.dir === 'rtl';
    document.documentElement.dir = isRtl ? 'ltr' : 'rtl';
    directionToggle.innerHTML = `<i class="bi bi-text-${isRtl ? 'left' : 'right'}"></i><span>${isRtl ? 'LTR' : 'RTL'}</span>`;
  });
}

const installPreview = document.querySelector('.install-preview-trigger');
if (installPreview) {
  installPreview.addEventListener('click', () => {
    const frame = installPreview.closest('.install-preview-frame');
    const player = document.createElement('iframe');
    const videoId = installPreview.dataset.youtubeId;

    player.className = 'install-video-embed';
    player.title = 'How to install RiskGuard?';
    player.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
    player.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    player.referrerPolicy = 'strict-origin-when-cross-origin';
    player.allowFullscreen = true;

    frame.replaceChildren(player);
  });
}

