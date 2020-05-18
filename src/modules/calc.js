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
export default calc;