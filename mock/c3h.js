module.exports = [
  {
    url: '/c3h/product-net/controlled-vars',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: {
          list: [{
            name: 'AI40001',
            desc: '入口MAPD浓度',
            real_value: '1.16',
            set_value: '',
            high_limit: '2.20',
            low_limit: '0.50',
            unit: 'mol%'
          },
          {
            name: 'AI40002',
            desc: '出口MAPD浓度',
            real_value: '234',
            set_value: '',
            high_limit: '2500.00',
            low_limit: '',
            unit: 'mol%'
          },
          {
            name: 'AI40003',
            desc: '入口C3流量',
            real_value: '1.16',
            set_value: '',
            high_limit: '0.10',
            low_limit: '',
            unit: ''
          },
          {
            name: 'AI40004',
            desc: 'C3回流量',
            real_value: '1.16',
            set_value: '',
            high_limit: '2.20',
            low_limit: '0.10',
            unit: ''
          }
          ]
        }
      }
    }
  },
  {
    url: '/c3h/product-net/switch',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: {
          DC_402_total: {
            type: 'success',
            text: 'on'
          },
          DC_402_total_text: 'on'
        }
      }
    }
  }
]
//   {
//     url: '/vue-element-admin/article/detail',
//     type: 'get',
//     response: config => {
//       const { id } = config.query
//       for (const article of List) {
//         if (article.id === +id) {
//           return {
//             code: 20000,
//             data: article
//           }
//         }
//       }
//     }
//   },

//   {
//     url: '/vue-element-admin/article/pv',
//     type: 'get',
//     response: _ => {
//       return {
//         code: 20000,
//         data: {
//           pvData: [
//             { key: 'PC', pv: 1024 },
//             { key: 'mobile', pv: 1024 },
//             { key: 'ios', pv: 1024 },
//             { key: 'android', pv: 1024 }
//           ]
//         }
//       }
//     }
//   },

//   {
//     url: '/vue-element-admin/article/create',
//     type: 'post',
//     response: _ => {
//       return {
//         code: 20000,
//         data: 'success'
//       }
//     }
//   },

//   {
//     url: '/vue-element-admin/article/update',
//     type: 'post',
//     response: _ => {
//       return {
//         code: 20000,
//         data: 'success'
//       }
//     }
//   }
// ]

