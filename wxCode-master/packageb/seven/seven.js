

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

Page({
  data: {
    years: years,
    year: date.getFullYear(),
    months: months,
    month: 2,
    days: days,
    day: 2,
    value: [2013, 6, 1],
    items: [
      { name: 'a', value: 'a'},
      { name: 'a', value: 'a' },
      { name: 'a', value: 'a', checked: 'true' },
      { name: 'a', value: 'a' },
      { name: 'a', value: 'a' },
      { name: 'a', value: 'a' },
      { name: 'a', value: 'a' },
      { name: 'a', value: 'a' },
    ]
  },
  bindChange(e) {
    console.log(e)
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]]
    })
  },
  radioChange(e ) {
    console.log(e)
  },
  sliderChange(e) {
    console.log(e)
  },
  sliderChanging(e) {
    console.log('d ')
  },
  switch(e) {
    console.log(e)
  }
})