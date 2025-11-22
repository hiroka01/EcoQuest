// ===========================
// EcoQuest Application - Main JavaScript
// ===========================

// ===========================
// APPLICATION STATE
// ===========================

const appState = {
    currentUser: null,
    currentLanguage: 'en',
    ecoPoints: 450,
    bookings: [],
    pointsHistory: [],
    historyDepth: 0, // track app-specific history depth for back button visibility
    notificationSettings: {
        promotions: true,
        events: true,
        tours: true,
        wildlife: true,
        ecopoints: true
    }
};

// Sample data for tours
const toursData = [
    {
        id: 1,
        title_en: 'Mountain Hiking Adventure',
        title_ms: 'Pengembaraan Mendaki Gunung',
        category: 'hiking',
        description_en: 'Experience the breathtaking views of our mountain trails. Perfect for all fitness levels.',
        description_ms: 'Alami pemandangan memukau dari jejak gunung kami. Sempurna untuk semua tahap kecergasan.',
        price: 45,
        duration: '4 hours',
        maxPeople: 15,
        icon: '⛰️'
    },
    {
        id: 2,
        title_en: 'Wildlife Safari',
        title_ms: 'Perjalanan Safaris Hidupan Liar',
        category: 'wildlife',
        description_en: 'Get up close with native wildlife in their natural habitat with experienced guides.',
        description_ms: 'Dekat dengan hidupan liar asli dalam habitat semula jadi dengan pemandu berpengalaman.',
        price: 65,
        duration: '3 hours',
        maxPeople: 10,
        icon: '🦁'
    },
    {
        id: 3,
        title_en: 'Waterfall Trek',
        title_ms: 'Pendakian Air Terjun',
        category: 'waterfall',
        description_en: 'Explore hidden waterfalls and natural pools. Refreshing and exciting adventure.',
        description_ms: 'Jelajahi air terjun tersembunyi dan kolam semula jadi. Pengembaraan yang menyegarkan.',
        price: 55,
        duration: '5 hours',
        maxPeople: 12,
        icon: '💧'
    },
    {
        id: 4,
        title_en: 'Bird Watching Expedition',
        title_ms: 'Ekspedisi Memerhati Burung',
        category: 'bird',
        description_en: 'Spot rare and exotic birds in their natural environment with binoculars and guides.',
        description_ms: 'Temui burung jarang dan eksotik dalam persekitaran semula jadi dengan pemandu.',
        price: 40,
        duration: '3 hours',
        maxPeople: 8,
        icon: '🦅'
    },
    {
        id: 5,
        title_en: 'Night Forest Walk',
        title_ms: 'Berjalan Hutan Malam',
        category: 'hiking',
        description_en: 'Experience the magic of the forest at night. Guided tour with expert naturalists.',
        description_ms: 'Alami keajaiban hutan pada malam hari dengan pemandu ahli.',
        price: 50,
        duration: '2 hours',
        maxPeople: 10,
        icon: '🌙'
    }
];

// Wildlife updates data
const wildlifeUpdates = [
    {
        id: 1,
        title_en: 'Dusky Leaf Monkey',
        title_ms: 'Lotong Kelabu',
        content_en: 'Near north trail',
        content_ms: 'Berdekatan jejak utara',
        timestamp: '2 hours ago',
        ranger: 'Ranger Ahmad'
    },
    {
        id: 2,
        title_en: 'Long-tailed Macaque',
        title_ms: 'Kera Ekor Panjang',
        content_en: 'Near playground rest area',
        content_ms: 'Berdekatan kawasan rehat taman permainan',
        timestamp: '1 day ago',
        ranger: 'Ranger Siti'
    },
    {
        id: 3,
        title_en: 'Oriental Pied Hornbill',
        title_ms: 'Enggang Kelingking',
        content_en: 'Near the entrance forest canopy',
        content_ms: 'Berdekatan kanopi hutan di pintu masuk',
        timestamp: '3 days ago',
        ranger: 'Ranger Ramesh'
    },
    {
        id: 4,
        title_en: 'Malayan Water Monitor Lizard',
        title_ms: 'Biawak Air Malaya',
        content_en: 'Near the small stream area',
        content_ms: 'Berdekatan kawasan anak sungai',
        timestamp: '3 days ago',
        ranger: 'Ranger Ramesh'
    }
];

// Events and volunteer programs
const eventsData = [
    {
        id: 1,
        title_en: 'Forest Cleanup Drive',
        title_ms: 'Operasi Pembersihan Hutan',
        description_en: 'Join us in cleaning up the forest trails and planting native trees.',
        description_ms: 'Sertai kami dalam membersihkan jejak hutan dan menanam pokok asli.',
        date: '2025-11-20',
        location: 'Central Forest Area',
        type: 'event',
        icon: '🧹'
    },
    {
        id: 2,
        title_en: 'Wildlife Photography Workshop',
        title_ms: 'Bengkel Fotografi Hidupan Liar',
        description_en: 'Learn professional wildlife photography techniques from expert photographers.',
        description_ms: 'Pelajari teknik fotografi hidupan liar profesional dari ahli.',
        date: '2025-11-22',
        location: 'Nature Center',
        type: 'event',
        icon: '📷'
    },
    {
        id: 3,
        title_en: 'Volunteer as Nature Guide',
        title_ms: 'Sukarelawan sebagai Pemandu Alam',
        description_en: 'Become part of our ranger team and guide visitors through the park.',
        description_ms: 'Jadilah sebahagian daripada pasukan penjaga dan pandu pelawat.',
        date: '2025-11-25',
        location: 'Training Center',
        type: 'volunteer',
        icon: '👨‍🦱'
    },
    {
        id: 4,
        title_en: 'Environmental Education Seminar',
        title_ms: 'Seminar Pendidikan Alam Sekitar',
        description_en: 'Attend seminars on conservation and sustainable practices.',
        description_ms: 'Hadiri seminar tentang pemuliharan dan amalan lestari.',
        date: '2025-11-28',
        location: 'Auditorium',
        type: 'event',
        icon: '📚'
    }
];

// Species information for AR scan
const speciesInfo = {
    cat: {
        name_en: 'Cat (Felis Catus)',
        name_ms: 'Kucing (Felis Catus)',
        icon: '🐈',
        description_en: `A small domesticated mammals that has a soft fur, excellent night vision, and sharp senses. They are known for being playful, 
        alert, and adaptable to different environments.`,
        description_ms: `Mamalia kecil yang mempunyai bulu lembut, penglihatan malam yang sangat baik, dan deria tajam. Mereka terkenal kerana suka bermain, 
        amaran, dan boleh disesuaikan dengan persekitaran yang berbeza.`,
        habitat_en: 'Urban areas, villages, eco parks, and home as indoor pets',
        habitat_ms: 'Kawasan bandar, kampung, taman eko, dan rumah sebagai haiwan peliharaan dalaman',
        diet_en: 'Carnivore - Commercial cat food, fish, chicken, and meat scraps',
        diet_ms: 'Karnivor - Makanan kucing komersial, ikan, ayam, dan sisa daging',
        status_en: 'Least Concern (LC) - Stable population',
        status_ms: 'Least Concern (LC) - Populasi stabil'
    },
    ostrich: {
        name_en: 'Ostrich (Struthio camelus)',
        name_ms: 'Burung Unta (Struthio camelus)',
        icon: '🐦',
        description_en: `A largest and heaviest living bird, unable to fly but capable of running very fast. It has a long neck, strong legs, and a
        powerful kick used for defense.`,
        description_ms: `Burung hidup yang terbesar dan paling berat, tidak dapat terbang tetapi mampu berjalan dengan cepat. Ia mempunyai leher panjang, kaki kuat, dan a
        Tendangan kuat digunakan untuk pertahanan.`,
        habitat_en: 'Ostrich farms, eco park and petting zoos, and open grass fields',
        habitat_ms: 'Ladang burung unta, taman eko dan zoo petting, dan padang rumput terbuka',
        diet_en: 'Omnivore - Grass, leaves, seeds, fruits, small insects, and commercial ostrich food',
        diet_ms: 'Omnivor - Rumput, daun, biji benih, buah-buahan, serangga kecil, dan makanan burung unta komersial',
        status_en: 'Least Concern (LC) - Stable population ',
        status_ms: 'Least Concern (LC) - Populasi stabil'
    },
    swan: {
        name_en: 'Mute Swan (Cygnus olor)',
        name_ms: 'Angsa Bisu (Cygnus olor)',
        icon: '🦢',
        description_en: `Large, elegant waterbird with a long neck, white plumage, and an orange bill with a black knob. Its known for its graceful
        movements, and often kept in decorative lakes and parks.`,
        description_ms: `Burung air besar, elegan dengan leher panjang, bulu putih, dan bil oren dengan tombol hitam. Terkenal dengan anggun
        pergerakan, dan sering disimpan di tasik dan taman hiasan.`,
        habitat_en: 'Man-made lakes in parks, eco parks, zoos, and calm freshwater ponds',
        habitat_ms: 'Tasik buatan manusia di taman, taman eko, zoo, dan kolam air tawar yang tenang',
        diet_en: 'Omnivore - Aquatic plants, grass, small insects, and aquatic invertebrates',
        diet_ms: 'Omnivore - Tumbuhan akuatik, rumput, rerangga kecil, dan invertebrata akuatik',
        status_en: 'Least Concern (LC) - Stable population',
        status_ms: 'Least Concern (LC) - Populasi stabil'
    },
    goat: {
        name_en: 'Goat (Capra aegagrus hircus)',
        name_ms: 'Kambing (Capra aegagrus hircus)',
        icon: '🐐',
        description_en: `A medium-sized domesticated mammal commonly raised for meat, milk, and fur. It has curved horns, a sturdy body, and is
        known for climbing ability and curiosity.`,
        description_ms: `Mamalia berukuran sederhana yang biasanya dibangkitkan untuk daging, susu, dan bulu. Ia mempunyai tanduk melengkung, badan yang kuat, dan
        dikenali dengan kemampuan memanjat dan rasa ingin tahu.`,
        habitat_en: 'Goat farm, small rural villages, grasslands, and agricultural areas',
        habitat_ms: 'Ladang kambing, kampung luar bandar kecil, padang rumput, dan kawasan pertanian',
        diet_en: 'Herbivore - Grass and shrubs, leaves, and fruits',
        diet_ms: 'Herbivor - Rumput dan pokok, daun, dan buah-buahan',
        status_en: 'Least Concern (LC) - Stable population',
        status_ms: 'Least Concern (LC) - Populasi stabil'
    }
};

// Rewards catalog
const rewards = [
    { id: 1, name_en: 'Park Map', name_ms: 'Peta Taman', cost: 50, icon: '🗺️' },
    { id: 2, name_en: 'T-Shirt', name_ms: 'T-Kemeja', cost: 100, icon: '👕' },
    { id: 3, name_en: 'Water Bottle', name_ms: 'Botol Air', cost: 75, icon: '💧' },
    { id: 4, name_en: 'Binoculars', name_ms: 'Teropong', cost: 200, icon: '🔭' },
    { id: 5, name_en: 'Camera', name_ms: 'Kamera', cost: 300, icon: '📷' },
    { id: 6, name_en: 'Backpack', name_ms: 'Beg Galas', cost: 150, icon: '🎒' }
];

// ===========================
// LANGUAGE SYSTEM
// ===========================

function initializeLanguage() {
    const savedLang = localStorage.getItem('ecoquest_language') || 'en';
    appState.currentLanguage = savedLang;
    setLanguage(savedLang);
}

function setLanguage(lang) {
    appState.currentLanguage = lang;
    localStorage.setItem('ecoquest_language', lang);
    
    // Update language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });
    
    // Update all translatable text
    updateAllTranslations();
}

function updateAllTranslations() {
    const lang = appState.currentLanguage;
    
    // Update data attributes
    document.querySelectorAll('[data-en]').forEach(el => {
        const key = `data-${lang}`;
        if (el.hasAttribute(key)) {
            el.textContent = el.getAttribute(key);
        }
    });
    
    // Update placeholders
    document.querySelectorAll('[data-en-placeholder]').forEach(el => {
        const key = `data-${lang}-placeholder`;
        if (el.hasAttribute(key)) {
            el.placeholder = el.getAttribute(key);
        }
    });

    // Manually update dynamic content
    loadTours();
    loadWildlifeUpdates();
    loadEvents();
    loadRewards();
    displayUserGreeting();
}

function getText(key, lang = null) {
    lang = lang || appState.currentLanguage;
    const el = document.createElement('div');
    el.setAttribute('data-en', key);
    el.setAttribute('data-ms', key); // Fallback
    // A more robust system would use a key-value store, but this works for demo
    if (lang === 'ms') {
        if (key === 'Please fill in all fields') return 'Sila isi semua medan';
        if (key === 'Password must be at least 6 characters') return 'Kata laluan mesti sekurang-kurangnya 6 aksara';
        if (key === 'Please enter a valid email') return 'Sila masukkan e-mel yang sah';
        if (key === 'Thank you for your feedback!') return 'Terima kasih atas maklum balas anda!';
    }
    if (lang === 'en') {
         if (key === 'Thank you for your feedback!') return 'Thank you for your feedback!';
    }
    return key;
}

// ===========================
// AUTHENTICATION SYSTEM
// ===========================

function initializeLogin() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
    
    // Check if already logged in
    const savedUser = localStorage.getItem('ecoquest_user');
    if (savedUser) {
        const user = JSON.parse(savedUser);
        appState.currentUser = user;
        showMainApp();
    } else {
        showPage('loginPage'); // Ensure login page is shown if not logged in
    }
}

function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorDiv = document.getElementById('loginError');
    
    // Validation
    if (!username || !password) {
        showError(errorDiv, getText('Please fill in all fields'));
        return;
    }
    
    if (password.length < 6) {
        showError(errorDiv, getText('Password must be at least 6 characters'));
        return;
    }
    
    // Simulate successful login
    const user = {
        id: Date.now(),
        username: username,
        email: `${username}@ecoquest.com`,
        ecoPoints: 450,
        joinDate: new Date().toLocaleDateString()
    };
    
    appState.currentUser = user;
    localStorage.setItem('ecoquest_user', JSON.stringify(user));
    
    showToast(`Welcome back, ${username}!`, 'success');
    showMainApp();
}

function handleSignup(e) {
    e.preventDefault();
    
    const username = document.getElementById('signupUsername').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value.trim();
    const errorDiv = document.getElementById('signupError');
    
    // Validation
    if (!username || !email || !password) {
        showError(errorDiv, getText('Please fill in all fields'));
        return;
    }
    
    if (password.length < 6) {
        showError(errorDiv, getText('Password must be at least 6 characters'));
        return;
    }
    
    if (!validateEmail(email)) {
        showError(errorDiv, getText('Please enter a valid email'));
        return;
    }
    
    // Create new user
    const user = {
        id: Date.now(),
        username: username,
        email: email,
        ecoPoints: 0,
        joinDate: new Date().toLocaleDateString()
    };
    
    appState.currentUser = user;
    localStorage.setItem('ecoquest_user', JSON.stringify(user));
    
    showToast(`Account created successfully, ${username}!`, 'success');
    showMainApp();
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(element, message) {
    element.textContent = message;
    element.classList.add('show');
    setTimeout(() => {
        element.classList.remove('show');
    }, 4000);
}

function goToLogin() {
    showPage('loginPage');
    document.getElementById('loginForm').reset();
    document.getElementById('signupForm').reset();
}

function goToSignup() {
    showPage('signupPage');
}

// ===========================
// PAGE NAVIGATION
// ===========================

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    const pageElement = document.getElementById(pageId);
    if (pageElement) {
        pageElement.classList.add('active');
    }
}

function showMainApp() {
    showPage('mainApp');
    initializeMainApp();
    displayUserGreeting();
    displayProfileInfo();
    loadTours();
    loadWildlifeUpdates();
    loadEvents();
    loadRewards();
    displayEcoPoints();
}

function navigateTo(page, addToHistory = true) {
    const pageMap = {
        'home': 'homePage',
        'tours': 'toursPage',
        'wildlife': 'wildlifePage', // This is the "Scan" page
        'events': 'eventsPage',
        'ecopoints': 'ecopointsPage',
        'map': 'mapPage', // Added Map page
        'profile': 'profilePage'
    };
    
    const sectionId = pageMap[page];
    if (sectionId) {
        // If requested, push a new history entry so browser back works
        if (addToHistory) {
            const nextDepth = (appState.historyDepth || 0) + 1;
            try {
                history.pushState({ page, depth: nextDepth }, '', `#${page}`);
            } catch (e) {
                // ignore (some environments may restrict pushState)
            }
            appState.historyDepth = nextDepth;
        }

        // track current page for back-button logic
        appState.currentPage = page;
        // if returning to home, reset any home-card back flag
        if (page === 'home') {
            appState.homeBackActive = false;
        }

        showContentSection(sectionId);
        updateNavButtons(page);
        // update visibility of back button
        showBackButton();
    }
}

function showBackButton() {
    const btn = document.getElementById('userBackBtn');
    if (!btn) return;
    
    // Always hide back button when on home page
    if (appState.currentPage === 'home') {
        btn.style.display = 'none';
        return;
    }
    
    const shouldShow = (appState.historyDepth && appState.historyDepth > 0) || (appState.homeBackActive && appState.currentPage && appState.currentPage !== 'home');
    btn.style.display = shouldShow ? 'inline-flex' : 'none';
}

function goBack() {
    // If the back button was activated from a home-card click, return to home
    if (appState.homeBackActive && appState.currentPage && appState.currentPage !== 'home') {
        navigateTo('home', false);
        appState.homeBackActive = false;
        return;
    }

    // Prefer browser history to keep URL and history in sync
    if (appState.historyDepth && appState.historyDepth > 0) {
        window.history.back();
    } else {
        // fallback to navigating to home
        navigateTo('home', false);
    }
}

// Handle browser back/forward (popstate) so URL and UI stay in sync
window.addEventListener('popstate', (event) => {
    const state = event.state || { page: 'home', depth: 0 };
    const page = state.page || 'home';
    appState.historyDepth = state.depth || 0;
    // navigate without pushing new history entry
    navigateTo(page, false);
    showBackButton();
});

function showContentSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    const section = document.getElementById(sectionId);
    if(section) {
        section.classList.add('active');
        section.scrollTop = 0; // Scroll to top of new section
    }
}

function updateNavButtons(page) {
    // Use new bottom nav buttons
    document.querySelectorAll('.bottom-nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.page === page) {
            btn.classList.add('active');
        }
    });
}

function initializeMainApp() {
    // Ensure main app container allows scrolling for content
    const mainApp = document.getElementById('mainApp');
    if (mainApp) {
        // This is handled by .content-section overflow now
    }

    // NEW: Navigation buttons for bottom bar
    document.querySelectorAll('.bottom-nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            navigateTo(btn.dataset.page);
        });
    });
    
    // Home action cards - when a card is pressed, activate home back
    document.querySelectorAll('.action-card').forEach(card => {
        card.addEventListener('click', function() {
            appState.homeBackActive = true;
        });
    });
    
    // Tab navigation
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            showTab(tab);
        });
    });
    
    // NEW: Home feedback form
    const homeFeedbackForm = document.getElementById('homeFeedbackForm');
    if (homeFeedbackForm) {
        homeFeedbackForm.addEventListener('submit', handleHomeFeedback);
    }
    
    // Show home by default
    navigateTo('home', false); // Don't add to history on initial load
}

// ===========================
// NEW FEEDBACK HANDLER
// ===========================

function handleHomeFeedback(e) {
    e.preventDefault();
    const form = document.getElementById('homeFeedbackForm');
    const comments = document.getElementById('homeFeedbackComments').value;
    const rating = form.querySelector('input[name="rating"]:checked');
    
    if (!rating && !comments.trim()) {
        const lang = appState.currentLanguage;
        const message = lang === 'ms' ? 'Sila beri bintang atau komen' : 'Please leave a rating or comment';
        showToast(message, 'warning');
        return;
    }
    
    // Simulate sending feedback
    console.log('Feedback Submitted:');
    console.log('Rating:', rating ? rating.value : 'N/A');
    console.log('Comments:', comments);
    
    // Show success toast
    showToast(getText('Thank you for your feedback!'), 'success');
    
    // Reset form
    form.reset();
}

function showTab(tabName) {
    const tabs = {
        'events': 'eventsTab',
        'volunteer': 'volunteerTab'
    };
    
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (tabs[tabName]) {
        document.getElementById(tabs[tabName]).classList.add('active');
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    }
}

// ===========================
// HOME PAGE FUNCTIONALITY
// ===========================

function displayUserGreeting() {
    if (appState.currentUser) {
        const greeting = document.getElementById('userGreeting');
        const lang = appState.currentLanguage;
        const greetingText = lang === 'ms' 
            ? `Selamat datang, ${appState.currentUser.username}! 🌿` 
            : `Welcome, ${appState.currentUser.username}! 🌿`;
        greeting.textContent = greetingText;
    }
}

// ===========================
// TOURS PAGE FUNCTIONALITY
// ===========================

function loadTours() {
    const toursList = document.getElementById('toursList');
    if (!toursList) return; // Exit if page not loaded
    toursList.innerHTML = '';
    
    toursData.forEach(tour => {
        const lang = appState.currentLanguage;
        const title = lang === 'ms' ? tour.title_ms : tour.title_en;
        const description = lang === 'ms' ? tour.description_ms : tour.description_en;
        const btnText = lang === 'ms' ? 'Tempah Sekarang' : 'Book Now';
        
        const tourCard = document.createElement('div');
        tourCard.className = 'tour-card';
        tourCard.innerHTML = `
            <div class="tour-image">${tour.icon}</div>
            <div class="tour-content">
                <h3>${title}</h3>
                <div class="tour-meta">
                    <span>⏱️ ${tour.duration}</span>
                    <span>👥 Max ${tour.maxPeople}</span>
                </div>
                <p class="tour-description">${description}</p>
                <div class="tour-price">RM${tour.price}</div>
                <button class="btn btn-primary" onclick="openBookingModal(${tour.id})">${btnText}</button>
            </div>
        `;
        toursList.appendChild(tourCard);
    });
}

function openBookingModal(tourId) {
    const tour = toursData.find(t => t.id === tourId);
    const modal = document.getElementById('bookingModal');
    const modalTitle = document.getElementById('modalTourTitle');
    const lang = appState.currentLanguage;
    
    modalTitle.textContent = lang === 'ms' ? tour.title_ms : tour.title_en;
    modal.classList.add('active');
    
    document.getElementById('bookingForm').onsubmit = (e) => {
        e.preventDefault();
        handleBooking(tour);
    };
}

function closeModal() {
    document.getElementById('bookingModal').classList.remove('active');
}

function handleBooking(tour) {
    const date = document.getElementById('bookingDate').value;
    const people = document.getElementById('bookingPeople').value;
    const notes = document.getElementById('bookingNotes').value;
    
    if (!date) {
        showToast('Please select a date', 'warning');
        return;
    }
    
    const booking = {
        id: Date.now(),
        tour: tour.title_en,
        date: date,
        people: people,
        notes: notes,
        status: 'confirmed'
    };
    
    appState.bookings.push(booking);
    localStorage.setItem('ecoquest_bookings', JSON.stringify(appState.bookings));
    
    showToast('Booking confirmed!', 'success');
    closeModal();
    loadTours();
}

// ===========================
// WILDLIFE PAGE FUNCTIONALITY
// ===========================

function loadWildlifeUpdates() {
    const updatesList = document.getElementById('wildlifeUpdatesList');
    const homeUpdates = document.getElementById('homeUpdates');
    
    if(updatesList) updatesList.innerHTML = '';
    if(homeUpdates) homeUpdates.innerHTML = '';
    
    wildlifeUpdates.forEach(update => {
        const lang = appState.currentLanguage;
        const title = lang === 'ms' ? update.title_ms : update.title_en;
        const content = lang === 'ms' ? update.content_ms : update.content_en;
        
        const card = document.createElement('div');
        card.className = 'update-card';
        card.innerHTML = `
            <h4>${title}</h4>
            <p>${content}</p>
            <div class="update-timestamp">🕐 ${update.timestamp} by ${update.ranger}</div>
        `;
        
        if(updatesList) updatesList.appendChild(card);
        
        // Add first 2 to home page
        if (homeUpdates && homeUpdates.children.length < 2) {
            homeUpdates.appendChild(card.cloneNode(true));
        }
    });
}

function activateScanMode() {
    document.getElementById('scanSection').style.display = 'block';
    document.getElementById('speciesInfo').style.display = 'none';
}

function closeScanMode() {
    document.getElementById('scanSection').style.display = 'none';
    document.getElementById('speciesInfo').style.display = 'none';
}

function showSpeciesInfo(speciesKey) {
    const species = speciesInfo[speciesKey];
    const lang = appState.currentLanguage;
    
    const speciesContent = document.getElementById('speciesContent');
    const name = lang === 'ms' ? species.name_ms : species.name_en;
    const description = lang === 'ms' ? species.description_ms : species.description_en;
    const habitat = lang === 'ms' ? species.habitat_ms : species.habitat_en;
    const diet = lang === 'ms' ? species.diet_ms : species.diet_en;
    const status = lang === 'ms' ? species.status_ms : species.status_en;
    
    speciesContent.innerHTML = `
        <div class="species-header">
            <div class="species-icon">${species.icon}</div>
            <h2>${name}</h2>
        </div>
        <div class="species-details">
            <p><strong>${lang === 'ms' ? 'Perihal:' : 'Description:'}</strong></p>
            <p>${description}</p>
            
            <p><strong>${lang === 'ms' ? 'Habitat:' : 'Habitat:'}</strong> ${habitat}</p>
            
            <p><strong>${lang === 'ms' ? 'Diet:' : 'Diet:'}</strong> ${diet}</p>
            
            <p><strong>${lang === 'ms' ? 'Status Pemuliharan:' : 'Conservation Status:'}</strong> ${status}</p>
        </div>
    `;
    
    document.getElementById('scanSection').style.display = 'none';
    document.getElementById('speciesInfo').style.display = 'block';
}

// ===========================
// EVENTS PAGE FUNCTIONALITY
// ===========================

function loadEvents() {
    const eventsList = document.getElementById('eventsList');
    const volunteerList = document.getElementById('volunteerList');
    
    if (!eventsList || !volunteerList) return;
    
    eventsList.innerHTML = '';
    volunteerList.innerHTML = '';
    
    eventsData.forEach(event => {
        const lang = appState.currentLanguage;
        const title = lang === 'ms' ? event.title_ms : event.title_en;
        const description = lang === 'ms' ? event.description_ms : event.description_en;
        const btnText = lang === 'ms' ? 'Sertai' : 'Join';

        const card = document.createElement('div');
        card.className = 'event-card';
        card.innerHTML = `
            <div class="event-header">
                <h3>${event.icon} ${title}</h3>
                <div class="event-date">${new Date(event.date).toLocaleDateString()}</div>
            </div>
            <p class="event-description">${description}</p>
            <div class="event-footer">
                <span class="event-location">📍 ${event.location}</span>
                <button class="btn btn-small" onclick="joinEvent('${title}')">${btnText}</button>
            </div>
        `;
        
        if (event.type === 'event') {
            eventsList.appendChild(card);
        } else {
            volunteerList.appendChild(card);
        }
    });
}

function joinEvent(eventName) {
    showToast(`You joined "${eventName}"!`, 'success');
    appState.bookings.push({
        type: 'event',
        name: eventName,
        date: new Date().toLocaleDateString()
    });
    // Refresh profile stats if profile page is visible
    if(document.getElementById('profilePage').classList.contains('active')) {
        displayProfileInfo();
    }
}

// ===========================
// ECOPOINTS PAGE FUNCTIONALITY
// ===========================

function displayEcoPoints() {
    const userPoints = document.getElementById('userPoints');
    const profileEcoPoints = document.getElementById('profileEcoPoints');
    
    if (userPoints) userPoints.textContent = appState.ecoPoints;
    if (profileEcoPoints) profileEcoPoints.textContent = appState.ecoPoints;
    
    // Update progress bar
    const progress = Math.min((appState.ecoPoints / 1000) * 100, 100);
    const progressBar = document.querySelector('.points-progress-bar');
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
}

function earnPoints(points, action) {
    appState.ecoPoints += points;
    appState.pointsHistory.push({
        action: action,
        points: points,
        date: new Date().toLocaleString()
    });
    
    localStorage.setItem('ecoquest_ecopoints', JSON.stringify(appState.ecoPoints));
    localStorage.setItem('ecoquest_history', JSON.stringify(appState.pointsHistory));
    
    displayEcoPoints();
    displayPointsHistory();
    loadRewards(); // Refresh rewards to enable/disable buttons
    
    const lang = appState.currentLanguage;
    const message = lang === 'ms' ? `Anda mendapat ${points} mata!` : `You earned ${points} points!`;
    showToast(message, 'success');
}

function displayPointsHistory() {
    const historyList = document.getElementById('historyList');
    if (!historyList) return;
    
    historyList.innerHTML = '';
    
    const sortedHistory = [...appState.pointsHistory].reverse();
    sortedHistory.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <span class="history-action">${item.action}</span>
            <span class="history-points">+${item.points}</span>
        `;
        historyList.appendChild(historyItem);
    });
    
    if (appState.pointsHistory.length === 0) {
        historyList.innerHTML = `<p style="text-align:center;color:var(--dark-gray);">${appState.currentLanguage === 'ms' ? 'Tiada sejarah' : 'No history yet'}</p>`;
    }
}

function loadRewards() {
    const rewardsList = document.getElementById('rewardsList');
    if (!rewardsList) return;
    
    rewardsList.innerHTML = '';
    
    rewards.forEach(reward => {
        const lang = appState.currentLanguage;
        const name = lang === 'ms' ? reward.name_ms : reward.name_en;
        const btnText = lang === 'ms' ? 'Tukar' : 'Redeem';
        const disabled = appState.ecoPoints < reward.cost;

        const rewardCard = document.createElement('div');
        rewardCard.className = 'reward-item';
        rewardCard.innerHTML = `
            <div class="reward-icon">${reward.icon}</div>
            <div class="reward-name">${name}</div>
            <div class="reward-cost">${reward.cost} pts</div>
            <button class="btn btn-small" onclick="redeemReward('${name}', ${reward.cost})" 
                ${disabled ? 'disabled' : ''}
                style="${disabled ? 'opacity:0.5;cursor:not-allowed;' : ''}">
                ${btnText}
            </button>
        `;
        rewardsList.appendChild(rewardCard);
    });
}

function redeemReward(rewardName, cost) {
    if (appState.ecoPoints < cost) {
        showToast('Not enough points!', 'warning');
        return;
    }
    
    appState.ecoPoints -= cost;
    displayEcoPoints();
    loadRewards();
    
    const lang = appState.currentLanguage;
    const message = lang === 'ms' ? `Anda menukar ${rewardName}!` : `You redeemed ${rewardName}!`;
    showToast(message, 'success');
}

// ===========================
// PROFILE PAGE FUNCTIONALITY
// ===========================

function displayProfileInfo() {
    if (appState.currentUser) {
        const profileUsername = document.getElementById('profileUsername');
        const profileEmail = document.getElementById('profileEmail');
        const profileEcoPoints = document.getElementById('profileEcoPoints');
        const profileTours = document.getElementById('profileTours');
        const profileEvents = document.getElementById('profileEvents');

        if (profileUsername) profileUsername.textContent = appState.currentUser.username;
        if (profileEmail) profileEmail.textContent = appState.currentUser.email;
        if (profileEcoPoints) profileEcoPoints.textContent = appState.ecoPoints;
        if (profileTours) profileTours.textContent = appState.bookings.filter(b => b.tour).length;
        if (profileEvents) profileEvents.textContent = appState.bookings.filter(b => b.type === 'event').length;
        
        displayUserBookings();
    }
}

function displayUserBookings() {
    const myBookings = document.getElementById('myBookings');
    if (!myBookings) return;
    
    myBookings.innerHTML = '';
    
    if (appState.bookings.length === 0) {
        const lang = appState.currentLanguage;
        myBookings.innerHTML = `<p style="text-align:center;color:var(--dark-gray);">${lang === 'ms' ? 'Tiada tempahan' : 'No bookings yet'}</p>`;
        return;
    }
    
    appState.bookings.forEach(booking => {
        const bookingDiv = document.createElement('div');
        bookingDiv.className = 'booking-item';
        bookingDiv.innerHTML = `
            <h4>${booking.tour || booking.name}</h4>
            <p class="booking-meta">📅 ${booking.date}</p>
            ${booking.people ? `<p class="booking-meta">👥 ${booking.people} ${appState.currentLanguage === 'ms' ? 'orang' : 'people'}</p>` : ''}
            <p class="booking-meta" style="color:var(--success);">✓ ${booking.status || 'Joined'}</p>
        `;
        myBookings.appendChild(bookingDiv);
    });
}

// ===========================
// ACCOUNT MENU & SETTINGS
// ===========================

function toggleAccountMenu() {
    const dropdown = document.getElementById('accountMenuDropdown');
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    
    if (dropdown.style.display === 'block' && appState.currentUser) {
        document.getElementById('accountMenuUsername').textContent = appState.currentUser.username;
    }
}

function openAccountSettings() {
    toggleAccountMenu();
    document.getElementById('accountSettingsModal').classList.add('active');
    
    // Populate form with current user info
    if(appState.currentUser) {
        document.getElementById('settingUsername').value = appState.currentUser.username;
        document.getElementById('settingEmail').value = appState.currentUser.email;
    }
    
    const form = document.getElementById('accountSettingsForm');
    form.onsubmit = handleAccountSettingsSave;
}

function closeAccountSettings() {
    document.getElementById('accountSettingsModal').classList.remove('active');
}

function handleAccountSettingsSave(e) {
    e.preventDefault();
    
    const username = document.getElementById('settingUsername').value.trim();
    const email = document.getElementById('settingEmail').value.trim();
    
    if (!username || !email) {
        const lang = appState.currentLanguage;
        showToast(lang === 'ms' ? 'Sila isi semua medan' : 'Please fill in all fields', 'warning');
        return;
    }
    
    if (!validateEmail(email)) {
        const lang = appState.currentLanguage;
        showToast(lang === 'ms' ? 'E-mel tidak sah' : 'Invalid email', 'warning');
        return;
    }
    
    // Update user info
    appState.currentUser.username = username;
    appState.currentUser.email = email;
    localStorage.setItem('ecoquest_user', JSON.stringify(appState.currentUser));
    
    closeAccountSettings();
    displayUserGreeting();
    displayProfileInfo(); // Refresh profile
    
    const lang = appState.currentLanguage;
    const message = lang === 'ms' ? 'Tetapan akaun disimpan' : 'Account settings saved';
    showToast(message, 'success');
}

function openNotificationSettings() {
    toggleAccountMenu();
    document.getElementById('notificationSettingsModal').classList.add('active');
    
    // Load saved preferences
    document.getElementById('promoBtnNotif').checked = appState.notificationSettings.promotions;
    document.getElementById('eventNotif').checked = appState.notificationSettings.events;
    document.getElementById('tourNotif').checked = appState.notificationSettings.tours;
    document.getElementById('wildlifeNotif').checked = appState.notificationSettings.wildlife;
    document.getElementById('ecopointsNotif').checked = appState.notificationSettings.ecopoints;
    
    const form = document.getElementById('notificationSettingsForm');
    form.onsubmit = handleNotificationSettingsSave;
}

function closeNotificationSettings() {
    document.getElementById('notificationSettingsModal').classList.remove('active');
}

function handleNotificationSettingsSave(e) {
    e.preventDefault();
    
    // Save notification preferences
    appState.notificationSettings.promotions = document.getElementById('promoBtnNotif').checked;
    appState.notificationSettings.events = document.getElementById('eventNotif').checked;
    appState.notificationSettings.tours = document.getElementById('tourNotif').checked;
    appState.notificationSettings.wildlife = document.getElementById('wildlifeNotif').checked;
    appState.notificationSettings.ecopoints = document.getElementById('ecopointsNotif').checked;
    
    localStorage.setItem('ecoquest_notif_settings', JSON.stringify(appState.notificationSettings));
    
    closeNotificationSettings();
    
    const lang = appState.currentLanguage;
    const message = lang === 'ms' ? 'Pilihan pemberitahuan disimpan' : 'Notification preferences saved';
    showToast(message, 'success');
}

// ===========================
// LOGOUT FUNCTIONALITY
// ===========================

function performLogout() {
    const lang = appState.currentLanguage;
    const confirmMessage = lang === 'ms' 
        ? 'Adakah anda pasti mahu log keluar?' 
        : 'Are you sure you want to logout?';
    
    if (confirm(confirmMessage)) {
        logout();
    }
}

function logout() {
    // Clear user data from localStorage
    localStorage.removeItem('ecoquest_user');
    localStorage.removeItem('ecoquest_bookings');
    localStorage.removeItem('ecoquest_ecopoints');
    localStorage.removeItem('ecoquest_history');
    localStorage.removeItem('ecoquest_notif_settings');
    
    // Reset app state
    appState.currentUser = null;
    appState.bookings = [];
    appState.ecoPoints = 450; // Reset to default or 0
    appState.pointsHistory = [];
    appState.historyDepth = 0;
    appState.currentPage = 'home';
    appState.homeBackActive = false;
    
    // Close any open modals or dropdowns
    closeAllModals();
    
    // Show login page
    showPage('loginPage');
    
    // Reset login form
    const loginForm = document.getElementById('loginForm');
    if(loginForm) loginForm.reset();
    
    // Show logout success message
    const lang = appState.currentLanguage;
    const message = lang === 'ms' ? 'Anda telah log keluar' : 'You have been logged out';
    showToast(message, 'info');
}

function closeAllModals() {
    // Close account menu dropdown
    const accountDropdown = document.getElementById('accountMenuDropdown');
    if (accountDropdown) {
        accountDropdown.style.display = 'none';
    }
    
    // Close modals
    const modals = [
        'accountSettingsModal',
        'notificationSettingsModal',
        'bookingModal'
    ];
    
    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
        }
    });
}

// ===========================
// EMERGENCY ALERT FUNCTIONALITY
// ===========================

function triggerEmergencyAlert() {
    const lang = appState.currentLanguage;
    const title = lang === 'ms' ? 'Makluman Kecemasan Dihantar' : 'Emergency Alert Sent';
    const message = lang === 'ms' 
        ? 'Penjaga taman akan tiba dalam 10 minit. Kekal di kawasan terbuka.' 
        : 'Park rangers will arrive in 10 minutes. Stay in an open area.';
    
    showToast(title, 'danger');
    showToast(message, 'warning');
    
    console.log('Emergency alert triggered - Rangers notified');
}

// ===========================
// TOAST NOTIFICATIONS
// ===========================

function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('hidden');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ===========================
// UTILITY FUNCTIONS
// ===========================

function saveToLocalStorage() {
    localStorage.setItem('ecoquest_ecopoints', JSON.stringify(appState.ecoPoints));
    localStorage.setItem('ecoquest_history', JSON.stringify(appState.pointsHistory));
    localStorage.setItem('ecoquest_bookings', JSON.stringify(appState.bookings));
}

function loadFromLocalStorage() {
    const savedPoints = localStorage.getItem('ecoquest_ecopoints');
    const savedHistory = localStorage.getItem('ecoquest_history');
    const savedBookings = localStorage.getItem('ecoquest_bookings');
    const savedNotifSettings = localStorage.getItem('ecoquest_notif_settings');
    
    if (savedPoints) appState.ecoPoints = JSON.parse(savedPoints);
    if (savedHistory) appState.pointsHistory = JSON.parse(savedHistory);
    if (savedBookings) appState.bookings = JSON.parse(savedBookings);
    if (savedNotifSettings) appState.notificationSettings = JSON.parse(savedNotifSettings);
}

// ===========================
// INITIALIZATION
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    initializeLanguage();
    initializeLogin();
    
    // Language switcher
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setLanguage(btn.dataset.lang);
        });
    });
    
    // Close account menu when clicking outside
    document.addEventListener('click', (e) => {
        const dropdown = document.getElementById('accountMenuDropdown');
        const btn = document.getElementById('accountMenuBtn');
        if (dropdown && btn && !dropdown.contains(e.target) && !btn.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });
    
    // Load saved data
    loadFromLocalStorage();
});

// Prevent accidental page refresh
window.addEventListener('beforeunload', saveToLocalStorage);