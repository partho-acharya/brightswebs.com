

// =====================================================
// NAVBAR RELATED FUNCTIONS
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
        { text: 'BG REMOVE', link: '../imagebackgroundremove-edit/imagebackgroundremove.html' },
        { text: 'IMAGE BACKGROUND REMOVE', link: '../imagebackgroundremove-edit/imagebackgroundremove.html' },
        { text: 'IMAGE BACKGROUND EDITOR', link: '../imagebackgroundremove-edit/imagebackgroundeditor.html' },

        // CONVERTER Dropdown
        { text: 'CONVERTER', link: '../converter/imageConverter.html' },
        { text: 'IMAGE CONVERTER', link: '../converter/imageConverter.html' },
        { text: 'PDF CONVERTER', link: '../converter/pdfconverter.html' },
        { text: 'IMAGE PAIR CONVERTER', link: '../converter/imagepairconverter.html' },
        { text: 'IMAGE COMPRESSOR', link: '../converter/imagecompressor.html' },

        // GENERATOR Dropdown
        { text: 'GENERATOR', link: '#' },
        { text: 'IMAGE TO SVG', link: '#' },
        { text: 'SVG BLOB', link: '#' },
        { text: 'AI COLOR PALETTE', link: '#' },
        { text: 'QR CODE', link: '#' },
        { text: 'PIN', link: '#' },
        { text: 'PASSWORD GENERATOR', link: '#' },

        // COLOR Dropdown
        { text: 'COLOR', link: 'colorpicker.html' },
        { text: 'COLOR PICKER', link: 'colorpicker.html' },
        { text: 'EMOTION COLOR', link: 'emotion.html' },
        { text: 'AI COLOR EXTRACTOR', link: 'aicolorextractor.html' },
        { text: 'COLOR CONTRAST CHECKER', link: 'contrastchecker.html' },

        // CALCULATOR Dropdown
        { text: 'CALCULATOR', link: '../calculator/calculator.html' },
        { text: 'SIP & SWP', link: '../calculator/sip&swpcalculator.html' },
        { text: 'BMI', link: '../calculator/bmicalculator.html' },
        { text: 'EMI', link: '../calculator/emicalculator.html' },
        { text: 'AGE', link: '../calculator/agecalculator.html' },
        { text: 'COMPOUND', link: '../calculator/compoundcalculator.html' },
        { text: 'MULTI LOAN', link: '../calculator/multiloancalculator.html' },
        { text: 'FD & RD', link: '../calculator/fd&rdcalculater.html' },
        { text: 'CAGR', link: '../calculator/cagrcalculator.html' },
        { text: 'CAR LOAN', link: '../calculator/carloancalculator.html' },
        { text: 'FRACTION', link: '../calculator/fractioncalculator.html' },
        { text: 'SALARY', link: '../calculator/salarycalculator.html' },
        { text: 'CUBE ROOT', link: '../calculator/cuberooot.html' },
        { text: 'INFLATION', link: '../calculator/InflationCalculator.html' },

        // HOME Dropdown
        { text: 'HOME', link: '../index.html' },
        { text: 'ABOUT', link: '../about.html' },
        { text: 'HELP', link: '../help.html' }
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


/* dark light theam */
/**
 * Theme Management
 * Toggles between dark/light themes
 */
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
/* dark light theam */

