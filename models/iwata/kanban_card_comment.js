'use strict'

module.exports = (sequelize, DataTypes) => {
  const KanbanCardComment = sequelize.define('kanban_card_comment', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    user_id: DataTypes.STRING,
    kanban_card_id: DataTypes.STRING,
    content: DataTypes.STRING,
    parent_id: DataTypes.STRING
  }, {
    timestamps: true,
    paranoid: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  })

  KanbanCardComment.associate = (models) => {
    // associations can be defined here

    KanbanCardComment.belongsTo(models.user, {
      foreignKey: 'user_id'
    })

    KanbanCardComment.belongsTo(models.kanban_card, {
      foreignKey: 'kanban_card_id'
    })
  }
  return KanbanCardComment
}
