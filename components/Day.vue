<template>
  <button>
    <div
      :data-testid="isValidDay"
      :data-testvalue="date"
      class="cico__month-day"
      @click.prevent.stop="dayClicked($event, date)"
      :day="date"
      @mouseenter="validDayHovered(date)"
      @mouseleave="validDayHovered(null)"
      :class="[
        beforeFirstValidDate,
        dayBelongToThisMonth,
        isAfterMaxNights,
        isDayNotAvailable,
        isDayInDisabledRange,
        isCheckInDay,
        isSelectionCheckInDay,
        isBeforeMinDate,
        isAfterEndDate,
        isInTheRange,
        isCheckOutDay,
        isADisabledDayOfTheWeek,
        isValidDay,
        hoverIsBeforeCheckIn,
        hoverIsCheckInDay,
        hoverIsInTheRange,
        hoverIsCheckOutDay,
        hoverIsCurrentDay,
      ]"
    >
      <div class="cico__month-day-wrapper">
        <span class="day">{{ dayNumber }}</span>
        <Price :isValidDay="isValidDay" :prices="prices" :date="date" />
      </div>
    </div>
  </button>
</template>

<script>
import fecha from 'fecha'
import get from 'lodash.get'
import Helpers from '../src/helpers'
import Price from './Price.vue'

export default {
  name: 'Day',
  components: {
    Price,
  },

  props: {
    belongsToThisMonth: {
      type: Boolean,
      default: false,
    },
    checkIn: {
      type: Date,
    },
    checkOut: {
      type: Date,
    },
    disabledDates: {
      type: Array,
      default: () => [],
    },
    disabledDateRanges: {
      type: Array,
      default: () => [],
    },
    disabledWeekDays: {
      type: Object,
    },
    date: {
      type: Date,
    },
    hoveringDate: {
      type: Date,
    },
    minNightCount: {
      type: Number,
      default: 0,
    },
    minDate: {
      type: [Date, String],
      default() {
        return new Date()
      },
    },
    maxDate: {
      type: [Date, String, Number],
      default: Infinity,
    },
    maxNights: {
      type: [Number, null],
      default: null,
    },
    prices: {
      type: Array,
    },
    options: {
      type: Object,
    },
  },
  computed: {
    isDayNotAvailable() {
      if (!this.disabledDates) return null

      if (this.disabledDates.find((disabled) => this.compareDay(disabled, this.date) === 0)) {
        return 'disabled__not-available'
      }

      return null
    },

    isDayInDisabledRange() {
      if (!this.disabledDateRanges || !this.disabledDateRanges.length === 0) return null

      let isDayInDisabledRange = null

      this.disabledDateRanges.forEach((range) => {
        if (range.start && !range.end) {
          if (this.compareDay(range.start, this.date) !== 1) {
            isDayInDisabledRange = 'disabled__not-available'

            return
          }
        }

        if (this.compareDay(range.start, range.end) > -1) return

        if (this.compareDay(range.start, this.date) !== this.compareDay(range.end, this.date)) {
          isDayInDisabledRange = 'disabled__not-available'
        }
      })

      return isDayInDisabledRange
    },

    isAfterMaxNights() {
      if (!this.checkIn || typeof this.maxNights !== 'number' || this.checkOut) return null
      const maxNightDate = this.addDays(this.checkIn, this.maxNights)

      if (this.compareDay(this.date, maxNightDate) > 0) return 'disabled__is-after-max-nights'

      return null
    },

    dayNumber() {
      if (!this.date) return null

      return fecha.format(new Date(this.date), 'D')
    },

    isBeforeMinDate() {
      if (this.compareDay(this.date, this.minDate) < 0) return 'disabled__before-min-date'

      return null
    },

    beforeFirstValidDate() {
      if (!this.checkIn || this.checkOut) return null

      const firstValidDate = this.addDays(this.checkIn, this.minNightCount)

      if (this.compareDay(this.date, firstValidDate) < 0) {
        if (this.compareDay(this.checkIn, this.date) < 0) return 'disabled__before-first-valid-date'
      }

      return null
    },

    dayBelongToThisMonth() {
      if (!this.belongsToThisMonth) {
        return 'disabled__from-another-month'
      }

      return null
    },

    hoverIsCurrentDay() {
      if (this.compareDay(this.date, this.hoveringDate) !== 0) return null

      if (this.checkIn && !this.checkOut && this.compareDay(this.date, this.checkIn) === 0) {
        return 'hovering-current-day'
      }

      return null
    },

    hoverIsBeforeCheckIn() {
      if (!this.checkIn || !this.hoveringDate) return null

      if (this.compareDay(this.hoveringDate, this.checkIn) < 0) return 'hover__is-before-check-in'

      return null
    },

    isCheckInDay() {
      if (!this.checkIn) return null
      if (this.compareDay(this.date, this.checkIn) === 0) return 'check-in-date'

      return null
    },

    isSelectionCheckInDay() {
      if (!this.checkIn || this.checkOut) return null
      if (this.compareDay(this.date, this.checkIn) === 0) return 'selection__check-in-date'

      return null
    },

    hoverIsCheckInDay() {
      if (!this.hoveringDate) return null

      if (!this.checkIn || (this.checkIn && this.checkOut))
        if (this.compareDay(this.date, this.hoveringDate) === 0) return 'hover__check-in-date'

      return null
    },

    isCheckOutDay() {
      if (!this.checkOut) return null
      if (this.compareDay(this.date, this.checkOut) === 0) return 'check-out-date'

      return null
    },

    hoverIsCheckOutDay() {
      if (!this.hoveringDate) return null

      if (this.checkIn && !this.checkOut) {
        if (this.compareDay(this.date, this.hoveringDate) === 0) return 'hover__check-out-date'
      }

      return null
    },

    hoverIsInTheRange() {
      if (!this.hoveringDate || !this.checkIn || this.checkOut) return null

      if (this.compareDay(this.checkIn, this.date) < 0) {
        if (this.compareDay(this.date, this.hoveringDate) < 0) return 'hover__is-in-range'
      }

      return null
    },

    isInTheRange() {
      if (!this.checkIn || !this.checkOut) return null

      if (this.compareDay(this.checkIn, this.date) < 0) {
        if (this.compareDay(this.date, this.checkOut) < 0) return 'is-in-range'
      }

      return null
    },

    isAfterEndDate() {
      if (!this.maxDate || this.maxDate === Infinity) return null
      if (this.compareDay(this.date, this.maxDate) === 1) return 'disabled__after-option-end-date'

      return null
    },

    isADisabledDayOfTheWeek() {
      if (this.isADisabledDay) return 'disabled__day-of-the-week'

      return null
    },

    isValidDay() {
      if (
        !this.isADisabledDayOfTheWeek &&
        !this.isCheckOutDay &&
        !this.isBeforeMinDate &&
        !this.isDayNotAvailable &&
        !this.isADisabledDayOfTheWeek &&
        !this.isDayInDisabledRange &&
        !this.isCheckInDay &&
        !this.isAfterEndDate &&
        !this.dayBelongToThisMonth &&
        !this.isAfterMaxNights &&
        !this.beforeFirstValidDate
      )
        return 'is-valid-day'

      return null
    },

    isADisabledDay() {
      if (!this.disabledWeekDays) return null

      const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
      const day = days[this.date.getUTCDay()]

      return this.disabledWeekDays[day]
    },
  },

  methods: {
    ...Helpers,
    get,

    isClickable() {
      if (this.$refs && this.$refs.day) {
        return getComputedStyle(this.$refs.day).pointerEvents !== 'none'
      }

      return true
    },

    dayClicked(event, date) {
      const resetCheckin = false

      if (this.isClickable()) {
        const formatDate = this.dateFormatter(date)

        this.$emit('day-clicked', event, date, formatDate, resetCheckin)
      } else {
        this.$emit('clear-selection')
        this.dayClicked(event, date)
      }
    },

    validDayHovered(date) {
      if (!this.isValidDay || !this.checkIn) {
        this.$emit('valid-day-hovered', null)

        return
      }

      if (this.checkIn && this.checkOut) {
        this.$emit('valid-day-hovered', null)

        return
      }

      if (this.checkIn && this.compareDay(this.checkIn, date) === 1) {
        this.$emit('valid-day-hovered', null)

        return
      }

      this.$emit('valid-day-hovered', date)
    },
  },
}
</script>
