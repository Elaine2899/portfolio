// Bilingual toggle (zh-TW ⇄ en)
// zh is the source of truth in the HTML; EN below only holds replacements.
// Original zh innerHTML is cached per element on init, so switching back is lossless.

const EN = {
    // Nav
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.certs': 'Credentials',
    'nav.grades': 'Academics',
    'nav.cv': 'Résumé',

    // Hero
    'hero.title': 'I\'m <span class="gradient-text">Yun-Yi Zeng</span>',
    'hero.tagline': 'Hands-on AI developer with deep curiosity for emerging tech — specializing in RAG system architecture, time-series signal processing, rapid MVP delivery, and cross-functional communication.',
    'hero.desc': '"Resilient and independent in the face of adversity — I research proactively, build fast, and keep iterating in uncertain environments."',
    'hero.cta1': 'View My Projects',
    'hero.cta2': 'About Me',
    'hero.b1n': 'National #1',
    'hero.b1l': 'InnoServe AI Tools Track<br>Capstone project FunCtrl',
    'hero.b2l': 'NCU MIS class rank<br>Book Prize (Spring 2025)',
    'hero.b3n': 'Global #2',
    'hero.b3l': 'Kaggle real-estate forecasting<br>2nd of 777 teams',
    'hero.b4l': 'Generative AI, machine learning,<br>data science & web development',

    // Section titles & subtitles
    'sec.about': 'About Me',
    'sec.projects': 'Projects',
    'sec.certs': 'Credentials',
    'sec.grades': 'Academic Performance',
    'sec.feat': 'Featured Projects',
    'sec.mini': 'Coursework & Mini Projects',
    'sec.svc': 'Academic & Tech Service',
    'sub.about': 'Fast learner, high adaptability — skills forged in real projects',
    'sub.projects': 'Theory meets engineering to solve real-world problems',
    'sub.certs': 'Every claim is verifiable — click any card to view the official document',
    'sub.grades': 'Solid MIS & CS foundations with top grades in core courses',

    // About
    'about.h3': 'My Story & Traits',
    'about.p1': 'I\'ve lived independently since freshman year, handling my studies, finances, and daily life on my own. That built strong time management, resilience, and independent problem-solving. Under that pressure I still stayed near the top of my department, served as a teaching assistant, and led a team to a national championship.',
    'about.p2': 'In teams I act as the <strong>bridge between engineering and product</strong>. I champion MVP-first development — validate ideas with small experiments, then scale what works. I habitually write thorough Markdown docs for every project, recording architecture decisions and implementation details for maintainability and smooth handover.',
    'about.t1': 'Independent problem-solving',
    'about.t2': 'Rapid MVP validation',
    'about.t3': 'Tech–product bridge',
    'about.t4': 'Thorough documentation',
    'skills.h3': 'Core Tech Stack',
    'skills.g1': 'AI Application & Integration',
    'skills.g2': 'Backend & Analytics',
    'skills.g3': 'Frontend & Tools',
    'sk.rag': 'RAG (Retrieval-Augmented Generation)',
    'sk.qe': 'Query Expansion',
    'sk.emb': 'Embedding (halfvec optimization)',
    'sk.n8n': 'n8n (cloud AI workflow automation)',
    'sk.docker': 'Docker',
    'sk.java': 'Java & OOP Design Patterns',
    'sk.md': 'Markdown / Technical Writing',
    'sk.ollama': 'Ollama (Local LLM Deployment)',
    'sk.litellm': 'LiteLLM & API Integration',
    'sk.whisper': 'Whisper (Speech & Audio Processing)',
    'sk.da': 'Data Science & Analytics (Pandas, SciPy, EDA)',
    'sk.ml': 'Machine Learning (XGBoost, LightGBM, CatBoost)',
    'sk.laravel': 'Laravel (PHP) & Eloquent ORM',

    // Project filters
    'f.all': 'All',
    'f.rag': 'GenAI / RAG',
    'f.ml': 'ML & Signal Processing',
    'f.web': 'Systems & Web',

    // Project card badges
    'pb.functrl': 'Capstone | InnoServe National #1',
    'pb.kaggle': 'Kaggle | Global #2 of 777 🏆',
    'pb.prep': 'Personal | Fully Cloud-Native',
    'pb.aicup': 'AI CUP 2025 | Top 6.5%',
    'pb.wf': 'Graduate Course | 96 pts',
    'pb.webd': 'Course Project × Self-Refactor',
    'pb.ncu': 'Campus Community | Member',
    'pb.aiproj': 'Sophomore Course | Tech Member',
    'pb.datavis': 'Junior Course | 97 pts',
    'pb.lyrics': 'Personal | v1→v2 Evolution',
    'pb.genai': 'Joint Course | Project Dev',
    'pb.webadmin': 'Work Experience | Web Admin',

    'pt.aicup': 'Python · FFT / Wavelet · XGBoost · Random Forest',

    // Project card titles
    'ph.functrl': 'FunCtrl — AI Learning Map Platform',
    'ph.prep': 'PrepAgent — Telegram AI Study Assistant',
    'ph.aicup': 'Smart Racket Player Classification',
    'ph.wf': 'Workflow Design — Visual Editor',
    'ph.webd': 'proNCU Course Manager',
    'ph.ncu': 'NCU App — Mobile Campus',
    'ph.aiproj': 'Interdisciplinary AI Project',
    'ph.datavis': '2023 Traffic Accident Bias Analysis',
    'ph.lyrics': 'LyricsAnalyzer — Lyric Imagery CLI',
    'ph.genai': 'Generative AI Systems & Engineering',
    'ph.webadmin': 'Institute Website Admin & Security',

    // Project card briefs
    'pbr.functrl': 'Tackles fragmented YouTube learning with a novel three-tier vector RAG architecture plus Gemini query expansion to pinpoint exact video segments. 1st place nationwide, InnoServe AI Application Tools track.',
    'pbr.kaggle': 'Forecast 12 months of housing sales across 96 districts from only 67 monthly records each. Distilled 106 key features from 1,000+, validated with expanding-window backtesting, and optimized ensemble weights via SciPy with a Zero-sector Override against extreme errors.',
    'pbr.prep': 'Ingests Whisper lecture transcripts into chunked embeddings. Calls the Gemini REST API directly to avoid SDK version conflicts, stores vectors as `halfvec(3072)`, and runs on an n8n cloud workflow — an always-on Telegram statistics tutor.',
    'pbr.aicup': 'Time-series analysis of smart racket swings. Broke through the LSTM accuracy plateau with DSP feature engineering across time, frequency (FFT), and time-frequency (wavelet) domains — rank 41 of 633 teams.',
    'pbr.wf': 'Final project of the graduate OOP course. Deep practice of Factory, Observer, and Strategy patterns in a workflow editor with draggable nodes, connections, event propagation, and JSON serialization.',
    'pbr.webd': 'Laravel course-scheduling system built as sophomore team lead. Recently launched a self-initiated security refactor: diagnosed 5 flaws including plaintext passwords, then added Bcrypt hashing, auth middleware, backend validation, and rewrote all raw SQL as Eloquent ORM.',
    'pbr.ncu': 'Joined the NCU App community to build a campus mobile app. First hands-on experience with React, Tailwind styling, and Firebase / Supabase cloud backends.',
    'pbr.aiproj': 'First contact with RAG in the AI minor program — integrated open LLM APIs and built a basic retrieval Q&A prototype, laying groundwork for later RAG architectures.',
    'pbr.datavis': 'Cleaned and explored Taiwan\'s 2023 traffic-accident records, designing multi-dimensional charts that debunk common intuitions about accident causes.',
    'pbr.lyrics': 'NLP-based quantitative analysis of Wu Qing-Feng\'s lyrics. v1 shipped an index layer and subcommand architecture; v2 added cosine similarity, SHA-256 incremental ingest, and CSV/JSON export — fully backward compatible.',
    'pbr.genai': 'NCU & NCKU joint course. Built BM25 hybrid search coding agent memory (Recall@5 > 0.81), statistics RAG with MD5 idempotency, NLP lyrics analyzer, and Pandoc doc pipelines.',
    'pbr.webadmin': 'Maintained the institute\'s official site: led accessibility 2.0 (A/AA) compliance restructuring, patched legacy SQL-injection vulnerabilities, and hardened HTTPS transport.',

    // Metrics
    'mv.k1': '2nd', 'ml.k1': 'of 777 Kaggle teams',
    'mv.k2': '106', 'ml.k2': 'features distilled from 1,000+',
    'ml.f1': 'NDCG retrieval accuracy', 'ml.f2': 'REST APIs built',
    'mv.p2': '5 turns', 'ml.p1': 'storage saved (halfvec)', 'ml.p2': 'chat-memory window',
    'mv.a2': '3 domains', 'ml.a1': 'national ranking', 'ml.a2': 'time / freq / wavelet',
    'mv.w1': '96 pts', 'mv.w2': 'OOP', 'ml.w1': 'OOP course grade',
    'mv.d1': '5 flaws', 'ml.d1': 'diagnosed & all fixed',
    'mv.d2': '100%', 'ml.d2': 'raw SQL → Eloquent ORM',
    'mv.n1': 'Hands-on', 'ml.n1': 'campus app community',
    'mv.n2': 'Full-stack', 'ml.n2': 'cloud DB integration',
    'mv.ai1': 'Tech R&D', 'ml.ai1': 'project architecture',
    'mv.ai2': 'RAG origin', 'ml.ai2': 'first LLM hands-on',
    'mv.dv1': '97 pts', 'ml.dv1': 'data-viz course grade',
    'mv.dv2': 'EDA', 'ml.dv2': 'Taiwan traffic data',
    'ml.l1': 'v1 backward compatible', 'ml.l2': 'spec-driven development',
    'mv.g1': '0.81+', 'ml.g1': 'Recall@5 Hybrid Search',
    'mv.g2': 'Project Dev', 'ml.g2': 'Joint Course Evaluation',
    'mv.wa1': 'A/AA', 'ml.wa1': 'MOE accessibility compliance',
    'mv.wa2': 'SQLi Defense', 'ml.wa2': 'legacy security hardening',
    'btn.details': 'Read Details',

    // Certificates
    'co.1': 'View certificate', 'co.2': 'View photo', 'co.3': 'View announcement',
    'co.4': 'View verification', 'co.5': 'View transcript', 'co.6': 'View certificate',
    'co.7': 'View certificate', 'co.8': 'View certificate',
    'ch.1': 'InnoServe National 1st Place — Official Certificate',
    'ch.2': 'InnoServe National 1st Place (Award Ceremony)',
    'ch.3': 'Kaggle Global 2nd Place — Official Announcement',
    'ch.4': 'Kaggle Winning-Team Identity Verification',
    'ch.5': 'NCU Academic Ranking Certificate',
    'ch.6': 'Book Prize Certificate (Spring 2025)',
    'ch.7': 'TOEIC Blue Certificate',
    'ch.8': 'Institute of Philosophy Network Admin Certificate',
    'cp.1': 'Official 1st-place certificate of the national InnoServe competition, issued by the Ministry of Education',
    'cp.2': 'Award ceremony photo — 1st place, AI Application Tools track',
    'cp.3': 'Official announcement — 2nd place worldwide, Real Estate Demand Prediction (team "Monopoly")',
    'cp.4': 'Verifies the author as a core member of winning team "Monopoly"',
    'cp.5': 'Cumulative department ranking: top 13%',
    'cp.6': 'Book Prize, Dept. of Information Management, NCU (Spring 2025)',
    'cp.7': 'Score 760 — fluent business & technical English communication',
    'cp.8': 'Official proof of website maintenance and compliance work',

    // Academics
    'ac.rank': 'Top 13%',
    'ac.uni': 'National Central University',
    'ac.dept': 'Information Management · Senior',
    'ac.prog': 'AI Micro-Credit Program',
    'ac.bp': 'Book Prize 1132',
    'tab.1': 'AI & Data Science',
    'tab.2': 'Software & Databases',
    'tab.3': 'Math & Statistics',
    'ct.1': 'AI & Data Science Core Courses',
    'ct.2': 'Software & Database Core Courses',
    'ct.3': 'Math & Statistics Foundations',
    'su.1': 'AI & Machine Learning', 'su.2': 'Interdisciplinary AI Project',
    'su.3': 'Python Programming', 'su.4': 'Intro to Machine Learning',
    'su.5': 'Programming', 'su.6': 'Advanced Java',
    'su.7': 'Database Management', 'su.8': 'Intro to Artificial Intelligence',
    'su.9': 'Calculus', 'su.10': 'Data Visualization',
    'su.11': 'Statistics', 'su.12': 'Linear Algebra',
    'eb.1': 'TA', 'eb.2': 'Network Admin', 'eb.3': 'Leadership',
    'eh.1': 'Core-Course Teaching Assistant',
    'eh.2': 'Institute of Philosophy — Network Admin',
    'eh.3': 'Project Lead & Club Officer',
    'ep.1': 'ML Intro · Data Visualization',
    'ep.2': 'Linux server · SQLi patching · Accessibility 2.0',
    'ep.3': 'Technical & team coordination',
    'ed.1': 'Guided sophomores and juniors through coding labs, feature engineering, and model building; graded course projects.',
    'ed.2': 'Led MOE accessibility 2.0 compliance restructuring, defended legacy systems against SQL injection, and managed Linux server operations with automated backups.',
    'ed.3': 'Led multiple RAG/ML projects coordinating frontend and backend; former English-club events lead and vice-captain of badminton & volleyball teams.',

    // CTA & footer
    'cta.h': 'Interested in my work?',
    'cta.p': 'Download my full résumé (PDF) or reach out by email — I\'d love to talk about building AI applications together!',
    'cta.b1': 'Email Me',
    'cta.b2': 'Résumé (PDF)',
    'fl.1': 'About', 'fl.2': 'Projects', 'fl.3': 'Credentials',
    'cm.pdf': 'Open original PDF',
};

// Strings owned by JS code (both languages needed)
const STR = {
    'm.tech':    { zh: '技術棧：', en: 'Tech stack: ' },
    'm.nature':  { zh: '專案性質：', en: 'Type: ' },
    'm.loading': { zh: '正在載入技術細節...', en: 'Loading details…' },
    'm.missing': { zh: '抱歉，無法載入該專案的技術細節。', en: 'Sorry, the details for this project could not be loaded.' },
    'm.error':   { zh: '載入時發生錯誤，請稍後再試。', en: 'Something went wrong. Please try again later.' },
    'p.more':    { zh: '展開更多專案 / Show More', en: 'Show More' },
    'p.less':    { zh: '收合小型專案 / Show Less', en: 'Show Less' },
};

let lang = 'zh';
const zhCache = new Map();

export const getLang = () => lang;
export const t = (key) => (STR[key] ? STR[key][lang] : key);

function applyLang() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (lang === 'en') {
            if (EN[key]) el.innerHTML = EN[key];
        } else if (zhCache.has(el)) {
            el.innerHTML = zhCache.get(el);
        }
    });
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-TW';
    const btn = document.getElementById('lang-toggle');
    if (btn) btn.textContent = lang === 'zh' ? 'EN' : '中';
    window.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
}

export function initI18n() {
    // Snapshot the zh source before any swap
    document.querySelectorAll('[data-i18n]').forEach(el => zhCache.set(el, el.innerHTML));

    const btn = document.getElementById('lang-toggle');
    if (btn) {
        btn.addEventListener('click', () => {
            lang = lang === 'zh' ? 'en' : 'zh';
            localStorage.setItem('lang', lang);
            applyLang();
        });
    }

    // ?lang=en beats saved preference (also handy for testing/sharing)
    const urlLang = new URLSearchParams(location.search).get('lang');
    const saved = urlLang || localStorage.getItem('lang');
    if (saved === 'en') {
        lang = 'en';
        applyLang();
    }
}
