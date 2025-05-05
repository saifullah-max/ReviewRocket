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
exports.connectToDB = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const connectToDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const remoteURI = process.env.REMOTE_URI;
        if (remoteURI) {
            mongoose_1.default
                .connect(remoteURI)
                .then(() => {
                console.log("Remote MongoDB connected");
            })
                .catch((err) => {
                console.log(`MongoDB Connection failed`, err);
            });
        }
    }
    catch (error) {
        console.log("DBS Connection failed!!!!");
    }
});
exports.connectToDB = connectToDB;
