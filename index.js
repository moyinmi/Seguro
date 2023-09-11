const  express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoute = require("./routes/user");
const applyRoute = require("./routes/apply")

dotenv.config();
const port = 8080

// connect to DB
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("Connected to MongoDB!");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

  mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  
  })
  .then(() => {
    console.log('Connected to MongoDB!');
    // Your server initialization code here
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// middleware
app.use(express.json());
app.use("/api/v1/user", userRoute);
app.use("/api/v1/apply", applyRoute);

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Server up and listening on port ${port}!`))