export default {
  mSleep(ms: number) {
    return new Promise((resolve: any, reject: any) => {
      setTimeout(() => {
        resolve()
      }, ms)
    })
  },
}
