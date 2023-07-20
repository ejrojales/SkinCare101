import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);


// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Define the schema
 */
const routineSchema = mongoose.Schema({
    title: String, // String is shorthand for {type: String}
    author: String,
    tag: String,
    comments: [{ body: String }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    products: {
        cleanse: [],
        moisturize: [],
        protect: []
    }
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Routine = mongoose.model("Routine", routineSchema);

// creates a routine and returns a promise to save to the database
const createRoutine = async (title, author, tag, comments, date, hidden, products) => {
    const routine = new Routine({ title: title, author: author, tag: tag, comments: comments, date: date, hidden: hidden, products: products });
    return routine.save();
};


const findRoutines = async () => {
    const query = Routine.find();
    return query.exec();
};

const findExerciseById = async (_id) => {
    return await Exercise.findById(_id).exec();
};

const updateExercise = async (filter, update) => {
    const result = await Exercise.updateOne(filter, update);
    return result.modifiedCount;
};

const deleteById = async (_id) => {
    const result = await Exercise.deleteOne({ _id: _id });
    return result.deletedCount;
}

export { createRoutine, findRoutines }

