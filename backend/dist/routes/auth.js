"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
router.get("/auth/google", (req, res, next) => {
    console.log("Starting google Oauth");
    next();
}, passport_1.default.authenticate("google"));
router.get("/auth/google/callback", passport_1.default.authenticate("google", { failureRedirect: "/login" }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("/auth/google/callback route called");
    console.log("Req user:", req.user);
    const { accessToken } = req.user;
    console.log("Access token:", accessToken);
    res.cookie("token", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
    });
    res.redirect("http://localhost:5173/");
    // res.json({ message: "Authentication successful", redirect: "/" });
    return;
}));
router.get("/profile", (req, res) => {
    console.log("/profile called");
    const token = req.cookies.token;
    if (!token)
        return res.redirect("/login");
    const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
    const decoded = jsonwebtoken_1.default.verify(token, JWT_ACCESS_SECRET);
    console.log("Decoded:", decoded);
    const { name, email } = decoded;
    console.log(`Name: ${name}, email: ${email}`);
    res.status(200).json({ message: "Welcome", name, email });
    return;
});
router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err)
            return res.status(500).send("Logout failed");
        return res.redirect("/login");
    });
});
router.get("/login", (req, res) => {
    res.send("<a href='/auth/google'>Login with Google</a>");
    return;
});
exports.default = router;
