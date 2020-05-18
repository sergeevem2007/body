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

export default toggleMenu;