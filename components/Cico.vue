<template>
  <div class="cico__wrapper cico__root" :ref="`DatePicker-${hash}`">
    <button class="cico__close-button" v-if="isOpen && !isDesktop" @click="mobileActionSelected()">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 68" role="img" aria-label="x">
        <title>x</title>
        <path d="M6.5 6.5l55 55m0-55l-55 55" stroke="#000" fill="none" stroke-linecap="square" />
      </svg>
    </button>
    <div @click="toggleDatepicker()" class="cico__dummy-wrapper">
      <IconCalendar />
      <DateInputs
        :check-in="checkIn"
        :i18n="i18n"
        :isOpen="isOpen"
        :checkinFieldFormat="checkinFieldFormat"
        :checkoutFieldFormat="checkoutFieldFormat"
        :check-out="checkOut"
        :toggleDatepicker="toggleDatepicker"
      />
      <button
        class="cico__clear-button"
        tabindex="0"
        @click="dummyWrapperClearSelection()"
        v-if="showClearSelectionButton"
      >
        <div class="cico__clear-button-inner">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 68" role="img" aria-label="x">
            <title>x</title>
            <path d="M6.5 6.5l55 55m0-55l-55 55" stroke="#000" fill="none" stroke-linecap="square" />
          </svg>
        </div>
      </button>
    </div>
    <div
      class="cico"
      :class="{
        [position]: true,
        'cico--open': isOpen,
        'cico--closed': !isOpen,
      }"
    >
      <div class="cico__inner">
        <slot name="before-call-to-action"></slot>
        <CallToAction
          :minNights="minNights"
          :checkIn="checkIn"
          :checkOut="checkOut"
          :validHoveredDate="validHoveredDate"
          :i18n="i18n"
        />
        <slot name="before-calendar"></slot>
        <div ref="scroller" class="cico__months">
          <div
            v-if="isDesktop"
            :class="{
              cico__header: isDesktop,
            }"
          >
            <button
              type="button"
              class="cico__month-button cico__month-button--prev"
              :class="{ disabled: activeMonthIndex === 0 || animateClass !== null }"
              @click="renderPreviousMonth"
              @keyup.enter.stop.prevent="renderPreviousMonth"
              :tabindex="isOpen ? 0 : -1"
              :disabled="activeMonthIndex === 0"
            >
              <svg width="10" height="20" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1.5 11L6.5 6L1.5 1"
                  stroke="#909090"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              class="cico__month-button cico__month-button--next"
              :class="{ disabled: animateClass !== null }"
              @click="renderNextMonth"
              @keyup.enter.stop.prevent="renderNextMonth"
              :disabled="isPreventedMaxMonth"
              :tabindex="isOpen ? 0 : -1"
            >
              <svg width="10" height="20" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1.5 11L6.5 6L1.5 1"
                  stroke="#909090"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
          <div class="cico__months-wrapper">
            <Month
              v-for="(month, monthIndex) in paginateMonths"
              :key="`${datepickerMonthKey}-${monthIndex}-desktop`"
              ref="months"
              :month="month"
              :class="animateClass"
              :dayKey="datepickerDayKey"
              :weekKey="datepickerWeekKey"
              :firstDayOfWeek="firstDayOfWeek"
              :checkIn="checkIn"
              :checkOut="checkOut"
              :hoveringDate="hoveringDate"
              :i18n="i18n"
              :prices="prices"
              :minDate="minDate"
              :maxDate="maxDate"
              :minNightCount="minNights"
              :maxNights="maxNights"
              :disabledWeekDays="disabledWeekDays"
              :disabledDates="disabledDates"
              :disabledDateRanges="disabledDateRanges"
              @clear-selection="clearSelection"
              @day-clicked="handleDayClick"
              @valid-day-hovered="validDayHovered"
              @enter-day="enterDay"
              @enter-month="enterMonth"
            />
          </div>
        </div>
        <slot name="after-calendar"></slot>
        <MobileActions
          @reset="clearSelection()"
          @selected="mobileActionSelected()"
          :displayClearButton="displayClearButton"
          :isClearDisabled="!(checkIn || checkOut)"
          :isSelectDisabled="!checkIn || !checkOut"
          :i18n="i18n"
          v-if="!isDesktop"
        />
      </div>
    </div>
  </div>
</template>

<script>
import fecha from 'fecha'
import get from 'lodash.get'
import Month from './Month.vue'
import MobileActions from './MobileActions.vue'
import IconCalendar from './icons/IconCalendar.vue'
import DateInputs from './DateInputs.vue'
import CallToAction from './CallToAction.vue'
import Helpers from '../src/helpers'
// eslint-disable-next-line import/no-named-as-default
import i18nDefaults from '../public/i18n/en'

export default {
  name: 'Cico',
  components: {
    Month,
    CallToAction,
    MobileActions,
    IconCalendar,
    DateInputs,
  },
  props: {
    checkInDate: {
      type: [Date, null],
      default: null,
    },

    checkOutDate: {
      type: [Date, null],
      default: null,
    },

    closeOnClickOutside: {
      type: Boolean,
      default: true,
    },

    disabledDates: {
      type: Array,
      default() {
        return []
      },
    },

    disabledDateRanges: {
      type: Array,
      default() {
        return []
      },
    },

    disabledDaysOfWeek: {
      type: Array,
      default() {
        return []
      },
    },

    prices: {
      type: Array,
    },

    displayClearButton: {
      type: Boolean,
      default: true,
    },

    eventFormat: {
      type: String,
      default: 'YYYY-MM-DD',
    },

    checkinFieldFormat: {
      type: String,
    },

    checkoutFieldFormat: {
      type: String,
    },

    i18n: {
      type: Object,
      default: () => i18nDefaults,
    },

    minDate: {
      type: [Date, String],
      default() {
        return Helpers.addDays(new Date(), 1)
      },
    },

    maxDate: {
      type: [Date, String, Number],
      default() {
        return Helpers.addDays(new Date(), 324)
      },
    },

    maxNights: {
      type: [Number, null],
      default: null,
    },

    minNights: {
      type: Number,
      default: 1,
    },

    position: {
      type: String,
      default: 'bottom',
    },
  },

  data() {
    return {
      activeMonthIndex: 0,
      animateClass: null,
      checkIn: this.checkInDate,
      checkInMinNights: [],
      checkOut: this.checkOutDate,
      datepickerDayKey: 0,
      firstDayOfWeek: 1,
      datepickerMonthKey: 0,
      datepickerWeekKey: 0,
      dynamicNightCounts: null,
      hash: Date.now(),
      hoveringDate: null,
      validHoveredDate: null,
      months: [],
      open: false,
      windowWidth: window.innerWidth,
    }
  },
  computed: {
    isOpen: {
      get() {
        return this.open
      },
      set(open) {
        this.open = open
      },
    },

    weekdays() {
      return [
        this.get(this.i18n, 'date.weekdays.sun'),
        this.get(this.i18n, 'date.weekdays.mon'),
        this.get(this.i18n, 'date.weekdays.tue'),
        this.get(this.i18n, 'date.weekdays.wed'),
        this.get(this.i18n, 'date.weekdays.thu'),
        this.get(this.i18n, 'date.weekdays.fri'),
        this.get(this.i18n, 'date.weekdays.sat'),
      ]
    },

    monthNames() {
      return Object.values(this.get(this.i18n, 'date.months'))
    },

    weekdaysShort() {
      return [
        this.get(this.i18n, 'date.weekdays.short.sun'),
        this.get(this.i18n, 'date.weekdays.short.mon'),
        this.get(this.i18n, 'date.weekdays.short.tue'),
        this.get(this.i18n, 'date.weekdays.short.wed'),
        this.get(this.i18n, 'date.weekdays.short.thu'),
        this.get(this.i18n, 'date.weekdays.short.fri'),
        this.get(this.i18n, 'date.weekdays.short.sat'),
      ]
    },

    paginateMonths() {
      const months = []

      if (this.isDesktop) {
        for (let i = 0; i < this.numberOfMonths; i++) {
          months.push(this.months[this.activeMonthIndex + i])
        }
      } else {
        this.months.forEach((el) => {
          months.push(el)
        })
      }

      return months
    },

    isPreventedMaxMonth() {
      const lastIndexMonthAvailable = this.getMonthDiff(this.minDate, this.maxDate)

      return this.activeMonthIndex >= lastIndexMonthAvailable - 1
    },

    showClearSelectionButton() {
      return Boolean((this.checkIn || this.checkOut) && this.displayClearButton)
    },

    disabledWeekDays() {
      const disabledDays = this.disabledDaysOfWeek.map((d) => d.toLowerCase())
      const names = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
      const SUNDAY = names[0]
      const MONDAY = names[1]
      const TUESDAY = names[2]
      const WEDNESDAY = names[3]
      const THURSDAY = names[4]
      const FRIDAY = names[5]
      const SATURDAY = names[6]
      // The order of _default is important!
      const disabledWeekDays = {
        sunday: disabledDays.includes(SUNDAY),
        monday: disabledDays.includes(MONDAY),
        tuesday: disabledDays.includes(TUESDAY),
        wednesday: disabledDays.includes(WEDNESDAY),
        thursday: disabledDays.includes(THURSDAY),
        friday: disabledDays.includes(FRIDAY),
        saturday: disabledDays.includes(SATURDAY),
      }

      return disabledWeekDays
    },

    disabledWeekDaysArray() {
      const days = this.disabledWeekDaysObject

      const fn = function fnDisabledWeekDaysArray(day, ix) {
        return day[1] ? this.weekdays[ix] : false
      }

      return Object.entries(days)
        .map(fn)
        .filter((v) => v)
    },

    numberOfMonths() {
      if (this.isDesktop) return 4

      return 12
    },

    isDesktop() {
      return this.windowWidth > 767
    },
  },
  watch: {
    checkIn(newDate) {
      this.$emit('check-in-selected', this.dateFormatter(newDate, this.eventFormat))

      this.reRender()
    },

    checkOut(newDate) {
      if (this.checkOut !== null) {
        this.hoveringDate = null
        this.reRender()
      }

      this.$emit('check-out-selected', this.dateFormatter(newDate, this.eventFormat))
      this.reRender()
    },

    firstDayOfWeek() {
      const startDate = new Date(this.minDate)
      const offset = this.numberOfMonths + this.activeMonthIndex

      this.generateInitialMonths()

      for (let i = this.numberOfMonths; i < offset; i++) {
        this.createMonth(new Date(startDate.getFullYear(), startDate.getMonth() + i, 1))
      }

      this.reRender()
    },

    checkInDate(date) {
      this.setCheckIn(date)
    },

    checkOutDate(date) {
      this.setCheckOut(date)
    },

    i18n() {
      this.configureI18n()
    },

    disabledDates: {
      handler() {
        this.disabledDateIsCheckIn()
        this.disabledDateIsCheckOut()
        this.reRender()
      },
      deep: true,
    },
  },

  created() {
    this.emitInterface()
    this.configureI18n()
    this.generateInitialMonths()
  },

  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.handleResize)
    })

    document.addEventListener('click', this.handleClickOutside, false)
    document.addEventListener('keyup', this.escFunction, false)
  },

  unmounted() {
    window.removeEventListener('resize', this.handleResize)

    document.removeEventListener('keyup', this.escFunction, false)
    document.removeEventListener('click', this.handleClickOutside)
  },

  methods: {
    ...Helpers,
    get,

    emitInterface() {
      this.$emit('interface', {
        showDatepicker: () => this.showDatepicker(),
        hideDatepicker: () => this.hideDatepicker(),
        clearSelection: () => this.clearSelection(),
      })
    },

    handleResize() {
      const { isDesktop } = this

      this.windowWidth = window.innerWidth

      if (isDesktop !== this.isDesktop) {
        this.activeMonthIndex = 0
        this.generateInitialMonths()
      }
    },

    configureI18n() {
      fecha.setGlobalDateI18n({
        dayNames: this.weekdays,
        dayNamesShort: this.shortenArrayOfStrings(this.weekdaysShort, 3),
        monthNames: this.monthNames,
        monthNamesShort: this.shortenArrayOfStrings(this.monthNames, 3),
        amPm: ['am', 'pm'],
        // D is the day of the month, function returns something like...  3rd or 11th
        DoFn(D) {
          return D + ['th', 'st', 'nd', 'rd'][D % 10 > 3 ? 0 : ((D - (D % 10) !== 10) * D) % 10]
        },
      })
    },

    selectCorrectMonth() {
      if (!this.checkIn) {
        this.activeMonthIndex = 0

        return
      }

      const monthDiff = this.getMonthDiff(
        this.get(this.months[this.activeMonthIndex + 1], 'days[15].date'),
        this.checkIn,
      )

      if (typeof monthDiff !== 'number') return

      if (monthDiff > 0) {
        for (let i = 0; i < monthDiff; i++) {
          const firstDayOfLastMonth = this.months[this.months.length - 1].days.filter(
            (day) => day.belongsToThisMonth === true,
          )
          const nextMonth = this.getNextMonth(firstDayOfLastMonth[0].date)

          this.createMonth(nextMonth)
          this.activeMonthIndex++
        }
      } else {
        for (let i = 0; i > monthDiff; i--) {
          this.activeMonthIndex--
        }
      }
    },

    mobileActionSelected() {
      this.isOpen = !this.isOpen
      this.$emit('search-mobile-triggered')
    },

    disabledDateIsCheckIn() {
      if (!this.checkIn) return null

      if (this.disabledDates.find((disabled) => this.compareDay(disabled, this.checkIn) === 0)) {
        this.clearSelection()
      }

      return null
    },

    disabledDateIsCheckOut() {
      if (!this.checkOut) return null

      if (this.disabledDates.find((disabled) => this.compareDay(disabled, this.checkOut) === 0)) {
        const { checkIn } = this

        this.clearSelection()
        this.checkIn = checkIn
      }

      return null
    },

    validDayHovered(date) {
      this.validHoveredDate = date
    },

    generateInitialMonths() {
      this.months = []
      const { minDate } = this
      let date = this.isDesktop ? this.getPreviousMonth(new Date(minDate)) : new Date(minDate)

      for (let i = 0; i < this.numberOfMonths; i++) {
        this.createMonth(date)
        date = this.getNextMonth(new Date(date))
      }
    },

    escFunction(e) {
      const escTouch = 27

      if (e.keyCode === escTouch && this.isOpen && this.checkIn) {
        this.clearSelection()
      }
    },

    formatDate(date) {
      return this.dateFormatter(date, this.eventFormat)
    },

    enterMonth(event, month) {
      this.$emit('enter-month', month)
    },

    enterDay(event, day) {
      this.hoveringDate = day.date
      this.$emit('enter-day', day)
    },

    handleDayClick(event, date, formatDate, resetCheckin) {
      if (this.checkIn && !this.checkOut) {
        if (this.compareDay(this.checkIn, date) >= 0) {
          this.checkIn = null
        }
      }

      if (resetCheckin) {
        this.clearSelection()
        this.$nextTick(() => {
          this.handleDayClick(event, date, formatDate, false)
        })

        return
      }

      this.hoveringDate = null
      this.hoveringDate = date
      this.$emit('day-clicked', this.dateFormatter(date, this.eventFormat))

      if (this.checkIn == null) {
        this.checkIn = date

        return
      }

      if (this.checkIn && !this.checkOut) {
        this.checkOut = date
        this.$emit(
          'period-selected',
          this.dateFormatter(this.checkIn, this.eventFormat),
          this.dateFormatter(this.checkOut, this.eventFormat),
        )

        return
      }

      this.checkOut = null
      this.checkIn = date
    },

    handleClickOutside(event) {
      if (this.closeOnClickOutside === false) return
      const ignoreClickOnMeElement = this.$refs[`DatePicker-${this.hash}`]

      if (ignoreClickOnMeElement) {
        const isClickInsideElement = ignoreClickOnMeElement.contains(event.target)

        if (!isClickInsideElement) {
          this.autofillWithCheckOut()
          this.hideDatepicker()
        }
      }
    },

    autofillWithCheckOut() {
      if (this.get(this.disabledDates, 'length') !== 0) return

      if (this.checkIn && !this.checkOut) {
        this.checkOut = this.addDays(this.checkIn, this.minNights)
      }
    },

    reRender() {
      this.datepickerDayKey += 1
      this.datepickerMonthKey += 1
      this.datepickerWeekKey += 1
    },

    dummyWrapperClearSelection() {
      if (!this.isDesktop) this.$emit('mobile-clear-selection')
      this.clearSelection()
    },

    clearSelection() {
      this.hoveringDate = null
      this.checkIn = null
      this.checkOut = null
      this.reRender()
      this.$emit('clear-selection')
    },

    hideDatepicker() {
      this.isOpen = false
      this.$nextTick(() => {
        this.$emit('cico-closed')
      })
    },

    showDatepicker() {
      this.isOpen = true
      this.adjustScrollOnMobile()
      this.selectCorrectMonth()

      this.$nextTick(() => {
        this.$emit('cico-opened')
      })
    },

    adjustScrollOnMobile() {
      if (this.isDesktop) return
      if (!this.get(this, '$refs.months.length') || !this.get(this, '$refs.scroller')) return

      let scrolled = false

      this.$refs.months.forEach((el) => {
        if (el.monthHasCheckIn === true) {
          // The scrollTop Value is binded to the padding-top value of .cico__month-name
          this.$refs.scroller.scrollTop = el.$el.offsetTop - 86
          scrolled = true
        }
      })

      if (scrolled === false) this.$refs.scroller.scrollTop = 0
    },

    toggleDatepicker() {
      this[this.isOpen ? 'hideDatepicker' : 'showDatepicker']()
    },

    async renderPreviousMonth() {
      await this.handleAnimation('enter-previous-animation')

      if (this.activeMonthIndex >= 1) {
        const firstDayOfLastMonth = this.months[this.activeMonthIndex].days.filter(
          (day) => day.belongsToThisMonth === true,
        )
        const previousMonth = this.getPreviousMonth(firstDayOfLastMonth[0].date)

        this.activeMonthIndex--

        this.$emit('previous-month-rendered', previousMonth)
      }
    },

    async renderNextMonth() {
      await this.handleAnimation('enter-next-animation')

      if (this.activeMonthIndex < this.months.length - this.numberOfMonths) {
        this.activeMonthIndex++

        return
      }

      const firstDayOfLastMonth = this.months[this.months.length - 1].days.filter(
        (day) => day.belongsToThisMonth === true,
      )
      const nextMonth = this.getNextMonth(firstDayOfLastMonth[0].date)

      this.createMonth(nextMonth)
      this.activeMonthIndex++
      this.$emit('next-month-rendered', nextMonth)
    },

    async handleAnimation(elementClass) {
      this.animateClass = elementClass

      await new Promise((resolve) => setTimeout(resolve, 400))

      this.animateClass = null
    },

    setCheckIn(date) {
      this.checkIn = date
    },

    setCheckOut(date) {
      this.checkOut = date
    },

    createMonth(date) {
      const firstDay = this.getFirstDay(date, this.firstDayOfWeek)
      const month = {
        days: [],
      }

      for (let i = 0; i < 42; i++) {
        month.days.push({
          date: this.addDays(firstDay, i),
          belongsToThisMonth: this.addDays(firstDay, i).getMonth() === date.getMonth(),
        })
      }

      this.months.push(month)
    },
  },
}
</script>
