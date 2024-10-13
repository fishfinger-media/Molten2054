
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import Lenis from 'lenis';
import barba from '@barba/core';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import SplitType from "split-type";

gsap.registerPlugin(Flip, ScrollTrigger, CustomEase);

const lenis = new Lenis()
function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// LOAD MUSIC
var audio = new Audio();
audio.src = 'https://s3.amazonaws.com/audio.mp3land.com/mp3/2019/01/07/mp3-2019-01-07-00-00-00.mp3';


function toggleAudio() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

document.querySelectorAll('.nav-bar_link.is-music').forEach(element => {
  element.addEventListener('click', function() {
    toggleAudio();
  });
});


// NOISE
if (document.querySelector("#noise")) {
    const noise = () => {
      let canvas, ctx;
    
      let wWidth, wHeight;
    
      let noiseData = [];
      let frame = 0;
    
      let loopTimeout;
    
    
      // Create Noise
      const createNoise = () => {
          const idata = ctx.createImageData(wWidth, wHeight);
          const buffer32 = new Uint32Array(idata.data.buffer);
          const len = buffer32.length;
    
          for (let i = 0; i < len; i++) {
              if (Math.random() < 0.5) {
                  buffer32[i] = 0xff000000;
              }
          }
    
          noiseData.push(idata);
      };
    
    
      // Play Noise
      const paintNoise = () => {
          if (frame === 9) {
              frame = 0;
          } else {
              frame++;
          }
    
          ctx.putImageData(noiseData[frame], 0, 0);
      };
    
    
      // Loop
      const loop = () => {
          paintNoise(frame);
    
          loopTimeout = window.setTimeout(() => {
              window.requestAnimationFrame(loop);
          }, (3000 / 25));
      };
    
    
      // Setup
      const setup = () => {
          wWidth = window.innerWidth;
          wHeight = window.innerHeight;
    
          canvas.width = wWidth;
          canvas.height = wHeight;
    
          for (let i = 0; i < 10; i++) {
              createNoise();
          }
    
          loop();
      };
    
    
      // Reset
      let resizeThrottle;
      const reset = () => {
          window.addEventListener('resize', () => {
              window.clearTimeout(resizeThrottle);
    
              resizeThrottle = window.setTimeout(() => {
                  window.clearTimeout(loopTimeout);
                  setup();
              }, 100);
          }, false);
      };
    
    
      // Init
      const init = (() => {
          canvas = document.getElementById('noise');
          ctx = canvas.getContext('2d');
    
          setup();
      })();
    };
    noise();
    
};
    

// HERO
if (document.querySelector('.section-home_hero')) {

  // Scroll Exit
  const heroExit = gsap.timeline({
    scrollTrigger: {
      trigger: '.section-home_hero',
      start: 'bottom 95%',
      end: 'bottom 10%',
      scrub: true,
      markers: false,
  
    }
  });
  
  heroExit.to('[data-load="text"]', {
    rotate: 90,
    y: 2000,
    scale: 1.5,
    opacity: 0,
    duration: 1,
  });
  
  heroExit.to('.home_hero-earth_container', {
    rotate: 90,
    y: 2000,
    scale: 1.5,
    pointerEvents: 'none',
    opacity: 0,
    duration: 1,
  }, 0);

  // nav logo gsap flip 

    const originalNavContainer = document.querySelector('.logo-container'); // Original container
    const newNavContainer = document.querySelector('.nav-bar_logo-container'); // New container
    const navLogo = document.querySelector('.logo.is-hero');

    gsap.set('.logo.is-nav', {display: 'none'});

    // Capture the initial state
    const navState = Flip.getState(navLogo);

      // ScrollTrigger setup
      ScrollTrigger.create({
        trigger: '[data-nav="trigger"]',
        start: 'top 80%',
        end: 'top 20%',
        markers: false,
        onEnter: () => {
          newNavContainer.appendChild(navLogo);
      
          Flip.from(navState, {
            duration: 0.8,
            scale: true,
          });
        },
        onLeaveBack: () => {
          const reverseState = Flip.getState(navLogo); 
      
          originalNavContainer.appendChild(navLogo);
      
          Flip.from(reverseState, {
            duration: 0.8,
            scale: true,
          });
        }
      });

};  


// INTRO
if (document.querySelector('.section-home_intro')) {

  gsap.from('.lines', {
    height: 0,
    duration: 2,
    ease: "power4.inOut",  
    scrollTrigger: {
      trigger: '.section-home_intro',
      start: 'top 60%',
      markers: false,
      toggleActions: 'play none reverse none'
    }
  })

    const introSection = gsap.timeline({
      scrollTrigger: {
        trigger: '.section-home_intro',
        start: 'top 20%',
        markers: true,
        toggleActions: 'play none none reset'
      }
    })

   

    const paragraph = new SplitType('[gsap-heading]', { types: 'words, chars' });

    introSection.from(paragraph.chars, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: {
        amount: 0.5
      },
      ease: "sine.inOut",
    });

    introSection.from('.section-home_intro h2', {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "sine.inOut",
    }, 0);
   
   
    introSection.from('[data-gsap="section-btn"]', {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "sine.inOut",
    }, 0);
    
};


// VIDEO SECTION
if (document.querySelector('.section-home_video')) {
  
  const video = document.getElementById('videomain');
  const timelineWrapper = document.querySelector('.timeline-wrapper');
  const soundButton = document.querySelector('[toggle-volume]');
  const playBtn = document.querySelector('[toggle-play]');

  // TOGGLE VIDEO
  function togglePlay() {
    const method = video.paused ? 'play' : 'pause';

    playBtn.innerText = method === 'play' ? 'Pause' : 'Play';
    video[method]();
  }

  // TOGGLE SOUND
  function toggleSound() {
    const soundButton = document.querySelector('[toggle-volume]');
    video.muted = !video.muted; // Toggle the muted state
    soundButton.innerText = video.muted ? 'Sound On' : 'Sound Off'; // Update button text
  }

  // VIDEO PLAYER CONTROLS
  function videoPlayer() {

    const tickers = document.querySelectorAll('.ticker');

    function handleMouseMove(event) {
      const rect = timelineWrapper.getBoundingClientRect();
      const mouseX = event.clientX;

      tickers.forEach((ticker) => {
        const tickerRect = ticker.getBoundingClientRect();
        const tickerCenter = tickerRect.left + tickerRect.width;
        const distance = Math.abs(mouseX - tickerCenter);

        let scaleY;
        if (distance < 10) {
          scaleY = 2;
        } else if (distance < 20) {
          scaleY = 1.5;
        } else if (distance < 30) {
          scaleY = 1.2;
        } else if (distance < 40) {
          scaleY = 1.1;
        } else {
          scaleY = 1;
        }

        gsap.to(ticker, {
          scaleY: scaleY,
          duration: 0.5,
          transformOrigin: "bottom"
        });
      });
    }

    function resetTickers() {
      tickers.forEach((ticker) => {
        gsap.to(ticker, {
          scaleY: 1,
          duration: 0.5,
          transformOrigin: "bottom"
        });
      });
    }

    timelineWrapper.addEventListener('mousemove', handleMouseMove);
    timelineWrapper.addEventListener('mouseleave', resetTickers);

    // UPDATE TIMELINE PROGRESS
    video.addEventListener('timeupdate', () => {
      const duration = video.duration;
      const currentTime = video.currentTime;

      const progress = currentTime / duration;
      const tickersToHighlight = Math.floor(progress * tickers.length);

      tickers.forEach((ticker, index) => {
        if (index < tickersToHighlight) {
          ticker.style.backgroundColor = 'rgba(255, 255, 255, 1)';
        } else {
          ticker.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
        }
      });
    });

    // SCRUB TIMELINE
    timelineWrapper.addEventListener('click', (event) => {
      const rect = timelineWrapper.getBoundingClientRect();
      const clickPosition = event.clientX - rect.left; // Position of the click on the timeline
      const timelineWidth = rect.width; // Total width of the timeline

      const clickPercentage = clickPosition / timelineWidth; // Percentage of the timeline that was clicked
      const newTime = clickPercentage * video.duration; // Map click to video duration

      video.currentTime = newTime; // Set video time to the clicked position
    });
  }

  //VIDEO TIMELINE GENERATOR
  function tickerGenerator() {
    // Get the width of the container
    const containerWidth = timelineWrapper.offsetWidth; // assuming 'timelineWrapper' is your container

    // Calculate how many tickers can fit (each ticker is 1px wide with a 10px gap)
    const tickerWidth = 1;
    const gap = 8;
    const totalTickerSpace = tickerWidth + gap;

    // Calculate the number of tickers that can fit in the container
    const numberOfTickers = Math.floor(containerWidth / totalTickerSpace);

    // CREATE TICKERS dynamically
    for (let i = 1; i <= numberOfTickers; i++) {
      const ticker = document.createElement('div');
      ticker.classList.add('ticker');
      timelineWrapper.appendChild(ticker);
    }

    videoPlayer()
  }

  setTimeout(tickerGenerator, 1000)
  soundButton.addEventListener('click', toggleSound);
  video.addEventListener('click', togglePlay);
  playBtn.addEventListener('click', togglePlay);
  

  const videoSection = gsap.timeline({
    scrollTrigger: {
      trigger: '.section-home_video',
      start: 'top 80%',
      end: 'top -50%',
      markers: false,
      scrub: true,
    }
  });
  
  videoSection.to('.page-wrapper', {
    background: 'rgba(0, 0, 0, 1)',
    duration: 1,
    ease: 'power4.inOut'
  });

  videoSection.to('.navigation', { opacity:0, duration: 1, ease: 'power4.inOut'}, 0);
  videoSection.to('.footer', { opacity:0, duration: 1, ease: 'power4.inOut'}, 0);
  videoSection.from('.home-video_wrapper', { opacity:0, scale:0.8,duration: 1, ease: 'power4.inOut'}, 0.5);
  videoSection.from('.player-control_wrapper', { opacity:0, y:50, duration: 1, ease: 'power4.inOut'},  0.5);

  const videoSectionOut = gsap.timeline({
    scrollTrigger: {
      trigger: '.section-home_video',
      start: 'bottom 90%',
      markers: false,
      toggleActions: 'play none reverse none'
    }
  });

  videoSectionOut.to('.home-video_wrapper', { opacity:0, scale:0.8,duration: 1, ease: 'power4.inOut'}, 0);
  videoSectionOut.to('.navigation', { opacity:1, duration: 1, ease: 'power4.inOut'}, 0.5);
  videoSectionOut.to('.footer', { opacity:1, duration: 1, ease: 'power4.inOut'}, 0);
  videoSectionOut.to('.page-wrapper', { background: 'rgba(0, 0, 0, 0)', duration: 1, ease: 'power4.inOut'}, 0.5);

}


// PORTFOLIO GRID
if (document.querySelector('.portfolio-grid_wrapper')) {
  const portfolioGridWrapper = document.querySelector('.portfolio-grid_wrapper');
  const portfolioGrid = document.querySelector('.portfolio-grid');
  
  portfolioGridWrapper.addEventListener('mousemove', (e) => {
      const rect = portfolioGridWrapper.getBoundingClientRect();
      
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
  
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
  
      const offsetX = (mouseX - centerX) * 0.05; 
      const offsetY = (mouseY - centerY) * 0.05; 
  
   
      gsap.to(portfolioGrid, {
          x: offsetX,
          y: offsetY,
          duration: 3,
          ease: "sine" 
      });
  });

  gsap.from('.portfolio-grid_wrapper', {
    opacity:0,
    scale:0.8,
    duration:1.5,
    ease: CustomEase.create("custom", "M0,0 C0,0.05 0.25,1 1,1 "),
    scrollTrigger: {
      trigger: '.portfolio-grid_wrapper',
      start: 'top 60%',
      end: "bottom 40%",
      markers:false,
      toggleActions: "play reverse play reverse",
      
    }
  })
}

// SWIPER
if (document.querySelector('.swiper')) {

  const swiper = new Swiper('.swiper', {
    modules: [Navigation], 
    centeredSlides: true,
    slidesPerView: 'auto',
    spaceBetween: '0',
    loop: true,
    
    navigation: {
      nextEl: '.swiper-nav.is-next',
      prevEl: '.swiper-nav.is-prev',
    },
  });

  // Trigger GSAP on Swiper initialization
  swiper.init();
  
  gsap.set('.swiper-slide-active', {scale: 1});

  // Ensure the first active slide has data-barba-img
  const firstActiveSlide = document.querySelector('.swiper-slide-active');
  const firstSlideBgImg = firstActiveSlide.querySelector('.background-img');
  if (firstSlideBgImg) {
    firstSlideBgImg.setAttribute('data-barba-img', '');
  }

  swiper.on('slideChangeTransitionStart', () => {
    // Your existing slide change logic
    gsap.to('.swiper-slide-active', { scale: 1, duration: 0.5, ease: "power4.inOut" });
    gsap.to('.swiper-slide:not(.swiper-slide-active)', { scale: 0.7, duration: 0.5, ease: "power4.inOut" });

    const activeSlide = document.querySelector('.swiper-slide-active');
    const companyName = activeSlide.getAttribute('data-company');
    document.getElementById('company').textContent = companyName;

    // Remove data-barba-img from all .background-img elements
    document.querySelectorAll('.background-img').forEach(img => {
      img.removeAttribute('data-barba-img');
    });

    // Add data-barba-img to the .background-img inside the active slide
    const activeSlideBgImg = activeSlide.querySelector('.background-img');
    if (activeSlideBgImg) {
      activeSlideBgImg.setAttribute('data-barba-img', '');
    }
  });

  // Initial animation for swiper
  const swiperGsap = gsap.timeline({
    scrollTrigger: {
      trigger: '.section_home-slider',
      start: 'top 70%',
      end: 'bottom 30%',
      markers: false,
      toggleActions: 'play reverse play reverse',
    }
  });

  swiperGsap.from('.swiper', {
    y: 150,
    scale: 0.8,
    opacity: 0,
    duration: 1,
    ease: "power4.inOut",
  });
  swiperGsap.from('.swiper-slide-prev', {x: '40%', duration: 0.5}, 0.4);
  swiperGsap.from('.swiper-slide-next', {x: '-40%', duration: 0.5}, 0.4);
}

// Initialize Barba after Swiper setup to ensure first active slide is correctly set
barba.init({
  transitions: [
      {
          name: 'portfolio-transition',
          sync: true,
          async enter(data) {
              data.next.container.classList.add('is-transitioning');

              const currentImg = data.current.container.querySelector('video[data-barba-img]');
              const newImg = data.next.container.querySelector('.background-img');

              if (!currentImg || !newImg) {
                  console.error(currentImg);
                  return;
              }

              const currentImgParent = currentImg.parentElement;
              const newImgParent = newImg.parentElement;

              const state = Flip.getState(currentImg);

              currentImgParent.style.height = `${currentImg.offsetHeight}px`;

              newImg.remove();
              newImgParent.appendChild(currentImg);

              await Flip.from(state, { duration: 0.5 });

              data.next.container.classList.remove('is-transitioning');
          },
          async after(data) {
              window.scrollTo(0, 0);
              console.log('after portfolio transition');
          },
      },
  ],
});


// FANCY LINKS
document.querySelectorAll('[data-link]').forEach(element => {
  element.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default behavior
    const url = element.getAttribute('data-link');
    if (url) {
      barba.go(url);
    }
  });
});


// NAVIGATION
let navbarStatus = false; // Track the status of the navbar
document.querySelector('#nav-btn').addEventListener('click', function() {
    // Check the current status of the navbar
    if (!navbarStatus) {
        // Open the navbar
    

        gsap.set('.nav-menu_wrapper', { opacity: 0 });
        // gsap.set('.nav-link', { opacity: 0, y: 40 });

        const navOpen = gsap.timeline();

        navOpen.to('.nav-menu_wrapper', {
            display: 'flex',
            opacity: 1,
            duration: 0.5,
            ease: "power4.inOut",
        }) 

        navOpen.from('.logo', {
          opacity:0,
          duration: 1
        }, 0)

        navOpen.from('[data-gsap="nav"]', {
          opacity:0,
          y:'40',
          duration: 1,
          stagger: {
            amount: 0.25,
          },
          ease: "power4.inOut"
        }, '0')

        navOpen.from('.nav-menu_shape-wrapper', {
          opacity:0,
          x:'40',
          duration: 1,
        }, 0)
        
        navOpen.from('.nav-menu_divider', {
          height:0,
          duration: 1,
          ease: "power4.inOut"

        }, 0.2)


        


        navbarStatus = true; // Update the status to open
    } else {
        

      const navClose = gsap.timeline();

      navClose.to('.nav-menu_divider', {
        height:0,
        duration: 1,
        ease: "power4.inOut"
      }, 0)

      navClose.to('.nav-menu_shape-wrapper', {
        opacity:0,
        x:'40',
        duration: 1,
      }, 0)
    
      navClose.to('[data-gsap="nav"]', {
        opacity:0,
        y:'40',
        duration: 1,
        stagger: {
          amount: 0.25,
        },
        ease: "power4.inOut"
      }, '0')

      navClose.to('.logo', {
        opacity:1,
        duration: 1
      }, 0)
      
      
      navClose.to('.nav-menu_wrapper', {
        opacity: 0,
        duration: 0.5,
        ease: "power4.inOut",
        onComplete: function() {
          gsap.set('.nav-menu_wrapper', { display: 'none' }); // Hide it after animation
          gsap.set('.logo', { clearProps: "all"  });
          gsap.set('[data-gsap="nav"]', { clearProps: "all"  });
          gsap.set('.nav-menu_divider', { clearProps: "all"  });
          gsap.set('.nav-menu_shape-wrapper', { clearProps: "all"  });
      }
    }) 
    

        navbarStatus = false; // Update the status to closed
    }
});

gsap.to('.section_portfolio-text', {
  height:0,
  duration: 1,
  scrollTrigger: {
    trigger: '.section_portfolio-text',
    start: 'top 70%',
  }
}) 


// NAV LINK HOVER
const navLinks = document.querySelectorAll('.nav-link'); // Select all nav-link elements

navLinks.forEach(navLink => {
  const navText = new SplitType(navLink, { types: 'words, chars' }); // Create SplitType instance for each nav link

  const handleHoverIn = () => {
    gsap.to(navText.chars, {
      y: '-100%',
      duration: 1,
      stagger: {
        amount: 0.5
      },
      ease: "power4.inOut",
    });
  };

  const handleHoverOut = () => {
    gsap.to(navText.chars, {
      y: '0%',
      duration: 1,
      stagger: {
        amount: 0.5
      },
      ease: "power4.inOut",
    });
  };

  navLink.addEventListener('mouseenter', handleHoverIn);
  navLink.addEventListener('mouseleave', handleHoverOut);
});
