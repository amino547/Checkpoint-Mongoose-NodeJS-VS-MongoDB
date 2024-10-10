const express=require("express")
const connectDB=require("./config/connectDB")
const Person = require('./module/person')
const app=express()
const port=4000
app.use(express.json())

connectDB()



const createPerson = (name, age, favoriteFoods) => {
  const newperson = new Person({ name, age, favoriteFoods });


  newperson.save();
  console.log(newperson)
}

createPerson("aziz",50,["pizza","kouskous"])



const arrayOfPeople = ()=>{

  const persons=Person.create([  
      { name: 'Mary', age: 30, favoriteFoods: ['Pasta'] },
    { name: 'Alice', age: 22, favoriteFoods: ['baget', 'hamborgur'] },

  ])

  return console.log(persons)

}
arrayOfPeople()



async function findPeopleByName(name) {
  try {
    const people = await Person.find({ name });
    console.log('Found people:', people);
  } catch (err) {
    console.error('Error finding people:', err);
  }
}

findPeopleByName("aziz");





const findPersonByFavoriteFood = async (food) => {
  try {
    const person = await Person.findOne({ favoriteFoods: food });

    if (!person) {
      console.log('No person found with favorite food:', food);
    } else {
      console.log('Found person with favorite food:', person);
    }
  } catch (err) {
    console.error('Error finding person by favorite food:', err);
  }
};

findPersonByFavoriteFood("pizza");



const findPersonById = async (personId) => {
  try {
    const person = await Person.findById(personId).exec();
    if (!person) {
      console.log('No person found with ID:', personId);
    } else {
      console.log('Found person by ID:', person);
    }
  } catch (err) {
    console.error('Error finding person by ID:', err);
  }
};

findPersonById("6707a11ee69a80f8e7e471ea");



const addFavoriteFood = async (personId) => {
  try {
    const person = await Person.findById(personId).exec();
    if (!person) {
      console.log('No person found with ID:', personId);
      return;
    }
    
    person.favoriteFoods.push('hamburger');
    const updatedPerson = await person.save();
    console.log('Updated person:', updatedPerson);
  } catch (err) {
    console.error('Error adding favorite food:', err);
  }
};


addFavoriteFood("6707a11ee69a80f8e7e471ea");





const updatePersonAge = async (personName, newAge) => {
  try {
    const updatedPerson = await Person.findOneAndUpdate(
      { name: personName },
      { age: newAge },
      { new: true }
    );
    console.log(updatedPerson)
    
    if (!updatedPerson) {
     return  console.log('Person not found');
     
    }

    console.log('Updated person:', updatedPerson);
  } catch (err) {
    console.error('Error updating person:', err);
  }
};

updatePersonAge('Alice', 30)



const deletePersonById = async (personId) => {
  try {
    const removedPerson = await Person.findByIdAndRemove(personId);
    if (!removedPerson) {
      console.log('No person found with that ID.');
    } else {
      console.log('Removed person:', removedPerson);
    }
  } catch (err) {
    console.error('Error removing person:', err);
  }
};
deletePersonById("67066d7b08390643992d7ce8")


const deletePeopleByName = async (name) => {
  try {
    const result = await Person.deleteMany({ name });
    console.log('Delete result:', result);
  } catch (err) {
    console.error('Error deleting people:', err);
  }
};
deletePeopleByName("Mary"); 


const findBurritoLovers = async () => {
  try {
    const data = await Person.find({ favoriteFoods: 'pizza' })
      .sort({ name: 1 })
      .limit(2)
      .select('-age')
      .exec();

    console.log('Burrito lovers:', data);
  } catch (err) {
    console.error('Error finding burrito lovers:', err);
  }
};
findBurritoLovers();




app.listen(port,(err)=>{
    err?console.log(err):console.log(`server is running on port ${port}`)


})









