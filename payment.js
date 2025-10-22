// Payment System
class PaymentSystem {
    constructor() {
        this.transactions = this.loadTransactions();
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    loadTransactions() {
        const saved = localStorage.getItem('shop_transactions');
        return saved ? JSON.parse(saved) : [];
    }

    saveTransactions(transactions) {
        localStorage.setItem('shop_transactions', JSON.stringify(transactions));
    }

    setupEventListeners() {
        // Payment form
        const paymentForm = document.getElementById('paymentForm');
        if (paymentForm) {
            paymentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleCardPayment();
            });
        }

        // Buy now buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-buy') || e.target.closest('.btn-buy')) {
                const productId = e.target.getAttribute('data-id') || e.target.closest('.btn-buy').getAttribute('data-id');
                this.handleProductPurchase(productId);
            }
        });
    }

    handleCardPayment() {
        const provider = document.getElementById('cardProvider').value;
        const value = parseInt(document.getElementById('cardValue').value);
        const serial = document.getElementById('cardSerial').value;
        const pin = document.getElementById('cardPin').value;
        const promoCode = document.getElementById('promoCode').value;

        // Validate card
        if (!this.validateCard(serial, pin)) {
            window.authSystem.showMessage('Thông tin thẻ không hợp lệ!', 'error');
            return;
        }

        // Process payment
        const transaction = {
            id: 'T' + Date.now(),
            type: 'topup',
            provider: provider,
            value: value,
            serial: serial,
            pin: pin,
            promoCode: promoCode,
            status: 'success',
            amount: this.calculateAmount(value, promoCode),
            userId: window.authSystem.currentUser ? window.authSystem.currentUser.id : null,
            createdAt: new Date().toISOString()
        };

        this.transactions.push(transaction);
        this.saveTransactions(this.transactions);

        // Update user balance
        if (window.authSystem.currentUser) {
            this.updateUserBalance(transaction.amount);
        }

        window.authSystem.showMessage(`Nạp thẻ thành công! Số dư: ${this.formatCurrency(transaction.amount)}`, 'success');
        
        // Close modal and reset form
        const paymentModal = document.getElementById('paymentModal');
        if (paymentModal) paymentModal.classList.remove('active');
        
        const paymentForm = document.getElementById('paymentForm');
        if (paymentForm) paymentForm.reset();
    }

    handleProductPurchase(productId) {
        if (!window.authSystem.currentUser) {
            window.authSystem.showMessage('Vui lòng đăng nhập để mua hàng!', 'error');
            return;
        }

        // Find product
        const products = JSON.parse(localStorage.getItem('shop_products') || '[]');
        const product = products.find(p => p.id === parseInt(productId));

        if (!product) {
            window.authSystem.showMessage('Sản phẩm không tồn tại!', 'error');
            return;
        }

        if (product.stock <= 0) {
            window.authSystem.showMessage('Sản phẩm đã hết hàng!', 'error');
            return;
        }

        // Check balance
        if (window.authSystem.currentUser.balance < product.price) {
            window.authSystem.showMessage('Số dư không đủ! Vui lòng nạp thêm tiền.', 'error');
            this.showPaymentModal();
            return;
        }

        // Process purchase
        const transaction = {
            id: 'T' + Date.now(),
            type: 'product',
            productId: product.id,
            productName: product.name,
            amount: product.price,
            status: 'success',
            userId: window.authSystem.currentUser.id,
            createdAt: new Date().toISOString()
        };

        this.transactions.push(transaction);
        this.saveTransactions(this.transactions);

        // Update user balance
        this.updateUserBalance(-product.price);

        // Update product stock
        product.stock -= 1;
        localStorage.setItem('shop_products', JSON.stringify(products));

        window.authSystem.showMessage(`Mua thành công ${product.name}!`, 'success');
        
        // Show account details (in real implementation, this would be secure)
        this.showAccountDetails(product);
    }

    validateCard(serial, pin) {
        // Basic validation
        if (serial.length < 5 || pin.length < 5) {
            return false;
        }

        // In real implementation, this would validate with payment gateway
        return true;
    }

    calculateAmount(value, promoCode) {
        let amount = value;

        // Apply promo code if valid
        if (promoCode) {
            const promoCodes = JSON.parse(localStorage.getItem('shop_promocodes') || '[]');
            const promo = promoCodes.find(p => 
                p.code === promoCode.toUpperCase() && 
                p.isActive && 
                (!p.expiryDate || new Date(p.expiryDate) > new Date()) &&
                (p.usedCount < p.maxUsage)
            );

            if (promo) {
                if (promo.type === 'percentage') {
                    amount = value * (1 + promo.value / 100);
                } else {
                    amount = value + promo.value;
                }

                // Update promo code usage
                promo.usedCount += 1;
                localStorage.setItem('shop_promocodes', JSON.stringify(promoCodes));
            }
        }

        return amount;
    }

    updateUserBalance(amount) {
        if (!window.authSystem.currentUser) return;

        const users = window.authSystem.users;
        const userIndex = users.findIndex(u => u.id === window.authSystem.currentUser.id);
        
        if (userIndex !== -1) {
            users[userIndex].balance += amount;
            window.authSystem.currentUser.balance += amount;
            
            window.authSystem.saveUsers(users);
            localStorage.setItem('current_user', JSON.stringify(window.authSystem.currentUser));
        }
    }

    showPaymentModal() {
        const paymentModal = document.getElementById('paymentModal');
        if (paymentModal) {
            paymentModal.classList.add('active');
        }
    }

    showAccountDetails(product) {
        // In real implementation, this would show secure account details
        const details = `
            Tài khoản: user_${product.id}_${Date.now()}
            Mật khẩu: pass_${Math.random().toString(36).substr(2, 8)}
            
            Lưu ý: 
            - Vui lòng đổi mật khẩu ngay sau khi nhận tài khoản
            - Liên hệ hỗ trợ nếu có vấn đề
        `;

        alert(`THÔNG TIN TÀI KHOẢN:\n\n${details}`);
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    }
}

// Initialize payment system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.paymentSystem = new PaymentSystem();
});
