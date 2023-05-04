const _testUtils = require('@vue/test-utils')
const _chai = require('chai')
const _lodash = _interopRequireDefault(require('lodash.get'))
const _en = _interopRequireDefault(require('../../public/i18n/en'))
const _helpers = _interopRequireDefault(require('../../src/helpers'))
const _Cico = _interopRequireDefault(require('../../components/Cico.vue'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

describe('Cico Component', function () {
  const wrapper = (0, _testUtils.mount)(_Cico.default, {
    props: {
      minNights: 3,
      maxNights: 20,
      minDate: new Date('2022-12-28'),
    },
  })

  it('should verify that the component is mounted', function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch ((_context.prev = _context.next)) {
          case 0:
            ;(0, _chai.expect)(wrapper.html()).to.not.equal(null)

          case 1:
          case 'end':
            return _context.stop()
        }
      }
    })
  })
  it('should verify that the calendar opens correctly', function _callee2() {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch ((_context2.prev = _context2.next)) {
          case 0:
            _context2.next = 2

            return regeneratorRuntime.awrap(wrapper.find('.cico__dummy-wrapper').trigger('click'))

          case 2:
            ;(0, _chai.expect)(wrapper.vm.isOpen).to.eql(true)
            ;(0, _chai.expect)(wrapper.find('.cico--open').exists()).to.eql(true)
            ;(0, _chai.expect)(wrapper.emitted('cico-opened').length).to.not.eql(0)
            ;(0, _chai.expect)(wrapper.find('.cico__month-day').exists()).to.eql(true)

          case 6:
          case 'end':
            return _context2.stop()
        }
      }
    })
  })
  const testCheckIn = new Date('2022-12-28')
  const testCheckOut = new Date('2022-12-31')

  it('should be able to select a check-in day', function _callee3() {
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch ((_context3.prev = _context3.next)) {
          case 0:
            _context3.next = 2

            return regeneratorRuntime.awrap(wrapper.find('.is-valid-day').trigger('click'))

          case 2:
            ;(0, _chai.expect)(wrapper.emitted('day-clicked').length).to.not.eql(0)
            ;(0, _chai.expect)(_helpers.default.compareDay(wrapper.vm.checkIn, testCheckIn)).to.eql(0)

          case 4:
          case 'end':
            return _context3.stop()
        }
      }
    })
  })
  it('should be able to select a check-out day', function _callee4() {
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch ((_context4.prev = _context4.next)) {
          case 0:
            _context4.next = 2

            return regeneratorRuntime.awrap(wrapper.find('.is-valid-day').trigger('click'))

          case 2:
            ;(0, _chai.expect)(_helpers.default.compareDay(wrapper.vm.checkOut, testCheckOut)).to.eql(0)

          case 3:
          case 'end':
            return _context4.stop()
        }
      }
    })
  })
  it('should have emitted the check in date, the check out date and the period', function _callee5() {
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch ((_context5.prev = _context5.next)) {
          case 0:
            ;(0, _chai.expect)(
              wrapper.emitted('check-in-selected').find(function (date) {
                return _helpers.default.compareDay(date, testCheckIn) === 0
              }),
            ).to.not.eql(null || undefined)
            ;(0, _chai.expect)(
              wrapper.emitted('check-out-selected').find(function (date) {
                return _helpers.default.compareDay(date, testCheckOut) === 0
              }),
            ).to.not.eql(null || undefined)
            ;(0, _chai.expect)(wrapper.emitted('period-selected').length).to.not.eql(0)

          case 3:
          case 'end':
            return _context5.stop()
        }
      }
    })
  })
  it('should emit the check in date in the YYYY-MM format', function _callee6() {
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch ((_context6.prev = _context6.next)) {
          case 0:
            _context6.next = 2

            return regeneratorRuntime.awrap(
              wrapper.setProps({
                eventFormat: 'YYYY-MM',
              }),
            )

          case 2:
            _context6.next = 4

            return regeneratorRuntime.awrap(wrapper.find('.is-valid-day').trigger('click'))

          case 4:
            ;(0, _chai.expect)(
              wrapper.emitted('check-in-selected').find(function (date) {
                return _helpers.default.compareDay(date, _helpers.default.dateFormatter(testCheckIn, 'YYYY-MM')) === 0
              }),
            ).to.not.eql(null || undefined)

          case 5:
          case 'end':
            return _context6.stop()
        }
      }
    })
  })
  it('should render a new month when clicking on the next month button', function _callee7() {
    let monthName
    let nextMonth
    let testMonth

    return regeneratorRuntime.async(function _callee7$(_context7) {
      while (1) {
        switch ((_context7.prev = _context7.next)) {
          case 0:
            _context7.next = 2

            return regeneratorRuntime.awrap(wrapper.find('.cico__month-button--next').trigger('click'))

          case 2:
            _context7.next = 4

            return regeneratorRuntime.awrap(
              new Promise(function (resolve) {
                return setTimeout(resolve, 410)
              }),
            )

          case 4:
            ;(0, _chai.expect)(wrapper.emitted('next-month-rendered').length).to.not.eql(0)
            monthName = wrapper.find('.cico__month-name').text()
            nextMonth = new Date('2022-12-28')
            testMonth = _helpers.default.dateFormatter(nextMonth, 'MMMM YYYY')
            ;(0, _chai.expect)(monthName === testMonth).to.eql(true)
            _context7.next = 11

            return regeneratorRuntime.awrap(wrapper.find('.cico__month-button--next').trigger('click'))

          case 11:
            _context7.next = 13

            return regeneratorRuntime.awrap(
              new Promise(function (resolve) {
                return setTimeout(resolve, 410)
              }),
            )

          case 13:
            monthName = wrapper.find('.cico__month-name').text()
            nextMonth = _helpers.default.getNextMonth(nextMonth)
            testMonth = _helpers.default.dateFormatter(nextMonth, 'MMMM YYYY')
            ;(0, _chai.expect)(monthName === testMonth).to.eql(true)

          case 17:
          case 'end':
            return _context7.stop()
        }
      }
    })
  })
  it('should render the previous month if it is available', function _callee8() {
    let nextMonth
    let testMonth
    let monthName

    return regeneratorRuntime.async(function _callee8$(_context8) {
      while (1) {
        switch ((_context8.prev = _context8.next)) {
          case 0:
            _context8.next = 2

            return regeneratorRuntime.awrap(wrapper.find('.cico__month-button--prev').trigger('click'))

          case 2:
            _context8.next = 4

            return regeneratorRuntime.awrap(
              new Promise(function (resolve) {
                return setTimeout(resolve, 410)
              }),
            )

          case 4:
            ;(0, _chai.expect)(wrapper.emitted('previous-month-rendered').length).to.not.eql(0)
            _context8.next = 7

            return regeneratorRuntime.awrap(wrapper.find('.cico__month-button--prev').trigger('click'))

          case 7:
            _context8.next = 9

            return regeneratorRuntime.awrap(
              new Promise(function (resolve) {
                return setTimeout(resolve, 410)
              }),
            )

          case 9:
            _context8.next = 11

            return regeneratorRuntime.awrap(
              (0, _chai.expect)(wrapper.find('.cico__month-button--prev.disabled').exists()).to.eql(true),
            )

          case 11:
            _context8.next = 13

            return regeneratorRuntime.awrap(wrapper.find('.cico__month-button--next').trigger('click'))

          case 13:
            _context8.next = 15

            return regeneratorRuntime.awrap(
              new Promise(function (resolve) {
                return setTimeout(resolve, 410)
              }),
            )

          case 15:
            ;(0, _chai.expect)(wrapper.find('.cico__month-button--prev.disabled').exists()).to.eql(false)
            nextMonth = new Date('2022-12-28')
            testMonth = _helpers.default.dateFormatter(nextMonth, 'MMMM YYYY')
            monthName = wrapper.find('.cico__month-name').text()
            ;(0, _chai.expect)(monthName === testMonth).to.eql(true)
            _context8.next = 22

            return regeneratorRuntime.awrap(wrapper.find('.cico__month-button--prev').trigger('click'))

          case 22:
            _context8.next = 24

            return regeneratorRuntime.awrap(
              new Promise(function (resolve) {
                return setTimeout(resolve, 410)
              }),
            )

          case 24:
            ;(0, _chai.expect)(wrapper.find('.cico__month-button--prev.disabled').exists()).to.eql(true)

          case 25:
          case 'end':
            return _context8.stop()
        }
      }
    })
  })
  it('should not display the clear button if the props is set to false', function _callee9() {
    return regeneratorRuntime.async(function _callee9$(_context9) {
      while (1) {
        switch ((_context9.prev = _context9.next)) {
          case 0:
            _context9.next = 2

            return regeneratorRuntime.awrap(
              wrapper.setProps({
                displayClearButton: false,
              }),
            )

          case 2:
            ;(0, _chai.expect)(wrapper.find('.cico__clear-button').exists()).to.eql(false)
            _context9.next = 5

            return regeneratorRuntime.awrap(
              wrapper.setProps({
                displayClearButton: true,
              }),
            )

          case 5:
          case 'end':
            return _context9.stop()
        }
      }
    })
  })
  it('should clear the dates', function _callee10() {
    return regeneratorRuntime.async(function _callee10$(_context10) {
      while (1) {
        switch ((_context10.prev = _context10.next)) {
          case 0:
            _context10.next = 2

            return regeneratorRuntime.awrap(wrapper.find('.cico__clear-button').trigger('click'))

          case 2:
            ;(0, _chai.expect)(wrapper.vm.checkIn).to.eql(null)

          case 3:
          case 'end':
            return _context10.stop()
        }
      }
    })
  })
  it('should set the checkIn and checkOut dates via props', function _callee11() {
    return regeneratorRuntime.async(function _callee11$(_context11) {
      while (1) {
        switch ((_context11.prev = _context11.next)) {
          case 0:
            _context11.next = 2

            return regeneratorRuntime.awrap(
              wrapper.setProps({
                checkInDate: new Date('2022-12-31'),
                checkOutDate: new Date('2023-01-05'),
              }),
            )

          case 2:
            ;(0, _chai.expect)(wrapper.vm.checkIn).to.not.eql(null)
            ;(0, _chai.expect)(wrapper.vm.checkOut).to.not.eql(null)

          case 4:
          case 'end':
            return _context11.stop()
        }
      }
    })
  })
  it('should position the cico at the right side of the screen', function _callee12() {
    return regeneratorRuntime.async(function _callee12$(_context12) {
      while (1) {
        switch ((_context12.prev = _context12.next)) {
          case 0:
            _context12.next = 2

            return regeneratorRuntime.awrap(
              wrapper.setProps({
                position: 'right',
              }),
            )

          case 2:
            ;(0, _chai.expect)(wrapper.find('.cico.right').exists()).to.eql(true)

          case 3:
          case 'end':
            return _context12.stop()
        }
      }
    })
  })
  it('should clear the checkIn and checkOut date if it is a disabled date', function _callee13() {
    return regeneratorRuntime.async(function _callee13$(_context13) {
      while (1) {
        switch ((_context13.prev = _context13.next)) {
          case 0:
            _context13.next = 2

            return regeneratorRuntime.awrap(
              wrapper.setProps({
                disabledDates: [new Date('2022-12-31'), new Date('2023-01-01')],
              }),
            )

          case 2:
            ;(0, _chai.expect)(wrapper.vm.checkIn).to.eql(null)

          case 3:
          case 'end':
            return _context13.stop()
        }
      }
    })
  })
  it('should clear only the checkOut if it is a disabled date', function _callee14() {
    return regeneratorRuntime.async(function _callee14$(_context14) {
      while (1) {
        switch ((_context14.prev = _context14.next)) {
          case 0:
            _context14.next = 2

            return regeneratorRuntime.awrap(
              wrapper.setProps({
                checkInDate: new Date('2022-12-31'),
                checkOutDate: new Date('2023-01-05'),
              }),
            )

          case 2:
            _context14.next = 4

            return regeneratorRuntime.awrap(
              wrapper.setProps({
                disabledDates: [new Date('2023-01-05')],
              }),
            )

          case 4:
            ;(0, _chai.expect)(wrapper.vm.checkIn).to.not.eql(null)
            ;(0, _chai.expect)(wrapper.vm.checkOut).to.eql(null)

          case 6:
          case 'end':
            return _context14.stop()
        }
      }
    })
  })
  it('should close the cico on click outside', function _callee15() {
    return regeneratorRuntime.async(function _callee15$(_context15) {
      while (1) {
        switch ((_context15.prev = _context15.next)) {
          case 0:
            _context15.next = 2

            return regeneratorRuntime.awrap(wrapper.find('.cico__wrapper').trigger('click'))

          case 2:
            ;(0, _chai.expect)(wrapper.vm.isOpen).to.eql(false)
            ;(0, _chai.expect)(wrapper.emitted('cico-closed').length).to.not.eql(0)

          case 4:
          case 'end':
            return _context15.stop()
        }
      }
    })
  })
  it('should automatically scroll to the new checkIn month when I reopen the calendar', function _callee16() {
    return regeneratorRuntime.async(function _callee16$(_context16) {
      while (1) {
        switch ((_context16.prev = _context16.next)) {
          case 0:
            _context16.next = 2

            return regeneratorRuntime.awrap(
              wrapper.setProps({
                checkInDate: new Date('2023-10-10'),
              }),
            )

          case 2:
            _context16.next = 4

            return regeneratorRuntime.awrap(wrapper.find('.cico__dummy-wrapper').trigger('click'))

          case 4:
            ;(0, _chai.expect)(wrapper.vm.isOpen).to.eql(true)
            ;(0, _chai.expect)(wrapper.vm.activeMonthIndex).to.eql(10)
            _context16.next = 8

            return regeneratorRuntime.awrap(wrapper.find('.cico__dummy-wrapper').trigger('click'))

          case 8:
            ;(0, _chai.expect)(wrapper.vm.isOpen).to.eql(false)
            _context16.next = 11

            return regeneratorRuntime.awrap(
              wrapper.setProps({
                checkInDate: new Date('2023-07-10'),
              }),
            )

          case 11:
            _context16.next = 13

            return regeneratorRuntime.awrap(wrapper.find('.cico__dummy-wrapper').trigger('click'))

          case 13:
            ;(0, _chai.expect)(wrapper.vm.isOpen).to.eql(true)
            ;(0, _chai.expect)(wrapper.vm.activeMonthIndex).to.eql(7)
            _context16.next = 17

            return regeneratorRuntime.awrap(wrapper.find('.cico__dummy-wrapper').trigger('click'))

          case 17:
            ;(0, _chai.expect)(wrapper.vm.isOpen).to.eql(false)
            _context16.next = 20

            return regeneratorRuntime.awrap(
              wrapper.setProps({
                checkInDate: null,
              }),
            )

          case 20:
            _context16.next = 22

            return regeneratorRuntime.awrap(wrapper.find('.cico__dummy-wrapper').trigger('click'))

          case 22:
            ;(0, _chai.expect)(wrapper.vm.isOpen).to.eql(true)
            ;(0, _chai.expect)(wrapper.vm.activeMonthIndex).to.eql(0)

          case 24:
          case 'end':
            return _context16.stop()
        }
      }
    })
  })
})
