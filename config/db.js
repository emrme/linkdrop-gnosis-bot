import mongoose from 'mongoose'
require('dotenv').config()

const MONGODB_URI =
  process.env.MONGODB_URI ||
  `mongodb://localhost:27017/linkdropgnosisbot-rinkeby`

const connectDB = async () => {
  try {
    await mongoose.connect(
      MONGODB_URI,
      { useNewUrlParser: true, useCreateIndex: true }
    )
    console.log(`Connected to database`)
  } catch (err) {
    console.error(err.message || err)
    process.exit(1)
  }
}

export default connectDB
