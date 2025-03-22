const url = "https://www.themealdb.com/api/json/v1/1/random.php";
const randomMeal = document.getElementById('random-recipe');
const randomImg = document.getElementById('rand-RecipeImg');
const searchBtn = document.getElementById('search-btn');

async function getRandomMeal() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        randomMeal.innerHTML = `
            <h2>${data.meals[0].strMeal}</h2>
            <p>Category: ${data.meals[0].strCategory}</p>
            `;
        randomImg.style.backgroundImage = `url(${data.meals[0].strMealThumb})`;
        randomImgStyling();
        
    } catch (error) {
        console.error("Error fetching random meal:", error);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    getRandomMeal();
});

searchBtn.addEventListener('click', () => {
    window.location.href = "search.html";
});

function randomImgStyling() {
    
    randomImg.style.backgroundSize = 'fill';
    randomImg.style.backgroundPosition = 'center';
    randomImg.style.overflow = 'hidden';
    randomImg.style.borderRadius = '10px';
}