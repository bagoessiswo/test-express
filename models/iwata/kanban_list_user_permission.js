'use strict'

module.exports = (sequelize, DataTypes) => {
  const KanbanListUserPermission = sequelize.define('kanban_list_user_permission', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    kanban_list_user_id: DataTypes.STRING,
    user_id: DataTypes.STRING,
    kanban_permission_id: DataTypes.STRING
  }, {
    timestamps: true,
    paranoid: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  })

  KanbanListUserPermission.associate = (models) => {
    // associations can be defined here

    KanbanListUserPermission.belongsTo(models.kanban_list_user, {
      foreignKey: 'kanban_list_user_id'
    })

    KanbanListUserPermission.belongsTo(models.user, {
      foreignKey: 'user_id'
    })

    KanbanListUserPermission.belongsTo(models.kanban_permission, {
      foreignKey: 'kanban_permission_id'
    })
  }
  return KanbanListUserPermission
}
