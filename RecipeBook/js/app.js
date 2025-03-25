const randomImg = document.getElementById('rand-RecipeImg');
const searchInput = document.getElementById('query');
const displayResults = document.getElementById('search-results');

//Api call to get random meal
async function getRandomMeal() {
    try {
        //Link to the API for random meal
        const url = "https://www.themealdb.com/api/json/v1/1/random.php";

        //Fetch the data from the API
        const response = await fetch(url);
        const data = await response.json();
        
        
        
        const foodName = document.getElementById('rand-food-name');
        const foodCategory = document.getElementById('rand-food-category');
        const foodArea = document.getElementById('rand-food-area');
        const foodYoutube = document.getElementById('rand-food-youtube');
        const foodInstructions = document.getElementById('rand-food-instructions');

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



// Debounce function to limit API calls
function debounce(func, delay) {
    let timeoutId;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
}

function DisplaySearchMeal(data) {
    // Clear previous results
    displayResults.innerHTML = ''; // Clear previous results

    if (data && data.meals) {
        data.meals.forEach(meal =>{
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');

            recipeCard.innerHTML = `
            <h3 class="card-title">${meal.strMeal}</h3>
            <p class="card-category">${meal.strCategory}</p>
            <a href="${meal.strYoutube}" target="_blank" class="card-link">Watch Recipe</a>
            `
        })
    } else {
        displayResults.innerHTML = '<p>No results found.</p>'; // Handle no results case
    }
}



//Api call to get meal by name
async function getMealByName(name) {
    try{
        //Fetch the data from the API
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
        const response = await fetch(url);
        const data = await response.json();
        
        DisplaySearchMeal(data);
        
    }catch(error){
        console.error("Error fetching meal by name:", error);
        displayResults.innerHTML = '<p>Error fetching results.</p>';
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

searchInput.addEventListener('input', debounce(function(){
    const query = searchInput.value.trim();
    if(query >= 3){
        getMealByName(query);
    } else {
        displayResults.innerHTML= '';
    }
}, 500));
