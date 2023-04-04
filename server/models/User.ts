import mongoose from "mongoose"
import { Schema, InferSchemaType } from "mongoose"

const userSchema = new Schema({
  sub: { type: String, required: true, unique: true, immutable: true },
  name: { type: String, trim: true, required: true },
  email: { type: String, trim: true, required: true },
  picture: { type: String },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  phone: { type: String }
},
{ timestamps: { createdAt: true, updatedAt: true } })

export type UserType = InferSchemaType<typeof userSchema> & {createdAt: Date, updatedAt: Date}
export const User = mongoose.model("User", userSchema)