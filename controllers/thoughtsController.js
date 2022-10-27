const { Thoughts, User } = require("../models");

module.exports = {
  // get ALL thoughts
  getTodosThoughts(req, res) {
    Thoughts.find({})
      .then((todosThoughts) => res.json(todosThoughts))
      .catch((err) => res.status(500).json(err));
  },
  // get single thought using id
  getUnoThoughtsById(req, res) {
    Thoughts.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "Aint no thought with that ID son!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new thought
  createThought(req, res) {
    Thoughts.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "Thought created, but there aint no user with that ID",
            })
          : res.json("You created a thought son! 🎉")
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // put update thoughts
  updateThoughts(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "No thoughts with this id you son of a gun!" })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // delete thoughts
  deleteThoughts(req, res) {
    Thoughts.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "No thought with this id, stoopid!" })
          : res.json(thought)
      )
      // .then((user) =>
      //   !user
      //     ? res
      //         .status(404)
      //         .json({ message: "Thought created but no user with this id gosh darnit!" })
      //     : res.json({ message: "thought deleted frfr!" })
      // )
      .catch((err) => res.status(500).json(err));
  },
  // Add a thought response
  addThoughtsResponse(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { responses: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "No thought with this id ya dingus!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove thought response
  removeThoughtsResponse(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { responseId: req.params.responseId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({
                message: "No thought with this id you freakin mouth breather!",
              })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
