import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
import helpers from '../../src/helpers'

import Month from '../../components/Month.vue'

describe('Month Component', () => {
    let wrapper
    let wrapper2

    beforeEach(() => {
        wrapper = shallowMount(Month, {
            props: {
                month: {
                    days: [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{
                        belongsToThisMonth: true,
                        date: new Date('2023-05-01')
                    }]
                },
                dayKey: 0,
                weekKey:0,
                firstDayOfWeek: 1,
                checkIn: new Date('2023-05-01')
            }
        })

        wrapper2 = shallowMount(Month, {
            props: {
                month: {
                    days: [{
                        belongsToThisMonth: true,
                        date: new Date('2023-05-01')
                    }]
                },
                dayKey: 0,
                weekKey:0,
                firstDayOfWeek: 1,
                checkIn: new Date('2023-05-01')
            },
            computed: {
                monthName() { return "May 2023" }
            }
        })
    })

    it('should display the month name', () => {
        expect(wrapper.find('.cico__month-name').text()).toBe('May 2023')
        expect(wrapper.vm.monthName).toBe('May 2023')
    })

    it('should tell me if the check-in date is part of this month', () => {
        expect(wrapper.vm.monthHasCheckIn).toBe(true)
    })

    
    describe('getMonth', () => {
        it('should get the current month when passed the date', () => {
            expect(wrapper.vm.getMonth(wrapper.vm.month.days[15].date)).toBe('May 2023')
        })
    })

    describe('enterDay', () => {
        it('should emit enter-day when hovered', () => {
            wrapper2.vm.enterDay(MouseEvent, wrapper.vm.month.days.date)
            expect(wrapper2.emitted()).toMatchObject({'enter-day': [ [ MouseEvent, wrapper.vm.month.days.date ] ]})
        })
    })

    describe('enterMonth', () => {
        it('should emit enter-month', () => {
            wrapper2.vm.enterMonth(MouseEvent, wrapper2.vm.month)
            expect(wrapper2.emitted()).toMatchObject({'enter-month': [ [ MouseEvent, wrapper2.vm.month ] ]})
        })
    })

    describe('clearSelection', () => {
        it('should emit clear-selection', () => {
            wrapper2.vm.clearSelection()
            expect(wrapper2.emitted()).toMatchObject({'clear-selection': [[]]})
        })
    })

    describe('handleDayClick', () => {
        it('should emit day-clicked', () => {
            wrapper2.vm.handleDayClick(MouseEvent, wrapper2.vm.month.days.date)
            expect(wrapper2.emitted()).toMatchObject({'day-clicked': [[MouseEvent, wrapper2.vm.month.days.date]]})
        })
    })

    describe('validDayHovered', () => {
        it('should emit valid-day-hovered', () => {
            wrapper2.vm.validDayHovered(wrapper2.vm.month.days.date)
            expect(wrapper2.emitted()).toMatchObject({'valid-day-hovered': [[wrapper2.vm.month.days.date]]})
        })
    })
    
})