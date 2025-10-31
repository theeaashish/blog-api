import { Schema, model, Types } from 'mongoose';

interface TokenTypes {
  token: string;
  userId: Types.ObjectId;
}

const tokenSchema = new Schema<TokenTypes>({
  token: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

export default model<TokenTypes>('Token', tokenSchema);
