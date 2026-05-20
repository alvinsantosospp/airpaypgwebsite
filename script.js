// Navbar scroll shadow
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 12);
});

// Mobile nav toggle
const toggle = document.getElementById('navToggle');
const menu   = document.getElementById('navMenu');
const actions = document.getElementById('navActions');

toggle.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  actions.classList.toggle('open', isOpen);

  const spans = toggle.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }
});

// Mobile dropdown items tap-to-expand
menu.querySelectorAll('.nav-item.dropdown').forEach(item => {
  item.querySelector('.nav-link').addEventListener('click', e => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      item.classList.toggle('open');
    }
  });
});

// Close menu on outside click
document.addEventListener('click', e => {
  if (!toggle.contains(e.target) && !menu.contains(e.target) && !actions.contains(e.target)) {
    menu.classList.remove('open');
    actions.classList.remove('open');
    const spans = toggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }
});

// Close menu on resize to desktop
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    menu.classList.remove('open');
    actions.classList.remove('open');
  }
});
