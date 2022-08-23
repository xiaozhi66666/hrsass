<template>
  <div class="calendar">
    <el-row type="flex" justify="end">
      <el-col :span="6" class="calendarYear">
        <el-select
          v-model="currentYear"
          placeholder="请选择"
          @change="updateCurrentDay"
        >
          <el-option
            v-for="item in years"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option> </el-select
      ></el-col>
      <el-col :span="3">
        <el-select
          v-model="currentMonth"
          placeholder="请选择"
          @change="updateCurrentDay"
        >
          <el-option v-for="item in 12" :key="item" :label="item" :value="item">
          </el-option> </el-select
      ></el-col>
    </el-row>
    <!-- 日历组件 -->
    <el-calendar v-model="currentDay">
      <template v-slot:dateCell="{ date }">
        <div class="cell=box">
          {{ date.getDate() }}
          <span v-if="isWeek(date)">休息</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: "Calendar",
  data() {
    return {
      years: [2019, 2020, 2021, 2022, 2023],
      currentYear: "",
      currentMonth: "",
      currentDay: "",
    };
  },

  created() {
    this.initCalendar();
  },

  methods: {
    initCalendar() {
      const date = new Date();
      this.currentDay = date;
      this.currentYear = date.getFullYear();
      this.currentMonth = date.getMonth() + 1;
      this.years = Array(11)
        .fill(this.currentYear - 5)
        .map((item, index) => item + index);
    },
    isWeek(date) {
      return date.getDay() === 6 || date.getDay() === 0;
    },
    updateCurrentDay() {
      this.currentDay = this.currentYear + "-" + this.currentMonth;
    },
  },
};
</script>

<style lang="scss" scoped>
.calendarYear {
  margin-right: 10px;
}
::v-deep .el-calendar {
  .el-calendar__header {
    display: none;
  }
  .el-calendar-table td {
    border: none;
  }
  //   .current {
  //     border: none;
  //   }
  //   .next {
  //     border: none;
  //   }
  .el-calendar-day {
    text-align: center;
    height: 100%;
    line-height: 85px;
  }
}
</style>
