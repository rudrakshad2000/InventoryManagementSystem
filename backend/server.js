const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const itemRoutes =
require("./routes/itemRoutes");
const errorMiddleware =
require("./middleware/errorMiddleware");
app.use(cors());
app.use(bodyParser.json());
app.use("/api/items", itemRoutes);
app.use(errorMiddleware);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(
        `Server Running on Port ${PORT}`
    );
});