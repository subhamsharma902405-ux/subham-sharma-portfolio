document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();

  const progressBar = document.querySelector('.scroll-progress');
  const updateProgress = () => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.transform = `scaleX(${scrollableHeight ? window.scrollY / scrollableHeight : 0})`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  window.addEventListener('pointermove', (event) => {
    document.documentElement.style.setProperty('--pointer-x', `${event.clientX}px`);
    document.documentElement.style.setProperty('--pointer-y', `${event.clientY}px`);
  }, { passive: true });

  const menuToggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.main-nav');
  menuToggle.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.innerHTML = `<i data-lucide="${isOpen ? 'x' : 'menu'}"></i>`;
    lucide.createIcons();
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navigation.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.innerHTML = '<i data-lucide="menu"></i>';
      lucide.createIcons();
    });
  });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

  const filters = document.querySelectorAll('.filter');
  const projects = document.querySelectorAll('.project-card');
  filters.forEach((filter) => {
    filter.addEventListener('click', () => {
      filters.forEach((item) => item.classList.remove('active'));
      filter.classList.add('active');
      const selected = filter.dataset.filter;
      projects.forEach((project) => {
        const isVisible = selected === 'all' || project.dataset.category === selected;
        project.dataset.hidden = String(!isVisible);
      });
    });
  });

  const form = document.querySelector('.contact-form');
  const status = document.querySelector('.form-status');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = new FormData(form).get('name');
    status.textContent = `Thanks, ${name}. Your message is ready to send.`;
    form.reset();
  });
});
