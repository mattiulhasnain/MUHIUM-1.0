/*
* MUHIUM Convert - Ultimate Multi-Format Conversion
* Main JavaScript
* Created by TRUE SCHOLAR
* Contains: Site initialization, navigation, theme switching, utilities
*/

// DOM Elements
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');
const themeButtons = document.querySelectorAll('.theme-btn');
const welcomeMessage = document.getElementById('welcome-message');
const mainContent = document.querySelector('.main-content');

// Initialize the site
document.addEventListener('DOMContentLoaded', function() {
    // Setup welcome message
    setWelcomeMessage();
    
    // Setup sidebar toggle
    setupSidebar();
    
    // Initialize theme
    initializeTheme();
    
    // Add event listeners
    setupEventListeners();
    
    // Add scroll animations
    setupScrollAnimations();
    
    // Set main content margin for desktop
    adjustContentMargin();
});

// Set welcome message based on time of day
function setWelcomeMessage() {
    if (!welcomeMessage) return;
    
    const hour = new Date().getHours();
    let greeting;
    
    if (hour >= 5 && hour < 12) {
        greeting = "Good morning! Ready to convert some files?";
    } else if (hour >= 12 && hour < 18) {
        greeting = "Good afternoon! What would you like to convert today?";
    } else {
        greeting = "Good evening! Working late? Let's make file conversion easy!";
    }
    
    welcomeMessage.textContent = greeting;
}

// Setup sidebar toggle functionality
function setupSidebar() {
    if (!sidebar || !sidebarToggle) return;
    
    // Check screen size and adjust sidebar accordingly
    if (window.innerWidth < 768) {
        sidebar.classList.add('collapsed');
    }
    
    sidebarToggle.addEventListener('click', function() {
        if (window.innerWidth < 768) {
            // For mobile: toggle open class
            sidebar.classList.toggle('open');
        } else {
            // For desktop: toggle collapsed class
            sidebar.classList.toggle('collapsed');
            adjustContentMargin();
        }
    });
}

// Adjust main content margin based on sidebar state
function adjustContentMargin() {
    if (!sidebar || !mainContent) return;
    
    if (window.innerWidth >= 768) {
        if (sidebar.classList.contains('collapsed')) {
            mainContent.style.marginLeft = '70px'; // Width of collapsed sidebar
        } else {
            mainContent.style.marginLeft = '250px'; // Width of expanded sidebar
        }
    } else {
        mainContent.style.marginLeft = '0';
    }
}

// Initialize theme based on user preference or previous selection
function initializeTheme() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'neon';
    
    // Apply the theme
    document.body.className = '';
    document.body.classList.add(`theme-${savedTheme}`);
    
    // Mark the active theme button
    if (themeButtons) {
        themeButtons.forEach(button => {
            button.classList.remove('active');
            if (button.getAttribute('data-theme') === savedTheme) {
                button.classList.add('active');
            }
        });
    }
}

// Setup all event listeners
function setupEventListeners() {
    // Theme switcher
    if (themeButtons) {
        themeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const theme = this.getAttribute('data-theme');
                switchTheme(theme);
            });
        });
    }
    
    // Window resize handler
    window.addEventListener('resize', function() {
        if (window.innerWidth < 768) {
            sidebar.classList.remove('collapsed');
            sidebar.classList.remove('open');
            mainContent.style.marginLeft = '0';
        } else {
            sidebar.classList.remove('open');
            adjustContentMargin();
        }
    });
    
    // Add ripple effect to buttons
    const rippleButtons = document.querySelectorAll('.ripple-effect');
    rippleButtons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
    // Activate CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Smooth scroll to features section
            const featuresSection = document.querySelector('.features-section');
            if (featuresSection) {
                featuresSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// Switch theme function
function switchTheme(theme) {
    // Apply the theme
    document.body.className = '';
    document.body.classList.add(`theme-${theme}`);
    
    // Save preference
    localStorage.setItem('theme', theme);
    
    // Update active theme button
    themeButtons.forEach(button => {
        button.classList.remove('active');
        if (button.getAttribute('data-theme') === theme) {
            button.classList.add('active');
        }
    });
}

// Create ripple effect on button click
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add('ripple');
    
    // Remove existing ripples
    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
        existingRipple.remove();
    }
    
    button.appendChild(ripple);
    
    // Remove the ripple after animation completes
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Setup scroll animations for elements
function setupScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in-section');
    
    if (fadeElements.length === 0) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// Detect user's preferred color scheme
function detectColorScheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

// Utility function to format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Generate a random ID
function generateRandomId(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    
    for (let i = 0; i < length; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return id;
}

// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(error => {
                console.log('ServiceWorker registration failed: ', error);
            });
    });
} 