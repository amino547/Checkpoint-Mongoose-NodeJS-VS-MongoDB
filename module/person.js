const mongoose=require("mongoose")
const schema=mongoose.schema

const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: {type:Number},
    favoriteFoods: { type: [String], default: [] }
});

const Person = mongoose.model('Person', personSchema);
module.exports = Person;