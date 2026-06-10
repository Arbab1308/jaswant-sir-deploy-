document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    // ─── HAMBURGER MENU TOGGLE ───
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            navLinks.classList.toggle('mobile-open');
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                navLinks.classList.remove('mobile-open');
            });
        });
    }

    let lenis = null;
    const lenisProfile = document.body.dataset.lenisProfile;

    // ─── Lenis Smooth Scroll ───
    if (window.Lenis) {
        const lenisOptions = {
            duration: 1.5, // Slightly faster for responsiveness
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        };

        if (lenisProfile === "buttery") {
            Object.assign(lenisOptions, {
                duration: 4.8,
                lerp: 0.035,
                wheelMultiplier: 0.42,
                touchMultiplier: 0.9,
                smoothTouch: true,
                syncTouch: true,
                syncTouchLerp: 0.03,
            });
        }

        lenis = new Lenis(lenisOptions);

        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
    }

    function refreshScrollLayout() {
        if (lenis && typeof lenis.resize === "function") {
            lenis.resize();
        }
        ScrollTrigger.refresh();
    }

    window.addEventListener("resize", refreshScrollLayout);

    // ─── SCROLL ANIMATIONS ───
    function initScrollAnimations() {

        // 1. HERO PARALLAX
        const heroSection = document.querySelector(".hero-section");
        const heroBg = document.querySelector(".hero-image-bg");
        const heroContent = document.querySelector(".hero-content-center");
        
        if (heroSection && heroBg && heroContent) {
            // Background scrolls slower (moves down slightly relative to container)
            gsap.to(heroBg, {
                yPercent: 15,
                ease: "none",
                scrollTrigger: {
                    trigger: heroSection,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
            
            // Text scrolls faster (moves up slightly relative to container)
            gsap.to(heroContent, {
                yPercent: 20,
                ease: "none",
                scrollTrigger: {
                    trigger: heroSection,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

            // Hero Folding effect (Scale down and add border radius)
            gsap.to(heroSection, {
                scale: 0.92,
                borderRadius: "30px",
                ease: "none",
                scrollTrigger: {
                    trigger: heroSection,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                    pin: true,
                    pinSpacing: false
                }
            });
        }


        // 3. FOUNDER PARALLAX — image shifts vertically as you scroll
        const founderWrap = document.querySelector(".founder-parallax-wrap");
        if (founderWrap) {
            gsap.fromTo(".founder-parallax-wrap", {
                yPercent: -25,
            }, {
                yPercent: 15,
                ease: "none",
                scrollTrigger: {
                    trigger: ".founder-section",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                }
            });
        }

        // 4. PORTFOLIO PARALLAX
        const portfolioImg = document.querySelector(".portfolio-bg-img");
        if (portfolioImg) {
            gsap.fromTo(".portfolio-bg-img", {
                yPercent: -10,
            }, {
                yPercent: 10,
                ease: "none",
                scrollTrigger: {
                    trigger: ".portfolio-intro",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                }
            });
        }

        // 5. ABOUT FOUNDER HERO PARALLAX (Enabled)
        const aboutHero = document.querySelector(".about-founder-hero");
        if (aboutHero) {
            gsap.to(".about-founder-hero .hero-bg-wrapper", {
                yPercent: 15,
                ease: "none",
                scrollTrigger: {
                    trigger: ".about-founder-hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
            
            gsap.to(".about-founder-hero .hero-content-left", {
                yPercent: 25,
                ease: "none",
                scrollTrigger: {
                    trigger: ".about-founder-hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
        }

        // 7. ABOUT ME TEXT REVEAL & STACKING (GRID BASED)
        const revealText = document.querySelector("#reveal-text");
        const helloSection = document.querySelector(".hello-section");
        const helloPanel = document.querySelector(".hello-panel");
        const stackWrapper = document.querySelector(".about-hello-stack");
        
        if (revealText && helloSection && helloPanel && stackWrapper) {
            const text = revealText.textContent;
            revealText.innerHTML = text.split("").map(char => `<span>${char}</span>`).join("");
            const chars = revealText.querySelectorAll("span");
            
            // Pin the entire grid wrapper so both sections stay on screen
            gsap.timeline({
                scrollTrigger: {
                    trigger: ".about-hello-stack",
                    start: "top top",
                    end: "+=500%", // Extended height of the wrapper
                    scrub: 1,
                    pin: true,
                    invalidateOnRefresh: true,
                }
            })
            // Phase 1: Text color reveal (0% to 65% of timeline)
            .to(chars, {
                color: "#fff",
                stagger: { amount: 6.5 },
                ease: "none",
                duration: 0.1
            })
            // Phase 2: Brief hold (65% to 75%)
            .to({}, { duration: 0.9 })
            // Phase 3: Zoom out about text and slide up hello section (75% to 100%)
            .to(".about-me-textual", {
                scale: 0.75,
                opacity: 0.2, // Fade it out more
                borderRadius: "44px",
                ease: "power2.inOut",
                duration: 3.5
            }, "stack")
            // Bring the entire hello-section up from exactly below the screen
            .fromTo(".hello-section", {
                y: "120vh" // Start slightly further down relative to the 120vh height
            }, {
                y: "0vh",
                ease: "power2.inOut",
                duration: 3.5
            }, "stack")
            // Optional: Extra parallax on the panel itself as it comes up
            .fromTo(helloPanel, {
                yPercent: 15,
            }, {
                yPercent: 0,
                ease: "power2.inOut",
                duration: 3.5
            }, "stack");
        } else if (revealText) {
            const text = revealText.textContent;
            revealText.innerHTML = text.split("").map(char => `<span>${char}</span>`).join("");
            const chars = revealText.querySelectorAll("span");
            
            gsap.timeline({
                scrollTrigger: {
                    trigger: ".about-me-textual",
                    start: "top top",
                    end: "+=200%", 
                    scrub: 1,
                    pin: true,
                    invalidateOnRefresh: true,
                }
            })
            .to(chars, {
                color: "#fff",
                stagger: 0.1,
                ease: "none"
            });
        }
        // 8. HELLO SECTION SLIDESHOW
        (function initHelloSlideshow() {
            const slides = document.querySelectorAll(".hello-slideshow .slide");
            if (!slides || slides.length === 0) return;
            
            let currentIndex = 0;
            const intervalTime = 5000; // 5 seconds

            setInterval(() => {
                // Remove active class from current
                slides[currentIndex].classList.remove("active");
                
                // Increment and wrap around
                currentIndex = (currentIndex + 1) % slides.length;
                
                // Add active class to new
                slides[currentIndex].classList.add("active");
            }, intervalTime);
        })();

        // 9. VALUES SECTION STACKING CARDS
        const valuesSection = document.querySelector(".values-section");
        const cardsContainer = document.querySelector(".cards-container");
        const valueCards = document.querySelectorAll(".value-card");
        const valuesTitle = document.querySelector(".values-h2");
        
        if (valuesSection && cardsContainer && valueCards.length > 0 && valuesTitle) {
            
            // 9a. Pin the title alone so it stays on top while cards scroll up
            ScrollTrigger.create({
                trigger: valuesTitle,
                start: "top 15%",
                endTrigger: valuesSection, 
                end: "bottom center", // Unpin when section completes
                pin: true,
                pinSpacing: false,
                invalidateOnRefresh: true,
            });

            // 9b. Pin and rotate each card
            valueCards.forEach((card, index) => {
                // Pin the card strictly in the center of the screen
                ScrollTrigger.create({
                    trigger: card,
                    start: "center center",
                    endTrigger: valuesSection, // Everything unpins exactly at the same time
                    end: "bottom center", 
                    pin: true,
                    pinSpacing: false,
                    invalidateOnRefresh: true,
                });

                // Alternate rotation direction: even index tilts right, odd index tilts left
                const rotationTarget = index % 2 === 0 ? 5 : -5;

                // Animate rotation as it arrives
                gsap.fromTo(card, {
                    rotation: 0
                }, {
                    rotation: rotationTarget,
                    ease: "none",
                    scrollTrigger: {
                        trigger: card,
                        start: "top bottom", // Start rotating as soon as it enters screen bottom
                        end: "center center", // Finish rotating exactly when it hits the center pin
                        scrub: 1,
                        invalidateOnRefresh: true,
                    }
                });
            });
        }
    }

    initScrollAnimations();

    // Refresh layout on load
    window.addEventListener("load", () => {
        ScrollTrigger.refresh();
        if (lenis) lenis.resize();
    });
    // ─── NOISE GRAIN OVERLAY ───
    function initNoise(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        const canvasSize = 512;
        const patternAlpha = 15;
        const refreshInterval = 2;
        let frame = 0;

        canvas.width = canvasSize;
        canvas.height = canvasSize;

        function drawGrain() {
            const imageData = ctx.createImageData(canvasSize, canvasSize);
            const data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
                const value = Math.random() * 255;
                data[i] = value;
                data[i + 1] = value;
                data[i + 2] = value;
                data[i + 3] = patternAlpha;
            }
            ctx.putImageData(imageData, 0, 0);
        }

        function noiseLoop() {
            if (frame % refreshInterval === 0) {
                drawGrain();
            }
            frame++;
            requestAnimationFrame(noiseLoop);
        }

        noiseLoop();
    }

    initNoise("noiseCanvas");
    initNoise("founderNoiseCanvas");
    initNoise("portfolioNoiseCanvas");

    // ─── PORTFOLIO YOUTUBE HOVER PLAY ───
    const portfolioCards = document.querySelectorAll(".portfolio-card");
    const players = {};

    // Load YouTube API
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = function() {
        portfolioCards.forEach((card, index) => {
            const videoId = card.getAttribute("data-video-id");
            const playerId = `player-${index + 1}`;
            
            players[playerId] = new YT.Player(playerId, {
                height: '100%',
                width: '100%',
                videoId: videoId,
                playerVars: {
                    'autoplay': 0,
                    'controls': 0,
                    'showinfo': 0,
                    'rel': 0,
                    'modestbranding': 1,
                    'loop': 1,
                    'mute': 1, // Must be muted for mobile/browser autoplay policies
                    'playlist': videoId
                },
                events: {
                    'onReady': (event) => {
                        // Player is ready
                    }
                }
            });

            card.addEventListener("mouseenter", () => {
                if (players[playerId] && typeof players[playerId].playVideo === "function") {
                    players[playerId].playVideo();
                }
            });

            card.addEventListener("mouseleave", () => {
                if (players[playerId] && typeof players[playerId].pauseVideo === "function") {
                    players[playerId].pauseVideo();
                    // Optional: reset to start
                    // players[playerId].seekTo(0);
                }
            });
        });
    };

    // ─── SOCIAL MEDIA REELS: STATIC GRID ───
    (function initReels() {
        const grid = document.getElementById('reelsGrid');
        if (!grid) return;

        // Ensure all reel videos are strictly muted on load
        grid.querySelectorAll('video').forEach(v => {
            v.muted = true;
        });
    })();

    // ─── SERVICES PARALLAX ───
    (function initServicesParallax() {
        const items = document.querySelectorAll('.service-item');
        
        items.forEach(item => {
            const bg = item.querySelector('.service-bg');
            
            item.addEventListener('mousemove', (e) => {
                const rect = item.getBoundingClientRect();
                const y = e.clientY - rect.top; // pixel y from top of item
                const percent = y / rect.height; // 0 to 1
                
                const moveRange = 60; 
                const offset = (percent * moveRange) - (moveRange / 2);
                
                bg.style.transform = `translateY(${offset}px)`;
            });

            item.addEventListener('mouseleave', () => {
                bg.style.transform = `translateY(0px)`;
            });
        });
    })();

    // ─── CAMERA MASCOT TRACKING ───
    (function initCameraMascot() {
        const mascot = document.getElementById('cameraMascot');
        if (!mascot) return;

        const leftPupil  = document.getElementById('pupilLeft');
        const rightPupil = document.getElementById('pupilRight');
        
        // Limits how far the pupils can move from center (reduced for logo size)
        const maxMove = 5; 

        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            [leftPupil, rightPupil].forEach(pupil => {
                const rect = pupil.getBoundingClientRect();
                const eyeCenterX = rect.left + rect.width / 2;
                const eyeCenterY = rect.top + rect.height / 2;

                const angle = Math.atan2(mouseY - eyeCenterY, mouseX - eyeCenterX);
                
                // Calculate distance but cap it
                const dist = Math.min(maxMove, Math.hypot(mouseX - eyeCenterX, mouseY - eyeCenterY) / 10);
                
                const moveX = Math.cos(angle) * dist;
                const moveY = Math.sin(angle) * dist;

                pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
    })();

    // ─── TESTIMONIALS SLIDER ───
    function initTestimonialsSlider() {
        const cards = document.querySelectorAll('.testimonial-card');
        const prevBtn = document.getElementById('prevTestimonial');
        const nextBtn = document.getElementById('nextTestimonial');
        
        if (!cards.length || !prevBtn || !nextBtn) return;

        let currentIndex = 0;

        function updateSlider() {
            cards.forEach((card, index) => {
                card.classList.remove('active', 'prev', 'next');
                
                if (index === currentIndex) {
                    card.classList.add('active');
                } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
                    card.classList.add('prev');
                } else if (index === (currentIndex + 1) % cards.length) {
                    card.classList.add('next');
                }
            });
        }

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % cards.length;
            updateSlider();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            updateSlider();
        });

        // Initialize first state
        updateSlider();
    }

    initTestimonialsSlider();

    // ─── CAPSULE CAROUSEL (SHRINK/EXPAND) ───
    (function initCapsuleCarousel() {
        const track = document.getElementById('carouselTrack');
        const carousel = document.getElementById('capsuleCarousel');
        if (!track || !carousel) return;

        // Clone items for seamless loop
        const items = [...track.children];
        items.forEach(item => {
            const clone = item.cloneNode(true);
            track.appendChild(clone);
        });

        const totalWidth = track.scrollWidth;
        const speed = 1.2; // Pixels per frame approx
        let xPos = 0;

        function animate() {
            xPos -= speed;
            
            // If we've scrolled past the first set of items, reset to 0
            if (Math.abs(xPos) >= totalWidth / 2) {
                xPos = 0;
            }

            track.style.transform = `translateX(${xPos}px)`;

            // Handle shrink/expand behavior during slide
            // We want alternate items to be expanded/shrunk regardless of position,
            // OR we can make it purely based on their index in the track.
            // The user said: "alternate photo are fully visible while others are shrinked... expand while it slides"
            // Let's toggle classes based on a timer or distance to make it feel alive.
            
            requestAnimationFrame(animate);
        }

        // Timer to swap shrink/expand states every 3 seconds for dynamic feel
        setInterval(() => {
            const allItems = track.querySelectorAll('.carousel-item');
            allItems.forEach(item => {
                item.classList.toggle('shrink');
            });
        }, 3000);

        animate();
    })();

    // --- Vertical Brands Carousel ---
    (function initBrandsCarousel() {
        const columns = document.querySelectorAll('.logo-column');
        
        columns.forEach((col, index) => {
            const track = col.querySelector('.logo-track');
            const direction = col.dataset.direction;
            const logoItems = track.querySelectorAll('.logo-item');
            const itemHeight = 60 + 60; // height + gap
            const totalHeight = logoItems.length * itemHeight;

            // Simple loop animation using GSAP
            gsap.to(track, {
                y: direction === 'up' ? `-=${totalHeight / 2}` : `+=${totalHeight / 2}`,
                duration: 15 + (index * 2), // Slightly different speeds
                ease: "none",
                repeat: -1,
                onRepeat: () => {
                    // Reset position manually if needed for perfectly seamless, 
                    // though GSAP's repeat with relative values handles most of it.
                },
                modifiers: {
                    y: gsap.utils.unitize(y => {
                        const val = parseFloat(y);
                        const limit = totalHeight / 2;
                        if (direction === 'up') {
                            return val % limit;
                        } else {
                            // For down direction, we shift everything and use modulo
                            return ((val % limit) - limit) % limit;
                        }
                    })
                }
            });
        });
    })();

    // --- How We Work Inverse Parallax ---
    (function initWorkParallax() {
        const container = document.querySelector('.work-process-container');
        const img = document.querySelector('.parallax-img');
        
        if (!container || !img) return;

        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const mouseY = e.clientY - rect.top;
            const percentY = mouseY / rect.height; // 0 to 1
            
            // Inverse parallax logic:
            // Mouse at top (0) -> Move image DOWN (push it down)
            // Mouse at bottom (1) -> Move image UP (pull it up)
            // Range: -10% to +10%
            const moveY = (percentY - 0.5) * -20; // Results in -10 to +10
            
            gsap.to(img, {
                yPercent: moveY,
                duration: 0.8,
                ease: "power2.out"
            });
        });

        container.addEventListener('mouseleave', () => {
            gsap.to(img, {
                yPercent: 0,
                duration: 1,
                ease: "power2.out"
            });
        });
    })();

    // --- Service Page Transitions ---
    (function initServiceTransitions() {
        const serviceLinks = document.querySelectorAll('.service-item-link');
        if (serviceLinks.length === 0 && !document.body.classList.contains('service-page')) return;

        serviceLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetUrl = link.getAttribute('href');
                const card = link.querySelector('.service-item');
                const bg = card.querySelector('.service-bg');
                
                if (!card || !bg) {
                    window.location.href = targetUrl;
                    return;
                }

                // Get card position
                const rect = card.getBoundingClientRect();
                
                // Create a temporary expansion element
                const expander = document.createElement('div');
                expander.style.position = 'fixed';
                expander.style.top = `${rect.top}px`;
                expander.style.left = `${rect.left}px`;
                expander.style.width = `${rect.width}px`;
                expander.style.height = `${rect.height}px`;
                expander.style.background = 'black';
                expander.style.backgroundImage = getComputedStyle(bg).backgroundImage;
                expander.style.backgroundSize = 'cover';
                expander.style.backgroundPosition = 'center';
                expander.style.zIndex = '1000000';
                expander.style.borderRadius = '0px';
                document.body.appendChild(expander);

                // Animate expansion
                gsap.to(expander, {
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    duration: 0.8,
                    ease: "power4.inOut",
                    onComplete: () => {
                        window.location.href = targetUrl;
                    }
                });

                // Fade out current content
                gsap.to('.main-content-wrapper, .top-nav', {
                    opacity: 0,
                    duration: 0.4
                });
            });
        });

        // Handle page load transition (fade in)
        if (document.body.classList.contains('service-page')) {
            // Ensure content is visible initially (in case of browser back/cache)
            gsap.set('.service-hero-img-wrap, .service-hero-title', { opacity: 0 });
            
            gsap.to('.service-hero-img-wrap', {
                scale: 1,
                opacity: 1,
                duration: 1.5,
                ease: "power3.out",
                startAt: { scale: 1.2 }
            });
            gsap.to('.service-hero-title', {
                y: 0,
                opacity: 0.95, // Target opacity from CSS
                duration: 1.2,
                delay: 0.4,
                ease: "power4.out",
                startAt: { y: 100 }
            });
        }
    })();
});


