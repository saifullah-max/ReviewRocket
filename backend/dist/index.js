"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const app = (0, express_1.default)();
dotenv_1.default.config();
(0, db_1.connectToDB)();
const PORT = process.env.PORT || 8000;
app.use("/", (req, res) => {
    res.send("Hello from backend");
});
app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
});
