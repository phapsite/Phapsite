"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var express_1 = require("express");
var cors_1 = require("cors");
var dotenv_1 = require("dotenv");
var body_parser_1 = require("body-parser");
var authRoutes_ts_1 = require("./routes/authRoutes.ts");
dotenv_1.default.config();
var app = (0, express_1.default)();
var PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Routes
app.post("/api/auth", authRoutes_ts_1.default);
// Test route
app.get("/", function (req, res) {
    res.send("Backend is running!");
});
// Start server
app.listen(PORT, function () {
    console.log("Server running on http://localhost:".concat(PORT));
});
