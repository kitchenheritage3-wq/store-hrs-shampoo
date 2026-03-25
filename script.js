document.addEventListener('DOMContentLoaded', () => {
    
    // Shrinking Header on Scroll
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    // Smooth scrolling for anchor links (fallback/enhancement)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // FAQ Accordion Functionality
    const faqBtns = document.querySelectorAll('.faq-btn');

    faqBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                faqBtns.forEach(otherBtn => {
                    if (otherBtn !== this && otherBtn.classList.contains('active')) {
                        otherBtn.classList.remove('active');
                        otherBtn.nextElementSibling.style.maxHeight = null;
                    }
                });
            }
        });
    });

    // --- BUY PAGE SCRIPTS ---

    // 1. Image Gallery Toggle
    const thumbnails = document.querySelectorAll('.thumb');
    const mainImg = document.getElementById('main-product-img');
    
    if (mainImg && thumbnails.length > 0) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // Remove active from all
                thumbnails.forEach(t => t.classList.remove('active'));
                
                // Add active to clicked
                this.classList.add('active');
                
                // Update main image source
                const newSrc = this.getAttribute('data-src');
                const fallback = this.getAttribute('data-fallback');
                
                mainImg.src = newSrc;
                // Add fallback to main image just in case
                mainImg.onerror = function() { 
                    this.onerror = null; // Prevent infinite loop if fallback also fails
                    this.src = fallback; 
                };
            });
        });
    }

    // 2. Main Image Zoom Effect on Hover
    const mainImageWrapper = document.querySelector('.main-image-wrapper');
    
    if (mainImageWrapper && mainImg) {
        mainImageWrapper.addEventListener('mousemove', function(e) {
            // Get click coordinates relative to the div
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate percentages 
            const xPercent = (x / rect.width) * 100;
            const yPercent = (y / rect.height) * 100;
            
            // Move the transform origin to the mouse position
            mainImg.style.transformOrigin = `${xPercent}% ${yPercent}%`;
        });
        
        mainImageWrapper.addEventListener('mouseleave', function() {
            // Reset on leave
            mainImg.style.transformOrigin = 'center center';
        });
    }

    // 3. Quantity Selector
    const qtyInput = document.getElementById('qty');
    const btnMinus = document.getElementById('qty-minus');
    const btnPlus = document.getElementById('qty-plus');
    
    if (qtyInput && btnMinus && btnPlus) {
        btnMinus.addEventListener('click', () => {
            let current = parseInt(qtyInput.value);
            if (current > 1) {
                qtyInput.value = current - 1;
            }
        });
        
        btnPlus.addEventListener('click', () => {
            let current = parseInt(qtyInput.value);
            if (current < parseInt(qtyInput.max)) {
                qtyInput.value = current + 1;
            }
        });
    }

    // 4. Sticky Mobile Buy Button Logic
    const stickyBar = document.querySelector('.sticky-buy-bar');
    const mainPurchaseSection = document.querySelector('.purchase-actions');
    
    if (stickyBar && mainPurchaseSection) {
        // Show sticky bar when the main buy button scrolls out of view upwards
        const observer = new IntersectionObserver((entries) => {
            // If the purchase actions section is not intersecting (not visible)
            // and we are scrolling down (its bounding rectangle is above the viewport)
            if (!entries[0].isIntersecting && entries[0].boundingClientRect.top < 0) {
                stickyBar.classList.add('visible');
            } else {
                stickyBar.classList.remove('visible');
            }
        });
        
        observer.observe(mainPurchaseSection);
    }
    
    // 5. Live Visitors Ticker
    const visitorCountEl = document.getElementById('visitor-count');
    if (visitorCountEl) {
        let currentViewers = 18; // Start at 18
        visitorCountEl.textContent = currentViewers;

        const updateViewers = () => {
            // Randomly fluctuate up or down
            let change = Math.floor(Math.random() * 5) - 2; // yields -2, -1, 0, 1, 2
            
            // Add slight upward bias if number drops too low
            if (currentViewers < 16) {
                change = Math.floor(Math.random() * 3) + 1; // +1 to +3
            } else if (currentViewers > 32) {
                change = Math.floor(Math.random() * 3) - 3; // -3 to -1
            }

            currentViewers += change;
            
            // Hard boundary check (12 to 35)
            if (currentViewers < 12) currentViewers = 12 + Math.floor(Math.random() * 3);
            if (currentViewers > 35) currentViewers = 35 - Math.floor(Math.random() * 3);

            // Animate transition using CSS wrapper
            visitorCountEl.classList.add('fade-out');
            
            setTimeout(() => {
                visitorCountEl.textContent = currentViewers;
                visitorCountEl.classList.remove('fade-out');
            }, 300); // 300ms transition time
            
            // Calculate next tick between 1s and 2s
            const nextUpdate = Math.floor(Math.random() * 1000) + 1000;
            setTimeout(updateViewers, nextUpdate);
        };
        
        // Kick off loop after 1.5 seconds
        setTimeout(updateViewers, 1500);
    }
    // --- REVIEW CAROUSEL ---
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.review-card'));
    const nextBtn = document.querySelector('.carousel-nav.next');
    const prevBtn = document.querySelector('.carousel-nav.prev');
    const dotsNav = document.querySelector('.carousel-dots');
    
    let currentIndex = 0;
    let moveToSlide;

    if (track && slides.length > 0) {

        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => moveToSlide(index));
            dotsNav.appendChild(dot);
        });

        const dots = Array.from(document.querySelectorAll('.dot'));

        const updateDots = (index) => {
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
        };

        moveToSlide = (index) => {
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;
            
            currentIndex = index;
            const slideWidth = slides[0].getBoundingClientRect().width;
            track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
            updateDots(currentIndex);
        };

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                moveToSlide(currentIndex + 1);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                moveToSlide(currentIndex - 1);
            });
        }

        // Touch Swipe Support
        let startX = 0;
        let isDragging = false;

        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });

        track.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;

            if (Math.abs(diff) > 50) { // Threshold for swipe
                if (diff > 0) {
                    moveToSlide(currentIndex + 1);
                } else {
                    moveToSlide(currentIndex - 1);
                }
            }
            isDragging = false;
        });

        // Handle window resize
        window.addEventListener('resize', () => moveToSlide(currentIndex));
        
        // Auto play (optional)
        let autoPlay = setInterval(() => moveToSlide(currentIndex + 1), 5000);
        
        track.addEventListener('mouseenter', () => clearInterval(autoPlay));
        track.addEventListener('mouseleave', () => autoPlay = setInterval(() => moveToSlide(currentIndex + 1), 5000));
    }

    // Dynamic Customer Reviews System (Modified for Carousel)
    const toggleReviewBtn = document.getElementById('toggle-review-form');
    const reviewFormContainer = document.getElementById('review-form-container');
    const reviewForm = document.getElementById('review-form');
    const fileInput = document.getElementById('review-photo');
    const fileChosenText = document.getElementById('file-chosen-text');
    const reviewsContainer = document.querySelector('.carousel-track') || document.querySelector('.reviews-grid');
    const totalReviewsCount = document.getElementById('total-reviews-count');
    
    // Toggle Form Visibility
    const openReviewForm = () => {
        if (!reviewFormContainer || !toggleReviewBtn) return;
        reviewFormContainer.style.display = 'block';
        toggleReviewBtn.textContent = 'Cancel Review';
    };

    const closeReviewForm = () => {
        if (!reviewFormContainer || !toggleReviewBtn) return;
        reviewFormContainer.style.display = 'none';
        toggleReviewBtn.textContent = 'Write a Review';
    };

    if (toggleReviewBtn && reviewFormContainer) {
        toggleReviewBtn.addEventListener('click', () => {
            if (reviewFormContainer.style.display === 'none') {
                openReviewForm();
            } else {
                closeReviewForm();
            }
        });
    }

    // Auto-open if query param exists
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('openReview') === 'true') {
        openReviewForm();
        // Fallback smooth scroll to element if standard hash jump is overridden by DOM load
        setTimeout(() => {
            const reviewSec = document.getElementById('reviews');
            if(reviewSec) reviewSec.scrollIntoView({ behavior: 'smooth' });
        }, 500);
    }

    // Update file chosen text
    if (fileInput && fileChosenText) {
        fileInput.addEventListener('change', function(){
            if(this.files && this.files.length > 0) {
                fileChosenText.textContent = this.files[0].name;
            } else {
                fileChosenText.textContent = 'No file chosen';
            }
        });
    }

    // Render a single review card HTML string
    const createReviewCardHTML = (review) => {
        // Generate stars HTML
        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= review.rating) {
                starsHtml += '<i class="ph-fill ph-star"></i>';
            } else {
                starsHtml += '<i class="ph ph-star" style="color:#ccc;"></i>';
            }
        }

        // Generate Initials Avatar
        const initials = review.name.charAt(0).toUpperCase();

        // Check if there is an image
        const imageHtml = review.photoBase64 ? 
            `<div class="review-image"><img src="${review.photoBase64}" alt="Customer photo"></div>` : '';

        return `
            <div class="review-card dynamic-review">
                <div class="stars">${starsHtml}</div>
                <div class="customer-info">
                    <div class="customer-avatar avatar-text">${initials}</div>
                    <div class="reviewer"><strong>${review.name}</strong><span>Verified Buyer</span></div>
                </div>
                <p class="review-text">"${review.text}"</p>
                ${imageHtml}
            </div>
        `;
    };

    // Load existing reviews from LocalStorage
    const loadReviews = () => {
        if (!reviewsContainer) return;
        const storedReviews = localStorage.getItem('hrs_reviews');
        if (storedReviews) {
            try {
                const reviews = JSON.parse(storedReviews);
                let allDynamicHtml = '';
                reviews.forEach(rev => {
                    allDynamicHtml += createReviewCardHTML(rev);
                });
                
                // Prepend to container so newest is first
                if (allDynamicHtml) {
                    reviewsContainer.insertAdjacentHTML('afterbegin', allDynamicHtml);
                    
                    // Update total count
                    if(totalReviewsCount) {
                        const baseCount = 128;
                        totalReviewsCount.textContent = baseCount + reviews.length;
                    }

                    // RE-INITIALIZE CAROUSEL DOTS IF NEEDED
                    // Since dynamic reviews are added, we might need to recreate dots or at least update them.
                    // For now, let's keep it simple.
                }
            } catch(e) {
                console.error("Error loading reviews", e);
            }
        }
    };

    // Initialize display on load
    loadReviews();

    // Handle Form Submission
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Stop form from triggering a page reload
            e.stopPropagation();

            // Prevent multiple clicks while processing
            const submitBtn = reviewForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="ph ph-spinner-gap"></i> Processing...';
            }

            const name = document.getElementById('reviewer-name').value;
            const text = document.getElementById('review-text').value;
            
            // Get rating (radio buttons)
            let rating = 5; // default
            const ratingInputs = document.getElementsByName('rating');
            for(let radio of ratingInputs) {
                if(radio.checked) {
                    rating = parseInt(radio.value);
                    break;
                }
            }

            const file = fileInput.files[0];

            const saveAndRenderReview = (base64Img = null) => {
                const newReview = {
                    id: Date.now(),
                    name: name,
                    rating: rating,
                    text: text,
                    photoBase64: base64Img,
                    date: new Date().toISOString()
                };

                // 1. Get existing from storage safely
                let existingReviews = [];
                try {
                    const stored = localStorage.getItem('hrs_reviews');
                    if (stored) existingReviews = JSON.parse(stored);
                } catch(e) {
                    console.error("Storage parse error", e);
                }

                // 2. Add new and save safely
                existingReviews.unshift(newReview);
                try {
                    localStorage.setItem('hrs_reviews', JSON.stringify(existingReviews));
                } catch(e) {
                    console.error("Storage save error (possibly too large)", e);
                }

                // 3. Render instantly on page (prepend)
                const reviewHtml = createReviewCardHTML(newReview);
                reviewsContainer.insertAdjacentHTML('afterbegin', reviewHtml);
                
                // Update total count
                if(totalReviewsCount) {
                    const currentCount = parseInt(totalReviewsCount.textContent) || 128;
                    totalReviewsCount.textContent = currentCount + 1;
                }

                // 4. Success message & Reset Form
                alert("Success! Your review has been submitted and added.");
                
                reviewForm.reset();
                fileChosenText.textContent = 'No file chosen';
                reviewFormContainer.style.display = 'none';
                toggleReviewBtn.textContent = 'Write a Review';
                
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Submit Review';
                }
                
                // Smooth scroll to the new review
                reviewsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // Re-initialize carousel if it exists
                if (track && typeof moveToSlide === 'function') {
                    // Re-calculate slides array and dots if needed
                    // For now, at least reset to first slide to show new review
                    moveToSlide(0);
                }
            };

            // Process image if exists, then finalize
            if (file) {
                const reader = new FileReader();
                reader.onloadend = function() {
                    saveAndRenderReview(reader.result);
                }
                reader.readAsDataURL(file);
            } else {
                saveAndRenderReview(null);
            }
        });
    }

});
