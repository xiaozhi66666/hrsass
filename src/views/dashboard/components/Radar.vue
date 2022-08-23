<template>
  <div id="radar-container">雷达图</div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {};
  },

  created() {},
  //   在mounted中调用，因为要获取dom元素
  mounted() {
    this.initCharts();
  },

  methods: {
    initCharts() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("radar-container"));
      const performanceOption = {
        title: {
          text: "人员绩效表",
          left: "left",
          textStyle: {
            color: "skyblue",
          },
        },
        legend: {
          right: 0,
          itemGap: 20,
          data: ["张三", "李四"],
          textStyle: {
            color: "red",
            fontSize: 20,
          },
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: "加班", max: 100 },
            { name: "摸鱼", max: 100 },
            { name: "打游戏", max: 100 },
            { name: "团建", max: 100 },
            { name: "bug数量", max: 100 },
            { name: "聊天", max: 100 },
          ],
          splitNumber: 8,
          splitLine: {
            lineStyle: {
              color: [
                "red",
                "blue",
                "yellow",
                "skyblue",
                "#000",
                "blue",
                "yellow",
              ].reverse(),
            },
          },
        },
        series: [
          {
            name: "Budget vs spending",
            type: "radar",
            // itemStyle: {
            //   color: "blue",
            // },
            areaStyle: {
              opacity: 0.6,
            },
            data: [
              {
                value: [70, 60, 50, 70, 70, 90],
                name: "张三",
              },
              {
                value: [30, 60, 70, 30, 20, 10],
                name: "李四",
              },
            ],
          },
        ],
      };
      // 绘制图表
      myChart.setOption(performanceOption);
    },
  },
};
</script>

<style lang="scss" scoped>
// 给echarts设置宽高，否则显示不出来
#radar-container {
  width: 500px;
  height: 500px;
}
</style>
