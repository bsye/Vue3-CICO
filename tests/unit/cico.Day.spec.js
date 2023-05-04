import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
import helpers from '../../src/helpers'

import Day from '../../components/Day.vue'

describe('Day Component', () => {
  describe('isDayNotAvailable', () => {
    let wrapper
    let wrapper2
    let wrapper3

    beforeEach(() => {
      wrapper = shallowMount(Day, {
        props: {
          date: new Date('2022-12-12'),
        },
      })

      wrapper2 = shallowMount(Day, {
        props: {
          disabledDates: ['2022-12-23', '2022-12-24'],
          date: new Date('2022-12-24'),
        },
      })

      wrapper3 = shallowMount(Day, {
        props: {
          disabledDates: ['2022-12-23', '2022-12-24'],
          date: new Date('2022-12-30'),
        },
      })
    })

    it('should return null if there are no disabled dates', () => {
      expect(wrapper.vm.isDayNotAvailable).to.equal(null)
    })

    it('should return "disabled__not-available" if the day is in the disabled date array', () => {
      expect(wrapper2.vm.isDayNotAvailable).to.equal('disabled__not-available')
    })

    it('should return null if the day is not the disabled date array', () => {
      expect(wrapper3.vm.isDayNotAvailable).to.equal(null)
    })
  })

  describe('isDayInDisabledRange', () => {
    let wrapper
    let wrapper2
    let wrapper3
    let wrapper4
    let wrapper5

    beforeEach(() => {
      wrapper = shallowMount(Day, {
        props: {
          disabledDateRanges: [{ start: new Date('2023-02-12'), end: new Date('2023-02-10') }],
          date: new Date('2023-02-11'),
        },
      })

      wrapper2 = shallowMount(Day, {
        props: {
          disabledDateRanges: [{ end: new Date('2023-02-10') }],
          date: new Date('2023-02-11'),
        },
      })

      wrapper3 = shallowMount(Day, {
        props: {
          disabledDateRanges: [{ start: new Date('2023-02-01'), end: new Date('2023-02-10') }],
          date: new Date('2023-02-04'),
        },
      })

      wrapper4 = shallowMount(Day, {
        props: {
          disabledDateRanges: [{ start: new Date('2023-02-01') }],
          date: new Date('2023-02-04'),
        },
      })

      wrapper5 = shallowMount(Day, {
        props: {
          disabledDateRanges: [
            { start: new Date('2023-02-01'), end: new Date('2023-02-03') },
            { start: new Date('2023-02-10') },
          ],
          date: new Date('2023-02-15'),
        },
      })
    })

    it('should return null because the end date is before the start date in the disabled range', () => {
      expect(wrapper.vm.isDayInDisabledRange).to.equal(null)
    })

    it('should return null because no start date in the disabled range is set', () => {
      expect(wrapper2.vm.isDayInDisabledRange).to.equal(null)
    })

    it('should return "disabled__not-available" because the day is in the disabled range', () => {
      expect(wrapper3.vm.isDayInDisabledRange).to.equal('disabled__not-available')
    })

    it('should return "disabled__not-available" because the day is after the start date and no end date is set', () => {
      expect(wrapper4.vm.isDayInDisabledRange).to.equal('disabled__not-available')
    })

    it('should return "disabled__not-available" because the day is after the start date in one of the elements of the disabled date ranges array', () => {
      expect(wrapper5.vm.isDayInDisabledRange).to.equal('disabled__not-available')
    })
  })

  describe('isAfterMaxNights', () => {
    let wrapper
    let wrapper2
    let wrapper3

    beforeEach(() => {
      wrapper = shallowMount(Day, {
        props: {
          date: new Date('2022-12-12'),
        },
      })

      wrapper2 = shallowMount(Day, {
        props: {
          checkIn: new Date('2022-12-27'),
          checkOut: new Date('2022-12-31'),
          date: new Date('2022-12-24'),
        },
      })

      wrapper3 = shallowMount(Day, {
        props: {
          checkIn: new Date('2022-12-27'),
          maxNights: 2,
          date: new Date('2022-12-30'),
        },
      })
    })

    it("should return null if there's no checkIn", () => {
      expect(wrapper.vm.isAfterMaxNights).to.equal(null)
    })

    it('should return null if there is a checkOut Date', () => {
      expect(wrapper2.vm.isAfterMaxNights).to.equal(null)
    })

    it("should return 'disabled__is-after-max-nights' if the date is after the maximum number of nights", () => {
      expect(wrapper3.vm.isAfterMaxNights).to.equal('disabled__is-after-max-nights')
    })
  })

  describe('dayNumber', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallowMount(Day, {
        props: {
          belongsToThisMonth: true,
          date: new Date('2022-12-12'),
        },
      })
    })

    it('should return the day number', () => {
      expect(wrapper.vm.dayNumber).to.equal(helpers.dateFormatter(new Date('2022-12-12'), 'D'))
    })
  })

  describe('isBeforeMinDate', () => {
    let wrapper
    let wrapper2

    beforeEach(() => {
      wrapper = shallowMount(Day, {
        props: {
          belongsToThisMonth: true,
          date: new Date('2022-12-12'),
        },
      })

      wrapper2 = shallowMount(Day, {
        props: {
          belongsToThisMonth: true,
          minDate: new Date('2022-12-29'),
          date: new Date('2022-12-30'),
        },
      })
    })

    it('should return "disabled__before-min-date" because it is before the min date which by default is the current day', () => {
      expect(wrapper.vm.isBeforeMinDate).to.equal('disabled__before-min-date')
    })

    it('should return null because the date is after the minDate', () => {
      expect(wrapper2.vm.isBeforeMinDate).to.equal(null)
    })
  })

  describe('beforeFirstValidDate', () => {
    let wrapper
    let wrapper2
    let wrapper3
    let wrapper4

    beforeEach(() => {
      wrapper = shallowMount(Day, {
        props: {
          date: new Date('2022-12-12'),
        },
      })

      wrapper2 = shallowMount(Day, {
        props: {
          minNightCount: 2,
          checkIn: new Date('2022-12-29'),
          date: new Date('2022-12-30'),
        },
      })

      wrapper3 = shallowMount(Day, {
        props: {
          minDate: new Date('2022-12-29'),
          date: new Date('2023-01-12'),
        },
      })

      wrapper4 = shallowMount(Day, {
        props: {
          minNightCount: 2,
          checkIn: new Date('2022-12-29'),
          date: new Date('2022-12-26'),
        },
      })
    })

    it('should return NULL if checkin is not set or checkout is set', () => {
      expect(wrapper.vm.beforeFirstValidDate).to.eql(null)
    })

    it('should return "disabled__before-first-valid-date" if the date is in before the minimum night count', () => {
      expect(wrapper2.vm.beforeFirstValidDate).to.eql('disabled__before-first-valid-date')
    })

    it('should return NULL because the date is after the minimum night count', () => {
      expect(wrapper3.vm.beforeFirstValidDate).to.eql(null)
    })

    it('should return NULL because the date is before the checkIn', () => {
      expect(wrapper4.vm.beforeFirstValidDate).to.eql(null)
    })
  })

  describe('dayBelongToThisMonth', () => {
    let wrapper
    let wrapper2

    beforeEach(() => {
      wrapper = shallowMount(Day, {
        props: {
          belongsToThisMonth: true,
          date: new Date('2022-12-12'),
        },
      })

      wrapper2 = shallowMount(Day, {
        props: {
          belongsToThisMonth: false,
          date: new Date('2022-12-30'),
        },
      })
    })

    it("should return NULL if it doesn't belong to this month", () => {
      expect(wrapper.vm.dayBelongToThisMonth).to.eql(null)
    })

    it('should return "disabled__from-another-month" if it belongs to this month', () => {
      expect(wrapper2.vm.dayBelongToThisMonth).to.eql('disabled__from-another-month')
    })
  })

  describe('hoverIsCurrentDay', () => {
    let wrapper
    let wrapper2
    let wrapper3

    beforeEach(() => {
      wrapper = shallowMount(Day, {
        props: {
          hoveringDate: new Date('2022-12-13'),
          date: new Date('2022-12-12'),
        },
      })

      wrapper2 = shallowMount(Day, {
        props: {
          checkIn: new Date('2022-12-30'),
          date: new Date('2022-12-30'),
          hoveringDate: new Date('2022-12-30'),
        },
      })

      wrapper3 = shallowMount(Day, {
        props: {
          checkIn: new Date('2022-12-30'),
          date: new Date('2022-12-30'),
          hoveringDate: new Date('2022-12-31'),
        },
      })
    })

    it('should return NULL if hovering date is different than current date', () => {
      expect(wrapper.vm.hoverIsCurrentDay).to.eql(null)
    })

    it('should return "hovering-current-day" if the date hovered is the current day selected for checkIn', () => {
      expect(wrapper2.vm.hoverIsCurrentDay).to.eql('hovering-current-day')
    })

    it('should return NULL if the date hovered is NOT the current day selected for checkIn', () => {
      expect(wrapper3.vm.hoverIsCurrentDay).to.eql(null)
    })
  })

  describe('isCheckInDay', () => {
    let wrapper
    let wrapper2
    let wrapper3

    beforeEach(() => {
      wrapper = shallowMount(Day, {
        props: {
          hoveringDate: new Date('2022-12-13'),
          date: new Date('2022-12-12'),
        },
      })

      wrapper2 = shallowMount(Day, {
        props: {
          checkIn: new Date('2022-12-30'),
          date: new Date('2022-12-30'),
        },
      })

      wrapper3 = shallowMount(Day, {
        props: {
          checkIn: new Date('2022-12-30'),
          date: new Date('2022-12-31'),
        },
      })
    })

    it('should return NULL if no checkIn date', () => {
      expect(wrapper.vm.isCheckInDay).to.eql(null)
    })

    it('should return "check-in-date" if the current date is the checkIn date', () => {
      expect(wrapper2.vm.isCheckInDay).to.eql('check-in-date')
    })

    it('should return NULL if the current date is the not the checkIn date', () => {
      expect(wrapper3.vm.isCheckInDay).to.eql(null)
    })
  })

  describe('isSelectionCheckInDay', () => {
    let wrapper
    let wrapper2
    let wrapper3

    beforeEach(() => {
      wrapper = shallowMount(Day, {
        props: {
          hoveringDate: new Date('2022-12-13'),
          date: new Date('2022-12-12'),
        },
      })

      wrapper2 = shallowMount(Day, {
        props: {
          checkIn: new Date('2022-12-30'),
          date: new Date('2022-12-30'),
        },
      })

      wrapper3 = shallowMount(Day, {
        props: {
          checkIn: new Date('2022-12-30'),
          date: new Date('2022-12-31'),
        },
      })
    })

    it('should return NULL if no checkIn date', () => {
      expect(wrapper.vm.isSelectionCheckInDay).to.eql(null)
    })

    it('should return "selection__check-in-date" if the check in is selected but the checkout is not', () => {
      expect(wrapper2.vm.isSelectionCheckInDay).to.eql('selection__check-in-date')
    })

    it('should return NULL if the current date is the not the checkIn date', () => {
      expect(wrapper3.vm.isSelectionCheckInDay).to.eql(null)
    })
  })

  describe('hoverIsCheckInDay', () => {
    let wrapper
    let wrapper2
    let wrapper3

    beforeEach(() => {
      wrapper = shallowMount(Day, {
        props: {
          date: new Date('2022-12-12'),
        },
      })

      wrapper2 = shallowMount(Day, {
        props: {
          checkIn: new Date('2022-12-30'),
          checkOut: new Date('2022-12-31'),
          date: new Date('2022-01-12'),
          hoveringDate: new Date('2022-01-12'),
        },
      })

      wrapper3 = shallowMount(Day, {
        props: {
          checkIn: new Date('2022-12-30'),
          checkOut: new Date('2022-12-31'),
          date: new Date('2022-01-12'),
          hoveringDate: new Date('2022-01-13'),
        },
      })
    })

    it('should return NULL if no hoveringDate', () => {
      expect(wrapper.vm.hoverIsCheckInDay).to.eql(null)
    })

    it('should return "hover__check-in-date" if the date hovered is a possible new checkIn date', () => {
      expect(wrapper2.vm.hoverIsCheckInDay).to.eql('hover__check-in-date')
    })

    it('should return NULL if the current date is NOT a possible new checkIn date', () => {
      expect(wrapper3.vm.hoverIsCheckInDay).to.eql(null)
    })
  })

  describe('isCheckOutDay', () => {
    let wrapper
    let wrapper2
    let wrapper3

    beforeEach(() => {
      wrapper = shallowMount(Day, {
        props: {
          date: new Date('2022-12-12'),
        },
      })

      wrapper2 = shallowMount(Day, {
        props: {
          checkOut: new Date('2022-12-31'),
          date: new Date('2022-12-31'),
        },
      })

      wrapper3 = shallowMount(Day, {
        props: {
          checkOut: new Date('2022-12-31'),
          date: new Date('2022-12-30'),
        },
      })
    })

    it('should return NULL if no check out', () => {
      expect(wrapper.vm.isCheckOutDay).to.eql(null)
    })

    it('should return "check-out-date" if the current date is the check out date', () => {
      expect(wrapper2.vm.isCheckOutDay).to.eql('check-out-date')
    })

    it('should return NULL if the current date is NOT the check out date', () => {
      expect(wrapper3.vm.isCheckOutDay).to.eql(null)
    })
  })

  describe('hoverIsCheckOutDay', () => {
    let wrapper
    let wrapper2
    let wrapper3

    beforeEach(() => {
      wrapper = shallowMount(Day, {
        props: {
          date: new Date('2022-12-12'),
        },
      })

      wrapper2 = shallowMount(Day, {
        props: {
          checkIn: new Date('2022-12-30'),
          date: new Date('2022-01-13'),
          hoveringDate: new Date('2022-01-13'),
        },
      })

      wrapper3 = shallowMount(Day, {
        props: {
          checkIn: new Date('2022-12-30'),
          checkOut: new Date('2022-12-31'),
          date: new Date('2022-01-13'),
          hoveringDate: new Date('2022-01-13'),
        },
      })
    })

    it('should return NULL if no hovering date', () => {
      expect(wrapper.vm.hoverIsCheckOutDay).to.eql(null)
    })

    it('should return "hover__check-out-date" if the hovering date is a new possible check out date', () => {
      expect(wrapper2.vm.hoverIsCheckOutDay).to.eql('hover__check-out-date')
    })

    it('should return "hover__check-out-date" if the hovering date is NOT a new possible check out date', () => {
      expect(wrapper3.vm.hoverIsCheckOutDay).to.eql(null)
    })
  })

  describe('hoverIsBeforeCheckIn', () => {
    let wrapper
    let wrapper2
    let wrapper3

    beforeEach(() => {
      wrapper = shallowMount(Day, {
        props: {
          date: new Date('2022-12-12'),
          hoveringDate: new Date('2022-12-12'),
        },
      })

      wrapper2 = shallowMount(Day, {
        props: {
          minDate: new Date('2022-01-01'),
          checkIn: new Date('2023-01-12'),
          hoveringDate: new Date('2023-01-11'),
        },
      })

      wrapper3 = shallowMount(Day, {
        props: {
          minDate: new Date('2022-01-01'),
          checkIn: new Date('2023-01-12'),
          hoveringDate: new Date('2023-01-13'),
        },
      })
    })

    it('should return NULL if no checkIn', () => {
      expect(wrapper.vm.hoverIsBeforeCheckIn).to.eql(null)
    })

    it('should return "hover__is-before-check-in" if the hovering date is before the check-in date', () => {
      expect(wrapper2.vm.hoverIsBeforeCheckIn).to.eql('hover__is-before-check-in')
    })

    it('should return NULL if the hovering date is after the check-in date', () => {
      expect(wrapper3.vm.hoverIsBeforeCheckIn).to.eql(null)
    })
  })

  describe('hoverIsInTheRange', () => {
    let wrapper
    let wrapper2
    let wrapper3

    beforeEach(() => {
      wrapper = shallowMount(Day, {
        props: {
          checkIn: new Date('2022-12-10'),
          date: new Date('2022-12-12'),
        },
      })

      wrapper2 = shallowMount(Day, {
        props: {
          checkIn: new Date('2022-12-30'),
          date: new Date('2022-01-13'),
          hoveringDate: new Date('2022-01-13'),
        },
      })

      wrapper3 = shallowMount(Day, {
        props: {
          checkIn: new Date('2022-12-30'),
          checkOut: new Date('2022-12-31'),
          date: new Date('2022-01-13'),
          hoveringDate: new Date('2022-01-13'),
        },
      })
    })

    it('should return NULL if no hovering date', () => {
      expect(wrapper.vm.hoverIsInTheRange).to.eql(null)
    })

    it('should return "hover__check-out-date" if the hovering date is a new possible check out date', () => {
      expect(wrapper2.vm.hoverIsCheckOutDay).to.eql('hover__check-out-date')
    })

    it('should return "hover__check-out-date" if the hovering date is NOT a new possible check out date', () => {
      expect(wrapper3.vm.hoverIsCheckOutDay).to.eql(null)
    })
  })

  describe('isInTheRange', () => {
    let wrapper
    let wrapper2
    let wrapper3

    beforeEach(() => {
      wrapper = shallowMount(Day, {
        props: {
          date: new Date('2022-12-12'),
        },
      })

      wrapper2 = shallowMount(Day, {
        props: {
          checkIn: new Date('2022-12-30'),
          checkOut: new Date('2023-01-12'),
          date: new Date('2023-01-08'),
        },
      })

      wrapper3 = shallowMount(Day, {
        props: {
          checkIn: new Date('2022-12-30'),
          checkOut: new Date('2023-01-12'),
          date: new Date('2022-01-15'),
        },
      })
    })

    it('should return NULL if no checkIn date', () => {
      expect(wrapper.vm.isInTheRange).to.eql(null)
    })

    it('should return "is-in-range" if the the day is in between check in and check out', () => {
      expect(wrapper2.vm.isInTheRange).to.eql('is-in-range')
    })

    it('should return NULL if the the day is NOT in between check in and check out', () => {
      expect(wrapper3.vm.isInTheRange).to.eql(null)
    })
  })

  describe('isAfterEndDate', () => {
    let wrapper
    let wrapper2
    let wrapper3

    beforeEach(() => {
      wrapper = shallowMount(Day, {
        props: {
          date: new Date('2022-12-12'),
        },
      })

      wrapper2 = shallowMount(Day, {
        props: {
          maxDate: new Date('2023-01-12'),
          date: new Date('2023-01-13'),
        },
      })

      wrapper3 = shallowMount(Day, {
        props: {
          maxDate: new Date('2023-01-12'),
          date: new Date('2023-01-11'),
        },
      })
    })

    it('should return NULL if no max date', () => {
      expect(wrapper.vm.isAfterEndDate).to.eql(null)
    })

    it('should return "disabled__after-option-end-date" if the the day is after the maximum end date', () => {
      expect(wrapper2.vm.isAfterEndDate).to.eql('disabled__after-option-end-date')
    })

    it('should return NULL if the day is before the maximum end date', () => {
      expect(wrapper3.vm.isAfterEndDate).to.eql(null)
    })
  })

  describe('isADisabledDayOfTheWeek', () => {
    let wrapper
    let wrapper2

    beforeEach(() => {
      wrapper = shallowMount(Day, {
        props: {
          date: new Date('2023-01-12'),
        },
      })

      wrapper2 = shallowMount(Day, {
        props: {
          disabledWeekDays: { thursday: 'thursday' },
          date: new Date('2023-01-12'),
        },
      })
    })

    it('should return NULL if it is not a disabled day of the week', () => {
      expect(wrapper.vm.isADisabledDayOfTheWeek).to.eql(null)
    })

    it('should return "disabled__day-of-the-week" if the day is a disabled day of the week', () => {
      expect(wrapper2.vm.isADisabledDayOfTheWeek).to.eql('disabled__day-of-the-week')
    })
  })
})
