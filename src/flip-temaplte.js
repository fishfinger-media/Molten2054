
const currentImg = document.querySelector('video[data-barba-img]');
const newImg = document.querySelector('#portfolio-content .background-img')

const currentImgParent = currentImg.parentElement;
const newImgParent = newImg.parentElement;
const state = Flip.getState(currentImg);

newImg.remove();
newImgParent.appendChild(currentImg);

Flip.from(state, { duration: 1, ease: "sine.inOut",});
