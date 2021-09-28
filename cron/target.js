'use strict'
const Promise = require('bluebird')

module.exports = {
  weeklyTarget: () => {
    const CronJob = require('cron').CronJob
    const Models = require('../models/index')
    // const IwataConfig = require('../config/iwata')
    const { Op } = require('sequelize')
    const SalesTarget = Models.sales_target
    const TargetDay = Models.target_day
    const TargetBrand = Models.target_brand
    // const MitrakitaService = require('../services/mitrakita')
    const moment = require('moment')

    const job = new CronJob({
      cronTime: '0 23 * * *', // 0 23 * * *
      onTick: async () => {
        const salesTargets = await SalesTarget.findAll({
          where: {
            is_weekly: 1,
            finished_at: {
              [Op.lt]: moment.utc().format('YYYY-MM-DD 01:00:00')
            }
          }
        })

        if (salesTargets.length > 0) {
          const startedAt = moment.utc().startOf('week').format('YYYY-MM-DD 00:00:00')
          const finishedAt = moment.utc().endOf('week').format('YYYY-MM-DD 23:59:59')
          await Promise.map(salesTargets, async (salesTarget) => {
            const existedTarget = await SalesTarget.findOne({
              where: {
                user_id: salesTarget.user_id,
                finished_at: {
                  [Op.gte]: startedAt
                }
              }
            })

            const baseTarget = await SalesTarget.findOne({
              where: {
                user_id: salesTarget.user_id,
                is_weekly: 1,
                finished_at: {
                  [Op.lte]: startedAt
                },
                is_has_holiday: 0
              },
              order: [
                ['finished_at', 'desc']
              ]
            })

            let targetDays = []
            let targetBrands = []
            if (salesTarget.type === 'visitation') {
              targetDays = await TargetDay.findAll({
                where: {
                  sales_target_id: salesTarget.id
                },
                group: ['day'],
                order: [
                  ['day', 'asc']
                ]
              })
            } else if (salesTarget.type === 'brand') {
              targetBrands = await TargetBrand.findAll({
                where: {
                  sales_target_id: salesTarget.id
                },
                group: ['brand_id']
              })
            }

            baseTarget.setDataValue('target_brands', targetBrands)
            baseTarget.setDataValue('target_days', targetDays)

            if (!existedTarget && baseTarget) {
              const result = await SalesTarget.findOrCreate({
                where: {
                  user_id: salesTarget.user_id,
                  is_weekly: 1,
                  started_at: {
                    [Op.gte]: startedAt
                  },
                  finished_at: {
                    [Op.lte]: finishedAt
                  }
                },
                defaults: {
                  user_id: salesTarget.user_id,
                  started_at: startedAt,
                  finished_at: finishedAt,
                  type: baseTarget.type,
                  is_weekly: 1
                }
              })

              if (result[0]) {
                if (result[0].type === 'visitation') {
                  const mappedTargetDays = await Promise.map(baseTarget.target_days, (target) => {
                    return {
                      day: target.day,
                      total_visitation: target.total_visitation,
                      total_new_order: target.total_new_order,
                      total_repeat_order: target.total_repeat_order,
                      total_omzet_new_order: target.total_omzet_new_order,
                      total_omzet_repeat_order: target.total_omzet_repeat_order,
                      sales_target_id: result[0].id,
                      is_holiday: target.is_holiday
                    }
                  })

                  await TargetDay.destroy({
                    where: {
                      sales_target_id: result[0].id
                    }
                  })
                  await TargetDay.bulkCreate(mappedTargetDays)
                } else if (result[0].type === 'brand') {
                  const mappedTargetBrands = await Promise.map(baseTarget.target_brands, (brand) => {
                    return {
                      brand_id: brand.brand_id,
                      total_omzet: brand.total_omzet,
                      sales_target_id: result[0].id
                    }
                  })

                  await TargetBrand.destroy({
                    where: {
                      sales_target_id: result[0].id
                    }
                  })
                  await TargetBrand.bulkCreate(mappedTargetBrands)
                }
              }
              console.log(startedAt)
              console.log(finishedAt)
            }
          })
        }
      },
      start: false,
      timeZone: 'Asia/Jakarta'
    })

    job.start()
    return function (req, res, next) {
      next()
    }
  }
}
