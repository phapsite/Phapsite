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
exports.POST = exports.destroySession = exports.createSession = exports.getSession = void 0;
// lib/auth.ts
var headers_1 = require("next/headers");
var server_1 = require("next/server");
function getSession() {
    var _a;
    return __awaiter(this, void 0, Promise, function () {
        var cookieStore, sessionToken, sessionData;
        return __generator(this, function (_b) {
            try {
                cookieStore = (0, headers_1.cookies)();
                sessionToken = (_a = cookieStore.get('session-token')) === null || _a === void 0 ? void 0 : _a.value;
                if (!sessionToken) {
                    return [2 /*return*/, null];
                }
                // Parse and validate token (in production, verify JWT)
                try {
                    sessionData = JSON.parse(sessionToken);
                    if (new Date(sessionData.expires) < new Date()) {
                        // Expired session
                        (0, headers_1.cookies)().delete('session-token');
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/, sessionData];
                }
                catch (_c) {
                    return [2 /*return*/, null];
                }
            }
            catch (error) {
                console.error('Error getting session:', error);
                return [2 /*return*/, null];
            }
            return [2 /*return*/];
        });
    });
}
exports.getSession = getSession;
function createSession(user, expires) {
    return __awaiter(this, void 0, Promise, function () {
        var sessionStore;
        return __generator(this, function (_a) {
            try {
                sessionStore = (0, headers_1.cookies)();
                sessionStore.set('session-token', JSON.stringify({
                    user: user,
                    expires: expires.toISOString()
                }), {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax',
                    maxAge: Math.floor((expires.getTime() - Date.now()) / 1000),
                    path: '/'
                });
            }
            catch (error) {
                console.error('Error creating session:', error);
            }
            return [2 /*return*/];
        });
    });
}
exports.createSession = createSession;
function destroySession() {
    return __awaiter(this, void 0, Promise, function () {
        return __generator(this, function (_a) {
            try {
                (0, headers_1.cookies)().delete('session-token');
            }
            catch (error) {
                console.error('Error destroying session:', error);
            }
            return [2 /*return*/];
        });
    });
}
exports.destroySession = destroySession;
// API route handler for login
function POST(request) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, password, user, expires, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, request.json()];
                case 1:
                    _a = _b.sent(), email = _a.email, password = _a.password;
                    if (!(email && password)) return [3 /*break*/, 3];
                    user = {
                        id: 'user123',
                        email: email,
                        name: 'Test User'
                    };
                    expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
                    return [4 /*yield*/, createSession(user, expires)];
                case 2:
                    _b.sent();
                    return [2 /*return*/, server_1.NextResponse.json({
                            success: true,
                            user: user
                        })];
                case 3: return [2 /*return*/, server_1.NextResponse.json({
                        success: false, message: 'Invalid credentials'
                    }, {
                        status: 400
                    })];
                case 4:
                    error_1 = _b.sent();
                    console.error('Login error:', error_1);
                    return [2 /*return*/, server_1.NextResponse.json({
                            success: false, message: 'Server error'
                        }, {
                            status: 500
                        })];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.POST = POST;
