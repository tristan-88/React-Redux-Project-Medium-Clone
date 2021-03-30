'use strict';
module.exports = (sequelize, DataTypes) => {
  const AnswerComment = sequelize.define('AnswerComment', {
    answer: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    commentId: DataTypes.INTEGER
  }, {});
  AnswerComment.associate = function(models) {
    AnswerComment.belongsTo(models.User, { foreignKey: "userId" });
    AnswerComment.belongsTo(models.Comment, { foreignKey:"commentId" });
  };
  return AnswerComment;
};