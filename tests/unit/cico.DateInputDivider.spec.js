import { shallowMount } from '@vue/test-utils'
import DateInputDivider from '../../components/DateInputDivider.vue'

describe('DateInputDivider Component', () => {
    let wrapper
    let wrapper2
    let wrapper3

    beforeEach(() => {
        wrapper = shallowMount(DateInputDivider, {
            props: {
                inputSize: 'extra-short'
            }
        })

        wrapper2 = shallowMount(DateInputDivider, {
            props: {
                inputSize: 'short'
            }
        })

        wrapper3 = shallowMount(DateInputDivider, {
            props: {
                inputSize: 'long'
            }
        })
    })

    it('should return true when inputSize is extra-short', () => {
        expect(wrapper.vm.isInputShort).toBe(true)
    })

    it('should return false when inputSize is short', () => {
        expect(wrapper2.vm.isInputShort).toBe(false)
    })

    it('should return false when inputSize is long', () => {
        expect(wrapper3.vm.isInputShort).toBe(false)
    })

    it('should display an arrow if isInputShort is false', () => {
        expect(wrapper.html()).toContain('icon-arrow-stub data-v-4ecf7511="" style="display: none;"')
    })

    it('should display a dash if isInputShort is true', () => {
        expect(wrapper.html()).toContain('span data-v-4ecf7511=""')
    })
})