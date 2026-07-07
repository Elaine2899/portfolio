// Mobile navigation toggle + scroll spy
import { safeCreateIcons } from './icons.js';

export function initMobileNav() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    if (!mobileNavToggle || !navLinksContainer) return;

    mobileNavToggle.setAttribute('aria-expanded', 'false');
    navLinksContainer.setAttribute('aria-hidden', 'true');

    function closeNav() {
        navLinksContainer.classList.remove('mobile-active');
        mobileNavToggle.setAttribute('aria-expanded', 'false');
        navLinksContainer.setAttribute('aria-hidden', 'true');

        const icon = mobileNavToggle.querySelector('i');
        if (icon) {
            icon.setAttribute('data-lucide', 'menu');
            safeCreateIcons();
        }
    }

    mobileNavToggle.addEventListener('click', () => {
        const isExpanded = navLinksContainer.classList.toggle('mobile-active');

        mobileNavToggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
        navLinksContainer.setAttribute('aria-hidden', isExpanded ? 'false' : 'true');

        const icon = mobileNavToggle.querySelector('i');
        icon.setAttribute('data-lucide', isExpanded ? 'x' : 'menu');
        safeCreateIcons();
    });

    // Close mobile nav when clicking a link
    navLinksContainer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeNav);
    });

    // Close mobile nav when clicking outside of the menu or toggle button
    document.addEventListener('click', (e) => {
        if (navLinksContainer.classList.contains('mobile-active') &&
            !navLinksContainer.contains(e.target) &&
            !mobileNavToggle.contains(e.target)) {
            closeNav();
        }
    });
}

export function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    const toggle = () => {
        btn.classList.toggle('visible', window.scrollY > 600);
    };

    window.addEventListener('scroll', toggle, { passive: true });
    toggle();

    btn.addEventListener('click', () => {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    });
}

export function initScrollSpy() {
    const sections = document.querySelectorAll('.scroll-section, .hero-section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const currentSectionId = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if ((href === '#' && !currentSectionId) || href === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        });
    }, {
        root: null,
        rootMargin: '-30% 0px -50% 0px', // Center-weighted viewport detection
        threshold: 0
    });

    sections.forEach(section => observer.observe(section));
}
