const mongoose = require("mongoose")

const connectDb = async (dbURI) => {
  await mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

module.exports = connectDb