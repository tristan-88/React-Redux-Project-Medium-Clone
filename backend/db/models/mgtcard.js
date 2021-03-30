'use strict';
module.exports = (sequelize, DataTypes) => {
  const MgtCard = sequelize.define('MgtCard', {
    cardName: DataTypes.STRING,
    cardImg: DataTypes.STRING,
    cardSet: DataTypes.STRING,
    cardType: DataTypes.STRING,
    cardColors: DataTypes.STRING,
    cardText: DataTypes.TEXT,
    cardId: DataTypes.STRING,
    cardManaCost: DataTypes.STRING
  }, {});
  MgtCard.associate = function(models) {
    MgtCard.hasMany(models.Comment, { foreignKey: "mgtCardId" });
  };
  return MgtCard;
};

			
