const db = require("../database/db.json")
const { saveToDatabase } = require("../../lib/saveToDatabase")


//main methods of functions
const getAllQuotes = (req, res) => {
    try {
        res.status(200).json({ status: 200, data: db.quotes })
    } catch (err) {
        res.status(500).json({ error: '${err.message}' })
    }

}

const getOneQuote = (req, res) => {
    const id = parseInt(req.params.id) - 1;

    const userExists = db.quotes.findIndex((value) => value.id === id) > -1

    if (!userExists) {
        return res.status(404).json({ error: "Record doesn't exist" })
    }
    return res.status(200).json({ data: db.quotes[id] })
}

const createQuote = (req, res) => {
    const { author, quote, id } = req.body

    //check data is valid
    if (!author || !quote || !id) {
        return res.status(400).json({ status: 400, msg: "missing or empty fields" })
    }

    //check if user doesnt exist
    const userExists = db.quotes.findIndex((value) => value.id === id) > -1

    if (userExists) {
        return res.status(400).json({ status: 400, msg: "Record exists already" })
    }
    //save to database
    const newUser = {
        id: db.quotes[db.quotes.length - 1].id + 1,
        author,
        quote,
        createdAt: new Date()
    }
    db.quotes.push(newUser)
    saveToDatabase(db)

    res.status(201).json({ status: 201, data: db.quotes })
}

const updateQuote = (req, res) => {
    const id = parseInt(req.params.id)
    const userIndex = db.quotes.findIndex((value) => value.id === id) > -1

    if (userIndex === -1) {
        return res.status(404).json({ error: "Record doesn't exist" });

    } else {
        const updatedQuote = {
            ...db.quotes[userIndex],
            updatedAt: new Date()
        }
        db.quotes[userIndex] = updatedQuote
        saveToDatabase(db)
        res.status(200).json({ status: 200, msg: "Record updated" })
    };
}

const deleteQuote = (req, res) => {
    const id = parseInt(req.params.id)
    const userIndex = db.quotes.findIndex((value) => value.id === id)

    if (userIndex === -1) {
        return res.status(404).json({ error: "Record doesn't exist" });

    } else {
        db.quotes.splice(userIndex, 1),
            saveToDatabase(db)
        res.status(200).json({ status: 200, msg: "Record deleted" })
    };
}
module.exports = {
    getAllQuotes,
    getOneQuote,
    createQuote,
    updateQuote,
    deleteQuote
}