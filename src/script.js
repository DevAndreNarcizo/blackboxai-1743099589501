// Constants
const TIMEOUT_DURATION = 5000; // 5 seconds for turnstile to remain open
const MAX_LOGIN_ATTEMPTS = 3;
let loginAttempts = 0;

// DOM Elements
const authForm = document.getElementById('authForm');
const turnstileStatus = document.getElementById('turnstileStatus');
const statusText = document.getElementById('status');
const lastAccess = document.getElementById('lastAccess');
const logContainer = document.getElementById('logContainer');
const datetimeDisplay = document.getElementById('datetime');

// Mock user data (in real system, this would be server-side)
const validCredentials = {
    'admin': 'admin123',
    '12345': 'unip2024',
    '67890': 'student123'
};

// Initialize the system
document.addEventListener('DOMContentLoaded', () => {
    updateDateTime();
    setInterval(updateDateTime, 1000);
    addLogEntry('Sistema iniciado', 'info');
});

// Update datetime display
function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    datetimeDisplay.textContent = now.toLocaleDateString('pt-BR', options);
}

// Authentication form submission
authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const userId = document.getElementById('userId').value;
    const password = document.getElementById('password').value;
    
    try {
        await authenticateUser(userId, password);
    } catch (error) {
        handleAuthError(error);
    }
});

// User authentication
async function authenticateUser(userId, password) {
    // Simulate server delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const button = authForm.querySelector('button');
    button.classList.add('loading');
    
    if (loginAttempts >= MAX_LOGIN_ATTEMPTS) {
        button.classList.remove('loading');
        throw new Error('Número máximo de tentativas excedido. Sistema bloqueado temporariamente.');
    }
    
    if (validCredentials[userId] === password) {
        loginSuccess();
        button.classList.remove('loading');
        return true;
    } else {
        loginAttempts++;
        button.classList.remove('loading');
        throw new Error('Credenciais inválidas');
    }
}

// Handle successful login
function loginSuccess() {
    addLogEntry('Autenticação bem-sucedida', 'success');
    loginAttempts = 0;
    authForm.reset();
    
    // Update UI
    turnstileStatus.classList.remove('locked');
    turnstileStatus.classList.add('unlocked');
    turnstileStatus.querySelector('i').classList.remove('fa-lock');
    turnstileStatus.querySelector('i').classList.add('fa-lock-open');
    statusText.textContent = 'Liberada';
    
    // Update last access
    const now = new Date();
    lastAccess.textContent = `Último acesso: ${now.toLocaleString('pt-BR')}`;
    
    // Auto-lock after timeout
    setTimeout(lockTurnstile, TIMEOUT_DURATION);
    
    // Success feedback
    turnstileStatus.classList.add('success-feedback');
    setTimeout(() => {
        turnstileStatus.classList.remove('success-feedback');
    }, 1000);
}

// Handle authentication errors
function handleAuthError(error) {
    addLogEntry(`Erro de autenticação: ${error.message}`, 'error');
    
    // Visual feedback
    authForm.classList.add('error-shake');
    setTimeout(() => {
        authForm.classList.remove('error-shake');
    }, 400);
    
    // Update attempts remaining
    const remainingAttempts = MAX_LOGIN_ATTEMPTS - loginAttempts;
    if (remainingAttempts > 0) {
        addLogEntry(`Tentativas restantes: ${remainingAttempts}`, 'warning');
    } else {
        addLogEntry('Sistema bloqueado temporariamente', 'error');
        setTimeout(() => {
            loginAttempts = 0;
            addLogEntry('Sistema desbloqueado', 'info');
        }, 30000); // 30 seconds timeout
    }
}

// Lock turnstile
function lockTurnstile() {
    turnstileStatus.classList.remove('unlocked');
    turnstileStatus.classList.add('locked');
    turnstileStatus.querySelector('i').classList.remove('fa-lock-open');
    turnstileStatus.querySelector('i').classList.add('fa-lock');
    statusText.textContent = 'Bloqueada';
    addLogEntry('Catraca bloqueada automaticamente', 'info');
}

// Add log entry
function addLogEntry(message, type = 'info') {
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    
    const timestamp = new Date().toLocaleTimeString('pt-BR');
    const icon = getLogIcon(type);
    
    entry.innerHTML = `
        <span class="text-gray-500">[${timestamp}]</span>
        <i class="${icon} mr-2"></i>
        ${message}
    `;
    
    logContainer.insertBefore(entry, logContainer.firstChild);
    
    // Limit log entries
    if (logContainer.children.length > 50) {
        logContainer.removeChild(logContainer.lastChild);
    }
}

// Get icon for log type
function getLogIcon(type) {
    switch (type) {
        case 'success':
            return 'fas fa-check-circle';
        case 'error':
            return 'fas fa-exclamation-circle';
        case 'warning':
            return 'fas fa-exclamation-triangle';
        default:
            return 'fas fa-info-circle';
    }
}

// Error handling
window.addEventListener('error', (event) => {
    addLogEntry(`Erro do sistema: ${event.message}`, 'error');
});

// Prevent form submission on enter key
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'BUTTON') {
        e.preventDefault();
    }
});

// Initialize system state
lockTurnstile();
addLogEntry('Sistema pronto para uso', 'info');