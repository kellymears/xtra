/* http://boutglay.com/locallydb/ */

// load locallydb
var locallydb = require('locallydb');

// load the database (folder) in './mydb', will be created if doesn't exist
var db = new locallydb('./mydb');

// load the collection (file) in './mydb/monsters', will be created if doesn't exist
var collection = db.collection('monsters');

// Insert/add/push a list of elements
collection.insert([
  {name: "sphinx", mythology: "greek", eyes: 2, sex: "f", hobbies: ["riddles","sitting","being a wonder"]},
  {name: "hydra", mythology: "greek", eyes: 18, sex: "m", hobbies: ["coiling","terrorizing","growing"]},
  {name: "huldra", mythology: "norse", eyes: 2, sex: "f", hobbies: ["luring","terrorizing"]},
  {name: "cyclops", mythology: "greek", eyes: 1, sex: "m", hobbies: ["staring","terrorizing"]},
  {name: "fenrir", mythology: "norse", eyes: 2, sex: "m", hobbies: ["growing","god-killing"]},
  {name: "medusa",  mythology: "greek", eyes: 2, sex: "f", hobbies: ["coiling","staring"]}
]);

// Insert/add/push only one element
collection.insert({name: "HamoIzm", mythology: "amazigh", eyes: 2, sex: "m", hobbies: ["riddles","hunting"]});

// retrieve elements
collection.where({name: "HamoIzm"});
=> [{name: "HamoIzm", mythology: "amazigh", eyes: 2, sex: "m", hobbies: ["riddles","hunting"], cid:6}]

// retrieve by cid (cid is not index in array, cid is related with addition)
collection.get(3);
=> {name: "cyclops", mythology: "greek", eyes: 1, sex: "m", hobbies: ["staring","terrorizing"], cid:3}

// retrieve elements (monsters) with >= 2 eyes (an array)
collection.where("@eyes >= 2");
=> [
  {name: "sphinx", mythology: "greek", eyes: 2, sex: "f", hobbies: ["riddles","sitting","being a wonder"], cid:0},
  {name: "hydra", mythology: "greek", eyes: 18, sex: "m", hobbies: ["coiling","terrorizing","growing"], cid:1},
  {name: "huldra", mythology: "norse", eyes: 2, sex: "f", hobbies: ["luring","terrorizing"], cid:2},
  {name: "fenrir", mythology: "norse", eyes: 2, sex: "m", hobbies: ["growing","god-killing"], cid:4},
  {name: "medusa",  mythology: "greek", eyes: 2, sex: "f", hobbies: ["coiling","staring"], cid:5},
  {name: "HamoIzm", mythology: "amazigh", eyes: 2, sex: "m", hobbies: ["riddles","hunting"], cid:6}
]

// retrieve elements with (2 eyes and from the greek mythology) or from the amazing mythology
collection.where("(@eyes == 2 && @mythology == 'greek') || (@mythology == 'amazing')");
=> [
  {name: "sphinx", mythology: "greek", eyes: 2, sex: "f", hobbies: ["riddles","sitting","being a wonder"], cid:0},
  {name: "medusa",  mythology: "greek", eyes: 2, sex: "f", hobbies: ["coiling","staring"], cid:5},
  {name: "HamoIzm", mythology: "amazing", eyes: 2, sex: "m", hobbies: ["riddles","hunting"], cid:6}
]

// retrieve elements creation date
collection.get(6).$created;

// retrieve elements last edit date
collection.get(6).$updated;

// List all elements in the collection
collection.items;

// Update an element, it will add un-exsited key and replace existed ($created and cid can't be changed)
collection.update(5, {eyes: 3, food:"waloo"});
collection.get(5);
=> {name: "medusa",  mythology: "greek", eyes: 3, food:"waloo", sex: "f", hobbies: ["coiling","staring"], cid:5}

// Replace the element with the same cid and $created
collection.replace(6, {car: "Ferrari"});
collection.get(6);
=> {car: "Ferrari", cid:6}

// Delete an item by cid
collection.remove(1);

// Save all to files
collection.save();
