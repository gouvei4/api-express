"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const router = (0, express_1.Router)();
exports.router = router;
router.get("/", (_, response) => {
    return response.send("Olá, DEV!");
});
router.post("/teste", (request, response) => {
    console.log(request.params);
    return response.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(request.body);
});
