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
      } else if (!target.closest('.clubs-list') || (target.matches('p') && clubListItems.style.display === 'block')){
        clubListItems.style.display = 'none';
      }
      if (dataSet && !target.matches('.footer-btn')) {
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
        1: [1999, 2999],
        6: [9900, 14990],
        9: [13900, 21990],
        12: [19900, 24990]
    }
    
    const countSum = () => {
      for (let i = 0; i < cardType.length; i++){
        if (cardType[i].checked === true){
          let currentCard = cardType[i].value;
          for (let j = 0; j < club.length; j++){
            if (club[j].checked === true) {
              let sum = price[currentCard][j];
              if (promo.value === 'ТЕЛО2019'){
                priceTotal.textContent = Math.ceil(sum * 0.7);
              } else {
                priceTotal.textContent = sum;
              }
            }
          }
        }
      }
    }
    cardOrder.addEventListener('click', countSum);  
  }
  calc();

  // появление стрелки вверх
  const arrowUp = () => {
    const toTop = document.querySelector('#totop'),
          header = document.querySelector("header");
    toTop.style.display = 'none';
    window.addEventListener('scroll', ()=>{
      if (window.pageYOffset >= header.clientHeight) {
        toTop.style.display = '';
      } else if (window.pageYOffset < header.clientHeight){
        toTop.style.display = 'none';
      }
    })
  }
  arrowUp();


  // класс валидатор 
  class Validator {
    constructor({element, pattern = {}, method}){
      this.form = element;
      this.pattern = pattern;
      this.method = method;
      this.elementsForm = [...this.form.elements].filter(item => {
        return  item.tagName.toLowerCase() !== 'button' && 
        item.type !== 'button';
      });
      this.error = new Set();

    }
    init(){
      this.applyStyle();
      this.setPattern();
      this.elementsForm.forEach(elem => elem.addEventListener('change', this.checkIt.bind(this)));
      const button = this.form.querySelector('button');
      button.addEventListener('click', (e) =>{
        this.elementsForm.forEach(elem => this.checkIt({target: elem}));
        if (this.error.size){
          e.preventDefault()
        }
      });
    }
    isValid(elem){
      const validatorMethod = {
        notEmpty(elem) {
          if (elem.value.trim() === ''){
            return false;
          }
          return true;
        },
        checked(elem) {
          if (!elem.checked){
            return false;
          }
          return true;
        },
        pattern(elem, pattern) {
          return pattern.test(elem.value);
        }
      };
      
      if (this.method){
        const method = this.method[elem.name];
        if (method) {
          return method.every( item => validatorMethod[item[0]](elem, this.pattern[item[1]]))
        }
      } else {
        console.warn('Необходимо передать id полей ввода и методы проверки этих полей');
      }
      return true;
    }
    checkIt(event){
      const target = event.target;
      if (this.isValid(target)){
        this.showSuccsess(target);
        this.error.delete(target);
      } else {
        this.showError(target);
        this.error.add(target);
      }
    }
    showError(elem){
      elem.classList.remove('succsess');
      elem.classList.add('error');
      if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')){
        return
      }
      // const errorDiv = document.createElement('div');
      // errorDiv.textContent = 'Ошибка в этом поле';
      // errorDiv.classList.add('validator-error');
      // elem.insertAdjacentElement('afterend', errorDiv);
    }
    showSuccsess(elem){
      elem.classList.remove('error');
      elem.classList.add('succsess');
      if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')){
        elem.nextElementSibling.remove();
      }
    }
    applyStyle(){
      const style = document.createElement('style');
      style.textContent = `
        input.succsess {
          border: 2px solid green !important;
        }
        input.error {
          border: 2px solid red !important;
        }
        .validator-error {
          font-size: 12px;
          font-family: sans-serif;
          color: red;
        }
      `;
      document.head.appendChild(style);
    }
    setPattern(){
      if (!this.pattern.phone){
        this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
      }
      if (!this.pattern.email){
        this.pattern.email = /^\w+@\w+\.\w{2,}$/;
      }
    }
  }

  // init validator 
  const form = document.querySelectorAll('form');
	let formArray = [];
	for (let i = 0; i < form.length; i++) {
		const valid = new Validator({
    element: form[i],
    pattern: {
			user_name: /^[а-яА-Я\s]*$/
		},
    method: {
      'name': [
        ['notEmpty'],
        ['pattern' , 'user_name']
      ],
			'phone': [
        ['notEmpty'],
        ['pattern' , 'phone']
			],
      'personal-data>iput': [
        ['checked']
      ]
    }
	});
	formArray.push(valid);
	formArray[i].init();
  };
  
  // проверка выбора клуба
  const chooseClub = () => {
    const button = document.querySelector('.footer-btn'),
          chooseClub = document.querySelector('.choose-club'),
          errorMessage = chooseClub.querySelector('h5'),
          clubs = chooseClub.querySelectorAll('.club>input');
    button.addEventListener('click', ()=>{
      for (let i = 0; i < clubs.length; i++){
        if (clubs[i].checked){
          errorMessage.textContent = 'Выбрать клуб';
          errorMessage.style.color = '';
          return
        } else {
          errorMessage.textContent = 'Необходимо выбрать клуб';
          errorMessage.style.color = 'red';
        }
      }
    })
    console.log(clubs)
  }
  chooseClub();

  
  //отправка формы
  const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...',
          loadMessage = 'Загрузка...',
          successMessage = `Ваша заявка отправлена.<br>Мы свяжемся с вами в ближайшее время.`,
          form = document.querySelectorAll('form'),
          thanks = document.querySelector('#thanks'),
          statusMessage = thanks.querySelector('p');
    
    // console.log(form)
    for (let element of form) {
      element.addEventListener('submit', (event) =>{
        event.preventDefault();
        thanks.style.display = 'block';
        statusMessage.innerHTML = loadMessage;
        const formData = new FormData(element);
        let body = {};
        for (let value of formData.entries()) {
          body[value[0]] = value[1];
        }
        postData(body)
          .then((response) => {
            if (response.status !== 200) {
              throw new Error('status network not 200');
            }
          })
          .then( () => {
            statusMessage.innerHTML = successMessage;
            // clearInput(element);
            setTimeout( () => {
              thanks.style.display = '';
            }, 5000);
          })
          .catch((error) => {
            statusMessage.innerHTML = errorMessage;
            console.error(error)
          });
      });
    }; 
    const postData = (body) => {
      return fetch('server.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'aplication/json'
        },
        body:JSON.stringify(body)
      });
    };
    const clearInput = (target) => {
      for (let i = 0; i < target.length; i++) {
        target[i].value = '';
      }
    };
  };
  sendForm();
})