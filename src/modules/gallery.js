const gallery = () => {
  const slider = document.querySelector('.gallery-slider'), 
        slide = slider.querySelectorAll('.slide'),
        dots = document.querySelector('.slide-dots');
  let currentSlide = 0;
  for (let i = 0; i < slide.length; i++) {
    let li = document.createElement('li');
    li.classList.add('dot');
    dots.append(li);
  }
  const dot = document.querySelectorAll('.dot');
  dot[0].classList.add('dot-active');
  const prevSlide = (elem, index, strClass) => {
    elem[index].classList.remove(strClass);
  };
  const nextSlide = (elem, index, strClass) => {
    elem[index].classList.add(strClass);
  };    
  slider.addEventListener('click', (event) =>{
    let target = event.target;
    prevSlide(slide, currentSlide, 'active');
    prevSlide(dot, currentSlide, 'dot-active');
    if (target.matches('#arrow-right')) {
      currentSlide++;
    } else if (target.matches('#arrow-left')) {
      currentSlide--;
    } else if (target.matches('.dot')) {
      dot.forEach((elem, index) =>{
        if (elem === target) {
          currentSlide = index;
        }
      });
    }
    if (currentSlide >= slide.length) {
      currentSlide = 0;
    } else if (currentSlide < 0) {
      currentSlide = slide.length - 1;
    }
    nextSlide(slide, currentSlide, 'active');
    nextSlide(dot, currentSlide, 'dot-active');
  });
};

export default gallery;