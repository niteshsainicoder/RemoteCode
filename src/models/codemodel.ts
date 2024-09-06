import mongoose, { Document, Model, Schema, Types } from "mongoose";

// Define the interface for your schema
interface IUser extends Document {
  userId: Types.ObjectId;
  title: string;
  codeContent: string; // Correct usage of TypeScript 'string'
  output: string; // Changed 'String' to lowercase 'string'
  language: string;
}

// Create a schema for the code model
const codeSchema: Schema<IUser> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true }, // Correct usage
    codeContent: { type: String, required: true }, // Correct usage of 'String' for schema type
    output: { type: String, default: "Happy Coding" }, // Corrected typo from 'ouput' to 'output'
    language: { type: String, required: true }, // Correct usage of 'String' for schema type
  },
  { timestamps: true }
);

// Export the model with a consistent model name
export const Code: Model<IUser> =
  mongoose.models.Code || mongoose.model<IUser>("Code", codeSchema);
