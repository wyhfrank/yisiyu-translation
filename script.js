// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// Mobile menu functionality
const menuButton = document.querySelector('[aria-controls="mobile-menu"]');
const mobileMenu = document.getElementById('mobile-menu');

menuButton.addEventListener('click', () => {
    const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', !isExpanded);
    
    if (!isExpanded) {
        // Opening the menu
        mobileMenu.classList.remove('hidden');
        // Trigger reflow
        void mobileMenu.offsetHeight;
        mobileMenu.classList.add('mobile-menu-enter');
        mobileMenu.classList.remove('mobile-menu-exit');
    } else {
        // Closing the menu
        mobileMenu.classList.add('mobile-menu-exit');
        mobileMenu.classList.remove('mobile-menu-enter');
        // Wait for animation to finish before hiding
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 300); // Match this with the animation duration
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !menuButton.contains(e.target) && !mobileMenu.classList.contains('hidden')) {
        menuButton.click();
    }
});

// Active link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavLink() {
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavLink);
highlightNavLink();

// Add background pattern
function createGridPattern() {
    const patterns = document.querySelectorAll('.bg-grid-pattern');
    patterns.forEach(pattern => {
        pattern.style.backgroundImage = 'radial-gradient(circle, #4F46E5 1px, transparent 1px)';
        pattern.style.backgroundSize = '30px 30px';
    });
}

createGridPattern(); 