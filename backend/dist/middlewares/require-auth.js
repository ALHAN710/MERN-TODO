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
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const unauthenticated_error_1 = require("../errors/unauthenticated-error");
const requireAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("Passport user :", req.user);
    if (!req.currentUser) {
        console.log("======== UnAuthenticated ==========");
        // return next(new UnAuthenticatedError());
        throw new unauthenticated_error_1.UnAuthenticatedError();
        try {
        }
        catch (error) {
            next(error);
        }
    }
    next();
});
exports.requireAuth = requireAuth;
//# sourceMappingURL=require-auth.js.map