<template>
  <span class="cico__day-price" v-if="price">
    {{ price }}
  </span>
</template>
<script>
import get from 'lodash.get'
import Helpers from '../src/helpers'

export default {
  props: {
    isValidDay: {
      type: [String, null],
    },
    date: {
      type: Date,
    },
    prices: {
      type: Array,
    },
  },

  computed: {
    price() {
      if (!this.isValidDay || !this.prices || typeof this.prices !== 'object') return null

      let price = null

      price = this.prices.find((el) => this.compareDay(el.date, this.date) === 0)

      return this.get(price, 'price', null)
    },
  },

  methods: {
    ...Helpers,
    get,
  },
}
</script>
<style scoped>
span {
  font-size: 8px;
  position: relative;
  bottom: 10px;
}
</style>
