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
export default arrowUp;