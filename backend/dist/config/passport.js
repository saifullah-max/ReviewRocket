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
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(id);
        done(null, user);
    }
    catch (error) {
        done(error);
    }
}));
const googleStrategyOptions = {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:8003/auth/google/callback",
    passReqToCallback: true,
    scope: ["profile", "email"],
};
passport_1.default.use(new passport_google_oauth20_1.Strategy(googleStrategyOptions, (req, accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield User_1.default.findOne({ googleId: profile.id });
        console.log("Profile: ", profile);
        // Manual Access Token
        const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
        const token = jsonwebtoken_1.default.sign({
            googleId: profile.id,
            name: profile._json.name,
            email: profile._json.email,
        }, JWT_ACCESS_SECRET, {
            expiresIn: "1 day",
        });
        if (!user) {
            user = yield User_1.default.create({
                googleId: profile.id,
                name: profile._json.name,
                email: profile._json.email,
                accessToken: token,
            });
        }
        done(null, user);
    }
    catch (err) {
        done(err);
    }
})));
