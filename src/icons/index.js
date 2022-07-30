import Vue from 'vue'
// 引入Svgicon 组件
import SvgIcon from '@/components/SvgIcon' // svg component

// register globally
// 全局注册SvgIcon,名svg-icon为组件
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = (requireContext) => requireContext.keys().map(requireContext)
requireAll(req)
