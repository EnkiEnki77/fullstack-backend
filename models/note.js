const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI;

console.log(typeof url);

mongoose.connect(url)
    .then(() => console.log('Connected to mongo'))
    .catch(err => {
        console.log('error connecting to mongo', err.message);
    });

const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        minLength: 5,
        required: true
    },
    important: Boolean
});

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Note', noteSchema);