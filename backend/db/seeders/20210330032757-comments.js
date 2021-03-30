'use strict';
const faker = require('faker')
const { Random } = require('random-js');
const random = new Random();

module.exports = {
  up: (queryInterface, Sequelize) => {
		/*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
       
        content text
        userId int
        mgtCardsId int

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    let comments = []
    for (let i = 0; i < 100; i++){
      comments.push({
        content: faker.lorem.paragraph(),
        userId: random.integer(1, 3),
        mgtCardId: random.integer(1, 100)
        
      });
    }
    
    
    
    return queryInterface.bulkInsert('Comments', comments, {});
	},

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Comments', null, {});
  }
};
