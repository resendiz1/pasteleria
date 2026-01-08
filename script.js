// Carousel functionality
const carousel = {
    slides: document.querySelectorAll('.carousel-slide'),
    indicators: document.querySelectorAll('.indicator'),
    prevBtn: document.querySelector('.carousel-prev'),
    nextBtn: document.querySelector('.carousel-next'),
    currentSlide: 0,
    interval: null,
    
    init() {
        if (this.slides.length === 0) return;
        
        // Event listeners
        this.prevBtn?.addEventListener('click', () => this.prevSlide());
        this.nextBtn?.addEventListener('click', () => this.nextSlide());
        
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Start autoplay
        this.startAutoplay();
        
        // Pause on hover
        const carouselContainer = document.querySelector('.carousel-container');
        carouselContainer?.addEventListener('mouseenter', () => this.stopAutoplay());
        carouselContainer?.addEventListener('mouseleave', () => this.startAutoplay());
    },
    
    updateSlide() {
        // Hide all slides
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Show current slide
        this.slides[this.currentSlide].classList.add('active');
        this.indicators[this.currentSlide].classList.add('active');
    },
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.updateSlide();
    },
    
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.updateSlide();
    },
    
    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlide();
    },
    
    startAutoplay() {
        this.stopAutoplay();
        this.interval = setInterval(() => this.nextSlide(), 5000);
    },
    
    stopAutoplay() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
};

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    carousel.init();
});
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links (with carousel offset)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced header scroll effect with carousel awareness
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const heroSection = document.querySelector('.hero');
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.background = '#fff';
        header.style.backdropFilter = 'none';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
    
    // Parallax effect for carousel images
    if (heroSection && scrollY < heroSection.offsetHeight) {
        const carouselImages = heroSection.querySelectorAll('.carousel-slide img');
        carouselImages.forEach(img => {
            img.style.transform = `translateY(${scrollY * 0.5}px)`;
        });
    }
});

// Contact Form Handler


// Newsletter Form Handler
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = this.querySelector('input[type="email"]').value;
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Por favor ingresa un correo válido', 'error');
        return;
    }
    
    // Simulate subscription
    showNotification('¡Gracias por suscribirte! Revisa tu correo para confirmar.', 'success');
    
    // Reset form
    this.reset();
});

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    `;
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.background = '#28a745';
    } else if (type === 'error') {
        notification.style.background = '#dc3545';
    } else {
        notification.style.background = '#17a2b8';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Enhanced Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Add staggered animation for product cards
            if (entry.target.classList.contains('product-card')) {
                const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.1}s`;
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.product-card, .branch-card, .stat, .slide-content');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Animate carousel content on load
    setTimeout(() => {
        const activeSlide = document.querySelector('.carousel-slide.active .slide-content');
        if (activeSlide) {
            activeSlide.style.opacity = '1';
            activeSlide.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    }, 100);
});

// Lazy loading for images
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            // No establecer opacity = 0, solo animar la carga
            img.addEventListener('load', () => {
                img.style.transition = 'opacity 0.3s ease';
                img.style.opacity = '1';
            });
            imageObserver.unobserve(img);
        }
    });
});

// Observe all images (except carousel images)
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img:not(.carousel-slide img)');
    images.forEach(img => {
        img.style.opacity = '1'; // Asegurar que sean visibles desde el inicio
        imageObserver.observe(img);
    });
});

// Enhanced product card interactions
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
        this.style.boxShadow = '0 25px 50px rgba(0,0,0,0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
    });
});

// Shopping Cart System
const shoppingCart = {
    items: [],
    
    init() {
        this.loadFromStorage();
        this.bindEvents();
        this.updateUI();
    },
    
    loadFromStorage() {
        const stored = localStorage.getItem('shoppingCart');
        if (stored) {
            this.items = JSON.parse(stored);
        }
    },
    
    saveToStorage() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.items));
    },
    
    bindEvents() {
        // Cart toggle
        document.getElementById('cart-toggle').addEventListener('click', () => this.openCart());
        document.getElementById('close-cart').addEventListener('click', () => this.closeCart());
        
        // Add to cart buttons
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const card = e.target.closest('.product-card');
                const product = {
                    id: card.dataset.productId,
                    name: card.dataset.productName,
                    price: parseFloat(card.dataset.productPrice),
                    image: card.querySelector('img').src,
                    quantity: 1
                };
                this.addItem(product);
            });
        });
        
        // Cart actions
        document.getElementById('clear-cart').addEventListener('click', () => this.clearCart());
        document.getElementById('checkout-btn').addEventListener('click', () => this.checkout());
        
        // Close cart on overlay click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('cart-overlay')) {
                this.closeCart();
            }
        });
    },
    
    bindCartEvents() {
        // Bind events for cart items (called after updating cart items)
        document.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const cartItem = e.target.closest('.cart-item');
                if (!cartItem) {
                    console.error('Cart item not found');
                    return;
                }
                
                const productId = parseInt(cartItem.dataset.productId);
                const action = e.target.closest('.quantity-btn').dataset.action;
                const currentQuantity = parseInt(cartItem.querySelector('.quantity-value').textContent);
                const newQuantity = action === 'increase' ? currentQuantity + 1 : currentQuantity - 1;
                
                console.log('Quantity button clicked:', { productId, action, currentQuantity, newQuantity });
                
                if (productId && !isNaN(productId)) {
                    this.updateQuantity(productId, newQuantity);
                } else {
                    console.error('Invalid product ID:', productId);
                }
            });
        });
        
        document.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const cartItem = e.target.closest('.cart-item');
                if (!cartItem) {
                    console.error('Cart item not found for removal');
                    return;
                }
                
                const productId = parseInt(cartItem.dataset.productId);
                
                console.log('Remove button clicked:', { productId, cartItem });
                console.log('All cart items:', document.querySelectorAll('.cart-item'));
                
                if (productId && !isNaN(productId)) {
                    this.removeItem(productId);
                } else {
                    console.error('Could not find product ID for removal');
                }
            });
        });
    },
    
    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.items.push(product);
        }
        
        this.saveToStorage();
        this.updateUI();
        this.showNotification(`${product.name} agregado al carrito`);
    },
    
    removeItem(productId) {
        console.log('Removing item with ID:', productId);
        console.log('Items before removal:', this.items);
        
        const itemIndex = this.items.findIndex(item => item.id == productId);
        if (itemIndex > -1) {
            const removedItem = this.items.splice(itemIndex, 1)[0];
            console.log('Item removed:', removedItem);
        } else {
            console.log('Item not found with ID:', productId);
        }
        
        this.saveToStorage();
        this.updateUI();
        this.showNotification('Producto eliminado del carrito');
    },
    
    updateQuantity(productId, quantity) {
        console.log('Updating quantity:', { productId, quantity });
        console.log('Current items:', this.items);
        
        const item = this.items.find(item => item.id == productId);
        if (item) {
            if (quantity <= 0) {
                console.log('Quantity is 0 or less, removing item');
                this.removeItem(productId);
            } else {
                console.log('Updating item quantity from', item.quantity, 'to', quantity);
                item.quantity = quantity;
                this.saveToStorage();
                this.updateUI();
            }
        } else {
            console.error('Item not found for quantity update:', productId);
        }
    },
    
    clearCart() {
        if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
            this.items = [];
            this.saveToStorage();
            this.updateUI();
            this.showNotification('Carrito vaciado');
        }
    },
    
    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    
    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    },
    
    openCart() {
        document.getElementById('cart-sidebar').classList.add('open');
        this.createOverlay();
    },
    
    closeCart() {
        document.getElementById('cart-sidebar').classList.remove('open');
        this.removeOverlay();
    },
    
    createOverlay() {
        if (!document.querySelector('.cart-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'cart-overlay';
            document.body.appendChild(overlay);
            setTimeout(() => overlay.classList.add('active'), 10);
        }
    },
    
    removeOverlay() {
        const overlay = document.querySelector('.cart-overlay');
        if (overlay) {
            overlay.classList.remove('active');
            setTimeout(() => overlay.remove(), 300);
        }
    },
    
    updateUI() {
        console.log('Updating UI with items:', this.items);
        this.updateCartCount();
        this.updateCartItems();
        this.updateCartTotal();
        this.updateCheckoutButton();
        // Bind events after updating DOM
        setTimeout(() => {
            console.log('Binding cart events...');
            this.bindCartEvents();
        }, 50);
    },
    
    updateCartCount() {
        const count = this.getItemCount();
        document.getElementById('cart-count').textContent = count;
        document.getElementById('cart-count').style.display = count > 0 ? 'flex' : 'none';
    },
    
    updateCartItems() {
        const container = document.querySelector('.cart-items');
        
        if (this.items.length === 0) {
            container.innerHTML = `
                <div class="cart-empty">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Tu carrito está vacío</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = this.items.map(item => `
            <div class="cart-item" data-product-id="${item.id}">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" data-action="decrease" type="button">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn" data-action="increase" type="button">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
                <button class="cart-item-remove" type="button">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    },
    
    updateCartTotal() {
        const total = this.getTotal();
        document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
    },
    
    updateCheckoutButton() {
        const btn = document.getElementById('checkout-btn');
        btn.disabled = this.items.length === 0;
    },
    
    checkout() {
        if (this.items.length === 0) return;
        
        const total = this.getTotal();
        const items = this.items.map(item => 
            `${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}`
        ).join('\n');
        
        const message = `¡Hola! Quiero realizar un pedido:\n\n${items}\n\nTotal: $${total.toFixed(2)}`;
        const whatsappUrl = `https://wa.me/5222491725430?text=${encodeURIComponent(message)}`;
        
        window.open(whatsappUrl, '_blank');
        this.showNotification('Redirigiendo a WhatsApp para completar tu pedido...');
    },
    
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification notification-success';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            background: #28a745;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
};

// Initialize shopping cart when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    shoppingCart.init();
});

// Phone number formatting
document.getElementById('phone')?.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 0) {
        if (value.length <= 3) {
            value = `(${value}`;
        } else if (value.length <= 6) {
            value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        } else {
            value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
        }
    }
    e.target.value = value;
});

// Current year for footer
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = `&copy; ${currentYear} Dulce Capricho. Todos los derechos reservados.`;
    }
});

// Loading animation
window.addEventListener('load', () => {
    // Hide loading spinner if it exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// Floating social buttons interactions
document.querySelectorAll('.floating-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        // Add pulse effect
        this.style.animation = 'pulse 1s infinite';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.animation = 'none';
    });
    
    // Track clicks for analytics (if needed)
    btn.addEventListener('click', function() {
        const platform = this.classList[1]; // facebook, instagram, twitter, whatsapp
        console.log(`Social media click: ${platform}`);
    });
});

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: translateX(-10px) scale(1.1); }
        50% { transform: translateX(-10px) scale(1.15); }
        100% { transform: translateX(-10px) scale(1.1); }
    }
`;
document.head.appendChild(style);

// Dynamic copyright year
function updateCopyrightYear() {
    const yearElements = document.querySelectorAll('[data-year]');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    updateCopyrightYear();
    
    // Add loading state to forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Enviando...';
                
                // Re-enable after 3 seconds (for demo purposes)
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = submitBtn.getAttribute('data-original-text') || 'Enviar';
                }, 3000);
            }
        });
    });
});

// Console welcome message with carousel info
console.log('%c <JuanPancho s>', 'color: #000000ff; font-size: 20px; font-weight: bold;');
console.log('%cBienvenido a nuestro sitio web. ¡Gracias por visitarnos!', 'color: #9e8412ff; font-size: 14px;');
console.log('%c🎠 Carousel initialized with ' + carousel.slides.length + ' slides', 'color: #28a745; font-size: 12px;');
