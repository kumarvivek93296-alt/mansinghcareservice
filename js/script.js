// Common JavaScript functions

// Mobile menu toggle (if needed)
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Form validation helper
function validatePhone(phone) {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Rating system
class RatingSystem {
    constructor() {
        this.ratings = [];
    }
    
    addRating(serviceId, userId, rating, review) {
        const ratingObj = {
            serviceId,
            userId,
            rating,
            review,
            date: new Date().toISOString()
        };
        
        this.ratings.push(ratingObj);
        this.saveRatings();
        return ratingObj;
    }
    
    getAverageRating(serviceId) {
        const serviceRatings = this.ratings.filter(r => r.serviceId === serviceId);
        if (serviceRatings.length === 0) return 0;
        
        const sum = serviceRatings.reduce((acc, curr) => acc + curr.rating, 0);
        return (sum / serviceRatings.length).toFixed(1);
    }
    
    saveRatings() {
        localStorage.setItem('ratings', JSON.stringify(this.ratings));
    }
    
    loadRatings() {
        const saved = localStorage.getItem('ratings');
        if (saved) {
            this.ratings = JSON.parse(saved);
        }
    }
}

// Initialize rating system
const ratingSystem = new RatingSystem();
ratingSystem.loadRatings();

// Handle form submissions globally
document.addEventListener('DOMContentLoaded', function() {
    // Add any global event listeners here
    console.log('Maansingh Care Services - Website Loaded');
});

// WhatsApp integration
function sendWhatsAppMessage(phone, message) {
    const whatsappURL = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}

// OTP simulation for login
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function sendOTP(phone) {
    const otp = generateOTP();
    console.log(`OTP for ${phone}: ${otp}`);
    showNotification(`OTP sent to ${phone}`, 'success');
    return otp;
}

// Export functions if using modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validatePhone,
        validateEmail,
        showNotification,
        RatingSystem,
        sendWhatsAppMessage,
        generateOTP,
        sendOTP
    };
}
