import { shallowMount } from '@vue/test-utils'
import get from 'lodash.get'
import DateInputCheckOut from '../../components/DateInputCheckOut.vue'
import helpers from '../../src/helpers'
import i18n from '../../i18n/en'

describe('DateInputCheckOut Component', () => {
  describe('checkOutDateDisplay', () => {
    let wrapper
    let wrapper2

    beforeEach(() => {
      wrapper = shallowMount(DateInputCheckOut, {
        props: {
          isOpen: false,
          toggleDatepicker: () => false,
          i18n,
          inputSize: '',
          checkoutFieldFormat: '',
          checkIn: new Date('2022-12-12'),
          checkOut: new Date('2022-12-13'),
        },
      })

      wrapper2 = shallowMount(DateInputCheckOut, {
        props: {
          isOpen: false,
          toggleDatepicker: () => false,
          i18n,
          inputSize: '',
          checkoutFieldFormat: '',
          checkIn: null,
          checkOut: null,
        },
      })
    })
    it('should display the selected checkOut date', async () => {
      expect(wrapper.html()).toContain(helpers.dateFormatter(wrapper.vm.checkOut, 'DD'))
    })
    it('should display the placeholder message when no check-out is selected', async () => {
      expect(wrapper2.html()).toContain(get(i18n, 'activity.filter.action'))
    })
  })

  describe('checkOutDateFormatting', () => {
    let wrapper
    let wrapper2
    let wrapper3
    let wrapper4

    beforeEach(() => {
      wrapper = shallowMount(DateInputCheckOut, {
        props: {
          isOpen: false,
          toggleDatepicker: () => false,
          i18n,
          inputSize: 'long',
          checkoutFieldFormat: '',
          checkIn: new Date('2022-12-12'),
          checkOut: new Date('2022-12-13'),
        },
      })

      wrapper2 = shallowMount(DateInputCheckOut, {
        props: {
          isOpen: false,
          toggleDatepicker: () => false,
          i18n,
          inputSize: 'short',
          checkoutFieldFormat: '',
          checkIn: new Date('2022-12-12'),
          checkOut: new Date('2022-12-13'),
        },
      })

      wrapper3 = shallowMount(DateInputCheckOut, {
        props: {
          isOpen: false,
          toggleDatepicker: () => false,
          i18n,
          inputSize: 'extra-short',
          checkoutFieldFormat: '',
          checkIn: new Date('2022-12-12'),
          checkOut: new Date('2022-12-13'),
        },
      })

      wrapper4 = shallowMount(DateInputCheckOut, {
        props: {
          isOpen: false,
          toggleDatepicker: () => false,
          i18n,
          inputSize: 'extra-short',
          checkoutFieldFormat: 'YYYYMMDD',
          checkIn: new Date('2022-12-12'),
          checkOut: new Date('2022-12-13'),
        },
      })
    })
    it('should use the format ddd DD MMM when input is long', async () => {
      const button = wrapper.find('.cico__input')

      expect(button.text()).toBe(helpers.dateFormatter(wrapper.vm.checkOut, 'ddd DD MMM'))
    })

    it('should use the format DD MMM when input is short', async () => {
      const button = wrapper2.find('.cico__input')

      expect(button.text()).toBe(helpers.dateFormatter(wrapper.vm.checkOut, 'DD MMM'))
    })

    it('should use the format DD MMM when input is extra-short', async () => {
      const button = wrapper3.find('.cico__input')

      expect(button.text()).toBe(helpers.dateFormatter(wrapper.vm.checkOut, 'DD MMM'))
    })

    it('should use the custom format entered by the user', () => {
      const button = wrapper4.find('.cico__input')
      expect(button.text()).toBe('20221213')
    })
  })
})
