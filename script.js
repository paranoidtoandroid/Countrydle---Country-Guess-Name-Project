// METEHAN YANIT ACM 365 PROJECT SECTION 3 20191311003 
// Country Guess Game

// Define a function to reveal a hidden fact
function reveal(event, fact) {
  // Get the target element (the span containing the fact)
  const target = event.target.previousElementSibling;
  // Check if the target element is already visible
  if (target.style.display !== 'inline') {
    // Toggle the display style of the element
    target.style.display = 'inline';
    // Subtract 10 points from the score
    score -= 10;
    // Update the score display
    document.getElementById('score').innerHTML = `Score: ${score}`;

    // Display -10 near the score
    const penalty = document.createElement('div');
    penalty.innerHTML = '-10';
    penalty.style.color = 'red';
    penalty.style.fontSize = '20px';
    penalty.style.marginLeft = '10px';
    penalty.style.opacity = '1';
    penalty.style.transition = 'opacity 0.5s';
    // Append the element to the score display
    document.getElementById('score').appendChild(penalty);
    // Fade the element away after 1 second
    setTimeout(() => {
      penalty.style.opacity = '0';
    }, 1000);
  }
  // Disable the button
  event.target.disabled = true;
}


// Function that makes the fetch request and updates the HTML
function getCountries() {
  fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
      const gameDiv = document.getElementById('game');
      // Pick a random country from the array
      const country = data[Math.floor(Math.random() * data.length)];
      // Build the HTML for the form
      const hint = country.name.common.split('').map(c => c === ' ' ? ' ' : ' _ ').join('');
      let capitalCity = "Capital City: <span style='display: none;'> " + country.capital + "</span> <button class='reveal' onclick='reveal(event, \"Capital City\")'>Reveal</button>";
      let continent = "Continent: <span style='display: none;'> " + country.region + "</span> <button class='reveal' onclick='reveal(event, \"Continent\")'>Reveal</button>";
      let subRegion = "SubRegion: <span style='display: none;'> " + country.subregion + "</span> <button class='reveal' onclick='reveal(event, \"SubRegion\")'>Reveal</button>";
      let population = "Population: <span style='display: none;'> " + country.population + "</span> <button class='reveal' onclick='reveal(event, \"Population\")'>Reveal</button>";
      let timeZone = "Time zone: <span style='display: none;'> " + country.timezones[0] + "</span> <button class='reveal' onclick='reveal(event, \"Time Zone\")'>Reveal</button>";
      let currencies = "Currencies: <span style='display: none;'> " + country.currencies[Object.keys(country.currencies)[0]].name + "</span> <button class='reveal' onclick='reveal(event, \"Currencies\")'>Reveal</button>";
      let language = "Language: <span style='display: none;'> " + country.languages[Object.keys(country.languages)[0]] + "</span> <button class='reveal' onclick='reveal(event, \"Language\")'>Reveal</button>";
      let flagUrl = country.flags.png;
      let flag = "Flag: <span style='display: none;'> <img src='" + flagUrl + "' width='50' height='50' onerror='this.onerror=null;this.src=\"default-flag.png\";'></span> <button class='reveal' onclick='reveal(event, \"Flag\")'>Reveal</button>";
      let coatOfArmsUrl = country.coatOfArms.png;
      let coatOfArms = "Coat of Arms: <span style='display: none;'> <img src='" + coatOfArmsUrl + "' width='50' height='50' onerror='this.onerror=null;this.src=\"default-coat-of-arms.png\";'></span> <button class='reveal' onclick='reveal(event, \"Coat of Arms\")'>Reveal</button>";
      let borderNeighbors = "Border Neighbors: <span style='display: none;'> " + country.borders + "</span> <button class='reveal' onclick='reveal(event, \"Border Neighbors\")'>Reveal</button>";
      const html = `
        <p>Guess the name of the country:</p>
        <p>${hint}</p>
            
          <ul>
          <li>${capitalCity}</li>
          <li>${continent}</li>
          <li>${subRegion}</li>
          <li>${population}</li>
          <li>${timeZone}</li>
          <li>${currencies}</li>
          <li>${language}</li>
          <li>${flag}</li>
          <li>${coatOfArms}</li>
          <li>${borderNeighbors}</li>
          </ul>
          
        </ul>
        <form onsubmit="checkGuess(event)">
          <input type="text" id="guess" list="countries" required autocorrect="off" autocapitalize="off" spellcheck="false" oninput="handleInput()">
          <button type="submit" id="next-button" disabled>Next</button>
          <button type="button" id="skip-button" onclick="showAnswer()">Skip</button>
          <datalist id="countries">
            ${data.map(country => `<option value="${country.name.common}">`).join('')}
          </datalist>
        </form>
      `;
      // Setting the HTML content of the "game" div
      gameDiv.innerHTML = html;
      // Saving the correct answer in a global variable
      window.correctAnswer = country.name.common;
    })
    .catch(error => {
      console.error(error);
    });
}

// Define a function to handle input in the input field
function handleInput() {
  // Get the value of the input field
  const value = document.getElementById('guess').value;
  // Enable the "Next" button if the input field has a value
  document.getElementById('next-button').disabled = !value;
}

// Defining a global variable for the score
let score = 0;

// Defining a function to check the user's guess
function checkGuess(event) {
  // Prevent the form from submitting
  event.preventDefault();
  // Get the user's guess
  const guess = document.getElementById('guess').value;
  // Check if the guess is correct
  if (guess === window.correctAnswer) {
    // Add 100 points to the score
    score += 100;
  } else {
    alert('Incorrect. Try again.');
  }
  // Update the score display
  document.getElementById('score').innerHTML = `Score: ${score}`;
  // Clear the input field
  document.getElementById('guess').value = '';
  // Disable the "Next" button
  document.getElementById('next-button').disabled = true;
  // Go to the next country
  getCountries();
}

// Define a function to show the answer and go to the next country
function showAnswer() {
  alert(`The correct answer was: ${window.correctAnswer}`);
  // Subtract 90 points from the score
  score -= 90;
  // Update the score display
  document.getElementById('score').innerHTML = `Score: ${score}`;
  getCountries();
}

// Call the function when the page loads
window.onload = getCountries;

