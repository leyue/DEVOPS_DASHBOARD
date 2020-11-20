import Mock from 'mockjs'
import moment from 'moment'
//  ums9230_1h10_nosec-userdebug-native , ums512_1h10_Natv-userdebug-native, sp9832e_1h10_go2g-userdebug-gms, s9863a1h10_go_Natv-userdebug-gms
Mock.mock(/http:\/\/cmverify.unisoc.com:8080\/jenkins\/node/, 'get', {
  total: 30,
  'node|16': [
    {
      id: 'master-@guid',
      time: moment().format('YYYY.MM.DD-HH:mm:ss'),
      'products|10': [
        {
          id: 'slave-@guid',
          'name|1': [
            'ums9230_1h10_nosec',
            'ums512_1h10_Natv',
            'sp9832e_1h10_go2g',
            's9863a1h10_go_Natv',
          ],
          'status|1': [
            'Build Waiting',
            'Build Syncing',
            'Building',
            'Test Waiting',
            'Testing',
            'Finished',
            'Build Fail',
            'Scan Fail',
            'Test Fail',
            'NA',
          ],
          time: moment().format('YYYY.MM.DD-HH:mm:ss'),
          selected: false,
        },
      ],
    },
  ],
})
