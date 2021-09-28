'use strict'

module.exports = (sequelize, DataTypes) => {
  const KanbanCardType = sequelize.define('kanban_card_type', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    timestamps: true,
    paranoid: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  })

  KanbanCardType.associate = (models) => {
    // associations can be defined here

    KanbanCardType.hasMany(models.kanban_card, {
      foreignKey: 'kanban_card_type_id'
    })
  }
  return KanbanCardType
}
