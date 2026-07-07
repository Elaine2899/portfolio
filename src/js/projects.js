// Project filtering + collapsible mini-projects grid
import { safeCreateIcons } from './icons.js';

export function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const miniProjectsGrid = document.querySelector('.mini-projects-grid');
    const toggleBtn = document.getElementById('toggle-mini-projects');
    const subsectionTitles = document.querySelectorAll('.projects-subsection-title');
    const toggleContainer = document.querySelector('.toggle-projects-container');
    const projectsSection = document.getElementById('projects');

    // Toggle button click handler for mini projects
    if (toggleBtn && miniProjectsGrid) {
        toggleBtn.addEventListener('click', () => {
            const isExpanded = miniProjectsGrid.classList.toggle('expanded');
            toggleBtn.classList.toggle('active');

            const btnText = toggleBtn.querySelector('span');
            const btnIcon = toggleBtn.querySelector('i');

            if (isExpanded) {
                // Dynamically calculate scrollHeight for transition height
                miniProjectsGrid.style.maxHeight = miniProjectsGrid.scrollHeight + 'px';
                if (btnText) btnText.textContent = '收合小型專案 / Show Less';
                if (btnIcon) btnIcon.setAttribute('data-lucide', 'chevron-up');
            } else {
                miniProjectsGrid.style.maxHeight = '0';
                if (btnText) btnText.textContent = '展開更多專案 / Show More';
                if (btnIcon) btnIcon.setAttribute('data-lucide', 'chevron-down');
                // Scroll back to projects section top so user doesn't get lost
                if (projectsSection) {
                    projectsSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
            safeCreateIcons();
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
                        const btnIcon = toggleBtn.querySelector('i');
                        if (btnText) btnText.textContent = '展開更多專案 / Show More';
                        if (btnIcon) btnIcon.setAttribute('data-lucide', 'chevron-down');
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
}
