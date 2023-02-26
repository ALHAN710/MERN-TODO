"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passportSignInKey = exports.passportSignUpKey = exports.passportSecretKey = exports.port = exports.environment = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.environment = process.env.NODE_ENV;
exports.port = process.env.PORT || 5000;
exports.passportSecretKey = process.env.PASSPORT_SECRET_KEY;
exports.passportSignUpKey = process.env.PASSPORT_KEY_SIGNUP;
exports.passportSignInKey = process.env.PASSPORT_KEY_SIGNIN;
//# sourceMappingURL=config.js.map