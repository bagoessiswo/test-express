'use strict'
// const MitrakitaService = require('../../services/mitrakita')

module.exports = (sequelize, DataTypes) => {
  const TargetBrand = sequelize.define('target_brand', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    sales_target_id: DataTypes.STRING,
    brand_id: DataTypes.STRING,
    total_omzet: DataTypes.DECIMAL
    // brand: {
    //   type: DataTypes.VIRTUAL,
    //   async get () {
    //     return await MitrakitaService.getSpecificBrand(this.getDataValue('brand_id'))
    //   }
    // }
  }, {
    timestamps: true,
    paranoid: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  })

  TargetBrand.associate = (models) => {
    TargetBrand.belongsTo(models.sales_target, {
      foreignKey: 'sales_target_id'
    })
  }

  return TargetBrand
}
