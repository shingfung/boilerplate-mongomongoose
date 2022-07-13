require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = require('mongoose');


const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

mongoose.connect(process.env.MONGO_URI);

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = function(done) {
  const person = new Person({name: "Jane Fonda", age: 84, favoriteFoods: ["eggs", "fish", "fresh fruit"]});

  person.save(function(err, data) {
    if (err) return done(err);
    console.log(data);
    done(null, data)
  });
};

/** 4) Create many People with `Model.create()` */
const arrayOfPeople = [
  {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
  {name: "Robert", age: 78, favoriteFoods: ["wine"]}
];
const createManyPeople = function(arrayOfPeople, done) {
  Person.create(arrayOfPeople, function (err, data) {
    if (err) return done(err);
    console.log(data);
    done(null, data);
  });
};

/** 5) Use `Model.find()` */
const findPeopleByName = function(personName, done) {
  Person.find({name: personName}, function (err, personFound) {
    if (err) return done(err);
    console.log(personFound);
    done(null, personFound);
  });
};

/** 6) Use `Model.findOne()` */
const findOneByFood = function(food, done) {
  console.log(food);
  Person.findOne({favoriteFoods: food}, function (err, data) {
    if (err) return done(err);
    console.log(data);
    done(null, data);
  });
};

/** 7) Use `Model.findById()` */
const findPersonById = function(personId, done) {
  Person.findById(personId, function (err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';

  // .findById() method to find a person by _id with the parameter personId as search key. 
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 
  
    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // and inside the find callback - save() the updated Person.
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if(err) return console.log(err);
    done(null, updatedDoc);
  })
};

const removeById = function(personId, done) {
  Person.findByIdAndRemove(
    personId,
    (err, removedDoc) => {
      if(err) return console.log(err);
      done(null, removedDoc);
    }
  ); 
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, response) => {
    if(err) return console.log(err);
    done(null, response);
  })
};


const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person
  .find({ favoriteFoods: foodToSearch })
  .sort('name')
  .limit(2)
  .select(['name','favoriteFoods'])
  .exec(function (err, data) {
    if (err) return done(err);
    console.log(data);
    done(null, data);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
