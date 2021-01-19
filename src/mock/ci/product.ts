import Mock from 'mockjs'

Mock.mock(/http:\/\/cmverify.unisoc.com:8080\/jenkins\/product/, 'get', {
  total: 10,
  name: `aosp-master-@cname`,
  'product|10': [
    {
      id: '@guid',
      'name|1': [
        'ums9230_1h10_nosec',
        'ums512_1h10_Natv',
        'sp9832e_1h10_go2g',
        's9863a1h10_go_Natv',
      ],
      'user|1': ['user', 'userDebug'],
    },
  ],
})
