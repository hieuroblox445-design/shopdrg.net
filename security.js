// Security System
class SecuritySystem {
    constructor() {
        this.init();
    }

    init() {
        this.setupSecurityHeaders();
        this.preventXSS();
        this.setupCSRFProtection();
        this.monitorSuspiciousActivity();
    }

    setupSecurityHeaders() {
        // Add security headers to all requests
        const meta = document.createElement('meta');
        meta.httpEquiv = "Content-Security-Policy";
        meta.content = "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src 'self' https://fonts.gstatic.com;";
        document.head.appendChild(meta);
    }

    preventXSS() {
        // Sanitize user input
        document.addEventListener('DOMContentLoaded', () => {
            this.sanitizeForms();
        });
    }

    sanitizeForms() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                const inputs = form.querySelectorAll('input, textarea, select');
                let hasMaliciousInput = false;

                inputs.forEach(input => {
                    const sanitized = this.sanitizeInput(input.value);
                    if (sanitized !== input.value) {
                        input.value = sanitized;
                        hasMaliciousInput = true;
                    }
                });

                if (hasMaliciousInput) {
                    window.authSystem.showMessage('Đã phát hiện nội dung không hợp lệ và tự động sửa!', 'warning');
                }
            });
        });
    }

    sanitizeInput(input) {
        if (typeof input !== 'string') return input;
        
        return input
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/'/g, '&#x27;')
            .replace(/"/g, '&quot;')
            .replace(/\//g, '&#x2F;')
            .replace(/\\/g, '&#x5C;')
            .replace(/`/g, '&#x60;');
    }

    setupCSRFProtection() {
        // Add CSRF token to all forms
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            const token = this.generateCSRFToken();
            const tokenInput = document.createElement('input');
            tokenInput.type = 'hidden';
            tokenInput.name = 'csrf_token';
            tokenInput.value = token;
            form.appendChild(tokenInput);
        });
    }

    generateCSRFToken() {
        const token = Math.random().toString(36).substr(2) + Date.now().toString(36);
        sessionStorage.setItem('csrf_token', token);
        return token;
    }

    validateCSRFToken(token) {
        const storedToken = sessionStorage.getItem('csrf_token');
        return token === storedToken;
    }

    monitorSuspiciousActivity() {
        // Monitor for multiple failed login attempts
        let failedAttempts = 0;
        const maxAttempts = 5;

        document.addEventListener('DOMContentLoaded', () => {
            const loginForm = document.getElementById('loginForm');
            if (loginForm) {
                loginForm.addEventListener('submit', (e) => {
                    const csrfToken = e.target.querySelector('input[name="csrf_token"]').value;
                    
                    if (!this.validateCSRFToken(csrfToken)) {
                        e.preventDefault();
                        this.logSuspiciousActivity('CSRF Token mismatch');
                        return;
                    }
                });
            }
        });

        // Log page views and actions
        this.logPageView();
    }

    logSuspiciousActivity(message) {
        const log = {
            timestamp: new Date().toISOString(),
            message: message,
            userAgent: navigator.userAgent,
            ip: 'N/A' // In real implementation, get from server
        };

        const logs = JSON.parse(localStorage.getItem('security_logs') || '[]');
        logs.push(log);
        localStorage.setItem('security_logs', JSON.stringify(logs));

        console.warn('SECURITY WARNING:', message);
    }

    logPageView() {
        const pageView = {
            timestamp: new Date().toISOString(),
            page: window.location.pathname,
            referrer: document.referrer,
            userAgent: navigator.userAgent
        };

        const pageViews = JSON.parse(localStorage.getItem('page_views') || '[]');
        pageViews.push(pageView);
        localStorage.setItem('page_views', JSON.stringify(pageViews));
    }

    // Data encryption (basic example)
    encryptData(data) {
        // In real implementation, use proper encryption
        return btoa(JSON.stringify(data));
    }

    decryptData(encryptedData) {
        try {
            return JSON.parse(atob(encryptedData));
        } catch (e) {
            return null;
        }
    }

    // Session management
    startSession(user) {
        const session = {
            id: 'session_' + Date.now(),
            userId: user.id,
            startTime: new Date().toISOString(),
            lastActivity: new Date().toISOString(),
            ip: 'N/A'
        };

        sessionStorage.setItem('current_session', JSON.stringify(session));
        
        const sessions = JSON.parse(localStorage.getItem('user_sessions') || '[]');
        sessions.push(session);
        localStorage.setItem('user_sessions', JSON.stringify(sessions));
    }

    endSession() {
        const session = JSON.parse(sessionStorage.getItem('current_session') || '{}');
        if (session.id) {
            session.endTime = new Date().toISOString();
            
            const sessions = JSON.parse(localStorage.getItem('user_sessions') || '[]');
            const sessionIndex = sessions.findIndex(s => s.id === session.id);
            if (sessionIndex !== -1) {
                sessions[sessionIndex] = session;
                localStorage.setItem('user_sessions', JSON.stringify(sessions));
            }
        }

        sessionStorage.removeItem('current_session');
    }

    // Input validation helpers
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    validatePhone(phone) {
        const re = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
        return re.test(phone);
    }

    validateCardNumber(number) {
        // Basic card number validation
        const re = /^\d{10,20}$/;
        return re.test(number.replace(/\s/g, ''));
    }
}

// Initialize security system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.securitySystem = new SecuritySystem();
});

// Enhanced security for sensitive operations
function secureOperation(operation, requiredRole = null) {
    return function(...args) {
        // Check authentication
        if (!window.authSystem || !window.authSystem.currentUser) {
            window.authSystem.showMessage('Vui lòng đăng nhập để thực hiện thao tác này!', 'error');
            return false;
        }

        // Check role permissions
        if (requiredRole && window.authSystem.currentUser.role !== requiredRole) {
            window.authSystem.showMessage('Bạn không có quyền thực hiện thao tác này!', 'error');
            return false;
        }

        // Log the operation
        window.securitySystem.logSuspiciousActivity(
            `User ${window.authSystem.currentUser.username} performed: ${operation.name}`
        );

        // Execute the operation
        return operation.apply(this, args);
    };
}
