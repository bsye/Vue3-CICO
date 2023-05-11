import { shallowMount } from '@vue/test-utils'
import get from 'lodash.get'
import DateInputCheckIn from '../../components/DateInputCheckIn.vue'
import helpers from '../../src/helpers'
import i18n from '../../i18n/en'

describe('DateInputCheckIn Component', () => {
  describe('checkInDateDisplay', () => {
    let wrapper
    let wrapper2

    beforeEach(() => {
      wrapper = shallowMount(DateInputCheckIn, {
        props: {
          isOpen: false,
          toggleDatepicker: () => false,
          i18n,
          inputSize: '',
          checkinFieldFormat: '',
          checkIn: new Date('2022-12-12'),
          checkOut: new Date('2022-12-13'),
        },
      })

      wrapper2 = shallowMount(DateInputCheckIn, {
        props: {
          isOpen: false,
          toggleDatepicker: () => false,
          i18n,
          inputSize: '',
          checkinFieldFormat: '',
          checkIn: null,
          checkOut: null,
        },
      })
    })
    it('should display the selected checkIn date', async () => {
      expect(wrapper.html()).toContain(helpers.dateFormatter(wrapper.vm.checkIn, 'DD'))
    })
    it('should display the placeholder message when no check-in is selected', async () => {
      expect(wrapper2.html()).toContain(get(i18n, 'activity.filter.action'))
    })
  })

  describe('checkInDateFormatting', () => {
    let wrapper
    let wrapper2
    let wrapper3
    let wrapper4
    let wrapper5

    beforeEach(() => {
      wrapper = shallowMount(DateInputCheckIn, {
        props: {
          isOpen: false,
          toggleDatepicker: () => false,
          i18n,
          inputSize: 'long',
          checkinFieldFormat: '',
          checkIn: new Date('2022-12-12'),
          checkOut: new Date('2022-12-13'),
        },
      })

      wrapper2 = shallowMount(DateInputCheckIn, {
        props: {
          isOpen: false,
          toggleDatepicker: () => false,
          i18n,
          inputSize: 'short',
          checkinFieldFormat: '',
          checkIn: new Date('2022-12-12'),
          checkOut: new Date('2022-12-13'),
        },
      })

      wrapper3 = shallowMount(DateInputCheckIn, {
        props: {
          isOpen: false,
          toggleDatepicker: () => false,
          i18n,
          inputSize: 'extra-short',
          checkinFieldFormat: '',
          checkIn: new Date('2022-12-12'),
          checkOut: new Date('2022-12-13'),
        },
      })

      wrapper4 = shallowMount(DateInputCheckIn, {
        props: {
          isOpen: false,
          toggleDatepicker: () => false,
          i18n,
          inputSize: 'extra-short',
          checkinFieldFormat: '',
          checkIn: new Date('2022-12-12'),
          checkOut: new Date('2023-01-01'),
        },
      })

      wrapper5 = shallowMount(DateInputCheckIn, {
        props: {
          isOpen: false,
          toggleDatepicker: () => false,
          i18n,
          inputSize: 'long',
          checkinFieldFormat: 'YYYYMMDD',
          checkIn: new Date('2022-12-12'),
          checkOut: new Date('2022-12-13'),
        },
      })
    })
    it('should use the format ddd DD MMM when input is long', async () => {
      const button = wrapper.find('.cico__input')

      expect(button.text()).toBe(helpers.dateFormatter(wrapper.vm.checkIn, 'ddd DD MMM'))
    })

    it('should use the format DD MMM when input is short', async () => {
      const button = wrapper2.find('.cico__input')

      expect(button.text()).toBe(helpers.dateFormatter(wrapper.vm.checkIn, 'DD MMM'))
    })

    it('should use the format DD when input is extra-short and month matches checkOut month', async () => {
      const button = wrapper3.find('.cico__input')

      expect(button.text()).toBe(helpers.dateFormatter(wrapper.vm.checkIn, 'DD'))
    })

    it('should use the format DD MMM when input is extra-short and month does not match checkOut month', async () => {
      const button = wrapper4.find('.cico__input')

      expect(button.text()).toBe(helpers.dateFormatter(wrapper.vm.checkIn, 'DD MMM'))
    })

    it('should use the custom format entered by the user', () => {
      const button = wrapper5.find('.cico__input')
      expect(button.text()).toBe('20221212')
    })
  })
})
