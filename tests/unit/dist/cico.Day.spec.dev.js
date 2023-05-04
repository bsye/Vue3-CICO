"use strict";

var _testUtils = require("@vue/test-utils");

var _chai = require("chai");

var _helpers = _interopRequireDefault(require("../../src/helpers"));

var _Day = _interopRequireDefault(require("../../components/Day.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('Day Component', function () {
  describe('isDayNotAvailable', function () {
    var wrapper;
    var wrapper2;
    var wrapper3;
    beforeEach(function () {
      wrapper = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          date: new Date('2022-12-12')
        }
      });
      wrapper2 = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          disabledDates: ['2022-12-23', '2022-12-24'],
          date: new Date('2022-12-24')
        }
      });
      wrapper3 = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          disabledDates: ['2022-12-23', '2022-12-24'],
          date: new Date('2022-12-30')
        }
      });
    });
    it('should return null if there are no disabled dates', function () {
      (0, _chai.expect)(wrapper.vm.isDayNotAvailable).to.equal(null);
    });
    it('should return "disabled__not-available" if the day is in the disabled date array', function () {
      (0, _chai.expect)(wrapper2.vm.isDayNotAvailable).to.equal('disabled__not-available');
    });
    it('should return null if the day is not the disabled date array', function () {
      (0, _chai.expect)(wrapper3.vm.isDayNotAvailable).to.equal(null);
    });
  });
  describe('isDayInDisabledRange', function () {
    var wrapper;
    var wrapper2;
    var wrapper3;
    var wrapper4;
    var wrapper5;
    beforeEach(function () {
      wrapper = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          disabledDateRanges: [{
            start: new Date('2023-02-12'),
            end: new Date('2023-02-10')
          }],
          date: new Date('2023-02-11')
        }
      });
      wrapper2 = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          disabledDateRanges: [{
            end: new Date('2023-02-10')
          }],
          date: new Date('2023-02-11')
        }
      });
      wrapper3 = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          disabledDateRanges: [{
            start: new Date('2023-02-01'),
            end: new Date('2023-02-10')
          }],
          date: new Date('2023-02-04')
        }
      });
      wrapper4 = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          disabledDateRanges: [{
            start: new Date('2023-02-01')
          }],
          date: new Date('2023-02-04')
        }
      });
      wrapper5 = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          disabledDateRanges: [{
            start: new Date('2023-02-01'),
            end: new Date('2023-02-03')
          }, {
            start: new Date('2023-02-10')
          }],
          date: new Date('2023-02-15')
        }
      });
    });
    it('should return null because the end date is before the start date in the disabled range', function () {
      (0, _chai.expect)(wrapper.vm.isDayInDisabledRange).to.equal(null);
    });
    it('should return null because no start date in the disabled range is set', function () {
      (0, _chai.expect)(wrapper2.vm.isDayInDisabledRange).to.equal(null);
    });
    it('should return "disabled__not-available" because the day is in the disabled range', function () {
      (0, _chai.expect)(wrapper3.vm.isDayInDisabledRange).to.equal('disabled__not-available');
    });
    it('should return "disabled__not-available" because the day is after the start date and no end date is set', function () {
      (0, _chai.expect)(wrapper4.vm.isDayInDisabledRange).to.equal('disabled__not-available');
    });
    it('should return "disabled__not-available" because the day is after the start date in one of the elements of the disabled date ranges array', function () {
      (0, _chai.expect)(wrapper5.vm.isDayInDisabledRange).to.equal('disabled__not-available');
    });
  });
  describe('isAfterMaxNights', function () {
    var wrapper;
    var wrapper2;
    var wrapper3;
    beforeEach(function () {
      wrapper = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          date: new Date('2022-12-12')
        }
      });
      wrapper2 = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          checkIn: new Date('2022-12-27'),
          checkOut: new Date('2022-12-31'),
          date: new Date('2022-12-24')
        }
      });
      wrapper3 = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          checkIn: new Date('2022-12-27'),
          maxNights: 2,
          date: new Date('2022-12-30')
        }
      });
    });
    it("should return null if there's no checkIn", function () {
      (0, _chai.expect)(wrapper.vm.isAfterMaxNights).to.equal(null);
    });
    it('should return null if there is a checkOut Date', function () {
      (0, _chai.expect)(wrapper2.vm.isAfterMaxNights).to.equal(null);
    });
    it("should return 'disabled__is-after-max-nights' if the date is after the maximum number of nights", function () {
      (0, _chai.expect)(wrapper3.vm.isAfterMaxNights).to.equal('disabled__is-after-max-nights');
    });
  });
  describe('dayNumber', function () {
    var wrapper;
    beforeEach(function () {
      wrapper = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          belongsToThisMonth: true,
          date: new Date('2022-12-12')
        }
      });
    });
    it('should return the day number', function () {
      (0, _chai.expect)(wrapper.vm.dayNumber).to.equal(_helpers["default"].dateFormatter(new Date('2022-12-12'), 'D'));
    });
  });
  describe('isBeforeMinDate', function () {
    var wrapper;
    var wrapper2;
    beforeEach(function () {
      wrapper = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          belongsToThisMonth: true,
          date: new Date('2022-12-12')
        }
      });
      wrapper2 = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          belongsToThisMonth: true,
          minDate: new Date('2022-12-29'),
          date: new Date('2022-12-30')
        }
      });
    });
    it('should return "disabled__before-min-date" because it is before the min date which by default is the current day', function () {
      (0, _chai.expect)(wrapper.vm.isBeforeMinDate).to.equal('disabled__before-min-date');
    });
    it('should return null because the date is after the minDate', function () {
      (0, _chai.expect)(wrapper2.vm.isBeforeMinDate).to.equal(null);
    });
  });
  describe('beforeFirstValidDate', function () {
    var wrapper;
    var wrapper2;
    var wrapper3;
    var wrapper4;
    beforeEach(function () {
      wrapper = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          date: new Date('2022-12-12')
        }
      });
      wrapper2 = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          minNightCount: 2,
          checkIn: new Date('2022-12-29'),
          date: new Date('2022-12-30')
        }
      });
      wrapper3 = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          minDate: new Date('2022-12-29'),
          date: new Date('2023-01-12')
        }
      });
      wrapper4 = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          minNightCount: 2,
          checkIn: new Date('2022-12-29'),
          date: new Date('2022-12-26')
        }
      });
    });
    it('should return NULL if checkin is not set or checkout is set', function () {
      (0, _chai.expect)(wrapper.vm.beforeFirstValidDate).to.eql(null);
    });
    it('should return "disabled__before-first-valid-date" if the date is in before the minimum night count', function () {
      (0, _chai.expect)(wrapper2.vm.beforeFirstValidDate).to.eql('disabled__before-first-valid-date');
    });
    it('should return NULL because the date is after the minimum night count', function () {
      (0, _chai.expect)(wrapper3.vm.beforeFirstValidDate).to.eql(null);
    });
    it('should return NULL because the date is before the checkIn', function () {
      (0, _chai.expect)(wrapper4.vm.beforeFirstValidDate).to.eql(null);
    });
  });
  describe('dayBelongToThisMonth', function () {
    var wrapper;
    var wrapper2;
    beforeEach(function () {
      wrapper = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          belongsToThisMonth: true,
          date: new Date('2022-12-12')
        }
      });
      wrapper2 = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          belongsToThisMonth: false,
          date: new Date('2022-12-30')
        }
      });
    });
    it("should return NULL if it doesn't belong to this month", function () {
      (0, _chai.expect)(wrapper.vm.dayBelongToThisMonth).to.eql(null);
    });
    it('should return "disabled__from-another-month" if it belongs to this month', function () {
      (0, _chai.expect)(wrapper2.vm.dayBelongToThisMonth).to.eql('disabled__from-another-month');
    });
  });
  describe('hoverIsCurrentDay', function () {
    var wrapper;
    var wrapper2;
    var wrapper3;
    beforeEach(function () {
      wrapper = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          hoveringDate: new Date('2022-12-13'),
          date: new Date('2022-12-12')
        }
      });
      wrapper2 = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          checkIn: new Date('2022-12-30'),
          date: new Date('2022-12-30'),
          hoveringDate: new Date('2022-12-30')
        }
      });
      wrapper3 = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          checkIn: new Date('2022-12-30'),
          date: new Date('2022-12-30'),
          hoveringDate: new Date('2022-12-31')
        }
      });
    });
    it('should return NULL if hovering date is different than current date', function () {
      (0, _chai.expect)(wrapper.vm.hoverIsCurrentDay).to.eql(null);
    });
    it('should return "hovering-current-day" if the date hovered is the current day selected for checkIn', function () {
      (0, _chai.expect)(wrapper2.vm.hoverIsCurrentDay).to.eql('hovering-current-day');
    });
    it('should return NULL if the date hovered is NOT the current day selected for checkIn', function () {
      (0, _chai.expect)(wrapper3.vm.hoverIsCurrentDay).to.eql(null);
    });
  });
  describe('isCheckInDay', function () {
    var wrapper;
    var wrapper2;
    var wrapper3;
    beforeEach(function () {
      wrapper = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          hoveringDate: new Date('2022-12-13'),
          date: new Date('2022-12-12')
        }
      });
      wrapper2 = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          checkIn: new Date('2022-12-30'),
          date: new Date('2022-12-30')
        }
      });
      wrapper3 = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          checkIn: new Date('2022-12-30'),
          date: new Date('2022-12-31')
        }
      });
    });
    it('should return NULL if no checkIn date', function () {
      (0, _chai.expect)(wrapper.vm.isCheckInDay).to.eql(null);
    });
    it('should return "check-in-date" if the current date is the checkIn date', function () {
      (0, _chai.expect)(wrapper2.vm.isCheckInDay).to.eql('check-in-date');
    });
    it('should return NULL if the current date is the not the checkIn date', function () {
      (0, _chai.expect)(wrapper3.vm.isCheckInDay).to.eql(null);
    });
  });
  describe('isSelectionCheckInDay', function () {
    var wrapper;
    var wrapper2;
    var wrapper3;
    beforeEach(function () {
      wrapper = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          hoveringDate: new Date('2022-12-13'),
          date: new Date('2022-12-12')
        }
      });
      wrapper2 = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          checkIn: new Date('2022-12-30'),
          date: new Date('2022-12-30')
        }
      });
      wrapper3 = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          checkIn: new Date('2022-12-30'),
          date: new Date('2022-12-31')
        }
      });
    });
    it('should return NULL if no checkIn date', function () {
      (0, _chai.expect)(wrapper.vm.isSelectionCheckInDay).to.eql(null);
    });
    it('should return "selection__check-in-date" if the check in is selected but the checkout is not', function () {
      (0, _chai.expect)(wrapper2.vm.isSelectionCheckInDay).to.eql('selection__check-in-date');
    });
    it('should return NULL if the current date is the not the checkIn date', function () {
      (0, _chai.expect)(wrapper3.vm.isSelectionCheckInDay).to.eql(null);
    });
  });
  describe('hoverIsCheckInDay', function () {
    var wrapper;
    var wrapper2;
    var wrapper3;
    beforeEach(function () {
      wrapper = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          date: new Date('2022-12-12')
        }
      });
      wrapper2 = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          checkIn: new Date('2022-12-30'),
          checkOut: new Date('2022-12-31'),
          date: new Date('2022-01-12'),
          hoveringDate: new Date('2022-01-12')
        }
      });
      wrapper3 = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          checkIn: new Date('2022-12-30'),
          checkOut: new Date('2022-12-31'),
          date: new Date('2022-01-12'),
          hoveringDate: new Date('2022-01-13')
        }
      });
    });
    it('should return NULL if no hoveringDate', function () {
      (0, _chai.expect)(wrapper.vm.hoverIsCheckInDay).to.eql(null);
    });
    it('should return "hover__check-in-date" if the date hovered is a possible new checkIn date', function () {
      (0, _chai.expect)(wrapper2.vm.hoverIsCheckInDay).to.eql('hover__check-in-date');
    });
    it('should return NULL if the current date is NOT a possible new checkIn date', function () {
      (0, _chai.expect)(wrapper3.vm.hoverIsCheckInDay).to.eql(null);
    });
  });
  describe('isCheckOutDay', function () {
    var wrapper;
    var wrapper2;
    var wrapper3;
    beforeEach(function () {
      wrapper = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          date: new Date('2022-12-12')
        }
      });
      wrapper2 = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          checkOut: new Date('2022-12-31'),
          date: new Date('2022-12-31')
        }
      });
      wrapper3 = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          checkOut: new Date('2022-12-31'),
          date: new Date('2022-12-30')
        }
      });
    });
    it('should return NULL if no check out', function () {
      (0, _chai.expect)(wrapper.vm.isCheckOutDay).to.eql(null);
    });
    it('should return "check-out-date" if the current date is the check out date', function () {
      (0, _chai.expect)(wrapper2.vm.isCheckOutDay).to.eql('check-out-date');
    });
    it('should return NULL if the current date is NOT the check out date', function () {
      (0, _chai.expect)(wrapper3.vm.isCheckOutDay).to.eql(null);
    });
  });
  describe('hoverIsCheckOutDay', function () {
    var wrapper;
    var wrapper2;
    var wrapper3;
    beforeEach(function () {
      wrapper = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          date: new Date('2022-12-12')
        }
      });
      wrapper2 = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          checkIn: new Date('2022-12-30'),
          date: new Date('2022-01-13'),
          hoveringDate: new Date('2022-01-13')
        }
      });
      wrapper3 = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          checkIn: new Date('2022-12-30'),
          checkOut: new Date('2022-12-31'),
          date: new Date('2022-01-13'),
          hoveringDate: new Date('2022-01-13')
        }
      });
    });
    it('should return NULL if no hovering date', function () {
      (0, _chai.expect)(wrapper.vm.hoverIsCheckOutDay).to.eql(null);
    });
    it('should return "hover__check-out-date" if the hovering date is a new possible check out date', function () {
      (0, _chai.expect)(wrapper2.vm.hoverIsCheckOutDay).to.eql('hover__check-out-date');
    });
    it('should return "hover__check-out-date" if the hovering date is NOT a new possible check out date', function () {
      (0, _chai.expect)(wrapper3.vm.hoverIsCheckOutDay).to.eql(null);
    });
  });
  describe('hoverIsBeforeCheckIn', function () {
    var wrapper;
    var wrapper2;
    var wrapper3;
    beforeEach(function () {
      wrapper = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          date: new Date('2022-12-12'),
          hoveringDate: new Date('2022-12-12')
        }
      });
      wrapper2 = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          minDate: new Date('2022-01-01'),
          checkIn: new Date('2023-01-12'),
          hoveringDate: new Date('2023-01-11')
        }
      });
      wrapper3 = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          minDate: new Date('2022-01-01'),
          checkIn: new Date('2023-01-12'),
          hoveringDate: new Date('2023-01-13')
        }
      });
    });
    it('should return NULL if no checkIn', function () {
      (0, _chai.expect)(wrapper.vm.hoverIsBeforeCheckIn).to.eql(null);
    });
    it('should return "hover__is-before-check-in" if the hovering date is before the check-in date', function () {
      (0, _chai.expect)(wrapper2.vm.hoverIsBeforeCheckIn).to.eql('hover__is-before-check-in');
    });
    it('should return NULL if the hovering date is after the check-in date', function () {
      (0, _chai.expect)(wrapper3.vm.hoverIsBeforeCheckIn).to.eql(null);
    });
  });
  describe('hoverIsInTheRange', function () {
    var wrapper;
    var wrapper2;
    var wrapper3;
    beforeEach(function () {
      wrapper = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          checkIn: new Date('2022-12-10'),
          date: new Date('2022-12-12')
        }
      });
      wrapper2 = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          checkIn: new Date('2022-12-30'),
          date: new Date('2022-01-13'),
          hoveringDate: new Date('2022-01-13')
        }
      });
      wrapper3 = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          checkIn: new Date('2022-12-30'),
          checkOut: new Date('2022-12-31'),
          date: new Date('2022-01-13'),
          hoveringDate: new Date('2022-01-13')
        }
      });
    });
    it('should return NULL if no hovering date', function () {
      (0, _chai.expect)(wrapper.vm.hoverIsInTheRange).to.eql(null);
    });
    it('should return "hover__check-out-date" if the hovering date is a new possible check out date', function () {
      (0, _chai.expect)(wrapper2.vm.hoverIsCheckOutDay).to.eql('hover__check-out-date');
    });
    it('should return "hover__check-out-date" if the hovering date is NOT a new possible check out date', function () {
      (0, _chai.expect)(wrapper3.vm.hoverIsCheckOutDay).to.eql(null);
    });
  });
  describe('isInTheRange', function () {
    var wrapper;
    var wrapper2;
    var wrapper3;
    beforeEach(function () {
      wrapper = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          date: new Date('2022-12-12')
        }
      });
      wrapper2 = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          checkIn: new Date('2022-12-30'),
          checkOut: new Date('2023-01-12'),
          date: new Date('2023-01-08')
        }
      });
      wrapper3 = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          checkIn: new Date('2022-12-30'),
          checkOut: new Date('2023-01-12'),
          date: new Date('2022-01-15')
        }
      });
    });
    it('should return NULL if no checkIn date', function () {
      (0, _chai.expect)(wrapper.vm.isInTheRange).to.eql(null);
    });
    it('should return "is-in-range" if the the day is in between check in and check out', function () {
      (0, _chai.expect)(wrapper2.vm.isInTheRange).to.eql('is-in-range');
    });
    it('should return NULL if the the day is NOT in between check in and check out', function () {
      (0, _chai.expect)(wrapper3.vm.isInTheRange).to.eql(null);
    });
  });
  describe('isAfterEndDate', function () {
    var wrapper;
    var wrapper2;
    var wrapper3;
    beforeEach(function () {
      wrapper = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          date: new Date('2022-12-12')
        }
      });
      wrapper2 = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          maxDate: new Date('2023-01-12'),
          date: new Date('2023-01-13')
        }
      });
      wrapper3 = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          maxDate: new Date('2023-01-12'),
          date: new Date('2023-01-11')
        }
      });
    });
    it('should return NULL if no max date', function () {
      (0, _chai.expect)(wrapper.vm.isAfterEndDate).to.eql(null);
    });
    it('should return "disabled__after-option-end-date" if the the day is after the maximum end date', function () {
      (0, _chai.expect)(wrapper2.vm.isAfterEndDate).to.eql('disabled__after-option-end-date');
    });
    it('should return NULL if the day is before the maximum end date', function () {
      (0, _chai.expect)(wrapper3.vm.isAfterEndDate).to.eql(null);
    });
  });
  describe('isADisabledDayOfTheWeek', function () {
    var wrapper;
    var wrapper2;
    beforeEach(function () {
      wrapper = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          date: new Date('2023-01-12')
        }
      });
      wrapper2 = (0, _testUtils.shallowMount)(_Day["default"], {
        props: {
          disabledWeekDays: {
            thursday: 'thursday'
          },
          date: new Date('2023-01-12')
        }
      });
    });
    it('should return NULL if it is not a disabled day of the week', function () {
      (0, _chai.expect)(wrapper.vm.isADisabledDayOfTheWeek).to.eql(null);
    });
    it('should return "disabled__day-of-the-week" if the day is a disabled day of the week', function () {
      (0, _chai.expect)(wrapper2.vm.isADisabledDayOfTheWeek).to.eql('disabled__day-of-the-week');
    });
  });
});