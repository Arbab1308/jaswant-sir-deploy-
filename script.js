document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  // ─── HAMBURGER MENU TOGGLE ───
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const navLinks = document.querySelector(".nav-links");

  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener("click", () => {
      hamburgerBtn.classList.toggle("active");
      navLinks.classList.toggle("mobile-open");
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        hamburgerBtn.classList.remove("active");
        navLinks.classList.remove("mobile-open");
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
      orientation: "vertical",
      gestureOrientation: "vertical",
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

    // Smooth scroll for anchor links using Lenis
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (href === "#") return;

        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement, {
            duration: 2.2, // 2.2 seconds for a very smooth transition to the bottom
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }
      });
    });
  }

  function refreshScrollLayout() {
    if (lenis && typeof lenis.resize === "function") {
      lenis.resize();
    }
    ScrollTrigger.refresh();
  }

  window.addEventListener("resize", refreshScrollLayout);

  // ─── SMART NAVBAR (HIDE ON SCROLL DOWN, SHOW ON SCROLL UP) ───
  (function initSmartNavbar() {
    const topNav = document.querySelector(".top-nav");
    if (!topNav) return;

    let lastScrollY = window.scrollY || window.pageYOffset || 0;
    const scrollThreshold = 10; // minimum scroll delta to avoid jitter

    function handleNavScroll(currentScrollY) {
      // If mobile menu is open, don't hide navbar
      const isMobileMenuOpen = document.querySelector(".nav-links.mobile-open");
      if (isMobileMenuOpen) {
        topNav.classList.remove("nav-hidden");
        lastScrollY = currentScrollY;
        return;
      }

      // If at the very top of the page, always show navbar
      if (currentScrollY <= 60) {
        topNav.classList.remove("nav-hidden");
        lastScrollY = currentScrollY;
        return;
      }

      // Check difference
      if (Math.abs(currentScrollY - lastScrollY) < scrollThreshold) {
        return;
      }

      if (currentScrollY > lastScrollY) {
        // Scrolling down -> hide navbar
        topNav.classList.add("nav-hidden");
      } else {
        // Scrolling up -> show navbar
        topNav.classList.remove("nav-hidden");
      }

      lastScrollY = currentScrollY;
    }

    let ticking = false;
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            handleNavScroll(window.scrollY || window.pageYOffset || 0);
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true }
    );

    if (lenis) {
      let lenisTicking = false;
      lenis.on("scroll", (e) => {
        if (!lenisTicking) {
          window.requestAnimationFrame(() => {
            handleNavScroll(e.scroll || window.scrollY || 0);
            lenisTicking = false;
          });
          lenisTicking = true;
        }
      });
    }
  })();

  // ─── SCROLL ANIMATIONS ───
  function initScrollAnimations() {
    const isMobile = window.innerWidth <= 768;

    // 1. HERO PARALLAX & SCROLL-TELLING (DESKTOP ONLY)
    const heroSection = document.querySelector(".hero-section");
    const canvas = document.getElementById("hero-canvas");
    const heroContent = document.querySelector(".hero-content-center, .hero-content-left");
    const heroServices = document.querySelector(".hero-services-showcase");
    const isHeroMobile = window.innerWidth <= 992;

    if (heroSection && !isHeroMobile) {
      if (canvas) {
        // Desktop Scroll-telling Image Sequence
        const ctx = canvas.getContext("2d");
        const frameCount = 125;
        const images = [];

        const getFrameUrl = (idx) => `assets/hero-frames/ezgif-frame-${String(idx).padStart(3, '0')}.jpg`;

        // Load first frame immediately
        const firstImg = new Image();
        firstImg.src = getFrameUrl(1);
        firstImg.onload = () => {
          images[0] = firstImg;
          drawFrame(1);
        };

        // Load remaining frames in background
        for (let i = 2; i <= frameCount; i++) {
          const img = new Image();
          img.src = getFrameUrl(i);
          img.onload = () => {
            images[i - 1] = img;
          };
        }

        function drawFrame(frameIndex) {
          const img = images[frameIndex - 1] || firstImg;
          if (!img || !img.complete) return;

          const canvasWidth = canvas.width = window.innerWidth;
          const canvasHeight = canvas.height = window.innerHeight;

          const imgRatio = img.width / img.height;
          const canvasRatio = canvasWidth / canvasHeight;

          let drawWidth, drawHeight, offsetX, offsetY;

          if (canvasRatio > imgRatio) {
            drawWidth = canvasWidth;
            drawHeight = canvasWidth / imgRatio;
            offsetX = 0;
            offsetY = (canvasHeight - drawHeight) / 2;
          } else {
            drawWidth = canvasHeight * imgRatio;
            drawHeight = canvasHeight;
            offsetX = (canvasWidth - drawWidth) / 2;
            offsetY = 0;
          }

          ctx.clearRect(0, 0, canvasWidth, canvasHeight);
          ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        }

        // Unified ScrollTrigger for folding & scroll-telling
        let triggerInstance = null;
        const mainAnim = gsap.to(heroSection, {
          scale: 0.92,
          borderRadius: "30px",
          ease: "none",
          scrollTrigger: {
            trigger: heroSection,
            start: "top top",
            end: "+=120%",
            scrub: true,
            pin: true,
            anticipatePin: 1,
            onUpdate: self => {
              const frameIndex = Math.max(1, Math.min(frameCount, Math.floor(self.progress * (frameCount - 1)) + 1));
              drawFrame(frameIndex);
            }
          }
        });
        triggerInstance = mainAnim.scrollTrigger;

        // Fade out text content
        if (heroContent || heroServices) {
          gsap.to([heroContent, heroServices].filter(Boolean), {
            opacity: 0,
            y: -50,
            ease: "none",
            scrollTrigger: {
              trigger: heroSection,
              start: "top top",
              end: "+=60%",
              scrub: true
            }
          });
        }

        window.addEventListener("resize", () => {
          const progress = triggerInstance ? triggerInstance.progress : 0;
          const frameIndex = Math.max(1, Math.min(frameCount, Math.floor(progress * (frameCount - 1)) + 1));
          drawFrame(frameIndex);
        });
      } else {
        // Fallback for pages that have hero section without the canvas
        const heroBg = document.querySelector(".hero-image-bg, .hero-video-bg");
        if (heroBg && heroContent) {
          gsap.to(heroBg, {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
              trigger: heroSection,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });

          gsap.to(heroContent, {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
              trigger: heroSection,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });

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
              pinSpacing: false,
            },
          });
        }
      }
    }

    // 3. FOUNDER PARALLAX — image shifts vertically as you scroll
    const founderWrap = document.querySelector(".founder-parallax-wrap");
    if (founderWrap && !isMobile) {
      gsap.fromTo(
        ".founder-parallax-wrap",
        {
          yPercent: -3,
        },
        {
          yPercent: 3,
          ease: "none",
          scrollTrigger: {
            trigger: ".founder-section",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }

    // 4. PORTFOLIO PARALLAX
    const portfolioImg = document.querySelector(".portfolio-bg-img");
    if (portfolioImg && !isMobile) {
      gsap.fromTo(
        ".portfolio-bg-img",
        {
          yPercent: -10,
        },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: ".portfolio-intro",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }

    // 4b. PORTFOLIO TRANSITION TEXT FADE IN
    const transitionContainer = document.querySelector(".transition-text-container");
    if (transitionContainer) {
      gsap.to(".transition-text-container", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".portfolio-transition-text",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
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
          scrub: true,
        },
      });

      gsap.to(".about-founder-hero .hero-content-left", {
        yPercent: 25,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-founder-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // 7. ABOUT ME TEXT REVEAL & STACKING (GRID BASED)
    const revealText = document.querySelector("#reveal-text");
    const helloSection = document.querySelector(".hello-section");
    const helloPanel = document.querySelector(".hello-panel");
    const stackWrapper = document.querySelector(".about-hello-stack");

    if (revealText && helloSection && helloPanel && stackWrapper) {
      const text = revealText.textContent;
      revealText.innerHTML = text
        .split("")
        .map((char) => `<span>${char}</span>`)
        .join("");
      const chars = revealText.querySelectorAll("span");

      // Pin the entire grid wrapper so both sections stay on screen
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".about-hello-stack",
            start: "top top",
            end: "+=500%", // Extended height of the wrapper
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        })
        // Phase 1: Text color reveal (0% to 65% of timeline)
        .to(chars, {
          color: "#fff",
          stagger: { amount: 6.5 },
          ease: "none",
          duration: 0.1,
        })
        // Phase 2: Brief hold (65% to 75%)
        .to({}, { duration: 0.9 })
        // Phase 3: Zoom out about text and slide up hello section (75% to 100%)
        .to(
          ".about-me-textual",
          {
            scale: 0.75,
            opacity: 0.2, // Fade it out more
            borderRadius: "44px",
            ease: "power2.inOut",
            duration: 3.5,
          },
          "stack",
        )
        // Bring the entire hello-section up from exactly below the screen
        .fromTo(
          ".hello-section",
          {
            y: "120vh", // Start slightly further down relative to the 120vh height
          },
          {
            y: "0vh",
            ease: "power2.inOut",
            duration: 3.5,
          },
          "stack",
        )
        // Optional: Extra parallax on the panel itself as it comes up
        .fromTo(
          helloPanel,
          {
            yPercent: 15,
          },
          {
            yPercent: 0,
            ease: "power2.inOut",
            duration: 3.5,
          },
          "stack",
        );
    } else if (revealText) {
      const text = revealText.textContent;
      revealText.innerHTML = text
        .split("")
        .map((char) => `<span>${char}</span>`)
        .join("");
      const chars = revealText.querySelectorAll("span");

      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".about-me-textual",
            start: "top top",
            end: "+=200%",
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        })
        .to(chars, {
          color: "#fff",
          stagger: 0.1,
          ease: "none",
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

    if (
      valuesSection &&
      cardsContainer &&
      valueCards.length > 0 &&
      valuesTitle
    ) {
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
        gsap.fromTo(
          card,
          {
            rotation: 0,
          },
          {
            rotation: rotationTarget,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom", // Start rotating as soon as it enters screen bottom
              end: "center center", // Finish rotating exactly when it hits the center pin
              scrub: 1,
              invalidateOnRefresh: true,
            },
          },
        );
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

  // ─── PORTFOLIO YOUTUBE & VIMEO LAZY HOVER PLAY ───
  const portfolioCards = document.querySelectorAll(".portfolio-card");
  const players = {};
  let youtubeAPIRequested = false;

  function loadYouTubeAPI(callback) {
    if (window.YT && window.YT.Player) {
      callback();
      return;
    }
    if (!window.onYouTubeIframeAPIReady) {
      const callbacks = [];
      window.onYouTubeIframeAPIReady = function () {
        callbacks.forEach((cb) => cb());
      };
      window._ytCallbacks = callbacks;
    }
    window._ytCallbacks.push(callback);

    if (!youtubeAPIRequested) {
      youtubeAPIRequested = true;
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag);
      }
    }
  }

  function initYouTubePlayers() {
    portfolioCards.forEach((card, index) => {
      const videoId = card.getAttribute("data-video-id");
      const playerId = `player-${index + 1}`;

      if (!videoId) return;

      players[playerId] = new YT.Player(playerId, {
        height: "100%",
        width: "100%",
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          showinfo: 0,
          rel: 0,
          modestbranding: 1,
          loop: 1,
          mute: 1,
          playlist: videoId,
        },
        events: {
          onReady: (event) => {
            event.target.mute();
            event.target.playVideo();
          },
          onStateChange: (event) => {
            if (event.data === YT.PlayerState.PLAYING) {
              const placeholder = card.querySelector(".video-placeholder");
              if (placeholder) placeholder.style.opacity = "0";
              const ytPlayerEl = card.querySelector(".yt-player");
              if (ytPlayerEl) ytPlayerEl.style.opacity = "1";
            }
          },
        },
      });
    });
  }

  function initVimeoContinuous() {
    const vimeoCards = document.querySelectorAll(".portfolio-card[data-vimeo-src]");
    const vimeoPlayers = {};

    vimeoCards.forEach((card) => {
      const iframe = card.querySelector(".vimeo-iframe");
      if (!iframe) return;

      const player = new Vimeo.Player(iframe);
      const cardId = iframe.id || `vimeo-${Math.random().toString(36).substr(2, 9)}`;
      vimeoPlayers[cardId] = player;

      player.setVolume(0);
      player.play().catch((err) => console.log("Vimeo play error:", err));

      player.on("play", () => {
        const placeholder = card.querySelector(".video-placeholder");
        if (placeholder) placeholder.style.opacity = "0";
        iframe.style.opacity = "1";
      });
    });
  }

  const portfolioContainer = document.querySelector(".portfolio-cards-container");
  if (portfolioContainer) {
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              loadYouTubeAPI(initYouTubePlayers);
              if (window.Vimeo) {
                initVimeoContinuous();
              } else {
                window.addEventListener("load", initVimeoContinuous);
              }
              observer.disconnect();
            }
          });
        },
        { rootMargin: "200px" }
      );
      observer.observe(portfolioContainer);
    } else {
      // Fallback if IntersectionObserver not supported
      loadYouTubeAPI(initYouTubePlayers);
      window.addEventListener("load", initVimeoContinuous);
    }
  }

  // ─── SOCIAL MEDIA REELS: SECTION-LEVEL LAZY LOAD & LIGHTBOX ───
  (function initReels() {
    const grid = document.getElementById("reelsGrid");
    const overlay = document.getElementById("reelOverlay");
    if (!grid || !overlay) return;

    let expandedReel = null;
    let reelsLoaded = false;

    // Create close button
    const closeBtn = document.createElement("div");
    closeBtn.className = "reel-close-btn";
    closeBtn.innerHTML = "×";
    closeBtn.style.display = "none";
    document.body.appendChild(closeBtn);

    function closeExpanded() {
      if (!expandedReel) return;
      expandedReel.classList.remove("reel-expanded");
      overlay.classList.remove("active");
      closeBtn.style.display = "none";
      document.body.style.overflow = ""; // restore scroll

      if (expandedReel._vimeoPlayer) {
        expandedReel._vimeoPlayer.setVolume(0).catch(() => {});
        expandedReel._vimeoPlayer.play().catch(() => {});
      }
      expandedReel = null;
    }

    closeBtn.addEventListener("click", closeExpanded);
    overlay.addEventListener("click", closeExpanded);

    // ── Load ALL reels with staggered delays when section enters viewport ──
    function loadAllReels() {
      if (reelsLoaded) return;
      reelsLoaded = true;

      const items = Array.from(grid.querySelectorAll(".reel-item"));
      items.forEach((item, index) => {
        // Stagger the loading of each reel by 150ms to bypass browser and Vimeo rate/connection limits
        setTimeout(() => {
          const iframe = item.querySelector(".vimeo-iframe-reel");
          const placeholder = item.querySelector(".video-placeholder");

          // 1. Lazy-load the placeholder image first so they don't all load on page load
          if (placeholder && placeholder.dataset.bg) {
            placeholder.style.backgroundImage = `url('${placeholder.dataset.bg}')`;
            delete placeholder.dataset.bg;
          }

          if (!iframe || !iframe.dataset.src) return;

          // 2. Inject the iframe src to start loading
          iframe.src = iframe.dataset.src;
          delete iframe.dataset.src;

          // 3. Create Vimeo player and auto-play
          try {
            const player = new Vimeo.Player(iframe);
            item._vimeoPlayer = player;
            player.setVolume(0).catch(() => {});

            // Ensure placeholder fades out when video actually starts playing
            player.on("play", () => {
              if (placeholder) {
                placeholder.style.opacity = "0";
              }
            });

            // Fallback: If play event hasn't fired in 3.5 seconds, force hide placeholder
            // because the video might be playing but the play event was swallowed by the SDK
            setTimeout(() => {
              if (placeholder && placeholder.style.opacity !== "0") {
                placeholder.style.opacity = "0";
              }
            }, 3500);

            // Trigger play with automatic retry on failure
            player.play().catch((err) => {
              console.warn("Vimeo autoplay failed or interrupted:", err);
              setTimeout(() => {
                player.play().catch(() => {});
              }, 1200);
            });
          } catch (e) {
            console.error("Vimeo Player init error:", e);
          }
        }, index * 150);
      });
    }

    // ── Observe the entire reels grid section ──
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadAllReels();
            sectionObserver.unobserve(grid);
          }
        });
      },
      {
        rootMargin: "300px 0px", // Start loading 300px before section enters viewport
        threshold: 0,
      }
    );

    sectionObserver.observe(grid);

    // ── Set up click-to-expand for each reel ──
    grid.querySelectorAll(".reel-item").forEach((item) => {
      item.addEventListener("click", () => {
        if (expandedReel === item) return;

        expandedReel = item;
        item.classList.add("reel-expanded");
        overlay.classList.add("active");
        closeBtn.style.display = "flex";
        document.body.style.overflow = "hidden"; // lock scroll

        if (item._vimeoPlayer) {
          item._vimeoPlayer.setCurrentTime(0).catch(() => {});
          item._vimeoPlayer.setVolume(1).catch(() => {});
          item._vimeoPlayer.play().catch(() => {});
        }
      });
    });
  })();

  // ─── SERVICES PARALLAX ───
  (function initServicesParallax() {
    const items = document.querySelectorAll(".service-item");

    items.forEach((item) => {
      const bg = item.querySelector(".service-bg");

      item.addEventListener("mousemove", (e) => {
        const rect = item.getBoundingClientRect();
        const y = e.clientY - rect.top; // pixel y from top of item
        const percent = y / rect.height; // 0 to 1

        const moveRange = 60;
        const offset = percent * moveRange - moveRange / 2;

        bg.style.transform = `translateY(${offset}px)`;
      });

      item.addEventListener("mouseleave", () => {
        bg.style.transform = `translateY(0px)`;
      });
    });
  })();

  // ─── CAMERA MASCOT TRACKING ───
  (function initCameraMascot() {
    const mascot = document.getElementById("cameraMascot");
    if (!mascot) return;

    const leftPupil = document.getElementById("pupilLeft");
    const rightPupil = document.getElementById("pupilRight");

    // Limits how far the pupils can move from center (reduced for logo size)
    const maxMove = 5;

    document.addEventListener("mousemove", (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      [leftPupil, rightPupil].forEach((pupil) => {
        const rect = pupil.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;

        const angle = Math.atan2(mouseY - eyeCenterY, mouseX - eyeCenterX);

        // Calculate distance but cap it
        const dist = Math.min(
          maxMove,
          Math.hypot(mouseX - eyeCenterX, mouseY - eyeCenterY) / 10,
        );

        const moveX = Math.cos(angle) * dist;
        const moveY = Math.sin(angle) * dist;

        pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    });
  })();

  // ─── TESTIMONIALS SLIDER ───
  function initTestimonialsSlider() {
    const cards = document.querySelectorAll(".testimonial-card");
    const prevBtn = document.getElementById("prevTestimonial");
    const nextBtn = document.getElementById("nextTestimonial");

    if (!cards.length || !prevBtn || !nextBtn) return;

    let currentIndex = 0;

    function updateSlider() {
      cards.forEach((card, index) => {
        card.classList.remove("active", "prev", "next");

        if (index === currentIndex) {
          card.classList.add("active");
        } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
          card.classList.add("prev");
        } else if (index === (currentIndex + 1) % cards.length) {
          card.classList.add("next");
        }
      });
    }

    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % cards.length;
      updateSlider();
    });

    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + cards.length) % cards.length;
      updateSlider();
    });

    // Initialize first state
    updateSlider();
  }

  initTestimonialsSlider();

  // ─── CAPSULE CAROUSEL (SHRINK/EXPAND) ───
  (function initCapsuleCarousel() {
    const track = document.getElementById("carouselTrack");
    const carousel = document.getElementById("capsuleCarousel");
    if (!track || !carousel) return;

    // Clone items for seamless loop
    const items = [...track.children];
    items.forEach((item) => {
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
      const allItems = track.querySelectorAll(".carousel-item");
      allItems.forEach((item) => {
        item.classList.toggle("shrink");
      });
    }, 3000);

    animate();
  })();

  // --- Vertical Brands Carousel ---
  (function initBrandsCarousel() {
    const columns = document.querySelectorAll(".logo-column");

    columns.forEach((col, index) => {
      const track = col.querySelector(".logo-track");
      const direction = col.dataset.direction;
      const logoItems = track.querySelectorAll(".logo-item");
      const itemHeight = 60 + 60; // height + gap
      const totalHeight = logoItems.length * itemHeight;

      // Simple loop animation using GSAP
      gsap.to(track, {
        y: direction === "up" ? `-=${totalHeight / 2}` : `+=${totalHeight / 2}`,
        duration: 15 + index * 2, // Slightly different speeds
        ease: "none",
        repeat: -1,
        onRepeat: () => {
          // Reset position manually if needed for perfectly seamless,
          // though GSAP's repeat with relative values handles most of it.
        },
        modifiers: {
          y: gsap.utils.unitize((y) => {
            const val = parseFloat(y);
            const limit = totalHeight / 2;
            if (direction === "up") {
              return val % limit;
            } else {
              // For down direction, we shift everything and use modulo
              return ((val % limit) - limit) % limit;
            }
          }),
        },
      });
    });
  })();

  // --- How We Work Inverse Parallax ---
  (function initWorkParallax() {
    const container = document.querySelector(".work-process-container");
    const img = document.querySelector(".parallax-img");

    if (!container || !img) return;

    container.addEventListener("mousemove", (e) => {
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
        ease: "power2.out",
      });
    });

    container.addEventListener("mouseleave", () => {
      gsap.to(img, {
        yPercent: 0,
        duration: 1,
        ease: "power2.out",
      });
    });
  })();

  // --- Service Page Transitions ---
  (function initServiceTransitions() {
    const serviceLinks = document.querySelectorAll(".service-item-link");
    if (
      serviceLinks.length === 0 &&
      !document.body.classList.contains("service-page")
    )
      return;

    serviceLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetUrl = link.getAttribute("href");
        const card = link.querySelector(".service-item");
        const bg = card.querySelector(".service-bg");

        if (!card || !bg) {
          window.location.href = targetUrl;
          return;
        }

        // Get card position
        const rect = card.getBoundingClientRect();

        // Create a temporary expansion element
        const expander = document.createElement("div");
        expander.style.position = "fixed";
        expander.style.top = `${rect.top}px`;
        expander.style.left = `${rect.left}px`;
        expander.style.width = `${rect.width}px`;
        expander.style.height = `${rect.height}px`;
        expander.style.background = "black";
        expander.style.backgroundImage = getComputedStyle(bg).backgroundImage;
        expander.style.backgroundSize = "cover";
        expander.style.backgroundPosition = "center";
        expander.style.zIndex = "1000000";
        expander.style.borderRadius = "0px";
        document.body.appendChild(expander);

        // Animate expansion
        gsap.to(expander, {
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          duration: 0.8,
          ease: "power4.inOut",
          onComplete: () => {
            window.location.href = targetUrl;
          },
        });

        // Fade out current content
        gsap.to(".main-content-wrapper, .top-nav", {
          opacity: 0,
          duration: 0.4,
        });
      });
    });

    // Handle page load transition (fade in)
    if (document.body.classList.contains("service-page")) {
      // Ensure content is visible initially (in case of browser back/cache)
      gsap.set(".service-hero-img-wrap, .service-hero-title", { opacity: 0 });

      gsap.to(".service-hero-img-wrap", {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
        startAt: { scale: 1.2 },
      });
      gsap.to(".service-hero-title", {
        y: 0,
        opacity: 0.95, // Target opacity from CSS
        duration: 1.2,
        delay: 0.4,
        ease: "power4.out",
        startAt: { y: 100 },
      });
    }
  })();

  // ─── STATS COUNT UP ANIMATION ───
  (function initStatsCountUp() {
    const statNumbers = document.querySelectorAll(".stat-number");
    if (!statNumbers.length) return;

    statNumbers.forEach((statEl) => {
      const rawText = statEl.textContent.trim();
      const match = rawText.match(/^(\d+)(.*)$/);
      if (!match) return;

      const targetValue = parseInt(match[1], 10);
      const suffix = match[2];

      statEl.textContent = "0" + suffix;

      const triggerEl = statEl.closest(".stat-card, .agency-stat-card") || statEl;
      const obj = { val: 0 };

      gsap.to(obj, {
        val: targetValue,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: triggerEl,
          start: "top 85%",
          toggleActions: "restart none none reverse",
        },
        onUpdate: () => {
          statEl.textContent = Math.floor(obj.val) + suffix;
        },
      });

      gsap.fromTo(
        statEl,
        { scale: 0.7, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.8,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: triggerEl,
            start: "top 85%",
            toggleActions: "restart none none reverse",
          },
        }
      );
    });
  })();

  // ─── HERO SERVICES SHOWCASE TICKER ───
  (function initHeroShowcase() {
    const items = document.querySelectorAll(".hero-services-showcase .ticker-item");
    if (items.length === 0) return;
    
    let currentIndex = 0;
    
    // Set initial active item
    items[currentIndex].classList.add("active");
    
    setInterval(() => {
      const prevIndex = currentIndex;
      currentIndex = (currentIndex + 1) % items.length;
      
      // Mark previous item as exiting
      items[prevIndex].classList.remove("active");
      items[prevIndex].classList.add("exit");
      
      // Mark current item as active
      items[currentIndex].classList.remove("exit");
      items[currentIndex].classList.add("active");
      
      // Clean up exit class after transition completes
      setTimeout(() => {
        items[prevIndex].classList.remove("exit");
      }, 500);
    }, 2800);
  })();

  // ─── HERO TEXT MASK REVEAL ANIMATION ───
  (function initHeroReveal() {
    const tagline = document.querySelector(".hero-tagline");
    const title = document.querySelector(".hero-main-title");
    const subtitle = document.querySelector(".hero-subtitle");
    const cta = document.querySelector(".hero-cta-btn");
    
    if (!title) return;
    
    // Set initial state
    gsap.set([tagline, title, subtitle, cta], { opacity: 0 });
    
    // Create a GSAP timeline for page load
    const tl = gsap.timeline({ delay: 0.15 });
    
    // 1. Reveal Tagline
    if (tagline) {
      tl.fromTo(tagline, 
        { 
          y: -20, 
          opacity: 0, 
          clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
          webkitClipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)"
        },
        { 
          y: 0, 
          opacity: 1, 
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          webkitClipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 0.8,
          ease: "power3.out"
        }
      );
    }
    
    // 2. Reveal Title (with clip path mask)
    tl.fromTo(title,
      { 
        y: -40, 
        opacity: 0, 
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        webkitClipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)"
      },
      { 
        y: 0, 
        opacity: 1, 
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        webkitClipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 1.2,
        ease: "power4.out"
      },
      "-=0.55"
    );
    
    // 3. Reveal Subtitle
    if (subtitle) {
      tl.fromTo(subtitle,
        { 
          y: -20, 
          opacity: 0, 
          clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
          webkitClipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)"
        },
        { 
          y: 0, 
          opacity: 1, 
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          webkitClipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1.0,
          ease: "power3.out"
        },
        "-=0.75"
      );
    }
    
    // 4. Reveal CTA Button
    if (cta) {
      tl.fromTo(cta,
        { 
          y: -15, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.2)"
        },
        "-=0.65"
      );
    }
  })();

  // ─── PORTFOLIO VIDEO LIGHTBOX MODAL ───
  (function initVideoLightbox() {
    // 1. Create lightbox HTML dynamically
    const lightboxEl = document.createElement("div");
    lightboxEl.className = "video-lightbox";
    lightboxEl.id = "videoLightbox";
    lightboxEl.innerHTML = `
      <div class="lightbox-backdrop"></div>
      <div class="lightbox-content">
        <div class="lightbox-close">&times;</div>
        <div class="lightbox-video-wrapper"></div>
      </div>
    `;
    document.body.appendChild(lightboxEl);

    const backdrop = lightboxEl.querySelector(".lightbox-backdrop");
    const closeBtn = lightboxEl.querySelector(".lightbox-close");
    const videoWrapper = lightboxEl.querySelector(".lightbox-video-wrapper");

    // Function to open lightbox
    function openLightbox(videoType, src) {
      let embedUrl = "";
      if (videoType === "youtube") {
        embedUrl = `https://www.youtube.com/embed/${src}?autoplay=1&controls=1&rel=0&modestbranding=1`;
      } else if (videoType === "vimeo") {
        // Extract raw vimeo ID or link
        const vimeoId = src.match(/video\/(\d+)/)?.[1] || src;
        embedUrl = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&controls=1`;
      }

      videoWrapper.innerHTML = `
        <iframe src="${embedUrl}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
      `;
      lightboxEl.classList.add("active");
      document.body.style.overflow = "hidden"; // disable page scroll
    }

    // Function to close lightbox
    function closeLightbox() {
      lightboxEl.classList.remove("active");
      document.body.style.overflow = ""; // restore page scroll
      // Remove iframe to stop video playback immediately
      setTimeout(() => {
        videoWrapper.innerHTML = "";
      }, 400);
    }

    // Bind click events on portfolio cards
    const cards = document.querySelectorAll(".portfolio-card");
    cards.forEach((card) => {
      card.addEventListener("click", () => {
        const ytId = card.getAttribute("data-video-id");
        const vimeoSrc = card.getAttribute("data-vimeo-src");

        if (ytId) {
          openLightbox("youtube", ytId);
        } else if (vimeoSrc) {
          openLightbox("vimeo", vimeoSrc);
        }
      });
    });

    // Close triggers
    closeBtn.addEventListener("click", closeLightbox);
    backdrop.addEventListener("click", closeLightbox);
  })();
});
