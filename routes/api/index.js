const router = require('express').Router();

const {
    getAllThoughts,
    getSingleThought,
    updateThought,
    deleteThought,
    createThought,
    createReaction,
    removeReaction
} = require('../../controllers/thought-controller');


const {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controller');

/**
 * Return all users
 * GET /api/users
 */
router.get('/users', getAllUsers);

/**
 * Return single user from database.
 * GET /api/users/_id
 */
router.get('/users/:id', getSingleUser);

/**
 * Create new User
 * POST /api/users
 */
router.post('/users', createUser);

/**
 * Update a user
 * PUT /api/users/_id
 */
router.put('/users/:id', updateUser);

/**
 * Remove a user from the database
 * DELETE /api/users/_id
 */
router.delete('/users/:id', deleteUser);

router.post('/users/:userId/friends/:friendId', addFriend);

router.delete('/users/:userId/friends/:friendId', removeFriend);




router.get('/thoughts', getAllThoughts);

router.get('/thoughts/:id', getSingleThought);

router.put('/thoughts/:id', updateThought);

router.post('/thoughts', createThought);

router.delete('/thoughts/:id', deleteThought)

router.post('/thoughts/:thoughtId/reactions', createReaction);

router.delete('/thoughts/:thoughtId/reactions/:reactionId', removeReaction);

module.exports = router;

