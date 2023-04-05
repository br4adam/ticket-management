import mongoose, { Schema, InferSchemaType } from "mongoose"

const ticketSchema = new Schema({
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  subject: { type: String, trim: true, required: true },
  company: { type: Schema.Types.ObjectId, ref: "Company", required: true },
  description: { type: String },
  priority: { type: String, enum: ["low", "medium", "high"], default: "low" },
  status: { type: String, enum: ["open", "pending", "closed"], default: "open" },
  messages: [ 
    {
      date: { type: Date, default: () => new Date() },
      user: { type: Schema.Types.ObjectId, ref: "User", required: true },
      message: { type: String, required: true }
    }
  ]
},
{ timestamps: { createdAt: true, updatedAt: true } })

export type TicketType = InferSchemaType<typeof ticketSchema>
export const Ticket = mongoose.model("Ticket", ticketSchema)