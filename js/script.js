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
      } else {
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
    startSlide(1500);
  }
  slider();

  // class Slider {
  //   constructor({slider, slide}){
  //     this.currentSlide = 0;
  //     this.interval = undefined;
  //   }
  //   prevSlide(elem, index, strClass){
  //     console.log(elem, index, strClass)
  //     elem[index].classList.remove(strClass);
  //   }
  //   nextSlide(elem, index, strClass){
  //     elem[index].classList.add(strClass);
  //   }
  //   autoPlaySlide(){
  //     this.prevSlide()
  //     this.prevSlide(this.slide, this.currentSlide, 'active');
  //     this.currentSlide++;
  //     if (this.currentSlide >= slide.length) {
  //       this.currentSlide = 0;
  //     }
  //     this.nextSlide(this.slide, this.currentSlide, 'active');
  //   }
  //   startSlide(time){
  //     this.interval = setInterval(this.autoPlaySlide, time);
  //     console.log(1)
  //   }
  // }
  // const slider1 = document.querySelector('.main-slider'), 
  //          slide1 = slider1.querySelectorAll('.slide');
  // const mainSlider = new Slider({slider1, slide1});
  // mainSlider.startSlide(1500);
})