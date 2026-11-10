/**
 * Centralized portfolio data for HOSHI // SEES TERMINAL.
 * -------------------------------------------------------------------------
 * PERSONAL INFORMATION, PROJECTS, EXPERIENCE, CERTIFICATIONS, and
 * ACHIEVEMENTS are intentionally PLACEHOLDERS — replace every bracketed
 * [placeholder] value with real data. Tech skill NAMES are generic industry
 * categories (not personal information) and carry short factual descriptions.
 *
 * Presentation concerns (icons, colors, layout) are deliberately kept OUT of
 * this file and mapped within the components, so data stays separate from
 * presentation.
 */

/* =========================================================
   PROFILE / ABOUT
========================================================= */
export const PROFILE = {
    codename: 'HOSHI',
    kanji: '星',
    displayName: 'Bintang',
    realName: 'Muhammad Bintang Junior',
    title: '[Placeholder title — e.g. Software Engineering Cadet // Full-Stack Tactician]',
    division: 'Junior Web Developer',
    arcana: 'XVII — THE STAR',
    assignedPersona: '[Fool – Orpheus (Lv.1)]',
    status: 'ACTIVE STUDENTS',
    statusState: 'online',
    location: 'Jakarta, Indonesia',
    station: 'SMKN 20 Jakarta',
    educationHistory: [
        {
            institution: 'SMKN 20 Jakarta',
            level: 'Senior Vocational High School',
            major: 'Software Engineering (Rekayasa Perangkat Lunak)',
            period: '2024 — Present',
            years: '3 years',
            status: 'ACTIVE',
            focus: ['Web Development', 'Software Engineering', 'Database Design'],
            coursework: ['Laravel', 'React', 'PHP', 'MySQL', 'UI/UX Design'],
            achievements: '[Update with any awards, grades, or distinctions]',
        },
        {
            institution: 'MTs Manaratul Islam',
            level: 'Junior High School (Madrasah Tsanawiyah)',
            major: 'General Education',
            period: '2021 — 2024',
            years: '3 years',
            status: 'GRADUATED',
            focus: ['General Academic Curriculum', 'Islamic Studies'],
            coursework: ['[Update with relevant subjects]'],
            achievements: '[Update with any awards, grades, or distinctions]',
        },
        {
            institution: 'SDI Manaratul Islam',
            level: 'Primary School (Sekolah Dasar Islam)',
            major: 'General Education',
            period: '2015 — 2021',
            years: '6 years',
            status: 'GRADUATED',
            focus: ['Foundation Academic Curriculum', 'Islamic Studies'],
            coursework: ['[Update with relevant subjects]'],
            achievements: '[Update with any awards, grades, or distinctions]',
        },
    ],
    bio: '[Placeholder biography — 2 to 3 sentences introducing who you are, what you build, and your engineering focus.]',
    bioExtended: '[Placeholder extended bio — describe your approach, what excites you about software, and the systems you enjoy architecting.]',
    quote: '"[Placeholder favorite quote or motto.]"',
    interests: [
        '[Placeholder interest — e.g. Tactical RPGs]',
        '[Placeholder interest — e.g. UI / Motion Design]',
        '[Placeholder interest — e.g. Open Source]',
        '[Placeholder interest — e.g. Synthwave & Game Audio]',
    ],
    currentStatus: '[Placeholder current status — e.g. Open to apprenticeship & collaboration opportunities.]',
};

/* =========================================================
   ABILITIES / SKILLS
   Proficiency levels are honest starting points — the Abilities page
   lets visitors calibrate them live. Ranks: B = developing, A = competent,
   S = strong, MAX = mastery. No inflated levels for beginner skills.
========================================================= */
export const SKILL_CATEGORIES = [
    {
        category: 'WEB DEVELOPMENT',
        blurb: 'Full-stack web engineering.',
        skills: [
            {
                name: 'Junior Web Development',
                desc: 'Foundational understanding of web systems: HTTP, MVC architecture, routing, and full request-response cycle.',
                level: 75,
                rank: 'A',
                type: 'Active',
            },
            {
                name: 'Frontend Development',
                desc: 'Building responsive, accessible user interfaces using React, Tailwind CSS, and Vite.',
                level: 80,
                rank: 'A',
                type: 'Active',
            },
            {
                name: 'Backend Development',
                desc: 'Server-side logic, database integration, and API design using Laravel and PHP.',
                level: 78,
                rank: 'A',
                type: 'Active',
            },
            {
                name: 'Laravel',
                desc: 'MVC framework: routing, Eloquent ORM, Blade templating, migrations, and middleware.',
                level: 82,
                rank: 'A',
                type: 'Active',
            },
            {
                name: 'React',
                desc: 'Component-based UI development with hooks, state management, and Inertia.js integration.',
                level: 80,
                rank: 'A',
                type: 'Active',
            },
        ],
    },
    {
        category: 'LANGUAGE',
        blurb: 'Communication & linguistic skills.',
        skills: [
            {
                name: 'Indonesian',
                desc: 'Native language — full reading, writing, speaking, and listening fluency.',
                level: 100,
                rank: 'MAX',
                type: 'Language',
            },
            {
                name: 'English',
                desc: 'Actively learning — able to read technical documentation, write basic text, and follow conversations.',
                level: 55,
                rank: 'B',
                type: 'Language',
            },
            {
                name: 'Japanese',
                desc: 'Beginner — studying JLPT N5 level hiragana, katakana, basic vocabulary, and simple phrases.',
                level: 25,
                rank: 'B',
                type: 'Language',
            },
        ],
    },
    {
        category: 'CREATIVE & EDITING',
        blurb: 'Visual communication & design craft.',
        skills: [
            {
                name: 'Video Editing',
                desc: 'Cutting, sequencing, and colour-grading footage using video editing tools.',
                level: 65,
                rank: 'A',
                type: 'Creative',
            },
            {
                name: 'Motion Editing',
                desc: 'Creating animated graphics, transitions, and motion effects.',
                level: 60,
                rank: 'B',
                type: 'Creative',
            },
            {
                name: 'Visual Design',
                desc: 'Composing layouts, typography, and colour palettes for digital media.',
                level: 68,
                rank: 'A',
                type: 'Creative',
            },
            {
                name: 'UI/UX Design',
                desc: 'Designing intuitive user interfaces and experiences with attention to usability and visual hierarchy.',
                level: 70,
                rank: 'A',
                type: 'Creative',
            },
        ],
    },
];

/* Persona 3 attribute flavor for the radar diagnostic (game-inspired UI). */
export const PERSONA_STATS = [
    { stat: 'AGI', label: 'Frontend & Reactive UI', value: 92, detail: 'React 18, Inertia.js 2, Tailwind, Framer Motion' },
    { stat: 'MAG', label: 'Backend Architecture', value: 90, detail: 'Laravel 12, PHP 8.2+, RESTful API, Middleware' },
    { stat: 'STR', label: 'Database & Data Integrity', value: 88, detail: 'SQLite, MySQL schema design, Eloquent, migrations' },
    { stat: 'END', label: 'Code Quality & Security', value: 86, detail: 'Auth, validation, clean architecture, standards' },
    { stat: 'LUK', label: 'Creative Edge & Motion', value: 95, detail: 'HUDs, diagonal geometry, Persona 3 aesthetic' },
];

/* =========================================================
   OPERATIONS / PROJECTS
   All project content is placeholder. demoUrl / githubUrl default to '#'
   (replace with real URLs). arcana metadata is inlined so the Operations
   page is fully data-driven.
========================================================= */
export const PROJECTS = [
    {
        id: 'op-01',
        arcanaNum: 'XVII',
        arcanaName: 'THE STAR',
        arcanaJa: '星',
        categoryJa: '[Placeholder department]',
        rank: 'RANK 10',
        codename: 'OPERATION 01 // [PLACEHOLDER]',
        block: 'TARTARUS BLOCK I // ARQA',
        category: '[Placeholder project category]',
        summary: '[Placeholder — describe what this project does, the problem it solves, the stack used, and the outcome.]',
        tags: ['Laravel 12', 'React 18', 'Inertia.js 2', 'Tailwind 4'],
        metrics: { difficulty: 'S', completion: 'OPERATIONAL', rating: '[Rating]' },
        highlights: [
            '[Placeholder highlight — key feature or architectural decision]',
            '[Placeholder highlight — notable engineering challenge solved]',
            '[Placeholder highlight — measurable result or impact]',
        ],
        badge: 'ACTIVE SYSTEM',
        status: 'IN DEVELOPMENT',
        date: '[YYYY.MM]',
        previewImage: null,
        demoUrl: '#',
        githubUrl: '#',
    },
    {
        id: 'op-02',
        arcanaNum: 'I',
        arcanaName: 'THE MAGICIAN',
        arcanaJa: '魔術師',
        categoryJa: 'Web Development',
        rank: 'RANK 9',
        codename: 'E-COMMERCE WEBSITE',
        block: 'TARTARUS BLOCK II // YABBASHAH',
        category: 'E-Commerce / Web Development',
        summary: 'Developed an e-commerce website with features and interfaces designed to support online shopping, including a product catalog with filters, categories, and responsive layout.',
        tags: ['Web Development', 'E-Commerce', '[Stack placeholder — update with real tech]'],
        metrics: { difficulty: 'A', completion: 'DEPLOYED', rating: 'OPERATIONAL' },
        highlights: [
            'Product catalog with category filters and search functionality.',
            'Responsive shopping interface optimized for desktop and mobile.',
            '[Add further highlight — e.g. cart, checkout, or backend details.]',
        ],
        badge: 'DEPLOYED',
        status: 'LIVE',
        date: '[YYYY.MM]',
        // Screenshot of the product catalog page at localhost:3000/catalog
        previewImage: '/images/ecommerce-preview.png',
        demoUrl: '#',
        // Replace [repo-slug] with the exact repository name on GitHub
        githubUrl: 'https://github.com/mbintangjunior2009-b/[repo-slug]',
    },
    {
        id: 'op-03',
        arcanaNum: 'IV',
        arcanaName: 'THE EMPEROR',
        arcanaJa: '皇帝',
        categoryJa: '[Placeholder department]',
        rank: 'RANK 8',
        codename: 'OPERATION 03 // [PLACEHOLDER]',
        block: 'TARTARUS BLOCK III // MONAD',
        category: '[Placeholder project category]',
        summary: '[Placeholder — describe what this project does, the problem it solves, the stack used, and the outcome.]',
        tags: ['PHP 8.2', 'MySQL', 'RBAC', 'Validation'],
        metrics: { difficulty: 'A', completion: 'VERIFIED', rating: '[Rating]' },
        highlights: [
            '[Placeholder highlight — key feature or architectural decision]',
            '[Placeholder highlight — notable engineering challenge solved]',
            '[Placeholder highlight — measurable result or impact]',
        ],
        badge: 'CERTIFIED',
        status: 'MAINTAINED',
        date: '[YYYY.MM]',
        previewImage: null,
        demoUrl: '#',
        githubUrl: '#',
    },
    {
        id: 'op-04',
        arcanaNum: 'VIII',
        arcanaName: 'JUSTICE',
        arcanaJa: '正義',
        categoryJa: 'Personal Project / Web Development',
        rank: 'RANK 7',
        codename: 'LUNAVERSE // MULTILINGUAL LEARNING PLATFORM',
        block: 'TARTARUS BLOCK IV // HARABAH',
        category: 'Multilingual Learning Platform',
        summary: 'Developed a web-based learning platform (LunaVerse) designed to support learning multiple languages through an interactive experience — including structured lessons, vocabulary drills, and a clean premium interface.',
        tags: ['Web Development', 'EdTech', '[Stack placeholder — update with real tech]'],
        metrics: { difficulty: 'A', completion: 'DEPLOYED', rating: 'OPERATIONAL' },
        highlights: [
            'Interactive multilingual learning interface with structured lesson flow.',
            'Premium UI/UX design focused on accessibility and learning engagement.',
            '[Add further highlight — e.g. language modules, progress tracking, or backend.]',
        ],
        badge: 'DEPLOYED',
        status: 'LIVE',
        date: '[YYYY.MM]',
        // Screenshot of the LunaVerse premium landing/dashboard
        previewImage: '/images/lunaverse-preview.png',
        demoUrl: '#',
        // Replace [repo-slug] with the exact LunaVerse repository name on GitHub
        githubUrl: 'https://github.com/mbintangjunior2009-b/[repo-slug]',
    },
];

/* =========================================================
   RECORDS / EXPERIENCE
   Four real entries provided by Bintang. Education and certifications
   remain as placeholders — update them when that information is ready.
   Dates marked [YYYY.MM] are editable placeholders; fill in real dates.
========================================================= */
export const RECORDS = {
    education: [
        {
            period: '[YYYY – PRESENT]',
            institution: '[School / Institution name]',
            program: 'Software Engineering (Rekayasa Perangkat Lunak)',
            detail: '[Focus area, relevant coursework, or honors — update with real details.]',
            status: 'ONGOING',
        },
    ],

    experience: [
        // ── REC-01 ───────────────────────────────────────────
        {
            id: 'REC-01',
            period: '[YYYY.MM – YYYY.MM]',
            role: 'Web Development Collaborator',
            org: 'LPS Bank Project',
            category: 'Collaboration / Web Development',
            detail: 'Collaborated on the development of a banking-related web project for LPS. Contributed to frontend and backend components in a team environment.',
            tags: ['Web Development', 'Collaboration', '[Stack placeholder]'],
            type: 'PROJECT',
            status: 'CONCLUDED',
        },
        // ── REC-02 ───────────────────────────────────────────
        {
            id: 'REC-02',
            period: '[YYYY.MM – YYYY.MM]',
            role: 'Web Developer',
            org: 'E-Commerce Website',
            category: 'Web Development',
            detail: 'Developed an e-commerce website with features and interfaces designed to support online shopping, including product listings, cart functionality, and responsive design.',
            tags: ['Web Development', 'E-Commerce', '[Stack placeholder]'],
            type: 'PROJECT',
            status: 'CONCLUDED',
            previewImage: '/images/ecommerce-preview.png',
            githubUrl: 'https://github.com/mbintangjunior2009-byte/ecommercedvail.git',
        },
        // ── REC-03 ───────────────────────────────────────────
        {
            id: 'REC-03',
            period: '[YYYY.MM – YYYY.MM]',
            role: 'Junior Web Developer Intern',
            org: 'ESQ',
            category: 'Professional Experience / Internship',
            detail: 'Completed an internship at ESQ as a Junior Web Developer. Gained practical experience in professional web development workflows and collaborated within a structured team environment.',
            tags: ['Internship', 'Junior Web Developer', '[Stack placeholder]'],
            type: 'WORK',
            status: 'CONCLUDED',
        },
        // ── REC-04 ───────────────────────────────────────────
        {
            id: 'REC-04',
            period: '[YYYY.MM – YYYY.MM]',
            role: 'Developer',
            org: 'Multilingual Learning Platform',
            category: 'Personal Project / Web Development',
            detail: 'Developed a web-based learning platform designed to support learning multiple languages through an interactive learning experience.',
            tags: ['Personal Project', 'Web Development', '[Stack placeholder]'],
            type: 'PROJECT',
            status: 'CONCLUDED',
            previewImage: '/images/lunaverse-preview.png',
            githubUrl: 'https://github.com/mbintangjunior2009-byte/LunaVerse.git',
        },
    ],

    certifications: [
        {
            name: '[Certification name — update when available]',
            issuer: '[Issuing organization]',
            date: '[YYYY.MM]',
            status: 'IN PROGRESS',
        },
    ],

    achievements: [
        {
            date: '[YYYY.MM]',
            title: 'ESQ Internship Completed',
            detail: 'Completed a professional internship as a Junior Web Developer at ESQ, gaining hands-on industry experience.',
            type: 'MILESTONE',
        },
        {
            date: '[YYYY.MM]',
            title: 'LPS Bank Project Shipped',
            detail: 'Delivered a collaborative banking web project for LPS as part of a development team.',
            type: 'RELEASE',
        },
        {
            date: '[YYYY.MM]',
            title: 'E-Commerce Website Launched',
            detail: 'Completed and deployed an e-commerce website featuring a full online shopping interface.',
            type: 'RELEASE',
        },
        {
            date: '[YYYY.MM]',
            title: 'Multilingual Learning Platform Built',
            detail: 'Independently developed a multi-language interactive learning platform as a personal project.',
            type: 'RELEASE',
        },
    ],

    timeline: [
        {
            date: '[YYYY.MM]',
            title: 'Junior Web Developer Intern — ESQ',
            desc: 'Began professional internship at ESQ, working within a real development team as a Junior Web Developer.',
            type: 'MAJOR_EVENT',
        },
        {
            date: '[YYYY.MM]',
            title: 'LPS Bank Project — Collaboration',
            desc: 'Joined a team collaboration to build a banking-related web system for LPS.',
            type: 'MILESTONE',
        },
        {
            date: '[YYYY.MM]',
            title: 'E-Commerce Website — Shipped',
            desc: 'Completed development of an e-commerce website supporting product listings and online shopping.',
            type: 'RELEASE',
        },
        {
            date: '[YYYY.MM]',
            title: 'Multilingual Learning Platform — Launched',
            desc: 'Built and released a personal web project: an interactive multilingual learning platform.',
            type: 'RELEASE',
        },
    ],
};

/* =========================================================
   CONTACT
   Social channels. URLs default to placeholder fragments — replace with
   real handles/URLs. Icons are mapped by `key` inside the Comms component.
========================================================= */
export const SOCIALS = [
    { key: 'email', label: 'EMAIL', handle: '[mbintangjunior2009@gmail.com.placeholder]', url: 'mailto:[mbintangjunior@gmail.com.placeholder]' },
    { key: 'github', label: 'GITHUB', handle: '@[mbintangjunior2009]', url: 'https://github.com/[mbintangjunior2009]' },
    { key: 'linkedin', label: 'LINKEDIN', handle: 'in/[username]', url: 'https://linkedin.com/in/[username]' },
    { key: 'instagram', label: 'INSTAGRAM', handle: '@[hoshideluna]', url: 'https://www.instagram.com/hoshideluna' },
    { key: 'discord', label: 'DISCORD', handle: '[lunalarai]', url: '#' },
];
