// Enhanced Glassmorphic NANO GRIT Website JavaScript - HIGH READABILITY VERSION - FIXED

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
    
    // Initialize existing functionality
    initSmoothScrolling();
    initNavbarScrollEffect();
    
    // Ensure text remains high contrast
    enforceHighContrastText();
    
    // Add global event listeners for booking buttons
    setupBookingButtons();
});

// Global variables for booking
let selectedService = null;
let formData = {};
let currentStep = 1;

// Setup booking buttons with proper event listeners
function setupBookingButtons() {
    // Get all booking buttons and add event listeners
    const bookingButtons = document.querySelectorAll('[onclick*="openBookingModal"], [onclick*="selectService"], .btn[onclick*="Book"]');
    
    bookingButtons.forEach(button => {
        // Remove inline onclick handlers
        button.removeAttribute('onclick');
        
        // Add proper event listener
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Check if this is a service-specific button
            const serviceType = this.getAttribute('data-service') || 
                               this.closest('[data-service]')?.getAttribute('data-service') ||
                               extractServiceFromButton(this);
            
            if (serviceType) {
                selectService(serviceType);
            } else {
                openBookingModal();
            }
        });
    });
    
    // Also handle service highlight cards
    const serviceCards = document.querySelectorAll('.highlight-card, .service-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const serviceType = this.getAttribute('data-service') || extractServiceFromCard(this);
            if (serviceType) {
                selectService(serviceType);
            }
        });
    });
}

// Extract service type from button context
function extractServiceFromButton(button) {
    const text = button.textContent.toLowerCase();
    if (text.includes('ceramic') || text.includes('coating')) return 'ceramic-coating';
    if (text.includes('ppf') || text.includes('protection film')) return 'ppf';
    if (text.includes('detailing')) return 'detailing';
    if (text.includes('bike') || text.includes('restoration')) return 'bike-restoration';
    return null;
}

// Extract service type from card context
function extractServiceFromCard(card) {
    const text = card.textContent.toLowerCase();
    if (text.includes('nano ceramic coating')) return 'ceramic-coating';
    if (text.includes('paint protection film')) return 'ppf';
    if (text.includes('professional detailing') || text.includes('car detailing')) return 'detailing';
    if (text.includes('bike restoration')) return 'bike-restoration';
    return null;
}

// Service Selection Function - Fixed
function selectService(serviceType) {
    console.log('Selecting service:', serviceType);
    
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
    
    openBookingModal();
    
    // Pre-select the service in the modal after it opens
    setTimeout(() => {
        const serviceOption = document.querySelector(`[data-service="${serviceType}"]`);
        if (serviceOption && serviceOption.classList.contains('service-option')) {
            serviceOption.click();
        }
    }, 500);
}

// Booking Modal Functions - Fixed
function openBookingModal() {
    console.log('Opening booking modal');
    
    const modal = document.getElementById('booking-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Reset wizard to first step
        resetBookingWizard();
        
        // Show special offer notification
        setTimeout(() => {
            showNotification('🎉 Special Offer: Get 15% OFF your first service!', 'success');
        }, 1000);
        
        // Ensure modal is visible
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.style.pointerEvents = 'all';
        }, 10);
    } else {
        console.error('Booking modal not found');
    }
}

function closeBookingModal() {
    const modal = document.getElementById('booking-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.opacity = '0';
        modal.style.pointerEvents = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Exit Intent Functions
function closeExitModal() {
    const modal = document.getElementById('exit-intent-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function claimOffer() {
    closeExitModal();
    openBookingModal();
    showNotification('💰 15% Discount Applied! Complete your booking to claim this offer.', 'success');
}

// Gallery Functions - Fixed
function openLightbox(galleryItem) {
    console.log('Opening lightbox for:', galleryItem);
    
    const lightbox = document.getElementById('lightbox');
    const img = galleryItem.querySelector('img');
    const overlay = galleryItem.querySelector('.gallery-overlay');
    
    if (lightbox && img) {
        const title = overlay ? overlay.querySelector('h3')?.textContent || 'Gallery Image' : 'Gallery Image';
        const description = overlay ? overlay.querySelector('p')?.textContent || '' : '';
        
        document.getElementById('lightbox-image').src = img.src;
        document.getElementById('lightbox-title').textContent = title;
        document.getElementById('lightbox-description').textContent = description;
        
        lightbox.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Ensure lightbox is visible
        setTimeout(() => {
            lightbox.style.opacity = '1';
            lightbox.style.pointerEvents = 'all';
        }, 10);
    } else {
        console.error('Lightbox or image not found');
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.add('hidden');
        lightbox.style.opacity = '0';
        lightbox.style.pointerEvents = 'none';
        document.body.style.overflow = 'auto';
    }
}

// High Contrast Text Enforcement
function enforceHighContrastText() {
    // Ensure all text elements have high contrast
    const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div, a, li, td, th, label, input, button, .nav-link, .glass-link');
    
    textElements.forEach(element => {
        // Skip elements that are specifically styled (like buttons with colored backgrounds)
        if (element.classList.contains('btn--primary') || element.classList.contains('featured-badge') || element.classList.contains('claim-offer-btn')) {
            return;
        }
        
        // Ensure text shadows for readability
        const currentStyle = window.getComputedStyle(element);
        if (!currentStyle.textShadow || currentStyle.textShadow === 'none') {
            if (element.tagName.match(/H[1-6]/)) {
                element.style.textShadow = '0 3px 6px rgba(0, 0, 0, 0.9)';
            } else {
                element.style.textShadow = '0 2px 4px rgba(0, 0, 0, 0.8)';
            }
        }
        
        // Ensure high font weights
        if (element.tagName.match(/H[1-6]/)) {
            element.style.fontWeight = '800';
        } else if (!element.classList.contains('text-sm') && !element.classList.contains('nav-tagline')) {
            element.style.fontWeight = '600';
        }
    });
    
    // Special handling for form inputs - ensure they have light backgrounds
    const inputs = document.querySelectorAll('.glass-input');
    inputs.forEach(input => {
        input.style.background = 'rgba(255, 255, 255, 0.9)';
        input.style.color = '#0f172a';
        input.style.fontWeight = '600';
    });
}

// Enhanced Navigation with Glass Effects
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Add glass blur effect when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.backdropFilter = 'blur(5px)';
            } else {
                document.body.style.backdropFilter = 'none';
            }
        });
        
        // Enhanced close functionality
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.backdropFilter = 'none';
                
                // Add ripple effect
                createRippleEffect(this, e);
            });
        });
    }
}

// Animated Counters for Statistics
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.counter, .live-counter');
    
    const animateCounter = (counter) => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format the number based on the target
            if (target === 4.9) {
                counter.textContent = current.toFixed(1);
            } else if (target >= 99) {
                counter.textContent = current.toFixed(1);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 20);
    };
    
    // Use Intersection Observer to trigger animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// Floating Testimonials System
function initFloatingTestimonials() {
    const floatingTestimonials = document.getElementById('floating-testimonials');
    if (!floatingTestimonials) return;
    
    const testimonials = [
        {
            stars: "★★★★★",
            text: "Amazing ceramic coating service!",
            reviewer: "Megha"
        },
        {
            stars: "★★★★★", 
            text: "Professional work, great results!",
            reviewer: "Julian"
        },
        {
            stars: "★★★★★",
            text: "Sanjay is a true expert!",
            reviewer: "Vittal"
        },
        {
            stars: "★★★★★",
            text: "Best coating service in Bangalore!",
            reviewer: "Sabal"
        }
    ];
    
    let currentTestimonial = 0;
    
    function showFloatingTestimonial() {
        if (window.scrollY > 500) {
            const testimonial = testimonials[currentTestimonial];
            
            floatingTestimonials.innerHTML = `
                <div class="floating-review glass-card">
                    <div class="review-stars">${testimonial.stars}</div>
                    <p>"${testimonial.text}"</p>
                    <span class="reviewer">- ${testimonial.reviewer}</span>
                </div>
            `;
            
            floatingTestimonials.classList.add('show');
            
            setTimeout(() => {
                floatingTestimonials.classList.remove('show');
            }, 4000);
            
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        }
    }
    
    // Show testimonials periodically
    setInterval(showFloatingTestimonial, 8000);
    
    // Show first testimonial after delay
    setTimeout(showFloatingTestimonial, 3000);
}

// Availability Indicator
function initAvailabilityIndicator() {
    const indicator = document.getElementById('availability-indicator');
    if (!indicator) return;
    
    function showAvailabilityIndicator() {
        if (window.scrollY > 200) {
            indicator.classList.add('show');
            
            setTimeout(() => {
                indicator.classList.remove('show');
            }, 5000);
        }
    }
    
    // Show indicator periodically
    setInterval(showAvailabilityIndicator, 15000);
    
    // Initial show
    setTimeout(showAvailabilityIndicator, 5000);
    
    // Click handler to scroll to booking
    indicator.addEventListener('click', () => {
        openBookingModal();
        indicator.classList.remove('show');
    });
}

// Sticky Book Now Button
function initStickyBookButton() {
    const stickyBtn = document.getElementById('sticky-book-btn');
    if (!stickyBtn) return;
    
    function toggleStickyButton() {
        const heroSection = document.getElementById('home');
        const contactSection = document.getElementById('contact');
        
        if (!heroSection || !contactSection) return;
        
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const contactTop = contactSection.offsetTop;
        
        if (window.scrollY > heroBottom && window.scrollY < contactTop - 200) {
            stickyBtn.classList.add('visible');
        } else {
            stickyBtn.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', debounce(toggleStickyButton, 100));
}

// Exit Intent Detection
function initExitIntentDetection() {
    const modal = document.getElementById('exit-intent-modal');
    if (!modal) return;
    
    let exitIntentTriggered = false;
    
    function handleExitIntent(e) {
        if (e.clientY <= 0 && !exitIntentTriggered && window.scrollY > 1000) {
            exitIntentTriggered = true;
            showExitIntentModal();
        }
    }
    
    function showExitIntentModal() {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Analytics event
        console.log('Exit intent triggered - showing special offer');
    }
    
    // Event listeners
    document.addEventListener('mouseout', handleExitIntent);
    
    // Don't trigger on mobile
    if (window.innerWidth <= 768) {
        document.removeEventListener('mouseout', handleExitIntent);
    }
    
    // Auto trigger after 2 minutes if user hasn't seen it
    setTimeout(() => {
        if (!exitIntentTriggered && window.scrollY > 500) {
            exitIntentTriggered = true;
            showExitIntentModal();
        }
    }, 120000);
}

// Booking Modal Initialization - Fixed
function initBookingModal() {
    const wizard = document.getElementById('booking-wizard');
    if (!wizard) return;
    
    // Service selection
    const serviceOptions = wizard.querySelectorAll('.service-option');
    serviceOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            serviceOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            selectedService = {
                service: this.dataset.service,
                price: this.dataset.price,
                name: this.dataset.name
            };
            
            // Enable next button
            const nextBtn = wizard.querySelector('.next-step');
            if (nextBtn) {
                nextBtn.disabled = false;
                nextBtn.style.opacity = '1';
            }
            
            // Add selection animation
            createSelectionEffect(this);
            
            console.log('Service selected:', selectedService);
        });
    });
    
    // Next/Previous buttons
    wizard.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (e.target.classList.contains('next-step')) {
            if (validateCurrentStep()) {
                nextStep();
            }
        } else if (e.target.classList.contains('prev-step')) {
            prevStep();
        } else if (e.target.classList.contains('submit-booking')) {
            submitBooking();
        }
    });
    
    function nextStep() {
        if (currentStep < 3) {
            const steps = wizard.querySelectorAll('.wizard-step');
            const progressSteps = wizard.querySelectorAll('.progress-step');
            
            steps[currentStep - 1].classList.remove('active');
            progressSteps[currentStep - 1].classList.remove('active');
            
            currentStep++;
            
            steps[currentStep - 1].classList.add('active');
            progressSteps[currentStep - 1].classList.add('active');
            
            if (currentStep === 3) {
                updateBookingSummary();
            }
            
            console.log('Advanced to step:', currentStep);
        }
    }
    
    function prevStep() {
        if (currentStep > 1) {
            const steps = wizard.querySelectorAll('.wizard-step');
            const progressSteps = wizard.querySelectorAll('.progress-step');
            
            steps[currentStep - 1].classList.remove('active');
            progressSteps[currentStep - 1].classList.remove('active');
            
            currentStep--;
            
            steps[currentStep - 1].classList.add('active');
            progressSteps[currentStep - 1].classList.add('active');
            
            console.log('Returned to step:', currentStep);
        }
    }
    
    function validateCurrentStep() {
        if (currentStep === 1) {
            const isValid = selectedService !== null;
            if (!isValid) {
                showNotification('Please select a service to continue.', 'error');
            }
            return isValid;
        } else if (currentStep === 2) {
            const requiredFields = wizard.querySelectorAll('#step-2 input[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('error');
                    isValid = false;
                } else {
                    field.classList.remove('error');
                    formData[field.id] = field.value;
                }
            });
            
            if (!isValid) {
                showNotification('Please fill in all required fields.', 'error');
            }
            
            return isValid;
        }
        return true;
    }
    
    function updateBookingSummary() {
        const summaryElement = document.getElementById('summary-details');
        if (!summaryElement || !selectedService) return;
        
        summaryElement.innerHTML = `
            <div class="summary-item">
                <strong>Service:</strong> ${selectedService.name}
            </div>
            <div class="summary-item">
                <strong>Price:</strong> ${selectedService.price}
            </div>
            <div class="summary-item">
                <strong>Name:</strong> ${formData['customer-name'] || 'N/A'}
            </div>
            <div class="summary-item">
                <strong>Phone:</strong> ${formData['customer-phone'] || 'N/A'}
            </div>
            <div class="summary-item">
                <strong>Vehicle:</strong> ${formData['vehicle-info'] || 'N/A'}
            </div>
            <div class="summary-item">
                <strong>Preferred Date:</strong> ${formData['preferred-date'] || 'ASAP'}
            </div>
            <div class="discount-notice glass-card" style="margin-top: 16px; padding: 12px; background: linear-gradient(45deg, rgba(31, 184, 205, 0.1), rgba(50, 160, 203, 0.1)); border: 1px solid rgba(31, 184, 205, 0.3);">
                <strong>🎉 Special Offer Applied: 15% OFF</strong>
            </div>
        `;
        
        // Ensure summary text is readable
        setTimeout(() => {
            enforceElementTextContrast(summaryElement);
        }, 10);
    }
    
    function submitBooking() {
        const submitBtn = wizard.querySelector('.submit-booking');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;
        submitBtn.classList.add('btn--loading');
        
        // Simulate API call
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('btn--loading');
            
            showBookingSuccessNotification();
            closeBookingModal();
            resetBookingWizard();
        }, 2500);
    }
    
    function resetBookingWizard() {
        currentStep = 1;
        selectedService = null;
        formData = {};
        
        const steps = wizard.querySelectorAll('.wizard-step');
        const progressSteps = wizard.querySelectorAll('.progress-step');
        
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === 0);
        });
        
        progressSteps.forEach((step, index) => {
            step.classList.toggle('active', index === 0);
        });
        
        serviceOptions.forEach(option => option.classList.remove('selected'));
        const nextBtn = wizard.querySelector('.next-step');
        if (nextBtn) {
            nextBtn.disabled = true;
            nextBtn.style.opacity = '0.5';
        }
        
        // Reset form
        const form = wizard.querySelector('.booking-form');
        if (form) form.reset();
        
        console.log('Booking wizard reset');
    }
}

// Gallery Functionality - Fixed
function initGalleryFunctionality() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (!filterButtons.length || !galleryItems.length) return;
    
    // Add click event to gallery items
    galleryItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Gallery item clicked:', this);
            openLightbox(this);
        });
        
        // Ensure cursor pointer
        item.style.cursor = 'pointer';
    });
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const filter = this.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.dataset.category;
                const shouldShow = filter === 'all' || category === filter;
                
                if (shouldShow) {
                    item.style.display = 'block';
                    // Add animation
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    
                    setTimeout(() => {
                        item.style.transition = 'all 0.3s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.transition = 'all 0.3s ease';
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
            
            // Add ripple effect to button
            createRippleEffect(this, e);
        });
    });
    
    console.log('Gallery functionality initialized with', galleryItems.length, 'items');
}

// FAQ Accordion - Fixed
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (!faqItems.length) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        if (question && answer) {
            question.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('FAQ item clicked:', item);
                
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        const otherToggle = otherItem.querySelector('.faq-toggle');
                        if (otherAnswer) {
                            otherAnswer.style.display = 'none';
                        }
                        if (otherToggle) {
                            otherToggle.textContent = '+';
                        }
                    }
                });
                
                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                    answer.style.display = 'none';
                    if (toggle) toggle.textContent = '+';
                    console.log('FAQ closed');
                } else {
                    item.classList.add('active');
                    answer.style.display = 'block';
                    if (toggle) toggle.textContent = '−';
                    
                    // Ensure text remains high contrast in opened FAQ
                    setTimeout(() => {
                        const answerText = answer.querySelector('p');
                        if (answerText) {
                            answerText.style.color = '#e0f8ff';
                            answerText.style.fontWeight = '600';
                            answerText.style.textShadow = '0 2px 4px rgba(0, 0, 0, 0.8)';
                        }
                        console.log('FAQ opened and text contrast enforced');
                    }, 10);
                }
            });
            
            // Ensure question is clickable
            question.style.cursor = 'pointer';
        }
    });
    
    console.log('FAQ accordion initialized with', faqItems.length, 'items');
}

// Particle Animations
function initParticleAnimations() {
    const particleContainer = document.querySelector('.floating-particles');
    if (!particleContainer) return;
    
    // Create additional floating particles dynamically
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(31, 184, 205, ${Math.random() * 0.8 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 15}s linear infinite;
            box-shadow: 0 0 ${Math.random() * 10 + 5}px rgba(31, 184, 205, 0.5);
        `;
        
        particleContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 25000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 2000);
    
    // Create initial particles
    for (let i = 0; i < 5; i++) {
        setTimeout(createParticle, i * 500);
    }
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.glass-card, .service-card, .benefit-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.8s ease forwards';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Ensure text contrast after animation
                setTimeout(() => {
                    enforceElementTextContrast(entry.target);
                }, 100);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
    
    // Add CSS animation keyframes
    if (!document.getElementById('scroll-animations')) {
        const style = document.createElement('style');
        style.id = 'scroll-animations';
        style.textContent = `
            @keyframes slideInUp {
                0% {
                    opacity: 0;
                    transform: translateY(30px);
                }
                100% {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes loading-shimmer {
                0% { left: -100%; }
                100% { left: 100%; }
            }
            
            .form-control.error {
                border-color: #ef4444 !important;
                box-shadow: 0 0 10px rgba(239, 68, 68, 0.5) !important;
                background: rgba(239, 68, 68, 0.1) !important;
            }
            
            .form-control.success {
                border-color: #22c55e !important;
                box-shadow: 0 0 10px rgba(34, 197, 94, 0.5) !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Helper function to enforce text contrast on specific element
function enforceElementTextContrast(element) {
    const textElements = element.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div, a, li');
    textElements.forEach(textEl => {
        if (!textEl.classList.contains('btn--primary') && !textEl.classList.contains('featured-badge')) {
            textEl.style.color = textEl.tagName.match(/H[1-6]/) ? '#ffffff' : '#e0f8ff';
            textEl.style.fontWeight = textEl.tagName.match(/H[1-6]/) ? '800' : '600';
            textEl.style.textShadow = textEl.tagName.match(/H[1-6]/) ? '0 3px 6px rgba(0, 0, 0, 0.9)' : '0 2px 4px rgba(0, 0, 0, 0.8)';
        }
    });
}

// Glassmorphic Effects
function initGlassmorphicEffects() {
    // Add mouse tracking for glass reflection effects
    const glassCards = document.querySelectorAll('.glass-card');
    
    glassCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
    
    // Glass input focus effects
    const glassInputs = document.querySelectorAll('.glass-input');
    glassInputs.forEach(input => {
        input.addEventListener('focus', function() {
            if (this.parentElement) {
                this.parentElement.style.transform = 'scale(1.02)';
                this.parentElement.style.transition = 'transform 0.3s ease';
            }
            
            // Ensure input remains readable on focus
            this.style.background = 'rgba(255, 255, 255, 0.95)';
            this.style.color = '#0f172a';
        });
        
        input.addEventListener('blur', function() {
            if (this.parentElement) {
                this.parentElement.style.transform = 'scale(1)';
            }
        });
    });
}

// Live Stats Updates
function initLiveStats() {
    const liveStats = document.querySelector('.live-stats');
    if (!liveStats) return;
    
    // Simulate real-time updates
    function updateStats() {
        const carsProtected = document.querySelector('.live-counter[data-target="500"]');
        const successRate = document.querySelector('.live-counter[data-target="99.8"]');
        
        if (carsProtected && !carsProtected.classList.contains('animated')) {
            const current = parseInt(carsProtected.textContent) || 500;
            if (Math.random() > 0.7) { // 30% chance to increment
                carsProtected.textContent = current + 1;
                createCounterUpdateAnimation(carsProtected);
            }
        }
        
        // Randomly fluctuate success rate slightly
        if (successRate && !successRate.classList.contains('animated') && Math.random() > 0.8) {
            const variations = [99.8, 99.9, 100];
            const newRate = variations[Math.floor(Math.random() * variations.length)];
            successRate.textContent = newRate.toFixed(1);
            createCounterUpdateAnimation(successRate);
        }
    }
    
    // Update stats periodically
    setInterval(updateStats, 30000); // Every 30 seconds
}

// Utility Functions
function createRippleEffect(element, event) {
    if (!event || !event.clientX || !event.clientY) return;
    
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(31, 184, 205, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        z-index: 1000;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
    
    // Add ripple animation if not exists
    if (!document.getElementById('ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function createSelectionEffect(element) {
    element.style.animation = 'selection-pulse 0.6s ease';
    
    if (!document.getElementById('selection-animation')) {
        const style = document.createElement('style');
        style.id = 'selection-animation';
        style.textContent = `
            @keyframes selection-pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
}

function createCounterUpdateAnimation(element) {
    element.style.animation = 'counter-update 0.8s ease';
    
    if (!document.getElementById('counter-update-animation')) {
        const style = document.createElement('style');
        style.id = 'counter-update-animation';
        style.textContent = `
            @keyframes counter-update {
                0% { transform: scale(1); color: inherit; }
                50% { transform: scale(1.2); color: #1fb8cd; }
                100% { transform: scale(1); color: inherit; }
            }
        `;
        document.head.appendChild(style);
    }
}

function showBookingSuccessNotification() {
    showNotification('✅ Booking Request Sent Successfully! We\'ll contact you within 24 hours to confirm your appointment. Check your phone for our call!', 'success');
}

// Enhanced Notification System with High Contrast
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create glassmorphic notification with high contrast
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    
    const bgColor = type === 'success' ? 'rgba(0, 0, 0, 0.8)' : 
                   type === 'error' ? 'rgba(0, 0, 0, 0.8)' : 
                   'rgba(0, 0, 0, 0.8)';
    
    const borderColor = type === 'success' ? 'rgba(34, 197, 94, 0.5)' : 
                       type === 'error' ? 'rgba(239, 68, 68, 0.5)' : 
                       'rgba(59, 130, 246, 0.5)';
    
    const textColor = type === 'success' ? '#86efac' : 
                     type === 'error' ? '#fca5a5' : 
                     '#93c5fd';
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
        backdrop-filter: blur(10px);
        border: 2px solid ${borderColor};
        color: ${textColor};
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 600;
        font-size: 14px;
        line-height: 1.4;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
    `;
    
    notification.textContent = message;
    
    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: 8px;
        right: 12px;
        background: none;
        border: none;
        color: ${textColor};
        font-size: 20px;
        font-weight: 700;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.2s ease;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
    `;
    
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.background = 'rgba(255, 255, 255, 0.1)';
        closeBtn.style.transform = 'scale(1.1)';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.background = 'none';
        closeBtn.style.transform = 'scale(1)';
    });
    
    notification.appendChild(closeBtn);
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto dismiss
    const dismissTimer = setTimeout(() => {
        dismissNotification(notification);
    }, type === 'success' ? 8000 : 5000);
    
    // Close button functionality
    closeBtn.addEventListener('click', () => {
        clearTimeout(dismissTimer);
        dismissNotification(notification);
    });
}

function dismissNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Enhanced Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"], a[href^="#"]:not([href="#"])');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                // Smooth scroll with easing
                smoothScrollTo(targetPosition, 800);
            }
        });
    });
}

function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    // Easing function
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Enhanced Navbar Scroll Effect
function initNavbarScrollEffect() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    let lastScrollY = window.scrollY;
    
    function updateNavbar() {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
            navbar.style.borderBottom = '1px solid rgba(31, 184, 205, 0.3)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.85)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.2)';
        }
        
        // Hide/show navbar on scroll (only on desktop)
        if (window.innerWidth > 768) {
            if (scrollY > lastScrollY && scrollY > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollY = scrollY;
    }
    
    window.addEventListener('scroll', debounce(updateNavbar, 10), { passive: true });
}

// Debounce utility
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Mouse movement parallax effect - reduced intensity for better text readability
document.addEventListener('mousemove', debounce((e) => {
    const orbs = document.querySelectorAll('.orb');
    const patterns = document.querySelectorAll('.pattern');
    
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.3; // Reduced from 0.5
        const x = (mouseX - 0.5) * speed * 30; // Reduced from 50
        const y = (mouseY - 0.5) * speed * 30;
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
    
    patterns.forEach((pattern, index) => {
        const speed = (index + 1) * 0.2; // Reduced from 0.3
        const rotation = (mouseX - 0.5) * speed * 5; // Reduced from 10
        pattern.style.transform = `rotate(${rotation}deg)`;
    });
}, 16));

// Performance optimization - pause animations when not visible
document.addEventListener('visibilitychange', () => {
    const root = document.documentElement;
    if (document.hidden) {
        root.style.setProperty('--animation-play-state', 'paused');
    } else {
        root.style.setProperty('--animation-play-state', 'running');
    }
});

// Close modals with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.glass-modal:not(.hidden)');
        modals.forEach(modal => {
            if (modal.id === 'booking-modal') {
                closeBookingModal();
            } else if (modal.id === 'exit-intent-modal') {
                closeExitModal();
            } else if (modal.id === 'lightbox') {
                closeLightbox();
            }
        });
    }
});

// Set minimum date for booking
document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('preferred-date');
    if (dateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.min = tomorrow.toISOString().split('T')[0];
    }
});

// Periodic text contrast enforcement
setInterval(() => {
    enforceHighContrastText();
}, 5000);

// Handle dynamic content text contrast
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    setTimeout(() => {
                        enforceElementTextContrast(node);
                    }, 10);
                }
            });
        }
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Enhanced form validation with visual feedback
function validateInput(input) {
    const value = input.value.trim();
    const type = input.type;
    let isValid = true;
    let message = '';
    
    if (input.required && !value) {
        isValid = false;
        message = 'This field is required';
    } else if (type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        message = 'Please enter a valid email address';
    } else if (type === 'tel' && value && !isValidPhone(value)) {
        isValid = false;
        message = 'Please enter a valid phone number';
    }
    
    // Visual feedback
    input.classList.toggle('error', !isValid);
    input.classList.toggle('success', isValid && value);
    
    // Show/hide error message
    let errorMessage = input.parentNode.querySelector('.error-message');
    if (!isValid && message) {
        if (!errorMessage) {
            errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.style.cssText = `
                color: #fca5a5;
                font-size: 12px;
                font-weight: 600;
                text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
                margin-top: 4px;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            input.parentNode.appendChild(errorMessage);
        }
        errorMessage.textContent = message;
        setTimeout(() => {
            errorMessage.style.opacity = '1';
        }, 10);
    } else if (errorMessage) {
        errorMessage.style.opacity = '0';
        setTimeout(() => {
            if (errorMessage.parentNode) {
                errorMessage.parentNode.removeChild(errorMessage);
            }
        }, 300);
    }
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
}

// Add input validation listeners
document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('.glass-input');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateInput(input);
        });
        
        input.addEventListener('input', () => {
            // Clear error state on input
            if (input.classList.contains('error')) {
                input.classList.remove('error');
                const errorMessage = input.parentNode.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.style.opacity = '0';
                }
            }
        });
    });
});

// Console welcome message
console.log('%cNANO GRIT', 'color: #1fb8cd; font-size: 2rem; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.5);');
console.log('%cAdvanced Paint Protection Coatings', 'color: #32a0cb; font-size: 1rem; font-weight: 600;');
console.log('%c✨ Premium glassmorphic design with enhanced text readability - FIXED VERSION', 'color: #e0f8ff; font-size: 0.9rem;');

// Development helpers
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.nanogrit = {
        openBooking: openBookingModal,
        showOffer: () => {
            const modal = document.getElementById('exit-intent-modal');
            if (modal) modal.classList.remove('hidden');
        },
        testNotification: (message = 'Test notification', type = 'info') => {
            showNotification(message, type);
        },
        enforceContrast: enforceHighContrastText,
        testLightbox: () => {
            const firstGalleryItem = document.querySelector('.gallery-item');
            if (firstGalleryItem) openLightbox(firstGalleryItem);
        },
        testFAQ: () => {
            const firstFAQ = document.querySelector('.faq-item .faq-question');
            if (firstFAQ) firstFAQ.click();
        }
    };
    
    console.log('%c🛠️ Development mode: nanogrit object available in console', 'color: #fbbf24; font-size: 0.8rem;');
    console.log('%c🧪 Use nanogrit.testLightbox() or nanogrit.testFAQ() to test functionality', 'color: #86efac; font-size: 0.8rem;');
}

// Make functions globally available for HTML onclick handlers (fallback)
window.openBookingModal = openBookingModal;
window.closeBookingModal = closeBookingModal;
window.selectService = selectService;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.closeExitModal = closeExitModal;
window.claimOffer = claimOffer;