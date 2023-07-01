export default {
  sleep (secs) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, secs)
    })
  },
}
