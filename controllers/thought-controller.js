const { Thought, User } = require('../models');

const thoughtController = {
    // get all thoughts 

    getAllThoughts: (req, res) => {
        Thought.find()
        .select('-__v')
        .then(thoughts => res.json(thoughts))
        .catch(err => {
        console.log(err.message);
        return res.sendStatus(500);
        });
    },

    getSingleThought: (req, res) => {
        const thoughtId = req.params.id;
    
        Thought.findOne({ _id: thoughtId })
            .populate('thoughtText')
            .select('-__v')
            .then(thought => {
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
    
            return res.json(thought);
            })
            .catch(err => {
                console.log(err.message);
                return res.sendStatus(500);
            }
        );
    },

    createThought: ({body}, res) => {

        Thought.create({
            thoughtText: body.thoughtText,
            username: body.username
        })
        .then(({ _id }) => {
            console.log('this is your id', _id)
            return User.findOneAndUpdate(
                {_id: body.userId },
                { $push: { thoughts: _id}},
                {new: true}
            )
        })
        .then(dbThoughtData => {
                    console.log(dbThoughtData);
                    if (!dbThoughtData) {
                        res.status(404).json({message: 'no user found with this id!'});
                        return;
                    }
                    res.json(dbThoughtData);
                })
                .catch(err => res.json(err));
    },

    updateThought: (req, res) => {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: true },
        )
            .then(thought => {
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
    
            return res.json(thought);
            })
            .catch(err => {
            console.log(err.message);
            return res.sendStatus(500);
            });
        },

    deleteThought: (req, res) => {
        Thought.findOneAndDelete({ _id: req.params.id })
            .then(thought => {
            if (!thought) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            // TODO: Remove the user's `thoughts` records
    
            return res.sendStatus(204);
            });
        },

        createReaction: (req, res) => {
            Thought.findOneAndUpdate(
                {_id: req.params.thoughtId}, 
                { $push: { reactions: req.body} },
                { new: true, runValidators: true }
                )
                .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'Thought not found' });
                    return;
                }
                res.json(dbThoughtData);
                })
                .catch((err) => {
                    console.log(err);
                });
            },


        removeReaction: (req, res) => {
            Thought.findOneAndUpdate(
                {_id: req.params.thoughtId}, 
                { $pull: { reactions: { reactionId: req.params.reactionId}}},
                { new: true })

                .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'Thought not found' });
                    return;
                }
                res.json(dbThoughtData);
                })
                .catch((err) => {
                    console.log(err);
                });
            },
    
};

module.exports = thoughtController;