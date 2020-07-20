#!/usr/bin/env node
require("dotenv").config();
const _ = require("lodash");
const {Contacts} = require("../models");

class ContactController {

  static async addContact(req, res, next) {
    try {
      const {phone, address,email} = req.body;
      const errors = {};
      if (!phone) {
        errors.phone = "Phone is required";
      }
      if (!address) {
        errors.address = "Address is required";
      }
      if (!email) {
        errors.address = "Email is required";
      }
      if (!_.isEmpty(errors)) {
        return res.status(422).send({
          status: "error",
          errors,
        });
      }
      // const images = req.files || {};
      // const about = await About.create({title, desc ,images:images.map(u=>u.filename)});
      const contacts = await Contacts.create({phone,address,email})
      res.send({
        "status": "done",
        contacts
      });
    } catch (e) {
      next(e);
    }
  }

  static async updateContact(req, res, next) {
    try {
      const {id} = req.params
      const {phone, address,email} = req.body;
      const errors = {};
      if (!phone) {
        errors.firstName = "Phone is required";
      }
      if (!address) {
        errors.lastName = "Address is required";
      }
      if (!email) {
        errors.lastName = "Email is required";
      }
      if (!_.isEmpty(errors)) {
        return res.status(422).send({
          status: "error",
          errors,
        });
      }
      // const images = req.files || {};
      // const about = await About.update({title, desc ,images:images.map(u=>u.filename)}, {where:{id}});
      const contacts = await Contacts.update({phone,address,email},{where:{id}})
      res.send({
        "status": "done",
        contacts
      });
    } catch (e) {
      next(e);
    }
  }

  static async getContact(req, res, next) {
    try {
      const contact = await Contacts.findOne({});
      res.json({
        status: 'ok',
        contact,
      })
    } catch (e) {
      next(e)
    }
  }
}

module.exports = ContactController;
