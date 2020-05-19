const sendForm = () => {
  const errorMessage = 'Что-то пошло не так...',
        loadMessage = 'Загрузка...',
        successMessage = `Ваша заявка отправлена.<br>Мы свяжемся с вами в ближайшее время.`,
        form = document.querySelectorAll('form'),
        thanks = document.querySelector('#thanks'),
        statusMessage = thanks.querySelector('p');
  
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
          clearInput(element);
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
    target.reset();
    const popupForm = document.querySelectorAll('.popup');
    for (let i = 0; i < popupForm.length; i++){
      if (popupForm[i].id === 'thanks') {
        popupForm[i].style.display = 'block';
      } else {
        popupForm[i].style.display = 'none';
      }
    }
  };
};
export default sendForm;