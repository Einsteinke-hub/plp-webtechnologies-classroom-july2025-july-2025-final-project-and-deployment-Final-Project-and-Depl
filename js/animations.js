// Animation and Interactive Effects
document.addEventListener('DOMContentLoaded', function() {
    initializeScrollAnimations();
    initializeCounterAnimation();
    initializeParallaxEffect();
});

// Scroll-triggered animations
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.feature-card, .service-card, .team-member, .value-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Animated counter for statistics
function initializeCounterAnimation() {
    const counterElements = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counterElements.forEach(el => observer.observe(el));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Parallax effect for hero section
function initializeParallaxEffect() {
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Loading animation for images
function initializeImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (!img.complete) {
            img.classList.add('loading');
            img.addEventListener('load', () => {
                img.classList.remove('loading');
                img.classList.add('loaded');
            });
            img.addEventListener('error', () => {
                img.classList.remove('loading');
                img.classList.add('error');
            });
        } else {
            img.classList.add('loaded');
        }
    });
}

// Add CSS for loading states
const style = document.createElement('style');
style.textContent = `
    img.loading {
        background: #f3f4f6;
        opacity: 0.7;
    }
    img.loaded {
        opacity: 1;
        transition: opacity 0.3s ease;
    }
    img.error {
        background: #fef2f2;
        border: 1px solid #fecaca;
    }
`;
document.head.appendChild(style);

// Initialize image loading when DOM is ready
initializeImageLoading();