// Payment processing functions for GameAcc Shop

class PaymentProcessor {
    constructor() {
        this.apiBase = 'https://api.example.com'; // Replace with actual API endpoint
        this.currentMethod = 'vina'; // Default payment method
        this.currentDenomination = 10000; // Default denomination
    }

    // Initialize payment processor
    init() {
        this.setupEventListeners();
        this.loadPaymentMethods();
    }

    // Set up event listeners for payment UI
    setupEventListeners() {
        // Payment method selection
        document.querySelectorAll('.payment-method').forEach(method => {
            method.addEventListener('click', (e) => {
                this.selectPaymentMethod(e.target.getAttribute('data-method'));
            });
        });

        // Denomination selection
        document.querySelectorAll('.denomination').forEach(denom => {
            denom.addEventListener('click', (e) => {
                this.selectDenomination(parseInt(e.target.getAttribute('data-value')));
            });
        });

        // Payment form submission
        const submitBtn = document.getElementById('submitPayment');
        if (submitBtn) {
            submitBtn.addEventListener('click', () => {
                this.processPayment();
            });
        }
    }

    // Load available payment methods
    loadPaymentMethods() {
        // In a real implementation, this would fetch from an API
        const methods = [
            { id: 'vina', name: 'Viettel', logo: 'viettel-logo.png' },
            { id: 'mobi', name: 'Mobifone', logo: 'mobifone-logo.png' },
            { id: 'vina', name: 'Vinaphone', logo: 'vinaphone-logo.png' }
        ];

        // Update UI with payment methods
        this.updatePaymentMethodsUI(methods);
    }

    // Update payment methods in UI
    updatePaymentMethodsUI(methods) {
        const container = document.querySelector('.payment-methods');
        if (!container) return;

        container.innerHTML = '';
        methods.forEach(method => {
            const methodElement = document.createElement('div');
            methodElement.className = `payment-method ${method.id === this.currentMethod ? 'active' : ''}`;
            methodElement.setAttribute('data-method', method.id);
            methodElement.textContent = method.name;
            methodElement.addEventListener('click', () => {
                this.selectPaymentMethod(method.id);
            });
            container.appendChild(methodElement);
        });
    }

    // Select payment method
    selectPaymentMethod(method) {
        this.currentMethod = method;
        
        // Update UI
        document.querySelectorAll('.payment-method').forEach(m => {
            m.classList.remove('active');
        });
        document.querySelector(`.payment-method[data-method="${method}"]`).classList.add('active');
        
        console.log(`Selected payment method: ${method}`);
    }

    // Select denomination
    selectDenomination(amount) {
        this.currentDenomination = amount;
        
        // Update UI
        document.querySelectorAll('.denomination').forEach(d => {
            d.classList.remove('active');
        });
        document.querySelector(`.denomination[data-value="${amount}"]`).classList.add('active');
        
        console.log(`Selected denomination: ${amount}`);
    }

    // Process payment
    async processPayment() {
        const serial = document.getElementById('serial')?.value;
        const code = document.getElementById('code')?.value;
        const promoCode = document.getElementById('promo')?.value;

        // Validate inputs
        if (!serial || !code) {
            this.showMessage('Vui lòng nhập đầy đủ thông tin thẻ!', 'error');
            return;
        }

        // Show loading state
        this.setLoadingState(true);

        try {
            // Prepare payment data
            const paymentData = {
                method: this.currentMethod,
                denomination: this.currentDenomination,
                serial: serial,
                code: code,
                promo_code: promoCode || null,
                timestamp: new Date().toISOString()
            };

            // In a real implementation, this would send to a secure server
            // For demo purposes, we'll simulate API call
            const result = await this.simulatePaymentAPI(paymentData);

            if (result.success) {
                this.showMessage('Nạp thẻ thành công! Số tiền đã được cộng vào tài khoản.', 'success');
                this.resetForm();
            } else {
                this.showMessage(`Nạp thẻ thất bại: ${result.message}`, 'error');
            }
        } catch (error) {
            console.error('Payment processing error:', error);
            this.showMessage('Có lỗi xảy ra khi xử lý thanh toán. Vui lòng thử lại.', 'error');
        } finally {
            this.setLoadingState(false);
        }
    }

    // Simulate payment API call (replace with actual API integration)
    simulatePaymentAPI(paymentData) {
        return new Promise((resolve) => {
            // Simulate API delay
            setTimeout(() => {
                // Simulate different outcomes based on card data
                const lastDigit = parseInt(paymentData.code.slice(-1));
                
                if (lastDigit % 3 === 0) {
                    resolve({
                        success: true,
                        message: 'Thẻ hợp lệ',
                        transaction_id: 'TX' + Date.now(),
                        amount: paymentData.denomination
                    });
                } else if (lastDigit % 3 === 1) {
                    resolve({
                        success: false,
                        message: 'Thẻ đã được sử dụng'
                    });
                } else {
                    resolve({
                        success: false,
                        message: 'Thẻ không hợp lệ'
                    });
                }
            }, 2000);
        });
    }

    // Show message to user
    showMessage(message, type) {
        // Create message element if it doesn't exist
        let messageEl = document.getElementById('paymentMessage');
        if (!messageEl) {
            messageEl = document.createElement('div');
            messageEl.id = 'paymentMessage';
            messageEl.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 5px;
                color: white;
                z-index: 10000;
                max-width: 300px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            `;
            document.body.appendChild(messageEl);
        }

        // Set message content and style
        messageEl.textContent = message;
        messageEl.style.backgroundColor = type === 'success' ? '#28a745' : '#dc3545';
        
        // Show message
        messageEl.style.display = 'block';
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 5000);
    }

    // Set loading state for payment button
    setLoadingState(loading) {
        const submitBtn = document.getElementById('submitPayment');
        if (!submitBtn) return;

        if (loading) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Đang xử lý...';
            submitBtn.style.opacity = '0.7';
        } else {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Nạp thẻ ngay';
            submitBtn.style.opacity = '1';
        }
    }

    // Reset payment form
    resetForm() {
        document.getElementById('serial').value = '';
        document.getElementById('code').value = '';
        document.getElementById('promo').value = '';
    }

    // Validate card information
    validateCard(serial, code, method) {
        // Basic validation rules
        const rules = {
            vina: { serialLength: 14, codeLength: 15 },
            mobi: { serialLength: 15, codeLength: 12 },
            vina: { serialLength: 14, codeLength: 14 }
        };

        const rule = rules[method];
        if (!rule) return false;

        if (serial.length !== rule.serialLength || code.length !== rule.codeLength) {
            return false;
        }

        // Check if contains only digits
        if (!/^\d+$/.test(serial) || !/^\d+$/.test(code)) {
            return false;
        }

        return true;
    }

    // Apply promo code
    async applyPromoCode(code) {
        try {
            // In real implementation, this would check against database
            const promo = await this.checkPromoCode(code);
            
            if (promo.valid) {
                let discountText = '';
                if (promo.discount_type === 'percent') {
                    discountText = `Giảm ${promo.discount_value}%`;
                } else {
                    discountText = `Giảm ${promo.discount_value.toLocaleString()} VNĐ`;
                }
                
                this.showMessage(`Áp dụng mã thành công: ${discountText}`, 'success');
                return promo;
            } else {
                this.showMessage('Mã giảm giá không hợp lệ hoặc đã hết hạn', 'error');
                return null;
            }
        } catch (error) {
            console.error('Promo code error:', error);
            this.showMessage('Có lỗi khi kiểm tra mã giảm giá', 'error');
            return null;
        }
    }

    // Check promo code validity (simulated)
    async checkPromoCode(code) {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simulate promo code check
                const validCodes = {
                    'WELCOME10': { discount_type: 'percent', discount_value: 10, valid: true },
                    'SUMMER2023': { discount_type: 'fixed', discount_value: 50000, valid: true }
                };

                const promo = validCodes[code] || { valid: false };
                resolve(promo);
            }, 1000);
        });
    }
}

// Initialize payment processor when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const paymentProcessor = new PaymentProcessor();
    paymentProcessor.init();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PaymentProcessor;
}
