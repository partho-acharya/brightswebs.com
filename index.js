
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
function initSearchSuggestions() {
    const searchData = [
        { text: 'PDF Converter', link: 'pdf.html' },
        { text: 'Image Compressor', link: 'imageconverter.html' },
        { text: 'Image Converter', link: 'pdf.html' },
        { text: 'Photo Converter', link: '#' },

        { text: 'Image To SVG', link: '#' },
        { text: 'SVG Blob', link: '#' },
        { text: 'Password Generator', link: '#' },
        { text: 'AI Color Palette', link: 'index.html' },
        { text: 'QR Code', link: 'services.html#web' },
        { text: 'PIN', link: 'services.html#graphic' },

        { text: 'Color Picker', link: 'contact.html' },
        { text: 'Gradient', link: 'about.html' },
        { text: 'Color Mixer', link: 'team.html' },
        { text: 'Color Shades', link: 'projects.html' },

        { text: 'SIP', link: '#' },
        { text: 'BMI', link: '#' },
        { text: 'EMI', link: '#' },
        { text: 'AGE', link: '#' },
        { text: 'COMPOUND', link: '#' },
        { text: 'LOAN', link: '#' },
        { text: 'INCOME TAX', link: '#' },
        { text: 'FD', link: '#' },
        { text: 'CAGR', link: '#' },
        { text: 'CAR LOAN', link: '#' },
        { text: 'FRACTION', link: '#' },
        { text: 'SALARY', link: '#' },
        { text: 'CUBE ROOT', link: '#' },
        { text: 'INFLATION', link: '#' },
        { text: 'RATIO', link: '#' },
        { text: 'RULE OF 72', link: '#' },
        { text: 'SALES TAX', link: '#' },
        { text: 'SPHERE', link: '#' },
        { text: 'PRESSURE', link: '#' },

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
    const sliderTrack = document.querySelector('.slider-track');
    const sliderCards = document.querySelectorAll('.slider-card');
    const dots = document.querySelectorAll('.slider-dot');
    const cardWidth = sliderCards[0].offsetWidth + 32; // width + gap
    let currentIndex = 0;
    let autoSlideInterval;

    // Set initial position
    updateSliderPosition();

    // Auto slide every 5 seconds
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % sliderCards.length;
            updateSliderPosition();
            updateDots();
        }, 5000);
    }

    // Update slider position
    function updateSliderPosition() {
        const offset = -currentIndex * cardWidth;
        sliderTrack.style.transform = `translateX(${offset}px)`;
    }

    // Update active dot
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Click handler for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSliderPosition();
            updateDots();
            resetAutoSlide();
        });
    });

    // Reset auto slide timer
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Start auto slide
    startAutoSlide();

    // Pause on hover
    sliderTrack.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    sliderTrack.addEventListener('mouseleave', () => {
        startAutoSlide();
    });

    // Touch events for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;

    sliderTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenY;
        clearInterval(autoSlideInterval);
    }, { passive: true });

    sliderTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoSlide();
    }, { passive: true });

    function handleSwipe() {
        const threshold = 50;
        if (touchEndX < touchStartX - threshold) {
            // Swipe left
            currentIndex = Math.min(currentIndex + 1, sliderCards.length - 1);
        } else if (touchEndX > touchStartX + threshold) {
            // Swipe right
            currentIndex = Math.max(currentIndex - 1, 0);
        }
        updateSliderPosition();
        updateDots();
    }
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

