/* ============================================
   Бургер-меню
   ============================================ */
const burger = document.querySelector('.burger');
const nav = document.querySelector('#nav');
if (burger && nav) {
  burger.addEventListener('click', () => {
    nav.classList.toggle('open');
    burger.classList.toggle('active');
  });
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      burger.classList.remove('active');
    });
  });
}

/* ============================================
   Анимация появления при прокрутке
   ============================================ */
const animatedElements = document.querySelectorAll('[data-aos]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('aos-animate');
  });
}, { threshold: 0.1 });
animatedElements.forEach((el) => observer.observe(el));

/* ============================================
   Кнопка "Наверх"
   ============================================ */
const toTop = document.getElementById('toTop');
if (toTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) toTop.classList.add('show');
    else toTop.classList.remove('show');
  });
  toTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================
   Фильтр проектов
   ============================================ */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('#projectsGrid .project-card');

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach((card) => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.style.display = show ? '' : 'none';
      if (show) {
        card.style.animation = 'none';
        void card.offsetWidth;
        card.style.animation = 'fadeIn 0.4s ease';
      }
    });
  });
});

/* ============================================
   Лайтбокс
   ============================================ */
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightboxContent');
const lightboxClose = document.querySelector('.lightbox-close');

if (lightbox && lightboxContent) {
  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;
      lightboxContent.src = img.src;
      lightboxContent.alt = img.alt;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}

/* ============================================
   Валидация формы
   ============================================ */
const form = document.getElementById('contactForm');
const formResult = document.getElementById('formResult');

if (form) {
  const fields = ['name', 'email', 'subject', 'message', 'agree'];

  function showError(name, msg) {
    const el = document.querySelector(`.error[data-for="${name}"]`);
    const field = document.getElementById(name);
    if (el) el.textContent = msg;
    if (field && field.type !== 'checkbox') field.classList.add('invalid');
  }
  function clearError(name) {
    const el = document.querySelector(`.error[data-for="${name}"]`);
    const field = document.getElementById(name);
    if (el) el.textContent = '';
    if (field) field.classList.remove('invalid');
  }

  function validate(name) {
    const field = document.getElementById(name);
    if (!field) return true;
    clearError(name);

    if (name === 'agree') {
      if (!field.checked) { showError(name, 'Нужно согласие'); return false; }
      return true;
    }

    const value = field.value.trim();
    if (!value) { showError(name, 'Заполните поле'); return false; }

    if (name === 'name' && value.length < 2) {
      showError(name, 'Минимум 2 символа'); return false;
    }
    if (name === 'email') {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(value)) { showError(name, 'Некорректный email'); return false; }
    }
    if (name === 'message' && value.length < 10) {
      showError(name, 'Сообщение минимум 10 символов'); return false;
    }
    return true;
  }

  fields.forEach((name) => {
    const field = document.getElementById(name);
    if (!field) return;
    field.addEventListener('blur', () => validate(name));
    field.addEventListener('input', () => {
      if (field.classList.contains('invalid')) validate(name);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    fields.forEach((name) => { if (!validate(name)) ok = false; });
    if (!ok) {
      formResult.style.color = '#d7263d';
      formResult.textContent = 'Проверьте выделенные поля';
      return;
    }
    const name = document.getElementById('name').value.trim();
    formResult.style.color = '#2f9e44';
    formResult.textContent = `Спасибо, ${name}! Сообщение отправлено ✅`;
    form.reset();
  });
}
