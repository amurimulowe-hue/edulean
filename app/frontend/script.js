// ===== DOM Elements =====
const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const heroSignup = document.getElementById('heroSignup');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const switchToSignup = document.getElementById('switchToSignup');
const switchToLogin = document.getElementById('switchToLogin');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');
const courseCards = document.querySelectorAll('.course-card');
const backToCourses = document.getElementById('backToCourses');
const prevTestimonial = document.getElementById('prevTestimonial');
const nextTestimonial = document.getElementById('nextTestimonial');
const testimonialDots = document.querySelectorAll('.dot');
const tabBtns = document.querySelectorAll('.tab-btn');
const dashTabBtns = document.querySelectorAll('.dash-tab-btn');
const categoryCards = document.querySelectorAll('.category-card');

// ===== Sections =====
const sections = {
    home: document.getElementById('home'),
    courses: document.getElementById('courses'),
    instructors: document.getElementById('instructors'),
    dashboard: document.getElementById('dashboard'),
    courseDetail: document.getElementById('courseDetail')
};

// ===== Mobile Menu =====
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
    });
});

// ===== Navigation =====
function showSection(sectionId) {
    // Hide course detail and dashboard
    document.getElementById('courseDetail').classList.add('hidden');
    document.getElementById('dashboard').classList.add('hidden');

    // Update active nav link
    navLinks.forEach(link => link.classList.remove('active'));

    if (sectionId === 'home') {
        // Show all homepage sections
        document.getElementById('home').classList.remove('hidden');
        document.getElementById('courses').classList.remove('hidden');
        document.getElementById('instructors').classList.remove('hidden');
        document.querySelectorAll('.stats-section, .categories-section, .testimonials-section, .footer')[0] && null;
        
        // Show all main sections
        document.querySelectorAll('.stats-section, .categories-section, .testimonials-section').forEach(s => {
            s.style.display = '';
        });
        document.querySelector('.footer').style.display = '';

        const homeLink = document.querySelector('[data-nav="home"]');
        if (homeLink && homeLink.classList.contains('nav-link')) {
            homeLink.classList.add('active');
        }
    } else if (sectionId === 'courses') {
        document.getElementById('home').classList.add('hidden');
        document.getElementById('courses').classList.remove('hidden');
        document.getElementById('instructors').classList.add('hidden');
        document.querySelectorAll('.stats-section, .categories-section, .testimonials-section').forEach(s => {
            s.style.display = 'none';
        });
        document.querySelector('.footer').style.display = '';

        const coursesLink = document.querySelector('[data-nav="courses"]');
        if (coursesLink) coursesLink.classList.add('active');
    } else if (sectionId === 'instructors') {
        document.getElementById('home').classList.add('hidden');
        document.getElementById('courses').classList.add('hidden');
        document.getElementById('instructors').classList.remove('hidden');
        document.querySelectorAll('.stats-section, .categories-section, .testimonials-section').forEach(s => {
            s.style.display = 'none';
        });
        document.querySelector('.footer').style.display = '';

        const instructorsLink = document.querySelector('[data-nav="instructors"]');
        if (instructorsLink) instructorsLink.classList.add('active');
    } else if (sectionId === 'dashboard') {
        document.getElementById('home').classList.add('hidden');
        document.getElementById('courses').classList.add('hidden');
        document.getElementById('instructors').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
        document.querySelectorAll('.stats-section, .categories-section, .testimonials-section').forEach(s => {
            s.style.display = 'none';
        });
        document.querySelector('.footer').style.display = '';

        const dashLink = document.querySelector('[data-nav="dashboard"]');
        if (dashLink) dashLink.classList.add('active');
    } else if (sectionId === 'courseDetail') {
        document.getElementById('home').classList.add('hidden');
        document.getElementById('courses').classList.add('hidden');
        document.getElementById('instructors').classList.add('hidden');
        document.getElementById('courseDetail').classList.remove('hidden');
        document.querySelectorAll('.stats-section, .categories-section, .testimonials-section').forEach(s => {
            s.style.display = 'none';
        });
        document.querySelector('.footer').style.display = '';
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Nav link clicks
document.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        const target = el.getAttribute('data-nav');
        showSection(target);
    });
});

// ===== Course Filtering =====
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        courseCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Category card clicks
categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const category = card.getAttribute('data-category');
        showSection('courses');

        // Activate corresponding filter
        filterBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-filter') === category) {
                btn.classList.add('active');
            }
        });

        // Filter courses
        courseCards.forEach(courseCard => {
            if (courseCard.getAttribute('data-category') === category) {
                courseCard.style.display = '';
            } else {
                courseCard.style.display = 'none';
            }
        });
    });
});

// ===== Search =====
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    if (query.length > 0) {
        // Switch to courses view
        showSection('courses');
        // Show all filter as active
        filterBtns.forEach(b => b.classList.remove('active'));
        document.querySelector('[data-filter="all"]').classList.add('active');
    }

    courseCards.forEach(card => {
        const title = card.querySelector('.course-title').textContent.toLowerCase();
        const instructor = card.querySelector('.course-instructor').textContent.toLowerCase();
        if (title.includes(query) || instructor.includes(query) || query === '') {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
});

// ===== Course Detail =====
courseCards.forEach(card => {
    const viewBtn = card.querySelector('.btn');
    if (viewBtn) {
        viewBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showSection('courseDetail');
        });
    }
    card.addEventListener('click', () => {
        showSection('courseDetail');
    });
});

// Back to courses
backToCourses.addEventListener('click', () => {
    showSection('courses');
});

// ===== Course Detail Tabs =====
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const tabId = btn.getAttribute('data-tab');
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`tab-${tabId}`).classList.add('active');
    });
});

// ===== Dashboard Tabs =====
dashTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        dashTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const tabId = btn.getAttribute('data-dashtab');
        document.querySelectorAll('.dash-tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`dashtab-${tabId}`).classList.add('active');
    });
});

// ===== Testimonial Slider =====
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const totalTestimonials = testimonialCards.length;

function showTestimonial(index) {
    testimonialCards.forEach(card => card.classList.remove('active'));
    testimonialDots.forEach(dot => dot.classList.remove('active'));

    currentTestimonial = (index + totalTestimonials) % totalTestimonials;
    testimonialCards[currentTestimonial].classList.add('active');
    testimonialDots[currentTestimonial].classList.add('active');
}

prevTestimonial.addEventListener('click', () => {
    showTestimonial(currentTestimonial - 1);
});

nextTestimonial.addEventListener('click', () => {
    showTestimonial(currentTestimonial + 1);
});

testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showTestimonial(index);
    });
});

// Auto-advance testimonials
let testimonialInterval = setInterval(() => {
    showTestimonial(currentTestimonial + 1);
}, 5000);

// Pause on hover
const testimonialSlider = document.getElementById('testimonialSlider');
testimonialSlider.addEventListener('mouseenter', () => {
    clearInterval(testimonialInterval);
});
testimonialSlider.addEventListener('mouseleave', () => {
    testimonialInterval = setInterval(() => {
        showTestimonial(currentTestimonial + 1);
    }, 5000);
});

// ===== Modals =====
function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

loginBtn.addEventListener('click', () => openModal(loginModal));
signupBtn.addEventListener('click', () => openModal(signupModal));
heroSignup.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(signupModal);
});

// Close modals
document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
        closeModal(loginModal);
        closeModal(signupModal);
    });
});

document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', () => {
        closeModal(loginModal);
        closeModal(signupModal);
    });
});

// Switch between modals
switchToSignup.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(loginModal);
    setTimeout(() => openModal(signupModal), 200);
});

switchToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(signupModal);
    setTimeout(() => openModal(loginModal), 200);
});

// Close on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal(loginModal);
        closeModal(signupModal);
    }
});

// ===== Form Validation =====
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(input, message) {
    input.classList.add('error');
    const errorSpan = input.parentElement.querySelector('.form-error');
    if (errorSpan) errorSpan.textContent = message;
}

function clearError(input) {
    input.classList.remove('error');
    const errorSpan = input.parentElement.querySelector('.form-error');
    if (errorSpan) errorSpan.textContent = '';
}

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const email = document.getElementById('loginEmail');
    const password = document.getElementById('loginPassword');

    clearError(email);
    clearError(password);

    if (!validateEmail(email.value)) {
        showError(email, 'Veuillez entrer un email valide');
        valid = false;
    }

    if (password.value.length < 6) {
        showError(password, 'Le mot de passe doit contenir au moins 6 caractères');
        valid = false;
    }

    if (valid) {
        closeModal(loginModal);
        showSection('dashboard');
    }
});

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const firstName = document.getElementById('signupFirstName');
    const lastName = document.getElementById('signupLastName');
    const email = document.getElementById('signupEmail');
    const password = document.getElementById('signupPassword');

    clearError(firstName);
    clearError(lastName);
    clearError(email);
    clearError(password);

    if (firstName.value.trim().length < 2) {
        showError(firstName, 'Le prénom est requis');
        valid = false;
    }

    if (lastName.value.trim().length < 2) {
        showError(lastName, 'Le nom est requis');
        valid = false;
    }

    if (!validateEmail(email.value)) {
        showError(email, 'Veuillez entrer un email valide');
        valid = false;
    }

    if (password.value.length < 8) {
        showError(password, 'Le mot de passe doit contenir au moins 8 caractères');
        valid = false;
    }

    if (valid) {
        closeModal(signupModal);
        showSection('dashboard');
    }
});

// Clear errors on input
document.querySelectorAll('.auth-form input').forEach(input => {
    input.addEventListener('input', () => clearError(input));
});

// ===== Header scroll effect =====
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
    }
    lastScroll = currentScroll;
});

// ===== Initialize =====
// Show home section by default
document.addEventListener('DOMContentLoaded', () => {
    showSection('home');
});