// Project details modal + certificate lightbox + global keyboard handlers
import { safeCreateIcons } from './icons.js';
import { getLang, t } from './i18n.js';

let lastActiveElement = null;

/* ---------- Project details (loaded from JSON for maintainability) ---------- */

const projectDataCache = { zh: null, en: null };

async function loadProjectData(lang) {
    if (!projectDataCache[lang]) {
        const file = lang === 'en' ? 'assets/projects-data.en.json' : 'assets/projects-data.json';
        try {
            const response = await fetch(file);
            projectDataCache[lang] = await response.json();
        } catch (error) {
            console.error('Error loading project details from JSON:', error);
            projectDataCache[lang] = {};
        }
    }
    return projectDataCache[lang];
}

export async function getProjectDetails(projectId) {
    const data = await loadProjectData(getLang());
    if (data[projectId]) return data[projectId];
    // Not yet translated: fall back to the zh source
    if (getLang() !== 'zh') {
        const zh = await loadProjectData('zh');
        return zh[projectId] || null;
    }
    return null;
}

// Dynamic HTML renderer for structured project details data
// (also used by the standalone case-study pages, which suppress the case link)
export function renderProjectHtml(project, { withCaseLink = true } = {}) {
    if (!project) return '';

    let html = `
        <h2 class="modal-project-title">${project.title}</h2>
        <div class="modal-project-tech">${t('m.tech')}${project.tech}</div>
    `;

    if (withCaseLink && project.caseUrl) {
        html += `<a class="case-study-link" href="${project.caseUrl}">
            <i data-lucide="book-open" class="icon-sm"></i>
            <span>${t('m.case')}</span>
            <i data-lucide="arrow-right" class="icon-sm"></i>
        </a>`;
    }

    if (project.nature) {
        html += `<p><strong>${t('m.nature')}</strong>${project.nature}</p>`;
    }
    if (project.intro) {
        html += `<p>${project.intro}</p>`;
    }

    (project.sections || []).forEach(section => {
        if (section.heading) html += `<h3>${section.heading}</h3>`;
        if (section.intro) html += `<p>${section.intro}</p>`;
        (section.images || []).forEach(img => {
            const dimAttrs = img.width && img.height ? ` width="${img.width}" height="${img.height}"` : '';
            html += `<figure class="modal-figure${img.narrow ? ' modal-figure-narrow' : ''}">
                <img src="${img.src}" alt="${img.alt || ''}"${dimAttrs} loading="lazy">
                ${img.caption ? `<figcaption>${img.caption}</figcaption>` : ''}
            </figure>`;
        });
        if (section.bullets && section.bullets.length > 0) {
            html += `<ul>${section.bullets.map(b => `<li>${b}</li>`).join('')}</ul>`;
        }
        if (section.code) {
            html += `<pre><code>${section.code}</code></pre>`;
        }
        (section.subsections || []).forEach(sub => {
            if (sub.title) html += `<h4>${sub.title}</h4>`;
            if (sub.bullets && sub.bullets.length > 0) {
                html += `<ul>${sub.bullets.map(b => `<li>${b}</li>`).join('')}</ul>`;
            }
        });
    });

    return html;
}

/* ---------- Project modal controller ---------- */

let closeProjectModal = () => {};
let closeCertModal = () => {};

export function initProjectModal() {
    const projectModal = document.getElementById('project-modal');
    const modalBodyContent = projectModal ? projectModal.querySelector('.modal-body-content') : null;
    const modalCloseBtn = projectModal ? projectModal.querySelector('.modal-close') : null;
    const openModalButtons = document.querySelectorAll('.open-project-modal');

    async function openProjectModal(projectId) {
        if (!projectModal || !modalBodyContent) return;

        lastActiveElement = document.activeElement;

        // Immediately set loading placeholder and display the modal overlay
        modalBodyContent.innerHTML = `
            <div class="modal-loading">
                <div class="loader-spinner"></div>
                <p>${t('m.loading')}</p>
            </div>
        `;
        projectModal.classList.add('active');
        modalBodyContent.scrollTop = 0; // Reset scroll left over from a previously opened project
        document.body.style.overflow = 'hidden'; // Disable background scrolling

        // Set focus inside the modal close button for accessibility
        if (modalCloseBtn) {
            setTimeout(() => modalCloseBtn.focus(), 50);
        }

        try {
            const projectData = await getProjectDetails(projectId);
            if (projectData) {
                modalBodyContent.innerHTML = renderProjectHtml(projectData);
                modalBodyContent.scrollTop = 0;
                safeCreateIcons();
            } else {
                modalBodyContent.innerHTML = `<p style="text-align:center;padding:40px;color:var(--accent-gold);">${t('m.missing')}</p>`;
            }
        } catch (error) {
            console.error('Error loading project details:', error);
            modalBodyContent.innerHTML = `<p style="text-align:center;padding:40px;color:var(--accent-gold);">${t('m.error')}</p>`;
        }
    }

    closeProjectModal = function () {
        if (!projectModal || !projectModal.classList.contains('active')) return;
        projectModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        if (lastActiveElement) lastActiveElement.focus();
    };

    openModalButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            if (projectId) openProjectModal(projectId);
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeProjectModal);
    }

    // Close project modal clicking outside container
    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) closeProjectModal();
        });
    }
}

/* ---------- Certificate lightbox controller ---------- */

export function initCertModal() {
    const certModal = document.getElementById('cert-modal');
    const certModalTitle = document.getElementById('cert-modal-title');
    const certModalImg = document.getElementById('cert-modal-img');
    const certModalPdfLink = document.getElementById('cert-modal-pdf-link');
    const certModalClose = certModal ? certModal.querySelector('.cert-modal-close') : null;
    const certItems = document.querySelectorAll('.open-cert-viewer');

    function openCertModal(title, imgSrc, pdfSrc) {
        if (!certModal || !certModalImg || !certModalTitle) return;

        lastActiveElement = document.activeElement;

        certModalTitle.textContent = title;
        certModalImg.src = imgSrc;

        if (pdfSrc) {
            certModalPdfLink.href = pdfSrc;
            certModalPdfLink.style.display = 'inline-flex';
        } else {
            certModalPdfLink.style.display = 'none';
        }

        certModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        if (certModalClose) {
            setTimeout(() => certModalClose.focus(), 50);
        }
    }

    closeCertModal = function () {
        if (!certModal || !certModal.classList.contains('active')) return;
        certModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        if (lastActiveElement) lastActiveElement.focus();
    };

    certItems.forEach(item => {
        item.addEventListener('click', () => {
            // Prefer the card's h4 text — it reflects the current language
            const title = item.querySelector('.cert-info h4')?.textContent
                || item.getAttribute('data-cert-title');
            const imgSrc = item.getAttribute('data-cert-img');
            const pdfSrc = item.getAttribute('data-cert-pdf');

            // Only link the PDF when it exists and is not just a copy of the image path
            const hasValidPdf = pdfSrc && pdfSrc.toLowerCase().endsWith('.pdf') && pdfSrc !== imgSrc;
            openCertModal(title, imgSrc, hasValidPdf ? pdfSrc : null);
        });
    });

    if (certModalClose) {
        certModalClose.addEventListener('click', closeCertModal);
    }

    if (certModal) {
        certModal.addEventListener('click', (e) => {
            if (e.target === certModal) closeCertModal();
        });
    }
}

/* ---------- Global keyboard handlers (ESC + focus trap) ---------- */

export function initModalKeyboard() {
    document.addEventListener('keydown', (e) => {
        const activeModal = document.querySelector('.modal-overlay.active');

        if (e.key === 'Escape' && activeModal) {
            if (activeModal.id === 'project-modal') closeProjectModal();
            if (activeModal.id === 'cert-modal') closeCertModal();
        }

        if (e.key === 'Tab' && activeModal) {
            const focusables = activeModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (focusables.length === 0) return;

            const first = focusables[0];
            const last = focusables[focusables.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === first) {
                    last.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === last) {
                    first.focus();
                    e.preventDefault();
                }
            }
        }
    });
}
