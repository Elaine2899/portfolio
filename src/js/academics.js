// Academic console tabs + progress bar animation

function animateProgressBars(container) {
    if (!container) return;
    container.querySelectorAll('.grade-progress-fill').forEach(fill => {
        const targetWidth = fill.style.width || '0%';
        fill.style.width = '0';
        setTimeout(() => {
            fill.style.width = targetWidth;
        }, 50);
    });
}

export function initConsoleTabs() {
    const consoleTabs = document.querySelectorAll('.console-tab-btn');
    const consoleContents = document.querySelectorAll('.console-tab-content');

    if (consoleTabs.length === 0 || consoleContents.length === 0) return;

    // Initialize tab accessibility roles and attributes
    consoleTabs.forEach(tab => {
        tab.setAttribute('role', 'tab');
        tab.setAttribute('aria-selected', tab.classList.contains('active') ? 'true' : 'false');
    });
    consoleContents.forEach(content => {
        content.setAttribute('role', 'tabpanel');
        content.style.display = content.classList.contains('active') ? 'flex' : 'none';
    });

    // Trigger initial animation for progress bars in the active tab
    setTimeout(() => {
        animateProgressBars(document.querySelector('.console-tab-content.active'));
    }, 300);

    consoleTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');

            consoleTabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            consoleContents.forEach(content => {
                content.classList.remove('active');
                content.style.display = 'none';
            });

            // Show selected tab content using double rAF to trigger CSS transition smoothly
            const activeContent = document.getElementById(`tab-${targetTab}`);
            if (activeContent) {
                activeContent.style.display = 'flex';
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        activeContent.classList.add('active');
                        animateProgressBars(activeContent);
                    });
                });
            }
        });
    });
}
