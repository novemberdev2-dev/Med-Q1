/* ===== PROFILE ===== */
const DEFAULT_IMG = 'icon-192.png';
const DEFAULT_NAME = 'MedQ';
let pendingImageDataUrl = null;

function openProfileModal() {
  const backdrop = document.getElementById('profile-modal-backdrop');
  const nameInput = document.getElementById('pm-name-input');
  const previewImg = document.getElementById('pm-preview-img');

  const savedName = localStorage.getItem('medq_profile_name') || DEFAULT_NAME;
  const savedImg  = localStorage.getItem('medq_profile_img')  || DEFAULT_IMG;

  nameInput.value = savedName;
  previewImg.src  = savedImg;
  pendingImageDataUrl = null;

  backdrop.classList.add('open');
  backdrop.addEventListener('click', onBackdropClick);
}

function onBackdropClick(e) {
  if (e.target === document.getElementById('profile-modal-backdrop')) {
    closeProfileModal();
  }
}

function closeProfileModal() {
  const backdrop = document.getElementById('profile-modal-backdrop');
  backdrop.classList.remove('open');
  backdrop.removeEventListener('click', onBackdropClick);
  pendingImageDataUrl = null;
}

function saveProfile() {
  const nameInput = document.getElementById('pm-name-input');
  const newName = nameInput.value.trim() || DEFAULT_NAME;

  localStorage.setItem('medq_profile_name', newName);
  document.getElementById('app-name-el').textContent = newName;

  if (pendingImageDataUrl) {
    localStorage.setItem('medq_profile_img', pendingImageDataUrl);
    document.getElementById('profile-img').src = pendingImageDataUrl;
  }

  closeProfileModal();
}

document.getElementById('profile-file-input').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(ev) {
    pendingImageDataUrl = ev.target.result;
    document.getElementById('pm-preview-img').src = pendingImageDataUrl;
  };
  reader.readAsDataURL(file);
  this.value = '';
});

function restoreProfile() {
  const savedName = localStorage.getItem('medq_profile_name');
  const savedImg  = localStorage.getItem('medq_profile_img');
  if (savedName) document.getElementById('app-name-el').textContent = savedName;
  if (savedImg)  document.getElementById('profile-img').src = savedImg;
}

/* ===== SETTINGS DROPDOWN ===== */
function toggleSettingsDropdown() {
  const dropdown = document.getElementById('settings-dropdown');
  const btn = document.getElementById('settings-btn');
  const isOpen = dropdown.classList.contains('open');
  if (isOpen) {
    dropdown.classList.remove('open');
    btn.classList.remove('dropdown-open');
  } else {
    document.getElementById('filter-dropdown').classList.remove('open');
    document.getElementById('filter-btn').classList.remove('dropdown-open');
    closeAllSubDropdowns();
    dropdown.classList.add('open');
    btn.classList.add('dropdown-open');
  }
}

function closeSettingsDropdown() {
  document.getElementById('settings-dropdown').classList.remove('open');
  document.getElementById('settings-btn').classList.remove('dropdown-open');
}

function updateSettingsThemeUI(isLight) {
  const moonIcon = document.getElementById('settings-icon-moon');
  const sunIcon  = document.getElementById('settings-icon-sun');
  const label    = document.getElementById('settings-theme-label');
  const sub      = document.getElementById('settings-theme-sub');

  if (isLight) {
    moonIcon.style.display = 'none';
    sunIcon.style.display  = '';
    label.textContent = 'Light Mode';
    sub.textContent   = 'Switch to dark';
  } else {
    moonIcon.style.display = '';
    sunIcon.style.display  = 'none';
    label.textContent = 'Dark Mode';
    sub.textContent   = 'Switch to light';
  }
}

function toggleThemeFromSettings() {
  const body = document.body;
  const isCurrentlyLight = body.classList.contains('light-mode');

  if (isCurrentlyLight) {
    body.classList.remove('light-mode');
    localStorage.setItem('medq_theme', 'dark');
    updateSettingsThemeUI(false);
  } else {
    body.classList.add('light-mode');
    localStorage.setItem('medq_theme', 'light');
    updateSettingsThemeUI(true);
  }
}

/* ===== CARD DATA ===== */
/* HDSF and BBB each hold every card for that category — no more year-based split. */
const CATEGORIES = {
  hdsf: {
    label: 'HDSF 🦴',
    cards: [

     
 { title: '2021-2025 Year Exams', links: [
        { label: 'Theory', badge: '847 MCQs', sublinks: [
          { label: 'Anatomy 🦴', badge: '196 MCQs', href: 'HDSF_Anatomy_Theory_2021-2025.html' },
          { label: 'Microbiology 🦠', badge: '131 MCQs', href: 'HDSF_Microbiology_Theory_2021-2025.html' },
          { label: 'Physiology 🫀', badge: '204 MCQs', href: 'HDSF_Physiology_2021-2025.html' },
          { label: 'Molecular biology 🧬', badge: '82 MCQs', href: 'HDSF_Molecular Biology_Theory_2021-2025.html' },
          { label: 'Genetics 🧬', badge: '54 MCQs', href: 'HDSF_Genetics_2021-2025.html' },
          { label: 'Cell biology 🔬', badge: '75 MCQs', href: 'HDSF_Cell Biology_2021-2025.html' },
          { label: 'Histology 🫁', badge: '73 MCQs', href: 'HDSF_Histology_2021-2025.html' },
          { label: 'Embryology 👶', badge: '33 MCQs', href: 'HDSF_Embryology_2021-2025.html' },
        ]},
        { label: 'Practice', badge: '106 Qs', sublinks: [
          { label: 'Anatomy 🦴', badge: '70 Qs', href: 'HDSF_Anatomy_Practice_2021-2025.html' },
          { label: 'Microbiology 🦠', badge: '32 Qs', href: 'HDSF_Microbiology_Practice_2021-2025.html' },
          { label: 'Molecular biology 🧬', badge: '4 Qs', href: 'HSDF_Molecular Biology_Practice_2021-2025.html' }
        ]},
      ]},


       { title: '2025-2026 Year Exams', links: [
        { label: 'Theory', badge: '160 MCQs', sublinks: [
          { label: 'End-Rotation 1', badge: '20 MCQs', href: 'HDSF_End-Rotation1_Theory_2025-2026.html' },
          { label: 'End-Rotation 2', badge: '20 MCQs', href: 'HDSF_End-Rotation2_Theory_2025-2026.html' },
          { label: 'Final 1', badge: '120 MCQs', href: 'HDSF_Final1_Theory_2025-2026.html' }
        ]},
        { label: 'Practice', badge: '40 Qs', sublinks: [
          { label: 'End-Rotation 1', badge: '10 Qs', href: 'HDSF_End-Rotation1_Practice_2025-2026.html' },
          { label: 'End-Rotation 2', badge: '10 Qs', href: 'HDSF_End-Rotation2_Practice_2025-2026.html' },
          { label: 'Final 1', badge: '20 Qs', href: 'HDSF_Final1_Practice_2025-2026.html' }
        ]},
      ]},
    ]
  },
  bbb: {
    label: 'BBB 🧪',
    cards: [


        { title: '2021-2025 Year Exams', links: [
        { label: 'Theory', badge: '983 MCQs', sublinks: [
          { label: 'Biochemistry 🧪', badge: '435 MCQs', href: 'BBB_Biochemistry_Theory_2021-2025.html' },
          { label: 'Biochemistry 🧪 _ Quiz', badge: '167 MCQs', href: 'BBB_BiochemistryQuiz_Theory_2017-2025.html' },
          { label: 'Biophysics ⚛️', badge: '265 MCQs', href: 'BBB_Biophysics_Theory_2021-2025.html' },
          { label: 'Basic Emergency Care 🚑', badge: '116 MCQs', href: 'BBB_BEC_Theory_2021-2025.html' },
        ]},
        { label: 'Practice', badge: '101 Qs', sublinks: [
          { label: 'Biochemistry 🧪', badge: '44 Qs', href: 'BBB_Biochemistry_Practice_2021-2025.html' },
          { label: 'Biophysics ⚛️', badge: '35 Qs', href: 'BBB_Biophysics_Practice_2021-2025.html' },
          { label: 'Basic Emergency Care 🚑', badge: '22 Qs', href: 'BBB_BEC_Practice_2021-2025.html' }
        ]},

      ]},


        { title: '2025-2026 Year Exams', links: [
        { label: 'Theory', badge: '152 MCQs', sublinks: [
          { label: 'End-Rotation 1', badge: '20 MCQs', href: 'BBB_End-Rotation1_Theory_2025-2026.html' },
          { label: 'End-Rotation 2', badge: '20 MCQs', href: 'BBB_End-Rotation2_Theory_2025-2026.html' },
          { label: 'Final 1', badge: '112 MCQs', href: 'BBB_Final1_Theory_2025-2026.html' }
        ]},
        { label: 'Practice', badge: '40 Qs', sublinks: [
          { label: 'End-Rotation 1', badge: '10 Qs', href: 'BBB_End-Rotation1_Practice_2025-2026.html' },
          { label: 'End-Rotation 2', badge: '10 Qs', href: 'BBB_End-Rotation2_Practice_2025-2026.html' },
          { label: 'Final 1', badge: '20 Qs', href: 'BBB_Final1_Practice_2025-2026.html' }
        ]},

      ]},
     
    
    ]
  }
};

/* ===== VIEW RENDERING ===== */
function renderView(filterType) {
  const container = document.getElementById('app-view');
  container.innerHTML = '';

  const keys = filterType === 'both' ? ['hdsf', 'bbb'] : [filterType];

  keys.forEach(key => {
    const category = CATEGORIES[key];
    if (!category) return;

    const themeClass = key === 'hdsf' ? 'hdsf-theme' : 'bbb-theme';

    const sectionEl = document.createElement('div');
    sectionEl.className = 'section-container';
    sectionEl.id = 'section-' + key;

    const title = document.createElement('h2');
    title.className = `category-title ${themeClass}`;
    title.textContent = category.label;
    sectionEl.appendChild(title);

    const grid = document.createElement('div');
    grid.className = 'subject-grid';

    category.cards.forEach((card, cardIdx) => {
      const cardEl = document.createElement('div');
      cardEl.className = 'subject-card';

      const header = document.createElement('div');
      header.className = 'card-header';
      header.innerHTML = `<h1>${card.title}</h1>`;
      cardEl.appendChild(header);

      const linksContainer = document.createElement('div');
      linksContainer.className = 'links-container';

      card.links.forEach((link, linkIdx) => {
        if (link.sublinks) {
          const wrapper = document.createElement('div');
          wrapper.className = 'mcq-link-wrapper';

          const dropdownId = `subdrop-${key}-${cardIdx}-${linkIdx}`;

          const a = document.createElement('span');
          a.className = 'mcq-link has-sublinks';
          a.innerHTML = `${link.label} <span class="badge">${link.badge}</span>`;
          a.onclick = (e) => { e.stopPropagation(); toggleSubDropdown(dropdownId); };
          wrapper.appendChild(a);

          const dropdown = document.createElement('div');
          dropdown.className = 'sub-dropdown';
          dropdown.id = dropdownId;

          link.sublinks.forEach(sub => {
            const opt = document.createElement('div');
            opt.className = 'sub-dropdown-option';
            opt.innerHTML = `${sub.label} <span class="badge">${sub.badge}</span>`;
            opt.onclick = (e) => { e.stopPropagation(); location.href = sub.href; };
            dropdown.appendChild(opt);
          });

          wrapper.appendChild(dropdown);
          linksContainer.appendChild(wrapper);
        } else {
          const a = document.createElement('span');
          a.className = 'mcq-link';
          a.innerHTML = `${link.label} <span class="badge">${link.badge}</span>`;
          a.onclick = () => location.href = link.href;
          linksContainer.appendChild(a);
        }
      });

      cardEl.appendChild(linksContainer);
      grid.appendChild(cardEl);
    });

    sectionEl.appendChild(grid);
    container.appendChild(sectionEl);
  });
}

/* ===== SUB-DROPDOWN (Theory/Practice year-exam popover) ===== */
function toggleSubDropdown(id) {
  const dropdown = document.getElementById(id);
  if (!dropdown) return;
  const isOpen = dropdown.classList.contains('open');

  document.querySelectorAll('.sub-dropdown.open').forEach(el => {
    el.classList.remove('open');
    const trigger = el.previousElementSibling;
    if (trigger) trigger.classList.remove('active');
  });

  if (!isOpen) {
    dropdown.classList.add('open');
    const trigger = dropdown.previousElementSibling;
    if (trigger) trigger.classList.add('active');
  }
}

function closeAllSubDropdowns() {
  document.querySelectorAll('.sub-dropdown.open').forEach(el => {
    el.classList.remove('open');
    const trigger = el.previousElementSibling;
    if (trigger) trigger.classList.remove('active');
  });
}

/* ===== FILTER DROPDOWN ===== */
function setFilter(filterType) {
  localStorage.setItem('medq_filter', filterType);

  document.querySelectorAll('.filter-option').forEach(el => el.classList.remove('active'));
  document.getElementById('filter-' + filterType).classList.add('active');

  document.getElementById('filter-dropdown').classList.remove('open');
  document.getElementById('filter-btn').classList.remove('dropdown-open');

  renderView(filterType);
}

function toggleFilterDropdown() {
  const dropdown = document.getElementById('filter-dropdown');
  const btn = document.getElementById('filter-btn');
  const isOpen = dropdown.classList.contains('open');
  if (isOpen) {
    dropdown.classList.remove('open');
    btn.classList.remove('dropdown-open');
  } else {
    document.getElementById('settings-dropdown').classList.remove('open');
    document.getElementById('settings-btn').classList.remove('dropdown-open');
    closeAllSubDropdowns();
    dropdown.classList.add('open');
    btn.classList.add('dropdown-open');
  }
}

/* ===== GLOBAL CLICK OUTSIDE ===== */
document.addEventListener('click', function(e) {
  const settingsWrapper = document.querySelector('.settings-dropdown-wrapper');
  if (settingsWrapper && !settingsWrapper.contains(e.target)) {
    closeSettingsDropdown();
  }

  const filterWrapper = document.querySelector('.filter-dropdown-wrapper');
  if (filterWrapper && !filterWrapper.contains(e.target)) {
    document.getElementById('filter-dropdown').classList.remove('open');
    document.getElementById('filter-btn').classList.remove('dropdown-open');
  }

  document.querySelectorAll('.sub-dropdown.open').forEach(dropdown => {
    const wrapper = dropdown.closest('.mcq-link-wrapper');
    if (wrapper && !wrapper.contains(e.target)) {
      dropdown.classList.remove('open');
      const trigger = dropdown.previousElementSibling;
      if (trigger) trigger.classList.remove('active');
    }
  });
});

/* ===== INIT ===== */
window.onload = function() {
  document.documentElement.classList.remove('light-mode-pre');

  // Restore theme
  const savedTheme = localStorage.getItem('medq_theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    updateSettingsThemeUI(true);
  } else {
    updateSettingsThemeUI(false);
  }

  // Restore profile
  restoreProfile();

  // Restore filter and render the view
  const savedFilter = localStorage.getItem('medq_filter') || 'both';
  if (savedFilter !== 'both') {
    const optionEl = document.getElementById('filter-' + savedFilter);
    if (optionEl) {
      document.querySelectorAll('.filter-option').forEach(el => el.classList.remove('active'));
      optionEl.classList.add('active');
    }
  }
  renderView(savedFilter);
};
