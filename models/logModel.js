import mongoose from 'mongoose';

const logSchema = mongoose.Schema(
  {
    riderName: {
      type: String,
      required: true
    },
    riderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Rider'
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    userName: {
      type: String,
      required: true
    },
    accessTime: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Log', logSchema);
