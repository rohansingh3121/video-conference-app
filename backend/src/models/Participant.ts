import mongoose, { Document, Schema } from 'mongoose';

interface IParticipant extends Document {
  name: string;
  conference_id: string;
}

const ParticipantSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  conference_id: {
    type: String,
    required: true,
  },
});

const Participant = mongoose.model<IParticipant>('Participant', ParticipantSchema);
export default Participant;
