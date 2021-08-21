import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import Taro, { getCurrentInstance } from "@tarojs/taro";
import './index.scss'

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  jumpMyPage() {
    // 跳转到目的页面，打开新页面
    Taro.navigateTo({
      url: 'pages/my/index?id=2&type=test'
    })

  }
  render () {
    return (
      <View className='index'>
        <Text onClick={this.jumpMyPage}>Hello world!</Text>
      </View>
    )
  }
}
