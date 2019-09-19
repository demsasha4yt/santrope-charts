import Api from '@/services/Api'

export default {
  online () {
    return Api().get('api/v1/online/online')
  }
}
