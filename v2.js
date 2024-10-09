import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from 'lenis'
import barba from '@barba/core';

gsap.registerPlugin(Flip, ScrollTrigger);

const lenis = new Lenis()
function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)


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
  
}



/* 

[data-btn="load"]
[data-load="text"]

.hero-logo_container
.nav-bar_logo-container



const loadBtn = document.querySelector('[data-btn="load"]');

loadBtn.addEventListener('click', () => { 

  loadBtn.style.opacity = '0';
  loadBtn.style.pointerEvents = 'none';

  const textElement = document.querySelector('[data-load="text"]');

  gsap.to(textElement, { opacity: 0, duration: 0.5, onComplete: () => {
    textElement.textContent = textElement.textContent = "What you are about to see is an imagined future";
    gsap.to(textElement, { opacity: 1, duration: 0.5 });
  }});


    const originalContainer = document.querySelector('.loader-content_wrapper');
    const newContainer = document.querySelector('.earth-content');
    const img = document.querySelector('.loader-shapes_container');



      const state = Flip.getState(img);

      newContainer.appendChild(img);
      
      Flip.from(state, {
          ease: "power1.inOut",
          scale: true
      });


});

*/


// NAV LOGO ANIMATION

if (document.querySelector('.logo-container')) {
const originalNavContainer = document.querySelector('.logo-container'); // Original container
const newNavContainer = document.querySelector('.nav-bar_logo-container'); // New container
const navLogo = document.querySelector('.logo');

// Capture the initial state
const navState = Flip.getState(navLogo);

// ScrollTrigger setup
ScrollTrigger.create({
  trigger: '[data-nav="trigger"]',
  start: 'top 80%',
  end: 'top 20%',
  markers: false,
  onEnter: () => {
    // Move the logo to the new container and animate it on scroll down
    newNavContainer.appendChild(navLogo);

    Flip.from(navState, {
      duration: 0.8,
      scale: true,
    });
  },
  onLeaveBack: () => {
    // When scrolling back up, reverse the animation and move the logo back
    const reverseState = Flip.getState(navLogo); // Capture the new state

    // Move the logo back to the original container
    originalNavContainer.appendChild(navLogo);

    // Animate it back to its original state
    Flip.from(reverseState, {
      duration: 0.8,
      scale: true,
    });
  }
});

}


// VIDEO CODE
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
      start: 'top 50%',
      end: 'bottom 50%',
      markers: false,
      toggleActions: 'play reverse play reverse'
    }
  });
  
  videoSection.to('.page-wrapper', {
    background: 'rgba(0, 0, 0, 1)',
    duration: 1,
    ease: 'power4.inOut'
  });

  videoSection.to('.navigation', { opacity:0, duration: 1, ease: 'power4.inOut'}, 0);
  videoSection.to('.footer', { opacity:0, duration: 1, ease: 'power4.inOut'}, 0);
  videoSection.from('.home-video_wrapper', { opacity:0, scale:0.8,duration: 1, ease: 'power4.inOut'}, 0);
  videoSection.from('.player-control_wrapper', { opacity:0, y:50, duration: 1, ease: 'power4.inOut'});
}
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


gsap.from('.portfolio-grid', {
  scale: 0.8,
  opacity: 0,
  y: 100,
  duration: 1,
  scrollTrigger: {
    trigger: '.portfolio-grid_wrapper',
    start: 'top 10%',
    end: 'bottom 20%',
    markers: false,
    toggleActions: 'play reverse play reverse', 

  }
})
}
  barba.init({
    transitions: [{
      name: 'fade-transition',
      leave(data) {
        // Before leaving the current page
        const slideContent = data.current.container.querySelector('.slide-content');
        const backgroundImg = data.current.container.querySelector('.background-img');

        // Store the values in variables
        const slideContentValue = slideContent ? slideContent.innerHTML : '';
        const backgroundImgValue = backgroundImg ? backgroundImg.src : '';

        // You can log or use these values as needed
        console.log('Slide Content:', slideContentValue);
        console.log('Background Image:', backgroundImgValue);
      },

      afterEnter(data){
        
    
        
      },
      
      enter(data) {
        // After entering the new page
        const newContent = data.next.container.querySelector('.newcontent');
        
        console.log('New Content:', newContent);
        // Store the new content in a variable
        const newContentValue = newContent ? newContent.innerHTML : '';

        // Use the new content as needed
      }
    }]
  });