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
            }
        });
    }
    
    // Location Selector (Mobile)
    const mobileLocationSelector = document.getElementById('mobileLocationSelector');
    const mobilePhoneDisplay = document.getElementById('mobilePhoneDisplay');
    
    if (mobileLocationSelector && mobilePhoneDisplay) {
        mobileLocationSelector.addEventListener('change', function() {
            const phoneNumber = this.value;
            if (phoneNumber) {
                mobilePhoneDisplay.textContent = formatPhoneNumber(phoneNumber);
                mobilePhoneDisplay.href = 'tel:' + phoneNumber;
                
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
