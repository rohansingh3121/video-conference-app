import mongoose, { Document, Schema } from 'mongoose';

interface ISession extends Document {
  host_id: mongoose.Schema.Types.ObjectId;
  session_time: Date;
}

const SessionSchema: Schema = new Schema({
  host_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Host',
    required: true,
  },
  session_time: {
    type: Date,
    required: true,
  },
});

const Session = mongoose.model<ISession>('Session', SessionSchema);
export default Session;
