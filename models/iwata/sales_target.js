'use strict'

module.exports = (sequelize, DataTypes) => {
  const SalesTarget = sequelize.define('sales_target', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    user_id: DataTypes.STRING,
    status: DataTypes.STRING,
    started_at: DataTypes.DATE,
    finished_at: DataTypes.DATE,
    is_weekly: DataTypes.INTEGER,
    is_has_holiday: DataTypes.INTEGER,
    type: DataTypes.STRING
  }, {
    timestamps: true,
    paranoid: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  })

  SalesTarget.associate = (models) => {
    SalesTarget.belongsTo(models.user, {
      foreignKey: 'user_id'
    })

    SalesTarget.hasMany(models.target_day, {
      foreignKey: 'sales_target_id'
    })

    SalesTarget.hasMany(models.target_brand, {
      foreignKey: 'sales_target_id'
    })
  }

  return SalesTarget
}
