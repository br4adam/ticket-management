import mongoose, { Schema, InferSchemaType } from "mongoose"

const companySchema = new Schema({
  name: { type: String, trim: true, required: true, unique: true },
  admins: [
    { type: Schema.Types.ObjectId, ref: "User" }
  ]
})

export type CompanyType = InferSchemaType<typeof companySchema>
export const Company = mongoose.model("Company", companySchema)