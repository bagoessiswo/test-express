'use strict'

module.exports = (sequelize, DataTypes) => {
  const KanbanCard = sequelize.define('kanban_card', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    cardable: DataTypes.STRING,
    cardable_id: DataTypes.STRING,
    reminder_at: DataTypes.DATE,
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    kanban_list_id: DataTypes.STRING,
    kanban_card_type_id: DataTypes.STRING,
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING,
    position: DataTypes.INTEGER,
    started_at: DataTypes.DATE,
    finished_at: DataTypes.DATE
  }, {
    timestamps: true,
    paranoid: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  })

  KanbanCard.associate = (models) => {
    // associations can be defined here

    KanbanCard.belongsTo(models.user, {
      as: 'creator',
      foreignKey: 'created_by'
    })

    KanbanCard.belongsTo(models.user, {
      as: 'updater',
      foreignKey: 'updated_by'
    })

    KanbanCard.hasMany(models.kanban_card_user, {
      foreignKey: 'kanban_card_id'
    })

    KanbanCard.belongsTo(models.kanban_card_type, {
      foreignKey: 'kanban_card_type_id'
    })

    KanbanCard.belongsTo(models.kanban_list, {
      foreignKey: 'kanban_list_id'
    })

    KanbanCard.hasMany(models.kanban_card_media, {
      foreignKey: 'kanban_card_id'
    })
  }
  return KanbanCard
}
