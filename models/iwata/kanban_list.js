'use strict'

module.exports = (sequelize, DataTypes) => {
  const KanbanList = sequelize.define('kanban_list', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    kanban_list_category_id: DataTypes.STRING,
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    status: DataTypes.STRING,
    position: DataTypes.INTEGER,
    created_by: DataTypes.STRING
  }, {
    timestamps: true,
    paranoid: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  })

  KanbanList.associate = (models) => {
    // associations can be defined here

    KanbanList.hasMany(models.kanban_card, {
      foreignKey: 'kanban_list_id'
    })

    KanbanList.hasMany(models.kanban_list_user, {
      foreignKey: 'kanban_list_id'
    })

    KanbanList.belongsTo(models.user, {
      as: 'creator',
      foreignKey: 'created_by'
    })

    KanbanList.belongsTo(models.kanban_list_category, {
      foreignKey: 'kanban_list_category_id'
    })
  }
  return KanbanList
}
