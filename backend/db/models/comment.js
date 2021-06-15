'use strict';
module.exports = (sequelize, DataTypes) => {
	const Comment = sequelize.define(
		"Comment",
		{
			content: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					len: [4, 40000],
				},
			},
			userId: DataTypes.INTEGER,
			mgtCardId: DataTypes.INTEGER,
		},
		{}
	);
	Comment.associate = function (models) {
		Comment.belongsTo(models.MgtCard, {
			foreignKey: "mgtCardId"
		});
		Comment.belongsTo(models.User, { foreignKey: "userId" });
		Comment.hasMany(models.AnswerComment, {
			onDelete: 'cascade',
			foreignKey: "commentId",
			hooks: true
		});
	};
	return Comment;
};
