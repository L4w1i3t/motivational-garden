document.addEventListener('DOMContentLoaded', () => {
    const garden = document.getElementById('garden');
    const messageElement = document.getElementById('message');
    const addButterflyButton = document.getElementById('add-butterfly');
    const clearGardenButton = document.getElementById('clear-garden');
    
    // Messages that will show when hovering over flowers
    const messages = [
        // Mom's quotes
        '"This too shall pass." -Mom',
        '"You\'ll have at least someone in your corner." -Mom',
        '"Don\'t do it for my sake, do it for yours." -Mom',
        '"Are you able to do something about it right this second?" -Mom',
        '"Every time you get knocked down, you get right back up." -Mom',
        '"The universe has a way of guiding you toward what you are meant to do." -Mom',
        
        // My quotes
        '"Be someone\'s running man, even if it\'s just for the person in the mirror." -Me',
        '"The best way to defend against something is to know how to make it." -Me',
        '"I won\'t clip your wings because you never clipped mine." -Me',
        '"Different, not less." -Me',
        '"I still don\'t get it, but I\'m willing to learn." -Me',
        '"How can I allow myself to belong?" -Me'
    ];

    // Different flower types (emoji representation)
    const flowerTypes = [
        { emoji: '🌹', color: '#e91e63' },
        { emoji: '🌷', color: '#9c27b0' },
        { emoji: '🌺', color: '#f44336' },
        { emoji: '🌻', color: '#ffc107' },
        { emoji: '🌼', color: '#ffeb3b' },
        { emoji: '🌸', color: '#ff80ab' }
    ];
    
    // Plant a flower when clicking on the garden
    garden.addEventListener('click', (event) => {
        // Get position relative to garden
        const rect = garden.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Create and plant a flower at that position
        plantFlower(x, y);
    });
    
    // Add butterfly button
    addButterflyButton.addEventListener('click', () => {
        addButterfly();
    });
    
    // Clear garden button
    clearGardenButton.addEventListener('click', () => {
        // Remove all flowers and butterflies
        while (garden.firstChild) {
            garden.removeChild(garden.firstChild);
        }
        
        // Reset default message
        messageElement.innerHTML = "<p>I don't know where I'd be after these 21 years without you.</p>";
    });
    
    // Function to plant a flower
    function plantFlower(x, y) {
        // Create flower element
        const flower = document.createElement('div');
        flower.classList.add('flower');
        
        // Randomly select flower type
        const flowerType = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
        
        // Create stem
        const stem = document.createElement('div');
        stem.style.width = '3px';
        stem.style.height = '40px';
        stem.style.backgroundColor = '#4caf50';
        stem.style.position = 'absolute';
        stem.style.bottom = '0';
        stem.style.left = '50%';
        stem.style.transform = 'translateX(-50%)';
        
        // Create flower head
        const flowerHead = document.createElement('div');
        flowerHead.textContent = flowerType.emoji;
        flowerHead.style.fontSize = '30px';
        flowerHead.style.position = 'absolute';
        flowerHead.style.bottom = '30px';
        flowerHead.style.left = '50%';
        flowerHead.style.transform = 'translateX(-50%)';
        
        // Apply some random rotation to make it look natural
        const rotation = Math.random() * 20 - 10; // -10 to 10 degrees
        flower.style.transform = `rotate(${rotation}deg)`;
        
        // Position the flower
        flower.style.left = `${x}px`;
        flower.style.bottom = '0';
        
        // Add stem and flower head to flower container
        flower.appendChild(stem);
        flower.appendChild(flowerHead);
        
        // Random message for this flower
        const message = messages[Math.floor(Math.random() * messages.length)];
        
        // Add hover event to display message
        flower.addEventListener('mouseenter', () => {
            messageElement.innerHTML = `<p>${message}</p>`;
        });
        
        flower.addEventListener('mouseleave', () => {
            // Optional: Return to default message or keep the last one
        });
        
        // Add flower to garden
        garden.appendChild(flower);
        
        // Create a "growing" animation
        flower.animate([
            { transform: `translateY(40px) rotate(${rotation}deg)`, opacity: 0 },
            { transform: `translateY(0) rotate(${rotation}deg)`, opacity: 1 }
        ], {
            duration: 800,
            easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)'
        });
    }
    
    // Function to add a butterfly
    function addButterfly() {
        const butterfly = document.createElement('div');
        butterfly.classList.add('butterfly');
        
        // Set initial position
        const x = Math.random() * garden.offsetWidth;
        const y = Math.random() * garden.offsetHeight;
        butterfly.style.left = `${x}px`;
        butterfly.style.top = `${y}px`;
        
        // Randomly choose butterfly colors
        const hue = Math.floor(Math.random() * 360);
        butterfly.style.filter = `hue-rotate(${hue}deg) drop-shadow(2px 2px 2px rgba(0,0,0,0.2))`;
        
        garden.appendChild(butterfly);
        
        // Make butterfly fly around
        moveButterfly(butterfly);
    }
    
    // Function to animate butterfly movement
    function moveButterfly(butterfly) {
        const gardenWidth = garden.offsetWidth;
        const gardenHeight = garden.offsetHeight;
        
        // Start animation
        function animate() {
            // Generate new random position
            const x = Math.random() * (gardenWidth - 30);
            const y = Math.random() * (gardenHeight - 30);
            
            // Calculate duration based on distance (faster for longer distances)
            const currentX = parseFloat(butterfly.style.left);
            const currentY = parseFloat(butterfly.style.top);
            const distance = Math.sqrt(Math.pow(x - currentX, 2) + Math.pow(y - currentY, 2));
            const duration = 1000 + (distance * 5); // Base duration + distance factor
            
            // Animate the butterfly
            butterfly.animate([
                { transform: 'scale(1) rotate(0deg)' },
                { transform: 'scale(1.1) rotate(10deg)' },
                { transform: 'scale(0.9) rotate(-10deg)' },
                { transform: 'scale(1) rotate(0deg)' }
            ], {
                duration: 800,
                iterations: Math.ceil(duration / 800),
                easing: 'ease-in-out'
            });
            
            // Move the butterfly
            butterfly.animate([
                { left: `${currentX}px`, top: `${currentY}px` },
                { left: `${x}px`, top: `${y}px` }
            ], {
                duration: duration,
                easing: 'cubic-bezier(.42,0,.58,1)',
                fill: 'forwards'
            }).onfinish = () => {
                butterfly.style.left = `${x}px`;
                butterfly.style.top = `${y}px`;
                
                // Continue animation
                setTimeout(animate, Math.random() * 1000 + 500);
            };
        }
        
        // Start the animation
        animate();
    }
    
    // Create a few initial flowers
    function addInitialFlowers() {
        for (let i = 0; i < 3; i++) {
            const x = Math.random() * garden.offsetWidth;
            plantFlower(x, 0);
        }
        
        // Add one initial butterfly
        setTimeout(() => {
            addButterfly();
        }, 1000);
    }
    
    // Initialize garden with some flowers when page loads
    window.addEventListener('load', () => {
        addInitialFlowers();
    });
});