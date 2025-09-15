"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authController_ts_1 = require("../controllers/authController.ts");
var router = (0, express_1.Router)();
router.post("/register", authController_ts_1.registerUser);
//to test
router.post("/login", authController_ts_1.loginUser);
exports.default = router;
