<template>
  <div id="app">
    <div class="container">
      <div class="header">
        <h1>Smartbox test</h1>
        <p>Hello 👋! In this test you'll have to complete the following tasks:</p>
        <ul>
          <ol>
            Implement a search button for the Check-in Check-out (CICO) component you see below. You can find the
            documentation for the Check-in Check-out component in the README.md file
          </ol>
          <ul>
            <li>The button should be enabled only when the check-in and check-out dates are filled</li>
            <li>The button should be disabled when the check-in and check-out dates are cleared</li>
            <li>Clicking on the button will trigger the getItems() function</li>
          </ul>
          <ol>
            The getItems() contains an API call, but it misses the dateFrom and the dateTo parameters that are necessary
            for the response to be returned. Complete the API call and retrieve the response.
          </ol>
          <ul>
            <li>After you have obtained the response, the items should be saved in the Items store module</li>
            <li>
              Create a new component called ItemTeaser that will look like this:
              https://www.figma.com/file/XfVe6BFbXo0iMkZmFKKuQg/Smartbox-test?type=design&node-id=0%3A1&mode=design&t=SAtp2s1JbwJ3eQnC-1
              And that will receive as props the name, img, nb_personnes, experiences and location returned by the items
              responses
            </li>
            <li>
              Create a new component called ItemsGrid which will retrieve the items from the Items Store module and
              display each item in the array as an ItemTeaser.
            </li>
            <li>Display the ItemsGrid below the calendar</li>
            <li>
              Style the items grid to show three elements per column on desktop (&gt;=1024), two items on tablet
              (&gt;=768) and 1 element per column on mobile (&lt;768). the items should have a gap of 16px between each
            </li>
          </ul>
        </ul>
      </div>
      <div class="picker">
        <Cico class="cico__style-search" />
      </div>
    </div>
  </div>
</template>

<script>
import './assets/scss/index.scss'
import Cico from '../components/Cico.vue'
import en from '/i18n/en.js'

export default {
  name: 'Examples',
  components: {
    Cico,
  },

  computed: {
    i18n() {
      return en
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
    flex-grow: 1;

    padding: 16px;

    @media screen and (min-width: 480px) {
      padding: 60px;
    }
  }

  .header {
    width: 100%;
    font-weight: semibold;
    color: white;
    display: flex;
    gap: 1rem;
    flex-direction: column;

    ul {
      li {
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
    height: 100%;
    position: relative;
    bottom: 70px;
    display: flex;
    max-width: 768px;
    margin: 0 auto;
    gap: 2rem;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
