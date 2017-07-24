/**
 * Created by zzq on 2017/7/24.
 */
export default {
  components: {
    'remote-js': {
      render (createElement) {
        return createElement('script', {attrs: {type: 'text/javascript', src: this.src}})
      },
      props: {
        src: {type: String, required: true}
      }
    }
  }
}
