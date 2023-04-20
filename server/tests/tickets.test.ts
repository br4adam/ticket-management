import request from "supertest"
import app from "../app"
import jwt from "jsonwebtoken"
import { connect, disconnect, clear } from "./databaseHandler"
import { User } from "../models/User"
import { Company } from "../models/Company"
import { Ticket } from "../models/Ticket"
const secretKey = process.env.JWT_SECRET_KEY as string

beforeAll(async () => await connect())
afterEach(async () => await clear())
afterAll(async () => await disconnect())

describe("GET /api/tickets", () => {
  it("should return status 200 and all tickets created by user", async () => {
    // given
    const company = await Company.create({ name: "Test Company" })
    const user = await User.create({ sub: "1234", name: "User", email: "user@test.com", company: company._id })
    await Ticket.create([ { createdBy: user._id, subject: "First ticket", company: user.company }, { createdBy: user._id, subject: "Second ticket", company: user.company } ])
    const token = jwt.sign(user.toJSON(), secretKey)
    // when
    const response = await request(app)
      .get("/api/tickets")
      .set("Authorization", `Bearer ${token}`)
    // then
    const dbContent = await Ticket.find()
    expect(dbContent).toHaveLength(2)
    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBeTruthy()
    expect(response.body.length).toBe(2)
  })

  it("should return status 200 and an empty array when the database is empty", async () => {
    // given
    const company = await Company.create({ name: "Test Company" })
    const user = await User.create({ sub: "1234", name: "User", email: "user@test.com", company: company._id })
    const token = jwt.sign(user.toJSON(), secretKey)
    // when
    const response = await request(app)
      .get("/api/tickets")
      .set("Authorization", `Bearer ${token}`)
    // then
    const dbContent = await Ticket.find()
    expect(dbContent).toHaveLength(0)
    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBeTruthy()
    expect(response.body.length).toBe(0)
  })
})

describe("GET /api/tickets/:id", () => {
  it("should return status 200 and one ticket", async () => {
    // given
    const company = await Company.create({ name: "Test Company" })
    const user = await User.create({ sub: "1234", name: "User", email: "user@test.com", company: company._id })
    const ticket = await Ticket.create({ createdBy: user._id, subject: "Subject", company: user.company })
    const token = jwt.sign(user.toJSON(), secretKey)
    // when
    const response = await request(app)
      .get(`/api/tickets/${ticket._id}`)
      .set("Authorization", `Bearer ${token}`)
    // then
    const dbContent = await Ticket.find()
    expect(dbContent).toHaveLength(1)
    expect(response.status).toBe(200)
    expect(response.body.subject).toBe("Subject")
    expect(response.body.status).toBe("open")
  })

  it("should return status 422 if the id is not correct", async () => {
    // given
    const user = await User.create({ sub: "1234", name: "User", email: "user@test.com" })
    const token = jwt.sign(user.toJSON(), secretKey)
    // when
    const response = await request(app)
      .get("/api/tickets/1234567")
      .set("Authorization", `Bearer ${token}`)
    // then
    expect(response.status).toBe(422)
    expect(response.body).toBe("Please provide correct id.")
  })
})

describe("POST /api/tickets", () => {
  it("should return status 201 and the id of the created ticket", async () => {
    // given
    const company = await Company.create({ name: "Test Company" })
    const user = await User.create({ sub: "1234", name: "User", email: "user@test.com", company: company._id })
    const newTicket = { createdBy: user._id, subject: "Subject", company: user.company }
    const token = jwt.sign(user.toJSON(), secretKey)
    // when
    const response = await request(app)
      .post("/api/tickets")
      .set("Authorization", `Bearer ${token}`)
      .send(newTicket)
    // then
    const dbContent = await Ticket.find()
    expect(dbContent).toHaveLength(1)
    expect(response.status).toBe(201)
    expect(typeof response.body).toBe("string")
  })

  it("should return status 400 if the new ticket does not match the schema", async () => {
    // given
    const company = await Company.create({ name: "Test Company" })
    const user = await User.create({ sub: "1234", name: "User", email: "user@test.com", company: company._id })
    const newTicket = { createdBy: user._id }
    const token = jwt.sign(user.toJSON(), secretKey)
    // when
    const response = await request(app)
      .post("/api/tickets")
      .set("Authorization", `Bearer ${token}`)
      .send(newTicket)
    // then
    const dbContent = await Ticket.find()
    expect(dbContent).toHaveLength(0)
    expect(response.status).toBe(400)
    expect(response.body).toBe("Validation error.")
  })
})

describe("PUT /api/tickets/:id", () => {
  it("should return status 200 and the updated ticket", async () => {
    // given
    const company = await Company.create({ name: "Test Company" })
    const user = await User.create({ sub: "1234", name: "User", email: "user@test.com", company: company._id })
    const ticket = await Ticket.create({ createdBy: user._id, subject: "Subject", company: user.company })
    const token = jwt.sign(user.toJSON(), secretKey)
    // when
    const response = await request(app)
      .put(`/api/tickets/${ticket._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ priority: "high" })
    // then
    const dbContent = await Ticket.find()
    expect(dbContent).toHaveLength(1)
    expect(response.status).toBe(200)
    expect(response.body.subject).toBe("Subject")
    expect(response.body.priority).toBe("high")
  })

  it("should return status 400 if wrong data sent", async () => {
    // given
    const company = await Company.create({ name: "Test Company" })
    const user = await User.create({ sub: "1234", name: "User", email: "user@test.com", company: company._id })
    const ticket = await Ticket.create({ createdBy: user._id, subject: "Subject", company: user.company })
    const token = jwt.sign(user.toJSON(), secretKey)
    // when
    const response = await request(app)
      .put(`/api/tickets/${ticket._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ priority: "deleted" })
    // then
    expect(response.status).toBe(400)
  })
})

describe("PUT /api/tickets/:id/messages", () => {
  it("should return status 200 and save the new message to database", async () => {
    // given
    const company = await Company.create({ name: "Test Company" })
    const user = await User.create({ sub: "1234", name: "User", email: "user@test.com", company: company._id })
    const ticket = await Ticket.create({ createdBy: user._id, subject: "Subject", company: user.company })
    const newMessage = { user: user._id, message: "Hello!" }
    const token = jwt.sign(user.toJSON(), secretKey)
    // when
    const response = await request(app)
      .put(`/api/tickets/${ticket._id}/messages`)
      .set("Authorization", `Bearer ${token}`)
      .send(newMessage)
    // then
    const dbContent = await Ticket.find()
    expect(dbContent).toHaveLength(1)
    expect(response.status).toBe(200)
    expect(response.body.messages[0].message).toBe("Hello!")
  })

  it("should return status 400 if the message is empty", async () => {
    // given
    const company = await Company.create({ name: "Test Company" })
    const user = await User.create({ sub: "1234", name: "User", email: "user@test.com", company: company._id })
    const ticket = await Ticket.create({ createdBy: user._id, subject: "Subject", company: user.company })
    const newMessage = { user: user._id, message: "" }
    const token = jwt.sign(user.toJSON(), secretKey)
    // when
    const response = await request(app)
      .put(`/api/tickets/${ticket._id}/messages`)
      .set("Authorization", `Bearer ${token}`)
      .send(newMessage)
    // then
    expect(response.status).toBe(400)
    expect(response.body).toBe("Validation error.")
  })
})

describe("DELETE /api/tickets/:id", () => {
  it("should return status 200 and delete the ticket from database", async () => {
    // given
    const company = await Company.create({ name: "Test Company" })
    const user = await User.create({ sub: "1234", name: "User", email: "user@test.com", company: company._id })
    const ticket = await Ticket.create({ createdBy: user._id, subject: "Subject", company: user.company })
    const token = jwt.sign(user.toJSON(), secretKey)
    // when
    const response = await request(app)
      .delete(`/api/tickets/${ticket._id}`)
      .set("Authorization", `Bearer ${token}`)
    // then
    const dbContent = await Ticket.find()
    expect(dbContent).toHaveLength(0)
    expect(response.status).toBe(200)
    expect(response.body).toBe("Ticket has been deleted successfully.")
  })

  it("should return status 422 if the id is not correct", async () => {
    // given
    const user = await User.create({ sub: "1234", name: "User", email: "user@test.com" })
    const token = jwt.sign(user.toJSON(), secretKey)
    // when
    const response = await request(app)
      .delete(`/api/tickets/1234567`)
      .set("Authorization", `Bearer ${token}`)
    // then
    expect(response.status).toBe(422)
    expect(response.body).toBe("Please provide correct id.")
  })
})