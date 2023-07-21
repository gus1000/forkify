import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';









// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
// import {async} from 'regenerator-runtime'

// if (module.hot) {
//   module.hot.accept()
// }

const controlRecipes = async function () {
  try {


   
    const id = window.location.hash.slice(1);

 

    if (!id) return;
    recipeView.renderSpinner();

    // 0) Update results view to mark selected search result

    // 1) Updating bookmarks view

    // 2) Loading recipe
    await model.loadRecipe(id);

    // 3) Rendering recipe
    recipeView.render(model.state.recipe); //rendering all the search results



  } catch (err) {
    // console.error(err);
    recipeView.renderError()//we don;t want to hardcorde a parameter. we want the message to be an intrincic property
    // alert(err);
  }
};


const controlSearchResults = async function() {
  try {
    // console.log(resultsView)
    // console.log(searchView)
    // console.log(searchView.getQuery)

    // 1. Get Search query


    const query = searchView.getQuery()

    console.log(query)


    if (!query) return;
    resultsView.renderSpinner()

    //2. Load Search Results
    await model.loadSearchResults(query) //query. this manipulates the state
// 3.) render results    
    // console.log(model.state.search.results) //b/c we are importing from the model
    // resultsView.render(model.state.search.results)
    // console.log(model.getSearchResultsPage(1))
    // console.log("HI")


    resultsView.render(model.getSearchResultsPage(1))
    // console.log(resultsView.render(model.getSearchResultsPage()))
    //4. render initial pagination buttons
    paginationView.render(model.state.search)
  } catch(err) {
    // console.error(err)
  }
}
// controlSearchResults();

const controlPagination = function(goToPage) {
  //Render new results
  // console.log(goToPage) ;
  //1. render reesults

  resultsView.render(model.getSearchResultsPage(3))
  // console.log(resultsView.render(model.getSearchResultsPage()))
  //2. render initial pagination buttons
  paginationView.render(model.state.search)
}


const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addHandlerClick(controlPagination)

};
init();

//we have the search results loaded at this point


