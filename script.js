// Initialize Highlight.js
hljs.configure({ ignoreUnescapedHTML: true });

// Custom Cursor Action
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursor-dot');

if (window.innerWidth >= 1024) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => {
        cursor.style.width = '12px';
        cursor.style.height = '12px';
        cursor.style.backgroundColor = 'var(--cyan)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.backgroundColor = 'transparent';
    });
    
    // Hover effect on interactives
    const interactives = document.querySelectorAll('a, button, select, input, textarea, .interactive-node');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.borderColor = '#ffffff';
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorDot.style.backgroundColor = '#ffffff';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.borderColor = 'var(--cyan)';
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorDot.style.backgroundColor = 'var(--cyan)';
        });
    });
}

// Header Scrolling state
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Typewriter Effect (Hero Section Terminal Boot Sequence)
const bootLines = [
    { text: "$ npx dev-server --init --port 8080", delay: 300 },
    { text: "[sys] Initializing dev environment boot sequence...", delay: 80 },
    { text: "[sys] Loading kernel modules for Developer: Anthony Suryadjie...", delay: 60 },
    { text: "[sys] Stack setup detected: Node.js, Express, Hapi, NoSQL, JWT, RBAC.", delay: 50 },
    { text: "[sys] Check core engines... OK", delay: 30 },
    { text: "[sys] Connect Local DB: mongodb://127.0.0.1:27017/portfolio... OK", delay: 50 },
    { text: "[sys] Verifying authorization certificates... JWT Valid.", delay: 80 },
    { text: "[sys] Server running live on port 8080. Connection Ready.", delay: 100 },
    { text: "$ cat welcome_banner.txt", delay: 200 },
    { text: "--------------------------------------------------------", delay: 10 },
    { text: "   __  _  _  __  _  _  __    ___  ____  _  _ ", delay: 10 },
    { text: "  (  )( \\/ )(  )(  ( \\/  \\  / __)(  __)( \\/ )", delay: 10 },
    { text: "  / (_/\\  /  )( /    (  O )( (_-..  )   \\  / ", delay: 10 },
    { text: "  \\____/\\/  (__)\\_)__)\\__/  \\___/(__)    \\/  ", delay: 10 },
    { text: "  Junior Backend Developer specializing in secure APIs.  ", delay: 10 },
    { text: "--------------------------------------------------------", delay: 10 },
    { text: "$ _", delay: 500 }
];

const terminalBoot = document.getElementById('terminal-boot');
const bootTyped = document.getElementById('boot-typed');
let lineIdx = 0;

function typeLine() {
    if (lineIdx < bootLines.length) {
        const lineInfo = bootLines[lineIdx];
        let charIdx = 0;
        
        // Clear the command prompt block for output statements
        if (lineIdx === 0) {
            const timer = setInterval(() => {
                if (charIdx < lineInfo.text.length) {
                    bootTyped.innerHTML += lineInfo.text.charAt(charIdx);
                    charIdx++;
                } else {
                    clearInterval(timer);
                    // Insert a new line container
                    const newLine = document.createElement('div');
                    newLine.className = 'terminal-line';
                    newLine.style.color = '#38bdf8'; // style for boot command run
                    newLine.textContent = bootLines[0].text;
                    
                    // Re-append prompt line under it
                    bootTyped.parentElement.before(newLine);
                    bootTyped.innerHTML = '';
                    lineIdx++;
                    setTimeout(typeLine, 200);
                }
            }, 40);
        } else if (lineIdx === 8) { // run cat welcome command
            const timer = setInterval(() => {
                if (charIdx < lineInfo.text.length) {
                    bootTyped.innerHTML += lineInfo.text.charAt(charIdx);
                    charIdx++;
                } else {
                    clearInterval(timer);
                    const newLine = document.createElement('div');
                    newLine.className = 'terminal-line';
                    newLine.style.color = '#38bdf8';
                    newLine.textContent = bootLines[8].text;
                    bootTyped.parentElement.before(newLine);
                    bootTyped.innerHTML = '';
                    lineIdx++;
                    setTimeout(typeLine, 100);
                }
            }, 40);
        } else {
            // Fast system boot load logs
            const newLine = document.createElement('div');
            newLine.className = 'terminal-line';
            
            // Colors based on system status logs
            if (lineInfo.text.startsWith('[sys]')) {
                newLine.style.color = '#71717a';
                if (lineInfo.text.includes('OK') || lineInfo.text.includes('Ready')) {
                    newLine.innerHTML = lineInfo.text.replace('OK', '<span style="color:#10b981; font-weight:bold;">OK</span>').replace('Ready', '<span style="color:#00f5ff; font-weight:bold;">Ready</span>');
                } else {
                    newLine.textContent = lineInfo.text;
                }
            } else if (lineIdx > 8 && lineIdx < 16) {
                newLine.style.color = '#00f5ff';
                newLine.style.whiteSpace = 'pre';
                newLine.textContent = lineInfo.text;
            } else if (lineInfo.text === "$ _") {
                // Ending line cursor indicator
                bootTyped.parentElement.innerHTML = '<span class="terminal-prompt">$</span><span class="terminal-cursor"></span>';
                return;
            } else {
                newLine.textContent = lineInfo.text;
            }
            
            bootTyped.parentElement.before(newLine);
            terminalBoot.scrollTop = terminalBoot.scrollHeight;
            lineIdx++;
            setTimeout(typeLine, lineInfo.delay);
        }
    }
}

// Start type animation
setTimeout(typeLine, 800);

// Interactive Architecture Diagram Node Logic
const techInfo = {
    client: {
        title: "Client-Side Integration",
        tag: "Browser / Request Engine",
        body: `<p>As a backend developer, I understand how clients send HTTP requests and consume JSON payloads.</p>
               <p>Integrating AJAX/Fetch requests, handling HTTP error status codes (2xx, 3xx, 4xx, 5xx) frontend-side, and configuring Bearer tokens in headers for API authentication.</p>`,
        tags: ["HTML5", "CSS3", "Vanilla JS", "Fetch API", "REST Clients"]
    },
    api: {
        title: "API Routing & Logic",
        tag: "Express.js & Hapi.js Core",
        body: `<p>The core API engines are developed within the Node.js ecosystem. I specialize in <strong>Express.js</strong> for fast and modular routing, and <strong>Hapi.js</strong> for enterprise-ready backends.</p>
               <p>Implementing validation layers with <strong>Joi</strong>, arranging clean directory structures, managing CORS, and designing RESTful CRUD endpoints.</p>`,
        tags: ["Node.js", "Express.js", "Hapi.js", "Joi Validation", "Router Middleware"]
    },
    auth: {
        title: "Security & Authentication",
        tag: "JWT + Access Control",
        body: `<p>Securing sensitive endpoints using industry-standard cryptography. I implement <strong>JWT (JSON Web Token)</strong> for stateless authentication.</p>
               <p>Coupled with a <strong>Role-Based Access Control (RBAC)</strong> system to enforce access permissions between standard users and administrators at the routing middleware level.</p>`,
        tags: ["JWT Authentication", "RBAC Middleware", "Crypto Encryption", "Express-JWT", "Route Protection"]
    },
    db: {
        title: "NoSQL Database",
        tag: "MongoDB & Data Mapping",
        body: `<p>Storing dynamic data using high-performance NoSQL systems like <strong>MongoDB</strong>.</p>
               <p>Experienced in defining data models (Mongoose ODM), optimization indexes, complex CRUD operations, document relationships, and securing queries against NoSQL injections.</p>`,
        tags: ["MongoDB", "Mongoose ODM", "NoSQL Aggregations", "Redis Caching", "Data Integrity"]
    }
};

const nodes = document.querySelectorAll('.interactive-node');
const panelTitle = document.getElementById('panel-title');
const panelTag = document.getElementById('panel-tag');
const panelBody = document.getElementById('panel-body');
const panelTags = document.getElementById('panel-tags');
const flowLines = document.querySelectorAll('.flow-line');

nodes.forEach(node => {
    node.addEventListener('click', () => {
        // Remove active class from other nodes
        nodes.forEach(n => n.classList.remove('active'));
        node.classList.add('active');
        
        const techKey = node.getAttribute('data-tech');
        const info = techInfo[techKey];
        
        // Update panel information
        panelTitle.textContent = info.title;
        panelTag.textContent = info.tag;
        panelBody.innerHTML = info.body;
        
        // Update tags
        panelTags.innerHTML = '';
        info.tags.forEach((tag, idx) => {
            const tagEl = document.createElement('span');
            tagEl.className = `tech-tag ${idx < 3 ? 'highlight' : ''}`;
            tagEl.textContent = tag;
            panelTags.appendChild(tagEl);
        });
        
        // Animate corresponding flows based on selection
        flowLines.forEach(line => line.classList.remove('active'));
        if (techKey === 'client') {
            document.getElementById('flow1').classList.add('active');
        } else if (techKey === 'api') {
            document.getElementById('flow1').classList.add('active');
            document.getElementById('flow2').classList.add('active');
        } else if (techKey === 'auth') {
            document.getElementById('flow1').classList.add('active');
            document.getElementById('flow2').classList.add('active');
            document.getElementById('flow3').classList.add('active');
        } else if (techKey === 'db') {
            flowLines.forEach(line => line.classList.add('active'));
        }
    });
});

// Scroll reveal logic with IntersectionObserver
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(el => revealObserver.observe(el));

// Sync active nav links based on scrolling sections
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let currentSec = "";
    sections.forEach(sec => {
        const secTop = sec.offsetTop;
        const secHeight = sec.clientHeight;
        if (window.scrollY >= (secTop - 200)) {
            currentSec = sec.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSec}`) {
            link.classList.add('active');
        }
    });
});
