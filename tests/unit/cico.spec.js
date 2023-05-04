import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import get from 'lodash.get'
import i18n from '../../i18n/en'
import helpers from '../../src/helpers'

import Cico from '../../components/Cico.vue'

describe('Cico Component', () => {
  const wrapper = mount(Cico, {
    props: {
      minNights: 3,
      maxNights: 20,
      minDate: new Date('2022-12-28'),
    },
  })

  it('should verify that the component is mounted', async () => {
    expect(wrapper.html()).to.not.equal(null)
  })

  it('should output the interface after mounted', async () => {
    expect(wrapper.emitted('interface').length).to.not.eql(0)
    const returnedInterface = wrapper.emitted('interface')[0][0]
    const interfaceEvents = ['hideDatepicker', 'showDatepicker', 'clearSelection']
    const foundEvents = []

    Object.keys(returnedInterface).forEach((key) => {
      interfaceEvents.forEach((event) => {
        if (key === event) foundEvents.push(key)
      })
    })

    expect(interfaceEvents.sort()).to.eql(foundEvents.sort())
  })

  it('should verify that the calendar opens correctly', async () => {
    await wrapper.find('.cico__dummy-wrapper').trigger('click')
    expect(wrapper.vm.isOpen).to.eql(true)
    expect(wrapper.find('.cico--open').exists()).to.eql(true)
    expect(wrapper.emitted('cico-opened').length).to.not.eql(0)
    expect(wrapper.find('.cico__month-day').exists()).to.eql(true)
  })

  const testCheckIn = new Date('2022-12-28')
  const testCheckOut = new Date('2022-12-31')

  it('should be able to select a check-in day', async () => {
    await wrapper.find('.is-valid-day').trigger('click')
    expect(wrapper.emitted('day-clicked').length).to.not.eql(0)

    expect(helpers.compareDay(wrapper.vm.checkIn, testCheckIn)).to.eql(0)
  })

  it('should be able to select a check-out day', async () => {
    await wrapper.find('.is-valid-day').trigger('click')

    expect(helpers.compareDay(wrapper.vm.checkOut, testCheckOut)).to.eql(0)
  })

  it('should have emitted the check in date, the check out date and the period', async () => {
    expect(wrapper.emitted('check-in-selected').find((date) => helpers.compareDay(date, testCheckIn) === 0)).to.not.eql(
      null || undefined,
    )

    expect(
      wrapper.emitted('check-out-selected').find((date) => helpers.compareDay(date, testCheckOut) === 0),
    ).to.not.eql(null || undefined)

    expect(wrapper.emitted('period-selected').length).to.not.eql(0)
  })

  it('should emit the check in date in the YYYY-MM format', async () => {
    await wrapper.setProps({
      eventFormat: 'YYYY-MM',
    })

    await wrapper.find('.is-valid-day').trigger('click')

    expect(
      wrapper
        .emitted('check-in-selected')
        .find((date) => helpers.compareDay(date, helpers.dateFormatter(testCheckIn, 'YYYY-MM')) === 0),
    ).to.not.eql(null || undefined)
  })

  it('should render a new month when clicking on the next month button', async () => {
    await wrapper.find('.cico__month-button--next').trigger('click')
    await new Promise((resolve) => setTimeout(resolve, 410))
    expect(wrapper.emitted('next-month-rendered').length).to.not.eql(0)

    let monthName = wrapper.find('.cico__month-name').text()
    let nextMonth = new Date('2022-12-28')
    let testMonth = helpers.dateFormatter(nextMonth, 'MMMM YYYY')

    expect(monthName === testMonth).to.eql(true)

    await wrapper.find('.cico__month-button--next').trigger('click')
    await new Promise((resolve) => setTimeout(resolve, 410))

    monthName = wrapper.find('.cico__month-name').text()
    nextMonth = helpers.getNextMonth(nextMonth)
    testMonth = helpers.dateFormatter(nextMonth, 'MMMM YYYY')

    expect(monthName === testMonth).to.eql(true)
  })

  it('should render the previous month if it is available', async () => {
    await wrapper.find('.cico__month-button--prev').trigger('click')
    await new Promise((resolve) => setTimeout(resolve, 410))

    expect(wrapper.emitted('previous-month-rendered').length).to.not.eql(0)

    await wrapper.find('.cico__month-button--prev').trigger('click')
    await new Promise((resolve) => setTimeout(resolve, 410))

    await expect(wrapper.find('.cico__month-button--prev.disabled').exists()).to.eql(true)
    await wrapper.find('.cico__month-button--next').trigger('click')
    await new Promise((resolve) => setTimeout(resolve, 410))

    expect(wrapper.find('.cico__month-button--prev.disabled').exists()).to.eql(false)

    const nextMonth = new Date('2022-12-28')
    const testMonth = helpers.dateFormatter(nextMonth, 'MMMM YYYY')
    const monthName = wrapper.find('.cico__month-name').text()

    expect(monthName === testMonth).to.eql(true)

    await wrapper.find('.cico__month-button--prev').trigger('click')
    await new Promise((resolve) => setTimeout(resolve, 410))

    expect(wrapper.find('.cico__month-button--prev.disabled').exists()).to.eql(true)
  })

  it('should not display the clear button if the props is set to false', async () => {
    await wrapper.setProps({
      displayClearButton: false,
    })

    expect(wrapper.find('.cico__clear-button').exists()).to.eql(false)

    await wrapper.setProps({
      displayClearButton: true,
    })
  })

  it('should clear the dates', async () => {
    await wrapper.find('.cico__clear-button').trigger('click')
    expect(wrapper.vm.checkIn).to.eql(null)
  })

  it('should set the checkIn and checkOut dates via props', async () => {
    await wrapper.setProps({
      checkInDate: new Date('2022-12-31'),
      checkOutDate: new Date('2023-01-05'),
    })

    expect(wrapper.vm.checkIn).to.not.eql(null)
    expect(wrapper.vm.checkOut).to.not.eql(null)
  })

  it('should position the cico at the right side of the screen', async () => {
    await wrapper.setProps({
      position: 'right',
    })

    expect(wrapper.find('.cico.right').exists()).to.eql(true)
  })

  it('should clear the checkIn and checkOut date if it is a disabled date', async () => {
    await wrapper.setProps({
      disabledDates: [new Date('2022-12-31'), new Date('2023-01-01')],
    })

    expect(wrapper.vm.checkIn).to.eql(null)
  })

  it('should clear only the checkOut if it is a disabled date', async () => {
    await wrapper.setProps({
      checkInDate: new Date('2022-12-31'),
      checkOutDate: new Date('2023-01-05'),
    })

    await wrapper.setProps({
      disabledDates: [new Date('2023-01-05')],
    })

    expect(wrapper.vm.checkIn).to.not.eql(null)
    expect(wrapper.vm.checkOut).to.eql(null)
  })

  it('should close the cico on click outside', async () => {
    await wrapper.find('.cico__wrapper').trigger('click')

    expect(wrapper.vm.isOpen).to.eql(false)
    expect(wrapper.emitted('cico-closed').length).to.not.eql(0)
  })

  it('should automatically scroll to the new checkIn month when I reopen the calendar', async () => {
    await wrapper.setProps({
      checkInDate: new Date('2023-10-10'),
    })

    await wrapper.find('.cico__dummy-wrapper').trigger('click')
    expect(wrapper.vm.isOpen).to.eql(true)
    expect(wrapper.vm.activeMonthIndex).to.eql(10)

    await wrapper.find('.cico__dummy-wrapper').trigger('click')
    expect(wrapper.vm.isOpen).to.eql(false)
    await wrapper.setProps({
      checkInDate: new Date('2023-07-10'),
    })

    await wrapper.find('.cico__dummy-wrapper').trigger('click')
    expect(wrapper.vm.isOpen).to.eql(true)
    expect(wrapper.vm.activeMonthIndex).to.eql(7)

    await wrapper.find('.cico__dummy-wrapper').trigger('click')
    expect(wrapper.vm.isOpen).to.eql(false)
    await wrapper.setProps({
      checkInDate: null,
    })

    await wrapper.find('.cico__dummy-wrapper').trigger('click')
    expect(wrapper.vm.isOpen).to.eql(true)
    expect(wrapper.vm.activeMonthIndex).to.eql(0)
  })
})
