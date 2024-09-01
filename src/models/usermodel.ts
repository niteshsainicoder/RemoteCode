import mongoose, { Document, Model, Schema, Types } from "mongoose";
import bcrypt from "bcrypt";

// Define the User schema interface
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  token: string;
  codeExecutions: Types.ObjectId[];
}

// Define the User schema
const userSchema: Schema<IUser> = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    codeExecutions: [{ type: Types.ObjectId, ref: "Code" }], // Correctly specify this as an array
    token: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

// Middleware to hash the password before saving
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error: any) {
    next(error);
  }
});

// Define the User model
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export { User };
