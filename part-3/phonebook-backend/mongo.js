const mongoose = require("mongoose");

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.ncuno.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Person = mongoose.model("Person", phonebookSchema);

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
});

if (process.argv.length < 3) {
  console.log("Please provide the password");
  process.exit(1);
} else if (process.argv.length == 3) {
  Person.find({}).then((result) => {
    console.log(`phonebook:`);
    result.forEach((person) => {
      console.log(person.name + " " + person.number);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length == 5) {
  person.save().then((result) => {
    console.log(
      `added ${result.name} number ${result.number} to phonebook result`
    );
    mongoose.connection.close();
  });
}
