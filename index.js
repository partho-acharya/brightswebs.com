
// =====================================================
// NAVBAR RELATED FUNCTIONS start
// =====================================================

/**
 * Navbar Scroll Effect
 * Adds shadow when scrolling down
 */
function initNavbarScroll() {
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('nav');
        navbar.style.boxShadow = window.scrollY > 50 ?
            '0 4px 15px rgba(0, 0, 0, 0.1)' : 'none';
    });
}

/**
 * Mobile Menu Handling
 * Toggles mobile menu and dropdowns
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Toggle menu
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // Mobile dropdown handling
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                dropdown.classList.toggle('active');

                // Close other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
            }
        });
    });
}

/**
 * Search Suggestions
 * Handles search input and suggestions
 */
// function initSearchSuggestions() {
//     const searchData = [
//         { text: 'PDF Converter', link: 'pdf.html' },
//         { text: 'Image Compressor', link: 'imageconverter.html' },
//         { text: 'Image Converter', link: 'pdf.html' },
//         { text: 'Photo Converter', link: '#' },

//         { text: 'Image To SVG', link: '#' },
//         { text: 'SVG Blob', link: '#' },
//         { text: 'Password Generator', link: '#' },
//         { text: 'AI Color Palette', link: 'index.html' },
//         { text: 'QR Code', link: 'services.html#web' },
//         { text: 'PIN', link: 'services.html#graphic' },

//         { text: 'Color Picker', link: 'contact.html' },
//         { text: 'Gradient', link: 'about.html' },
//         { text: 'Color Mixer', link: 'team.html' },
//         { text: 'Color Shades', link: 'projects.html' },

//         { text: 'SIP', link: '#' },
//         { text: 'BMI', link: '#' },
//         { text: 'EMI', link: '#' },
//         { text: 'AGE', link: '#' },
//         { text: 'COMPOUND', link: '#' },
//         { text: 'LOAN', link: '#' },
//         { text: 'INCOME TAX', link: '#' },
//         { text: 'FD', link: '#' },
//         { text: 'CAGR', link: '#' },
//         { text: 'CAR LOAN', link: '#' },
//         { text: 'FRACTION', link: '#' },
//         { text: 'SALARY', link: '#' },
//         { text: 'CUBE ROOT', link: '#' },
//         { text: 'INFLATION', link: '#' },
//         { text: 'RATIO', link: '#' },
//         { text: 'RULE OF 72', link: '#' },
//         { text: 'SALES TAX', link: '#' },
//         { text: 'SPHERE', link: '#' },
//         { text: 'PRESSURE', link: '#' },

//     ];


function initSearchSuggestions() {
    const searchData = [
        // BG REMOVE Dropdown
        { text: 'BG REMOVE', link: 'imagebackgroundremove-edit/imagebackgroundremove.html' },
        { text: 'IMAGE BACKGROUND REMOVE', link: 'imagebackgroundremove-edit/imagebackgroundremove.html' },
        { text: 'IMAGE BACKGROUND EDITOR', link: 'imagebackgroundremove-edit/imagebackgroundeditor.html' },

        // CONVERTER Dropdown
        { text: 'CONVERTER', link: 'converter/imageConverter.html' },
        { text: 'IMAGE CONVERTER', link: 'converter/imageConverter.html' },
        { text: 'PDF CONVERTER', link: 'converter/pdfconverter.html' },
        { text: 'IMAGE PAIR CONVERTER', link: 'converter/imagepairconverter.html' },
        { text: 'IMAGE COMPRESSOR', link: 'converter/imagecompressor.html' },

        // GENERATOR Dropdown
        { text: 'GENERATOR', link: '#' },
        { text: 'IMAGE TO SVG', link: '#' },
        { text: 'SVG BLOB', link: '#' },
        { text: 'AI COLOR PALETTE', link: '#' },
        { text: 'QR CODE', link: '#' },
        { text: 'PIN', link: '#' },
        { text: 'PASSWORD GENERATOR', link: '#' },

        // COLOR Dropdown
        { text: 'COLOR', link: 'color/colorpicker.html' },
        { text: 'COLOR PICKER', link: 'color/colorpicker.html' },
        { text: 'EMOTION COLOR', link: 'color/emotion.html' },
        { text: 'AI COLOR EXTRACTOR', link: 'color/aicolorextractor.html' },
        { text: 'COLOR CONTRAST CHECKER', link: 'color/contrastchecker.html' },

        // CALCULATOR Dropdown
        { text: 'CALCULATOR', link: 'calculator/calculator.html' },
        { text: 'SIP & SWP', link: 'calculator/sip&swpcalculator.html' },
        { text: 'BMI', link: 'calculator/bmicalculator.html' },
        { text: 'EMI', link: 'calculator/emicalculator.html' },
        { text: 'AGE', link: 'calculator/agecalculator.html' },
        { text: 'COMPOUND', link: 'calculator/compoundcalculator.html' },
        { text: 'MULTI LOAN', link: 'calculator/multiloancalculator.html' },
        { text: 'FD & RD', link: 'calculator/fd&rdcalculater.html' },
        { text: 'CAGR', link: 'calculator/cagrcalculator.html' },
        { text: 'CAR LOAN', link: 'calculator/carloancalculator.html' },
        { text: 'FRACTION', link: 'calculator/fractioncalculator.html' },
        { text: 'SALARY', link: 'calculator/salarycalculator.html' },
        { text: 'CUBE ROOT', link: 'calculator/cuberooot.html' },
        { text: 'INFLATION', link: 'calculator/InflationCalculator.html' },

        // HOME Dropdown
        { text: 'HOME', link: 'index.html' },
        { text: 'ABOUT', link: 'about/about.html' },
        { text: 'HELP', link: 'help/help.html' }
    ];




    const searchInput = document.getElementById('searchInput');
    const searchBox = document.querySelector('.search-box');
    const suggestionContainer = document.querySelector('.search-suggestions');

    function showSuggestions() {
        const inputVal = searchInput.value.toLowerCase().trim();
        const filtered = searchData.filter(item =>
            item.text.toLowerCase().includes(inputVal)
        );

        suggestionContainer.innerHTML = filtered.map(item => `
    <a href="${item.link}" class="search-suggestion-item">${item.text}</a>
     `).join('');

        searchBox.classList.toggle('active', filtered.length > 0 && inputVal.length > 0);
    }

    // Event listeners
    searchInput.addEventListener('input', showSuggestions);
    searchInput.addEventListener('focus', showSuggestions);

    document.addEventListener('click', (e) => {
        if (!searchBox.contains(e.target)) {
            searchBox.classList.remove('active');
        }
    });
}

// Initialize all components when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    initNavbarScroll();
    initMobileMenu();
    initSearchSuggestions();
    initThemeToggle();
});
// nav end

// =====================================================
// NAVBAR RELATED FUNCTIONS end
// =====================================================







/* ==============================TOP DROPDOWN BUTTON START  */

function uniqueToggleDropdown(number) {
    // Close all other dropdowns
    const allDropdowns = document.querySelectorAll('.unique-dropdown-content');
    allDropdowns.forEach(dropdown => {
        if (dropdown.id !== `unique-dropdown${number}`) {
            dropdown.classList.remove('unique-show');
        }
    });

    // Toggle current dropdown
    const dropdown = document.getElementById(`unique-dropdown${number}`);
    dropdown.classList.toggle("unique-show");
}

// Close dropdowns when clicking outside
window.onclick = function (e) {
    if (!e.target.matches('.unique-main-btn')) {
        const dropdowns = document.querySelectorAll('.unique-dropdown-content');
        dropdowns.forEach(dropdown => {
            if (dropdown.classList.contains('unique-show')) {
                dropdown.classList.remove('unique-show');
            }
        });
    }
}

/* ==============================TOP DROPDOWN BUTTON END  */


// ===========================================
// Featured Tools Slider
// ===========================================

document.addEventListener('DOMContentLoaded', function () {
    // Configuration Constants
    const COLORS = ['var(--primary-1)', 'var(--primary-2)', 'var(--primary-3)', 'var(--primary-4)', 'var(--primary-5)', 'var(--primary-6)', 'var(--primary-7)'];
    const AUTO_SLIDE_INTERVAL = 5000;
    const SWIPE_THRESHOLD = 50;

    // Tool Data
    const toolsData = [

        // BG Remove Tools
        {
            text: 'IMAGE BACKGROUND REMOVE',
            link: 'imagebackgroundremove-edit/imagebackgroundremove.html',
            icon: 'fa-eraser',
            desc: 'Remove backgrounds from images automatically'
        },
        {
            text: 'IMAGE BACKGROUND EDITOR',
            link: 'imagebackgroundremove-edit/imagebackgroundeditor.html',
            icon: 'fa-paint-brush',
            desc: 'Edit and enhance image backgrounds'
        },

        // Converter Tools
        {
            text: 'IMAGE CONVERTER',
            link: 'converter/imageConverter.html',
            icon: 'fa-file-image',
            desc: 'Convert between various image formats'
        },
        {
            text: 'PDF CONVERTER',
            link: 'converter/pdfconverter.html',
            icon: 'fa-file-pdf',
            desc: 'Convert documents to/from PDF format'
        },
        {
            text: 'IMAGE PAIR CONVERTER',
            link: 'converter/imagepairconverter.html',
            icon: 'fa-exchange-alt',
            desc: 'Convert between image pairs simultaneously'
        },
        {
            text: 'IMAGE COMPRESSOR',
            link: 'converter/imagecompressor.html',
            icon: 'fa-compress-arrows-alt',
            desc: 'Optimize images for smaller file sizes'
        },

        // Color Tools
        {
            text: 'COLOR PICKER',
            link: 'color/colorpicker.html',
            icon: 'fa-eye-dropper',
            desc: 'Select and analyze colors from images'
        },
        {
            text: 'EMOTION COLOR',
            link: 'color/emotion.html',
            icon: 'fa-brain',
            desc: 'Discover colors based on emotional impact'
        },
        {
            text: 'AI COLOR EXTRACTOR',
            link: 'color/aicolorextractor.html',
            icon: 'fa-robot',
            desc: 'AI-powered color extraction tool'
        },
        {
            text: 'COLOR CONTRAST CHECKER',
            link: 'color/contrastchecker.html',
            icon: 'fa-adjust',
            desc: 'Ensure accessible color combinations'
        },

        // Calculator Tools
        {
            text: 'SIP & SWP',
            link: 'calculator/sip&swpcalculator.html',
            icon: 'fa-chart-line',
            desc: 'Calculate systematic investment and withdrawal plans'
        },
        {
            text: 'BMI',
            link: 'calculator/bmicalculator.html',
            icon: 'fa-weight',
            desc: 'Calculate Body Mass Index for health assessment'
        },
        {
            text: 'EMI',
            link: 'calculator/emicalculator.html',
            icon: 'fa-calculator',
            desc: 'Calculate Equated Monthly Installments for loans'
        },
        {
            text: 'AGE',
            link: 'calculator/agecalculator.html',
            icon: 'fa-birthday-cake',
            desc: 'Calculate exact age from birth date'
        },
        {
            text: 'COMPOUND',
            link: 'calculator/compoundcalculator.html',
            icon: 'fa-percentage',
            desc: 'Calculate compound interest growth over time'
        },
        {
            text: 'MULTI LOAN',
            link: 'calculator/multiloancalculator.html',
            icon: 'fa-hand-holding-usd',
            desc: 'Compare and manage multiple loans simultaneously'
        },
        {
            text: 'FD & RD',
            link: 'calculator/fd&rdcalculater.html',
            icon: 'fa-piggy-bank',
            desc: 'Calculate fixed and recurring deposit returns'
        },
        {
            text: 'CAGR',
            link: 'calculator/cagrcalculator.html',
            icon: 'fa-chart-line',
            desc: 'Calculate Compound Annual Growth Rate'
        },
        {
            text: 'CAR LOAN',
            link: 'calculator/carloancalculator.html',
            icon: 'fa-car',
            desc: 'Calculate vehicle financing options'
        },
        {
            text: 'FRACTION',
            link: 'calculator/fractioncalculator.html',
            icon: 'fa-divide',
            desc: 'Perform fraction calculations and conversions'
        },
        {
            text: 'SALARY',
            link: 'calculator/salarycalculator.html',
            icon: 'fa-money-check-alt',
            desc: 'Calculate net salary and deductions'
        },
        {
            text: 'CUBE ROOT',
            link: 'calculator/cuberooot.html',
            icon: 'fa-cube',
            desc: 'Calculate cube roots of numbers'
        },
        {
            text: 'INFLATION',
            link: 'calculator/InflationCalculator.html',
            icon: 'fa-money-bill-wave',
            desc: 'Calculate inflation-adjusted values'
        }
    ];



    // DOM Elements
    const sliderTrack = document.querySelector('.slider-track');
    const sliderContainer = document.querySelector('.slider-container');
    let sliderCards = [];
    let dots = [];

    // Slider State
    let currentIndex = 0;
    let autoSlideInterval;
    let touchStartX = 0;
    let touchEndX = 0;
    let cardWidth = 0;

    // Initialization
    function init() {
        generateCards();
        setupSlider();
        startAutoSlide();
        addEventListeners();
    }

    // Card Generation
    function generateCards() {
        let colorIndex = 0;

        toolsData.forEach(tool => {
            const card = document.createElement('div');
            card.className = 'slider-card';
            card.innerHTML = `
                <div class="tool-icon" style="background-color: ${COLORS[colorIndex++ % COLORS.length]}">
                    <i class="fas ${tool.icon}"></i>
                </div>
                <h3>${tool.text}</h3>
                <p>${tool.desc}</p>
                <a href="${tool.link}" class="btn small-btn">Try Now</a>
            `;
            sliderTrack.appendChild(card);
        });

        sliderCards = document.querySelectorAll('.slider-card');
        calculateCardWidth();
    }

    function calculateCardWidth() {
        if (sliderCards.length > 0) {
            const style = getComputedStyle(sliderTrack);
            const gap = parseFloat(style.gap) || 0;
            cardWidth = sliderCards[0].offsetWidth + gap;
        }
    }

    // Slider Controls
    function setupSlider() {
        createDots();
        updateSliderPosition();
        updateDots();
    }

    function createDots() {
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slider-dots';

        sliderCards.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        sliderContainer.parentNode.insertBefore(dotsContainer, sliderContainer.nextSibling);
        dots = document.querySelectorAll('.slider-dot');
    }

    // Slider Navigation
    function goToSlide(index) {
        currentIndex = index;
        updateSliderPosition();
        updateDots();
        resetAutoSlide();
    }

    function updateSliderPosition() {
        const offset = -currentIndex * cardWidth;
        sliderTrack.style.transform = `translateX(${offset}px)`;
    }

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Auto Slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % sliderCards.length;
            updateSliderPosition();
            updateDots();
        }, AUTO_SLIDE_INTERVAL);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Event Handlers
    function addEventListeners() {
        // Pause on hover
        sliderTrack.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        sliderTrack.addEventListener('mouseleave', startAutoSlide);

        // Touch events
        sliderTrack.addEventListener('touchstart', handleTouchStart, { passive: true });
        sliderTrack.addEventListener('touchend', handleTouchEnd, { passive: true });

        // Window resize
        window.addEventListener('resize', () => {
            calculateCardWidth();
            updateSliderPosition();
        });
    }

    function handleTouchStart(e) {
        touchStartX = e.touches[0].clientX;
        clearInterval(autoSlideInterval);
    }

    function handleTouchEnd(e) {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
        startAutoSlide();
    }

    function handleSwipe() {
        const deltaX = touchEndX - touchStartX;

        if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;

        if (deltaX < 0) {
            // Swipe left
            currentIndex = Math.min(currentIndex + 1, sliderCards.length - 1);
        } else {
            // Swipe right
            currentIndex = Math.max(currentIndex - 1, 0);
        }

        updateSliderPosition();
        updateDots();
    }

    // Start the slider
    init();
});

// ===========================================
// Promotional Banner Slider
// ===========================================

document.addEventListener('DOMContentLoaded', function () {
    const bannerSlides = document.querySelectorAll('.banner-slide');
    const bannerDots = document.querySelectorAll('.banner-dot');
    let currentBannerIndex = 0;
    let bannerInterval;

    // Show initial slide
    showBannerSlide(currentBannerIndex);

    // Auto slide every 6 seconds
    function startBannerAutoSlide() {
        bannerInterval = setInterval(() => {
            currentBannerIndex = (currentBannerIndex + 1) % bannerSlides.length;
            showBannerSlide(currentBannerIndex);
        }, 6000);
    }

    // Show specific slide
    function showBannerSlide(index) {
        bannerSlides.forEach(slide => slide.classList.remove('active'));
        bannerDots.forEach(dot => dot.classList.remove('active'));

        bannerSlides[index].classList.add('active');
        bannerDots[index].classList.add('active');
    }

    // Click handler for dots
    bannerDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentBannerIndex = index;
            showBannerSlide(currentBannerIndex);
            resetBannerAutoSlide();
        });
    });

    // Reset auto slide timer
    function resetBannerAutoSlide() {
        clearInterval(bannerInterval);
        startBannerAutoSlide();
    }

    // Start auto slide
    startBannerAutoSlide();

    // Pause on hover
    const promoBanner = document.querySelector('.promo-banner');
    promoBanner.addEventListener('mouseenter', () => {
        clearInterval(bannerInterval);
    });

    promoBanner.addEventListener('mouseleave', () => {
        startBannerAutoSlide();
    });
});


// ===========================================
// Smooth Scrolling for Anchor Links
// ===========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            // Update URL without jumping
            if (history.pushState) {
                history.pushState(null, null, targetId);
            } else {
                window.location.hash = targetId;
            }
        }
    });
});


// nav scroll line==============================================start======
document.addEventListener('DOMContentLoaded', function () {
    const navLine = document.querySelector('.nav-line');
    const navbar = document.querySelector('.nav');

    // Calculate the maximum scroll height more accurately
    const maxScrollHeight = document.documentElement.scrollHeight - window.innerHeight;

    window.addEventListener('scroll', function () {
        // Get current scroll position
        const scrollPosition = window.scrollY || window.pageYOffset;

        // Calculate the percentage scrolled (between 0 and 1)
        const scrollPercentage = Math.min(scrollPosition / maxScrollHeight, 1);

        // Calculate the width of the line based on scroll percentage
        // We'll make it span the full viewport width when scrolled to bottom
        const lineWidth = scrollPercentage * window.innerWidth;

        // Update the line width
        navLine.style.width = `${lineWidth}px`;

        // Optional: Change navbar background when scrolling
        if (scrollPosition > 10) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // Initialize on page load
    window.dispatchEvent(new Event('scroll'));
});
// nav scroll line==============================================end======

// ===========================================
// Tooltip Initialization
// ===========================================
tippy('[data-tippy-content]', {
    arrow: true,
    animation: 'fade',
    duration: 200,
    theme: 'light'
});

// ===========================================
// AOS Animation Initialization
// ===========================================
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// ===========================================
// Lazy Loading for Images
// ===========================================
if ('loading' in HTMLImageElement.prototype) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const lazyScript = document.createElement('script');
    lazyScript.src = 'https://cdn.jsdelivr.net/npm/lozad/dist/lozad.min.js';
    document.body.appendChild(lazyScript);

    lazyScript.onload = function () {
        const observer = lozad();
        observer.observe();
    };
}

// ===========================================
// Initialize all tooltips
// ===========================================
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});


// ===========================================
// dark light theam start
// ===========================================

function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle i');

    function toggleTheme() {
        const body = document.body;
        const isDark = body.getAttribute('data-theme') === 'dark';

        body.setAttribute('data-theme', isDark ? 'light' : 'dark');
        themeToggle.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
    }

    document.querySelector('.theme-toggle').addEventListener('click', toggleTheme);
}
// ===========================================
// dark light theam end
// ===========================================

