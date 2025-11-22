/**
 * Texas Lawyer Referral Service Language Handler
 * Manages multi-language support and translations
 */

(function() {
    'use strict';

    // Language management
    const LanguageManager = {
        currentLang: 'en',
        defaultLang: 'en',

        init: function() {
            // Load saved language preference or default to English
            this.currentLang = localStorage.getItem('txlrs_language') || this.defaultLang;
            this.createLanguageSelector();
            this.applyTranslations();
        },

        createLanguageSelector: function() {
            // Find the navigation container (desktop)
            const desktopNav = document.querySelector('header nav ul.flex');
            
            if (!desktopNav) return;

            // Remove existing language selector if present
            const existingSelector = desktopNav.querySelector('.language-selector');
            if (existingSelector) {
                existingSelector.remove();
            }

            // Create language selector HTML for desktop
            const languageHTML = `
                <li class="relative language-selector">
                    <button id="language-toggle" class="text-gray-700 hover:text-primary transition flex items-center gap-1">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
                        </svg>
                        <span id="current-language">${translations[this.currentLang].name}</span>
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div id="language-dropdown" class="hidden absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
                        ${this.generateLanguageOptions()}
                    </div>
                </li>
            `;

            // Add to desktop nav (before "For Lawyers" link)
            const forLawyersLink = desktopNav.querySelector('li:last-child');
            if (forLawyersLink) {
                forLawyersLink.insertAdjacentHTML('beforebegin', languageHTML);
            } else {
                desktopNav.insertAdjacentHTML('beforeend', languageHTML);
            }

            // Add to mobile nav
            const mobileNav = document.getElementById('mobile-menu');
            if (mobileNav) {
                const mobileMenuList = mobileNav.querySelector('ul');
                if (mobileMenuList) {
                    // Remove existing mobile language selector if present
                    const existingMobileSelector = mobileMenuList.querySelector('.mobile-language-selector');
                    if (existingMobileSelector) {
                        existingMobileSelector.remove();
                    }

                    const mobileLanguageHTML = `
                        <li class="border-t border-gray-200 pt-2 mt-2 mobile-language-selector">
                            <button id="mobile-language-toggle" class="block px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-primary font-medium transition-colors duration-300 w-full text-left flex items-center gap-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
                                </svg>
                                <span id="mobile-current-language">${translations[this.currentLang].name}</span>
                            </button>
                            <div id="mobile-language-dropdown" class="hidden bg-gray-50 px-4 py-2 max-h-64 overflow-y-auto">
                                ${this.generateMobileLanguageOptions()}
                            </div>
                        </li>
                    `;
                    mobileMenuList.insertAdjacentHTML('beforeend', mobileLanguageHTML);
                }
            }

            // Add event listeners
            this.attachEventListeners();
        },

        generateLanguageOptions: function() {
            const languages = [
                { code: 'zh', name: '中文 (Chinese)' },
                { code: 'en', name: 'English (English)' },
                { code: 'fr', name: 'Français (French)' },
                { code: 'es', name: 'Español (Spanish)' },
                { code: 'vi', name: 'Tiếng Việt (Vietnamese)' }
            ];

            return languages.map(lang => `
                <button class="language-option block w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-primary transition-colors duration-200 ${lang.code === this.currentLang ? 'bg-primary text-white font-semibold' : 'text-gray-700'}" data-lang="${lang.code}">
                    ${lang.name}
                </button>
            `).join('');
        },

        generateMobileLanguageOptions: function() {
            const languages = [
                { code: 'zh', name: '中文 (Chinese)' },
                { code: 'en', name: 'English (English)' },
                { code: 'fr', name: 'Français (French)' },
                { code: 'es', name: 'Español (Spanish)' },
                { code: 'vi', name: 'Tiếng Việt (Vietnamese)' }
            ];

            return languages.map(lang => `
                <button class="mobile-language-option block w-full text-left px-4 py-2 rounded hover:bg-blue-100 transition-colors duration-200 ${lang.code === this.currentLang ? 'bg-primary text-white font-semibold' : 'text-gray-700'}" data-lang="${lang.code}">
                    ${lang.name}
                </button>
            `).join('');
        },

        attachEventListeners: function() {
            const self = this;

            // Desktop language toggle
            const languageToggle = document.getElementById('language-toggle');
            const languageDropdown = document.getElementById('language-dropdown');

            if (languageToggle && languageDropdown) {
                languageToggle.addEventListener('click', function(e) {
                    e.stopPropagation();
                    languageDropdown.classList.toggle('hidden');
                });

                // Language option click
                document.querySelectorAll('.language-option').forEach(option => {
                    option.addEventListener('click', function() {
                        const lang = this.getAttribute('data-lang');
                        self.changeLanguage(lang);
                        languageDropdown.classList.add('hidden');
                    });
                });

                // Close dropdown when clicking outside
                document.addEventListener('click', function(e) {
                    if (!languageToggle.contains(e.target) && !languageDropdown.contains(e.target)) {
                        languageDropdown.classList.add('hidden');
                    }
                });
            }

            // Mobile language toggle
            const mobileLanguageToggle = document.getElementById('mobile-language-toggle');
            const mobileLanguageDropdown = document.getElementById('mobile-language-dropdown');

            if (mobileLanguageToggle && mobileLanguageDropdown) {
                mobileLanguageToggle.addEventListener('click', function() {
                    mobileLanguageDropdown.classList.toggle('hidden');
                });

                // Mobile language option click
                document.querySelectorAll('.mobile-language-option').forEach(option => {
                    option.addEventListener('click', function() {
                        const lang = this.getAttribute('data-lang');
                        self.changeLanguage(lang);
                        mobileLanguageDropdown.classList.add('hidden');
                    });
                });
            }
        },

        changeLanguage: function(lang) {
            if (!translations[lang]) {
                console.error('Language not supported:', lang);
                return;
            }

            this.currentLang = lang;
            localStorage.setItem('txlrs_language', lang);
            
            // Update current language display
            const currentLangDisplay = document.getElementById('current-language');
            const mobileCurrentLangDisplay = document.getElementById('mobile-current-language');
            
            if (currentLangDisplay) {
                currentLangDisplay.textContent = translations[lang].name;
            }
            if (mobileCurrentLangDisplay) {
                mobileCurrentLangDisplay.textContent = translations[lang].name;
            }

            // Apply translations
            this.applyTranslations();
            
            // Recreate language selector to update active state
            this.createLanguageSelector();
        },

        applyTranslations: function() {
            const t = translations[this.currentLang] || translations[this.defaultLang];
            
            // Update all elements with data-i18n attribute
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                if (t[key]) {
                    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                        element.placeholder = t[key];
                    } else {
                        element.innerHTML = t[key];
                    }
                }
            });

            // Update document lang attribute
            document.documentElement.lang = this.currentLang;
        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            LanguageManager.init();
        });
    } else {
        LanguageManager.init();
    }

    // Expose for external use
    window.LanguageManager = LanguageManager;

})();
