import { createApp } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, HeatmapChart, BoxplotChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  CalendarComponent,
  VisualMapComponent,
  DataZoomComponent,
} from 'echarts/components'
import App from './App.vue'
import './style.css'

use([
  CanvasRenderer,
  LineChart,
  HeatmapChart,
  BoxplotChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  CalendarComponent,
  VisualMapComponent,
  DataZoomComponent,
])

createApp(App).mount('#app')
