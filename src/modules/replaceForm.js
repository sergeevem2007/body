const replaceForm = () => {
  const allInput = document.querySelectorAll('input');
  for (let i = 0; i < allInput.length; i++){
    if (allInput[i].name === 'name') {
      allInput[i].addEventListener('input', ()=>{
        allInput[i].value = allInput[i].value.replace(/[^\а-яА-Я\s]/g, '');
      });
    } else if (allInput[i].name === 'phone') {
      allInput[i].addEventListener('input', ()=>{
        allInput[i].value = allInput[i].value.replace(/[^\d\s\(\)\-\+]/g, '');
      });
    }
  }
}

export default replaceForm;