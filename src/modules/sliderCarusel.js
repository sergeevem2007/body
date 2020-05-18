class sliderCarusel{
  constructor({main, wrap, next, prev, position = 0, slidesToShow = 3, infinity = false}){
    this.main = document.querySelector(main);
    this.wrap = document.querySelector(wrap);
    this.slides = document.querySelector(wrap).children;
    this.next = document.querySelector(next);
    this.prev = document.querySelector(prev);
    this.slidesToShow = slidesToShow;
    this.options = {
      position,
      infinity,
      widthSlide: Math.floor(100 / this.slidesToShow)
    }
  }
  init(){
    this.addClass();
    this.addStyle();
    if (this.prev && this.next){
      this.controlSlider();
    }
  }
  addClass(){
    this.main.classList.add('slider-carusel');
    this.wrap.classList.add('slider-carusel__wrap');
    for (const item of this.slides) {
      item.classList.add('slider-carusel__item');
    }
  }
  addStyle(){
    const style = document.createElement('style');
    style.id = 'sliderCarusel-style';
    style.textContent = `
      .slider-carusel {
        overflow: hidden;
        position: relative;
      }
      .slider-carusel__wrap {
        display: flex;
        transition: transform 0.5s;
        will-change: transform;
      }
      .slider-carusel__item {
        flex: 0 0 ${this.options.widthSlide}%;
        margin: auto;
      }
    `;
    document.head.appendChild(style);
  }
  controlSlider(){
    this.prev.addEventListener('click', this.prevSlider.bind(this));
    this.next.addEventListener('click', this.nextSlider.bind(this));
  }
  prevSlider(){
    if (this.options.infinity || this.options.position > 0){
      --this.options.position;
      if (this.options.position < 0) {
        this.options.position = this.slides.length - this.slidesToShow;
      }
      this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
    }
  }
  nextSlider(){
    if (this.options.infinity || this.options.position < this.slides.length - this.slidesToShow){
      ++this.options.position;
      if (this.options.position > this.slides.length - this.slidesToShow){
        this.options.position = 0;
      }
      this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
    }
  }
}
export default sliderCarusel;