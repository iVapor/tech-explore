import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'

export default class PayDemo extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  async componentDidMount () {
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  /**
   * sendOrderInfo()
   * @description 提交订单信息，获取支付凭证，唤起支付
   */
  async sendOrderInfo () {
    // 获取临时登录凭证code
    let codeData = await Taro.login()
    // 换取openId
    let openId = ''
    if (codeData.code) {
      let res = await Taro.request({
        // 定义的后端换取openId的接口
        url: 'https://www.justbecoder.com/getLogin',
        data: {
          code: codeData.code
        }
      })
      if (res && res.code === 0) {
        openId = res.openId
      }
    }
    // 发送openId以及对应的商品信息
    let data = await Taro.request({
      url: 'https://www.justbecoder.com/createdOrder',
      data: {
        openId,
        // 实际情况的商品数量
        num: 1,
        // 实际情况的商品Id
        id: 111,
      }
    })
    // code === 0 表示提交订单成功，返回需要的签名信息等
    if (data && data.code === 0) {
      let {
        timeStamp,
        nonceStr,
        prepay_id,
        signType,
        paySign
      } = data.payInfo
      // 唤起支付，按小程序要求格式发送参数
      let payData = await Taro.requestPayment({
        timeStamp,
        nonceStr,
        package: 'prepay_id=' + prepay_id,
        signType,
        paySign
      })
      if (payData && payData.errMsg === 'requestPayment:ok') {
        Taro.showModal({
          title: '操作提示',
          content: '支付成功',
          showCancel: false,
          confirmText: '确定'
        })
      } else {
        Taro.showModal({
          title: '操作提示',
          content: '支付失败，请重新尝试',
          showCancel: false,
          confirmText: '确定'
        })
      }
    }
  }

  render () {
    return (
      <View className='index'>
        <Button onClick={this.sendOrderInfo}>立即下单</Button>
      </View>
    )
  }
}
