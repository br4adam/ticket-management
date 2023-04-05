import request from "supertest"
import app from "../app"
import jwt from "jsonwebtoken"
import { connect, disconnect, clear } from "./database"
import { Company } from "../models/Company"
import { User } from "../models/User"
const secretKey = process.env.JWT_SECRET_KEY as string

beforeAll(async () => await connect())
afterEach(async () => await clear())
afterAll(async () => await disconnect())

describe("GET /api/companies", () => {
  it("should return status 200 and all companies", async () => {
    // given
    await Company.create([{ name: "Test Company" }, { name: "Test Company 2"}])
    // when
    const response = await request(app)
      .get("/api/companies")
    // then
    const dbContent = await Company.find()
    expect(200)
    expect(dbContent).toHaveLength(2)
    expect(response.body.length).toEqual(2)
  })
})

describe("POST /api/companies", () => {
    it("should return status 201 and the new company if a valid name is passed", async () => {
    // given
    const companyName = "Test Company"
    const user = await User.create({ sub: "1234", name: "User", email: "user@test.com" })
    const token = jwt.sign({ user }, secretKey)
    // when
    const response = await request(app)
      .post("/api/companies")
      .send({ name: companyName })
      .set("Authorization", `Bearer ${token}`)
    // then
    const dbContent = await Company.find()
    expect(dbContent).toHaveLength(1)
    expect(201)
    expect(response.body).toHaveProperty("name")
    expect(response.body).toHaveProperty("_id")
    expect(response.body.name).toEqual("Test Company")
  })

    it("should return status 409 if the company name is taken", async () => {
    // given
    const companyName = "Test Company"
    await Company.create({ name: "Test Company"})
    const user = await User.create({ sub: "1234", name: "User", email: "user@test.com" })
    const token = jwt.sign({ user }, secretKey)
    // when
    const response = await request(app)
      .post("/api/companies")
      .send({ name: companyName })
      .set("Authorization", `Bearer ${token}`)
    // then
    expect(409)
    expect(response.body).toEqual("This company is already listed in our system.")
  })

  it("should return status 400 if the length of the name is shorther than 3 characters", async () => {
    // given
    const companyName = "T"
    const user = await User.create({ sub: "1234", name: "User", email: "user@test.com" })
    const token = jwt.sign({ user }, secretKey)
    // when
    const response = await request(app)
      .post("/api/companies")
      .send({ name: companyName })
      .set("Authorization", `Bearer ${token}`)
    // then
    expect(400)
    expect(response.body).toEqual("Validation error.")
  })
})