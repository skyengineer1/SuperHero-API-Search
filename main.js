const myApiKey = "3b9759145c268fa0ce2c4c84dad15223";
const select = document.getElementById("inputGroupSelect04");
const image = document.getElementById("hero-image");
const submitButton = document.getElementById("submit-button");

const heroes = ["Batman", "Spider-Man", "Iron Man", "Captain America", "Doctor Strange"];

heroes.forEach(hero => {
    let option = document.createElement("option");
    option.value = hero;
    option.textContent = hero;
    select.appendChild(option);
});

async function fetchHeroImage(heroName) {
    try {
        console.log(`Fetching data for hero: ${heroName}`);
        const corsProxy = "https://api.allorigins.win/get?url=";
        let response = await fetch(`${corsProxy}${encodeURIComponent(`https://superheroapi.com/api/${myApiKey}/search/${heroName}`)}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        let data = await response.json();
        let parsedData = JSON.parse(data.contents);
        
        console.log('API response:', parsedData);
        
        if (parsedData.response === "success") {
            let hero = parsedData.results[0];
            image.src = hero.image.url;
            image.classList.remove("d-none");
            console.log(`Hero found: ${hero.name}`);
        } else {
            console.error("Hero not found");
            image.src = "";
            image.classList.add("d-none");
        }
    } catch (error) {
        console.error("Error fetching hero data:", error);
        image.src = "";
        image.classList.add("d-none");
    }
}

submitButton.addEventListener("click", () => {
    console.log("Submit button clicked");
    fetchHeroImage(select.value);
});