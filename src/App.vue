<template>
  <div id="app">
    <div class="container">
      <TestStatement />
      <div class="picker">
        <Cico class="cico__style-search" />
      </div>
    </div>
  </div>
</template>

<script>
import './assets/scss/index.scss'
import TestStatement from '../components/TestStatement.vue'
import Cico from '../components/Cico.vue'
import en from '/i18n/en.js'
import axiosInstance from '../axios/axios.js'

export default {
  name: 'Examples',
  components: {
    Cico,
    TestStatement,
  },

  computed: {
    i18n() {
      return en
    },
  },

  methods: {
    async getItems() {
      let request = await axiosInstance.get('../mocks/items.json')
    },
  },
}
</script>

<style lang="scss">
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

html,
body {
  padding: 0;
  font-family: 'montserrat';
  border: 0;
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
}

#app {
  height: 100%;
  display: flex;
  flex-direction: column;
}

body {
  background-color: #eb5f40;
  display: flex;
  flex-direction: column;
  height: 100%;

  .container {
    max-height: 100vh;
    height: auto;

    padding: 16px;

    @media screen and (min-width: 480px) {
      padding: 60px;
    }
  }

  .header {
    font-weight: semibold;
    line-height: 1.4;
    padding: 32px;
    border-radius: 8px;
    background-color: white;

    color: #111;
    display: flex;
    gap: 1rem;
    flex-direction: column;

    ul {
      ol {
        font-weight: 600;
        list-style-type: decimal;
        margin-bottom: 20px;
        font-size: 16px;
        margin-top: 32px;
      }

      li {
        font-weight: 400;
        margin: 10px;
        font-size: 14px;
        list-style-type: disc;
      }
    }

    h1 {
      font-weight: 700;
      font-size: 23px;
      text-align: left;
      margin: 0;
      line-height: 28px;

      @media screen and (max-width: 480px) {
        font-size: 23px;
        text-align: left;
        line-height: 27px;
      }
    }

    svg {
      height: 27px;
      margin-bottom: 5px;
      text-align: right;
    }
  }

  .picker {
    flex-grow: 1;
    margin-top: 80px;
  }

  .label {
    font-size: 10px;
    text-transform: uppercase;
    padding-inline: 8px;
    padding: 3px;
    color: white;
    background-color: gray;
    border-radius: 3px;
    font-weight: 600;

    &.hard {
      background-color: #f5565c;
    }

    &.medium {
      background-color: #e37933;
    }

    &.easy {
      background-color: #63be63;
    }
  }
}
</style>
