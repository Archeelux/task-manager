const request = require("supertest");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const app = require("../src/app");
const User = require("../src/models/user");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: "Mike",
    email: "mike@example.com",
    password: "123123123",
    tokens: [
        {
            token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
        }
    ]
};

beforeEach(async () => {
    await User.deleteMany();
    await new User(userOne).save();
});

test("Should signup a new user", async () => {
    const response = await request(app)
        .post("/users")
        .send({
            name: "Arturs123",
            email: "Arturs123@example.com",
            password: "Arturs123"
        })
        .expect(201);

    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    expect(response.body).toMatchObject({
        user: {
            name: "Arturs123",
            email: "arturs123@example.com"
        },
        token: user.tokens[0].token
    });

    expect(user.password).not.toBe("Arturs123");
});

test("Should log in existing user", async () => {
    const response = await request(app)
        .post("/users/login")
        .send({
            email: userOne.email,
            password: userOne.password
        })
        .expect(200);

    const user = await User.findById(userOneId);
    expect(response.body.token).toBe(user.tokens[1].token);
});

test("Should not log in nonexistent user", async () => {
    await request(app)
        .post("/users/login")
        .send({
            email: "nonExist@example.com",
            password: "123321123"
        })
        .expect(400);
});

test("Should get profile for user", async () => {
    await request(app)
        .get("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
});

test("Should not get profile for unauthenticated user", async () => {
    await request(app)
        .get("/users/me")
        .send()
        .expect(401);
});

test("Should delete account for user", async () => {
    const response = await request(app)
        .delete("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    const user = await User.findById(userOneId);
    expect(user).toBeNull();
});

test("Should not delete account for unauthenticated user", async () => {
    await request(app)
        .delete("/users/me")
        .send()
        .expect(401);
});

test("Should upload avatar image", async () => {
    await request(app)
        .post("/users/me/avatar")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .attach("avatar", "tests/fixtures/profile-pic.jpg")
        .expect(200);

    const user = await User.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer));
});

test("Should update valid user fields", async () => {
    const newName = "james";

    const response = await request(app)
        .patch("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: newName
        })
        .expect(200);

    const user = await User.findById(userOneId);
    expect(user.name).toBe(newName);
});

test("Should not update non existent fields", async () => {
    await request(app)
        .patch("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: "location"
        })
        .expect(400);
});
