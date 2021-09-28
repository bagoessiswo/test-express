'use strict'

module.exports = (sequelize, DataTypes) => {
  const UserGeolocation = sequelize.define('user_geolocation', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    user_id: DataTypes.STRING,
    device_id: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    geo_time: DataTypes.DATE
  }, {
    timestamps: true,
    paranoid: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  })

  UserGeolocation.associate = (models) => {
    // associations can be defined here

    UserGeolocation.belongsTo(models.user, {
      foreignKey: 'user_id'
    })
  }

  return UserGeolocation
}
