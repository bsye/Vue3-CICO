import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import get from 'lodash.get'
import i18n from '../../i18n/en'
import helpers from '../../src/helpers'

import Cico from '../../components/Cico.vue'

describe('Call To Action Component', () => {
  const wrapper = mount(Cico, {
    props: {
      minNights: 3,
      maxNights: 20,
      startDate: new Date('2022-12-20'),
    },
  })

  it('should ask for the selection of the check in date and tell me that are available also longer stays', async () => {
    expect(wrapper.html()).to.not.equal(null)
    await wrapper.find('.cico__dummy-wrapper').trigger('click')
    expect(wrapper.vm.isOpen).to.eql(true)
    expect(wrapper.find('.cico__cta-panel-title').text()).to.be.eql(get(i18n, 'checkInCheckOut.checkIn'))
    expect(wrapper.find('.cico__cta-info').text()).to.be.eql(get(i18n, 'checkInCheckOut.stayLongerOne'))
  })

  it('should ask for the selection of the check out date', async () => {
    await wrapper.setProps({
      checkInDate: new Date('2022-12-31'),
    })
    expect(wrapper.find('.cico__cta-panel-title').text()).to.be.eql(get(i18n, 'checkInCheckOut.checkOut'))
  })

  it('should tell me the selected checkIn Date but not the checkOut date', () => {
    const testCheckIn = helpers.dateFormatter('2022-12-31', 'ddd DD MMM.')
    expect(wrapper.find('.cico__nights-info .cico__checkin').text()).to.be.eql(testCheckIn)
    expect(wrapper.find('.cico__nights-info .cico__checkout').html()).to.be.eql(`<span class="cico__checkout"> - ${get(i18n, 'activity.calendar.checkOut')} </span>`)
  })

  it('should tell me that the dates are selected', async () => {
    await wrapper.setProps({
      checkOutDate: new Date('2023-01-04'),
    })

    const testCheckIn = helpers.dateFormatter('2022-12-31', 'ddd DD MMM.')
    const testCheckOut = helpers.dateFormatter('2023-01-04', 'ddd DD MMM.')

    expect(wrapper.find('.cico__cta-panel-title').text()).to.be.eql(get(i18n, 'checkInCheckOut.yourDates'))
    expect(wrapper.find('.cico__nights-info .cico__checkin').text()).to.be.eql(testCheckIn)
    expect(wrapper.find('.cico__nights-info .cico__checkout').text()).to.be.eql(`- ${testCheckOut}`)
  })

  it("should tell me that there's an extra night selected", async () => {
    const ctaText = wrapper.find('.cico__travel-dates').text()
    const expectedText = `( 4 ${get(i18n, 'activity.filter.nights')} -
    3 ${get(i18n, 'checkInCheckOut.included')},
    1 ${get(i18n, 'checkInCheckOut.extraNight')})`

    expect(ctaText.replace(/\s/g, '')).to.be.eql(expectedText.replace(/\s/g, ''))
  })

  it('should tell me that are selected 3 nights', async () => {
    await wrapper.setProps({
      checkOutDate: new Date('2023-01-03'),
    })

    const ctaText = wrapper.find('.cico__nights').text()
    const expectedText = `( 3 ${get(i18n, 'checkInCheckOut.nightsIncluded')})`

    expect(ctaText.replace(/\s/g, '')).to.be.eql(expectedText.replace(/\s/g, ''))
  })
})
