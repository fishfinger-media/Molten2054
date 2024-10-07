import './styles/style.css'

import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from 'lenis'
import SplitType from 'split-type';
import Swiper from 'swiper';
<<<<<<< HEAD
import { Navigation } from 'swiper/modules';
import * as THREE from 'three';



  const prevideo = document.getElementById('videomain');

  prevideo.load();
=======
import { Navigation, Pagination } from 'swiper/modules';
import Scrambler from 'scrambling-text';

>>>>>>> df2303b744a72c843a86e1e92bf5aed98d191eda


gsap.registerPlugin(Flip,ScrollTrigger);


const lenis = new Lenis()
function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)


const sections = document.querySelectorAll('[gsap-section]');
sections.forEach((section) => {
  const mainText = new SplitType(section.querySelector('[gsap-heading]'), { types: 'words, chars' });
  
  let sectionAnimation = gsap.timeline();

  // Animate the characters of the heading
  sectionAnimation.from(mainText.chars, { opacity: 0, duration: 0.5, stagger: { amount: 2 } })
                  .from(section.querySelector('[gsap-pre]'), { opacity: 0, y: 20, duration: 0.5 }, 0)
                  .from(section.querySelector('[gsap-button]'), { opacity: 0, y: 40, duration: 0.5 }, 0)
                  .from(section.querySelector('.container-lines'), { height: 0, duration: 1 }, 0)


  // Create the ScrollTrigger for the section
  ScrollTrigger.create({
    trigger: section, // Use the current section as the trigger
    start: 'top center', 
    end: 'bottom top',
    animation: sectionAnimation, 
    markers: false,
  });
});




// HOME SWIPER
if (document.querySelector('.swiper.is-homeportfolio')) {

  const swiper = new Swiper('.swiper.is-homeportfolio', {
    
    centeredSlides: true,
    slidesPerView: 'auto',
    spaceBetween: '0%',
    loop: true,
    autoplay: {
      delay: 2000,
    },

    navigation: {
      nextEl: '.swiper-nav.is-next',
      prevEl: '.swiper-nav.is-prev',
    },
    
  });
};

<<<<<<< HEAD
// GSAP ScrollTrigger animation
gsap.from('.portfolio_grid', {
  scale: 1,
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: '.portfolio_grid',
    start: 'top 30%',
    markers: false,
    onEnter: () => {
      // Set a flag to indicate that the ScrollTrigger animation has entered
      items.forEach(item => item.dataset.scrollTriggered = "true");
    },
    onLeaveBack: () => {
      // Reset the flag when the section leaves back
      items.forEach(item => item.dataset.scrollTriggered = "false");
    }
  }
});

const wrapper = document.querySelector('.portfolio_grid-wrapper');
const items = document.querySelectorAll('.portfolio_grid');

// Function to handle mouse movement
function mouseMoveHandler(event) {
  const { clientX, clientY } = event;
  const { left, top } = wrapper.getBoundingClientRect();

  // Calculate the mouse position relative to the wrapper
  const mouseX = clientX - left;
  const mouseY = clientY - top;

  items.forEach(item => {
    const itemRect = item.getBoundingClientRect();
    const itemX = itemRect.left - left + itemRect.width / 2; // Center item
    const itemY = itemRect.top - top + itemRect.height / 2; // Center item

    // Calculate the distance the item should move in the opposite direction
    const deltaX = mouseX - itemX;
    const deltaY = mouseY - itemY;

    // Check if the ScrollTrigger animation has completed
    if (item.dataset.scrollTriggered === "true") {
      // Move the item in the opposite direction with smoothing
      gsap.to(item, {
        x: -deltaX * 0.1, // Negative for opposite direction
        y: -deltaY * 0.05,
        duration: 2, // Increased duration for smoother movement
        ease: "power2.out",
        overwrite: true // Ensure smooth transitions
      });
    }
  });
}

// Add event listeners
wrapper.addEventListener('mousemove', mouseMoveHandler);


gsap.to('.portfolio_grid-wrapper', { 
  scale: 0.8,
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: '.portfolio_grid-wrapper',
    start: 'bottom 50%',
    end: 'bottom 20%',
    scrub: true,
    markers: true,

    } 
  });


  // video

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

soundButton.addEventListener('click', toggleSound);
video.addEventListener('click', togglePlay);
playBtn.addEventListener('click', togglePlay);

document.querySelector('[playvideo]').addEventListener('click', function() {
  

  gsap.to('.popup-overlay_wrapper', {
    display: 'flex',
    opacity: 1,
    duration: 0.5,
  })

  gsap.to('.popup-video_container', {
    scale: 1,
    duration: 0.5,
    ease: "power2.out",
    onComplete: () => {
      tickerGenerator()
  
    }
  })

 
});
=======

>>>>>>> df2303b744a72c843a86e1e92bf5aed98d191eda
