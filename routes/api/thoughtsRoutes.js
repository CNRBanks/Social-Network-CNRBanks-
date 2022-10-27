const router = require("express").Router();
const {
  getTodosThoughts,
  getUnoThoughtsById,
  createThought,
  updateThoughts,
  deleteThoughts,
  addThoughtsResponse,
  removeThoughtsResponse,
} = require("../../controllers/thoughtsController");

// /api/thoughts
router.route("/").get(getTodosThoughts).post(createThought);

// /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getUnoThoughtsById)
  .put(updateThoughts)
  .delete(deleteThoughts);

// /api/thoughts/:thoughtsId/responses
router.route("/:thoughtId/responses").post(addThoughtsResponse);

// /api/videos/:videoId/responses/:responseId
router.route("/:videoId/responses/:responseId").delete(removeThoughtsResponse);

module.exports = router;
