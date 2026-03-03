/**
 * Chennai Pet's World - Main JavaScript
 */

// Initialize AOS Animation Library
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
    });

    // Mobile Menu Toggle
    initMobileMenu();
    
    // Navbar Scroll Effect
    initNavbarScroll();
    
    // Form Handling
    initFormHandling();
    
    // Gallery Lightbox
    initLightbox();
    
    // Pet Filter
    initPetFilter();
    
    // Gallery Filter
    initGalleryFilter();
    
    // Back to Top Button
    initBackToTop();
    
    // FAQ Accordion (if on contact page)
    initFAQ();
});

/**
 * Mobile Menu Functionality
 */
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Animate hamburger icon
            const svg = mobileMenuBtn.querySelector('svg');
            svg.classList.toggle('rotate-90');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }
}

/**
 * Navbar Scroll Effect
 */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }
}

/**
 * Form Handling with WhatsApp Redirect
 */
function initFormHandling() {
    // Inquiry Form
    const inquiryForm = document.getElementById('inquiry-form');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', handleInquiryForm);
    }
    
    // Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
}

function handleInquiryForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name') || '';
    const phone = formData.get('phone') || '';
    const petInterest = formData.get('pet-interest') || 'General Inquiry';
    const message = formData.get('message') || '';
    
    const whatsappMessage = `Hello Chennai Pet's World!

*New Inquiry*
━━━━━━━━━━━━━
👤 Name: ${name}
📱 Phone: ${phone}
🐦 Interest: ${petInterest}
💬 Message: ${message}
━━━━━━━━━━━━━

Looking forward to hearing from you!`;
    
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/919941950925?text=${encodedMessage}`;
    
    // Show success message
    showToast('Redirecting to WhatsApp...', 'success');
    
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        e.target.reset();
    }, 500);
}

function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name') || '';
    const phone = formData.get('phone') || '';
    const email = formData.get('email') || 'Not provided';
    const petInterest = formData.get('pet-interest') || 'General Inquiry';
    const message = formData.get('message') || '';
    
    const whatsappMessage = `Hello Chennai Pet's World!

*Contact Form Submission*
━━━━━━━━━━━━━
👤 Name: ${name}
📱 Phone: ${phone}
📧 Email: ${email}
🐦 Interest: ${petInterest}
💬 Message: ${message}
━━━━━━━━━━━━━

Please respond at your earliest convenience.`;
    
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/919941950925?text=${encodedMessage}`;
    
    // Show success message
    showToast('Redirecting to WhatsApp...', 'success');
    
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        e.target.reset();
    }, 500);
}

/**
 * Toast Notification
 */
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `fixed top-24 right-4 px-6 py-3 rounded-xl shadow-lg z-50 transform translate-x-full transition-transform duration-300`;
    
    if (type === 'success') {
        toast.classList.add('bg-green-500', 'text-white');
    } else if (type === 'error') {
        toast.classList.add('bg-red-500', 'text-white');
    } else {
        toast.classList.add('bg-primary', 'text-white');
    }
    
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.classList.remove('translate-x-full');
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.add('translate-x-full');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

/**
 * Gallery Lightbox
 */
let currentLightboxIndex = 0;
let lightboxImages = [];

function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    
    if (lightbox && galleryItems.length > 0) {
        lightboxImages = Array.from(galleryItems).map(item => item.querySelector('img').src);
        
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                openLightbox(index);
            });
        });
        
        // Close on background click
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (!lightbox.classList.contains('active')) return;
            
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowRight') {
                navigateLightbox(1);
            } else if (e.key === 'ArrowLeft') {
                navigateLightbox(-1);
            }
        });
    }
}

function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    if (lightbox && lightboxImg && lightboxImages[index]) {
        currentLightboxIndex = index;
        lightboxImg.src = lightboxImages[index];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function navigateLightbox(direction) {
    currentLightboxIndex += direction;
    
    if (currentLightboxIndex >= lightboxImages.length) {
        currentLightboxIndex = 0;
    } else if (currentLightboxIndex < 0) {
        currentLightboxIndex = lightboxImages.length - 1;
    }
    
    const lightboxImg = document.getElementById('lightbox-img');
    if (lightboxImg) {
        lightboxImg.src = lightboxImages[currentLightboxIndex];
    }
}

// Global functions for inline onclick handlers
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.navigateLightbox = navigateLightbox;

/**
 * Pet Filter Functionality
 */
function initPetFilter() {
    const filterBtns = document.querySelectorAll('.pet-filter-btn');
    const petSections = document.querySelectorAll('.pet-section');
    
    if (filterBtns.length > 0 && petSections.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.dataset.filter;
                
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active', 'bg-primary', 'text-white'));
                filterBtns.forEach(b => b.classList.add('bg-gray-100', 'text-gray-700'));
                this.classList.add('active', 'bg-primary', 'text-white');
                this.classList.remove('bg-gray-100', 'text-gray-700');
                
                // Show/hide sections
                petSections.forEach(section => {
                    if (filter === 'all' || section.dataset.category === filter) {
                        section.classList.remove('hidden');
                        section.style.animation = 'fadeIn 0.5s ease';
                    } else {
                        section.classList.add('hidden');
                    }
                });
            });
        });
    }
}

/**
 * Gallery Filter Functionality
 */
function initGalleryFilter() {
    const filterBtns = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterBtns.length > 0 && galleryItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.dataset.filter;
                
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active', 'bg-primary', 'text-white'));
                filterBtns.forEach(b => b.classList.add('bg-gray-100', 'text-gray-700'));
                this.classList.add('active', 'bg-primary', 'text-white');
                this.classList.remove('bg-gray-100', 'text-gray-700');
                
                // Show/hide items with animation
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.classList.remove('hidden');
                        item.style.animation = 'fadeIn 0.3s ease';
                    } else {
                        item.classList.add('hidden');
                    }
                });
            });
        });
    }
}

/**
 * Back to Top Button
 */
function initBackToTop() {
    // Create back to top button if it doesn't exist
    let backToTop = document.querySelector('.back-to-top');
    
    if (!backToTop) {
        backToTop = document.createElement('button');
        backToTop.className = 'back-to-top';
        backToTop.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
            </svg>
        `;
        backToTop.setAttribute('aria-label', 'Back to top');
        document.body.appendChild(backToTop);
    }
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    // Scroll to top on click
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * FAQ Accordion
 */
function initFAQ() {
    const faqBtns = document.querySelectorAll('.faq-btn');
    
    faqBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            toggleFaq(this);
        });
    });
}

function toggleFaq(btn) {
    const content = btn.nextElementSibling;
    const isOpen = !content.classList.contains('hidden');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-content').forEach(item => {
        item.classList.add('hidden');
    });
    document.querySelectorAll('.faq-btn').forEach(b => {
        b.classList.remove('active');
    });
    
    // Open clicked item if it was closed
    if (!isOpen) {
        content.classList.remove('hidden');
        btn.classList.add('active');
    }
}

// Global function for inline onclick
window.toggleFaq = toggleFaq;

/**
 * Smooth Scroll for Anchor Links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

/**
 * Lazy Load Images
 */
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src || img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

/**
 * CSS Animation Helper
 */
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Console branding
console.log(
    '%c🐦 Chennai Pet\'s World',
    'font-size: 24px; font-weight: bold; color: #009688;'
);
console.log(
    '%cYour Trusted Exotic Pet Shop in Chennai',
    'font-size: 14px; color: #666;'
);
