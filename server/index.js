const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const database = require("./config/database");
const userRoutes = require("./routes/User");

dotenv.config();
const PORT = process.env.PORT || 8000;

//database connect
database.connect();


app.use(express.json());
//app.use(cookieParser);
console.log("Checking in index file");

/*
app.use(
    cors({
        origin: "http://localhost:1000",
        credentials: true,
    })
);
*/
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);


//Routes Before User is Logged In
app.use("/api/v2");


//Routes After User is Logged In
app.use("/api/v2/auth", userRoutes);







app.get('/', (req, res) => {
	return res.status(200).json({
		success: true,
		message: "Server is up and running from our end and their end as well",
	})
});

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
