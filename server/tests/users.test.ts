import request from "supertest"
import app from "../app"
import jwt from "jsonwebtoken"
import { connect, disconnect, clear } from "./databaseHandler"
import { User } from "../models/User"
import { Company } from "../models/Company"
const secretKey = process.env.JWT_SECRET_KEY as string

beforeAll(async () => await connect())
afterEach(async () => await clear())
afterAll(async () => await disconnect())

describe("GET /api/users", () => {
  it("should return status 200 and all users from the company", async () => {
    // given
    const company = await Company.create({ name: "Test Company" })
    const user = await User.create({ sub: "1234", name: "User", email: "user@test.com", company: company._id })
    await User.create([ { sub: "1", name: "User 1", email: "user1@test.com", company: company._id }, { sub: "2", name: "User 2", email: "user2@test.com", company: company._id }, { sub: "3", name: "User 3", email: "user3@test.com", company: company._id } ])
    const token = jwt.sign(user.toJSON(), secretKey)
    // when
    const response = await request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${token}`)
    // then
    const dbContent = await User.find()
    expect(dbContent).toHaveLength(4)
    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBeTruthy()
    expect(response.body.length).toBe(4)
  })
})

describe("GET /api/users/me", () => {
  it("should return status 200 and all data of the user", async () => {
    // given
    const user = await User.create({ sub: "1234", name: "User", email: "user@test.com" })
    const token = jwt.sign(user.toJSON(), secretKey)
    // when
    const response = await request(app)
      .get("/api/users/me")
      .set("Authorization", `Bearer ${token}`)
    // then
    const dbContent = await User.find()
    expect(dbContent).toHaveLength(1)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("_id")
    expect(response.body.name).toBe("User")
    expect(response.body.email).toBe("user@test.com")
  })
})

describe("PUT /api/users/me", () => {
  it("should return status 200 and change the avatar and phone number of the user", async () => {
    // given
    const user = await User.create({ sub: "1234", name: "User", email: "user@test.com", avatar: "picture1" })
    const token = jwt.sign(user.toJSON(), secretKey)
    // when
    const response = await request(app)
      .put("/api/users/me")
      .set("Authorization", `Bearer ${token}`)
      .send({ avatar: "picture2", phone: "+123456789" })
    // then
    const dbContent = await User.find()
    expect(dbContent).toHaveLength(1)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("_id")
    expect(response.body.avatar).toBe("picture2")
    expect(response.body.phone).toBe("+123456789")
  })

  it("should return status 400 if wrong data sent", async () => {
    // given
    const user = await User.create({ sub: "1234", name: "User", email: "user@test.com" })
    const token = jwt.sign(user.toJSON(), secretKey)
    // when
    const response = await request(app)
      .put("/api/users/me")
      .set("Authorization", `Bearer ${token}`)
      .send({ email: "invalidformat.com" })
    // then
    const dbContent = await User.find()
    expect(dbContent).toHaveLength(1)
    expect(dbContent[0].email).toBe("user@test.com")
    expect(response.status).toBe(400)
  })
})