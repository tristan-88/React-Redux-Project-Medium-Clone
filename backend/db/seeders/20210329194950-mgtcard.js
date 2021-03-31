'use strict';
const fetch = require('node-fetch')

module.exports = {
  up:  async (queryInterface, Sequelize) => {
    // for (let i = 0; i <= 5; i++){
    //   console.log('this is also working ')
     
    //   for (let j = 0; j <= 99; j++) {
    //    let response = await fetch(`https://api.magicthegathering.io/v1/cards?page=${i}`)
    //  let cardsObj = await response.json();
    //   let mgtCards = [];
    //     console.log('this is working')
    //     mgtCards.push({
		// 			cardName: cardsObj.cards[j].name,
    //       cardImg: `http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${cardsObj.cards[j].multiverseid}&type=card`,
		// 			cardSet: cardsObj.cards[j].set,
    //       cardType: cardsObj.cards[j].type,
		// 			cardColors: cardsObj.cards[j].colors,
    //       cardText: cardsObj.cards[j].text,
		// 			cardId: cardsObj.cards[j].id,
		// 			cardManaCost: cardsObj.cards[j].manaCost,
		// 		});
      
    //   }
    // }
    let mgtCards = [];
     let response = await fetch(
       `https://api.magicthegathering.io/v1/cards`
       );
    let cardsObj = await response.json();
     for (let j = 0; j <= 99; j++) {
     mgtCards.push({
					cardName: cardsObj.cards[j].name,
          cardImg: cardsObj.cards[j].imageUrl,
					cardSet: cardsObj.cards[j].set,
          cardType: cardsObj.cards[j].type,
					cardColors: cardsObj.cards[j].colors,
          cardText: cardsObj.cards[j].text,
					cardId: cardsObj.cards[j].id,
					cardManaCost: cardsObj.cards[j].manaCost,
				});
      }


  return queryInterface.bulkInsert('MgtCards', mgtCards, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete("MgtCards", null, {
			
		});
  }
};
