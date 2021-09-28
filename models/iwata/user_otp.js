'use strict'

module.exports = (sequelize, DataTypes) => {
  const UserOTP = sequelize.define('user_otp', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    user_id: DataTypes.STRING,
    contact_id: DataTypes.STRING,
    mobile_phone: DataTypes.STRING,
    action: DataTypes.STRING,
    token: DataTypes.STRING,
    key: DataTypes.STRING,
    // is_valid: DataTypes.STRING,
    expires_at: DataTypes.DATE
  }, {
    timestamps: true,
    paranoid: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  })

  UserOTP.associate = (models) => {
    // associations can be defined here

    UserOTP.belongsTo(models.user, {
      foreignKey: 'user_id'
    })

    UserOTP.belongsTo(models.contact, {
      foreignKey: 'contact_id'
    })
  }

  return UserOTP
}
