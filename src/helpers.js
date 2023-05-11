import fecha from 'fecha'
import get from 'lodash.get'

const helpers = {
  getNextDate(datesArray, referenceDate) {
    if (typeof datesArray !== 'object') return null
    const now = new Date(referenceDate)
    let closest = Infinity

    datesArray.forEach((d) => {
      const date = new Date(d)

      if (date >= now && date < closest) {
        closest = d
      }
    })

    if (closest === Infinity) {
      return null
    }

    return closest
  },

  nextDateByDayOfWeek(weekDay, referenceDate, i18n) {
    const newReferenceDate = new Date(referenceDate)
    let newWeekDay = weekDay.toLowerCase()
    const daysDefault = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    const translatedDays = [
      get(i18n, 'date.weekdays.sun'),
      get(i18n, 'date.weekdays.mon'),
      get(i18n, 'date.weekdays.tue'),
      get(i18n, 'date.weekdays.wed'),
      get(i18n, 'date.weekdays.thu'),
      get(i18n, 'date.weekdays.fri'),
      get(i18n, 'date.weekdays.sat'),
    ]
    const days = i18n ? translatedDays : daysDefault
    const referenceDateDay = newReferenceDate.getDay()

    for (let i = 7; ; i--) {
      if (newWeekDay === days[i]) {
        newWeekDay = i <= referenceDateDay ? i + 7 : i
        break
      }
    }

    const daysUntilNext = newWeekDay - referenceDateDay

    return newReferenceDate.setDate(newReferenceDate.getDate() + daysUntilNext)
  },

  nextDateByDayOfWeekArray(daysArray, referenceDate, i18n) {
    const tempArray = []

    for (let i = 0; i < daysArray.length; i++) {
      tempArray.push(new Date(this.nextDateByDayOfWeek(daysArray[i], referenceDate, i18n)))
    }

    return this.getNextDate(tempArray, referenceDate)
  },

  countDays(start, end) {
    const oneDay = 24 * 60 * 60 * 1000
    const firstDate = new Date(start)
    const secondDate = new Date(end)

    return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay))
  },

  addDays(date, quantity) {
    const result = new Date(date)

    result.setDate(result.getDate() + quantity)

    return result
  },
  getDayDiff(d1, d2) {
    const t2 = new Date(d2).getTime()
    const t1 = new Date(d1).getTime()
    
    return parseInt((t2 - t1) / (24 * 3600 * 1000), 10)
  },
  checkIsValidDate(date) {
    return date instanceof Date && !isNaN(date)
  },
  getFirstDay(date, firstDayOfWeek) {
    const firstDay = this.getFirstDayOfMonth(date)
    const day = firstDay.getDay()
    let offset = 0

    if (firstDayOfWeek > 0) {
      offset = !day ? -6 : firstDayOfWeek
    }

    return new Date(firstDay.setDate(firstDay.getDate() - (day - offset)))
  },
  getFirstDayOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0)
  },
  getNextMonth(date) {
    let nextMonth
    
    if (date.getMonth() === 11) {
      nextMonth = new Date(date.getFullYear() + 1, 0, 1)
    } else {
      nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1)
    }

    return nextMonth
  },
  getPreviousMonth(date) {
    let prevMonth

    if (date.getMonth() === 0) {
      prevMonth = new Date(date.getFullYear() - 1, 11, 1)
    } else {
      prevMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1)
    }

    return prevMonth
  },
  getMonthDiff(d1, d2) {
    const newD1 = new Date(d1)
    const newD2 = new Date(d2)

    if (!helpers.checkIsValidDate(newD1) || !helpers.checkIsValidDate(newD2)) return null

    const d1Y = newD1.getFullYear()
    const d2Y = newD2.getFullYear()
    const d1M = newD1.getMonth()
    const d2M = newD2.getMonth()

    return d2M + 12 * d2Y - (d1M + 12 * d1Y)
  },
  shortenArrayOfStrings(arr, sLen) {
    const newArr = []

    if (!arr) return null

    for (let i = 0, len = arr.length; i < len; i++) {
      newArr.push(arr[i].substr(0, sLen))
    }

    return newArr
  },
  dateFormatter(date, format) {
    const f = format || 'YYYY-MM-DD'

    try {
      if (date) {
        return fecha.format(new Date(date), f)
      }
    } catch (error) {
      return null
    }

    return null
  },
  compareDay(day1, day2) {
    if (!day1 || !day2) return null

    const date1 = new Date(day1)
    const date2 = new Date(day2)

    if (!helpers.checkIsValidDate(date1) || !helpers.checkIsValidDate(date2)) return null

    const reformatD1 = fecha.format(date1, 'YYYYMMDD')
    const reformatD2 = fecha.format(date2, 'YYYYMMDD')
    
    
    if (reformatD1 > reformatD2) {
      return 1
    }

    if (reformatD1 === reformatD2) {
      return 0
    }

    if (reformatD1 < reformatD2) {
      return -1
    }
  },
}

export default helpers
