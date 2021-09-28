'use strict'

module.exports = (sequelize, DataTypes) => {
  const KanbanListUser = sequelize.define('kanban_list_user', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    user_id: DataTypes.STRING,
    kanban_list_id: DataTypes.STRING,
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

  KanbanListUser.associate = (models) => {
    // associations can be defined here

    KanbanListUser.belongsTo(models.user, {
      foreignKey: 'user_id'
    })

    KanbanListUser.belongsTo(models.kanban_list, {
      foreignKey: 'kanban_list_id'
    })

    KanbanListUser.hasMany(models.kanban_list_user_permission, {
      foreignKey: 'kanban_list_user_id'
    })
  }
  return KanbanListUser
}
