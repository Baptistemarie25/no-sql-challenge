const { User } = require('../models');

const userController = {
    getAllUsers: (req, res) => {
    User.find()
        .select('-__v')
        .then(users => res.json(users))
        .catch(err => {
        console.log(err.message);
        return res.sendStatus(500);
        });
    },
    
    getSingleUser: (req, res) => {
    const userId = req.params.id;

    User.findOne({ _id: userId })
        .populate('friends')
        .populate('thoughts')
        .select('-__v')
        .then(user => {
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.json(user);
        })
        .catch(err => {
            console.log(err.message);
            return res.sendStatus(500);
        });
    },

    createUser: (req, res) => {
    const {
        username,
        email,
    } = req.body;

    if (!username || !email) {
        return res.status(400).json({
            message: 'Missing username or email',
        });
    }

    User.create({ username, email })
        .then(user => res.json(user))
        .catch(err => {
        console.log(err.message);
        return res.sendStatus(500);
        });
    },

    updateUser: (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true },
    )
        .then(user => {
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.json(user);
        })
        .catch(err => {
        console.log(err.message);
        return res.sendStatus(500);
        });
    },
    deleteUser: (req, res) => {
    User.findOneAndDelete({ _id: req.params.id })
        .then(user => {
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // TODO: Remove the user's `thoughts` records

        return res.sendStatus(204);
        });
    },

    addFriend: (req, res) => {
        User.findOneAndUpdate({_id: req.params.userId}, { $push: { friends: req.params.friendId}})
            .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            
            return res.sendStatus(204);
            });
        },

    removeFriend: (req, res) => {
        User.findOneAndUpdate({_id: req.params.userId}, { $pull: { friends: req.params.friendId}})
            .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            
            return res.sendStatus(204);
            });
        },
};

module.exports = userController;