"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
//import express from "express";
var express_1 = require("express");
var cors_1 = require("cors");
var dotenv_1 = require("dotenv");
var body_parser_1 = require("body-parser");
var authRoutes_ts_1 = require("./routes/authRoutes.ts");
var url_1 = require("url");
var path_1 = require("path");
dotenv_1.default.config();
var app = (0, express_1.default)();
var PORT = process.env.PORT;
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.get("/health", function (_, res) {
    res.status(200).json({ status: "ok" });
});
// Routes
app.post("/api/auth", authRoutes_ts_1.default);
// Test route
app.get("/", function (req, res) {
    res.send("Backend is running!");
});
// Start server
/*
//      app.listen(PORT, () => {
//        console.log(`Server running on http://localhost:${PORT}`);
//        });
*/
/*-------------------

// Testing Deployent

--------------------- */
exports.default = app;
// Recreate __filename and __dirname in ESM
var __filename = (0, url_1.fileURLToPath)(import.meta.url);
var __dirname = (0, path_1.dirname)(__filename);
if (process.argv[1] === __filename) {
    app.listen(PORT, function () {
        console.log("Backend running on http://localhost:".concat(PORT));
    });
}
