const express = require("express");
const User = require("./users/model");
const server = express();
server.use(express.json());

server.get("/api/users", (req, res) => {
	User.find()
		.then((users) => {
			console.log(users);
			res.status(200).json(users);
		})
		.catch((error) => {
			res.status(500).json({
				error: "couldn't get users",
				message: error.message,
				stack: error.stack,
			});
		});
});

server.get("/api/users/:id", (req, res) => {
	User.findById(req.params.id)
		.then((user) => {
			if (!user) {
				res.status(404).json({
					message: "The user with the specified ID does not exist",
				});
			}
			res.json(user);
		})
		.catch((error) => {
			res.status(500).json({
				error: "couldn't get user",
				message: error.message,
				stack: error.stack,
			});
		});
});

server.post("/api/users", (req, res) => {
	const user = req.body;
	if (!user.name || !user.bio) {
		res
			.status(400)
			.json({ message: "Please provide name and bio for the user" });
	} else {
		User.insert(user).then((createUser) => {
			res.status(201).json(createUser);
		});
	}
});

server.delete("/api/users/:id", async (req, res) => {
	try {
		const possUser = await User.findById(req.params.id);
		if (!possUser) {
			res
				.status(404)
				.json({ message: "The user with the specified ID does not exist" });
		} else {
			const deletedUser = await User.remove(possUser.id);
			res.status(200).json(deletedUser);
		}
	} catch(error) {
		res.status(500).json({
			error: "couldn't get user",
			message: error.message,
			stack: error.stack,
		});
	}
});

server.put("/api/users/:id", async (req, res) => {
	try {
		const possUser = await User.findById(req.params.id);
		if (!possUser) {
			res
				.status(404)
				.json({ message: "The user with the specified ID does not exist" });
		} else {
            if (!req.body.name || !req.body.bio){
                res.status(400).json({
                    message: "Please provide name and bio for the user"
                })
            }else {
                const updatedUser = await User.update(req.params.id, req.body)
                res.status(200).json(updatedUser)
            }
		}
	} catch(error) {
		res.status(500).json({
			error: "couldn't get user",
			message: error.message,
			stack: error.stack,
		});
	}
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
