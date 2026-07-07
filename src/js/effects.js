// Scroll reveal + typewriter badge

export function initScrollReveal() {
    // Two thresholds create hysteresis: reveal at 25% visible, reset only
    // when fully out of view — so re-scrolling replays without flicker.
    const scrollRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.intersectionRatio >= 0.25) {
                entry.target.classList.add('revealed');
            } else if (!entry.isIntersecting) {
                entry.target.classList.remove('revealed');
            }
        });
    }, { threshold: [0, 0.25] });

    const revealTargets = document.querySelectorAll(
        '.about-section .glass-card, .projects-section .project-card, .section-title-wrap, .certificate-item, .experience-card'
    );
    revealTargets.forEach(el => {
        el.classList.add('scroll-reveal');
        // Stagger siblings within the same parent (applied on reveal only, see CSS).
        // Capped so large grids never leave late items blank while scrolling.
        const siblings = [...el.parentElement.children].filter(c => c.classList.contains('scroll-reveal'));
        const idx = siblings.indexOf(el);
        if (idx > 0) el.style.setProperty('--reveal-delay', `${Math.min(idx, 4) * 0.06}s`);
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
