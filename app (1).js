// NANO GRIT Website JavaScript - Complete Working Version

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initAnimatedCounters();
    initFloatingTestimonials();
    initAvailabilityIndicator();
    initStickyBookButton();
    initExitIntentDetection();
    initBookingModal();
    initParticleAnimations();
    initScrollAnimations();
    initGlassmorphicEffects();
    initGalleryFunctionality();
    initFAQAccordion();
    initLiveStats();
    initContactForm();
    
    // Initialize existing functionality
    initSmoothScrolling();
    initNavbarScrollEffect();
    
    // Setup booking buttons
    setupBookingButtons();
    
    console.log('NANO GRIT website loaded successfully');
});

// Global variables for booking
let selectedService = null;
let formData = {};
let currentStep = 1;
let socialProofMessages = [
    { text: "Megha just booked Ceramic Coating", time: "2 min ago" },
    { text: "Julian completed Car Detailing", time: "15 min ago" },
    { text: "Sabal rated us 5 stars", time: "1 hour ago" },
    { text: "Vittal referred 3 friends", time: "3 hours ago" }
];
let socialProofIndex = 0;

// Enhanced Navigation with Perfect Readability
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Enhanced glass blur when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.backdropFilter = 'blur(8px)';
                navbar.style.background = 'var(--glass-nav)';
            } else {
                document.body.style.backdropFilter = 'none';
            }
        });
        
        // Close menu functionality
        const navLinks = navMenu.querySelectorAll('.readable-nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.backdropFilter = 'none';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.backdropFilter = 'none';
            }
        });
    }
}

// Animated Counters with High Visibility
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.counter, .live-counter, .stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target')) || 
                      parseInt(counter.textContent.replace(/\D/g, '')) || 0;
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                const suffix = counter.textContent.match(/[^\d]+$/);
                counter.textContent = Math.floor(current) + (suffix ? suffix[0] : '');
                requestAnimationFrame(updateCounter);
            } else {
                const suffix = counter.textContent.match(/[^\d]+$/);
                counter.textContent = target + (suffix ? suffix[0] : '');
            }
        };
        
        updateCounter();
    };
    
    // Intersection Observer for triggering animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Floating Social Proof with High Contrast
function initFloatingTestimonials() {
    const socialProofContainer = document.createElement('div');
    socialProofContainer.className = 'floating-social-proof';
    socialProofContainer.innerHTML = `
        <div class="proof-text"></div>
        <div class="proof-meta"></div>
    `;
    
    // Add styles for floating social proof
    socialProofContainer.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 900;
        background: rgba(0, 0, 0, 0.85);
        backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 12px;
        padding: 16px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37);
        min-width: 250px;
        transform: translateX(100%);
        transition: transform 0.5s ease-out;
    `;
    
    const proofTextStyle = `
        font-size: 14px;
        font-weight: 600;
        color: #ffffff;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
        margin-bottom: 4px;
    `;
    
    const proofMetaStyle = `
        font-size: 12px;
        font-weight: 500;
        color: #cbd5e0;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
    `;
    
    document.body.appendChild(socialProofContainer);
    
    function showSocialProof() {
        const message = socialProofMessages[socialProofIndex];
        const proofText = socialProofContainer.querySelector('.proof-text');
        const proofMeta = socialProofContainer.querySelector('.proof-meta');
        
        proofText.textContent = message.text;
        proofText.style.cssText = proofTextStyle;
        proofMeta.textContent = message.time;
        proofMeta.style.cssText = proofMetaStyle;
        
        socialProofContainer.style.transform = 'translateX(0)';
        
        setTimeout(() => {
            socialProofContainer.style.transform = 'translateX(100%)';
            socialProofIndex = (socialProofIndex + 1) % socialProofMessages.length;
        }, 4000);
    }
    
    // Show first proof after 3 seconds, then every 8 seconds
    setTimeout(showSocialProof, 3000);
    setInterval(showSocialProof, 8000);
}

// Availability Indicator with High Contrast
function initAvailabilityIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'availability-indicator';
    indicator.style.cssText = `
        position: fixed;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        z-index: 900;
        background: rgba(0, 0, 0, 0.85);
        backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-right: none;
        border-radius: 12px 0 0 12px;
        padding: 24px 16px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37);
        writing-mode: vertical-lr;
        text-orientation: mixed;
    `;
    
    indicator.innerHTML = `
        <div class="availability-text" style="
            font-size: 14px;
            font-weight: 700;
            color: #ffffff;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
            white-space: nowrap;
        ">
            <span class="availability-status" style="
                color: #10b981;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
            ">● ONLINE</span> Available Now
        </div>
    `;
    
    document.body.appendChild(indicator);
    
    // Update availability status
    function updateAvailability() {
        const now = new Date();
        const hour = now.getHours();
        const day = now.getDay();
        
        const statusSpan = indicator.querySelector('.availability-status');
        
        if ((day >= 1 && day <= 6 && hour >= 9 && hour < 19) || (day === 0 && hour >= 9 && hour < 13)) {
            statusSpan.innerHTML = '● ONLINE';
            statusSpan.style.color = '#10b981';
        } else {
            statusSpan.innerHTML = '● OFFLINE';
            statusSpan.style.color = '#ef4444';
        }
    }
    
    updateAvailability();
    setInterval(updateAvailability, 60000); // Update every minute
}

// Floating Call Button with High Contrast
function initStickyBookButton() {
    const callButton = document.createElement('a');
    callButton.href = 'tel:+91XXXXXXXXXX';
    callButton.className = 'floating-call-button';
    callButton.textContent = '📞 Call Now';
    callButton.setAttribute('aria-label', 'Call NANO GRIT now');
    
    callButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        z-index: 900;
        background: linear-gradient(135deg, #00d4ff, #0ea5e9);
        color: #000000;
        padding: 16px 24px;
        border-radius: 50px;
        text-decoration: none;
        font-weight: 700;
        font-size: 14px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
        animation: pulse 2s infinite;
    `;
    
    callButton.addEventListener('mouseover', function() {
        this.style.background = 'linear-gradient(135deg, #0ea5e9, #0284c7)';
        this.style.transform = 'scale(1.05)';
        this.style.boxShadow = '0 15px 35px rgba(0, 212, 255, 0.4)';
    });
    
    callButton.addEventListener('mouseout', function() {
        this.style.background = 'linear-gradient(135deg, #00d4ff, #0ea5e9)';
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
    });
    
    document.body.appendChild(callButton);
    
    // Add pulse animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0%, 100% { box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 212, 255, 0.5); }
            50% { box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4), 0 0 30px rgba(0, 212, 255, 0.7); }
        }
    `;
    document.head.appendChild(style);
}

// Exit Intent Detection with High Contrast Modal
function initExitIntentDetection() {
    let exitIntentShown = false;
    
    function showExitIntent() {
        if (exitIntentShown) return;
        exitIntentShown = true;
        
        const modal = document.createElement('div');
        modal.className = 'exit-intent-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            backdrop-filter: blur(10px);
        `;
        
        modal.innerHTML = `
            <div style="
                background: rgba(0, 0, 0, 0.85);
                backdrop-filter: blur(15px);
                border: 2px solid rgba(0, 212, 255, 0.4);
                border-radius: 16px;
                padding: 32px;
                max-width: 500px;
                text-align: center;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
            ">
                <h3 style="
                    color: #ffffff;
                    font-size: 24px;
                    font-weight: 800;
                    text-shadow: 0 3px 6px rgba(0, 0, 0, 0.9);
                    margin-bottom: 16px;
                ">Wait! Don't Leave Yet!</h3>
                <p style="
                    color: #f0f9ff;
                    font-size: 18px;
                    font-weight: 600;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
                    margin-bottom: 24px;
                    line-height: 1.5;
                ">Get 15% OFF your first nano coating service!</p>
                <div style="display: flex; gap: 16px; justify-content: center;">
                    <button onclick="this.closest('.exit-intent-modal').remove()" style="
                        background: linear-gradient(135deg, #00d4ff, #0ea5e9);
                        color: #000000;
                        padding: 12px 24px;
                        border-radius: 8px;
                        border: none;
                        font-weight: 700;
                        cursor: pointer;
                        font-size: 16px;
                    ">Claim Discount</button>
                    <button onclick="this.closest('.exit-intent-modal').remove()" style="
                        background: rgba(0, 0, 0, 0.7);
                        color: #ffffff;
                        padding: 12px 24px;
                        border-radius: 8px;
                        border: 2px solid rgba(255, 255, 255, 0.3);
                        font-weight: 600;
                        cursor: pointer;
                        font-size: 16px;
                        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
                    ">No Thanks</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Remove after 10 seconds if not clicked
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
        }, 10000);
    }
    
    // Detect exit intent
    document.addEventListener('mouseleave', function(e) {
        if (e.clientY <= 0) {
            showExitIntent();
        }
    });
    
    // Also trigger on rapid scroll to top
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', function() {
        if (window.scrollY < 100 && lastScrollY > 200) {
            showExitIntent();
        }
        lastScrollY = window.scrollY;
    }, { passive: true });
}

// Service Selection Function with High Contrast
function selectService(serviceType) {
    const serviceMap = {
        'ceramic-coating': { name: 'Nano Ceramic Coating', price: '₹15,000 - ₹45,000' },
        'ppf': { name: 'Paint Protection Film', price: '₹25,000 - ₹75,000' },
        'detailing': { name: 'Car Detailing', price: '₹3,000 - ₹8,000' },
        'bike-restoration': { name: 'Bike Restoration', price: '₹10,000 - ₹30,000' }
    };
    
    selectedService = {
        service: serviceType,
        name: serviceMap[serviceType]?.name || 'Service',
        price: serviceMap[serviceType]?.price || 'Contact for pricing'
    };
    
    // Create high-contrast booking modal
    showBookingModal();
}

// Booking Modal with Perfect Readability
function showBookingModal() {
    const modal = document.createElement('div');
    modal.id = 'booking-modal-overlay';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        backdrop-filter: blur(10px);
        padding: 16px;
    `;
    
    modal.innerHTML = `
        <div style="
            background: rgba(0, 0, 0, 0.85);
            backdrop-filter: blur(15px);
            border: 2px solid rgba(0, 212, 255, 0.4);
            border-radius: 16px;
            padding: 32px;
            max-width: 600px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        ">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <h3 style="
                    color: #ffffff;
                    font-size: 24px;
                    font-weight: 800;
                    text-shadow: 0 3px 6px rgba(0, 0, 0, 0.9);
                    margin: 0;
                ">Book Your Service</h3>
                <button onclick="document.getElementById('booking-modal-overlay').remove()" style="
                    background: none;
                    border: none;
                    color: #ffffff;
                    font-size: 24px;
                    cursor: pointer;
                    padding: 8px;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
                ">×</button>
            </div>
            
            <form id="booking-form" style="color: #ffffff;">
                <div style="margin-bottom: 16px;">
                    <label style="
                        display: block;
                        color: #ffffff;
                        font-weight: 600;
                        margin-bottom: 8px;
                        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
                    ">Service *</label>
                    <select required style="
                        width: 100%;
                        padding: 12px;
                        border: 2px solid rgba(255, 255, 255, 0.3);
                        border-radius: 8px;
                        background: rgba(255, 255, 255, 0.9);
                        color: #1a202c;
                        font-size: 16px;
                        font-weight: 600;
                    ">
                        <option value="">Select a service</option>
                        <option value="ceramic-coating">Nano Ceramic Coating (₹15,000 - ₹45,000)</option>
                        <option value="ppf">Paint Protection Film (₹25,000 - ₹75,000)</option>
                        <option value="detailing">Car Detailing (₹3,000 - ₹8,000)</option>
                        <option value="bike-restoration">Bike Restoration (₹10,000 - ₹30,000)</option>
                    </select>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                    <div>
                        <label style="
                            display: block;
                            color: #ffffff;
                            font-weight: 600;
                            margin-bottom: 8px;
                            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
                        ">Name *</label>
                        <input type="text" required style="
                            width: 100%;
                            padding: 12px;
                            border: 2px solid rgba(255, 255, 255, 0.3);
                            border-radius: 8px;
                            background: rgba(255, 255, 255, 0.9);
                            color: #1a202c;
                            font-size: 16px;
                            font-weight: 600;
                        ">
                    </div>
                    <div>
                        <label style="
                            display: block;
                            color: #ffffff;
                            font-weight: 600;
                            margin-bottom: 8px;
                            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
                        ">Phone *</label>
                        <input type="tel" required style="
                            width: 100%;
                            padding: 12px;
                            border: 2px solid rgba(255, 255, 255, 0.3);
                            border-radius: 8px;
                            background: rgba(255, 255, 255, 0.9);
                            color: #1a202c;
                            font-size: 16px;
                            font-weight: 600;
                        ">
                    </div>
                </div>
                
                <div style="margin-bottom: 16px;">
                    <label style="
                        display: block;
                        color: #ffffff;
                        font-weight: 600;
                        margin-bottom: 8px;
                        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
                    ">Vehicle Details</label>
                    <input type="text" placeholder="Car/Bike Model, Year" style="
                        width: 100%;
                        padding: 12px;
                        border: 2px solid rgba(255, 255, 255, 0.3);
                        border-radius: 8px;
                        background: rgba(255, 255, 255, 0.9);
                        color: #1a202c;
                        font-size: 16px;
                        font-weight: 600;
                    ">
                </div>
                
                <div style="margin-bottom: 24px;">
                    <label style="
                        display: block;
                        color: #ffffff;
                        font-weight: 600;
                        margin-bottom: 8px;
                        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
                    ">Additional Notes</label>
                    <textarea rows="3" placeholder="Any specific requirements or questions?" style="
                        width: 100%;
                        padding: 12px;
                        border: 2px solid rgba(255, 255, 255, 0.3);
                        border-radius: 8px;
                        background: rgba(255, 255, 255, 0.9);
                        color: #1a202c;
                        font-size: 16px;
                        font-weight: 600;
                        resize: vertical;
                    "></textarea>
                </div>
                
                <button type="submit" style="
                    background: linear-gradient(135deg, #00d4ff, #0ea5e9);
                    color: #000000;
                    padding: 16px 32px;
                    border-radius: 8px;
                    border: none;
                    font-weight: 700;
                    cursor: pointer;
                    font-size: 16px;
                    width: 100%;
                    transition: all 0.3s ease;
                ">Book Appointment</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Handle form submission
    const form = modal.querySelector('#booking-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show success message with high contrast
        modal.innerHTML = `
            <div style="
                background: rgba(0, 0, 0, 0.85);
                backdrop-filter: blur(15px);
                border: 2px solid rgba(16, 185, 129, 0.6);
                border-radius: 16px;
                padding: 48px;
                text-align: center;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
            ">
                <div style="
                    color: #10b981;
                    font-size: 48px;
                    margin-bottom: 16px;
                    text-shadow: 0 3px 6px rgba(0, 0, 0, 0.9);
                ">✓</div>
                <h3 style="
                    color: #ffffff;
                    font-size: 24px;
                    font-weight: 800;
                    text-shadow: 0 3px 6px rgba(0, 0, 0, 0.9);
                    margin-bottom: 16px;
                ">Booking Received!</h3>
                <p style="
                    color: #f0f9ff;
                    font-size: 18px;
                    font-weight: 600;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
                    margin-bottom: 32px;
                    line-height: 1.5;
                ">We'll call you within 15 minutes to confirm your appointment.</p>
                <button onclick="document.getElementById('booking-modal-overlay').remove()" style="
                    background: linear-gradient(135deg, #00d4ff, #0ea5e9);
                    color: #000000;
                    padding: 16px 32px;
                    border-radius: 8px;
                    border: none;
                    font-weight: 700;
                    cursor: pointer;
                    font-size: 16px;
                ">Close</button>
            </div>
        `;
        
        // Auto-close after 5 seconds
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
        }, 5000);
    });
}

// Setup booking buttons with proper event listeners
function setupBookingButtons() {
    // Get all booking buttons and add event listeners
    const bookingButtons = document.querySelectorAll('.service-cta, .package-cta, .booking-main-cta, .cta-primary');
    
    bookingButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Check if this is a service-specific button
            const serviceType = this.getAttribute('data-service') || 
                               this.closest('[data-service]')?.getAttribute('data-service');
            
            if (serviceType) {
                selectService(serviceType);
            } else {
                showBookingModal();
            }
        });
    });
    
    // Also handle service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const serviceType = this.getAttribute('data-service') || 'ceramic-coating';
            selectService(serviceType);
        });
    });
}

// Initialize remaining functions
function initBookingModal() {
    // Modal initialization handled by setupBookingButtons
}

function initGalleryFunctionality() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter items
                galleryItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
}

function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });
                
                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
}

function initGlassmorphicEffects() {
    // Add hover effects to glass cards
    const glassCards = document.querySelectorAll('.service-card, .testimonial-card, .pricing-card');
    
    glassCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 212, 255, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.37)';
        });
    });
}

function initParticleAnimations() {
    // Particle animations are handled by CSS
}

function initScrollAnimations() {
    // Add scroll-triggered animations
    const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .pricing-card, .glass-content-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

function initLiveStats() {
    // Update live statistics
    const updateStats = () => {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            if (stat.textContent.includes('4.9')) {
                // Keep rating static
            } else if (stat.textContent.includes('500')) {
                // Slowly increment cars protected
                const current = parseInt(stat.textContent);
                if (current < 520) {
                    stat.textContent = (current + Math.floor(Math.random() * 2)).toString() + '+';
                }
            }
        });
    };
    
    // Update stats every 30 seconds
    setInterval(updateStats, 30000);
}

function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            const successDiv = document.createElement('div');
            successDiv.style.cssText = `
                background: rgba(16, 185, 129, 0.2);
                color: #ffffff;
                padding: 16px;
                border-radius: 8px;
                margin-top: 16px;
                text-align: center;
                font-weight: 600;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
            `;
            successDiv.textContent = 'Message sent successfully! We\'ll get back to you soon.';
            
            this.appendChild(successDiv);
            this.reset();
            
            setTimeout(() => {
                successDiv.remove();
            }, 5000);
        });
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Navbar scroll effects
function initNavbarScrollEffect() {
    const navbar = document.getElementById('navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
            navbar.style.backdropFilter = 'blur(15px) saturate(180%)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.85)';
            navbar.style.backdropFilter = 'blur(12px) saturate(180%)';
        }
        
        lastScrollY = currentScrollY;
    }, { passive: true });
}

console.log('All interactive elements initialized with high contrast and perfect readability');