const searchEl = document.getElementById('search-btn');
const inputEl = document.querySelector('.search-field');
const meals = document.getElementById('meal');
const mealInfo = document.querySelector('.meal-info');
const mealContent = document.querySelector('.meal-details-content');
const numbEl = document.getElementById('number');
const closeBtn = document.getElementById('close-btn');
const showMenu = document.getElementById('show-menu');
const closeMenu = document.getElementById('close-menu');


//Show meal menu
showMenu.addEventListener('click', () => {
document.querySelector('.menu').classList.add('show')
});
//Remove meal list
closeMenu.addEventListener('click', () => {
    document.querySelector('.menu').classList.remove('show')
})


meals.innerHTML = '';
numbEl;
//Get searched meals
function getMealList() {
    if(inputEl.value === ''){
      showAlert('Please enter a meal', 'warning')  
    } else{
        const results = inputEl.value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${results}`)
        .then(res => res.json())
        .then(data => {
            if (data.meals) {
                data.meals.forEach(meal => {
                    meals.innerHTML += `
         <div class="meal-item" data-id="${meal.idMeal}">
                          <div class="meal-img">
                              <img src="${meal.strMealThumb}" alt="">
                          </div>
                          <div class="meal-name">
                              <h3>${meal.strMeal}</h3>
                              <div class="buttons">
                              <a href="#" class="recipe-btn">Our Recipe</a>
                              <a href="#" class="order-btn" id="order-btn">Order</a>
                            </div>
                          </div>
                      </div>
        `;
                });
                   //Clear inputs
    inputEl.value = '';
   
            } else {
               showAlert(`There is no ${results} in our menu.`)
                //meals.classList.add('no-results');
            }
        });
    }
    
}
//Get our hotel recipe
function getMealRecipe(e){
e.preventDefault();
if(e.target.classList.contains('recipe-btn')){
    let mealItem = e.target.parentElement.parentElement.parentElement;
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
   .then(res => res.json()).then(data => mealsDetailPop_up(data.meals));
}
}
//Details popup
function mealsDetailPop_up(meal){
console.log(meal)
meal=meal[0];
mealContent.innerHTML =` 
 <h2 class="recipe-title">${meal.strMeal}</h2>
                      <p class="recipe-category">${meal.strCategory}</p>
                      <div class="recipe-instruction">
                          <h3>Procedure & Ingredients</h3>
                          <p>${meal.strInstructions}</p>
                      </div>
                      <div class="recipe-meal-img">
                          <img src="${meal.strMealThumb}" alt="">
                      </div>
                      <div class="location">
                      <h5>Type</h5>
                      ${meal.strArea}
                      </div>
`;
mealContent.parentElement.classList.add('show');
}

//show Alert
const showAlert = (message, className)  => {
  const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.meal-result');
    const form = document.getElementById('meal');
    container.insertBefore(div, form);
    //Remove after 2 seconds
    setTimeout(() => {
        document.querySelector('.alert').remove()
    }, 2500);
}
//Add alert to DOM
function addAlert(e){
e.preventDefault();
if(e.target.classList.contains('order-btn')){
showAlert('Thank you for making an order. It will be delivered', 'success')
numbEl.innerHTML++;
}
}

//elseEventlisteners
searchEl.addEventListener('click', getMealList);
meals.addEventListener('click', getMealRecipe);
meals.addEventListener('click', addAlert);
closeBtn.addEventListener('click', () => {
mealContent.parentElement.classList.remove('show')
});