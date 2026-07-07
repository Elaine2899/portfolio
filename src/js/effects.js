// Scroll reveal + typewriter badge

export function initScrollReveal() {
    const scrollRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                scrollRevealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    const revealTargets = document.querySelectorAll(
        '.about-section .glass-card, .projects-section .project-card, .section-title-wrap, .cert-item, .experience-card'
    );
    revealTargets.forEach(el => {
        el.classList.add('scroll-reveal');
        // Stagger siblings within the same parent
        const siblings = [...el.parentElement.children].filter(c => c.classList.contains('scroll-reveal'));
        const idx = siblings.indexOf(el);
        if (idx > 0) el.style.transitionDelay = `${idx * 0.12}s`;
        scrollRevealObserver.observe(el);
    });
}

export function initTypewriter() {
    const badgeSpan = document.querySelector('.badge-accent span');
    if (!badgeSpan) return;

    const fullText = badgeSpan.textContent.trim();
    badgeSpan.textContent = '';

    const cursor = document.createElement('span');
    cursor.className = 'tw-cursor';
    badgeSpan.parentElement.appendChild(cursor);

    let charIdx = 0;
    function typeNext() {
        if (charIdx < fullText.length) {
            badgeSpan.textContent += fullText[charIdx++];
            setTimeout(typeNext, 45);
        } else {
            setTimeout(() => cursor.remove(), 1500);
        }
    }
    setTimeout(typeNext, 200);
}
