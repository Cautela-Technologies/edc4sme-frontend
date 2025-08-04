        // Initialize Swiper
        const swiper = new Swiper('.swiper', {
            // Basic settings
            loop: true,
            autoplay: {
                delay: 1000,
                disableOnInteraction: false,

            },
            
            speed: 800,
            effect: 'fade',
            
            // Pagination dots
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                type: 'bullets',
            },
            
            // Touch/swipe settings
            touchRatio: 1,
            touchAngle: 45,
            grabCursor: true,
            
            // Responsive breakpoints
            breakpoints: {
                320: {
                    speed: 600,
                },
                768: {
                    speed: 800,
                },
            },
            
            // Pause autoplay on hover
            on: {
                init: function () {
                    const swiperEl = this.el;
                    swiperEl.addEventListener('mouseenter', () => {
                        this.autoplay.stop();
                    });
                    swiperEl.addEventListener('mouseleave', () => {
                        this.autoplay.start();
                    });
                }
            }
        });
