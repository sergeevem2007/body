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

export default toggleItem;