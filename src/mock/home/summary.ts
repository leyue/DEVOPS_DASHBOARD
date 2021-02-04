import Mock from 'mockjs'

Mock.mock('https://ucloudcenter.unisoc.com/v1/rsmanager/display/get–number-projects', 'get', {
  code: 0, //0表示success
  data: {
    projectsNumber: 1,
  },
  message: 'string',
})

Mock.mock('https://ucloudcenter.unisoc.com/v1/rsmanager/display/get–number-cases', 'get', {
  code: 0, //0表示success
  data: {
    casesNumber: 2,
  },
  message: 'string',
})

Mock.mock('https://ucloudcenter.unisoc.com/v1/rsmanager/display/get–test-times', 'get', {
  code: 0, //0表示success
  data: {
    testTimes: 3,
  },
  message: 'string',
})

Mock.mock('https://ucloudcenter.unisoc.com/v1/rsmanager/display/get–number-duts', 'get', {
  code: 0, //0表示success
  data: {
    dutsNumber: 4,
  },
  message: 'string',
})

Mock.mock(
  /https:\/\/ucloudcenter.unisoc.com\/v1\/rsmanager\/display\/get–number-resources.*/,
  'get',
  {
    code: 0, //0表示success
    data: {
      resourceNumber: 5,
    },
    message: 'string',
  }
)
