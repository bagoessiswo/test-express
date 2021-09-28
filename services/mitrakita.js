'use strict'

const Promise = require('bluebird')
const Axios = require('axios')
const moment = require('moment')
const TokenHelper = require('../helpers/token')
module.exports = {
  getAppLinks: (req, sourceId, action) => {
    return new Promise(function (resolve, reject) {
      Axios({
        url: 'https://api.mitrakita.id/v1/application_links',
        method: 'post',
        headers: {
          'X-MitraKita-App': 'iwata-web',
          'X-MitraKita-App-Version': '0.0.1',
          Authorization: TokenHelper.getToken(req)
        },
        data: {
          source_id: sourceId,
          source: 'iwata',
          action: action
        }
      }).then(function (response) {
        if (response.status === 200 || response.status === 201) {
          resolve(response.data)
        } else {
          reject(response.data)
        }
      }).catch(function (error) {
        reject(error)
      })
    })
  },

  getAllTransactions: (req, contactId, type, search, sort, limit, page) => {
    // status, showWillBeDueOnly, showOverdueOnly,
    return new Promise(function (resolve, reject) {
      Axios({
        url: 'https://api.mitrakita.id/v1/transactions',
        method: 'get',
        headers: {
          'X-MitraKita-App': 'iwata-web',
          'X-MitraKita-App-Version': '0.0.1',
          Authorization: TokenHelper.getToken(req)
        },
        params: {
          user_id: contactId,
          type: type,
          // status: status,
          // show_will_be_due_only: showWillBeDueOnly,
          // show_over_due_only: showOverdueOnly,
          search: search,
          sort: sort,
          limit: limit,
          page: page
        }
      }).then(function (response) {
        if (response.status === 200 || response.status === 201) {
          resolve(response.data)
        } else {
          reject(response.data)
        }
      }).catch(function (error) {
        reject(error)
      })
    })
  },

  getSpecificTransaction: (req, transactionId) => {
    return new Promise(function (resolve, reject) {
      Axios({
        url: 'https://api.mitrakita.id/v1/transactions/' + transactionId,
        method: 'get',
        headers: {
          'X-MitraKita-App': 'iwata-web',
          'X-MitraKita-App-Version': '0.0.1',
          Authorization: TokenHelper.getToken(req)
        }
      }).then(async function (response) {
        if (response.status === 200 || response.status === 201) {
          resolve(response.data)
        } else {
          reject(response.data)
        }
      }).catch(function (error) {
        reject(error)
      })
    })
  },

  updateTransactionStatus: (req, transactionId, status) => {
    return new Promise(function (resolve, reject) {
      Axios({
        url: 'https://api.mitrakita.id/v1/transactions/' + transactionId + '/status',
        method: 'get',
        headers: {
          'X-MitraKita-App': 'iwata-web',
          'X-MitraKita-App-Version': '0.0.1',
          Authorization: TokenHelper.getToken(req)
        },
        data: {
          status: status
        }
      }).then(async function (response) {
        if (response.status === 200 || response.status === 201) {
          resolve(response.data)
        } else {
          reject(response.data)
        }
      }).catch(function (error) {
        reject(error)
      })
    })
  },

  getOrders: (req, salesId, startDate, finishDate, limit, page) => {
    return new Promise(function (resolve, reject) {
      Axios({
        url: 'https://api.mitrakita.id/v1/transactions',
        method: 'get',
        headers: {
          'X-MitraKita-App': 'admin-iwata-web',
          'X-MitraKita-App-Version': '0.0.1',
          Authorization: TokenHelper.getToken(req)
        },
        params: {
          employee_id: salesId,
          type: 'invoice',
          from_date: startDate,
          to_date: finishDate,
          define_repeat_order_status: 1,
          limit: limit,
          page: page,
          date_range: 'custom',
          sort: 'transactions.created_at'
        }
      }).then(async function (response) {
        if (response.status === 200 || response.status === 201) {
          const listData = response.data.data
          const orders = []
          const orderTest = []
          let prevDate = ''
          let newOrder = 0
          let repeatOrder = 0
          await Promise.map(listData, (data, index) => {
            if (prevDate !== moment.utc(data.created_at).format('DD-MM-YYYY') && prevDate !== '') {
              orders.push({
                date: prevDate,
                new_order: newOrder,
                repeat_order: repeatOrder
              })
              newOrder = 0
              repeatOrder = 0
              if (data.repeat_order_status === 'new') {
                newOrder++
              } else if (data.repeat_order_status === 'repeat') {
                repeatOrder++
              }

              if (index === response.data.data.length - 1) {
                orders.push({
                  date: moment.utc(data.created_at).format('DD-MM-YYYY'),
                  new_order: newOrder,
                  repeat_order: repeatOrder
                })
              }
            } else if (prevDate === moment.utc(data.created_at).format('DD-MM-YYYY') && index === response.data.data.length - 1) {
              if (data.repeat_order_status === 'new') {
                newOrder++
              } else if (data.repeat_order_status === 'repeat') {
                repeatOrder++
              }
              orders.push({
                date: prevDate,
                new_order: newOrder,
                repeat_order: repeatOrder
              })
            } else {
              if (data.repeat_order_status === 'new') {
                newOrder++
              } else if (data.repeat_order_status === 'repeat') {
                repeatOrder++
              }
            }
            prevDate = moment.utc(data.created_at).format('DD-MM-YYYY')
            orderTest.push({ time: data.created_at, type: data.repeat_order_status })
            return data.created_at
          })
          resolve(orders)
        } else {
          reject(response.data)
        }
      }).catch(function (error) {
        reject(error)
      })
    })
  },

  getAllBrands: (req, limit, page) => {
    return new Promise(function (resolve, reject) {
      Axios({
        url: 'https://api.mitrakita.id/v1/brands',
        method: 'get',
        headers: {
          'X-MitraKita-App': 'admin-iwata-web',
          'X-MitraKita-App-Version': '0.0.1',
          Authorization: TokenHelper.getToken(req)
        },
        params: {
          limit: limit,
          page: page
        }
      }).then(async function (response) {
        if (response.status === 200 || response.status === 201) {
          resolve(response.data)
        } else {
          reject(response.data)
        }
      }).catch(function (error) {
        reject(error)
      })
    })
  },

  getSpecificBrand: (req, brandId) => {
    return new Promise(function (resolve, reject) {
      Axios({
        url: 'https://api.mitrakita.id/v1/brands/' + brandId,
        method: 'get',
        headers: {
          'X-MitraKita-App': 'admin-iwata-web',
          'X-MitraKita-App-Version': '0.0.1',
          Authorization: TokenHelper.getToken(req)
        }
      }).then(async function (response) {
        if (response.status === 200 || response.status === 201) {
          resolve(response.data)
        } else {
          reject(response.data)
        }
      }).catch(function (error) {
        reject(error)
      })
    })
  },

  getAllDeliveries: (req, contactId, status = '', dateRange = 'custom', startDate, finishDate, limit, page) => {
    return new Promise(function (resolve, reject) {
      Axios({
        url: 'https://api.mitrakita.id/v1/deliveries',
        method: 'get',
        headers: {
          'X-MitraKita-App': 'admin-iwata-web',
          'X-MitraKita-App-Version': '0.0.1',
          Authorization: TokenHelper.getToken(req)
        },
        params: {
          source: 'iwata',
          source_id: contactId,
          from_date: startDate,
          to_date: finishDate,
          limit: limit,
          page: page,
          date_range: dateRange
        }
      }).then(async function (response) {
        if (response.status === 200 || response.status === 201) {
          resolve(response.data)
        } else {
          reject(response.data)
        }
      }).catch(function (error) {
        reject(error)
      })
    })
  },

  getSpecificDelivery: (req, deliveryId) => {
    return new Promise(function (resolve, reject) {
      Axios({
        url: 'https://api.mitrakita.id/v1/deliveries/' + deliveryId,
        method: 'get',
        headers: {
          'X-MitraKita-App': 'admin-iwata-web',
          'X-MitraKita-App-Version': '0.0.1',
          Authorization: TokenHelper.getToken(req)
        }
      }).then(async function (response) {
        if (response.status === 200 || response.status === 201) {
          resolve(response.data)
        } else {
          reject(response.data)
        }
      }).catch(function (error) {
        reject(error)
      })
    })
  },

  updateDeliveryStatus: (req, deliveryId, status) => {
    return new Promise(function (resolve, reject) {
      Axios({
        url: 'https://api.mitrakita.id/v1/deliveries/' + deliveryId + '/status',
        method: 'get',
        headers: {
          'X-MitraKita-App': 'admin-iwata-web',
          'X-MitraKita-App-Version': '0.0.1',
          Authorization: TokenHelper.getToken(req)
        },
        data: {
          status: status
        }
      }).then(async function (response) {
        if (response.status === 200 || response.status === 201) {
          resolve(response.data)
        } else {
          reject(response.data)
        }
      }).catch(function (error) {
        reject(error)
      })
    })
  },

  getAllProducts: (req, brandId, status, search, sort, limit, page) => {
    if (limit === 0) {
      limit = 10000
    }
    return new Promise(function (resolve, reject) {
      Axios({
        url: 'https://api.mitrakita.id/v1/products',
        method: 'get',
        headers: {
          'X-MitraKita-App': 'admin-iwata-web',
          'X-MitraKita-App-Version': '0.0.1',
          Authorization: TokenHelper.getToken(req)
        },
        params: {
          brand_id: brandId,
          status: status,
          search: search,
          sort: sort,
          limit: limit,
          page: page
        }
      }).then(async function (response) {
        if (response.status === 200 || response.status === 201) {
          resolve(response.data)
        } else {
          reject(response.data)
        }
      }).catch(function (error) {
        reject(error)
      })
    })
  },

  getSpecificProduct: (req, productId) => {
    return new Promise(function (resolve, reject) {
      Axios({
        url: 'https://api.mitrakita.id/v1/products/' + productId,
        method: 'get',
        headers: {
          'X-MitraKita-App': 'admin-iwata-web',
          'X-MitraKita-App-Version': '0.0.1',
          Authorization: TokenHelper.getToken(req)
        }
      }).then(async function (response) {
        if (response.status === 200 || response.status === 201) {
          resolve(response.data)
        } else {
          reject(response.data)
        }
      }).catch(function (error) {
        reject(error)
      })
    })
  },

  getSpecificProductStock: (req, productId) => {
    return new Promise(function (resolve, reject) {
      Axios({
        url: 'https://api.mitrakita.id/v1/products/' + productId + '/stocks',
        method: 'get',
        headers: {
          'X-MitraKita-App': 'admin-iwata-web',
          'X-MitraKita-App-Version': '0.0.1',
          Authorization: TokenHelper.getToken(req)
        }
      }).then(async function (response) {
        if (response.status === 200 || response.status === 201) {
          resolve(response.data)
        } else {
          reject(response.data)
        }
      }).catch(function (error) {
        reject(error)
      })
    })
  },

  getSummaryByBrandAndDate: (req, salesId, startDate, finishDate, limit, page) => {
    return new Promise(function (resolve, reject) {
      Axios({
        url: 'https://api.mitrakita.id/v1/reports/sales',
        method: 'get',
        headers: {
          'X-MitraKita-App': 'admin-iwata-web',
          'X-MitraKita-App-Version': '0.0.1',
          Authorization: TokenHelper.getToken(req)
        },
        params: {
          employee_id: salesId,
          type: 'summary_by_brand_and_date',
          from_date: startDate,
          to_date: finishDate,
          limit: limit,
          page: page,
          date_range: 'custom'
        }
      }).then(async function (response) {
        if (response.status === 200 || response.status === 201) {
          resolve(response.data)
        } else {
          reject(response.data)
        }
      }).catch(function (error) {
        reject(error)
      })
    })
  },

  getSummaryByBrand: (req, salesId, startDate, finishDate, search = '', limit, page) => {
    return new Promise(function (resolve, reject) {
      Axios({
        url: 'https://api.mitrakita.id/v1/reports/sales',
        method: 'get',
        headers: {
          'X-MitraKita-App': 'admin-iwata-web',
          'X-MitraKita-App-Version': '0.0.1',
          Authorization: TokenHelper.getToken(req)
        },
        params: {
          employee_id: salesId,
          type: 'summary_by_brand',
          from_date: startDate,
          to_date: finishDate,
          limit: limit,
          page: page,
          date_range: 'custom',
          search: search
        }
      }).then(async function (response) {
        // const url = response.request.res.responseUrl
        if (response.status === 200 || response.status === 201) {
          resolve(response.data)
          // resolve({
          //   url: url,
          //   date: startDate,
          //   response: response.data
          // })
        } else {
          reject(response.data)
        }
      }).catch(function (error) {
        reject(error)
      })
    })
  }
}
