const mongoose = require('mongoose');
const mongooseurl = require('mongoose-type-url');



//create a schema
const recipeJsonSchema = mongoose.Schema({
		id:{ type: Number, required: false},
		name: {type: String , required: false},
		ingredients: {type: String, required: false},
		steps: { type: String, required: false},	
		timers: { type: Number, required: false},
		imageURL: {type: mongoose.SchemaTypes.Url, required: false},
		originalURL: {type: mongoose.SchemaTypes.Url, required: false},
		createdAt: {type: Date, required: false},
		updatedAt: {type: Date, required: false}
});

recipeJsonSchema.pre('save', function(next){
  if (!this.createdAt){
    this.createdAt = new Date();
  }else{
    this.updatedAt = new Date();
  }
  next();
});
 
module.exports = mongoose.model('recipe', recipeJsonSchema);
