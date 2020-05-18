'use strict';

  import toggleItem from './modules/toggleItem';
  import toggleMenu from './modules/toggleMenu';
  import slider from './modules/slider';
  import gallery from './modules/gallery';
  import sliderCarusel from './modules/sliderCarusel';
  import calc from './modules/calc';
  import arrowUp from './modules/arrowUp';
  import Validator from './modules/validator';
  import sendForm from './modules/sendForm';
  import replaceForm from './modules/replaceForm';

  // все всплывающие элементы
  toggleItem();
  // поведение меню
  toggleMenu();
  // слайдер главной странциы
  slider();
  // галерея
  gallery();
  // карусель init
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
  calc();
  // появление стрелки вверх
  arrowUp();
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
      'personal-data': [
        ['checked']
      ]
    }
	});
	formArray.push(valid);
	formArray[i].init();
  };
  //отправка формы
  sendForm();
  // запрет ввода в инпуты
  replaceForm();