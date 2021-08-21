import { Component } from 'react'
import {Swiper, SwiperItem, Text, View} from "@tarojs/components";
import Taro, { getCurrentInstance } from "@tarojs/taro";

/**
 * 使用 Swiper 组件展示图片
 */
export class SwiperDemo extends Component {
  render () {
    let p = getCurrentInstance().router.params
    console.log('p', p)
    Taro.requestPayment({
      timeStamp: '',
      nonceStr: '',
      package: '',
      signType: 'MD5',
      paySign: '',
      success: function (res) { },
      fail: function (res) { }
    })

    return (

        <Swiper
          className='test-h'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          vertical={false}
          circular
          indicatorDots
        >
          <SwiperItem>
            <View className='sw-style demo-text-1'>1</View>
          </SwiperItem>
          <SwiperItem>
            <View className='sw-style demo-text-2'>2</View>
          </SwiperItem>
          <SwiperItem>
            <View className='sw-style demo-text-3'>3</View>
          </SwiperItem>
        </Swiper>
    )
  }
}
