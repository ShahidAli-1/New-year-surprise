// Variables
const pages = ['heart-page', 'gift-page', 'ticket-page', 'gallery-page', 'poster-page', 'feedback-page', 'home-page'];
let currentPage = 0;
let currentPhoto = 0;
const totalPhotos = 3;
let obstaclesRemoved = 0;
let noClicked = false;

// Utility: Show page
function showPage(index) {
    pages.forEach((page, i) => {
        document.getElementById(page).classList.toggle('active', i === index);
    });
    currentPage = index;
}

// Heart Interaction
document.getElementById('heart').addEventListener('click', () => {
    document.getElementById('heart').classList.add('filled');
    setTimeout(() => showPage(1), 2000);
});

// Gift Box Obstacles - All on top of gift
const obstacles = document.querySelectorAll('.obstacle');
const giftCenter = document.getElementById('gift-center');

// Obstacle Click Handling
obstacles.forEach(obstacle => {
    obstacle.addEventListener('click', () => {
        // Add removed class for animation
        obstacle.classList.add('removed');
        obstaclesRemoved++;
        
        // Check if all obstacles are removed
        if (obstaclesRemoved === obstacles.length) {
            setTimeout(() => {
                giftCenter.classList.add('revealed');
                // Add click event to gift center
                giftCenter.style.cursor = 'pointer';
                giftCenter.addEventListener('click', () => {
                    showPage(2); // Go to Golden Ticket page
                    // Reset for next time
                    resetGiftPage();
                });
            }, 800);
        }
    });
});

// Function to reset gift page
function resetGiftPage() {
    obstaclesRemoved = 0;
    obstacles.forEach(obstacle => {
        obstacle.classList.remove('removed');
        // Reset positions
        obstacle.style.left = '';
        obstacle.style.right = '';
        obstacle.style.top = '';
        obstacle.style.bottom = '';
        obstacle.style.transform = 'translate(-50%, -50%)';
        obstacle.style.opacity = '1';
        obstacle.style.pointerEvents = 'auto';
    });
    giftCenter.classList.remove('revealed');
    giftCenter.style.cursor = 'default';
    giftCenter.removeEventListener('click', () => {});
}

// Golden Ticket Claim
document.getElementById('claim-btn').addEventListener('click', () => {
    showPage(3); // Go to Gallery page
});

// Photo Gallery Navigation - Click on photo to see next photo
const photoFrames = document.querySelectorAll('.photo-frame');
const photoPages = document.querySelectorAll('.photo-page');

photoFrames.forEach(frame => {
    frame.addEventListener('click', () => {
        // Hide current photo
        photoPages[currentPhoto].classList.remove('active');
        
        // Move to next photo
        currentPhoto++;
        
        if (currentPhoto < totalPhotos) {
            // Show next photo
            photoPages[currentPhoto].classList.add('active');
        } else {
            // All photos viewed, go to poster page
            currentPhoto = 0; // Reset for next time
            photoPages[0].classList.add('active'); // Show first photo again
            showPage(4); // Go to Poster page
        }
    });
});

// Continue to feedback from poster
document.getElementById('continue-btn').addEventListener('click', () => {
    showPage(5); // Go to Feedback page
    // Reset feedback state
    resetFeedbackButtons();
});

// Feedback Handling
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const responseDiv = document.getElementById('response');

function disableYesButton() {
    yesBtn.classList.add('disabled');
    yesBtn.disabled = true;
}

function enableYesButton() {
    yesBtn.classList.remove('disabled');
    yesBtn.disabled = false;
}

function resetFeedbackButtons() {
    noClicked = false;
    enableYesButton();
    noBtn.disabled = false;
    responseDiv.innerHTML = '';
}

yesBtn.addEventListener('click', () => {
    if (!noClicked) {
        responseDiv.innerHTML = `
            <p>YEAHH! I KNEW IT! 😉💋💖</p>
            <p>Thank you for being part of this journey with me.💖</p>
            <button class="continue-btn" onclick="showPage(6)">Go to Home Page</button>
        `;
    }
});

noBtn.addEventListener('click', () => {
    noClicked = true;
    disableYesButton();
    noBtn.disabled = true;
    
    responseDiv.innerHTML = `
        <div class="flirty-message">
            How dare you say no to me?! 😤😏💋
        </div>
        <p>Just kidding my love! But seriously... 😘</p>
        <button class="back-btn" id="back-btn">Take it back! 😉</button>
    `;
    
    // Add event listener for back button
    document.getElementById('back-btn').addEventListener('click', () => {
        noClicked = false;
        enableYesButton();
        noBtn.disabled = false;
        responseDiv.innerHTML = `
            <p>That's more like it! 😘</p>
            <p>Now you can choose YES! ❤️</p>
        `;
    });
});

// Restart Application
document.getElementById('restart-btn').addEventListener('click', () => {
    // Reset everything
    currentPage = 0;
    currentPhoto = 0;
    obstaclesRemoved = 0;
    noClicked = false;
    
    // Reset heart
    document.getElementById('heart').classList.remove('filled');
    
    // Reset gift page
    resetGiftPage();
    
    // Reset photos
    photoPages.forEach((page, index) => {
        page.classList.toggle('active', index === 0);
    });
    
    // Reset feedback
    resetFeedbackButtons();
    
    // Go back to first page
    showPage(0);
});

// Initialize first photo as active
photoPages[0].classList.add('active');