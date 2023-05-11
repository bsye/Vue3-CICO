import { expect } from 'chai'
import DatepickerHelpers from '../../src/helpers'

describe('Datepicker Helpers', () => {
  describe('getNextDate', () => {
    it('should return the next day when comparing a date to a dates array', () => {
      expect(DatepickerHelpers.getNextDate(['10-10-2017', '10-15-2017', '10-20-2017'], '10-12-2017')).to.equal(
        '10-15-2017',
      ) 
      expect(DatepickerHelpers.getNextDate(['asdf'], '10-12-2017')).to.equal(null)
    })

    it('should return null if no array is passed', () => {
      expect(DatepickerHelpers.getNextDate('10-10-2017', '10-12-2017')).to.equal(null)
    })

    it('should return null no date is in the dateArray', () => {
      expect(DatepickerHelpers.getNextDate('not a date', '10-12-2017')).to.equal(null)
    })
  })

  describe('nextDateByDayOfWeek', () => {
    it('should return the next given day of the week when comparing a date to a date', () => {
      expect(new Date(DatepickerHelpers.nextDateByDayOfWeek('Saturday', '10-11-2017'))).to.eql(new Date('10-14-2017'))
    })
  })

  describe('nextDateByDayOfWeekArray', () => {
    it('should return the next date when comparing to an array days of the week', () => {
      expect(DatepickerHelpers.nextDateByDayOfWeekArray(['Saturday', 'Tuesday'], '11-08-2017')).to.eql(
        new Date('11-11-2017'),
      )
    })
  })

  describe('countDays', () => {
    it('should correctly count the number of days between two given dates', () => {
      expect(DatepickerHelpers.countDays('10-10-2017', '10-15-2017')).to.equal(5)
    })
  })

  describe('addDays', () => {
    it('should return the correct date when given a date and the amount of days to add', () => {
      expect(DatepickerHelpers.addDays('10-10-2017', 5)).to.eql(new Date('10-15-2017'))
    })
  })

  describe('getDayDiff', () => {
    it('should return the positive number of days between the two dates', () => {
      expect(DatepickerHelpers.getDayDiff('10-10-2017', '10-15-2017')).to.equal(5)
    })

    it('should return the negative number of days between the two dates', () => {
      expect(DatepickerHelpers.getDayDiff('10-15-2017', '10-10-2017')).to.equal(-5)
    })
  })

  describe('getFirstDaySunday', () => {
    it('should return the first sunday of a given month', () => {
      expect(DatepickerHelpers.getFirstDay(new Date('10-10-2017'), 0)).to.eql(new Date('10-01-2017'))
    })
  })

  describe('getFirstDayMonday', () => {
    it('should return the first monday of a given month', () => {
      expect(DatepickerHelpers.getFirstDay(new Date('10-10-2017'), 1)).to.eql(new Date('09-25-2017'))
    })
  })

  describe('getFirstDayOfMonth', () => {
    it('should return the first sunday of a given month', () => {
      expect(DatepickerHelpers.getFirstDayOfMonth(new Date('12-10-2017'))).to.eql(new Date('12-01-2017'))
    })
  })

  describe('getNextMonth', () => {
    it('should return the next month of a given date', () => {
      expect(DatepickerHelpers.getNextMonth(new Date('12-10-2017'))).to.eql(new Date('01-01-2018'))
      expect(DatepickerHelpers.getNextMonth(new Date('10-10-2017'))).to.eql(new Date('11-01-2017'))
    })
  })

  describe('getPreviousMonth', () => {
    it('should return the previous month of a given date', () => {
      expect(DatepickerHelpers.getPreviousMonth(new Date('12-10-2017'))).to.eql(new Date('11-01-2017'))
      expect(DatepickerHelpers.getPreviousMonth(new Date('01-10-2017'))).to.eql(new Date('12-01-2016'))
    })
  })

  describe('getMonthDiff', () => {
    it('should return -1 because the second date is less than the first one', () => {
      expect(DatepickerHelpers.getMonthDiff(new Date('12-10-2017'), new Date('11-10-2017'))).to.eql(-1)
    })

    it("should return zero because it's the same month", () => {
      expect(DatepickerHelpers.getMonthDiff(new Date('12-10-2017'), new Date('12-16-2017'))).to.eql(0)
    })

    it("should return two because it's there are two months difference between dates", () => {
      expect(DatepickerHelpers.getMonthDiff('12-10-2017', '1-10-2018')).to.eql(1)
    })

    it("should return null if either input is not a valid date", () => {
      expect(DatepickerHelpers.getMonthDiff('not a date', 'not a date')).to.eql(null)
    })
  })

  describe('shortenArrayOfStrings', () => {
    it('it should return the first four characters of every word inside an array', () => {
      expect(DatepickerHelpers.shortenArrayOfStrings(['Hello World', 'Burn baby burn', ''], 4)).to.eql([
        'Hell',
        'Burn',
        '',
      ])
    })
  })

  describe('dateFormatter', () => {
    it('it should cast the date in the format DD YYYY', () => {
      expect(DatepickerHelpers.dateFormatter(new Date('10-12-2028'), 'DD YYYY')).to.eql('12 2028')
    })

    it('it should cast the date in the format MMMM Y DD', () => {
      expect(DatepickerHelpers.dateFormatter(new Date('10-12-2028'), 'MMMM YY DD')).to.eql('October 28 12')
    })

    it('it should return null if not a date', () => {
      expect(DatepickerHelpers.dateFormatter('Pippo', 'MMMM YY DD')).to.eql(null)
    })

    it('it should return null if empty string', () => {
      expect(DatepickerHelpers.dateFormatter('', 'MMMM YY DD')).to.eql(null)
    })

    it('it should not support italian date formats', () => {
      expect(DatepickerHelpers.dateFormatter('12-10-22', 'YYYY-MM-DD')).to.not.eql('2022-10-12')
    })
  })

  describe('compareDay', () => {
    it('it should return 0 because the dates are equal', () => {
      expect(DatepickerHelpers.compareDay(new Date('2028-10-12'), new Date('2028-10-12'))).to.eql(0)
    })

    it('it should return 1 because the first date is after the second date', () => {
      expect(DatepickerHelpers.compareDay(new Date('2028-10-12'), new Date('2028-10-11'))).to.eql(1)
    })

    it('it should return -1 because the second date is after the first date', () => {
      expect(DatepickerHelpers.compareDay(new Date('2028-10-10'), new Date('2028-10-11'))).to.eql(-1)
    })

    it('should return null if invalid dates were passed', () => {
      expect(DatepickerHelpers.compareDay(new Date('not a date'), new Date('not a date'))).to.eql(null)
    })
  })
})
