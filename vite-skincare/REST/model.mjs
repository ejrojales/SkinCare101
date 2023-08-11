import mongoose from 'mongoose';
import 'dotenv/config';
import { auth } from 'express-oauth2-jwt-bearer';

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
    authorID: String,
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

const userSchema = mongoose.Schema({
    name: String, // String is shorthand for {type: String}
    email: String,
    user_id: String, // default _id is used for routes since | vertical bar in sub prop is not accepted in url; no use case for user_id yet
    date: { type: Date, default: Date.now },
    favorites: []
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Routine = mongoose.model("Routine", routineSchema);
const User = mongoose.model("User", userSchema);


// creates a routine and returns a promise to save to the database
const createRoutine = async (title, author, authorID, tag, comments, date, hidden, products) => {
    const routine = new Routine({ title: title, author: author, authorID: authorID, tag: tag, comments: comments, date: date, hidden: hidden, products: products });
    return routine.save();
};

const createUser = async (name, email, user_id, date, favorites) => {
    const user = new User({ name: name, email: email, user_id: user_id, date: date, favorites: favorites });
    return user.save();
};

const findRoutines = async () => {
    const query = Routine.find();
    return query.exec();
};

const findUserRoutines = async (authorID) => {
    const query = Routine.find({ authorID: authorID })
    return query.exec();
};

const findUserByUserId = async (user_id) => {
    const query = User.findOne({ user_id: user_id });
    return query.exec()
};

const updateExercise = async (filter, update) => {
    const result = await Exercise.updateOne(filter, update);
    return result.modifiedCount;
};

const deleteById = async (_id) => {
    const result = await Exercise.deleteOne({ _id: _id });
    return result.deletedCount;
}

export { createRoutine, findRoutines, findUserRoutines, createUser, findUserByUserId }

