window.addEventListener('DOMContentLoaded', function(){
  'use strict';

  // все всплывающие элементы
  const toggleItem = () => {
    const clubList = document.querySelector('.clubs-list'),
          clubListItems = clubList.querySelector('ul'),
          gift = document.querySelector('#gift'),
          fixedGift = document.querySelector('.fixed-gift');
    document.addEventListener('click', (event)=>{
      const target = event.target,
            dataSet = target.dataset.popup;
      if (target.closest('.clubs-list') && (!clubListItems.style.display || clubListItems.style.display === 'none')) {
        clubListItems.style.display = 'block';
      } else if (!target.closest('.clubs-list')){
        clubListItems.style.display = 'none';
      }
      if (dataSet) {
        document.querySelector(dataSet).style.display = 'block';
      }
      if (target.closest('.close-form')) {
        target.closest('.popup').style.display = 'none';
      }
      if (target.closest('.fixed-gift')) {
        gift.style.display = 'block';
        fixedGift.style.display = 'none';
      }
      try {
        if (!target.closest('.form-content') ) {
          target.closest('.popup').style.display = 'none';
        } else if (target.closest('.close-btn')) {
          target.closest('.popup').style.display = 'none';
        }
      } catch {
      }
    });
    
  };
  toggleItem();

  // слайдер главной странциы
  const prevSlide = (elem, index, strClass) => {
    elem[index].classList.remove(strClass);
  };
  const nextSlide = (elem, index, strClass) => {
    elem[index].classList.add(strClass);
  };
  
  const slider = () => {
    const slider = document.querySelector('.main-slider'), 
          slide = slider.querySelectorAll('.slide');
    let currentSlide = 0,
        interval;
  
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
  slider();

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
  gallery();

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
  const carusel = new sliderCarusel( {
    main: '#services>.wrapper',
    wrap: '.services-slider',
    next: '.slider-next',
    prev: '.slider-prev',
    infinity : true,
    slidesToShow : 3,
  });
  carusel.init();

  
})