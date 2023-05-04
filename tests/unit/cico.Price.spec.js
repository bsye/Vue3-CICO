import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'

import Price from '../../components/Price.vue'

describe('Price Component', () => {
  describe('price computed', () => {
    let wrapper
    let wrapper2
    let wrapper3
    let wrapper4

    beforeEach(() => {
      wrapper = shallowMount(Price, {
        props: {
          date: new Date('2022-12-12'),
          prices: [{ date: '2023-01-12' }],
        },
      })

      wrapper2 = shallowMount(Price, {
        props: {
          isValidDay: 'is-valid-day',
          date: new Date('2023-01-12'),
          prices: [{ date: '2023-01-12' }],
        },
      })

      wrapper3 = shallowMount(Price, {
        props: {
          isValidDay: 'is-valid-day',
          date: new Date('2023-01-12'),
          prices: [{ dat: '2023-01-1', price: '120' }],
        },
      })

      wrapper4 = shallowMount(Price, {
        props: {
          isValidDay: 'is-valid-day',
          date: new Date('2023-01-12'),
          prices: [{ date: new Date('2023-01-12'), price: '120' }],
        },
      })
    })

    it("should return null because the days don't match", () => {
      expect(wrapper.vm.price).to.equal(null)
    })

    it("should return null because the price isn't set", () => {
      expect(wrapper2.vm.price).to.equal(null)
    })

    it('should return null because the date is not in the correct format', () => {
      expect(wrapper3.vm.price).to.equal(null)
    })

    it('should return "120"', () => {
      expect(wrapper4.vm.price).to.equal('120')
    })
  })
})
