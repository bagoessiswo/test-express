'use strict'

module.exports = (sequelize, DataTypes) => {
  const KanbanCardUser = sequelize.define('kanban_card_user', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    user_id: DataTypes.STRING,
    kanban_card_id: DataTypes.STRING,
    assigned_at: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    timestamps: true,
    paranoid: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  })

  KanbanCardUser.associate = (models) => {
    // associations can be defined here

    KanbanCardUser.belongsTo(models.user, {
      foreignKey: 'user_id'
    })

    KanbanCardUser.belongsTo(models.kanban_card, {
      foreignKey: 'kanban_card_id'
    })
  }
  return KanbanCardUser
}
