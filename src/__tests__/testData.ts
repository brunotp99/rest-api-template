import mongoose from "mongoose";

const userId = new mongoose.Types.ObjectId().toString();

export const productPayload = {
    user: userId,
    title: "Canon EOS 1500D DSLR Camera with 18-55mm Lens",
    description:
        "Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.",
    price: 879.99,
    image: "https://i.imgur.com/QlRphfQ.jpg",
};

export const userPayload = {
    _id: userId,
    email: "jane.doe@example.com",
    name: "Jane Doe",
};

export const userInput = {
    email: "testJest@example.com",
    name: "Jane Doe",
    password: "Password123",
    passwordConfirmation: "Password123",
}

export const sessionPayload = {
    _id: new mongoose.Types.ObjectId().toString(),
    user: userId,
    valid: true,
    userAgent: "PostmanRuntime/7.28.4",
    createdAt: new Date("2021-09-30T13:31:07.674Z"),
    updatedAt: new Date("2021-09-30T13:31:07.674Z"),
    __v: 0
}