import './styles/style.css'

import { gsap } from "gsap";
    
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(Flip,ScrollTrigger);


const originalContainer = document.querySelector('.hero-elements_wrapper');
const newContainer = document.querySelector('.main-content_earth-container');
const img = document.querySelector('.hero-elements_content');

document.querySelector('[home-hero="button"]').addEventListener('click',()=>{

    const state = Flip.getState(img);

    newContainer.appendChild(img);
    
    Flip.from(state, {
        duration: 1,
        ease: "power1.inOut",
        scale: true
    });

});