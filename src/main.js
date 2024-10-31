import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import Lenis from 'lenis';
import barba from '@barba/core';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import SplitType from "split-type";
import { cloneNode, restartWebflow } from '@finsweet/ts-utils';
import {Howl, Howler} from 'howler';

gsap.registerPlugin(Flip, ScrollTrigger, CustomEase);
let bgMusicPlaying = false;
let hasPlayedIntro = false;

setInterval(() => {
  console.log('has intro played:', hasPlayedIntro);
}, 1000);

const music = new Howl({
  src: ['https://cdn.jsdelivr.net/gh/fishfinger-media/Molten2054/src/future.mp3'],
  autoplay: false,
  loop: true,
  volume: 0 
});
function playMusic() {
  music.play();
  music.fade(0, 1, 2000);
  bgMusicPlaying = true;
}

function pauseMusic() {
  music.fade(1, 0, 2000);
  music.pause();
  bgMusicPlaying = false;

}

function toggleMusic(){
  if (bgMusicPlaying) {
    pauseMusic();
    bgMusicPlaying = false;
  } else {
    playMusic();
  }
}

// LENIS
const lenis = new Lenis();
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);


// HOMEPAGE LOADER JS
function homepageLoader() {

  function MainLoaderAnimation() {

    const loader = gsap.timeline();
      loader.to('[data-gsap="enter"]', {opacity:0, duration: 1, pointerEvents:'none' });
      loader.to('.loader-text_first', {opacity:0, duration: 2}, 0);
      loader.to('.loader-text_main', {opacity:1, duration: 2}, 0);
      loader.to('.hero_background-circle_wrapper', { opacity:1, duration: 1.5, ease: "power4.inOut" }, 0);
      loader.to('.hero_background-content ', { opacity:1, duration: 1.5, ease: "power4.inOut" }, 0);
      loader.to('.elements-img', {opacity:0, duration: 1.5, ease: "power4.inOut" }, 0);
      loader.to('.loader-shadow', { opacity:0.3, duration: 1, ease: "power4.inOut" }, 0);
      loader.to('.footer', {opacity:1, duration: 1, ease: "power4.inOut" }, 0);
      loader.to('.navigation',{ opacity:1, duration: 1, ease: "power4.inOut" }, 0);
      const originalContainer = document.querySelector('.elements-container');
      const newContainer = document.querySelector('.earth-wrapper');
      const img = document.querySelector('.elements-wrapper');
      const state = Flip.getState(img);
    
      newContainer.appendChild(img);
      Flip.from(state, {
        duration: 1.5,
        ease: "power1.inOut",
        scale: true
      });
  }

  document.querySelector('[data-gsap="enter"]').addEventListener('click', function() {
    MainLoaderAnimation();
    playMusic();
    bgMusicPlaying = true;
    hasPlayedIntro = true;
    // document.body.style.overflow = '';
    // lenis.start();
    homepageJs()
  });

  if (hasPlayedIntro === false) { 
    document.body.style.overflow = 'hidden';
    lenis.stop();
    
  } else {
    MainLoaderAnimation();
  }

}

// HOMEPAGE JS
function homepageJs() {

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
      markers: false,
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

  // Homepage Hero
  if (document.querySelector('.section-home_hero')) {
    const heroExit = gsap.timeline({
      scrollTrigger: {
        trigger: '.section-home_hero',
        start: 'bottom 95%',
        end: 'bottom 10%',
        scrub: true,
        markers: false,
      }
    });

    heroExit.to('.hero_background-circle_wrapper', {
      rotate: 90,
      y: 2000,
      scale: 2.5,
      pointerEvents: 'none',
      opacity: 0,
      duration: 1,
    });

    heroExit.to('.hero_background-earth', {
      y: 2000,
      scale: 2,
      pointerEvents: 'none',
      opacity: 0,
      duration: 1,
    }, 0);

    heroExit.to('.loader-text_wrapper', {
      opacity: 0,
      duration: 0.2,
    }, 0);
  }

  // Homepage Intro Section
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
    });
  
    const introSection = gsap.timeline({
      scrollTrigger: {
        trigger: '.section-home_intro',
        start: 'top 20%',
        markers: false,
        toggleActions: 'play none none reset'
      }
    });
  
    const paragraph = new SplitType('[gsap-heading]', { types: 'words, chars' });
  
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
  }

  // Homepage Video Section
  if (document.querySelector('.section-home_video')) {

      const video = document.getElementById('videomain');
      const timelineWrapper = document.querySelector('.timeline-wrapper');
      const soundButton = document.querySelector('[toggle-volume]');
      const playBtn = document.querySelector('[toggle-play]');
    
      function togglePlay() {
        const method = video.paused ? 'play' : 'pause';
        playBtn.innerText = method === 'play' ? 'Pause' : 'Play';
        video[method]();
      }
    
      function toggleSound() {
        video.muted = !video.muted;
        soundButton.innerText = video.muted ? 'Sound On' : 'Sound Off';
      }
    
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
            if (distance < 10) scaleY = 2;
            else if (distance < 20) scaleY = 1.5;
            else if (distance < 30) scaleY = 1.2;
            else if (distance < 40) scaleY = 1.1;
            else scaleY = 1;
    
            gsap.to(ticker, {
              scaleY: scaleY,
              duration: 0.5,
              transformOrigin: "bottom"
            });
          });
        }
    
        function resetTickers() {
          tickers.forEach((ticker) => {
            gsap.to(ticker, { scaleY: 1, duration: 0.5, transformOrigin: "bottom" });
          });
        }
    
        timelineWrapper.addEventListener('mousemove', handleMouseMove);
        timelineWrapper.addEventListener('mouseleave', resetTickers);
    
        video.addEventListener('timeupdate', () => {
          const progress = video.currentTime / video.duration;
          const tickersToHighlight = Math.floor(progress * tickers.length);
    
          tickers.forEach((ticker, index) => {
            ticker.style.backgroundColor = index < tickersToHighlight ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.3)';
          });
        });
    
        timelineWrapper.addEventListener('click', (event) => {
          const rect = timelineWrapper.getBoundingClientRect();
          const clickPosition = event.clientX - rect.left;
          const clickPercentage = clickPosition / rect.width;
          video.currentTime = clickPercentage * video.duration;
        });
      }
    
      function tickerGenerator() {
        const containerWidth = timelineWrapper.offsetWidth;
        const totalTickerSpace = 1 + 8;
        const numberOfTickers = Math.floor(containerWidth / totalTickerSpace);
    
        for (let i = 1; i <= numberOfTickers; i++) {
          const ticker = document.createElement('div');
          ticker.classList.add('ticker');
          timelineWrapper.appendChild(ticker);
        }
    
        videoPlayer();
      }
    
      setTimeout(tickerGenerator, 1000);
      soundButton.addEventListener('click', toggleSound);
      video.addEventListener('click', togglePlay);
      playBtn.addEventListener('click', togglePlay);
    
   

    gsap.set('.home-video_wrapper', {opacity:0, scale:0.8, });
    gsap.set('.player-control_wrapper', {opacity:0, y:50});

    const videoEnter = gsap.timeline({
   
      scrollTrigger: {
        trigger: '.section-home_video',
        start: 'top 80%',
        end: 'top 0%',
        markers: false, 
        scrub: true,
        toggleActions: 'play none none reverse',

      }
    });
    
    videoEnter.to('.page-wrapper', { background: 'rgba(0, 0, 0, 1)', duration: 1, ease: 'power4.inOut' });
    videoEnter.to('.navigation', { opacity: 0, duration: 1, ease: 'power4.inOut' }, 0);
    videoEnter.to('.footer', { opacity: 0, duration: 1, ease: 'power4.inOut'}, 0);
    videoEnter.to('.home-video_wrapper', { opacity:1, scale:1, duration: 1, ease: 'power4.inOut' }, );
    videoEnter.to('.player-control_wrapper', { opacity:1, y:0, duration: 1, ease: 'power4.inOut', onComplete: () => { togglePlay(); toggleMusic() }  },0 );
    
    const videoExit = gsap.timeline({
      scrollTrigger: {
        trigger: '.section-home_video',
        start: 'bottom 80%',
        end: 'top 10%',
        toggleActions: 'play none none reverse',
      }
    })

    videoExit.to('.player-control_wrapper', { y:50, opacity:0, duration: 1, ease: 'power4.inOut' });
    videoExit.to('.home-video_wrapper', { scale:0.8, opacity:0, duration: 1, ease: 'power4.inOut' }, 0);
    videoExit.to('.navigation', {opacity: 1, duration: 1, ease: 'power4.inOut' });
    videoExit.to('.footer', { opacity: 1, duration: 1, ease: 'power4.inOut' }, 0);
    videoExit.to('.page-wrapper', { background: 'rgba(0,0,0,0)', duration: 1, ease: 'power4.inOut', onComplete: () => { togglePlay(); toggleMusic() }, }, 0);

  }

  // Homepage Portfolio Grid Section
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
      
      gsap.to(portfolioGrid, { x: offsetX, y: offsetY, duration: 3, ease: "sine" });
    });
  
    gsap.from('.portfolio-grid_wrapper', {
      opacity: 0, scale: 0.8, duration: 1.5,
      ease: CustomEase.create("custom", "M0,0 C0,0.05 0.25,1 1,1 "),
      scrollTrigger: {
        trigger: '.portfolio-grid_wrapper',
        start: 'top 60%',
        end: 'bottom 40%',
        markers: false,
        toggleActions: 'play reverse play reverse',
      }
    });
  
    const portfolioGridSection = gsap.timeline({
      scrollTrigger: {
        trigger: '.portfolio-grid_wrapper',
        start: 'top 60%',
        end: 'bottom 40%',
        markers: false,
      }
    });
  
    portfolioGridSection.from('.section-home_portfolio-grid h2', { opacity: 0, y: 50 });
    
    const portfolioGridText = new SplitType('.section-home_portfolio-grid p', { types: 'words,chars' });
    portfolioGridSection.from(portfolioGridText.chars, {
      opacity: 0, y: 50,
      stagger: { amount: 0.5 },
      ease: "power4.inOut",
    });
  }

  // Homepage Swiper Section
  if (document.querySelector('.swiper')) {
    const swiper = new Swiper('.swiper', {
      modules: [Navigation], 

      
      centeredSlides: true,
      slidesPerView: 'auto',
      allowTouchMove: false,
      speed: 900,
      spaceBetween: '0',
      loop: true,
      navigation: {
        nextEl: '.swiper-nav.is-next',
        prevEl: '.swiper-nav.is-prev',
      },
    });
  
    swiper.init();
    gsap.set('.swiper-slide-active', { scale: 1 });
  
    const firstActiveSlide = document.querySelector('.swiper-slide-active');
    const firstSlideBgImg = firstActiveSlide.querySelector('.background-img');
    if (firstSlideBgImg) firstSlideBgImg.setAttribute('data-barba-img', '');
  
    swiper.on('slideChangeTransitionStart', () => {
      gsap.to('.swiper-slide-active', { scale: 1, duration: 0.8, ease: "power4.inOut" });
      gsap.to('.swiper-slide:not(.swiper-slide-active)', { scale: 0.7, duration: 0.8, ease: "power4.inOut" });
  
      const activeSlide = document.querySelector('.swiper-slide-active');
      const companyName = activeSlide.getAttribute('data-company');
      document.getElementById('company').textContent = companyName;
  
      document.querySelectorAll('.background-img').forEach(img => img.removeAttribute('data-barba-img'));
  
      const activeSlideBgImg = activeSlide.querySelector('.background-img');
      if (activeSlideBgImg) activeSlideBgImg.setAttribute('data-barba-img', '');
    });
  
    const swiperGsap = gsap.timeline({
      scrollTrigger: {
        trigger: '.section_home-slider',
        start: 'top 70%',
        end: 'bottom 30%',
        markers: false,
        toggleActions: 'play reverse play reverse',
      }
    });
  
    swiperGsap.from('.swiper', { y: 150, scale: 0.8, opacity: 0, duration: 1, ease: "power4.inOut" });
    swiperGsap.from('.swiper-slide-prev', { x: '40%', duration: 0.5 }, 0.4);
    swiperGsap.from('.swiper-slide-next', { x: '-40%', duration: 0.5 }, 0.4);
  }


  navLogoFlip()
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


barba.init({
  transitions: [
    {
      name: 'portfolio-transition',
      sync: true,
      debug: true,
      logLevel: 'error',
      from: { namespace: ['home'] },
      to: { namespace: ['portfolio'] },

      // Called after the entering page is rendered
      async enter(data) {
        data.next.container.classList.add('is-transitioning');
        const currentImg = data.current.container.querySelector('video[data-barba-img]');
        const newImg = data.next.container.querySelector('.background-img');

        if (!currentImg || !newImg) {
          console.error('Image not found during transition');
          return;
        }
        
        const currentImgParent = currentImg.parentElement;
        const newImgParent = newImg.parentElement;
        const state = Flip.getState(currentImg);
        
        newImg.remove();
        newImgParent.appendChild(currentImg);
        
        await Flip.from(state, { duration: 0.8, ease: "circ.inOut" });
        data.next.container.classList.remove('is-transitioning');
        window.scrollTo(0, 0);

        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        ScrollTrigger.refresh();
      },
    },

    {
      name: 'home-transition',
      sync: true,
      debug: true,
      logLevel: 'error',
      from: { namespace: ['portfolio'] },
      to: { namespace: ['home'] },

      leave(data) {
        return gsap.to(data.current.container, {
          opacity: 0
        });
      },

      enter(data) {
        // Instead of animating, do a hard refresh
        window.location.reload();
      }
    }
  ],

  views: [
    {
      namespace: 'home',
      beforeEnter() {
        console.log("lenis destroyed");
        homepageLoader();
        homepageJs();
      },
      enter(data) {},
      afterEnter() {
        console.log("lenis reinitalised Home");
        console.log(pageLoaded);
      },
    },
    {
      namespace: 'portfolio',
      beforeEnter() {
        lenis.destroy();
        console.log("lenis destroyed");
      },
      afterEnter() {
        runLenis();
        console.log("lenis reinitalised");
      }
    }
  ],
});


