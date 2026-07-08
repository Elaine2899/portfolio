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
    'hero.tagline': 'Hands-on developer focused on shipping AI applications. Strong in requirements analysis and rapid MVP building, with an MIS background spanning tech and business — and a habit of writing structured docs that keep teams aligned.',
    'hero.desc': 'From a national-champion RAG learning platform to a 2nd-place-worldwide Kaggle forecast — I research proactively, build fast, and keep iterating on uncertain problems.',
    'hero.cta1': 'View My Projects',
    'hero.cta2': 'About Me',
    'hero.b1n': 'National #1',
    'hero.b1l': 'InnoServe AI Tools Track<br>Capstone project FunCtrl',
    'hero.b2l': 'NCU MIS cumulative rank<br>Book Prize (Spring 2025)',
    'hero.b3n': 'Global #2',
    'hero.b3l': 'Kaggle real-estate forecasting<br>2nd of 777 teams',
    'hero.b4l': 'Accessibility & security hardening<br>led the full site revamp',

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
    'about.p1': 'I\'ve shouldered my studies and finances on my own since freshman year. That built my time management, resilience, and independent problem-solving — and under that pressure I still kept a top-13% department rank, served as a teaching assistant, and led a team to a national first place.',
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
    'pbr.functrl': 'Tackles fragmented YouTube learning with a three-tier (title / tag / subtitle) vector RAG retrieval plus Gemini query expansion to pinpoint exact video segments. 1st place nationwide, InnoServe AI Application Tools track.',
    'pbr.kaggle': 'Forecast 12 months of housing sales across 96 districts from only 67 monthly records each. Distilled 106 key features from 1,000+, validated with time-based 5-fold cross-validation to prevent leakage, and blended four models with a Zero-sector Override against extreme errors.',
    'pbr.prep': 'Chunks and embeds 29 lectures of Whisper statistics transcripts into Supabase pgvector (halfvec, 50% storage saved), wired to Telegram via an n8n cloud workflow — always-on Q&A, quizzes, and summaries, with retrieval quality measured on a self-built 16-question eval set.',
    'pbr.aicup': 'Time-series analysis of smart racket swings. Broke through the LSTM accuracy plateau with DSP feature engineering across time, frequency (FFT), and time-frequency (wavelet) domains — rank 41 of 633 teams (top 6.5%).',
    'pbr.wf': 'Final project of the graduate OOP course — a workflow editor applying Factory, Observer, and Strategy patterns, with draggable nodes, connections, event propagation, and JSON serialization.',
    'pbr.webd': 'Laravel course-scheduling system built as sophomore team lead. Recently launched a self-initiated security refactor: diagnosed 5 flaws including plaintext passwords, then added Bcrypt hashing, auth middleware, backend validation, and rewrote all raw SQL as Eloquent ORM.',
    'pbr.ncu': 'Joined the NCU App community to build a campus mobile app. First hands-on experience with React, Tailwind styling, and Firebase / Supabase cloud backends.',
    'pbr.aiproj': 'First contact with RAG in the AI minor program — integrated open LLM APIs and built a basic retrieval Q&A prototype, laying groundwork for later RAG architectures.',
    'pbr.datavis': 'Cleaned and explored Taiwan\'s 2023 traffic-accident records, designing multi-dimensional charts that debunk common intuitions about accident causes.',
    'pbr.lyrics': 'NLP-based quantitative analysis of Wu Qing-Feng\'s lyrics. v1 shipped an index layer and subcommand architecture; v2 added cosine similarity, SHA-256 incremental ingest, and CSV/JSON export — fully backward compatible.',
    'pbr.genai': 'NCU & NCKU joint course. Built BM25 hybrid search coding agent memory (Recall@5 > 0.81), statistics RAG with MD5 idempotency, NLP lyrics analyzer, and Pandoc doc pipelines.',
    'pbr.webadmin': 'Maintained the institute\'s official site: led accessibility 2.0 (A/AA) compliance restructuring, patched legacy SQL-injection vulnerabilities, and hardened HTTPS transport. Led a full revamp of the decade-old site: Laravel 5.2 → 11, no-code admin publishing, full-text search, and a staging release flow.',

    // Metrics
    'mv.k1': '2nd', 'ml.k1': 'of 777 Kaggle teams',
    'mv.k2': '106', 'ml.k2': 'features distilled from 1,000+',
    'ml.f1': 'NDCG retrieval accuracy', 'ml.f2': 'REST APIs built',
    'ml.p1': 'storage saved (halfvec)', 'ml.p2': 'Hit Rate@5 retrieval accuracy',
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
    'cp.5': 'Official transcript proving a cumulative top-13% department rank',
    'cp.6': 'Book Prize, Dept. of Information Management, NCU (Spring 2025)',
    'cp.7': 'Score 760 (blue certificate) — business & technical English communication',
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
    'ed.2': 'Led MOE accessibility 2.0 compliance restructuring, defended legacy systems against SQL injection, and managed Linux server operations with automated backups; led the full site revamp (Laravel 5.2 → 11).',
    'ed.3': 'Led multiple RAG/ML projects coordinating frontend and backend; former English-club events lead and vice-captain of badminton & volleyball teams.',

    // CTA & footer
    'cta.h': 'Interested in my work?',
    'cta.p': 'Download my full résumé (PDF) or reach out by email — I\'d love to talk about building AI applications together!',
    'cta.b1': 'Email Me',
    'cta.b2': 'Résumé (PDF)',
    'fl.1': 'About', 'fl.2': 'Projects', 'fl.3': 'Credentials',
    'cm.pdf': 'Open original PDF',

    // Case-study pages
    'case.back': 'Back to portfolio',
    'case.github': 'View source on GitHub',

    // FunCtrl case study (fc.*)
    'fc.tech': 'Tech stack: FastAPI · Vue.js · ChromaDB · PostgreSQL · Gemini Pro · Docker · Railway',
    'fc.nature': '<strong>Type:</strong> Capstone project | <strong>1st place, InnoServe national competition</strong>, AI Application Tools track 🏆',
    'fc.h1': 'Motivation & Problem Definition',
    'fc.s1p1': 'The topic came from our advisor\'s observation of how people learn from online video today; the team then surveyed existing tools to confirm the gap was real:',
    'fc.s1l1': '<li><strong>YouTube</strong>: built-in search only matches titles and descriptions — the smallest retrievable unit is a whole video, so it cannot answer "which minute covers this concept"; chapters and timestamps rely on creators adding them by hand, with uneven coverage and quality.</li><li><strong>Udemy, Hahow and similar platforms</strong>: offer structured course curation, but the content is closed and paid, leaving YouTube\'s vast open resources uncovered — and their site search still stops at the course/video level, nowhere near knowledge-point targeting.</li>',
    'fc.s1p2': 'Our core users are <strong>anyone teaching themselves a new skill</strong>: facing a flood of video content without structured guidance, learning in fragmented time slots, and wanting a clear learning path. The same gap exists in <strong>corporate training</strong> — training videos lack systematic management and search, and are hard to revisit — giving the system room to grow into an enterprise training solution.',
    'fc.s1p3': 'So we framed the problem as <strong>fine-grained semantic retrieval over a long-video corpus</strong>: given one natural-language question, the system must locate "which video, at which timestamp", and generate learning paths on top of that retrieval foundation.',
    'fc.h2': 'Method Selection & Alternatives',
    'fc.s2p1': 'The core judgment behind the technical route: given a five-student team\'s resources, which path delivers the best knowledge-point targeting? We compared three:',
    'fc.s2l1': '<li><strong>Pure keyword search (inverted index)</strong>: cheapest to build, but it only matches surface text and cannot bridge the gap between how users ask and how lecturers speak — it would be no better than YouTube\'s own search.</li><li><strong>Fine-tuning a dedicated model</strong>: the highest ceiling in theory, but labeled data, training compute, and experiment cycles were far beyond a capstone project\'s resources.</li><li><strong>Fully managed commercial APIs</strong>: fastest to integrate, but pay-per-use pricing is unsustainable for an always-on service, and retrieval quality tuning is capped by the vendor.</li>',
    'fc.s2p2': 'We chose <strong>vector retrieval on open-source embedding models, with the LLM stepping in only at key moments</strong> (query expansion, re-ranking, summary refinement): vector search bridges the semantic gap, open-source models keep steady-state costs under control, and LLM spending concentrates on a few high-value steps. The route also left room to iterate — in the evaluation phase we could swap embedding models guided by NDCG (see Evaluation) without touching the overall architecture.',
    'fc.h3': 'System Design',
    'fc.h3a': 'Architecture',
    'fc.s3p1': 'The Vue.js frontend is deployed on Vercel; the FastAPI backend carries the RAG pipeline (query embedding → vector retrieval → prompt assembly → answers by Gemini 2.5 Flash) and 30+ RESTful APIs covering JWT auth, personalized recommendation, and quiz generation. The data layer splits in two: <strong>PostgreSQL for structured data, ChromaDB for vectors</strong> — each doing what it does best, instead of one database compromising on both.',
    'fc.s3p2': 'Deployment started on Railway (automated container builds); the service later moved to an on-prem lab server, per our advisor\'s decision, to cut API and hosting costs.',
    'fc.f1c': 'FunCtrl architecture: Vercel (Vue.js) → Railway (FastAPI RAG pipeline) → PostgreSQL / ChromaDB → Gemini 2.5 Flash',
    'fc.f2c': 'Learning page: AI-generated "Best Moments" timestamps and key-point summary — click a card to jump to the segment',
    'fc.h3b': 'Three-tier retrieval: title → tag → subtitle',
    'fc.s3p3': 'A layered design settled through team discussion: rather than flattening every subtitle into one big vector pool, the system <strong>narrows from coarse to fine</strong> — the title and tag layers first lock onto candidate videos, the subtitle layer then does fine-grained matching, and Gemini re-ranks and emits the exact timestamp. Two practical reasons: titles and tags are short text, so the first-pass filter is <strong>fast</strong>; and when different videos cover similar topics, locking onto videos first keeps fine-grained matching <strong>free of cross-video interference</strong>.',
    'fc.s3p4': 'Embedding models are also split by text length: MiniLM-L6-v2 for short text (titles, tags), bge-m3 for long text (subtitles).',
    'fc.h3c': 'Three key design decisions',
    'fc.s3l1': '<li><strong>Normalization + L2 distance over cosine similarity</strong>: cosine similarity proved slow at query time, so I proposed normalizing vector lengths and retrieving by L2 distance — mathematically equivalent to cosine, but significantly faster, improving latency under concurrency.</li><li><strong>Query expansion</strong>: user queries are often shorter and vaguer than a lecturer\'s wording, so Gemini first expands the raw query with synonyms and missing context before retrieval, lifting recall.</li><li><strong>Async self-expanding corpus</strong>: the corpus started with machine-learning videos only; to face out-of-domain queries, a Python asyncio background task kicks in when retrieval confidence drops below a threshold — automatically downloading related videos and subtitles, embedding and summarizing them, so ChromaDB grows incrementally with real usage.</li>',
    'fc.s3p5': 'On top of retrieval, the system uses the LLM to generate hierarchical learning maps persisted to the database, and integrates AI-generated quizzes with a progress dashboard — closing the "retrieve–learn–assess" loop.',
    'fc.h4': 'Evaluation & Results',
    'fc.s4p1': 'The hardest part of a retrieval system isn\'t building it — it\'s <strong>proving the ranking is good</strong>: "is this ordering reasonable" has no ready-made answer key. I led the design of an evaluation framework:',
    'fc.s4l1': '<li><strong>Metric</strong>: NDCG (Normalized Discounted Cumulative Gain), which punishes both mis-ordering and missing high-relevance results — a better fit for retrieval than plain accuracy.</li><li><strong>Ground truth</strong>: three annotators (team members) independently rated query relevance on 10 target videos, averaging scores to dilute individual bias and anchor the ideal ranking (IDCG).</li><li><strong>Iteration</strong>: we measured how far actual scores deviated from IDCG, and the team used that as the objective basis for testing open-source embedding models — selection by data, not by feel.</li>',
    'fc.s4p2': 'The system\'s retrieval score stabilized at <strong>88%+</strong>.',
    'fc.h5': 'Limitations & Future Work',
    'fc.s5l1': '<li><strong>Corpus coverage</strong>: the test corpus centered on machine learning; outside that domain there was nothing to retrieve. The self-expanding mechanism (see System Design) was born exactly here, but building new corpus takes time — it is not search-and-get.</li><li><strong>Language</strong>: only English retrieval shipped within the timeline. Bilingual (zh-en) and multimodal search (understanding on-screen content) top the list of what we wanted most but never reached.</li><li><strong>Subtitle dependency</strong>: only videos with CC subtitles are searchable. We planned ASR transcripts for subtitle-less videos but never got to try it — this directly caps how much of the real-world video pool the system can cover.</li><li><strong>Evaluation scale</strong>: the annotation set is 10 videos, rated by 3 team members rather than independent third parties, so the external validity of the NDCG score is limited.</li>',
    'fc.h6': 'My Role & Reflections',
    'fc.s6p1': 'A five-person team: two teammates owned the backend implementation and one the frontend; I owned <strong>the overall system design and page design, and contributed to the frontend build</strong>, while chairing meetings to keep progress moving and producing the presentations. The backend wasn\'t mine to implement, but two key technical calls were mine and made it into production: <strong>normalization + L2 distance over cosine similarity</strong> (see System Design) and <strong>the NDCG evaluation framework</strong> (see Evaluation).',
    'fc.s6p2': '<strong>Reflections</strong>: the decision that paid off most was <strong>building the evaluation framework before optimizing</strong> — without NDCG, retrieval quality was a matter of gut feeling; with an objective score, every iteration had a direction. Given a rerun I would follow the same steps — the order proved right — just push each one faster, so the directions that ran out of runway (ASR, bilingual search) could make it into scope.',
};

// Strings owned by JS code (both languages needed)
const STR = {
    'm.tech':    { zh: '技術棧：', en: 'Tech stack: ' },
    'm.nature':  { zh: '專案性質：', en: 'Type: ' },
    'm.loading': { zh: '正在載入技術細節...', en: 'Loading details…' },
    'm.missing': { zh: '抱歉，無法載入該專案的技術細節。', en: 'Sorry, the details for this project could not be loaded.' },
    'm.error':   { zh: '載入時發生錯誤，請稍後再試。', en: 'Something went wrong. Please try again later.' },
    'm.case':    { zh: '閱讀完整案例', en: 'Read the full case study' },
    'p.more':    { zh: '展開更多專案', en: 'Show More' },
    'p.less':    { zh: '收合小型專案', en: 'Show Less' },
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
