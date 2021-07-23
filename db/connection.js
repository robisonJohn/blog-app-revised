import mongoose from 'mongoose';

// we changed projectsDevDatabase to postsDevDatabase
let MONGODB_URI = process.env.PROD_MONGODB || 'mongodb://127.0.0.1:27017/postsDevDatabase';

// Will create indices in MongoDB by default for faster queries
mongoose.set('useCreateIndex', true)

mongoose.set('returnOriginal', false)

// Setup connection for MongoDB
mongoose
    .connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
    .catch((error) => console.error('Error connecting to MongoDB: ', error.message))

// Listen to MongoDB events
mongoose.connection.on('disconnected', () => console.log(`Disconnected from MongoDB`))

// Listen to any errors while connected to MongoDB
mongoose.connection.on('error', (error) => console.error(`MongoDB connection error: ${error}`))

// Export the connection
export default mongoose.connection


