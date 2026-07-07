// Entry point for standalone project case-study pages (functrl.html, prepagent.html)
// Skeleton phase: content is rendered from projects-data JSON (same source as the
// modal). Once the long-form case-study copy is written it will be inlined as
// static HTML here for SEO / no-JS readability.

import './styles/base.css';
import './styles/header.css';
import './styles/modals.css'; // reuses .modal-body-content article typography
import './styles/case.css';
import './styles/cta-footer.css';
import './styles/responsive.css';
import './styles/animations.css';

import { safeCreateIcons } from './js/icons.js';
import { initMobileNav, initBackToTop } from './js/nav.js';
import { initI18n, t } from './js/i18n.js';
import { getProjectDetails, renderProjectHtml } from './js/modals.js';

async function renderCase() {
    const container = document.getElementById('case-content');
    if (!container) return;

    const projectId = container.dataset.case;
    try {
        const project = await getProjectDetails(projectId);
        container.innerHTML = project
            ? renderProjectHtml(project, { withCaseLink: false })
            : `<p class="case-error">${t('m.missing')}</p>`;
    } catch (error) {
        console.error('Error rendering case study:', error);
        container.innerHTML = `<p class="case-error">${t('m.error')}</p>`;
    }
    safeCreateIcons();
}

document.addEventListener('DOMContentLoaded', () => {
    safeCreateIcons();
    initI18n();
    initMobileNav();
    initBackToTop();
    renderCase();
    // Re-render JSON-driven content when the language toggles
    window.addEventListener('langchange', renderCase);
});
