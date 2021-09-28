'use strict'
// const Space = require('../../helpers/space')

module.exports = (sequelize, DataTypes) => {
  const KanbanCardMedia = sequelize.define('kanban_card_media', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    media_id: DataTypes.STRING,
    media_src: DataTypes.STRING,
    kanban_card_id: DataTypes.STRING
  }, {
    timestamps: true,
    paranoid: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  })

  KanbanCardMedia.associate = (models) => {
    // associations can be defined here

    KanbanCardMedia.belongsTo(models.kanban_card, {
      foreignKey: 'kanban_card_id'
    })

    KanbanCardMedia.belongsTo(models.media, {
      foreignKey: 'media_id'
    })
  }

  return KanbanCardMedia
}
