const  express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoute = require("./routes/user");
const applyRoute = require("./routes/apply");
const cors = require('cors');

dotenv.config();
const port = 8080

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
// Allow requests from any origin
// const corsOptions = {
//   origin: '*',
//   optionsSuccessStatus:204
// };

//app.use(cors(corsOptions));
// Enable CORS for all routes
app.use(cors());

// Handle preflight (OPTIONS) requests
app.options('*', cors());

// middleware
app.use(express.json());
app.use("/api/v1/user", userRoute);
app.use("/api/v1/apply", applyRoute);



app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Server up and listening on port ${port}!`))