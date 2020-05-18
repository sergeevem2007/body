const slider = () => {
  const slider = document.querySelector('.main-slider'), 
        slide = slider.querySelectorAll('.slide');
  let currentSlide = 0,
      interval;
  const prevSlide = (elem, index, strClass) => {
    elem[index].classList.remove(strClass);
  };
  const nextSlide = (elem, index, strClass) => {
    elem[index].classList.add(strClass);
  };
  const autoPlaySlide = () => {
    prevSlide(slide, currentSlide, 'active');
    currentSlide++;
    if (currentSlide >= slide.length) {
      currentSlide = 0;
    }
    nextSlide(slide, currentSlide, 'active');
  };
  const startSlide = (time) => {
    interval = setInterval(autoPlaySlide, time);
  };
  startSlide(3000);
};

export default slider;