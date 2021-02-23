/*
The display is for displaying the code you know
get_meal is a button to maybe I shouldn't explain you this. You know this right?
yes. i understand this
*/

let display = document.querySelector(`#display`);
let get_meal = document.querySelector(`#button`);

let search = document.querySelector(`#search`);
let categories = document.querySelector(`#categories`);

// get_random_meal() function is used to get a random meal from an api and display it on the page
// you know how fetch works already so no need to explain that.
async function get_random_meal(){
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    const get_meal = await response.json();

    // when we fetch a meal we pass it to create_meal() function. Come below
    create_meal(get_meal.meals[0])
}

async function find_meal(){
    let user_data = document.querySelector(`#search_meal`);
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${user_data.value}`)
    const meal_result = await response.json();
    create_meal(meal_result.meals[0])
    // console.log(meal_result)
    
}
// first start the live server for me. First lets test the console.log()
async function all_meal_category(){
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    const meal_category = await response.json();
    // meal_category.categories.map(category => `<option>${category.strCategory}</option>`)
    categories.innerHTML = `
    <select onchange="load_categories(this.value)">
        ${meal_category.categories.map(category => `<option>${category.strCategory}</option>`)}
    </select>
    `
}

async function load_categories(category){
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    const categories = await response.json();
    // let meals = loaded_categories.meals[0]
    display.innerHTML = `
        <div class="categories">
           ${categories.meals.map(meal =>`
                <figure>
                    <img src="${meal.strMealThumb}" alt="">
                    <figcaption>${meal.strMeal}</figcaption>
                </figure>
           `).join("")}
        </div>
    `
}

all_meal_category()


// This function taken in a meal and then seperates the ingredients from the api to make sure 
// it gets an array of all the ingredients and its measures and drop all the blank ingredients
function create_meal(meal){
    // we have made an empty ingredients array here. We want to fill that array with ingredients and measures
    let ingredients = [];
    // If you look at the api there are 20 ingredients and its measures
    // so we loop 20 times and check if meal[strIngredients] exist by passing an incrementor to it
    // the i actually pads a number to strIngredients like strIngredietns1, 2,3 etch
    // and when if condition is true then the ingredients and its measure is pushed in the array ingredients
    // if the ingredient is empty then the loop breaks
    // after that we display all the meal data on the page along with the ingredients
    for (let i = 1; i <= 20; i++) {
        if(meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} --- ${meal[`strMeasure${i}`]}`)
        } else {
            // Stop the looping once there are no ingredients left.
            // ok wait
            break;
        }
    }
    display.innerHTML = `
        <main>
            <header>
                <h2>${meal.strMeal}</h2>
                <h3>${meal.strArea}</h3>
                <h3>Category - ${meal.strCategory}</h3>
                <figure class="meal_image">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <figcation>${meal.strMeal}</figcation>
                </figure>
            <header>
            <section>
                <h2>Ingredients</h2>
                <ul>
                <!-- we are mapping on the ingredients of the array we filled above and add them inside the li -->
                    ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join("")}
                </ul>
                <p>${meal.strInstructions}</p>
            </section>
        </main>
    `
}


// are you getting this?
// yes so far

// get meal is a button on which we add event listener to get the random meal
// this is a higher order function, addEventListener is taking 2 arguments, click and function get_random_meal
// search event listener is actualling fetching the user entered meal from the input. Got it? yes

get_meal.addEventListener("click", get_random_meal)
search.addEventListener("click", find_meal)

