const url = "https://www.themealdb.com/api/json/v1/1/random.php";
const randomMeal = document.getElementById('rand-RecipeImg');
const randomImg = document.getElementById('rand-RecipeImg');

const searchBtn = document.getElementById('search-btn');

async function getRandomMeal() {
    try {
        const randomImg = document.getElementById('rand-RecipeImg');
        const foodName = document.getElementById('rand-food-name');
        const foodCategory = document.getElementById('rand-food-category');
        const foodArea = document.getElementById('rand-food-area');
        const foodYoutube = document.getElementById('rand-food-youtube');
        const foodInstructions = document.getElementById('rand-food-instructions');


        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        
        foodName.innerHTML = data.meals[0].strMeal;
        foodCategory.innerHTML = data.meals[0].strCategory;
        foodArea.innerHTML = data.meals[0].strArea;
        foodYoutube.innerHTML = data.meals[0].strYoutube;
        foodInstructions.innerHTML = data.meals[0].strInstructions.split('\n').join('<br>');

        randomImg.style.backgroundImage = `url(${data.meals[0].strMealThumb})`;
        randomImgStyling();
        
    } catch (error) {
        console.error("Error fetching random meal:", error);
    }
}


function randomImgStyling() {
    
    randomImg.style.backgroundSize = 'fill';
    randomImg.style.backgroundPosition = 'center';
    randomImg.style.overflow = 'hidden';
    randomImg.style.borderRadius = '10px';
    randomImg.style.repeat = 'no-repeat';
}

window.addEventListener('DOMContentLoaded', () => {
    getRandomMeal();
});