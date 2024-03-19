const Kid = require("../models/kidModel");

/**
 * Creates a kid
 *
 * @param {*} req
 * @param {*} res
 */
const kidPost = (req, res) => {
    let kid = new Kid();
    kid.name = req.body.name;
    kid.pin = req.body.pin;
    kid.avatar = req.body.avatar;
    kid.user = req.body.user;
    kid.age = req.body.age

    if (kid.name ) {
        kid.save()
            .then(savedKid => {
                res.status(201).json(savedKid);
            })
            .catch(error => {
                res.status(422).json({ error: 'There was an error saving the kid' });
            });
    } else {
        res.status(422).json({ error: 'No valid data provided for kid' });
    }
};

/**
 * Get all Kids
 *
 * @param {*} req
 * @param {*} res
 */
const kidGet = (req, res) => {
    if (req.query && req.query.id) {
        Kid.find({ user: req.query.id })
            .then(kids => {
                res.json(kids);
            })
            .catch(err => {
                console.log('error while querying the child', err);
                res.status(500).json({ error: "Internal server error" });
            });
    } else {
        res.status(400).json({ error: "Missing 'id' parameter in query" });
    }
};


/**
 * Updates a kid
 *
 * @param {*} req
 * @param {*} res
 */
const kidPatch = (req, res) => {
    // get kid by id
    if (req.query && req.query.id) {
        Kid.findByIdAndUpdate(req.query.id, req.body, { new: true })
            .then(kid => {
                if (!kid) {
                    res.status(404).json({ error: "Kid doesn't exist" });
                } else {
                    res.json(kid);
                }
            })
            .catch(err => {
                console.log('error while updating the kid', err);
                res.status(500).json({ error: "Internal server error" });
            });
    } else {
        res.status(404).json({ error: "Kid doesn't exist" });
    }
};

/**
 * Deletes a kid
 *
 * @param {*} req
 * @param {*} res
 */
const kidDelete = (req, res) => {
    // get kid by id
    if (req.query && req.query.id) {
        Kid.findByIdAndDelete(req.query.id)
            .then(kid => {
                if (!kid) {
                    res.status(404).json({ error: "Kid doesn't exist" });
                } else {
                    res.status(204).json({});
                }
            })
            .catch(err => {
                console.log('error while deleting the kid', err);
                res.status(500).json({ error: "Internal server error" });
            });
    } else {
        res.status(404).json({ error: "Kid doesn't exist" });
    }
};

const kidLogin = (req, res) => {
    const { id, pin } = req.query;

    if (id && pin) {
        Kid.findOne({ _id: id, pin: pin })
            .then(kid => {
                if (!kid) {
                    res.status(404).json({ error: "kid doesn't exist" });
                } else {
                    res.json(kid);
                }
            })
            .catch(err => {
                console.log('error while querying the kid', err);
                res.status(500).json({ error: "Internal server error" });
            });
    } else {
        Kid.find()
            .then(kids => {
                res.json(kids);
            })
            .catch(err => {
                res.status(500).json({ error: err.message });
            });
    }
};

module.exports = {
    kidGet,
    kidPost,
    kidPatch,
    kidDelete,
    kidLogin
}