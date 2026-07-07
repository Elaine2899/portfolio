// Entry point: 曾芸儀 Yun-Yi Zeng | AI Developer Portfolio

// Styles (bundled by Vite, in cascade order)
import './styles/base.css';
import './styles/header.css';
import './styles/hero.css';
import './styles/robot.css';
import './styles/about.css';
import './styles/academics.css';
import './styles/projects.css';
import './styles/certificates.css';
import './styles/cta-footer.css';
import './styles/modals.css';
import './styles/responsive.css';
import './styles/animations.css';

import { safeCreateIcons } from './js/icons.js';
import { initMobileNav, initScrollSpy, initBackToTop } from './js/nav.js';
import { initConsoleTabs } from './js/academics.js';
import { initProjectFilters } from './js/projects.js';
import { initProjectModal, initCertModal, initModalKeyboard } from './js/modals.js';
import { initScrollReveal, initTypewriter } from './js/effects.js';
import { initRobot } from './js/robot.js';

document.addEventListener('DOMContentLoaded', () => {
    safeCreateIcons();
    initMobileNav();
    initScrollSpy();
    initBackToTop();
    initConsoleTabs();
    initProjectFilters();
    initProjectModal();
    initCertModal();
    initModalKeyboard();
    initScrollReveal();
    initTypewriter();
    initRobot();
});
