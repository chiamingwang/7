(function(){

   const baseURL = 'http://localhost:8082';

   function testAPIs(){
	var testId ='';
    var testRecipeData = {
		name: 'Grilled Pork Tenderloin',
		ingredients: 'chipotle chile powder',
		steps: 'Turn all burners to high, cover, and heat grill until hot, about 15 minutes.',	
		timers: '100',
		imageURL: 'https://res.cloudinary.com/hksqkdlah/image/upload/',
		originalURL: 'https://www.americastestkitchen.com/recipes/'
	};

   
    callAPI('GET', '/api/recipes/')
		.then((recipes) => {
			console.log('list recipes', recipes);
			return recipes;
		})
		.then((recipes)=>{
			return callAPI('POST', "/api/recipes/", testRecipeData);
		})
		.then((recipe) => {
			console.log('create a new recipe', recipe);
			return callAPI('GET', "/api/recipes/"+recipe._id);
		})
		.then((recipe) => {
			console.log('read recipe details', recipe);
			recipe.name = "updated name" + Date.now();
			recipe.ingredients = "updated ingredients";
			recipe.steps = 'updated steps';
			recipe.timers = '111';
			recipe.imageURL = 'https://www.updated.imageURL.com';
			return callAPI('PUT', "/api/recipes/"+recipe._id, recipe);
		})
		.then((recipe)=>{
			console.log('updated recipe', recipe);
			console.log('delete the recipe');
		})
		.catch((err) =>  {
			console.log(err);
		})
}


  function callAPI(method, uri, body){
	let url = uri;
	let fetchOptions = {
		method: method,
		headers: {
			'Content-type':'application/json'
		},
	};
	if(body) {
		fetchOptions.body = JSON.stringify(body);
	}
	return fetch(url, fetchOptions).then((response) => response.json());
	
  }

  document.querySelector('#testme').addEventListener("click", ()=>{
	testAPIs();
  });
})();