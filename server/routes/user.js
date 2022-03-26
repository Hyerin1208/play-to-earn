const express = require("express");
var route = express.Router();
const { User } = require("../models");

const services = require("../");

route.get("/", services.homeRoutes);
