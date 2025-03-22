const url = "https://www.themealdb.com/api/json/v1/1/random.php";
const randomMeal = document.getElementById('random-recipe');

async function getRandomMeal() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        randomMeal.innerHTML = `
            <h2>${data.meals[0].strMeal}</h2>
            <p>Category: ${data.meals[0].strCategory}</p>
            <img src="${data.meals[0].strMealThumb}" alt="${data.meals[0].strMeal}" />
            `;
    } catch (error) {
        console.error("Error fetching random meal:", error);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    getRandomMeal();
});