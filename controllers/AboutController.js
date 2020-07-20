#!/usr/bin/env node
require("dotenv").config();
const _ = require("lodash");
const {About} = require("../models");

class AboutController {

  static async addAbout(req, res, next) {
    try {
      const {title, desc,longDesc} = req.body;
      const errors = {};
      if (!title) {
        errors.title = "Title is required";
      }
      if (!desc) {
        errors.desc = "Desc is required";
      }
      if (!longDesc) {
        errors.longDesc = "LongDesc is required";
      }
      if (!_.isEmpty(errors)) {
        return res.status(422).send({
          status: "error",
          errors,
        });
      }
      const images = req.files || {};
      const about = await About.create({title, desc,longDesc,images:images.map(u=>u.filename)});
      res.send({
        "status": "done",
        about
      });
    } catch (e) {
      next(e);
    }
  }

  static async updateAbout(req, res, next) {
    try {
      const {id} = req.params
      const {title, desc,longDesc} = req.body;
      const errors = {};
      if (!title) {
        errors.title = "Title is required";
      }
      if (!desc) {
        errors.desc = "Desc is required";
      }
      if (!longDesc) {
        errors.longDesc = "LongDesc is required";
      }
      if (!_.isEmpty(errors)) {
        return res.status(422).send({
          status: "error",
          errors,
        });
      }
      const images = req.files || {};
      const about = await About.update({title, desc,longDesc ,images:images.map(u=>u.filename)}, {where:{id}});
      res.send({
        "status": "done",
        about
      });
    } catch (e) {
      next(e);
    }
  }

  static async getAbout(req, res, next) {
    try {
      const about = await About.findOne({});
      res.json({
        status: 'ok',
        about,
      })
    } catch (e) {
      next(e)
    }
  }
}

module.exports = AboutController;
