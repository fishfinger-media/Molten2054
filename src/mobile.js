import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from 'lenis';
import { Navigation } from 'swiper/modules';
import SplitType from "split-type";
import {Howl, Howler} from 'howler';
import Plyr from 'plyr';

// Initialize Lenis
const lenis = new Lenis();
// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

gsap.registerPlugin(Flip, ScrollTrigger, CustomEase);

const paragraph = new SplitType('[gsap-heading]', { types: 'words, chars' });

const introSection = gsap.timeline({
  scrollTrigger: {
    trigger: '.section-home_intro',
    start: 'top 20%',
    toggleActions: 'play none none reset',
    onRefresh: self => self.scroll(self.scroll())
  }
});

introSection.from(paragraph.chars, {
  opacity: 0,
  y: 20,
  duration: 0.5,
  stagger: { amount: 0.5 },
 
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

function videoPlyr(){
  const player = new Plyr('#player', {

    fullscreen: {
      enabled: true,
      fallback: true,
      iosNative: true // Enable native iOS fullscreen
    },
        
    controls: [
        'play-large',
        'play',
        'progress',
        'current-time',
        'duration',
        'mute',
        'volume',
        'fullscreen'
    ],
    
    resetOnEnd: true,
    keyboard: { focused: true, global: true },
    tooltips: { controls: true, seek: true },
    quality: {
        default: 1080,
        options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240]
    }
  });
  
  // Event listeners
  player.on('ready', () => {
    console.log('Player is ready');
  });
  
  player.on('play', () => {
    if (musicPlaying  === true) {
      music.pause()
    }
  });
  
  player.on('pause', () => {
    if (musicPlaying  === true) {
      music.play()
    }
  });
  
  player.on('ended', () => {
    console.log('Video ended');
  });
}

videoPlyr()


if (document.querySelector('.portfolio-grid_wrapper')) {
  const portfolioGridWrapper = document.querySelector('.portfolio-grid_wrapper');
  const portfolioGrid = document.querySelector('.portfolio-grid');
  
  portfolioGridWrapper?.addEventListener('mousemove', (e) => {
    const rect = portfolioGridWrapper.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const offsetX = (mouseX - centerX) * 0.05;
    const offsetY = (mouseY - centerY) * 0.05;
    
    gsap.to(portfolioGrid, { x: offsetX, y: offsetY, duration: 3, ease: "sine" });
  });

  gsap.from('.portfolio-grid_wrapper', {
    opacity: 0, 
    scale: 1.2, 
    duration: 1.5,
    ease: CustomEase.create("custom", "M0,0 C0,0.05 0.25,1 1,1 "),
    scrollTrigger: {
      trigger: '.portfolio-grid_wrapper',
      start: 'top 60%',
      end: 'bottom 40%',
      toggleActions: 'play reverse play reverse',
      onRefresh: self => self.scroll(self.scroll())
    }
  });

  const portfolioGridSection = gsap.timeline({
    scrollTrigger: {
      trigger: '.portfolio-grid_wrapper',
      start: 'top 60%',
      end: 'bottom 40%',
      onRefresh: self => self.scroll(self.scroll())
    }
  });

  portfolioGridSection.from('.section-home_portfolio-grid h2', { opacity: 0, y: 50 });
  
  const portfolioGridText = new SplitType('.section-home_portfolio-grid p', { types: 'words,chars' });
  portfolioGridSection.from(portfolioGridText.chars, {
    opacity: 0,
    y: 50,
    stagger: { amount: 0.5 },
    ease: "power4.inOut",
  });
}

if (document.querySelector('.section-home_finalcta')) {
  const footer = gsap.timeline({
    scrollTrigger: {
      trigger: '.section-home_finalcta',
      start: 'top 50%',
      toggleActions: 'play none none reverse',
      onRefresh: self => self.scroll(self.scroll())
    }
  });

  const footerText = new SplitType('.section-home_finalcta h2', { types: 'words,chars' });

  footer.from(footerText.chars, { 
    opacity: 0, 
    y: 20, 
    duration: 0.5, 
    stagger: { amount: 0.5 }, 
    ease: "sine.inOut" 
  });
  footer.from('.section-home_finalcta .text-color_coral', { 
    opacity: 0, 
    y: 50, 
    duration: 1, 
    ease: "sine.inOut" 
  }, 0);
  footer.from('.section-home_finalcta .w-layout-hflex', { 
    opacity: 0, 
    y: 50, 
    duration: 1, 
    ease: "sine.inOut"
  }, 0);
  footer.from('.earth_footer', { 
    rotate: '-40', 
    y: '50%', 
    duration: 3, 
    ease: "sine.inOut" 
  }, "-1");
}

// NAVIGATION JS
function navigationJS() {
  let navbarStatus = false;

  function navStatus() {
    if (!navbarStatus) {
      gsap.set('.nav-menu_wrapper', { opacity: 0 });
      const navOpen = gsap.timeline();
      navOpen.to('#Bottom', { y:'-20', duration:0.5 }, 0);
      navOpen.to('#Top', { y:'20', duration:0.5 }, 0);
      navOpen.to('.nav-menu_wrapper', {display: 'flex', duration: 0})
      navOpen.to('.nav-menu_wrapper', {opacity: 1, duration: 0.5, ease: "power4.inOut" });
      navOpen.from('.nav-menu_shape-wrapper', { opacity: 0, x: '40', rotate: '1', duration: 1 });
      navOpen.from('[data-gsap="nav"]', { opacity: 0, y: '40', duration: 1, stagger: { amount: 0.25 }, ease: "power4.inOut" }, 0.5);
      navOpen.from('.nav-menu_divider', { height: 0, duration: 1, ease: "power4.inOut" }, 0.5);
      navbarStatus = true;
    } else {
      const navClose = gsap.timeline();
      navClose.to('#Bottom', { y:'0', duration:0.5 }, 0);
      navClose.to('#Top', { y:'0', duration:0.5 }, 0);
      navClose.to('.nav-menu_divider', { height: 0, duration: 1, ease: "power4.inOut" }, 0);
      navClose.to('.nav-menu_shape-wrapper', { opacity: 0, x: '40', duration: 1 }, 0);
      navClose.to('[data-gsap="nav"]', { opacity: 0, y: '40', duration: 1, stagger: { amount: 0.25 }, ease: "power4.inOut" }, '0');
      navClose.to('.nav-menu_wrapper', { opacity: 0, duration: 0.5, ease: "power4.inOut", onComplete: () => {
        gsap.set('.nav-menu_wrapper', { display: 'none' });
        gsap.set('[data-gsap="nav"]', { clearProps: "all" });
        gsap.set('.nav-menu_divider', { clearProps: "all" });
        gsap.set('.nav-menu_shape-wrapper', { clearProps: "all" });
      }});
      navbarStatus = false;
    }
  }

  document.querySelector('#nav-btn').addEventListener('click', function () {
  navStatus();
  });

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(navLink => {
  const navText = new SplitType(navLink, { types: 'words, chars' });
  const handleHoverIn = () => {
    gsap.to(navText.chars, { y: '-100%', duration: 1, stagger: { amount: 0.5 }, ease: "power4.inOut" });
  };
  const handleHoverOut = () => {
    gsap.to(navText.chars, { y: '0%', duration: 1, stagger: { amount: 0.5 }, ease: "power4.inOut" });
  };
  navLink.addEventListener('mouseenter', handleHoverIn);
  navLink.addEventListener('mouseleave', handleHoverOut);
  });

  navLinks.forEach(link => {
  link.addEventListener('click', function() {
    navStatus();
  });
  });
}
navigationJS()


function navLogoFlip() {
  const originalNavContainer = document.querySelector('.logo-wrapper');
  const newNavContainer = document.querySelector('.nav-bar_logo-container');
  const navLogo = document.querySelector('.logo.is-hero');
  gsap.set('.logo.is-nav', {display: 'none'});
  
  const navState = Flip.getState(navLogo);
  ScrollTrigger.create({
    trigger: '[data-nav="trigger"]',
    start: 'top 80%',
    end: 'top 20%',
    onEnter: () => {
      newNavContainer.appendChild(navLogo);
      Flip.from(navState, { duration: 0.8, scale: true });
      
    },
    onLeaveBack: () => {
      const reverseState = Flip.getState(navLogo);
      originalNavContainer.appendChild(navLogo);
      Flip.from(reverseState, { duration: 0.8, scale: true });
    }
  });
}

navLogoFlip()


// MUSIC
const music = new Howl({
  src: ['https://cdn.jsdelivr.net/gh/fishfinger-media/Molten2054/src/future.mp3'],
  autoplay: false,
  loop: true,
  volume: 0 
});

function toggleMusic(){
  if (musicPlaying === false) {
    music.play();
    setTimeout(() => {
      music.fade(0, 1, 3000);
    }, 200);
    musicPlaying = true;
    document.getElementById('off-txt').style.opacity = '0.5';
    document.getElementById('on-txt').style.opacity = '1';

  } else {
    music.fade(1, 0, 3000);
    setTimeout(() => {
      music.pause();
    }, 3000);
    musicPlaying = false;
    document.getElementById('off-txt').style.opacity = '1';
    document.getElementById('on-txt').style.opacity = '0.5';
  }
};

document.querySelector('.nav-bar_link.is-music').addEventListener('click', function() {
  toggleMusic()
});
