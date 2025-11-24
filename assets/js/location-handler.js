// Texas Lawyer Referral Service - Location Handler with IP-based Geolocation

// Location data with coordinates
const LOCATIONS = [
    {name: "Abilene", lat: 32.446413, lng: -99.735085, phone: "325-225-4400"},
    {name: "Amarillo", lat: 35.207994, lng: -101.836220, phone: "806-375-4400"},
    {name: "Austin", lat: 30.273408, lng: -97.747429, phone: "512-872-4400"},
    {name: "Beaumont", lat: 30.078771, lng: -94.095162, phone: "409-292-4400"},
    {name: "Corpus Christi", lat: 27.794936, lng: -97.402579, phone: "361-338-4400"},
    {name: "Dallas", lat: 32.828046, lng: -96.874105, phone: "214-731-4400"},
    {name: "El Paso", lat: 31.758492, lng: -106.486457, phone: "915-233-4400"},
    {name: "Fort Worth", lat: 32.757367, lng: -97.333766, phone: "817-642-8800"},
    {name: "Houston", lat: 29.701832, lng: -95.520376, phone: "713-510-7100"},
    {name: "Laredo", lat: 27.508095, lng: -99.509149, phone: "956-363-4400"},
    {name: "Longview", lat: 32.496872, lng: -94.740902, phone: "903-488-4400"},
    {name: "Lubbock", lat: 33.584849, lng: -101.846905, phone: "806-208-4400"},
    {name: "McAllen", lat: 26.301517, lng: -98.165130, phone: "956-305-3300"},
    {name: "Midland", lat: 32.002254, lng: -102.077503, phone: "432-348-4400"},
    {name: "San Angelo", lat: 31.462462, lng: -100.441543, phone: "325-208-4400"},
    {name: "San Antonio", lat: 29.422992, lng: -98.496645, phone: "210-585-4400"},
    {name: "Wichita Falls", lat: 33.912489, lng: -98.497331, phone: "940-245-4400"}
];

// Texas state boundaries (approximate)
const TEXAS_BOUNDS = {
    minLat: 25.8,
    maxLat: 36.5,
    minLng: -106.65,
    maxLng: -93.5
};

// Calculate distance using Pythagorean theorem
function calculateDistance(lat1, lng1, lat2, lng2) {
    const latDiff = lat2 - lat1;
    const lngDiff = lng2 - lng1;
    return Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
}

// Find closest location to user coordinates
function findClosestLocation(userLat, userLng) {
    let closest = LOCATIONS[0];
    let minDistance = calculateDistance(userLat, userLng, closest.lat, closest.lng);
    
    for (let i = 1; i < LOCATIONS.length; i++) {
        const distance = calculateDistance(userLat, userLng, LOCATIONS[i].lat, LOCATIONS[i].lng);
        if (distance < minDistance) {
            minDistance = distance;
            closest = LOCATIONS[i];
        }
    }
    
    return closest;
}

// Check if coordinates are in Texas
function isInTexas(lat, lng) {
    return lat >= TEXAS_BOUNDS.minLat && lat <= TEXAS_BOUNDS.maxLat &&
           lng >= TEXAS_BOUNDS.minLng && lng <= TEXAS_BOUNDS.maxLng;
}

// Get default location (Austin)
function getDefaultLocation() {
    return LOCATIONS.find(loc => loc.name === "Austin");
}

// Update phone number display
function updatePhoneDisplay(phoneNumber) {
    const phoneDisplay = document.getElementById('phoneDisplay');
    const mobilePhoneDisplays = document.querySelectorAll('#mobilePhoneDisplay');
    
    if (phoneDisplay) {
        phoneDisplay.textContent = formatPhoneNumber(phoneNumber);
        phoneDisplay.href = 'tel:' + phoneNumber;
    }
    
    mobilePhoneDisplays.forEach(display => {
        display.textContent = formatPhoneNumber(phoneNumber);
        display.href = 'tel:' + phoneNumber;
    });
}

// Update all location selectors
function updateLocationSelectors(phoneNumber) {
    const locationSelector = document.getElementById('locationSelector');
    const mobileLocationSelector = document.getElementById('mobileLocationSelector');
    
    if (locationSelector) {
        locationSelector.value = phoneNumber;
    }
    
    if (mobileLocationSelector) {
        mobileLocationSelector.value = phoneNumber;
    }
    
    updatePhoneDisplay(phoneNumber);
}

// Format phone number for display
function formatPhoneNumber(phone) {
    // Format: 123-456-7890
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
}

// Initialize location based on IP geolocation (no user prompt required)
function initializeLocation() {
    // Check if location has already been set this session
    const sessionLocation = sessionStorage.getItem('selectedLocation');
    if (sessionLocation) {
        updateLocationSelectors(sessionLocation);
        return;
    }
    
    // Use IP-based geolocation (no user permission required)
    // Using ipapi.co free API - no authentication needed
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            const userLat = data.latitude;
            const userLng = data.longitude;
            
            let selectedLocation;
            
            if (userLat && userLng) {
                if (isInTexas(userLat, userLng)) {
                    // User is in Texas, find closest location
                    selectedLocation = findClosestLocation(userLat, userLng);
                } else {
                    // User is outside Texas, default to Austin
                    selectedLocation = getDefaultLocation();
                }
            } else {
                // No coordinates returned, default to Austin
                selectedLocation = getDefaultLocation();
            }
            
            // Store in session
            sessionStorage.setItem('selectedLocation', selectedLocation.phone);
            
            // Update displays
            updateLocationSelectors(selectedLocation.phone);
        })
        .catch(error => {
            console.log('IP geolocation error:', error.message);
            // Default to Austin if API fails
            const defaultLoc = getDefaultLocation();
            sessionStorage.setItem('selectedLocation', defaultLoc.phone);
            updateLocationSelectors(defaultLoc.phone);
        });
}

// Run on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeLocation();
    
    // Update session storage when user manually changes location
    const locationSelector = document.getElementById('locationSelector');
    const mobileLocationSelector = document.getElementById('mobileLocationSelector');
    
    if (locationSelector) {
        locationSelector.addEventListener('change', function() {
            sessionStorage.setItem('selectedLocation', this.value);
        });
    }
    
    if (mobileLocationSelector) {
        mobileLocationSelector.addEventListener('change', function() {
            sessionStorage.setItem('selectedLocation', this.value);
        });
    }
});
