import request from "supertest"
import app from "../app"
import { connect, disconnect, clear, createUser } from "./databaseHandler"
import { User } from "../models/User"

beforeAll(async () => await connect())
afterEach(async () => await clear())
afterAll(async () => await disconnect())

describe("GET /api/users", () => {
  it("should return status 200 and all users from the company", async () => {
    // given
    const { company, token } = await createUser()
    await User.create([ { sub: "1", name: "User 1", email: "user1@test.com", company: company._id }, { sub: "2", name: "User 2", email: "user2@test.com", company: company._id }, { sub: "3", name: "User 3", email: "user3@test.com", company: company._id } ])
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
    const { token } = await createUser()
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
    const { token } = await createUser()
    const updateData = { avatar: "picture2", phone: "+123456789" }
    // when
    const response = await request(app)
      .put("/api/users/me")
      .set("Authorization", `Bearer ${token}`)
      .send( updateData )
    // then
    const dbContent = await User.find()
    expect(dbContent).toHaveLength(1)
    expect(response.status).toBe(200)
    expect(typeof response.body).toBe("string")
  })

  it("should return status 400 if wrong data sent", async () => {
    // given
    const { token } = await createUser()
    const email = "invalidformat.com"
    // when
    const response = await request(app)
      .put("/api/users/me")
      .set("Authorization", `Bearer ${token}`)
      .send({ email })
    // then
    const dbContent = await User.find()
    expect(dbContent).toHaveLength(1)
    expect(dbContent[0].email).toBe("user@test.com")
    expect(response.status).toBe(400)
  })
})