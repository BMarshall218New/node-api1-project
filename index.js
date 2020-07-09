const express = require("express");
const shortid = require("shortid");

const server = express();

let users = [];

server.use(express.json());

server.get("/", (req, res) => {
    res.json({ hello: "Jabroni" });
})

//create
server.post("/api/users", (req, res) => {
    const userInfo = req.body;
    userInfo.id = shortid.generate();
    try {
        users.push(userInfo);

        res.status(201).json(userInfo);

    } catch (err) {
        res.status(500).json({ errormessage: "There was an error while saving the user to the database", err })

    }

})
//read
server.get("/api/users", (req, res) => {
    res.json(users);
})
server.get("/api/users/:id", (req, res) => {
    const { id } = req.params;
    try {
        let unique = users.find(user => user.id === id)

        if (unique) {
            res.json(unique);
            res.status(200).json(unique)
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        }

    } catch (err) {
        res.status(500).json({ errormessage: "The users information could not be retrieved", err })

    }


})

//delete 
server.delete("/api/users/:id", (req, res) => {
    const { id } = req.params;
    try {
        const deleted = users.find(user => user.id === id);

        if (deleted) {
            users = users.filter(user => user.id !== id);
            res.status(200).json(deleted);
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist" });
        }

    } catch (err) {
        res.status(500).json({ errormessage: "The user could not be removed", err })

    }

})

server.put("/api/users/:id", (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    changes.id = id;

    try {
        let index = users.findIndex(user => user.id === id);

        if (index !== -1) {
            users[index] = changes;
            res.status(200).json(users[index])
        } else {
            res.status(404).json({ message: " The user with the specified ID does not exist" })
        }
    } catch (err) {
        res.status(500).json({ errormessage: "The user information could not be modified", err })
    }
})


const PORT = 4000;
server.listen(PORT, () => {
    console.log("Listening on localhost: ", PORT);
})