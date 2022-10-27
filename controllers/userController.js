const User = require('../models/User');

module.exports = {
  // GET all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // GET one user using id
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('thoughts')
      .populate('friends')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID brodie' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  // update user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
      !user
        ? res.status(404).json( {message: 'Lo siento, there is no user with this ID'})
        : res.json(user)
    )
    .catch((err) => {
      res.status(500).json(err);
    });
  },
  // delete user
  deleteUser(req, res) {
    User.findOneAndDelete(
      { _id: req.params.userId }
    )
    .then((user) => 
      !user
        ? res.status(404).json({ message: 'NO USER WITH THIS ID U FREAK'})
        : res.json(user)
      )
    .catch((err) => {
      res.status(500).json(err);
    });
  },
  // POST add friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: {friends: req.params.friendId } },
      { runValidators: true, new: true}
    )
    .then((user) => 
      !user
      ? res.status(404).json({ message: 'Aint no user with this ID boyo'})
      : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete friend
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: {friends: req.params.friendId } },
      { runValidators: true, new: true}
    )
      .then((user) => 
        !user
        ? res.status(404).json({ message: 'How many times do I have to tell you? There is no user with this ID!'})
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err))
  },
};
