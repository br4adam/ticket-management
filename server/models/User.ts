import mongoose, { Schema, InferSchemaType } from "mongoose"

const userSchema = new Schema({
  sub: { type: String, required: true, unique: true, immutable: true },
  name: { type: String, trim: true, required: true },
  email: { type: String, trim: true, required: true },
  avatar: { type: String },
  company: { type: Schema.Types.ObjectId, ref: "Company" },
  phone: { type: String }
},
{ timestamps: { createdAt: true, updatedAt: true } })

export type UserType = InferSchemaType<typeof userSchema>
export const User = mongoose.model("User", userSchema)