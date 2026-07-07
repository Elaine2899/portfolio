// Project filtering + collapsible mini-projects grid
import { safeCreateIcons } from './icons.js';
import { t } from './i18n.js';

export function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const miniProjectsGrid = document.querySelector('.mini-projects-grid');
    const toggleBtn = document.getElementById('toggle-mini-projects');
    const subsectionTitles = document.querySelectorAll('.projects-subsection-title');
    const toggleContainer = document.querySelector('.toggle-projects-container');
    const projectsSection = document.getElementById('projects');

    const inlineToggle = document.getElementById('mini-toggle-inline');

    // Shared expand/collapse for the bottom button and the inline title button
    function setMiniExpanded(isExpanded, scrollBack) {
        if (!miniProjectsGrid) return;
        miniProjectsGrid.classList.toggle('expanded', isExpanded);

        if (toggleBtn) {
            // Chevron direction is handled by CSS (.active rotates the svg)
            toggleBtn.classList.toggle('active', isExpanded);
            const btnText = toggleBtn.querySelector('span');
            if (btnText) btnText.textContent = isExpanded ? t('p.less') : t('p.more');
        }

        if (inlineToggle) {
            inlineToggle.setAttribute('aria-expanded', String(isExpanded));
            inlineToggle.classList.toggle('open', isExpanded);
        }

        if (isExpanded) {
            // Dynamically calculate scrollHeight for transition height
            miniProjectsGrid.style.maxHeight = miniProjectsGrid.scrollHeight + 'px';
        } else {
            miniProjectsGrid.style.maxHeight = '0';
            // Scroll back to projects section top so user doesn't get lost
            if (scrollBack && projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
        safeCreateIcons();
    }

    if (toggleBtn && miniProjectsGrid) {
        toggleBtn.addEventListener('click', () => {
            setMiniExpanded(!miniProjectsGrid.classList.contains('expanded'), true);
        });
    }
    if (inlineToggle && miniProjectsGrid) {
        inlineToggle.addEventListener('click', () => {
            // No scroll jump when collapsing from the title row — user is already there
            setMiniExpanded(!miniProjectsGrid.classList.contains('expanded'), false);
        });
    }

    // Initialize ARIA attributes for filter buttons
    filterButtons.forEach(btn => {
        btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false');
    });

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');

            const filterValue = btn.getAttribute('data-filter');

            // Handle subsection headers, toggle button and grid heights based on filter
            if (filterValue !== 'all') {
                if (projectsSection) projectsSection.classList.add('is-filtered');
                // Viewing a specific category: hide subheaders & toggle, auto expand mini grid
                subsectionTitles.forEach(t => t.style.display = 'none');
                if (toggleContainer) toggleContainer.style.display = 'none';
                if (miniProjectsGrid) {
                    miniProjectsGrid.style.maxHeight = 'none';
                    miniProjectsGrid.style.opacity = '1';
                    miniProjectsGrid.style.overflow = 'visible';
                }
            } else {
                if (projectsSection) projectsSection.classList.remove('is-filtered');
                // Viewing all: restore headings, toggle button, and collapse mini grid
                subsectionTitles.forEach(t => t.style.display = 'flex');
                if (toggleContainer) toggleContainer.style.display = 'flex';

                if (miniProjectsGrid) {
                    // Reset grid height/opacity back to CSS rules (collapsed by default)
                    miniProjectsGrid.style.maxHeight = '';
                    miniProjectsGrid.style.opacity = '';
                    miniProjectsGrid.style.overflow = '';

                    miniProjectsGrid.classList.remove('expanded');
                    if (toggleBtn) {
                        toggleBtn.classList.remove('active');
                        const btnText = toggleBtn.querySelector('span');
                        if (btnText) btnText.textContent = t('p.more');
                    }
                    if (inlineToggle) {
                        inlineToggle.setAttribute('aria-expanded', 'false');
                        inlineToggle.classList.remove('open');
                    }
                }
            }

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                // Reset card display animations
                card.style.display = 'none';
                card.style.animation = 'none';

                if (filterValue === 'all' || category === filterValue) {
                    // Trigger reflow to restart animation
                    void card.offsetWidth;
                    card.style.display = 'flex';
                    card.style.animation = 'scaleIn 0.4s ease forwards';
                }
            });

            safeCreateIcons();
        });
    });

    // Refresh the (JS-owned) toggle button label on language change,
    // and once at init (initI18n may have applied EN before this ran)
    function refreshToggleLabel() {
        if (!toggleBtn) return;
        const btnText = toggleBtn.querySelector('span');
        if (!btnText) return;
        const isExpanded = miniProjectsGrid && miniProjectsGrid.classList.contains('expanded');
        btnText.textContent = isExpanded ? t('p.less') : t('p.more');
    }
    window.addEventListener('langchange', refreshToggleLabel);
    refreshToggleLabel();
}
