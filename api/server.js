// BUILD YOUR SERVER HERE

const express = require("express");
const server = express();
const port = 5000;

server.get("/hello", (req, res) => {
	res.json({ message: "hello" });
});


module.exports = server; // EXPORT YOUR SERVER instead of {}
