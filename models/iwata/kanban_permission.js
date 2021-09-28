'use strict'

module.exports = (sequelize, DataTypes) => {
  const KanbanPermission = sequelize.define('kanban_permission', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    name: DataTypes.STRING,
    slug: DataTypes.STRING
  }, {
    timestamps: true,
    paranoid: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  })

  KanbanPermission.associate = (models) => {
    // associations can be defined here

    KanbanPermission.hasMany(models.kanban_list_user_permission, {
      foreignKey: 'kanban_permission_id'
    })
  }
  return KanbanPermission
}
