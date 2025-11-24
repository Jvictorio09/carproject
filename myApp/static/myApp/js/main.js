// Fixed Header with enhanced animations
const header = document.getElementById('mainHeader');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Intersection Observer for footer animations
const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe footer elements
document.addEventListener('DOMContentLoaded', () => {
    const footerElements = document.querySelectorAll('.footer-col, .social-links a, .footer-bottom');
    footerElements.forEach(el => {
        footerObserver.observe(el);
    });
});

// Booking Tabs
const bookingTabs = document.querySelectorAll('.booking-tabs .tab');
bookingTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        bookingTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    });
});

// FAQ Accordion - Enhanced with smooth animations
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (!question || !answer) return;
        
        const icon = question.querySelector('i');
        
        // Set initial state - answers are hidden
        answer.style.maxHeight = '0';
        answer.style.opacity = '0';
        answer.style.paddingTop = '0';
        answer.style.paddingBottom = '0';
        
        question.addEventListener('click', (e) => {
            e.preventDefault();
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items first
            faqItems.forEach(faq => {
                const faqAnswer = faq.querySelector('.faq-answer');
                const faqIcon = faq.querySelector('.faq-question i');
                if (faqAnswer) {
                    faq.classList.remove('active');
                    faqAnswer.style.maxHeight = '0';
                    faqAnswer.style.opacity = '0';
                    faqAnswer.style.paddingTop = '0';
                    faqAnswer.style.paddingBottom = '0';
                }
                if (faqIcon) {
                    faqIcon.style.transform = 'rotate(0deg)';
                }
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                // Calculate the actual height and show answer
                // First, temporarily show to measure
                answer.style.maxHeight = 'none';
                answer.style.opacity = '1';
                const answerHeight = answer.scrollHeight;
                
                // Now set the proper max-height for animation
                answer.style.maxHeight = '0';
                // Force reflow
                answer.offsetHeight;
                
                // Animate to full height
                answer.style.maxHeight = (answerHeight + 50) + 'px';
                answer.style.opacity = '1';
                answer.style.paddingTop = 'var(--spacing-sm)';
                answer.style.paddingBottom = 'var(--spacing-md)';
                answer.style.overflow = 'visible';
                
                if (icon) {
                    icon.style.transform = 'rotate(180deg)';
                }
                
                // Smooth scroll to question if needed
                setTimeout(() => {
                    const rect = item.getBoundingClientRect();
                    if (rect.bottom > window.innerHeight) {
                        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                }, 100);
            }
        });
        
        // Add hover effect
        question.addEventListener('mouseenter', () => {
            if (!item.classList.contains('active')) {
                question.style.backgroundColor = 'rgba(212, 175, 55, 0.05)';
            }
        });
        
        question.addEventListener('mouseleave', () => {
            if (!item.classList.contains('active')) {
                question.style.backgroundColor = '';
            }
        });
    });
}

// Initialize FAQ when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFAQ);
} else {
    initFAQ();
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#signin' && href !== '#book') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Form Validation and Handling
const bookingForm = document.querySelector('.booking-form');
if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Booking form submitted');
        // You can add AJAX call or redirect logic here
    });
}

const quoteForm = document.querySelector('.quote-form');
if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Quote form submitted');
        // You can add AJAX call or redirect logic here
        alert('Thank you! We will contact you within 2 hours.');
        quoteForm.reset();
    });
}

// Car Card Interactions
const carCards = document.querySelectorAll('.car-card');
carCards.forEach(card => {
    const selectBtn = card.querySelector('.btn-select');
    if (selectBtn) {
        selectBtn.addEventListener('click', () => {
            // Add your car selection logic here
            console.log('Car selected');
            // You can redirect to booking page or open modal
        });
    }
});

// Category Card Interactions
const categoryCards = document.querySelectorAll('.category-card');
categoryCards.forEach(card => {
    card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('category-link')) {
            // Add your category filter logic here
            console.log('Category clicked');
        }
    });
});

// Filter Bar Interactions
const filterGroups = document.querySelectorAll('.filter-group select');
filterGroups.forEach(select => {
    select.addEventListener('change', () => {
        // Add your filter logic here
        console.log('Filter changed');
        // You can filter car cards based on selected filters
    });
});

// Intersection Observer for Animations (Optional)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to sections (optional enhancement)
const animatedSections = document.querySelectorAll('section');
animatedSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Mobile Menu Toggle (if you want to add a mobile menu later)
function initMobileMenu() {
    // This can be expanded if you add a mobile menu
    const navCenter = document.querySelector('.nav-center');
    if (window.innerWidth <= 768 && navCenter) {
        // Add mobile menu logic here if needed
    }
}

window.addEventListener('resize', initMobileMenu);
initMobileMenu();

// ============================================
// CHATBOT FUNCTIONALITY
// ============================================

const chatbotContainer = document.getElementById('chatbotContainer');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotMinimize = document.getElementById('chatbotMinimize');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
const quickQuestionBtns = document.querySelectorAll('.quick-question-btn');

let isChatbotOpen = false;
let isMinimized = false;

// Chatbot responses database
const chatbotResponses = {
    'hello': 'Hello! How can I help you with your car rental today?',
    'hi': 'Hi there! I\'m here to assist you with any questions about our car rental services.',
    'documents': 'To rent a car, you\'ll need a valid driver\'s license (held for at least 1 year), a credit card in your name, and a form of ID (passport or national ID). International licenses are accepted in most locations.',
    'document': 'To rent a car, you\'ll need a valid driver\'s license (held for at least 1 year), a credit card in your name, and a form of ID (passport or national ID). International licenses are accepted in most locations.',
    'what documents do i need': 'To rent a car, you\'ll need a valid driver\'s license (held for at least 1 year), a credit card in your name, and a form of ID (passport or national ID). International licenses are accepted in most locations.',
    'cancellation': 'We offer free cancellation up to 24 hours before pickup. Cancellations within 24 hours may incur a small fee. No-show charges apply if you don\'t show up without canceling.',
    'cancel': 'We offer free cancellation up to 24 hours before pickup. Cancellations within 24 hours may incur a small fee. No-show charges apply if you don\'t show up without canceling.',
    'what is your cancellation policy': 'We offer free cancellation up to 24 hours before pickup. Cancellations within 24 hours may incur a small fee. No-show charges apply if you don\'t show up without canceling.',
    'insurance': 'We offer Basic Coverage (included with every booking) and Full Protection (lowers your excess and covers most damage and theft-related costs). We also provide 24/7 Roadside Assistance for breakdown support, flat tires, and jump-starts.',
    'insure': 'We offer Basic Coverage (included with every booking) and Full Protection (lowers your excess and covers most damage and theft-related costs). We also provide 24/7 Roadside Assistance for breakdown support, flat tires, and jump-starts.',
    'do you offer insurance': 'We offer Basic Coverage (included with every booking) and Full Protection (lowers your excess and covers most damage and theft-related costs). We also provide 24/7 Roadside Assistance for breakdown support, flat tires, and jump-starts.',
    'price': 'Our prices start at $45/day for Economy cars, $75/day for SUVs, $150/day for Luxury cars, and $95/day for Vans. All prices include taxes and transparent pricing with no hidden fees.',
    'pricing': 'Our prices start at $45/day for Economy cars, $75/day for SUVs, $150/day for Luxury cars, and $95/day for Vans. All prices include taxes and transparent pricing with no hidden fees.',
    'cost': 'Our prices start at $45/day for Economy cars, $75/day for SUVs, $150/day for Luxury cars, and $95/day for Vans. All prices include taxes and transparent pricing with no hidden fees.',
    'deposit': 'A security deposit is required at pickup. The amount varies by car type (typically $200-$500) and is fully refundable upon return if no damage or violations are found.',
    'fuel': 'We provide the car with a full tank. You can return it full (no charge) or we\'ll refuel it for you at market rates plus a small service fee.',
    'payment': 'We accept all major credit cards (Visa, Mastercard, Amex) and debit cards. Corporate accounts can be set up with invoicing options.',
    'pay': 'We accept all major credit cards (Visa, Mastercard, Amex) and debit cards. Corporate accounts can be set up with invoicing options.',
    'location': 'We have locations at Dubai International Airport (DXB), Abu Dhabi Downtown, and Manila NAIA Terminal 3. We also offer flexible pickup and drop-off options including airport, hotel, or office delivery.',
    'locations': 'We have locations at Dubai International Airport (DXB), Abu Dhabi Downtown, and Manila NAIA Terminal 3. We also offer flexible pickup and drop-off options including airport, hotel, or office delivery.',
    'where': 'We have locations at Dubai International Airport (DXB), Abu Dhabi Downtown, and Manila NAIA Terminal 3. We also offer flexible pickup and drop-off options including airport, hotel, or office delivery.',
    'contact': 'You can reach our 24/7 support team at +1 (555) 123-4567. We\'re available around the clock to assist you with any questions or concerns.',
    'help': 'I\'m here to help! You can ask me about documents needed, pricing, cancellation policies, insurance options, locations, payment methods, or anything else about our car rental services. You can also call our 24/7 support at +1 (555) 123-4567.',
    'support': 'Our 24/7 support team is always available to help. Call us at +1 (555) 123-4567 or ask me any questions here!',
    'fleet': 'We offer Economy & Compact cars starting at $45/day, Family & SUVs starting at $75/day, Luxury & Executive cars starting at $150/day, and Vans & Group Travel starting at $95/day. All our cars are well-maintained with an average age under 3 years.',
    'cars': 'We offer Economy & Compact cars starting at $45/day, Family & SUVs starting at $75/day, Luxury & Executive cars starting at $150/day, and Vans & Group Travel starting at $95/day. All our cars are well-maintained with an average age under 3 years.',
    'car types': 'We offer Economy & Compact cars starting at $45/day, Family & SUVs starting at $75/day, Luxury & Executive cars starting at $150/day, and Vans & Group Travel starting at $95/day. All our cars are well-maintained with an average age under 3 years.',
    'default': 'I\'m not sure I understand. Could you please rephrase your question? You can ask me about documents, pricing, cancellation policies, insurance, locations, payment methods, or our fleet. For immediate assistance, call our 24/7 support at +1 (555) 123-4567.'
};

// Function to get chatbot response
function getChatbotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase().trim();
    
    // Check for exact matches first
    if (chatbotResponses[lowerMessage]) {
        return chatbotResponses[lowerMessage];
    }
    
    // Check for keyword matches
    for (const [key, response] of Object.entries(chatbotResponses)) {
        if (lowerMessage.includes(key) && key !== 'default') {
            return response;
        }
    }
    
    // Default response
    return chatbotResponses['default'];
}

// Function to add message to chat
function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    const p = document.createElement('p');
    p.textContent = text;
    contentDiv.appendChild(p);
    
    const timeDiv = document.createElement('div');
    timeDiv.className = 'message-time';
    const now = new Date();
    timeDiv.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    messageDiv.appendChild(contentDiv);
    messageDiv.appendChild(timeDiv);
    
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Function to show typing indicator
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = '<span></span><span></span><span></span>';
    chatbotMessages.appendChild(typingDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Function to remove typing indicator
function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Function to send message
function sendMessage() {
    const message = chatbotInput.value.trim();
    if (!message) return;
    
    // Add user message
    addMessage(message, true);
    chatbotInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Simulate bot thinking time
    setTimeout(() => {
        removeTypingIndicator();
        const response = getChatbotResponse(message);
        addMessage(response, false);
    }, 1000 + Math.random() * 1000);
}

// Toggle chatbot window
chatbotToggle.addEventListener('click', () => {
    if (!isChatbotOpen) {
        chatbotWindow.classList.add('active');
        chatbotWindow.classList.remove('minimized');
        isChatbotOpen = true;
        isMinimized = false;
        chatbotInput.focus();
    } else if (isMinimized) {
        chatbotWindow.classList.remove('minimized');
        isMinimized = false;
        chatbotInput.focus();
    }
});

// Minimize chatbot
chatbotMinimize.addEventListener('click', () => {
    chatbotWindow.classList.add('minimized');
    isMinimized = true;
});

// Send message on button click
chatbotSend.addEventListener('click', sendMessage);

// Send message on Enter key
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Quick question buttons
quickQuestionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const question = btn.getAttribute('data-question');
        chatbotInput.value = question;
        sendMessage();
    });
});

// Initialize chatbot (closed by default)
chatbotWindow.classList.remove('active');

// ============================================
// FLOATING MESSAGE
// ============================================

const floatingMessage = document.getElementById('floatingMessage');
let floatingMessageTimeout;

// Function to show floating message
function showFloatingMessage() {
    if (floatingMessage && !isChatbotOpen) {
        floatingMessage.classList.add('show');
        // Auto-hide after 5 seconds
        clearTimeout(floatingMessageTimeout);
        floatingMessageTimeout = setTimeout(() => {
            hideFloatingMessage();
        }, 5000);
    }
}

// Function to hide floating message
function hideFloatingMessage() {
    if (floatingMessage) {
        floatingMessage.classList.remove('show');
    }
}

// Show floating message after page loads (with delay)
setTimeout(() => {
    showFloatingMessage();
}, 2000);

// Show floating message on hover over toggle button
chatbotToggle.addEventListener('mouseenter', () => {
    if (!isChatbotOpen && floatingMessage) {
        showFloatingMessage();
        clearTimeout(floatingMessageTimeout); // Don't auto-hide while hovering
    }
});

// Keep message visible while hovering over toggle or message
chatbotToggle.addEventListener('mouseleave', () => {
    if (!isChatbotOpen && floatingMessage) {
        // Auto-hide after leaving hover area
        floatingMessageTimeout = setTimeout(() => {
            hideFloatingMessage();
        }, 2000);
    }
});

// Hide floating message when chatbot is opened
chatbotToggle.addEventListener('click', () => {
    if (!isChatbotOpen) {
        hideFloatingMessage();
    }
});

// Show floating message again when chatbot is minimized (after delay)
chatbotMinimize.addEventListener('click', () => {
    setTimeout(() => {
        if (isMinimized && !isChatbotOpen) {
            showFloatingMessage();
        }
    }, 1000);
});

// Keep message visible when hovering over it
if (floatingMessage) {
    floatingMessage.addEventListener('mouseenter', () => {
        clearTimeout(floatingMessageTimeout);
    });
    
    floatingMessage.addEventListener('mouseleave', () => {
        if (!isChatbotOpen) {
            floatingMessageTimeout = setTimeout(() => {
                hideFloatingMessage();
            }, 2000);
        }
    });
    
    floatingMessage.addEventListener('click', () => {
        hideFloatingMessage();
        chatbotToggle.click(); // Open chatbot when message is clicked
    });
}

// ============================================
// LANGUAGE SELECTOR
// ============================================

const languageBtn = document.getElementById('languageBtn');
const languageDropdown = document.getElementById('languageDropdown');
const languageSelector = document.querySelector('.language-selector');
const langOptions = document.querySelectorAll('.lang-option');
const currentLangSpan = document.getElementById('currentLang');

// Translation data
const translations = {
    en: {
        'nav.signin': 'Sign In',
        'nav.book': 'Book a Car',
        'nav.fleet': 'Fleet',
        'nav.locations': 'Locations',
        'nav.pricing': 'Pricing',
        'nav.business': 'Business',
        'nav.membership': 'Membership',
        'nav.support': 'Support',
        'hero.title': 'Your car is ready before you land.',
        'hero.subtitle': 'Book from a curated fleet of sedans, SUVs, and luxury cars in minutes — transparent pricing, no surprise fees.',
        'hero.rated': '4.9 ★ Rated by 1,200+ travelers',
        'hero.cities': 'Serving 10+ cities',
        'booking.roundtrip': 'Round Trip',
        'booking.oneway': 'One Way',
        'booking.withdriver': 'With Driver',
        'booking.pickup': 'Pickup Location',
        'booking.dropoff': 'Drop-off Location',
        'booking.pickupdate': 'Pickup Date & Time',
        'booking.returndate': 'Return Date & Time',
        'booking.cartype': 'Car Type',
        'booking.returnsame': 'Return to same location',
        'booking.search': 'Search Cars',
        'booking.nopayment': 'No payment required to reserve • Free cancellation up to 24 hours',
    },
    es: {
        'nav.signin': 'Iniciar Sesión',
        'nav.book': 'Reservar Auto',
        'nav.fleet': 'Flota',
        'nav.locations': 'Ubicaciones',
        'nav.pricing': 'Precios',
        'nav.business': 'Empresas',
        'nav.membership': 'Membresía',
        'nav.support': 'Soporte',
        'hero.title': 'Tu auto está listo antes de aterrizar.',
        'hero.subtitle': 'Reserva de una flota seleccionada de sedanes, SUV y autos de lujo en minutos — precios transparentes, sin tarifas sorpresa.',
        'hero.rated': '4.9 ★ Calificado por más de 1,200 viajeros',
        'hero.cities': 'Sirviendo más de 10 ciudades',
        'booking.roundtrip': 'Viaje Redondo',
        'booking.oneway': 'Solo Ida',
        'booking.withdriver': 'Con Conductor',
        'booking.pickup': 'Lugar de Recogida',
        'booking.dropoff': 'Lugar de Entrega',
        'booking.pickupdate': 'Fecha y Hora de Recogida',
        'booking.returndate': 'Fecha y Hora de Devolución',
        'booking.cartype': 'Tipo de Auto',
        'booking.returnsame': 'Devolver en el mismo lugar',
        'booking.search': 'Buscar Autos',
        'booking.nopayment': 'No se requiere pago para reservar • Cancelación gratuita hasta 24 horas',
    },
    fr: {
        'nav.signin': 'Se Connecter',
        'nav.book': 'Réserver une Voiture',
        'nav.fleet': 'Flotte',
        'nav.locations': 'Emplacements',
        'nav.pricing': 'Tarifs',
        'nav.business': 'Entreprise',
        'nav.membership': 'Adhésion',
        'nav.support': 'Support',
        'hero.title': 'Votre voiture est prête avant votre atterrissage.',
        'hero.subtitle': 'Réservez parmi une flotte sélectionnée de berlines, SUV et voitures de luxe en quelques minutes — tarification transparente, pas de frais cachés.',
        'hero.rated': '4.9 ★ Noté par plus de 1 200 voyageurs',
        'hero.cities': 'Desservant plus de 10 villes',
        'booking.roundtrip': 'Aller-Retour',
        'booking.oneway': 'Aller Simple',
        'booking.withdriver': 'Avec Chauffeur',
        'booking.pickup': 'Lieu de Prise en Charge',
        'booking.dropoff': 'Lieu de Restitution',
        'booking.pickupdate': 'Date et Heure de Prise en Charge',
        'booking.returndate': 'Date et Heure de Restitution',
        'booking.cartype': 'Type de Voiture',
        'booking.returnsame': 'Retour au même endroit',
        'booking.search': 'Rechercher des Voitures',
        'booking.nopayment': 'Aucun paiement requis pour réserver • Annulation gratuite jusqu\'à 24 heures',
    },
    ar: {
        'nav.signin': 'تسجيل الدخول',
        'nav.book': 'احجز سيارة',
        'nav.fleet': 'الأسطول',
        'nav.locations': 'المواقع',
        'nav.pricing': 'الأسعار',
        'nav.business': 'الأعمال',
        'nav.membership': 'العضوية',
        'nav.support': 'الدعم',
        'hero.title': 'سيارتك جاهزة قبل هبوطك.',
        'hero.subtitle': 'احجز من أسطول مختار من السيدان وسيارات الدفع الرباعي والسيارات الفاخرة في دقائق — أسعار شفافة، بدون رسوم مفاجئة.',
        'hero.rated': '4.9 ★ تم التقييم من قبل أكثر من 1,200 مسافر',
        'hero.cities': 'نخدم أكثر من 10 مدن',
        'booking.roundtrip': 'ذهاب وعودة',
        'booking.oneway': 'ذهاب فقط',
        'booking.withdriver': 'مع سائق',
        'booking.pickup': 'مكان الاستلام',
        'booking.dropoff': 'مكان التسليم',
        'booking.pickupdate': 'تاريخ ووقت الاستلام',
        'booking.returndate': 'تاريخ ووقت التسليم',
        'booking.cartype': 'نوع السيارة',
        'booking.returnsame': 'العودة إلى نفس المكان',
        'booking.search': 'البحث عن السيارات',
        'booking.nopayment': 'لا يلزم الدفع للاحتياط • إلغاء مجاني حتى 24 ساعة',
    },
    zh: {
        'nav.signin': '登录',
        'nav.book': '预订汽车',
        'nav.fleet': '车队',
        'nav.locations': '地点',
        'nav.pricing': '价格',
        'nav.business': '商务',
        'nav.membership': '会员',
        'nav.support': '支持',
        'hero.title': '您的汽车在您落地前就准备好了。',
        'hero.subtitle': '在几分钟内从精选的轿车、SUV和豪华车车队中预订 — 价格透明，无隐藏费用。',
        'hero.rated': '4.9 ★ 由1,200多名旅行者评分',
        'hero.cities': '服务10多个城市',
        'booking.roundtrip': '往返',
        'booking.oneway': '单程',
        'booking.withdriver': '带司机',
        'booking.pickup': '取车地点',
        'booking.dropoff': '还车地点',
        'booking.pickupdate': '取车日期和时间',
        'booking.returndate': '还车日期和时间',
        'booking.cartype': '车型',
        'booking.returnsame': '还到同一地点',
        'booking.search': '搜索汽车',
        'booking.nopayment': '预订无需付款 • 24小时内免费取消',
    },
    hi: {
        'nav.signin': 'साइन इन',
        'nav.book': 'कार बुक करें',
        'nav.fleet': 'बेड़ा',
        'nav.locations': 'स्थान',
        'nav.pricing': 'मूल्य निर्धारण',
        'nav.business': 'व्यापार',
        'nav.membership': 'सदस्यता',
        'nav.support': 'सहायता',
        'hero.title': 'आपकी कार आपके उतरने से पहले तैयार है।',
        'hero.subtitle': 'मिनटों में सेडान, SUV और लक्जरी कारों के चयनित बेड़े से बुक करें — पारदर्शी मूल्य निर्धारण, कोई आश्चर्यजनक शुल्क नहीं।',
        'hero.rated': '4.9 ★ 1,200+ यात्रियों द्वारा रेटेड',
        'hero.cities': '10+ शहरों में सेवा',
        'booking.roundtrip': 'राउंड ट्रिप',
        'booking.oneway': 'वन वे',
        'booking.withdriver': 'ड्राइवर के साथ',
        'booking.pickup': 'पिकअप स्थान',
        'booking.dropoff': 'ड्रॉप-ऑफ स्थान',
        'booking.pickupdate': 'पिकअप दिनांक और समय',
        'booking.returndate': 'वापसी दिनांक और समय',
        'booking.cartype': 'कार प्रकार',
        'booking.returnsame': 'उसी स्थान पर वापसी',
        'booking.search': 'कारें खोजें',
        'booking.nopayment': 'आरक्षण के लिए कोई भुगतान आवश्यक नहीं • 24 घंटे तक मुफ्त रद्दीकरण',
    },
    de: {
        'nav.signin': 'Anmelden',
        'nav.book': 'Auto Buchen',
        'nav.fleet': 'Flotte',
        'nav.locations': 'Standorte',
        'nav.pricing': 'Preise',
        'nav.business': 'Geschäft',
        'nav.membership': 'Mitgliedschaft',
        'nav.support': 'Support',
        'hero.title': 'Ihr Auto ist bereit, bevor Sie landen.',
        'hero.subtitle': 'Buchen Sie in Minuten aus einer kuratierten Flotte von Limousinen, SUVs und Luxusautos — transparente Preise, keine versteckten Gebühren.',
        'hero.rated': '4.9 ★ Bewertet von über 1.200 Reisenden',
        'hero.cities': 'Bedienen von über 10 Städten',
        'booking.roundtrip': 'Hin- und Rückfahrt',
        'booking.oneway': 'Einweg',
        'booking.withdriver': 'Mit Fahrer',
        'booking.pickup': 'Abholort',
        'booking.dropoff': 'Rückgabeort',
        'booking.pickupdate': 'Abholdatum und -zeit',
        'booking.returndate': 'Rückgabedatum und -zeit',
        'booking.cartype': 'Fahrzeugtyp',
        'booking.returnsame': 'Rückgabe am selben Ort',
        'booking.search': 'Autos Suchen',
        'booking.nopayment': 'Keine Zahlung erforderlich zur Reservierung • Kostenlose Stornierung bis 24 Stunden',
    },
    ja: {
        'nav.signin': 'サインイン',
        'nav.book': '車を予約',
        'nav.fleet': 'フリート',
        'nav.locations': '場所',
        'nav.pricing': '料金',
        'nav.business': 'ビジネス',
        'nav.membership': 'メンバーシップ',
        'nav.support': 'サポート',
        'hero.title': 'あなたの車は着陸前に準備ができています。',
        'hero.subtitle': '分単位でセダン、SUV、高級車の厳選されたフリートから予約 — 透明な価格設定、予期しない料金なし。',
        'hero.rated': '4.9 ★ 1,200人以上の旅行者によって評価',
        'hero.cities': '10以上の都市でサービス提供',
        'booking.roundtrip': '往復',
        'booking.oneway': '片道',
        'booking.withdriver': 'ドライバー付き',
        'booking.pickup': '受取場所',
        'booking.dropoff': '返却場所',
        'booking.pickupdate': '受取日時',
        'booking.returndate': '返却日時',
        'booking.cartype': '車種',
        'booking.returnsame': '同じ場所に返却',
        'booking.search': '車を検索',
        'booking.nopayment': '予約に支払いは不要 • 24時間まで無料キャンセル',
    }
};

// Current language
let currentLang = localStorage.getItem('selectedLanguage') || 'en';

// Function to translate text
function translate(key) {
    return translations[currentLang]?.[key] || translations['en'][key] || key;
}

// Function to apply translations
function applyTranslations() {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = translate(key);
        if (element.tagName === 'INPUT' && element.type !== 'submit') {
            element.placeholder = translation;
        } else {
            element.textContent = translation;
        }
    });
    
    // Update current language display
    if (currentLangSpan) {
        const langCodes = {
            'en': 'EN',
            'es': 'ES',
            'fr': 'FR',
            'ar': 'AR',
            'zh': 'ZH',
            'hi': 'HI',
            'de': 'DE',
            'ja': 'JA'
        };
        currentLangSpan.textContent = langCodes[currentLang] || 'EN';
    }
    
    // Update active language option
    langOptions.forEach(option => {
        option.classList.remove('active');
        if (option.getAttribute('data-lang') === currentLang) {
            option.classList.add('active');
        }
    });
    
    // Set RTL for Arabic
    if (currentLang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
    }
}

// Toggle language dropdown
if (languageBtn && languageDropdown) {
    languageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        languageSelector.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!languageSelector.contains(e.target)) {
            languageSelector.classList.remove('active');
        }
    });
    
    // Handle language selection
    langOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const selectedLang = option.getAttribute('data-lang');
            currentLang = selectedLang;
            localStorage.setItem('selectedLanguage', selectedLang);
            applyTranslations();
            languageSelector.classList.remove('active');
        });
    });
}

// Initialize translations on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyTranslations);
} else {
    applyTranslations();
}


