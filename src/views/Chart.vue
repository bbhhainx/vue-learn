<template>
  <div class="flex flex-col gap-6">
    <div class="p-4 bg-white rounded shadow min-h-[400px]">
      <Line :data="lineData" :options="options" />
    </div>
    <div class="p-4 bg-white rounded shadow min-h-[400px]">
      <Bar :data="barData" :options="options" />
    </div>
    <div class="p-4 bg-white rounded shadow min-h-[400px]">
      <Pie :data="pieData" :options="options" />
    </div>
    <!-- <Doughnut :data="doughnutData" :options="options" />
    <Radar :data="radarData" :options="options" /> -->
  </div>
</template>

<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  BarElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  CategoryScale,
  LinearScale,
} from "chart.js";

import { Line, Bar, Pie, Doughnut, Radar } from "vue-chartjs";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  BarElement,
  PointElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  RadialLinearScale
);

const options = {
  responsive: true,
  maintainAspectRatio: false, // quan trọng nếu bạn muốn height tự co
  plugins: {
    legend: { position: "top" },
    title: { display: true, text: "Biểu đồ" },
  },
};

const lineData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#f87979',
      data: [40, 39, 10, 40, 39, 80, 40]
    }
  ]
};

const barData = {
  labels: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#f87979',
      data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
    }
  ]
};

const pieData = {
  labels: ["VueJs", "EmberJs", "ReactJs", "AngularJs"],
  datasets: [
    {
      backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
      data: [40, 20, 80, 10],
    },
  ],
};

const doughnutData = {
  labels: ["A", "B", "C"],
  datasets: [
    {
      label: "Doughnut Chart",
      data: [25, 25, 50],
      backgroundColor: ["#e879f9", "#4ade80", "#60a5fa"],
    },
  ],
};

const radarData = {
  labels: ["Running", "Swimming", "Cycling", "Hiking"],
  datasets: [
    {
      label: "Radar Chart",
      data: [20, 10, 40, 30],
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
    },
  ],
};
</script>
