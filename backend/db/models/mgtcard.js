"use strict";
module.exports = (sequelize, DataTypes) => {
	const MgtCard = sequelize.define(
		"MgtCard",
		{
			cardName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [2, 1000],
				},
			},
			cardImg: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [2, 4000],
				},
			},
			cardSet: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [2, 1000],
				},
			},
			cardType: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [2, 1000],
				},
			},
			cardColors: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [1, 500],
				},
			},
			cardText: DataTypes.TEXT,
			cardId: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [2, 500],
				},
			},
			cardManaCost: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [2, 500],
				},
			},
		},
		{}
	);
	MgtCard.associate = function (models) {
		MgtCard.hasMany(models.Comment, { foreignKey: "mgtCardId" });
	};
	return MgtCard;
};
