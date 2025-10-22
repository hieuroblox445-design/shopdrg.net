/* Reset CSS */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --primary-color: #6c5ce7;
    --primary-dark: #5649c0;
    --secondary-color: #fd79a8;
    --accent-color: #00cec9;
    --text-color: #2d3436;
    --text-light: #636e72;
    --bg-color: #f9f9f9;
    --bg-light: #ffffff;
    --border-color: #dfe6e9;
    --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
    --radius: 8px;
    --transition: all 0.3s ease;
}

body {
    font-family: 'Poppins', sans-serif;
    color: var(--text-color);
    background-color: var(--bg-color);
    line-height: 1.6;
}

.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Header */
.header {
    background-color: var(--bg-light);
    box-shadow: var(--shadow);
    position: sticky;
    top: 0;
    z-index: 1000;
}

.header .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
}

.logo {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary-color);
}

.logo i {
    margin-right: 10px;
    font-size: 1.8rem;
}

.nav {
    display: flex;
    gap: 30px;
}

.nav-link {
    text-decoration: none;
    color: var(--text-color);
    font-weight: 500;
    transition: var(--transition);
    position: relative;
}

.nav-link:hover, .nav-link.active {
    color: var(--primary-color);
}

.nav-link.active::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--primary-color);
}

.header-actions {
    display: flex;
    gap: 15px;
}

.btn-login, .btn-register {
    padding: 8px 20px;
    border: none;
    border-radius: var(--radius);
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition);
}

.btn-login {
    background-color: transparent;
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
}

.btn-login:hover {
    background-color: var(--primary-color);
    color: white;
}

.btn-register {
    background-color: var(--primary-color);
    color: white;
}

.btn-register:hover {
    background-color: var(--primary-dark);
}

/* Hero Section */
.hero {
    padding: 80px 0;
    background: linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%);
    color: white;
}

.hero .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.hero-content {
    flex: 1;
    max-width: 600px;
}

.hero-title {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 20px;
    line-height: 1.2;
}

.hero-subtitle {
    font-size: 1.2rem;
    margin-bottom: 30px;
    opacity: 0.9;
}

.hero-actions {
    display: flex;
    gap: 15px;
}

.btn-primary, .btn-secondary {
    padding: 12px 30px;
    border: none;
    border-radius: var(--radius);
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition);
    font-size: 1rem;
}

.btn-primary {
    background-color: white;
    color: var(--primary-color);
}

.btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-lg);
}

.btn-secondary {
    background-color: transparent;
    color: white;
    border: 1px solid white;
}

.btn-secondary:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

.hero-image {
    flex: 1;
    text-align: center;
}

.hero-image img {
    max-width: 100%;
    border-radius: var(--radius);
    box-shadow: var(--shadow-lg);
}

/* Sections */
section {
    padding: 80px 0;
}

.section-title {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 50px;
    color: var(--text-color);
}

/* Features Section */
.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
}

.feature-card {
    background-color: var(--bg-light);
    padding: 30px;
    border-radius: var(--radius);
    text-align: center;
    box-shadow: var(--shadow);
    transition: var(--transition);
}

.feature-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
}

.feature-icon {
    width: 70px;
    height: 70px;
    background-color: rgba(108, 92, 231, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
}

.feature-icon i {
    font-size: 1.8rem;
    color: var(--primary-color);
}

.feature-title {
    font-size: 1.3rem;
    margin-bottom: 15px;
    color: var(--text-color);
}

.feature-desc {
    color: var(--text-light);
}

/* Products Section */
.filter-tabs {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 40px;
}

.filter-tab {
    padding: 10px 20px;
    background-color: var(--bg-light);
    border: 1px solid var(--border-color);
    border-radius: 30px;
    cursor: pointer;
    transition: var(--transition);
    font-weight: 500;
}

.filter-tab.active, .filter-tab:hover {
    background-color: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
}

.products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 30px;
}

.product-card {
    background-color: var(--bg-light);
    border-radius: var(--radius);
    overflow: hidden;
    box-shadow: var(--shadow);
    transition: var(--transition);
}

.product-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
}

.product-image {
    height: 200px;
    overflow: hidden;
}

.product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: var(--transition);
}

.product-card:hover .product-image img {
    transform: scale(1.05);
}

.product-info {
    padding: 20px;
}

.product-name {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: var(--text-color);
}

.product-desc {
    color: var(--text-light);
    margin-bottom: 15px;
    font-size: 0.9rem;
}

.product-price {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--primary-color);
    margin-bottom: 15px;
}

.product-features {
    margin-bottom: 20px;
}

.product-feature {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    font-size: 0.9rem;
}

.product-feature i {
    color: var(--accent-color);
    margin-right: 8px;
    font-size: 0.8rem;
}

.product-actions {
    display: flex;
    gap: 10px;
}

.btn-buy, .btn-details {
    flex: 1;
    padding: 10px;
    border: none;
    border-radius: var(--radius);
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition);
}

.btn-buy {
    background-color: var(--primary-color);
    color: white;
}

.btn-buy:hover {
    background-color: var(--primary-dark);
}

.btn-details {
    background-color: transparent;
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
}

.btn-details:hover {
    background-color: rgba(108, 92, 231, 0.1);
}

/* Payment Methods */
.payment-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 30px;
}

.payment-card {
    background-color: var(--bg-light);
    padding: 30px;
    border-radius: var(--radius);
    text-align: center;
    box-shadow: var(--shadow);
    transition: var(--transition);
}

.payment-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
}

.payment-icon {
    width: 70px;
    height: 70px;
    background-color: rgba(108, 92, 231, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
}

.payment-icon i {
    font-size: 1.8rem;
    color: var(--primary-color);
}

.payment-card h3 {
    margin-bottom: 10px;
    color: var(--text-color);
}

.payment-card p {
    color: var(--text-light);
}

/* Footer */
.footer {
    background-color: #2d3436;
    color: white;
    padding: 60px 0 20px;
}

.footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 40px;
    margin-bottom: 40px;
}

.footer-title {
    font-size: 1.3rem;
    margin-bottom: 20px;
    color: white;
}

.footer-desc {
    color: #b2bec3;
    margin-bottom: 20px;
}

.social-links {
    display: flex;
    gap: 15px;
}

.social-links a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    color: white;
    transition: var(--transition);
}

.social-links a:hover {
    background-color: var(--primary-color);
    transform: translateY(-3px);
}

.footer-links {
    list-style: none;
}

.footer-links li {
    margin-bottom: 10px;
}

.footer-links a {
    color: #b2bec3;
    text-decoration: none;
    transition: var(--transition);
}

.footer-links a:hover {
    color: white;
}

.footer-contact {
    list-style: none;
}

.footer-contact li {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    color: #b2bec3;
}

.footer-contact i {
    margin-right: 10px;
    color: var(--primary-color);
}

.footer-bottom {
    text-align: center;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    color: #b2bec3;
}

/* Modal */
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1100;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.modal.active {
    display: flex;
}

.modal-content {
    background-color: white;
    border-radius: var(--radius);
    width: 100%;
    max-width: 500px;
    padding: 30px;
    position: relative;
    box-shadow: var(--shadow-lg);
    animation: modalFadeIn 0.3s ease;
}

@keyframes modalFadeIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.close {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--text-light);
    transition: var(--transition);
}

.close:hover {
    color: var(--text-color);
}

.modal-title {
    text-align: center;
    margin-bottom: 30px;
    color: var(--text-color);
}

/* Forms */
.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: var(--text-color);
}

.form-group input, .form-group select {
    width: 100%;
    padding: 12px 15px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    font-family: 'Poppins', sans-serif;
    transition: var(--transition);
}

.form-group input:focus, .form-group select:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.1);
}

.auth-switch {
    text-align: center;
    margin-top: 20px;
    color: var(--text-light);
}

.auth-switch a {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 500;
}

.auth-switch a:hover {
    text-decoration: underline;
}

/* Product Modal */
.product-modal {
    max-width: 900px;
}

.product-modal-content {
    display: flex;
    gap: 30px;
}

.product-modal-image {
    flex: 1;
}

.product-modal-image img {
    width: 100%;
    border-radius: var(--radius);
}

.product-modal-info {
    flex: 1;
}

.product-modal-desc {
    margin-bottom: 20px;
    color: var(--text-light);
}

.product-modal-price {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary-color);
    margin-bottom: 20px;
}

.product-modal-features h3 {
    margin-bottom: 15px;
    color: var(--text-color);
}

.product-modal-features ul {
    list-style: none;
    margin-bottom: 30px;
}

.product-modal-features li {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
}

.product-modal-features li i {
    color: var(--accent-color);
    margin-right: 10px;
    font-size: 0.9rem;
}

/* Payment Warning */
.payment-warning {
    margin-top: 20px;
    padding: 15px;
    background-color: rgba(255, 193, 7, 0.1);
    border-radius: var(--radius);
    color: #856404;
    font-size: 0.9rem;
    text-align: center;
}

/* Responsive */
@media (max-width: 992px) {
    .hero .container {
        flex-direction: column;
        text-align: center;
    }
    
    .hero-content {
        margin-bottom: 40px;
    }
    
    .nav {
        display: none;
    }
    
    .product-modal-content {
        flex-direction: column;
    }
}

@media (max-width: 768px) {
    .section-title {
        font-size: 2rem;
    }
    
    .hero-title {
        font-size: 2.2rem;
    }
    
    .header-actions {
        display: none;
    }
    
    .filter-tabs {
        flex-wrap: wrap;
    }
}

@media (max-width: 576px) {
    .hero-actions {
        flex-direction: column;
    }
    
    .btn-primary, .btn-secondary {
        width: 100%;
    }
    
    .modal-content {
        padding: 20px;
    }
}
