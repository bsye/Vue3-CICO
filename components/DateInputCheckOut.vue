<template>
  <button class="cico__input" @keyup.enter.stop.prevent="toggleDatepicker" data-testid="cicoInput" tabindex="-1">
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
    checkoutFieldFormat: {
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
      if (this.checkOut === null) return null

      if (this.checkoutFieldFormat) return helpers.dateFormatter(this.checkOut, this.checkoutFieldFormat)

      if (this.inputSize === 'long') return helpers.dateFormatter(this.checkOut, 'ddd DD MMM')
      if (this.inputSize === 'short') return helpers.dateFormatter(this.checkOut, 'DD MMM')

      return helpers.dateFormatter(this.checkOut, 'DD MMM')
    },
  },

  methods: {
    get,
  },
}
</script>
