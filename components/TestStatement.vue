<template>
      <div class="header">
        <h1>Smartbox test</h1>
        <p>Hello 👋! In this test you'll have to complete the following tasks:</p>
        <ul>
          <ol>
            Implement a search button for the Check-in Check-out (CICO) component you see below.
          </ol>
          <ul>
            <li>You can find the documentation for the Check-in Check-out component in the README.md file</li>
            <li>The button should be enabled only when the check-in and check-out dates are filled <span class="hard label">hard</span> <span class="label">optional</span></li>
            <li>The button should be disabled when the check-in and check-out dates are cleared <span class="hard label">hard</span> <span class="label">optional</span></li>
            <li>Clicking on the button will trigger the getItems() function <span class="easy label">easy</span></li>
          </ul>
          <ol>
            Implement a list of results based on the response from the getItems() API call
          </ol>
          <ul>
            <li>           The getItems() contains an API call, but it misses the dateFrom and the dateTo parameters that are necessary
            for the response to be returned. Complete the API call and retrieve the response. <span class="medium label">medium</span></li>
            <li>After you have obtained the response, the items should be saved in the Items store module <span class="medium label">medium</span></li>
            <li>
              Create a new component called ItemTeaser that will look like this:
              <a
                href="https://www.figma.com/file/XfVe6BFbXo0iMkZmFKKuQg/Smartbox-test?type=design&node-id=0%3A1&mode=design&t=SAtp2s1JbwJ3eQnC-1"
                title="Figma file"
                >Figma File</a
              >  <span class="medium label">medium</span>
            <li>It will receive as props the name, img, nb_personnes, experiences and location returned by the items
              responses <span class="medium label">medium</span></li> 
            </li>
            <li>
              Create a new component called ItemsGrid which will retrieve the items from the Items Store module and
              display each item in the array as an ItemTeaser. <span class="easy label">easy</span>
            </li>
            <li>Display the ItemsGrid below the calendar <span class="easy label">easy</span></li>
            <li>
              Style the items grid to show three elements per column on desktop (&gt;=1024), two items on tablet
              (&gt;=768) and 1 element per column on mobile (&lt;768). the items should have a gap of 16px between each <span class="easy label">easy</span>
            </li>
          </ul>
        </ul>
      </div>
</template>