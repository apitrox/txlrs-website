// Texas Lawyer Referral Service - Main JavaScript

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Toggle icon
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }
    
    // Location Selector (Desktop)
    const locationSelector = document.getElementById('locationSelector');
    const phoneDisplay = document.getElementById('phoneDisplay');
    
    if (locationSelector && phoneDisplay) {
        locationSelector.addEventListener('change', function() {
            const phoneNumber = this.value;
            if (phoneNumber) {
                phoneDisplay.textContent = formatPhoneNumber(phoneNumber);
                phoneDisplay.href = 'tel:' + phoneNumber;
                
                // Also update mobile displays
                const mobilePhoneDisplays = document.querySelectorAll('#mobilePhoneDisplay');
                mobilePhoneDisplays.forEach(display => {
                    display.textContent = formatPhoneNumber(phoneNumber);
                    display.href = 'tel:' + phoneNumber;
                });
            }
        });
    }
    
    // Location Selector (Mobile)
    const mobileLocationSelector = document.getElementById('mobileLocationSelector');
    
    if (mobileLocationSelector) {
        mobileLocationSelector.addEventListener('change', function() {
            const phoneNumber = this.value;
            if (phoneNumber) {
                // Update all mobile phone displays
                const mobilePhoneDisplays = document.querySelectorAll('#mobilePhoneDisplay');
                mobilePhoneDisplays.forEach(display => {
                    display.textContent = formatPhoneNumber(phoneNumber);
                    display.href = 'tel:' + phoneNumber;
                });
                
                // Also update desktop
                if (phoneDisplay) {
                    phoneDisplay.textContent = formatPhoneNumber(phoneNumber);
                    phoneDisplay.href = 'tel:' + phoneNumber;
                }
                if (locationSelector) {
                    locationSelector.value = phoneNumber;
                }
            }
        });
    }
    
    // Mobile Location Hamburger Menu
    const mobileLocationMenuBtn = document.getElementById('mobileLocationMenuBtn');
    const mobileLocationMenu = document.getElementById('mobileLocationMenu');
    
    if (mobileLocationMenuBtn && mobileLocationMenu) {
        mobileLocationMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileLocationMenu.classList.toggle('hidden');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileLocationMenu.contains(e.target) && !mobileLocationMenuBtn.contains(e.target)) {
                mobileLocationMenu.classList.add('hidden');
            }
        });
        
        // Location option clicks
        const locationOptions = document.querySelectorAll('.location-option');
        locationOptions.forEach(option => {
            option.addEventListener('click', function() {
                const phoneNumber = this.getAttribute('data-phone');
                if (phoneNumber) {
                    // Update mobile phone display
                    const mobilePhoneDisplays = document.querySelectorAll('#mobilePhoneDisplay');
                    mobilePhoneDisplays.forEach(display => {
                        display.textContent = formatPhoneNumber(phoneNumber);
                        display.href = 'tel:' + phoneNumber;
                    });
                    
                    // Also update desktop
                    if (phoneDisplay) {
                        phoneDisplay.textContent = formatPhoneNumber(phoneNumber);
                        phoneDisplay.href = 'tel:' + phoneNumber;
                    }
                    if (locationSelector) {
                        locationSelector.value = phoneNumber;
                    }
                    
                    // Close menu
                    mobileLocationMenu.classList.add('hidden');
                }
            });
        });
    }
    
    // Desktop Location Hamburger Menu (for medium screens)
    const desktopLocationMenuBtn = document.getElementById('desktopLocationMenuBtn');
    const desktopLocationMenu = document.getElementById('desktopLocationMenu');
    
    if (desktopLocationMenuBtn && desktopLocationMenu) {
        desktopLocationMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            desktopLocationMenu.classList.toggle('hidden');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!desktopLocationMenu.contains(e.target) && !desktopLocationMenuBtn.contains(e.target)) {
                desktopLocationMenu.classList.add('hidden');
            }
        });
        
        // Desktop location option clicks
        const desktopLocationOptions = document.querySelectorAll('.desktop-location-option');
        desktopLocationOptions.forEach(option => {
            option.addEventListener('click', function() {
                const phoneNumber = this.getAttribute('data-phone');
                if (phoneNumber) {
                    // Update desktop phone display
                    if (phoneDisplay) {
                        phoneDisplay.textContent = formatPhoneNumber(phoneNumber);
                        phoneDisplay.href = 'tel:' + phoneNumber;
                    }
                    
                    // Update desktop selector if visible
                    if (locationSelector) {
                        locationSelector.value = phoneNumber;
                    }
                    
                    // Also update mobile
                    const mobilePhoneDisplays = document.querySelectorAll('#mobilePhoneDisplay');
                    mobilePhoneDisplays.forEach(display => {
                        display.textContent = formatPhoneNumber(phoneNumber);
                        display.href = 'tel:' + phoneNumber;
                    });
                    
                    // Close menu
                    desktopLocationMenu.classList.add('hidden');
                }
            });
        });
    }
    
    // Desktop Language Menu Handlers
    const desktopLanguageMenuBtn = document.getElementById('desktopLanguageMenuBtn');
    const desktopLanguageMenu = document.getElementById('desktopLanguageMenu');
    
    if (desktopLanguageMenuBtn && desktopLanguageMenu) {
        // Toggle menu on button click
        desktopLanguageMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            desktopLanguageMenu.classList.toggle('hidden');
            // Close location menu if open
            const desktopLocationMenu = document.getElementById('desktopLocationMenu');
            if (desktopLocationMenu) {
                desktopLocationMenu.classList.add('hidden');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!desktopLanguageMenuBtn.contains(e.target) && !desktopLanguageMenu.contains(e.target)) {
                desktopLanguageMenu.classList.add('hidden');
            }
        });
        
        // Handle language selection
        const desktopLanguageOptions = document.querySelectorAll('.desktop-language-option');
        desktopLanguageOptions.forEach(option => {
            option.addEventListener('click', function() {
                const langCode = this.getAttribute('data-lang');
                
                // Change language using the language handler
                if (typeof LanguageManager !== 'undefined' && LanguageManager.changeLanguage) {
                    LanguageManager.changeLanguage(langCode);
                }
                
                // Close menu
                desktopLanguageMenu.classList.add('hidden');
            });
        });
    }
    
    // Mobile Language Menu Handlers
    const mobileLanguageMenuBtn = document.getElementById('mobileLanguageMenuBtn');
    const mobileLanguageMenu = document.getElementById('mobileLanguageMenu');
    
    if (mobileLanguageMenuBtn && mobileLanguageMenu) {
        // Toggle menu on button click
        mobileLanguageMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileLanguageMenu.classList.toggle('hidden');
            // Close location menu if open
            const mobileLocationMenu = document.getElementById('mobileLocationMenu');
            if (mobileLocationMenu) {
                mobileLocationMenu.classList.add('hidden');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileLanguageMenuBtn.contains(e.target) && !mobileLanguageMenu.contains(e.target)) {
                mobileLanguageMenu.classList.add('hidden');
            }
        });
        
        // Handle language selection
        const mobileLanguageOptions = document.querySelectorAll('.mobile-language-option');
        mobileLanguageOptions.forEach(option => {
            option.addEventListener('click', function() {
                const langCode = this.getAttribute('data-lang');
                
                // Change language using the language handler
                if (typeof LanguageManager !== 'undefined' && LanguageManager.changeLanguage) {
                    LanguageManager.changeLanguage(langCode);
                }
                
                // Close menu
                mobileLanguageMenu.classList.add('hidden');
            });
        });
    }
    
    // Language Selector (Desktop)
    const languageSelector = document.getElementById('languageSelector');
    if (languageSelector) {
        languageSelector.addEventListener('change', function() {
            changeLanguage(this.value);
        });
    }
    
    // Language Selector (Mobile)
    const mobileLanguageSelector = document.getElementById('mobileLanguageSelector');
    if (mobileLanguageSelector) {
        mobileLanguageSelector.addEventListener('change', function() {
            changeLanguage(this.value);
            // Sync with desktop
            if (languageSelector) {
                languageSelector.value = this.value;
            }
        });
    }
    
    // Set current year in footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Format phone number for display
function formatPhoneNumber(phoneNumber) {
    // Remove all non-numeric characters
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // Format as XXX-XXX-XXXX
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return match[1] + '-' + match[2] + '-' + match[3];
    }
    
    return phoneNumber;
}

// Language change function
function changeLanguage(langCode) {
    // Define language URLs
    const languageUrls = {
        'en': 'index.html',
        'es': 'inicio.html',
        'zh-CN': 'index-zh.html',
        'fr': 'index-fr.html',
        'vi': 'index-vi.html'
    };
    
    // Check if we're on homepage
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (currentPage === 'index.html' || currentPage === '') {
        // For homepage, redirect to language-specific version
        const targetUrl = languageUrls[langCode];
        if (targetUrl && langCode !== 'en') {
            // Only redirect if not English (current page)
            // window.location.href = targetUrl;
            // For now, just store preference
            localStorage.setItem('preferredLanguage', langCode);
            console.log('Language preference saved:', langCode);
        } else {
            localStorage.setItem('preferredLanguage', 'en');
        }
    } else {
        // For other pages, store preference for future implementation
        localStorage.setItem('preferredLanguage', langCode);
        console.log('Language preference saved:', langCode);
    }
}

// Load preferred language on page load
window.addEventListener('load', function() {
    const preferredLang = localStorage.getItem('preferredLanguage');
    if (preferredLang) {
        const languageSelector = document.getElementById('languageSelector');
        const mobileLanguageSelector = document.getElementById('mobileLanguageSelector');
        
        if (languageSelector) {
            languageSelector.value = preferredLang;
        }
        if (mobileLanguageSelector) {
            mobileLanguageSelector.value = preferredLang;
        }
    }
});

// Case Type Carousel
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    let currentSlide = 0;
    let carouselInterval;

    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentSlide = index;
    }

    function nextSlide() {
        let next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    function startCarousel() {
        carouselInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
    }

    function stopCarousel() {
        clearInterval(carouselInterval);
    }

    // Dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            stopCarousel();
            showSlide(index);
            startCarousel();
        });
    });

    // Pause on hover
    const carousel = document.querySelector('.case-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopCarousel);
        carousel.addEventListener('mouseleave', startCarousel);
    }

    // Start the carousel
    if (slides.length > 0) {
        startCarousel();
    }
});

// Back to top button (if added)
window.addEventListener('scroll', function() {
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        if (window.pageYOffset > 300) {
            backToTop.classList.remove('hidden');
        } else {
            backToTop.classList.add('hidden');
        }
    }
});
