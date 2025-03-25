
const randomMeal = document.getElementById('rand-RecipeImg');
const randomImg = document.getElementById('rand-RecipeImg');

const searchBtn = document.getElementById('search-btn');

async function getRandomMeal() {
    try {
        //Link to the API for random meal
        const url = "https://www.themealdb.com/api/json/v1/1/random.php";

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
        foodYoutube.href = data.meals[0].strYoutube;
        foodInstructions.innerHTML = data.meals[0].strInstructions.split('\n').join('<br>');

        randomImg.style.backgroundImage = `url(${data.meals[0].strMealThumb})`;
        randomImgStyling();
        
    } catch (error) {
        console.error("Error fetching random meal:", error);
    }
}

function searchMeal() {
    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value;
    console.log(searchValue);
    getMealByName(searchValue);
}

async function getMealByName(name) {
    try{
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    }catch(error){
        console.error("Error fetching meal by name:", error);
    }
};


function randomImgStyling() {
    
    randomImg.style.backgroundSize = 'fill';
    randomImg.style.backgroundPosition = 'center';
    randomImg.style.overflow = 'hidden';
    randomImg.style.borderRadius = '10px';
    randomImg.style.repeat = 'no-repeat';
}

window.addEventListener('DOMContentLoaded', () => {
    //getRandomMeal();
    getMealByName('chicken');
});