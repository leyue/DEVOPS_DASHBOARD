const video = {
  namespaced: true,
  state: {
    scenes: [
      {
        name: '实验室',
        selected: true,
        res: {
          logo: require('@/assets/icon/紫光展锐-反白-en.png'),
          text:
            '虚幻引擎是全球最开放、最先进的实时3D创作平台。经过持续的改进，它已经不仅仅是一款殿堂级的游戏引擎，还能为各行各业的专业人士带去无限的创作自由和空前的掌控力。无论是前沿内容、互动体验还是沉浸式虚拟世界，一切尽在虚幻引擎。',
          highlight: 'https://nats-sh.unisoc.com/download/logs/temp/0.mp4',
          full: 'https://nats-sh.unisoc.com/download/logs/temp/0.mp4',
        },
      },
      {
        name: '云测系统',
        selected: false,
        res: {
          logo: require('@/assets/icon/紫光展锐-反白-en.png'),
          text:
            '虚幻引擎是全球最开放、最先进的实时3D创作平台。经过持续的改进，它已经不仅仅是一款殿堂级的游戏引擎，还能为各行各业的专业人士带去无限的创作自由和空前的掌控力。无论是前沿内容、互动体验还是沉浸式虚拟世界，一切尽在虚幻引擎。',
          highlight: 'https://nats-sh.unisoc.com/download/logs/temp/1.mp4',
          full: 'https://nats-sh.unisoc.com/download/logs/temp/0.mp4',
        },
      },
      {
        name: '仪表自动化',
        selected: false,
        res: {
          logo: require('@/assets/icon/紫光展锐-反白-en.png'),
          text:
            '虚幻引擎是全球最开放、最先进的实时3D创作平台。经过持续的改进，它已经不仅仅是一款殿堂级的游戏引擎，还能为各行各业的专业人士带去无限的创作自由和空前的掌控力。无论是前沿内容、互动体验还是沉浸式虚拟世界，一切尽在虚幻引擎。',
          highlight: 'https://nats-sh.unisoc.com/download/logs/temp/0.mp4',
          full: 'https://nats-sh.unisoc.com/download/logs/temp/1.mp4',
        },
      },
      {
        name: '稳定性实验室',
        selected: false,
        res: {
          logo: require('@/assets/icon/紫光展锐-反白-en.png'),
          text:
            '虚幻引擎是全球最开放、最先进的实时3D创作平台。经过持续的改进，它已经不仅仅是一款殿堂级的游戏引擎，还能为各行各业的专业人士带去无限的创作自由和空前的掌控力。无论是前沿内容、互动体验还是沉浸式虚拟世界，一切尽在虚幻引擎。',
          highlight: 'https://nats-sh.unisoc.com/download/logs/temp/1.mp4',
          full: 'https://nats-sh.unisoc.com/download/logs/temp/1.mp4',
        },
      },
      {
        name: '场测介绍',
        selected: false,
        res: {
          logo: require('@/assets/icon/紫光展锐-反白-en.png'),
          text:
            '虚幻引擎是全球最开放、最先进的实时3D创作平台。经过持续的改进，它已经不仅仅是一款殿堂级的游戏引擎，还能为各行各业的专业人士带去无限的创作自由和空前的掌控力。无论是前沿内容、互动体验还是沉浸式虚拟世界，一切尽在虚幻引擎。',
          highlight: 'https://nats-sh.unisoc.com/download/logs/temp/0.mp4',
          full: 'https://nats-sh.unisoc.com/download/logs/temp/0.mp4',
        },
      },
    ],
    currentIdx: 0,
    control: false,
    muted: true,
    pause: false,
  },
  mutations: {
    showControl(state: any) {
      state.timeCnt = 0
      if (state.control) {
        return
      }
      state.control = true
      state.id = setInterval(() => {
        state.timeCnt++
        if (state.timeCnt >= 3) {
          state.control = false
          state.timeCnt = 0
          clearInterval(state.id)
        }
      }, 1000)
    },
    muted(state: any, { muted }: any) {
      state.muted = muted
    },
    pause(state: any, { pause }: any) {
      state.pause = pause
    },
    playNext(state: any) {
      state.scenes.map((item: any) => {
        item.selected = false
      })
      let cnt: number = state.scenes.length
      // debugger
      state.currentIdx = state.currentIdx == cnt - 1 ? 0 : state.currentIdx + 1
      state.scenes[state.currentIdx].selected = true
    },
    playIdx(state: any, { idx }: any) {
      state.scenes.map((item: any) => {
        item.selected = false
      })
      state.currentIdx = idx
      state.scenes[state.currentIdx].selected = true
    },
  },
  actions: {},
  getters: {
    scene(state: any) {
      return state.scenes[state.currentIdx]
    },
  },
}

export { video }
