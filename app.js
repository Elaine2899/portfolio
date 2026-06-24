// Application logic: 曾芸儀 Yun-Yi Tseng | AI Developer Portfolio

document.addEventListener('DOMContentLoaded', () => {
    
    let lastActiveElement = null;

    // Helper to safely initialize Lucide icons with CDN fallback safeguard
    function safeCreateIcons() {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        } else {
            console.warn('Lucide icon library is not defined (CDN offline or blocked).');
        }
    }

    // 1. Initialize Lucide Icons
    safeCreateIcons();

    // 2. Mobile Navigation Menu Toggle & Keyboard a11y
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (mobileNavToggle && navLinksContainer) {
        // Set initial values
        mobileNavToggle.setAttribute('aria-expanded', 'false');
        navLinksContainer.setAttribute('aria-hidden', 'true');

        mobileNavToggle.addEventListener('click', () => {
            const isExpanded = navLinksContainer.classList.toggle('mobile-active');
            
            // Update aria accessibility attributes
            mobileNavToggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
            navLinksContainer.setAttribute('aria-hidden', isExpanded ? 'false' : 'true');
            
            // Toggle icon menu / x
            const icon = mobileNavToggle.querySelector('i');
            if (isExpanded) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            safeCreateIcons();
        });

        // Close mobile nav when clicking a link
        const links = navLinksContainer.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('mobile-active');
                mobileNavToggle.setAttribute('aria-expanded', 'false');
                navLinksContainer.setAttribute('aria-hidden', 'true');
                
                const icon = mobileNavToggle.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                safeCreateIcons();
            });
        });

        // Close mobile nav when clicking outside of the menu or toggle button
        document.addEventListener('click', (e) => {
            if (navLinksContainer.classList.contains('mobile-active') &&
                !navLinksContainer.contains(e.target) &&
                !mobileNavToggle.contains(e.target)) {
                
                navLinksContainer.classList.remove('mobile-active');
                mobileNavToggle.setAttribute('aria-expanded', 'false');
                navLinksContainer.setAttribute('aria-hidden', 'true');
                
                const icon = mobileNavToggle.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-lucide', 'menu');
                    safeCreateIcons();
                }
            }
        });
    }

    // 2.5 Academic Console Tabs Toggle & ARIA Accessibility (With smooth render painting fix)
    const consoleTabs = document.querySelectorAll('.console-tab-btn');
    const consoleContents = document.querySelectorAll('.console-tab-content');

    if (consoleTabs.length > 0 && consoleContents.length > 0) {
        // Initialize tab accessibility roles and attributes
        consoleTabs.forEach(tab => {
            tab.setAttribute('role', 'tab');
            tab.setAttribute('aria-selected', tab.classList.contains('active') ? 'true' : 'false');
        });
        consoleContents.forEach(content => {
            content.setAttribute('role', 'tabpanel');
            // Hide elements that are not active by default
            if (!content.classList.contains('active')) {
                content.style.display = 'none';
            } else {
                content.style.display = 'flex';
            }
        });

        // Trigger initial animation for progress bars in the active tab
        setTimeout(() => {
            const activeTabContent = document.querySelector('.console-tab-content.active');
            if (activeTabContent) {
                animateProgressBars(activeTabContent);
            }
        }, 300);

        consoleTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.getAttribute('data-tab');

                // Remove active class and set aria-selected false
                consoleTabs.forEach(t => {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                });
                // Add active class and set aria-selected true
                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');

                // Hide all tab contents with transition compatibility
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

        // Helper to animate progress bar widths when tab becomes active
        function animateProgressBars(container) {
            if (!container) return;
            const progressFills = container.querySelectorAll('.grade-progress-fill');
            progressFills.forEach(fill => {
                const targetWidth = fill.style.width || '0%';
                fill.style.width = '0';
                setTimeout(() => {
                    fill.style.width = targetWidth;
                }, 50);
            });
        }
    }

    // 3. Scroll Spy (IntersectionObserver for high performance, avoiding layout thrashing)
    const sections = document.querySelectorAll('.scroll-section, .hero-section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -50% 0px', // Center-weighted viewport detection
        threshold: 0
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentSectionId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    const href = link.getAttribute('href');
                    if (href === '#' && !currentSectionId) {
                        link.classList.add('active');
                    } else if (href === `#${currentSectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));

    // 4. Project Filtering Logic & Collapsible Grid Integration
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
            // Remove active class and set aria-pressed false
            filterButtons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            // Add active class and set aria-pressed true
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');

            const filterValue = btn.getAttribute('data-filter');

            // Handle subsection headers, toggle button and grid heights based on filter
            if (filterValue !== 'all') {
                if (projectsSection) {
                    projectsSection.classList.add('is-filtered');
                }
                // If viewing specific category, hide subheaders & toggle button, auto expand mini grid
                subsectionTitles.forEach(t => t.style.display = 'none');
                if (toggleContainer) toggleContainer.style.display = 'none';
                if (miniProjectsGrid) {
                    miniProjectsGrid.style.maxHeight = 'none';
                    miniProjectsGrid.style.opacity = '1';
                    miniProjectsGrid.style.overflow = 'visible';
                }
            } else {
                if (projectsSection) {
                    projectsSection.classList.remove('is-filtered');
                }
                // If viewing all, restore headings, toggle button, and collapse mini grid
                subsectionTitles.forEach(t => t.style.display = 'flex');
                if (toggleContainer) toggleContainer.style.display = 'flex';
                
                if (miniProjectsGrid) {
                    // Reset grid height/opacity back to CSS rules (collapsed by default)
                    miniProjectsGrid.style.maxHeight = '';
                    miniProjectsGrid.style.opacity = '';
                    miniProjectsGrid.style.overflow = '';
                    
                    // Reset button states
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

    // 5. Rich Projects Details Database (Loaded dynamically from JSON for maintainability)
    let projectDetailsData = null;

    async function getProjectDetails(projectId) {
        if (!projectDetailsData) {
            try {
                const response = await fetch('assets/projects-data.json');
                projectDetailsData = await response.json();
            } catch (error) {
                console.error('Error loading project details from JSON:', error);
                projectDetailsData = {};
            }
        }
        return projectDetailsData[projectId] || null;
    }

    // Dynamic HTML renderer for structured project details data
    function renderProjectHtml(project) {
        if (!project) return '';

        let html = `
            <h2 class="modal-project-title">${project.title}</h2>
            <div class="modal-project-tech">技術棧：${project.tech}</div>
        `;

        if (project.nature) {
            html += `<p><strong>專案性質：</strong>${project.nature}</p>`;
        }

        if (project.intro) {
            html += `<p>${project.intro}</p>`;
        }

        if (project.sections && project.sections.length > 0) {
            project.sections.forEach(section => {
                if (section.heading) {
                    html += `<h3>${section.heading}</h3>`;
                }
                if (section.intro) {
                    html += `<p>${section.intro}</p>`;
                }
                if (section.bullets && section.bullets.length > 0) {
                    html += `<ul>`;
                    section.bullets.forEach(bullet => {
                        html += `<li>${bullet}</li>`;
                    });
                    html += `</ul>`;
                }
                if (section.code) {
                    html += `<pre><code>${section.code}</code></pre>`;
                }
                if (section.subsections && section.subsections.length > 0) {
                    section.subsections.forEach(sub => {
                        if (sub.title) {
                            html += `<h4>${sub.title}</h4>`;
                        }
                        if (sub.bullets && sub.bullets.length > 0) {
                            html += `<ul>`;
                            sub.bullets.forEach(bullet => {
                                html += `<li>${bullet}</li>`;
                            });
                            html += `</ul>`;
                        }
                    });
                }
            });
        }

        return html;
    }

    // 6. Project Modal Controller & Accessibility
    const projectModal = document.getElementById('project-modal');
    const modalBodyContent = projectModal ? projectModal.querySelector('.modal-body-content') : null;
    const modalCloseBtn = projectModal ? projectModal.querySelector('.modal-close') : null;
    const openModalButtons = document.querySelectorAll('.open-project-modal');

    async function openProjectModal(projectId) {
        if (!projectModal || !modalBodyContent) return;

        // Save last active element for focus restoration
        lastActiveElement = document.activeElement;

        // Immediately set loading placeholder and display the modal overlay
        modalBodyContent.innerHTML = `
            <div class="modal-loading">
                <div class="loader-spinner"></div>
                <p>正在載入技術細節...</p>
            </div>
        `;
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Disable background scrolling
        
        // Set focus inside the modal close button for accessibility
        const closeBtn = projectModal.querySelector('.modal-close');
        if (closeBtn) {
            setTimeout(() => closeBtn.focus(), 50);
        }

        try {
            // Asynchronously fetch JSON details
            const projectData = await getProjectDetails(projectId);
            if (projectData) {
                // Populate content and refresh Lucide icons
                modalBodyContent.innerHTML = renderProjectHtml(projectData);
                safeCreateIcons();
            } else {
                modalBodyContent.innerHTML = `<p style="text-align:center;padding:40px;color:var(--accent-gold);">抱歉，無法載入該專案的技術細節。</p>`;
            }
        } catch (error) {
            console.error('Error loading project details:', error);
            modalBodyContent.innerHTML = `<p style="text-align:center;padding:40px;color:var(--accent-gold);">載入時發生錯誤，請稍後再試。</p>`;
        }
    }

    function closeProjectModal() {
        if (!projectModal || !projectModal.classList.contains('active')) return;
        projectModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Enable scrolling
        
        // Restore focus
        if (lastActiveElement) {
            lastActiveElement.focus();
        }
    }

    openModalButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const projectId = btn.getAttribute('data-project');
            if (projectId) {
                openProjectModal(projectId);
            }
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeProjectModal);
    }

    // Close project modal clicking outside container
    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                closeProjectModal();
            }
        });
    }

    // 7. Certificate Lightbox Modal Controller
    const certModal = document.getElementById('cert-modal');
    const certModalTitle = document.getElementById('cert-modal-title');
    const certModalImg = document.getElementById('cert-modal-img');
    const certModalPdfLink = document.getElementById('cert-modal-pdf-link');
    const certModalClose = certModal ? certModal.querySelector('.cert-modal-close') : null;
    const certItems = document.querySelectorAll('.open-cert-viewer');

    function openCertModal(title, imgSrc, pdfSrc) {
        if (!certModal || !certModalImg || !certModalTitle) return;

        // Save last active element
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

        // Set focus inside modal
        if (certModalClose) {
            setTimeout(() => certModalClose.focus(), 50);
        }
    }

    function closeCertModal() {
        if (!certModal || !certModal.classList.contains('active')) return;
        certModal.classList.remove('active');
        document.body.style.overflow = 'auto';

        // Restore focus
        if (lastActiveElement) {
            lastActiveElement.focus();
        }
    }

    certItems.forEach(item => {
        item.addEventListener('click', () => {
            const title = item.getAttribute('data-cert-title');
            const imgSrc = item.getAttribute('data-cert-img');
            const pdfSrc = item.getAttribute('data-cert-pdf');
            
            // Clean logic: check if pdf exists and is not just a copy of the image path
            const hasValidPdf = pdfSrc && pdfSrc.toLowerCase().endsWith('.pdf') && pdfSrc !== imgSrc;
            openCertModal(title, imgSrc, hasValidPdf ? pdfSrc : null);
        });
    });

    if (certModalClose) {
        certModalClose.addEventListener('click', closeCertModal);
    }

    // Close certificate modal clicking outside container
    if (certModal) {
        certModal.addEventListener('click', (e) => {
            if (e.target === certModal) {
                closeCertModal();
            }
        });
    }

    // 8. Global Keyboard Modal Handlers (Focus trap & ESC key)
    document.addEventListener('keydown', (e) => {
        const activeModal = document.querySelector('.modal-overlay.active');
        
        if (e.key === 'Escape') {
            if (activeModal) {
                if (activeModal.id === 'project-modal') closeProjectModal();
                if (activeModal.id === 'cert-modal') closeCertModal();
            }
        }
        
        if (e.key === 'Tab' && activeModal) {
            // Find all focusable items inside the active modal
            const focusables = activeModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (focusables.length === 0) return;
            
            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            
            if (e.shiftKey) {
                // Shift + Tab: loop back to last item
                if (document.activeElement === first) {
                    last.focus();
                    e.preventDefault();
                }
            } else {
                // Tab: loop back to first item
                if (document.activeElement === last) {
                    first.focus();
                    e.preventDefault();
                }
            }
        }
    });

});
