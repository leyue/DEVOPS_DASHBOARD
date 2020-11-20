import Vue from 'vue'

Vue.mixin({
  data() {
    return {
      $demo: 'demo',
    }
  },
  created: function() {
    // console.log(this.$data.$demo)
  },
})
