// Project Modal Controller
document.addEventListener('DOMContentLoaded', function() {
    const projectOverlay = document.getElementById('project-overlay');
    const projectModalClose = document.getElementById('project-modal-close');
    
    // Close modal when clicking the close button
    projectModalClose.addEventListener('click', function() {
        closeProjectModal();
    });
    
    // Close modal when clicking outside
    projectOverlay.addEventListener('click', function(e) {
        if (e.target === projectOverlay) {
            closeProjectModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && projectOverlay.classList.contains('project-overlay--open')) {
            closeProjectModal();
        }
    });
    
    // Function to open modal
    function openProjectModal() {
        // Prevent double opening
        if (projectOverlay.classList.contains('project-overlay--open')) {
            console.log('Modal is already open, ignoring duplicate call');
            return;
        }
        
        projectOverlay.classList.add('project-overlay--open');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
        
        // Play open sound (optimized for mobile)
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            try {
                const openSound = new Audio('assets/Sounds/open.mp3');
                openSound.volume = 0.3; // Lower volume for mobile
                openSound.preload = 'auto';
                openSound.play().catch(() => {});
            } catch (error) {
                console.log('Error playing open sound:', error);
            }
        }
    }
    
    // Function to close modal
    function closeProjectModal() {
        projectOverlay.classList.remove('project-overlay--open');
        document.body.style.overflow = ''; // Restore background scroll
        
        // Play close sound (optimized for mobile)
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            try {
                const closeSound = new Audio('assets/Sounds/close.mp3');
                closeSound.volume = 0.3; // Lower volume for mobile
                closeSound.preload = 'auto';
                closeSound.play().catch(() => {});
            } catch (error) {
                console.log('Error playing close sound:', error);
            }
        }
    }
    
    // Make functions globally available
    window.openProjectModal = openProjectModal;
    window.closeProjectModal = closeProjectModal;
    
    // Add click event to project cards (if they exist)
    const projectCards = document.querySelectorAll('.project__card');
    projectCards.forEach(card => {
        // Create unique handler for each card
        const projectClickHandler = function() {
            // Prevent multiple clicks
            if (card._isProcessing) return;
            card._isProcessing = true;
            
            setTimeout(() => { card._isProcessing = false; }, 1000);
            
            // Get project data from the card
            const title = card.querySelector('.project__title').textContent;
            const image = card.querySelector('.project__img').src;
            const projectLink = card.getAttribute('data-link'); // Get the project link
            const techIcons = Array.from(card.querySelectorAll('.tech-icons i, .tech-icons img')).map(icon => {
                if (icon.tagName === 'I') {
                    return icon.className.split(' ').pop().replace('fa-', '');
                } else {
                    return icon.src.split('/').pop().replace('.webp', '').toLowerCase();
                }
            });
            
            // Get project description and features from fallback functions
            const description = getProjectDescription(title);
            const features = getProjectFeatures(title);
            
            console.log('Description for', title, ':', description); // Debug log
            console.log('Features for', title, ':', features); // Debug log
            
            // Update modal content
            updateProjectModal(
                title, 
                image, 
                description,
                techIcons,
                features,
                projectLink // Pass the project link
            );
            
            openProjectModal();
        };
        
        // Add event listener
        card.addEventListener('click', projectClickHandler);
    });
    
    // Function to get project description based on title
    function getProjectDescription(title) {
        const descriptions = {
            'The Last of Us Fan Website': 'A website dedicated to The Last of Us franchise, featuring information about characters, story, and an image gallery. Built with HTML, CSS, and JavaScript, with an integrated music system.',
            'Deftones Website Clone': 'A clone of the official Deftones band website, recreated with a modern and interactive design. Built with HTML, CSS, and JavaScript, showcasing web development skills.',
            'Raissa Sant\'Ana Advocacy': 'A professional website for a law firm, with an elegant and responsive design. Includes information about legal services, team, and a contact form.',
            'Imperium Barber - Online Booking': 'An online booking system for a barbershop, allowing clients to schedule appointments easily and efficiently. The site can be customized with colors, logo, and visual identity.',
            'GastroPass - Gourmet Club': 'A gourmet club platform developed with React and Node.js, offering a subscription system and access to premium restaurants.',
            'Biblical Stories Admin Panel': 'An admin panel for managing biblical stories content, built with React, Tailwind CSS, and Firebase.'
        };
        return descriptions[title] || 'Project description in development.';
    }
    
    // Function to get project features based on title
    function getProjectFeatures(title) {
        const features = {
            'The Last of Us Fan Website': [
                'Integrated music system',
                'Character gallery',
                'Game story overview',
                'Responsive design',
                'Intuitive navigation',
                'Visual effects'
            ],
            'Deftones Website Clone': [
                'Responsive layout',
                'CSS animations',
                'Visual effects',
                'Intuitive navigation',
                'Modern design',
                'Interactive interface'
            ],
            'Raissa Sant\'Ana Advocacy': [
                'Professional design',
                'Responsive layout',
                'Contact form',
                'Service information',
                'Image gallery',
                'Clear navigation'
            ],
            'Imperium Barber - Online Booking': [
                'Booking system',
                'Interactive calendar',
                'Service selection',
                'Email confirmation',
                'Admin panel',
                'Responsive design'
            ],
            'GastroPass - Gourmet Club': [
                'Subscription system',
                'User panel',
                'Restaurant catalog',
                'Payment system',
                'Secure authentication',
                'Modern interface'
            ],
            'Biblical Stories Admin Panel': [
                'Admin panel',
                'Content CRUD',
                'User system',
                'Image upload',
                'Responsive dashboard',
                'Firebase authentication'
            ]
        };
        return features[title] || ['Feature in development'];
    }
});

// Function to update modal content dynamically
function updateProjectModal(title, imageSrc, description, technologies, features, projectLink) {
    const titleElement = document.getElementById('project-modal-title');
    const imageElement = document.getElementById('project-modal-image');
    const descriptionElement = document.getElementById('project-modal-description');
    const projectModalLink = document.getElementById('project-modal-link'); // Get the link element
    
    if (titleElement) titleElement.textContent = title;
    if (imageElement) imageElement.src = imageSrc;
    if (descriptionElement) descriptionElement.textContent = description;
    if (projectModalLink) projectModalLink.href = projectLink; // Update the link
    
    // Update technologies icons in header if provided
    if (technologies && technologies.length > 0) {
        const iconsContainer = document.querySelector('.project-modal__icons');
        if (iconsContainer) {
            iconsContainer.innerHTML = technologies.map(tech => {
                if (tech.includes('html5')) return '<i class="fab fa-html5"></i>';
                if (tech.includes('css3')) return '<i class="fab fa-css3-alt"></i>';
                if (tech.includes('js')) return '<i class="fab fa-js"></i>';
                if (tech.includes('react')) return '<i class="fab fa-react"></i>';
                if (tech.includes('node')) return '<i class="fab fa-node-js"></i>';
                if (tech.includes('firebase')) return '<i class="fas fa-fire"></i>';
                if (tech.includes('tailwind')) return '<i class="fab fa-css3"></i>';
                if (tech.includes('typescript')) return '<i class="fab fa-js"></i>';
                return `<i class="fas fa-code"></i>`;
            }).join('');
        }
        
        // Also update technologies in the bottom section
        const techList = document.querySelector('.project-detail-group:last-child .project-detail-list');
        if (techList) {
            console.log('Updating technologies with:', technologies); // Debug log
            techList.innerHTML = technologies.map(tech => {
                let techName = '';
                let techIcon = 'fas fa-code';
                
                if (tech.includes('html5')) {
                    techName = 'HTML5 - Semantic structure';
                    techIcon = 'fab fa-html5';
                } else if (tech.includes('css3')) {
                    techName = 'CSS3 - Styling and responsiveness';
                    techIcon = 'fab fa-css3-alt';
                } else if (tech.includes('js')) {
                    techName = 'JavaScript - Interactivity and logic';
                    techIcon = 'fab fa-js';
                } else if (tech.includes('react')) {
                    techName = 'React - User interface';
                    techIcon = 'fab fa-react';
                } else if (tech.includes('node')) {
                    techName = 'Node.js - Backend and server';
                    techIcon = 'fab fa-node-js';
                } else if (tech.includes('firebase')) {
                    techName = 'Firebase - Authentication and database';
                    techIcon = 'fas fa-fire';
                } else if (tech.includes('tailwind')) {
                    techName = 'Tailwind CSS - Styling framework';
                    techIcon = 'fab fa-css3';
                } else if (tech.includes('typescript')) {
                    techName = 'TypeScript - Typed JavaScript';
                    techIcon = 'fab fa-js';
                } else {
                    techName = tech.charAt(0).toUpperCase() + tech.slice(1);
                    techIcon = 'fas fa-code';
                }
                
                return `<li class="project-detail-item">
                    <i class="${techIcon}"></i>
                    <span class="project-detail-text">${techName}</span>
                </li>`;
            }).join('');
            console.log('Technologies updated successfully'); // Debug log
        } else {
            console.error('Technologies list element not found!'); // Debug log
        }
    }
    
    // Update features if provided
    if (features && features.length > 0) {
        console.log('Updating features with:', features); // Debug log
        
        // Find the features list in the modal
        let featuresList = document.querySelector('.project-detail-group:first-child .project-detail-list');
        
        if (!featuresList) {
            featuresList = document.querySelector('.project-detail-group h4:contains("Features") + .project-detail-list');
        }
        
        if (!featuresList) {
            featuresList = document.querySelector('.project-detail-group:first-child ul');
        }
        
        if (!featuresList) {
            featuresList = document.querySelector('.project-details .project-detail-group:first-child .project-detail-list');
        }
        
        console.log('Features list element found:', featuresList); // Debug log
        
        if (featuresList) {
            featuresList.innerHTML = features.map(feature => 
                `<li class="project-detail-item">
                    <i class="fas fa-check-circle"></i>
                    <span class="project-detail-text">${feature}</span>
                </li>`
            ).join('');
            console.log('Features updated successfully'); // Debug log
        } else {
            console.error('Features list element not found!'); // Debug log
        }
    } else {
        console.log('No features provided to update'); // Debug log
    }
}