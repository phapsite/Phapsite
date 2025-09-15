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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = void 0;
// app/api/register/route.ts
var server_1 = require("next/server");
var supabase_js_1 = require("@supabase/supabase-js");
var supabase = (0, supabase_js_1.createClient)(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY // server-only key
);
function POST(req) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var _b, email, password, role, _c, signUpData, signUpError, userId, profileError, err_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, req.json()];
                case 1:
                    _b = _d.sent(), email = _b.email, password = _b.password, role = _b.role;
                    if (!email || !password || !role) {
                        return [2 /*return*/, server_1.NextResponse.json({ success: false, error: "Email, password, and role are required" }, { status: 400 })];
                    }
                    return [4 /*yield*/, supabase.auth.signUp({ email: email, password: password })];
                case 2:
                    _c = _d.sent(), signUpData = _c.data, signUpError = _c.error;
                    if (signUpError) {
                        return [2 /*return*/, server_1.NextResponse.json({ success: false, error: signUpError.message }, { status: 400 })];
                    }
                    userId = (_a = signUpData.user) === null || _a === void 0 ? void 0 : _a.id;
                    if (!userId) {
                        return [2 /*return*/, server_1.NextResponse.json({ success: false, error: "User creation failed, no ID returned" }, { status: 500 })];
                    }
                    return [4 /*yield*/, supabase
                            .from("profiles")
                            .insert({ id: userId, email: email, role: role })];
                case 3:
                    profileError = (_d.sent()).error;
                    if (!profileError) return [3 /*break*/, 5];
                    // rollback: delete user from auth if profile insert fails
                    return [4 /*yield*/, supabase.auth.admin.deleteUser(userId)];
                case 4:
                    // rollback: delete user from auth if profile insert fails
                    _d.sent();
                    return [2 /*return*/, server_1.NextResponse.json({ success: false, error: "Profile creation failed: " + profileError.message }, { status: 500 })];
                case 5: 
                // 3️⃣ Success
                return [2 /*return*/, server_1.NextResponse.json({
                        success: true,
                        message: "User registered successfully",
                        user: { id: userId, email: email, role: role },
                    })];
                case 6:
                    err_1 = _d.sent();
                    return [2 /*return*/, server_1.NextResponse.json({ success: false, error: err_1.message || "Unexpected error" }, { status: 500 })];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.POST = POST;
