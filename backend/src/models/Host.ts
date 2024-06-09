import mongoose, { Document, Schema } from 'mongoose';

interface IHost extends Document {
  name: string;
  email: string;
  password: string;
}

const HostSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Host = mongoose.model<IHost>('Host', HostSchema);
export default Host;
