<template>
  <button class="cico__input" @keyup.enter.stop.prevent="toggleDatepicker" data-testid="cicoInput" tabindex="0">
    {{ inputDate || get(i18n, 'activity.filter.action') }}
  </button>
</template>

<script>
import get from 'lodash.get'
import helpers from '../src/helpers'

export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    toggleDatepicker: {
      type: Function,
      required: true,
    },
    i18n: {
      type: Object,
      required: true,
    },
    inputSize: {
      type: String,
      required: true,
    },
    checkinFieldFormat: {
      type: String,
    },
    checkIn: {
      type: [Date, null],
      default: null,
    },
    checkOut: {
      type: [Date, null],
      default: null,
    },
  },
  computed: {
    inputDate() {
      if (this.checkIn === null) return null

      if (this.checkinFieldFormat) return helpers.dateFormatter(this.checkIn, this.checkinFieldFormat)

      if (this.inputSize === 'long') return helpers.dateFormatter(this.checkIn, 'ddd DD MMM')
      if (this.inputSize === 'short') return helpers.dateFormatter(this.checkIn, 'DD MMM')

      if (this.inputSize === 'extra-short')
        if (helpers.getMonthDiff(this.checkIn, this.checkOut) === 0) return helpers.dateFormatter(this.checkIn, 'DD')
        else return helpers.dateFormatter(this.checkIn, 'DD MMM')

      return helpers.dateFormatter(this.checkIn, 'DD MMM')
    },
  },

  methods: {
    get,
  },
}
</script>
