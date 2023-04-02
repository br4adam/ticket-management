import mongoose from "mongoose"
import { Schema, InferSchemaType } from "mongoose"

const ticketSchema = new Schema({
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  subject: { type: String, trim: true, required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  description: { type: String },
  priority: { type: String, required: true, default: "Low" },
  status: { type: String, default: "Open" },
  messages: [ 
    {
      date: { type: Date, default: Date.now },
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      message: { type: String, required: true }
    }
  ]
},
{ timestamps: { createdAt: true, updatedAt: true } })

export type TicketType = InferSchemaType<typeof ticketSchema> & {createdAt: Date, updatedAt: Date}
export const Ticket = mongoose.model("Ticket", ticketSchema)