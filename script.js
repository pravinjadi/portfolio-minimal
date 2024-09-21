// Select the video element
const video = document.getElementById('scrollVideo');

// Initialize video properties
video.currentTime = 0;

let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

// Sensitivity factor: Adjust this to control how much the video progresses per scroll unit
const SCROLL_SENSITIVITY = 0.005;

// Function to update video playback based on scroll direction
function updateVideoPlayback() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let scrollDelta = scrollTop - lastScrollTop;

    // If there's no scroll change, return
    if (scrollDelta === 0) return;

    // Calculate the change in video time
    let timeChange = SCROLL_SENSITIVITY * Math.abs(scrollDelta);

    // Update currentTime based on scroll direction
    if (scrollDelta > 0) {
        // Scrolling down
        video.currentTime += timeChange;

        // Looping logic for scrolling down
        if (video.currentTime >= video.duration) {
            video.currentTime = 0; // Reset to the start when reaching the end
        }
    } else {
        // Scrolling up
        video.currentTime += timeChange;

        // Looping logic for scrolling up
        if (video.currentTime >= video.duration) {
            video.currentTime = 0; // Reset to the start when reaching the end
        }
    }

    // Update lastScrollTop
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For mobile or negative scrolling
}

// Throttle scroll events for performance
let isThrottled = false;
window.addEventListener('scroll', function() {
    if (!isThrottled) {
        window.requestAnimationFrame(function() {
            updateVideoPlayback();
            isThrottled = false;
        });
        isThrottled = true;
    }
});
