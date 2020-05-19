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
      if (e.target.matches('.footer-btn')){
        this.chooseClub(e);
      }
      this.elementsForm.forEach(elem => this.checkIt({target: elem}));
      if (this.error.size){
        e.preventDefault()
      }
    });
  }
  chooseClub(event){
    const target = event.target,
          errorMessage = document.querySelector('.choose-club>h5'),
          clubs = document.querySelectorAll('.choose-club>.club>input');
      for (let i = 0; i < clubs.length; i++){
        if (clubs[i].checked){
          this.showSuccsess(target);
          this.error.delete(target);
          errorMessage.textContent = 'Выбрать клуб';
          errorMessage.style.color = '';
          return
        } else {
          this.showError(target);
          this.error.add(target);
          errorMessage.textContent = 'Необходимо выбрать клуб';
          errorMessage.style.color = 'red';
        }
    }
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
    if (elem.type === 'checkbox' && elem.classList.contains('error')) {
      const style = document.createElement('style');
      style.textContent = `
        p.personal-data label{
          color: red !important;
        }
      }
      `;
      document.head.appendChild(style);
    }
    if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')){
      return
    }
  }
  showSuccsess(elem){
    elem.classList.remove('error');
    elem.classList.add('succsess');
    if (elem.type === 'checkbox' && elem.classList.contains('succsess')) {
      const style = document.createElement('style');
      style.textContent = `
        p.personal-data label{
          color: #fff !important;
        }
      }
      `;
      document.head.appendChild(style);
    }
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
export default Validator;