document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const animateOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('stats-grid') || entry.target.closest('.stats')) {
                    startCounters();
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Stagger delays (must run before observer!)
    document.querySelectorAll('.delay-stagger').forEach(container => {
        const items = container.children;
        for (let i = 0; i < items.length; i++) {
            if(!items[i].classList.contains('fade-in-up')) {
                items[i].classList.add('fade-in-up');
            }
            items[i].style.transitionDelay = `${i * 0.1}s`;
        }
    });

    const animateElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .delay-stagger');
    animateElements.forEach(el => animateOnScroll.observe(el));
    // Counter animation
    let countersStarted = false;
    function startCounters() {
        if (countersStarted) return;
        countersStarted = true;
        
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            counter.innerText = '0';
            const target = +counter.getAttribute('data-target');
            
            const updateCounter = () => {
                const c = +counter.innerText;
                const increment = target / 50; 

                if (c < target) {
                    counter.innerText = `${Math.ceil(c + increment)}`;
                    setTimeout(updateCounter, 30);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        });
    }

    // Global carousel logic
    window.scrollCarousel = function(carouselId, direction) {
        const track = document.getElementById(carouselId);
        const cardWidth = track.firstElementChild ? track.firstElementChild.offsetWidth : 320;
        const scrollAmount = cardWidth + 30; // Base width + gap
        track.scrollBy({ left: scrollAmount * direction, behavior: 'smooth' });
    };

    // Add WhatsApp Floating Button
    const waButton = document.createElement('a');
    waButton.href = "https://wa.me/918000027607?text=Hello%2C%20I%20came%20across%20Blue%20City%20Arts%20and%20Adhesives%20and%20I%20am%20interested%20in%20your%20products%20and%20services.%20Please%20share%20more%20details%20about%20your%20furniture%2C%20handicrafts%2C%20and%20adhesive%20solutions.";
    waButton.className = "whatsapp-float";
    waButton.target = "_blank";
    waButton.rel = "noopener noreferrer";
    waButton.innerHTML = `<svg viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.112.551 4.148 1.597 5.955L.044 23.957l6.113-1.604a11.95 11.95 0 005.874 1.53h.005c6.643 0 12.028-5.385 12.028-12.031S18.675 0 12.031 0zm0 21.905h-.005a9.966 9.966 0 01-5.074-1.385l-.364-.216-3.774 1.002.998-3.692-.237-.376A9.97 9.97 0 011.982 12.03c0-5.541 4.512-10.05 10.05-10.05 2.686 0 5.208 1.045 7.105 2.943 1.897 1.898 2.943 4.419 2.943 7.105 0 5.543-4.511 10.05-10.05 10.05zm5.518-7.536c-.302-.152-1.789-.884-2.065-.986-.275-.102-.475-.152-.676.152-.201.302-.779.986-.954 1.189-.176.202-.351.227-.653.076-1.558-.781-2.73-1.397-3.784-2.716-.271-.341.272-.314.856-1.487.05-.101.025-.19-.013-.266-.037-.076-.676-1.625-.926-2.225-.243-.585-.49-.506-.676-.516h-.576c-.201 0-.526.076-.801.379-.276.303-1.052 1.027-1.052 2.503s1.077 2.895 1.228 3.097c.15.202 2.112 3.224 5.118 4.52.718.311 1.279.497 1.714.636.721.23 1.378.197 1.899.119.584-.087 1.789-.731 2.04-1.439.251-.708.251-1.314.176-1.439-.076-.126-.276-.202-.577-.354z"/></svg>`;
    document.body.appendChild(waButton);

    // Mobile Hamburger Menu Injection
    const mobileNavbar = document.querySelector('.navbar');
    if (mobileNavbar) {
        const hamburger = document.createElement('div');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = '<span></span><span></span><span></span>';
        mobileNavbar.insertBefore(hamburger, document.querySelector('.nav-links'));

        const navLinks = document.querySelector('.nav-links');
        
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
});
