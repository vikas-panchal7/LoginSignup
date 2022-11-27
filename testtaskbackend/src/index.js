const express = require("express");
const cors = require("cors");
const path = require("path");
require("./db/mongoose");

const userRouter = require("./routes/user");

const port = 5000 || process.env.PORT;
const app = express();
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(express.json());
app.use(cors());
app.use(userRouter);

app.listen(port, () => console.log(`backend listening on port ${port}!`));
