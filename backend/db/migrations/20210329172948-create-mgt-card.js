'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("MgtCards", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			cardName: {
				type: Sequelize.STRING(1000),
				allowNull: false,
			},
			cardImg: {
				type: Sequelize.STRING(4000)
			},
			cardSet: {
				type: Sequelize.STRING(1000),
				allowNull: false,
			},
			cardType: {
				type: Sequelize.STRING(1000),
				allowNull: false,
			},
			cardColors: {
				type: Sequelize.STRING(500),
				allowNull: false,
			},
			cardText: {
				type: Sequelize.TEXT,
			},
			cardId: {
				type: Sequelize.STRING(500),
				allowNull: false,
			},
			cardManaCost: {
				type: Sequelize.STRING(500),
				allowNull: false,
      },
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn("now"),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn("now"),
			},
		});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('MgtCards');
  }
};