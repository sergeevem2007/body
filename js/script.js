window.addEventListener('DOMContentLoaded', function(){
  'use strict';

  // все всплывающие элементы
  const toggleItem = () => {
    const clubList = document.querySelector('.clubs-list'),
          clubListItems = clubList.querySelector('ul'),
          gift = document.querySelector('#gift'),
          fixedGift = document.querySelector('.fixed-gift'),
          popUpMenu = document.querySelector('.popup-menu');
    document.addEventListener('click', (event)=>{
      const target = event.target,
            dataSet = target.dataset.popup;
      if (target.closest('.clubs-list') && (!clubListItems.style.display || clubListItems.style.display === 'none')) {
        clubListItems.style.display = 'block';
      } else if (!target.closest('.clubs-list') || (target.closest('.clubs-list') && clubListItems.style.display === 'block')){
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
      if (target.closest('.menu-button>img')){
        popUpMenu.style.display = 'flex';
      }
      if (target.closest('.close-menu-btn') || target.closest('.scroll')){
        popUpMenu.style.display = 'none';
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

  // поведение меню
  const toggleMenu = () => {
    const menuButton = document.querySelector('.menu-button'),
          buttonBurgerMenu = menuButton.querySelector('img'),
          topMenu = document.querySelector('.top-menu');
    let screenWidth = screen.width;
    const fixTopMenu = () =>{
      if (window.pageYOffset >= topMenu.clientHeight) {
        topMenu.style.position = 'fixed';
      } else {
        topMenu.style.position = '';
      }
    };
    if (screenWidth <= 767) {
      window.addEventListener('scroll', fixTopMenu);
    } else if (screenWidth > 767){
      window.removeEventListener('scroll', fixTopMenu);
      topMenu.style.position = '';
    }
    window.addEventListener('resize', () =>{
      screenWidth = screen.width;
      if (screenWidth <= 767) {
        menuButton.style.display = 'block';
        window.addEventListener('scroll', fixTopMenu);
      } else if (screenWidth > 767) {
        menuButton.style.display = 'none';
        window.removeEventListener('scroll', fixTopMenu);
        topMenu.style.position = '';
      } 
    });
    
  };
  toggleMenu();
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

  // калькулятор
  const calc = () => {
    const cardOrder = document.querySelector('#card_order'),
          cardType = cardOrder.querySelectorAll('.time>input'),
          club = cardOrder.querySelectorAll('.club>input'),
          promo = cardOrder.querySelector('.input-text>#promo'),
          priceTotal = cardOrder.querySelector('#price-total');
    const price = {
      card_leto_mozaika : [1999, 9900, 13900, 19900],
      card_leto_schelkovo : [2999, 14990, 21990, 24990]
    }
    
    const countSum = () => {
     
      for (let j = 0; j < club.length; j++){
            if (club[j].checked === true) {
            let currentClub = club[j].id;
            console.log(currentClub)
            for (currentClub in price) {
              console.log(price[currentClub][0])
            }
          }
        }
    //   for (let j = 0; j < club.length; j++){
    //     if (club[j].checked === true) {
    //       let currentClub = club[j].id;
    //       if (currentClub === 'card_leto_mozaika') {
    //         for (let i = 0; i < cardType.length; i++){
    //           if (cardType[i].checked === true){
    //             let currentTime = cardType[i].value;
    //             priceTotal.textContent = price.card_leto_mozaika[currentTime];
    //           }
    //         }
    //       } else if (currentClub === 'card_leto_schelkovo'){
    //         for (let i = 0; i < cardType.length; i++){
    //           if (cardType[i].checked === true){
    //             let currentTime = cardType[i].value;
    //             priceTotal.textContent = price.card_leto_schelkovo[currentTime];
    //           }
    //         }
    //       }
    //     }
    //   }      
    //  }
    
  }
  countSum();
    cardOrder.addEventListener('click', countSum);
  console.log(1)
}
  calc();
})