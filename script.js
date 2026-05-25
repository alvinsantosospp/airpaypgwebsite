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
  navbar.classList.toggle('menu-open', isOpen);

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
    navbar.classList.remove('menu-open');
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
    navbar.classList.remove('menu-open');
  }
});

// Lead form → Google Sheets
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby9V6ivqoMJ_JPNMmUO8Q-E07MsvJkIpbMB5LiVvObyCQ0WVlvPsCOsYQ9Vd7RiqNpGEw/exec';

const leadForm = document.getElementById('leadForm');
if (leadForm) {
  leadForm.addEventListener('submit', async e => {
    e.preventDefault();

    const btn     = leadForm.querySelector('.btn-submit');
    const origTxt = btn.innerHTML;
    btn.innerHTML = 'Sending…';
    btn.disabled  = true;

    const data = {
      businessName: leadForm.querySelector('[name="businessName"]').value.trim(),
      picName:      leadForm.querySelector('[name="picName"]').value.trim(),
      phone:        '+62 ' + leadForm.querySelector('[name="phone"]').value.trim(),
      email:        leadForm.querySelector('[name="email"]').value.trim(),
      storeUrl:     'https://' + leadForm.querySelector('[name="storeUrl"]').value.trim(),
      consent:      'Yes'
    };

    try {
      await fetch(APPS_SCRIPT_URL, {
        method:  'POST',
        mode:    'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body:    JSON.stringify(data)
      });

      leadForm.innerHTML = `
        <div style="text-align:center;padding:36px 0">
          <svg viewBox="0 0 52 52" fill="none" style="width:60px;height:60px;margin:0 auto 18px;display:block">
            <circle cx="26" cy="26" r="25" fill="#D1FAE5" stroke="#34D399" stroke-width="2"/>
            <path d="M15 26l8 8 14-14" stroke="#059669" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <h3 style="font-size:1.2rem;font-weight:800;color:#111827;margin-bottom:10px">Thank you!</h3>
          <p style="font-size:14px;color:#6B7280;line-height:1.6">We received your submission.<br>Our team will reach out within 2 business days.</p>
        </div>`;

    } catch (err) {
      btn.innerHTML = origTxt;
      btn.disabled  = false;
      alert('Something went wrong. Please try again.');
    }
  });
}
