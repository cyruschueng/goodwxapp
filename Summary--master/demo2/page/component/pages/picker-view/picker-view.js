// page/component/pages/picker-view/picker-view.js
const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}
for (let i = 1; i <= 12; i++) {
  months.push(i)
}
for (let i = 1; i <= 31; i++) {
  days.push(i)
}

let app = getApp()
Page(Object.assign({
  data: {
    years: years,
    months: months,
    days: days,
  }
}, app.page))