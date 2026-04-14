require("dotenv").config();
const express = require("express");
const connectMongo = require("./config/mongo");

const app = express();

app.use(express.json());

connectMongo();

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/tasks", require("./routes/task.routes"));

app.use(require("./middleware/error.middleware"));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});