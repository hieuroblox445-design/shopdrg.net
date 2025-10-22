// Admin Management System
class AdminSystem {
    constructor() {
        this.products = this.loadProducts();
        this.transactions = this.loadTransactions();
        this.promoCodes = this.loadPromoCodes();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadDashboardData();
        this.loadProductsTable();
        this.loadTransactionsTable();
        this.loadUsersTable();
        this.loadPromoCodesTable();
        this.loadWithdrawHistory();
        this.initCharts();
    }

    // Data Management
    loadProducts() {
        const saved = localStorage.getItem('shop_products');
        if (saved) return JSON.parse(saved);
        
        // Default products
        const defaultProducts = [
            {
                id: 1,
                name: "Roblox Premium VIP",
                description: "Tài khoản Roblox Premium với nhiều item độc quyền",
                price: 250000,
                originalPrice: 300000,
                image: "https://via.placeholder.com/300x200/6c5ce7/ffffff?text=Roblox+VIP",
                category: "vip",
                stock: 5,
                status: "active",
                features: ["Hơn 1000 Robux", "10+ Limited Items", "Avatar độc quyền", "Full gamepasses"],
                createdAt: new Date().toISOString()
            }
        ];
        
        this.saveProducts(defaultProducts);
        return defaultProducts;
    }

    saveProducts(products) {
        localStorage.setItem('shop_products', JSON.stringify(products));
    }

    loadTransactions() {
        const saved = localStorage.getItem('shop_transactions');
        return saved ? JSON.parse(saved) : [];
    }

    saveTransactions(transactions) {
        localStorage.setItem('shop_transactions', JSON.stringify(transactions));
    }

    loadPromoCodes() {
        const saved = localStorage.getItem('shop_promocodes');
        return saved ? JSON.parse(saved) : [];
    }

    savePromoCodes(promoCodes) {
        localStorage.setItem('shop_promocodes', JSON.stringify(promoCodes));
    }

    // Event Listeners
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchTab(item.getAttribute('data-tab'));
            });
        });

        // Sidebar toggle
        const sidebarToggle = document.getElementById('sidebarToggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                document.querySelector('.sidebar').classList.toggle('collapsed');
            });
        }

        // Add product
        const addProductBtn = document.getElementById('addProductBtn');
        if (addProductBtn) {
            addProductBtn.addEventListener('click', () => {
                this.showAddProductModal();
            });
        }

        // Add product form
        const addProductForm = document.getElementById('addProductForm');
        if (addProductForm) {
            addProductForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleAddProduct();
            });
        }

        // Add feature
        const addFeatureBtn = document.getElementById('addFeatureBtn');
        if (addFeatureBtn) {
            addFeatureBtn.addEventListener('click', () => {
                this.addFeatureField();
            });
        }

        // Add promo code
        const addPromoBtn = document.getElementById('addPromoBtn');
        if (addPromoBtn) {
            addPromoBtn.addEventListener('click', () => {
                this.showAddPromoModal();
            });
        }

        // Add promo form
        const addPromoForm = document.getElementById('addPromoForm');
        if (addPromoForm) {
            addPromoForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleAddPromoCode();
            });
        }

        // Withdraw form
        const withdrawForm = document.getElementById('withdrawForm');
        if (withdrawForm) {
            withdrawForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleWithdraw();
            });
        }

        // Refresh button
        const refreshBtn = document.getElementById('refreshBtn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.refreshData();
            });
        }

        // Modal close buttons
        document.querySelectorAll('.modal .close, .btn-secondary').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = btn.closest('.modal');
                if (modal) modal.classList.remove('active');
            });
        });

        // Transaction filter
        const transactionFilter = document.getElementById('transactionFilter');
        if (transactionFilter) {
            transactionFilter.addEventListener('change', () => {
                this.loadTransactionsTable();
            });
        }

        // User role filter
        const userRoleFilter = document.getElementById('userRoleFilter');
        if (userRoleFilter) {
            userRoleFilter.addEventListener('change', () => {
                this.loadUsersTable();
            });
        }
    }

    // Tab Management
    switchTab(tabName) {
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}Tab`).classList.add('active');

        // Update page title
        const pageTitle = document.getElementById('pageTitle');
        if (pageTitle) {
            const titles = {
                'dashboard': 'Tổng quan',
                'products': 'Quản lý Acc',
                'transactions': 'Giao dịch',
                'users': 'Người dùng',
                'promo': 'Mã giảm giá',
                'withdraw': 'Rút tiền',
                'settings': 'Cài đặt'
            };
            pageTitle.textContent = titles[tabName] || tabName;
        }
    }

    // Dashboard
    loadDashboardData() {
        // Calculate stats
        const totalIncome = this.transactions
            .filter(t => t.status === 'success')
            .reduce((sum, t) => sum + t.amount, 0);

        const totalSales = this.transactions
            .filter(t => t.status === 'success' && t.type === 'product')
            .length;

        const totalUsers = window.authSystem ? window.authSystem.users.length : 0;
        const pendingOrders = this.transactions.filter(t => t.status === 'pending').length;

        // Update UI
        this.updateElement('totalIncome', this.formatCurrency(totalIncome));
        this.updateElement('totalSales', totalSales.toString());
        this.updateElement('totalUsers', totalUsers.toString());
        this.updateElement('pendingOrders', pendingOrders.toString());
    }

    // Products Management
    loadProductsTable() {
        const tbody = document.getElementById('productsTableBody');
        if (!tbody) return;

        tbody.innerHTML = this.products.map(product => `
            <tr>
                <td>${product.id}</td>
                <td>
                    <img src="${product.image}" alt="${product.name}" style="width: 50px; height: 35px; object-fit: cover; border-radius: 4px;">
                </td>
                <td>${product.name}</td>
                <td>
                    <span class="category-badge ${product.category}">
                        ${this.getCategoryName(product.category)}
                    </span>
                </td>
                <td>${this.formatCurrency(product.price)}</td>
                <td>${product.stock}</td>
                <td>
                    <span class="status-badge status-${product.status}">
                        ${this.getStatusName(product.status)}
                    </span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action edit-product" data-id="${product.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-action delete-product" data-id="${product.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

        // Add event listeners
        this.addProductEventListeners();
    }

    showAddProductModal() {
        if (!window.authSystem.canAddProducts()) {
            window.authSystem.showMessage('Bạn không có quyền thêm sản phẩm!', 'error');
            return;
        }

        document.getElementById('addProductModal').classList.add('active');
        document.getElementById('addProductForm').reset();
        
        // Reset features
        const featuresContainer = document.getElementById('productFeatures');
        featuresContainer.innerHTML = `
            <div class="feature-input">
                <input type="text" placeholder="Thông tin (ví dụ: 1000 Robux)" class="feature-field">
                <button type="button" class="btn-remove-feature">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
    }

    handleAddProduct() {
        const formData = new FormData(document.getElementById('addProductForm'));
        const features = Array.from(document.querySelectorAll('.feature-field'))
            .map(input => input.value)
            .filter(value => value.trim() !== '');

        const newProduct = {
            id: this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1,
            name: document.getElementById('productName').value,
            description: document.getElementById('productDescription').value,
            price: parseInt(document.getElementById('productPrice').value),
            originalPrice: parseInt(document.getElementById('productPrice').value) * 1.2,
            image: document.getElementById('productImage').value || 'https://via.placeholder.com/300x200/6c5ce7/ffffff?text=Roblox+Account',
            category: document.getElementById('productCategory').value,
            stock: parseInt(document.getElementById('productStock').value),
            status: 'active',
            features: features,
            createdAt: new Date().toISOString()
        };

        this.products.push(newProduct);
        this.saveProducts(this.products);
        
        window.authSystem.showMessage('Thêm tài khoản thành công!', 'success');
        document.getElementById('addProductModal').classList.remove('active');
        this.loadProductsTable();
    }

    addFeatureField() {
        const featuresContainer = document.getElementById('productFeatures');
        const featureInput = document.createElement('div');
        featureInput.className = 'feature-input';
        featureInput.innerHTML = `
            <input type="text" placeholder="Thông tin (ví dụ: 1000 Robux)" class="feature-field">
            <button type="button" class="btn-remove-feature">
                <i class="fas fa-times"></i>
            </button>
        `;
        featuresContainer.appendChild(featureInput);

        // Add remove event
        featureInput.querySelector('.btn-remove-feature').addEventListener('click', function() {
            featureInput.remove();
        });
    }

    // Promo Codes Management
    loadPromoCodesTable() {
        const tbody = document.getElementById('promoTableBody');
        if (!tbody) return;

        tbody.innerHTML = this.promoCodes.map(promo => `
            <tr>
                <td><strong>${promo.code}</strong></td>
                <td>
                    ${promo.type === 'percentage' ? 
                        `${promo.value}%` : 
                        this.formatCurrency(promo.value)
                    }
                </td>
                <td>${promo.maxUsage}</td>
                <td>${promo.usedCount || 0}</td>
                <td>${promo.expiryDate ? new Date(promo.expiryDate).toLocaleDateString('vi-VN') : 'Không giới hạn'}</td>
                <td>
                    <span class="status-badge status-${promo.isActive ? 'active' : 'inactive'}">
                        ${promo.isActive ? 'Hoạt động' : 'Đã tắt'}
                    </span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action toggle-promo" data-id="${promo.code}">
                            <i class="fas fa-power-off"></i>
                        </button>
                        <button class="btn-action delete-promo" data-id="${promo.code}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

        this.addPromoEventListeners();
    }

    showAddPromoModal() {
        if (!window.authSystem.canAddPromoCodes()) {
            window.authSystem.showMessage('Bạn không có quyền thêm mã giảm giá!', 'error');
            return;
        }

        document.getElementById('addPromoModal').classList.add('active');
        document.getElementById('addPromoForm').reset();
    }

    handleAddPromoCode() {
        const formData = new FormData(document.getElementById('addPromoForm'));
        
        const newPromo = {
            code: document.getElementById('promoCode').value.toUpperCase(),
            type: document.getElementById('discountType').value,
            value: parseInt(document.getElementById('discountValue').value),
            maxUsage: parseInt(document.getElementById('maxUsage').value) || 100,
            usedCount: 0,
            expiryDate: document.getElementById('expiryDate').value || null,
            isActive: true,
            createdAt: new Date().toISOString()
        };

        this.promoCodes.push(newPromo);
        this.savePromoCodes(this.promoCodes);
        
        window.authSystem.showMessage('Thêm mã giảm giá thành công!', 'success');
        document.getElementById('addPromoModal').classList.remove('active');
        this.loadPromoCodesTable();
    }

    // Withdraw Management
    handleWithdraw() {
        if (!window.authSystem.canWithdraw()) {
            window.authSystem.showMessage('Chỉ Owner mới có quyền rút tiền!', 'error');
            return;
        }

        const amount = parseInt(document.getElementById('withdrawAmount').value);
        const method = document.getElementById('withdrawMethod').value;
        const accountInfo = document.getElementById('accountInfo').value;
        const accountName = document.getElementById('accountName').value;

        // Create withdraw record
        const withdrawRecord = {
            id: 'WD' + Date.now(),
            amount: amount,
            method: method,
            accountInfo: accountInfo,
            accountName: accountName,
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        // Save to localStorage
        const withdrawHistory = JSON.parse(localStorage.getItem('withdraw_history') || '[]');
        withdrawHistory.push(withdrawRecord);
        localStorage.setItem('withdraw_history', JSON.stringify(withdrawHistory));

        window.authSystem.showMessage('Yêu cầu rút tiền đã được gửi!', 'success');
        document.getElementById('withdrawForm').reset();
        this.loadWithdrawHistory();
    }

    loadWithdrawHistory() {
        const tbody = document.getElementById('withdrawHistoryBody');
        if (!tbody) return;

        const withdrawHistory = JSON.parse(localStorage.getItem('withdraw_history') || '[]');
        
        tbody.innerHTML = withdrawHistory.map(record => `
            <tr>
                <td>${record.id}</td>
                <td>${this.formatCurrency(record.amount)}</td>
                <td>${this.getWithdrawMethodName(record.method)}</td>
                <td>${new Date(record.createdAt).toLocaleString('vi-VN')}</td>
                <td>
                    <span class="status-badge status-${record.status}">
                        ${this.getStatusName(record.status)}
                    </span>
                </td>
            </tr>
        `).join('');
    }

    // Charts
    initCharts() {
        this.initRevenueChart();
        this.initProductsChart();
    }

    initRevenueChart() {
        const ctx = document.getElementById('revenueChart');
        if (!ctx) return;

        // Sample data for last 7 days
        const revenueData = {
            labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
            datasets: [{
                label: 'Doanh thu (VNĐ)',
                data: [1200000, 1900000, 1500000, 2100000, 1800000, 2500000, 2200000],
                borderColor: '#6c5ce7',
                backgroundColor: 'rgba(108, 92, 231, 0.1)',
                tension: 0.4,
                fill: true
            }]
        };

        new Chart(ctx, {
            type: 'line',
            data: revenueData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return (value / 1000000).toFixed(1) + 'M';
                            }
                        }
                    }
                }
            }
        });
    }

    initProductsChart() {
        const ctx = document.getElementById('productsChart');
        if (!ctx) return;

        const productData = {
            labels: ['Roblox VIP', 'Roblox Deluxe', 'Roblox Limited', 'Roblox Standard'],
            datasets: [{
                data: [35, 25, 20, 20],
                backgroundColor: [
                    '#6c5ce7',
                    '#a29bfe',
                    '#fd79a8',
                    '#dfe6e9'
                ]
            }]
        };

        new Chart(ctx, {
            type: 'doughnut',
            data: productData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // Utility Methods
    formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    }

    getCategoryName(category) {
        const categories = {
            'vip': 'VIP',
            'premium': 'Premium',
            'limited': 'Limited'
        };
        return categories[category] || category;
    }

    getStatusName(status) {
        const statuses = {
            'active': 'Hoạt động',
            'inactive': 'Đã tắt',
            'pending': 'Đang chờ',
            'success': 'Thành công',
            'failed': 'Thất bại'
        };
        return statuses[status] || status;
    }

    getWithdrawMethodName(method) {
        const methods = {
            'bank': 'Chuyển khoản',
            'momo': 'Ví MoMo',
            'zalopay': 'Ví ZaloPay'
        };
        return methods[method] || method;
    }

    updateElement(id, content) {
        const element = document.getElementById(id);
        if (element) element.textContent = content;
    }

    refreshData() {
        this.loadDashboardData();
        this.loadProductsTable();
        this.loadTransactionsTable();
        this.loadUsersTable();
        this.loadPromoCodesTable();
        window.authSystem.showMessage('Đã làm mới dữ liệu!', 'success');
    }

    addProductEventListeners() {
        document.querySelectorAll('.edit-product').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.currentTarget.getAttribute('data-id'));
                this.editProduct(productId);
            });
        });

        document.querySelectorAll('.delete-product').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.currentTarget.getAttribute('data-id'));
                this.deleteProduct(productId);
            });
        });
    }

    addPromoEventListeners() {
        document.querySelectorAll('.toggle-promo').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const promoCode = e.currentTarget.getAttribute('data-id');
                this.togglePromoCode(promoCode);
            });
        });

        document.querySelectorAll('.delete-promo').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const promoCode = e.currentTarget.getAttribute('data-id');
                this.deletePromoCode(promoCode);
            });
        });
    }

    editProduct(productId) {
        // Implementation for editing product
        window.authSystem.showMessage('Tính năng chỉnh sửa đang được phát triển!', 'info');
    }

    deleteProduct(productId) {
        if (confirm('Bạn có chắc chắn muốn xóa tài khoản này?')) {
            this.products = this.products.filter(p => p.id !== productId);
            this.saveProducts(this.products);
            this.loadProductsTable();
            window.authSystem.showMessage('Đã xóa tài khoản thành công!', 'success');
        }
    }

    togglePromoCode(promoCode) {
        const promo = this.promoCodes.find(p => p.code === promoCode);
        if (promo) {
            promo.isActive = !promo.isActive;
            this.savePromoCodes(this.promoCodes);
            this.loadPromoCodesTable();
            window.authSystem.showMessage(`Đã ${promo.isActive ? 'bật' : 'tắt'} mã giảm giá!`, 'success');
        }
    }

    deletePromoCode(promoCode) {
        if (confirm('Bạn có chắc chắn muốn xóa mã giảm giá này?')) {
            this.promoCodes = this.promoCodes.filter(p => p.code !== promoCode);
            this.savePromoCodes(this.promoCodes);
            this.loadPromoCodesTable();
            window.authSystem.showMessage('Đã xóa mã giảm giá thành công!', 'success');
        }
    }

    // Load other tables (simplified implementations)
    loadTransactionsTable() {
        const tbody = document.getElementById('transactionsTableBody');
        if (!tbody) return;

        const filter = document.getElementById('transactionFilter')?.value || 'all';
        const filteredTransactions = this.transactions.filter(t => 
            filter === 'all' || t.status === filter
        );

        tbody.innerHTML = filteredTransactions.map(transaction => `
            <tr>
                <td>${transaction.id}</td>
                <td>${transaction.user}</td>
                <td>${transaction.product}</td>
                <td>${this.formatCurrency(transaction.amount)}</td>
                <td>${transaction.method}</td>
                <td>${new Date(transaction.createdAt).toLocaleString('vi-VN')}</td>
                <td>
                    <span class="status-badge status-${transaction.status}">
                        ${this.getStatusName(transaction.status)}
                    </span>
                </td>
                <td>
                    <button class="btn-action view-transaction" data-id="${transaction.id}">
                        <i class="fas fa-eye"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    loadUsersTable() {
        const tbody = document.getElementById('usersTableBody');
        if (!tbody || !window.authSystem) return;

        const filter = document.getElementById('userRoleFilter')?.value || 'all';
        const filteredUsers = window.authSystem.users.filter(user => 
            filter === 'all' || user.role === filter
        );

        tbody.innerHTML = filteredUsers.map(user => `
            <tr>
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>
                    <span class="role-tag ${user.role}">
                        ${window.authSystem.getRoleDisplayName(user.role)}
                    </span>
                </td>
                <td>${this.formatCurrency(user.balance)}</td>
                <td>${new Date(user.registeredAt).toLocaleDateString('vi-VN')}</td>
                <td>
                    <span class="status-badge status-${user.isActive ? 'active' : 'inactive'}">
                        ${user.isActive ? 'Hoạt động' : 'Đã khóa'}
                    </span>
                </td>
                <td>
                    <button class="btn-action edit-user" data-id="${user.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }
}

// Initialize admin system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.admin-container')) {
        window.adminSystem = new AdminSystem();
    }
});
