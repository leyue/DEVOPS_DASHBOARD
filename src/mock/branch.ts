import Mock from 'mockjs'

Mock.mock(/http:\/\/cmverify.unisoc.com:8080\/jenkins\/branch/, 'get', {
  total: 10,
  'row|3': [
    {
      'name|1': [
        'sprdroidr_trunk',
        'sprdroidr_trunk1',
        'sprdroidr_trunk2',
        'sprdroidr_trunk3',
      ],
    },
  ],
})
