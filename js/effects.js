/*
* MUHIUM Convert - Ultimate Multi-Format Conversion
* Effects JavaScript
* Created by TRUE SCHOLAR
* Contains: Advanced animations, particle effects, parallax, interactive backgrounds
*/

// DOM Elements
const animatedBackground = document.querySelector('.animated-background');
const particleLayer = document.querySelector('.particle-layer');
const parallaxContainer = document.querySelector('.parallax-container');
const heroSection = document.querySelector('.hero-section');

// Initialize effects when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create particle effect
    if (particleLayer) {
        createParticles();
    }
    
    // Initialize parallax effect
    if (parallaxContainer) {
        initParallax();
    }
    
    // Initialize animated kinetic text
    initKineticText();
    
    // Add theme-specific effects
    applyThemeEffects();
    
    // Fade in sections on scroll
    initFadeInSections();
    
    // Add feature card hover effects
    enhanceFeatureCards();
});

// Create particle effect in the background
function createParticles() {
    const numberOfParticles = 75;
    let particles = [];
    
    // Clear any existing particles
    particleLayer.innerHTML = '';
    
    // Create particles
    for (let i = 0; i < numberOfParticles; i++) {
        // Create particle element
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 5 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const opacity = Math.random() * 0.5 + 0.1;
        const speedX = Math.random() * 0.5 - 0.25;
        const speedY = Math.random() * 0.5 - 0.25;
        
        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.opacity = opacity;
        
        // Store particle data
        particles.push({
            element: particle,
            posX,
            posY,
            speedX,
            speedY
        });
        
        // Add to DOM
        particleLayer.appendChild(particle);
    }
    
    // Animate particles
    function animateParticles() {
        particles.forEach(particle => {
            // Update position
            particle.posX += particle.speedX;
            particle.posY += particle.speedY;
            
            // Check boundaries and wrap around
            if (particle.posX > 100) particle.posX = 0;
            if (particle.posX < 0) particle.posX = 100;
            if (particle.posY > 100) particle.posY = 0;
            if (particle.posY < 0) particle.posY = 100;
            
            // Apply new position
            particle.element.style.left = `${particle.posX}%`;
            particle.element.style.top = `${particle.posY}%`;
        });
        
        // Continue animation
        requestAnimationFrame(animateParticles);
    }
    
    // Start animation
    animateParticles();
}

// Initialize parallax effect
function initParallax() {
    // Check if we have hero section
    if (!heroSection) return;
    
    window.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Calculate movement based on mouse position
        const moveX = mouseX * 20 - 10;
        const moveY = mouseY * 10 - 5;
        
        // Apply subtle parallax to hero elements
        const parallaxElements = heroSection.querySelectorAll('h1, p, .cta-container');
        
        parallaxElements.forEach((element, index) => {
            // Apply different movement intensity for different elements
            const depthFactor = 0.03 * (index + 1);
            element.style.transform = `translate(${moveX * depthFactor}px, ${moveY * depthFactor}px)`;
        });
    });
}

// Initialize kinetic text animation
function initKineticText() {
    const kineticText = document.querySelector('.kinetic-text');
    if (!kineticText) return;
    
    // The letter animations are handled via CSS, but we can add more here
    kineticText.addEventListener('mouseover', function() {
        const letters = this.querySelectorAll('.letter-anim');
        letters.forEach((letter, index) => {
            letter.style.animation = 'none';
            void letter.offsetWidth; // Trigger reflow
            letter.style.animation = `letterHover 0.3s forwards`;
            letter.style.animationDelay = `${index * 0.03}s`;
        });
    });
    
    kineticText.addEventListener('mouseout', function() {
        const letters = this.querySelectorAll('.letter-anim');
        letters.forEach(letter => {
            letter.style.animation = '';
        });
    });
    
    // Define letterHover animation if it doesn't exist
    if (!document.querySelector('#letterHoverStyle')) {
        const style = document.createElement('style');
        style.id = 'letterHoverStyle';
        style.textContent = `
            @keyframes letterHover {
                0% { transform: translateY(0); }
                50% { transform: translateY(-5px); }
                100% { transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Apply theme-specific effects
function applyThemeEffects() {
    const currentTheme = document.body.className.replace('theme-', '');
    
    // Reset any existing theme effects
    if (animatedBackground) {
        // Clear existing custom elements
        const customEffects = animatedBackground.querySelectorAll('.theme-specific-effect');
        customEffects.forEach(effect => effect.remove());
    }
    
    // Apply theme-specific effects
    switch (currentTheme) {
        case 'neon':
            createNeonEffect();
            break;
        case 'cyberpunk':
            createCyberpunkEffect();
            break;
        case 'glassy':
            createGlassyEffect();
            break;
        case 'retro':
            createRetroEffect();
            break;
    }
}

// Create neon-specific effects
function createNeonEffect() {
    if (!animatedBackground) return;
    
    // Add floating neon elements
    const neonLines = 6;
    
    for (let i = 0; i < neonLines; i++) {
        const neonLine = document.createElement('div');
        neonLine.classList.add('neon-line', 'theme-specific-effect');
        
        // Random properties
        const width = Math.random() * 100 + 50;
        const height = Math.random() * 3 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const hue = Math.random() * 360;
        const delay = Math.random() * 2;
        const duration = Math.random() * 3 + 3;
        
        // Apply styles
        neonLine.style.width = `${width}px`;
        neonLine.style.height = `${height}px`;
        neonLine.style.left = `${posX}%`;
        neonLine.style.top = `${posY}%`;
        neonLine.style.background = `hsl(${hue}, 100%, 70%)`;
        neonLine.style.boxShadow = `0 0 10px hsl(${hue}, 100%, 70%), 0 0 20px hsl(${hue}, 100%, 90%)`;
        neonLine.style.opacity = '0.7';
        neonLine.style.position = 'absolute';
        neonLine.style.borderRadius = '999px';
        neonLine.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
        neonLine.style.animation = `neonFloat ${duration}s ease-in-out infinite`;
        neonLine.style.animationDelay = `${delay}s`;
        
        animatedBackground.appendChild(neonLine);
    }
    
    // Define neonFloat animation if it doesn't exist
    if (!document.querySelector('#neonFloatStyle')) {
        const style = document.createElement('style');
        style.id = 'neonFloatStyle';
        style.textContent = `
            @keyframes neonFloat {
                0%, 100% { transform: translateY(0) rotate(var(--rotate, 0deg)); opacity: 0.7; }
                50% { transform: translateY(-20px) rotate(var(--rotate, 0deg)); opacity: 0.3; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Create cyberpunk-specific effects
function createCyberpunkEffect() {
    if (!animatedBackground) return;
    
    // Add digital glitch effect
    const glitchElement = document.createElement('div');
    glitchElement.classList.add('glitch-overlay', 'theme-specific-effect');
    
    // Style the glitch overlay
    glitchElement.style.position = 'absolute';
    glitchElement.style.top = '0';
    glitchElement.style.left = '0';
    glitchElement.style.width = '100%';
    glitchElement.style.height = '100%';
    glitchElement.style.pointerEvents = 'none';
    glitchElement.style.backgroundImage = 'linear-gradient(rgba(255, 0, 110, 0.1) 1px, transparent 1px)';
    glitchElement.style.backgroundSize = '100% 4px';
    glitchElement.style.animation = 'glitchEffect 0.5s infinite';
    
    animatedBackground.appendChild(glitchElement);
    
    // Define glitchEffect animation if it doesn't exist
    if (!document.querySelector('#glitchEffectStyle')) {
        const style = document.createElement('style');
        style.id = 'glitchEffectStyle';
        style.textContent = `
            @keyframes glitchEffect {
                0% { opacity: 0.1; transform: translateX(0); }
                10% { opacity: 0.2; transform: translateX(-5px); }
                20% { opacity: 0.3; transform: translateX(5px); }
                30% { opacity: 0.1; transform: translateX(0); }
                40% { opacity: 0.2; transform: translateX(5px); }
                50% { opacity: 0.3; transform: translateX(-5px); }
                60% { opacity: 0.1; transform: translateX(0); }
                70% { opacity: 0.1; transform: translateX(5px); }
                80% { opacity: 0.2; transform: translateX(-5px); }
                90% { opacity: 0.3; transform: translateX(0); }
                100% { opacity: 0.1; transform: translateX(0); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Random glitch effect on intervals
    setInterval(() => {
        glitchElement.style.opacity = (Math.random() > 0.8) ? '0.3' : '0.05';
    }, 500);
}

// Create glassy-specific effects
function createGlassyEffect() {
    if (!animatedBackground) return;
    
    // Add floating bubbles
    const bubbles = 15;
    
    for (let i = 0; i < bubbles; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('glass-bubble', 'theme-specific-effect');
        
        // Random properties
        const size = Math.random() * 50 + 20;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        // Apply styles
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${posX}%`;
        bubble.style.bottom = '-50px';
        bubble.style.position = 'absolute';
        bubble.style.borderRadius = '50%';
        bubble.style.background = 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1), rgba(255,255,255,0.05))';
        bubble.style.border = '1px solid rgba(255,255,255,0.2)';
        bubble.style.animation = `bubbleFloat ${duration}s ease-in-out infinite`;
        bubble.style.animationDelay = `${delay}s`;
        
        animatedBackground.appendChild(bubble);
    }
    
    // Define bubbleFloat animation if it doesn't exist
    if (!document.querySelector('#bubbleFloatStyle')) {
        const style = document.createElement('style');
        style.id = 'bubbleFloatStyle';
        style.textContent = `
            @keyframes bubbleFloat {
                0% { transform: translateY(0) rotate(0); opacity: 0; }
                10% { opacity: 0.5; }
                90% { opacity: 0.2; }
                100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Create retro-specific effects
function createRetroEffect() {
    if (!animatedBackground) return;
    
    // Add retro shapes
    const shapes = 10;
    const shapeTypes = ['square', 'circle', 'triangle'];
    const colors = ['#ef8354', '#4f5d75', '#a786df', '#5ab288', '#f8c146'];
    
    for (let i = 0; i < shapes; i++) {
        const shape = document.createElement('div');
        shape.classList.add('retro-shape', 'theme-specific-effect');
        
        // Random properties
        const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
        const size = Math.random() * 40 + 10;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Apply common styles
        shape.style.position = 'absolute';
        shape.style.left = `${posX}%`;
        shape.style.top = `${posY}%`;
        shape.style.opacity = '0.2';
        
        // Apply shape-specific styles
        if (type === 'square') {
            shape.style.width = `${size}px`;
            shape.style.height = `${size}px`;
            shape.style.backgroundColor = color;
        } else if (type === 'circle') {
            shape.style.width = `${size}px`;
            shape.style.height = `${size}px`;
            shape.style.backgroundColor = color;
            shape.style.borderRadius = '50%';
        } else if (type === 'triangle') {
            shape.style.width = '0';
            shape.style.height = '0';
            shape.style.borderLeft = `${size/2}px solid transparent`;
            shape.style.borderRight = `${size/2}px solid transparent`;
            shape.style.borderBottom = `${size}px solid ${color}`;
            shape.style.backgroundColor = 'transparent';
        }
        
        // Add animation
        shape.style.animation = 'retroShapePulse 3s ease-in-out infinite alternate';
        shape.style.animationDelay = `${Math.random() * 2}s`;
        
        animatedBackground.appendChild(shape);
    }
    
    // Define retroShapePulse animation if it doesn't exist
    if (!document.querySelector('#retroShapePulseStyle')) {
        const style = document.createElement('style');
        style.id = 'retroShapePulseStyle';
        style.textContent = `
            @keyframes retroShapePulse {
                0% { transform: scale(1) rotate(0); }
                100% { transform: scale(1.2) rotate(10deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize fade-in sections on scroll
function initFadeInSections() {
    const sections = document.querySelectorAll('.features-section, .how-it-works, .privacy-section');
    
    sections.forEach(section => {
        section.classList.add('fade-in-section');
    });
    
    // The actual observation logic is in main.js's setupScrollAnimations function
}

// Enhance feature cards with interactive effects
function enhanceFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        // Apply tilt effect on mouse move
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            const tiltX = deltaY * 5; // Reverse for natural tilt
            const tiltY = deltaX * -5;
            
            this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-10px)`;
        });
        
        // Reset on mouse leave
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            setTimeout(() => {
                this.style.transform = 'translateY(-10px)';
            }, 300);
        });
    });
} 