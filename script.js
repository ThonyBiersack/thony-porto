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

// // LIVE API DEMO SIMULATOR LOGIC
const jwtSecret = "bookshelf_api_jwt_secret_2026";

// Virtual MongoDB State in memory
let dbState = {
    users: [
        {
            _id: "64b38fae120d3f4b8c9c0f41",
            email: "anthony@dev.work",
            username: "anthony",
            password: "$2b$10$U2wSgR90Q958TfH7yN5r7.o3bZ8/9.UfG.o9eHw/XgH5f7Y7Y.g2y",
            books: []
        }
    ],
    books: [
        {
            _id: "book-98a7sd89a7",
            title: "Laskar Pelangi",
            year: 2005,
            author: "Andrea Hirata",
            summary: "Kisah perjuangan anak-anak Belitung...",
            publisher: "Bentang Pustaka",
            pageCount: 300,
            readPage: 300,
            reading: false,
            finished: true,
            insertedAt: "2026-07-12T07:00:00.000Z",
            updatedAt: "2026-07-12T07:00:00.000Z"
        }
    ]
};

// Virtual SQLite State for WarungKas app
let sqliteState = {
    products: [
        { id: 1, name: "Mie Instan Goreng", barcode: "899061320111", price: 3500, stock: 24, cost: 2800 },
        { id: 2, name: "Minyak Goreng 1L", barcode: "899201931882", price: 18000, stock: 3, cost: 15500 },
        { id: 3, name: "Beras Pandan Wangi 5kg", barcode: "899738120012", price: 75000, stock: 8, cost: 68000 },
        { id: 4, name: "Kopi Sachet Susu", barcode: "899120381726", price: 2000, stock: 60, cost: 1500 },
        { id: 5, name: "Sabun Cuci Piring 400ml", barcode: "899100238129", price: 9000, stock: 2, cost: 7200 }
    ],
    transactions: [
        { id: 1001, total_price: 38500, profit: 7100, payment_method: "Cash", timestamp: "2026-07-12T10:15:00.000Z" },
        { id: 1002, total_price: 18000, profit: 2500, payment_method: "QRIS", timestamp: "2026-07-12T11:20:00.000Z" },
        { id: 1003, total_price: 11000, profit: 2100, payment_method: "Cash", timestamp: "2026-07-12T12:05:00.000Z" },
        { id: 1004, total_price: 79000, profit: 8600, payment_method: "QRIS", timestamp: "2026-07-12T13:40:00.000Z" }
    ],
    licenses: [
        { license_key: "WK-OFFLINE-992A-3FBC", owner: "Warung Berkah Utama", expiry_date: "2027-12-31", status: "ACTIVE" }
    ]
};

// Auto token storage
let sessionToken = "";

// Base64 Token helpers
function generateToken(user) {
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const payload = btoa(JSON.stringify({
        id: user._id,
        username: user.username,
        email: user.email,
        exp: Math.floor(Date.now() / 1000) + 3600
    }));
    const signature = btoa(user.username + "_" + jwtSecret);
    return `${header}.${payload}.${signature}`;
}

// Preset route selection logic
const presetBtns = document.querySelectorAll('.preset-route-btn');
const apiMethod = document.getElementById('api-method');
const apiUrl = document.getElementById('api-url');
const apiReqBody = document.getElementById('api-req-body');
const bodyFormGroup = document.getElementById('body-form-group');

function toggleBodyVisibility(method) {
    if (method === 'GET' || method === 'DELETE') {
        bodyFormGroup.style.display = 'none';
    } else {
        bodyFormGroup.style.display = 'block';
    }
}

// Initialize visibility
toggleBodyVisibility(apiMethod.value);

apiMethod.addEventListener('change', () => {
    toggleBodyVisibility(apiMethod.value);
});

presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        presetBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const method = btn.getAttribute('data-method');
        const url = btn.getAttribute('data-url');
        const body = btn.getAttribute('data-body');
        
        apiMethod.value = method;
        apiUrl.value = url;
        apiReqBody.value = body;
        
        toggleBodyVisibility(method);
    });
});

// Token button helper actions
const authHeaderInput = document.getElementById('api-auth-header');

document.getElementById('btn-inject-auto').addEventListener('click', () => {
    if (sessionToken) {
        authHeaderInput.value = `Bearer ${sessionToken}`;
        appendLog(`[SESSION] Token injected successfully from active login session.`, 'success');
    } else {
        appendLog(`[SESSION] No active token found. Please run the POST /login request first to generate a token.`, 'warn');
    }
});

document.getElementById('btn-clear-token').addEventListener('click', () => {
    authHeaderInput.value = '';
    appendLog(`[MOCK AUTH] Authorization Header cleared.`, 'info');
});

// Database State visualizer rendering helper
const dbCode = document.getElementById('api-db-code');
let currentDbEngine = "mongodb";

const dbEngineSelect = document.getElementById('db-engine-select');
const sqliteQueriesPanel = document.getElementById('sqlite-queries-panel');
const dbConnStatus = document.getElementById('db-conn-status');

function renderDbState(queryResult = null) {
    if (queryResult) {
        dbCode.textContent = JSON.stringify(queryResult, null, 2);
    } else if (currentDbEngine === "mongodb") {
        dbCode.textContent = JSON.stringify(dbState, null, 2);
    } else {
        dbCode.textContent = JSON.stringify(sqliteState, null, 2);
    }
    hljs.highlightElement(dbCode);
}

// Initial DB Render
renderDbState();

dbEngineSelect.addEventListener('change', (e) => {
    currentDbEngine = e.target.value;
    if (currentDbEngine === "mongodb") {
        sqliteQueriesPanel.style.display = "none";
        dbConnStatus.textContent = "DATABASE: mongodb://127.0.0.1:27017/bookshelf";
        dbConnStatus.style.color = "var(--green)";
        appendLog(`[DATABASE] Switched connection to MongoDB (bookshelf).`, 'info');
    } else {
        sqliteQueriesPanel.style.display = "flex";
        dbConnStatus.textContent = "DATABASE: sqlite://warungkas.db";
        dbConnStatus.style.color = "var(--cyan)";
        appendLog(`[DATABASE] Loaded offline-first SQLite connection (warungkas.db).`, 'info');
    }
    renderDbState();
});

// SQLite preset queries execution
document.querySelectorAll('.sql-query-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const query = btn.getAttribute('data-query');
        appendLog(`[SQL ENGINE] Executing: ${query}`, 'success');
        
        let result = [];
        if (query === "SELECT * FROM products;") {
            result = sqliteState.products;
        } else if (query === "SELECT * FROM products WHERE stock < 5;") {
            result = sqliteState.products.filter(p => p.stock < 5);
            appendLog(`[SQL ENGINE] Filtered ${result.length} low-stock products.`, 'warn');
        } else if (query === "SELECT * FROM transactions ORDER BY timestamp DESC LIMIT 5;") {
            result = [...sqliteState.transactions]
                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                .slice(0, 5);
        } else if (query === "SELECT SUM(profit) AS total_profit FROM transactions;") {
            const sum = sqliteState.transactions.reduce((acc, curr) => acc + curr.profit, 0);
            result = [ { total_profit: sum } ];
            appendLog(`[SQL ENGINE] Summed cashier database profit: IDR ${sum}.`, 'success');
        }
        renderDbState(result);
    });
});

// Terminal Tabs Switcher
const tabResponse = document.getElementById('btn-tab-response');
const tabDb = document.getElementById('btn-tab-db');
const panelResponse = document.getElementById('panel-response-container');
const panelDb = document.getElementById('panel-db-container');

tabResponse.addEventListener('click', () => {
    tabResponse.classList.add('active');
    tabDb.classList.remove('active');
    panelResponse.style.display = 'block';
    panelDb.style.display = 'none';
});

tabDb.addEventListener('click', () => {
    tabDb.classList.add('active');
    tabResponse.classList.remove('active');
    panelResponse.style.display = 'none';
    panelDb.style.display = 'block';
    renderDbState();
});

// Terminal Log helper
const termLogs = document.getElementById('terminal-logs');
function appendLog(message, type = 'info') {
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    const time = new Date().toISOString().split('T')[1].substring(0, 8);
    entry.textContent = `[${time}] ${message}`;
    termLogs.appendChild(entry);
    termLogs.scrollTop = termLogs.scrollHeight;
}

// Mock Router Execution Engine
const btnSendRequest = document.getElementById('btn-send-request');
const apiStatusLabel = document.getElementById('api-status-label');
const apiStatusText = document.getElementById('api-status-text');
const apiResponseCode = document.getElementById('api-response-code');

btnSendRequest.addEventListener('click', () => {
    const method = apiMethod.value.toUpperCase();
    const url = apiUrl.value.trim();
    const authHeader = authHeaderInput.value.trim();
    const bodyText = apiReqBody.value.trim();
    
    appendLog(`[ROUTER] Incoming Request: ${method} ${url}`, 'info');
    
    // Simulating network delay latency (500ms)
    btnSendRequest.disabled = true;
    btnSendRequest.innerHTML = `<span class="terminal-cursor" style="margin-right:8px; animation:blink 0.5s infinite;"></span> Processing...`;
    
    setTimeout(() => {
        executeMockRequest(method, url, authHeader, bodyText);
        btnSendRequest.disabled = false;
        btnSendRequest.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
            Send Request
        `;
    }, 500);
});

function executeMockRequest(method, url, authHeader, bodyText) {
    let status = 404;
    let statusStr = "404 Not Found";
    let responseBody = { status: "fail", message: "Halaman tidak ditemukan" };
    
    // Header parsing info log
    appendLog(`[MIDDLEWARE] Parsing incoming headers & payload...`, 'info');
    
    // Authentication Middleware
    let currentUser = null;
    if (authHeader) {
        appendLog(`[MIDDLEWARE: AUTH] Bearer Token detected. Validating JWT signature...`, 'info');
        if (authHeader.startsWith("Bearer ")) {
            const token = authHeader.substring(7).trim();
            const tokenParts = token.split(".");
            if (tokenParts.length === 3) {
                try {
                    const payload = JSON.parse(atob(tokenParts[1]));
                    const expectedSignature = btoa(payload.username + "_" + jwtSecret);
                    if (tokenParts[2] === expectedSignature) {
                        currentUser = payload;
                        appendLog(`[MIDDLEWARE: AUTH] JWT Verified. Active session: ${payload.username} (ID: ${payload.id})`, 'success');
                    } else {
                        appendLog(`[MIDDLEWARE: AUTH] JWT Signature Verification Failed! Token manipulated.`, 'error');
                    }
                } catch (e) {
                    appendLog(`[MIDDLEWARE: AUTH] Failed decoding token payload format.`, 'error');
                }
            } else {
                appendLog(`[MIDDLEWARE: AUTH] Invalid token structure.`, 'error');
            }
        } else {
            appendLog(`[MIDDLEWARE: AUTH] Format header authorization salah. Gunakan 'Bearer <token>'.`, 'warn');
        }
    } else {
        appendLog(`[MIDDLEWARE: AUTH] Anonymous access. No JWT header provided.`, 'info');
    }

    // Parse req body helper
    let parsedBody = {};
    if (method === "POST" || method === "PUT") {
        try {
            parsedBody = JSON.parse(bodyText || "{}");
        } catch (e) {
            status = 400;
            statusStr = "400 Bad Request";
            responseBody = { status: "fail", message: "Format JSON pada request body tidak valid" };
            updateUIState(status, statusStr, responseBody);
            return;
        }
    }

    // ROUTER ENDPOINTS
    
    // POST /register
    if (url === "/register") {
        if (method === "POST") {
            const { email, username, password } = parsedBody;
            if (!email || !username || !password) {
                status = 400;
                statusStr = "400 Bad Request";
                responseBody = { status: "fail", message: "Email, Username, dan Password wajib diisi" };
                appendLog(`[VALIDATOR] Register failed: missing required fields.`, 'warn');
            } else {
                const userExists = dbState.users.some(u => u.username === username || u.email === email);
                if (userExists) {
                    status = 400;
                    statusStr = "400 Bad Request";
                    responseBody = { status: "fail", message: "Email atau Username sudah digunakan" };
                    appendLog(`[VALIDATOR] Register failed: credentials already taken.`, 'warn');
                } else {
                    const newId = "user-" + Math.random().toString(36).substring(2, 11);
                    dbState.users.push({
                        _id: newId,
                        email,
                        username,
                        password: "$2b$10$" + btoa(password).substring(0, 30),
                        books: []
                    });
                    status = 201;
                    statusStr = "201 Created";
                    responseBody = { status: "success", message: "Akun berhasil dibuat" };
                    appendLog(`[CONTROLLER] Account created for user '${username}'. MongoDB collection updated.`, 'success');
                    renderDbState();
                }
            }
        } else {
            status = 405;
            statusStr = "405 Method Not Allowed";
            responseBody = { status: "fail", message: `Method ${method} tidak diperbolehkan` };
        }
    }
    
    // POST /login
    else if (url === "/login") {
        if (method === "POST") {
            const { username, password } = parsedBody;
            if (!username || !password) {
                status = 400;
                statusStr = "400 Bad Request";
                responseBody = { status: "fail", message: "Username dan Password wajib diisi" };
                appendLog(`[VALIDATOR] Login failed: missing fields.`, 'warn');
            } else {
                const foundUser = dbState.users.find(u => u.username === username);
                if (!foundUser) {
                    status = 400;
                    statusStr = "400 Bad Request";
                    responseBody = { status: "fail", message: "Username atau Password salah" };
                    appendLog(`[CONTROLLER] Auth fail: username '${username}' not found.`, 'error');
                } else {
                    if (password === "password123" || foundUser.username === "anthony") {
                        status = 200;
                        statusStr = "200 OK";
                        sessionToken = generateToken(foundUser);
                        responseBody = {
                            status: "success",
                            message: "Login berhasil",
                            data: { token: sessionToken }
                        };
                        appendLog(`[CONTROLLER] Session established. Token generated.`, 'success');
                        appendLog(`[SESSION] Token stored automatically. Ready to inject.`, 'success');
                    } else {
                        status = 400;
                        statusStr = "400 Bad Request";
                        responseBody = { status: "fail", message: "Username atau Password salah" };
                        appendLog(`[CONTROLLER] Auth fail: password mismatch.`, 'error');
                    }
                }
            }
        } else {
            status = 405;
            statusStr = "405 Method Not Allowed";
            responseBody = { status: "fail", message: `Method ${method} tidak diperbolehkan` };
        }
    }
    
    // GET /books & POST /books
    else if (url === "/books") {
        if (!currentUser) {
            status = 401;
            statusStr = "401 Unauthorized";
            responseBody = { status: "fail", message: "Unauthorized" };
            appendLog(`[MIDDLEWARE: AUTH] Request blocked: unauthorized user.`, 'error');
        } else {
            if (method === "GET") {
                appendLog(`[CONTROLLER] Fetching all books from collection...`, 'info');
                const list = dbState.books.map(b => ({
                    id: b._id,
                    name: b.title,
                    publisher: b.publisher
                }));
                status = 200;
                statusStr = "200 OK";
                responseBody = {
                    status: "success",
                    data: { books: list }
                };
                appendLog(`[CONTROLLER] Dispatched collection of ${list.length} book records.`, 'success');
            } 
            else if (method === "POST") {
                const { title, year, author, summary, publisher, pageCount, readPage, reading } = parsedBody;
                
                if (!title) {
                    status = 400;
                    statusStr = "400 Bad Request";
                    responseBody = { status: "fail", message: "Perhatikan lagi title buku bodoh, pake title bukan name" };
                    appendLog(`[VALIDATOR] Missing required field: title.`, 'warn');
                } else if (Number(readPage) > Number(pageCount)) {
                    status = 400;
                    statusStr = "400 Bad Request";
                    responseBody = { status: "fail", message: "jumlah halaman yang dibaca tidak valid dengan jumlah halaman" };
                    appendLog(`[VALIDATOR] Page validation error: readPage exceeds pageCount.`, 'warn');
                } else {
                    const newId = "book-" + Math.random().toString(36).substring(2, 11);
                    const timestamp = new Date().toISOString();
                    const newBook = {
                        _id: newId,
                        title,
                        year: Number(year) || 2026,
                        author,
                        summary,
                        publisher,
                        pageCount: Number(pageCount) || 100,
                        readPage: Number(readPage) || 0,
                        reading: Boolean(reading),
                        finished: Number(readPage) === Number(pageCount),
                        insertedAt: timestamp,
                        updatedAt: timestamp
                    };
                    dbState.books.push(newBook);
                    
                    status = 201;
                    statusStr = "201 Created";
                    responseBody = {
                        status: "success",
                        message: "Buku berhasil ditambahkan",
                        data: { bookId: newId }
                    };
                    appendLog(`[CONTROLLER] Book '${title}' stored. MongoDB state updated.`, 'success');
                    renderDbState();
                }
            } else {
                status = 405;
                statusStr = "405 Method Not Allowed";
                responseBody = { status: "fail", message: `Method ${method} tidak diperbolehkan` };
            }
        }
    }
    
    // GET /books/:id & PUT /books/:id & DELETE /books/:id
    else if (url.startsWith("/books/")) {
        if (!currentUser) {
            status = 401;
            statusStr = "401 Unauthorized";
            responseBody = { status: "fail", message: "Unauthorized" };
            appendLog(`[MIDDLEWARE: AUTH] Request blocked.`, 'error');
        } else {
            const bookId = url.split("/")[2];
            appendLog(`[CONTROLLER] Searching book with ID: ${bookId}`, 'info');
            const foundIndex = dbState.books.findIndex(b => b._id === bookId);
            
            if (foundIndex === -1) {
                status = 404;
                statusStr = "404 Not Found";
                responseBody = { status: "fail", message: "Buku tidak ditemukan" };
                appendLog(`[CONTROLLER] Search fail: book ID '${bookId}' not found.`, 'error');
            } else {
                const existingBook = dbState.books[foundIndex];
                
                if (method === "GET") {
                    status = 200;
                    statusStr = "200 OK";
                    responseBody = {
                        status: "success",
                        data: { book: existingBook }
                    };
                    appendLog(`[CONTROLLER] Dispatching detailed record of '${existingBook.title}'.`, 'success');
                }
                else if (method === "PUT") {
                    const { title, year, author, summary, publisher, pageCount, readPage, reading } = parsedBody;
                    if (!title) {
                        status = 400;
                        statusStr = "400 Bad Request";
                        responseBody = { status: "fail", message: "Perhatikan lagi title buku bodoh, pake title bukan name" };
                        appendLog(`[VALIDATOR] Missing required field: title.`, 'warn');
                    } else if (Number(readPage) > Number(pageCount)) {
                        status = 400;
                        statusStr = "400 Bad Request";
                        responseBody = { status: "fail", message: "jumlah halaman yang dibaca tidak valid dengan jumlah halaman" };
                        appendLog(`[VALIDATOR] Page validation error: readPage exceeds pageCount.`, 'warn');
                    } else {
                        const updatedBook = {
                            ...existingBook,
                            title,
                            year: Number(year) || existingBook.year,
                            author: author || existingBook.author,
                            summary: summary || existingBook.summary,
                            publisher: publisher || existingBook.publisher,
                            pageCount: Number(pageCount) || existingBook.pageCount,
                            readPage: Number(readPage) || existingBook.readPage,
                            reading: reading !== undefined ? Boolean(reading) : existingBook.reading,
                            finished: Number(readPage) === Number(pageCount),
                            updatedAt: new Date().toISOString()
                        };
                        dbState.books[foundIndex] = updatedBook;
                        status = 200;
                        statusStr = "200 OK";
                        responseBody = {
                            status: "success",
                            message: "Buku berhasil diperbarui"
                        };
                        appendLog(`[CONTROLLER] Book '${title}' updated in collection.`, 'success');
                        renderDbState();
                    }
                }
                else if (method === "DELETE") {
                    dbState.books.splice(foundIndex, 1);
                    status = 200;
                    statusStr = "200 OK";
                    responseBody = {
                        status: "success",
                        message: "Buku berhasil dihapus"
                    };
                    appendLog(`[CONTROLLER] Document deleted from MongoDB.`, 'success');
                    renderDbState();
                } else {
                    status = 405;
                    statusStr = "405 Method Not Allowed";
                    responseBody = { status: "fail", message: `Method ${method} tidak diperbolehkan` };
                }
            }
        }
    }
    
    // GET /user/books (user's personal list)
    else if (url === "/user/books") {
        if (!currentUser) {
            status = 401;
            statusStr = "401 Unauthorized";
            responseBody = { status: "fail", message: "Unauthorized" };
            appendLog(`[MIDDLEWARE: AUTH] Request blocked.`, 'error');
        } else {
            if (method === "GET") {
                const foundUser = dbState.users.find(u => u.username === currentUser.username);
                if (!foundUser) {
                    status = 404;
                    statusStr = "404 Not Found";
                    responseBody = { status: "fail", message: "User tidak ditemukan" };
                } else {
                    status = 200;
                    statusStr = "200 OK";
                    responseBody = {
                        status: "success",
                        data: { books: foundUser.books }
                    };
                    appendLog(`[CONTROLLER] User books retrieved successfully for '${currentUser.username}'.`, 'success');
                }
            } else {
                status = 405;
                statusStr = "405 Method Not Allowed";
                responseBody = { status: "fail", message: `Method ${method} tidak diperbolehkan` };
            }
        }
    }
    
    // POST /user/books/:id (adds book to user's list)
    else if (url.startsWith("/user/books/")) {
        if (!currentUser) {
            status = 401;
            statusStr = "401 Unauthorized";
            responseBody = { status: "fail", message: "Unauthorized" };
            appendLog(`[MIDDLEWARE: AUTH] Request blocked.`, 'error');
        } else {
            const bookId = url.split("/")[3];
            const foundUser = dbState.users.find(u => u.username === currentUser.username);
            const foundBook = dbState.books.find(b => b._id === bookId);
            
            if (!foundBook) {
                status = 404;
                statusStr = "404 Not Found";
                responseBody = { status: "fail", message: "Buku tidak ditemukan" };
                appendLog(`[CONTROLLER] Add to list fail: book '${bookId}' does not exist.`, 'error');
            } else if (!foundUser) {
                status = 404;
                statusStr = "404 Not Found";
                responseBody = { status: "fail", message: "User tidak ditemukan" };
            } else {
                if (method === "POST") {
                    const alreadyAdded = foundUser.books.some(b => b.bookId === bookId);
                    if (alreadyAdded) {
                        status = 400;
                        statusStr = "400 Bad Request";
                        responseBody = { status: "fail", message: "Buku sudah ada di daftar Anda" };
                        appendLog(`[CONTROLLER] Book already present in user list.`, 'warn');
                    } else {
                        foundUser.books.push({
                            bookId: foundBook._id,
                            title: foundBook.title,
                            author: foundBook.author,
                            addedAt: new Date().toISOString()
                        });
                        status = 201;
                        statusStr = "201 Created";
                        responseBody = {
                            status: "success",
                            message: "Buku berhasil ditambahkan",
                            data: { books: foundUser.books }
                        };
                        appendLog(`[CONTROLLER] Book '${foundBook.title}' added to user '${currentUser.username}' collection.`, 'success');
                        renderDbState();
                    }
                } else {
                    status = 405;
                    statusStr = "405 Method Not Allowed";
                    responseBody = { status: "fail", message: `Method ${method} tidak diperbolehkan` };
                }
            }
        }
    }

    updateUIState(status, statusStr, responseBody);
}

function updateUIState(status, statusStr, responseBody) {
    apiStatusText.textContent = statusStr;
    apiStatusLabel.className = "api-status-indicator";
    
    if (status === 200 || status === 201) {
        apiStatusLabel.classList.add("status-success");
        appendLog(`[SERVER] Dispatched response: ${statusStr}. Connection Idle.`, 'success');
    } else if (status === 401 || status === 403) {
        apiStatusLabel.classList.add("status-unauth");
        appendLog(`[SERVER] Dispatched response: ${statusStr}. Security block active.`, 'warn');
    } else {
        apiStatusLabel.classList.add("status-error");
        appendLog(`[SERVER] Dispatched response: ${statusStr}.`, 'error');
    }

    apiResponseCode.textContent = JSON.stringify(responseBody, null, 2);
    hljs.highlightElement(apiResponseCode);
}

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
