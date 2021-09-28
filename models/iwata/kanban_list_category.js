'use strict'

module.exports = (sequelize, DataTypes) => {
  const KanbanListCategory = sequelize.define('kanban_list_category', {
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

  KanbanListCategory.associate = (models) => {
    // associations can be defined here

    KanbanListCategory.hasMany(models.kanban_list, {
      foreignKey: 'kanban_list_category_id'
    })
  }
  return KanbanListCategory
}
