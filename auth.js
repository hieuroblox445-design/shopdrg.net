// Authentication System
class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.users = this.loadUsers();
        this.init();
    }

    init() {
        this.checkLoginStatus();
        this.setupEventListeners();
    }

    loadUsers() {
        const savedUsers = localStorage.getItem('shop_users');
        if (savedUsers) {
            return JSON.parse(savedUsers);
        }

        // Default users (in production, these should be stored securely)
        const defaultUsers = [
            {
                id: 1,
                username: 'owner',
                email: 'owner@robloxaccshop.com',
                password: this.hashPassword('owner123'),
                role: 'owner',
                balance: 15780000,
                registeredAt: new Date().toISOString(),
                isActive: true
            },
            {
                id: 2,
                username: 'admin',
                email: 'admin@robloxaccshop.com',
                password: this.hashPassword('admin123'),
                role: 'admin',
                balance: 0,
                registeredAt: new Date().toISOString(),
                isActive: true
            },
            {
                id: 3,
                username: 'ctv',
                email: 'ctv@robloxaccshop.com',
                password: this.hashPassword('ctv123'),
                role: 'ctv',
                balance: 0,
                registeredAt: new Date().toISOString(),
                isActive: true
            }
        ];

        this.saveUsers(defaultUsers);
        return defaultUsers;
    }

    saveUsers(users) {
        localStorage.setItem('shop_users', JSON.stringify(users));
    }

    hashPassword(password) {
        // Simple hash function for demo (use proper hashing in production)
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString();
    }

    checkLoginStatus() {
        const savedUser = localStorage.getItem('current_user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.updateUI();
        }
    }

    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        // Register form
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleRegister();
            });
        }

        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.handleLogout();
            });
        }
    }

    handleLogin() {
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        
        const user = this.users.find(u => 
            (u.username === username || u.email === username) && 
            u.password === this.hashPassword(password) &&
            u.isActive
        );

        if (user) {
            this.currentUser = user;
            localStorage.setItem('current_user', JSON.stringify(user));
            this.updateUI();
            
            // Show success message
            this.showMessage('Đăng nhập thành công!', 'success');
            
            // Close modal
            const loginModal = document.getElementById('loginModal');
            if (loginModal) loginModal.classList.remove('active');
            
            // Redirect to admin panel if admin/owner/ctv
            if (this.isAdminPage() && this.hasAdminAccess()) {
                // Already on admin page
            } else if (this.hasAdminAccess()) {
                setTimeout(() => {
                    window.location.href = 'trangquantri.html';
                }, 1000);
            }
        } else {
            this.showMessage('Tên đăng nhập hoặc mật khẩu không đúng!', 'error');
        }
    }

    handleRegister() {
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;

        // Validation
        if (password !== confirmPassword) {
            this.showMessage('Mật khẩu xác nhận không khớp!', 'error');
            return;
        }

        if (this.users.find(u => u.username === username)) {
            this.showMessage('Tên đăng nhập đã tồn tại!', 'error');
            return;
        }

        if (this.users.find(u => u.email === email)) {
            this.showMessage('Email đã được sử dụng!', 'error');
            return;
        }

        // Create new user
        const newUser = {
            id: this.users.length + 1,
            username,
            email,
            password: this.hashPassword(password),
            role: 'user',
            balance: 0,
            registeredAt: new Date().toISOString(),
            isActive: true
        };

        this.users.push(newUser);
        this.saveUsers(this.users);
        
        this.showMessage('Đăng ký thành công! Vui lòng đăng nhập.', 'success');
        
        // Switch to login form
        const registerModal = document.getElementById('registerModal');
        const loginModal = document.getElementById('loginModal');
        if (registerModal && loginModal) {
            registerModal.classList.remove('active');
            loginModal.classList.add('active');
        }
    }

    handleLogout() {
        this.currentUser = null;
        localStorage.removeItem('current_user');
        this.updateUI();
        
        // Redirect to shop page if on admin page
        if (this.isAdminPage()) {
            window.location.href = 'shop.html';
        }
    }

    updateUI() {
        // Update header based on login status
        const loginBtn = document.getElementById('loginBtn');
        const registerBtn = document.getElementById('registerBtn');
        const adminName = document.getElementById('adminName');
        const adminRole = document.getElementById('adminRole');

        if (this.currentUser) {
            // User is logged in
            if (loginBtn && registerBtn) {
                loginBtn.style.display = 'none';
                registerBtn.style.display = 'none';
                
                // Create user menu
                const userMenu = document.createElement('div');
                userMenu.className = 'user-menu';
                userMenu.innerHTML = `
                    <div class="user-greeting">
                        Xin chào, <strong>${this.currentUser.username}</strong>
                        ${this.hasAdminAccess() ? 
                            `<a href="trangquantri.html" class="admin-link">Quản trị</a>` : 
                            ''
                        }
                        <button class="btn-logout-header">Đăng xuất</button>
                    </div>
                `;
                
                const headerActions = document.querySelector('.header-actions');
                if (headerActions) {
                    headerActions.appendChild(userMenu);
                    
                    // Add logout event
                    userMenu.querySelector('.btn-logout-header').addEventListener('click', () => {
                        this.handleLogout();
                    });
                }
            }

            // Update admin panel
            if (adminName && adminRole) {
                adminName.textContent = this.currentUser.username;
                adminRole.textContent = this.getRoleDisplayName(this.currentUser.role);
            }

            // Check admin access
            if (this.isAdminPage() && !this.hasAdminAccess()) {
                this.showMessage('Bạn không có quyền truy cập trang quản trị!', 'error');
                setTimeout(() => {
                    window.location.href = 'shop.html';
                }, 2000);
            }

            // Update withdraw section visibility
            this.updateWithdrawSection();

        } else {
            // User is not logged in
            if (loginBtn && registerBtn) {
                loginBtn.style.display = 'block';
                registerBtn.style.display = 'block';
                
                const userMenu = document.querySelector('.user-menu');
                if (userMenu) {
                    userMenu.remove();
                }
            }

            // Redirect from admin pages if not logged in
            if (this.isAdminPage()) {
                this.showMessage('Vui lòng đăng nhập để tiếp tục!', 'error');
                setTimeout(() => {
                    window.location.href = 'shop.html';
                }, 2000);
            }
        }
    }

    hasAdminAccess() {
        if (!this.currentUser) return false;
        return ['owner', 'admin', 'ctv'].includes(this.currentUser.role);
    }

    hasOwnerAccess() {
        return this.currentUser && this.currentUser.role === 'owner';
    }

    canAddProducts() {
        return this.currentUser && ['owner', 'admin', 'ctv'].includes(this.currentUser.role);
    }

    canAddPromoCodes() {
        return this.currentUser && ['owner', 'admin'].includes(this.currentUser.role);
    }

    canWithdraw() {
        return this.currentUser && this.currentUser.role === 'owner';
    }

    isAdminPage() {
        return window.location.pathname.includes('trangquantri.html') || 
               window.location.pathname.includes('accowner.html');
    }

    getRoleDisplayName(role) {
        const roles = {
            'owner': 'Owner',
            'admin': 'Quản trị viên',
            'ctv': 'Cộng tác viên',
            'user': 'Người dùng'
        };
        return roles[role] || role;
    }

    updateWithdrawSection() {
        const withdrawTab = document.getElementById('withdrawTab');
        if (withdrawTab) {
            if (!this.canWithdraw()) {
                withdrawTab.style.display = 'none';
                
                // Remove withdraw from sidebar
                const withdrawNav = document.querySelector('[data-tab="withdraw"]');
                if (withdrawNav) {
                    withdrawNav.style.display = 'none';
                }
            } else {
                withdrawTab.style.display = 'block';
            }
        }
    }

    showMessage(message, type) {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.message-alert');
        existingMessages.forEach(msg => msg.remove());

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `message-alert message-${type}`;
        messageDiv.innerHTML = `
            <span>${message}</span>
            <button class="message-close">&times;</button>
        `;

        // Add styles
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 15px;
            max-width: 400px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            animation: slideInRight 0.3s ease;
        `;

        if (type === 'success') {
            messageDiv.style.backgroundColor = '#00b894';
        } else if (type === 'error') {
            messageDiv.style.backgroundColor = '#e17055';
        } else {
            messageDiv.style.backgroundColor = '#6c5ce7';
        }

        // Close button
        messageDiv.querySelector('.message-close').addEventListener('click', () => {
            messageDiv.remove();
        });

        document.body.appendChild(messageDiv);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }
}

// Initialize auth system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.authSystem = new AuthSystem();
});

// Add CSS for messages
const messageStyles = `
@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.message-alert .message-close {
    background: none;
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.admin-link {
    color: #6c5ce7;
    text-decoration: none;
    margin-left: 10px;
    padding: 5px 10px;
    border: 1px solid #6c5ce7;
    border-radius: 4px;
    font-size: 0.9rem;
}

.admin-link:hover {
    background-color: #6c5ce7;
    color: white;
}

.user-greeting {
    display: flex;
    align-items: center;
    gap: 10px;
}

.btn-logout-header {
    background: none;
    border: 1px solid #e17055;
    color: #e17055;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
}

.btn-logout-header:hover {
    background-color: #e17055;
    color: white;
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = messageStyles;
document.head.appendChild(styleSheet);
