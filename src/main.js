import './styles/style.css'

import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from 'lenis'
import SplitType from 'split-type';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import Scrambler from 'scrambling-text';



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
    slidesPerView: '1.5',
    loop: true,
    autoplay: {
      delay: 2000,
    },
    
  });
};


