import { Component } from 'react'
import { View, Text, Swiper, SwiperItem } from '@tarojs/components'
import Taro, { getCurrentInstance } from "@tarojs/taro";
import './index.scss'
import { SwiperDemo } from "./Swiper"
// import PayDemo from "./PayDemo";
// import PickerDemo1 from "./PickerDemo1"

export default class Index extends Component {
  constructor(props) {
    super(props);
    // this.onPay = this.onPay.bind(this)
    // this.handleClick = this.handleClick.bind(this)
    // this.onCopy = this.onCopy.bind(this)
  }
  componentWillMount () { }

  componentDidMount () {
    console.log('2')
  }

  componentWillUnmount () { }

  componentDidShow () {
    console.log('1')
  }

  componentDidHide () { }

  onPay = () => {
    Taro.requestPayment({
          timeStamp: '',
          nonceStr: '',
          package: '',
          signType: 'MD5',
          paySign: '',
          success: function (res) { },
          fail: function (res) { }
        })
  }

  onCopy = () => {
    console.log('在复制')
    Taro.setClipboardData({
      data: 'data',
      success: function (res) {
        Taro.getClipboardData({
          success: function (res) {
            console.log(res.data) // data
          }
        })
      }
    })
  }

  callUserInfo = () => {


    Taro.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          Taro.getUserInfo({
            success: function(res) {
              console.log(res.userInfo)
            }
          })
        }
      }
    })
  }
  callFace = () => {
    let option = {
      name: '李进',
      idCardNumber: '520202199402104715'
    }
    Taro.startFacialRecognitionVerify(option)
  }
  handleClick = () => {
    console.log('in click')
    // this.callUserInfo()
    this.callFace()
  }

  render () {
    let p = getCurrentInstance().router.params
    console.log('p', p)
    return (
      <View className='index'>
        <Text onClick={this.handleClick}>我的页面</Text>

      </View>
    )
  }
}
