import request from "supertest"
import app from "../app"
import { connect, disconnect, clear, createUser } from "./databaseHandler"
import { Company } from "../models/Company"

beforeAll(async () => await connect())
afterEach(async () => await clear())
afterAll(async () => await disconnect())

describe("GET /api/companies", () => {
  it("should return status 200 and all companies", async () => {
    // given
    await Company.create([{ name: "New Company 1" }, { name: "New Company 2"}])
    // when
    const response = await request(app)
      .get("/api/companies")
    // then
    const dbContent = await Company.find()
    expect(dbContent).toHaveLength(2)
    expect(response.status).toBe(200)
    expect(response.body.length).toBe(2)
  })
})

describe("POST /api/companies", () => {
    it("should return status 201 and the new company if a valid name is passed", async () => {
    // given
    const { token } = await createUser()
    const companyName = "New Company"
    // when
    const response = await request(app)
      .post("/api/companies")
      .send({ name: companyName })
      .set("Authorization", `Bearer ${token}`)
    // then
    const dbContent = await Company.find()
    expect(dbContent).toHaveLength(2)
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty("name")
    expect(response.body).toHaveProperty("_id")
    expect(response.body.name).toBe("New Company")
  })

    it("should return status 409 if the company name is taken", async () => {
    // given
    const { token } = await createUser()
    const companyName = "New Company"
    await Company.create({ name: "New Company"})
    // when
    const response = await request(app)
      .post("/api/companies")
      .send({ name: companyName })
      .set("Authorization", `Bearer ${token}`)
    // then
    expect(response.status).toBe(409)
    expect(response.body).toBe("This company is already listed in our system.")
  })

  it("should return status 400 if the length of the name is shorter than 3 characters", async () => {
    // given
    const { token } = await createUser()
    const companyName = "N"
    // when
    const response = await request(app)
      .post("/api/companies")
      .send({ name: companyName })
      .set("Authorization", `Bearer ${token}`)
    // then
    expect(response.status).toBe(400)
    expect(response.body).toBe("Validation error.")
  })
})