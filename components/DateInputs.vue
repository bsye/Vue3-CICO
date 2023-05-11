<template>
  <div class="cico__dummy-inputs-wrapper" ref="inputs_wrapper">
    <div class="cico__dummy-wrapper-input-wrapper">
      <span v-if="get(i18n, 'activity.filter.checkOut')" v-show="showInputLabels" class="cico__dummy-wrapper-arrival">
        {{ get(i18n, 'activity.filter.checkIn') }}
      </span>
      <DateInputCheckIn
        :is-open="isOpen"
        :toggle-datepicker="toggleDatepicker"
        :i18n="i18n"
        :input-size="inputSize"
        :checkinFieldFormat="checkinFieldFormat"
        :checkIn="checkIn"
        :checkOut="checkOut"
        :class="{ focused: !checkIn && isOpen }"
      />
    </div>
    <DateInputDivider :input-size="inputSize" v-if="showExtendedPlaceholder" />
    <div class="cico__dummy-wrapper-input-wrapper departure">
      <span v-if="get(i18n, 'activity.filter.checkOut')" v-show="showInputLabels" class="cico__dummy-wrapper-departure">
        {{ get(i18n, 'activity.filter.checkOut') }}
      </span>
      <DateInputCheckOut
        v-if="showExtendedPlaceholder"
        :is-open="isOpen"
        :toggle-datepicker="toggleDatepicker"
        :i18n="i18n"
        :input-size="inputSize"
        :checkoutFieldFormat="checkoutFieldFormat"
        :checkIn="checkIn"
        :checkOut="checkOut"
        :class="{ focused: checkIn && !checkOut && isOpen }"
      />
    </div>
  </div>
</template>
<script>
import get from 'lodash.get'
import DateInputCheckOut from './DateInputCheckOut.vue'
import DateInputCheckIn from './DateInputCheckIn.vue'
import DateInputDivider from './DateInputDivider.vue'
import helpers from '../src/helpers'

export default {
  name: 'DateInputs',
  components: {
    DateInputCheckIn,
    DateInputCheckOut,
    DateInputDivider,
  },

  props: {
    checkIn: {
      type: [Date, null],
      default: null,
    },

    checkinFieldFormat: {
      type: String,
    },

    checkoutFieldFormat: {
      type: String,
    },

    checkOut: {
      type: [Date, null],
      default: null,
    },

    isOpen: {
      type: Boolean,
      rrequired: true,
    },

    toggleDatepicker: {
      type: Function,
      required: true,
    },

    i18n: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      inputWidth: null,
    }
  },

  computed: {
    inputSize() {
      if (!this.inputWidth) return 'long'

      if (this.inputWidth >= 235) return 'long'
      if (this.inputWidth < 235 && this.inputWidth > 150) return 'short'

      return 'extra-short'
    },

    showExtendedPlaceholder() {
      return !(this.checkIn === null && this.inputSize !== 'long')
    },

    showInputLabels() {
      if (this.inputSize === 'long') return true
      if (this.inputSize === 'short' && this.checkIn !== null) return true

      return false
    },

    inputsWrapperExists() {
      return get(this, '$refs.inputs_wrapper', null)
    },
  },

  mounted() {
    if (!this.inputsWrapperExists) return
    this.updateInputWidth()

    window.addEventListener('resize', () => {
      if (!this.inputsWrapperExists) return
      this.updateInputWidth()
    })
  },

  methods: {
    get,
    ...helpers,
    updateInputWidth() {
      this.inputWidth = this.$refs.inputs_wrapper.clientWidth
    }
  },
}
</script>
