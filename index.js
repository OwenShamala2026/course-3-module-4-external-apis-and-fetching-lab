// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
const stateInput = document.getElementById("state-input");
const fetchButton = document.getElementById("fetch-alerts");
const alertsDisplay = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");

async function fetchWeatherAlerts(state) {
  alertsDisplay.innerHTML = "";
  errorMessage.textContent = "";
  errorMessage.classList.add("hidden");

  try {
    const response = await fetch(`${weatherApi}${state}`);
    
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    
    const data = await response.json();
    displayAlerts(data);
    
  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.classList.remove("hidden");
  }
}

function displayAlerts(data) {
  const title = data.title;
  const count = data.features.length;
  
  const h2 = document.createElement("h2");
  h2.textContent = `${title}: ${count}`;
  alertsDisplay.append(h2);
  
  const ul = document.createElement("ul");
  data.features.forEach(alert => {
    const li = document.createElement("li");
    li.textContent = alert.properties.headline;
    ul.append(li);
  });
  alertsDisplay.append(ul);
}

fetchButton.addEventListener("click", () => {
  const state = stateInput.value.trim().toUpperCase();
  stateInput.value = "";
  
  if (state.length === 2) {
    fetchWeatherAlerts(state);
  } else {
    errorMessage.textContent = "network issue: Please enter a valid 2-letter state code.";
    errorMessage.classList.remove("hidden");
  }
});