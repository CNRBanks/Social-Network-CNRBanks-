const { Schema, model, Types } = require('mongoose');
const datesFormat = require('../utils/datesFormat');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    responseBody: {
      type: String,
      required: true,
      maxlength: 500,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAt => datesFormat(createdAt)
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

const thoughtsSchema = new Schema(
  {
    thoughtsText: {
      type: String,
      required: true,
      maxlength: 500,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAt => datesFormat(createdAt)
    },
    reactions:[reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtsSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
})

const Thoughts = model('Thoughts', thoughtsSchema)

module.exports = Thoughts;
