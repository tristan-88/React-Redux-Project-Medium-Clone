'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    mgtCardId: DataTypes.INTEGER
  }, {});
  Comment.associate = function(models) {
    Comment.belongsTo(models.MgtCard, { foreignKey: "mgtCardId" });
    Comment.belongsTo(models.User, { foreignKey: "userId" });
    Comment.hasMany(models.AnswerComment, { foreignKey:"commentId"});
  };
  return Comment;
};