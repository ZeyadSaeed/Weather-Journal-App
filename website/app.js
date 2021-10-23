// save elements what we gonna use in variables
const generateButton = document.getElementById("generate");
const date = document.getElementById("date");
const country = document.getElementById("country");
const temp = document.getElementById("temp");
const cloud = document.getElementById("cloud");
const resultArea = document.querySelector(".result__area");
const feeling = document.getElementById("feelings");
const zipCode = document.getElementById("zip");
const userFeeling = document.getElementById("content");
const errorArea = document.querySelector(".error__area");
const errorAreaTwo = document.querySelector(".error__area__two");

// put the current date to the user
let today = new Date().toLocaleDateString();

// Api url and key api
const key = "&units=metric&appid=a6e63390d17b4d07d11c12528cda2a7d";
const baseUrl = `http://api.openweathermap.org/data/2.5/weather?zip=`;

// Event listener to add function to existing HTML DOM element
generateButton.addEventListener("click", action);

// Function called by event listener
function action(e) {
  // function to get the data
  getWeather(baseUrl + zipCode.value + key);
  // output the feeling to the user
  if (feeling.value.length > 0) {
    userFeeling.innerHTML = `Your feeling<br><ion-icon name="chevron-down-outline"></ion-icon><br><span>${feeling.value}</span>`;
  } else {
    userFeeling.innerHTML = "";
  }
}
const getWeather = async (url = baseUrl + zipCode.value + key) => {
  const req = await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // make error massage if any errors
      if (data.cod !== 200) {
        resultArea.style.top = "50rem";
        errorArea.style.top = 0;
        errorAreaTwo.style.top = "-212%";
        errorAreaTwo.innerHTML = `
        <h2>${data.message}</h2>
        <ion-icon name="sad-outline"></ion-icon>
        `;
      } else {
        // if no errors preview the result
        resultArea.style.top = 0;
        errorArea.style.top = 0;
        errorAreaTwo.style.top = 0;
      }
      // getting specific data from object Es6
      const {
        main: { temp: temp },
        name: city,
        weather: [{ description: clouds }],
      } = data;
      // save info into a variables
      const temperature = Math.round(temp);
      const country = city;
      const cloudsState = clouds;

      postData("/add", {
        temp: temperature,
        country: country,
        cloud: cloudsState,
      });
      updateUI();
    });
};

// post data to the server
const postData = async (url = "", data = {}) => {
  const res = await fetch("/add", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await res.json();
    return newData;
  } catch (err) {
    // catch if any errors
    console.log("error", err);
  }
};

// print the result to the user
const updateUI = async () => {
  const res = await fetch("/all");
  try {
    const allData = await res.json();
    temp.innerHTML = `${allData.temp}&deg;`;
    country.innerHTML = `${allData.country}`;
    cloud.innerHTML = `${allData.cloud} <ion-icon name="cloud-outline"></ion-icon>`;
    date.innerHTML = `${today}<ion-icon name="calendar-outline"></ion-icon>`;
  } catch (err) {
    console.log("error", err);
  }
};
