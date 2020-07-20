#!/usr/bin/env node
require("dotenv").config();
const md5 = require("md5");
const _ = require("lodash");
const {Op} = require("sequelize");
const {Users} = require("../models");
const jwt = require("jsonwebtoken");
const {JWT_TOKEN} = process.env;
// const nodemailer = require("nodemailer");

class UserController {

  static async addUser(req, res, next) {
      try {
          const {firstName, lastName, email, password} = req.body;
          const errors = {};
          if (!firstName) {
              errors.firstName = "First name is required";
          }
          if (!lastName) {
              errors.lastName = "Last name is required";
          }
          if (!email) {
              errors.email = "Email is required";
          }
          if (!password) {
              errors.password = "Password is required";
          } else if (await Users.findOne({where: {email}})) {
              errors.email = "Email already exists in database";
          }
          if (!_.isEmpty(errors)) {
              return res.status(422).send({
                  status: "error",
                  errors,
              });
          }
          const psw = md5(password + "_safe");

          const users = await Users.create({firstName, lastName, email, password: psw});
          res.send({
              "status": "done",
              users
          });
      } catch (e) {
          next(e);
      }

  }

  static async loginAdmin(req, res, next) {
    try {
      const {email, password} = req.body;
      const user = await Users.findOne({
        where: {
          [Op.and]: {
            email,
            password: md5(password + "_safe"),
            role: "admin"
          }
        }
      });
      const errors = {};
      if (!email) {
        errors.email = "Email is required";
      }
      if (!password) {
        errors.password = "Password is required";
      } else if (!user) {
        errors.error = "Wrong username or password";
      }

      if (!_.isEmpty(errors)) {
        return res.status(422).send({
          status: "error",
          errors,
        });
      }
      const token = jwt.sign({id: user.id}, JWT_TOKEN);
      return res.send({
        status: "done",
        token,
        user
      });
    } catch (e) {
      next(e);
    }
  }

  // static async sendEmail(req, res, next) {
  //   try {
  //
  //     const {email} = req.body;
  //     const errors = {};
  //
  //     if (!email) {
  //       errors.email = "email is required";
  //     }
  //
  //     if (!_.isEmpty(errors)) {
  //       return res.send({
  //         status: "fail",
  //         errors,
  //       });
  //     }
  //     const transporter = nodemailer.createTransport({
  //       host: "smtp.mail.ru",
  //       port: 465,
  //       secure: true,
  //       auth: {
  //         user: "test@mail.ru",
  //         pass: "test"
  //       }
  //     });
  //     const token = md5(Math.random().toString(36).substring(7));
  //     await Users.update({activationToken: token}, {where: {email}});
  //     const {origin} = req.headers;
  //     const Email = await transporter.sendMail({
  //       from: "Gayane Poghosyan<gayane.poghosyan.89@mail.ru>",
  //       to: email, // list of receivers
  //       subject: "Reset Password", // Subject line
  //       html: `<p>Click <a href='${origin}/reset_password?token=${token}'>here</a> to reset your password</p>`
  //     });
  //     if (Email) {
  //       res.send({
  //         "status": "ok",
  //       });
  //     }
  //   } catch (e) {
  //     next(e);
  //   }
  // }

  // static async resetPassword(req, res, next) {
  //   try {
  //     const {password, token} = req.body;
  //
  //     const user = await Users.update({password: md5(password + "_safe")}, {where: {activationToken: token}});
  //     const errors = {};
  //     if (!token) {
  //       errors.token = "Token is required";
  //     }
  //     if (!password) {
  //       errors.password = "Password is required";
  //     } else if (!user) {
  //       errors.error = "Wrong username";
  //     }
  //     if (!_.isEmpty(errors)) {
  //       return res.status(422).send({
  //         status: "error",
  //         errors,
  //       });
  //     }
  //     return res.send({
  //       status: "done",
  //     });
  //   } catch (e) {
  //     next(e);
  //   }
  // }

  // static async subscribe(req, res, next) {
  //   try {
  //     const {email} = req.body;
  //     const errors = {};
  //     if (!email) {
  //       errors.email = "email is required";
  //     }
  //     const transporter = nodemailer.createTransport({
  //       host: "smtp.mail.ru",
  //       port: 465,
  //       secure: true,
  //       auth: {
  //         user: "online.shop1997@mail.ru",
  //         pass: "local123"
  //       }
  //     });
  //
  //     // eslint-disable-next-line no-unused-vars
  //     let info = await transporter.sendMail({
  //       from: "Online Shop <online.shop1997@mail.ru>",
  //       to: email, // list of receivers
  //       subject: "Hello ✔", // Subject line
  //       html: "<b>You have been subscribed to Online Shop news</b>" // html body
  //     });
  //
  //     res.send({
  //       "status": "ok",
  //     });
  //   } catch (e) {
  //     next(e);
  //   }
  // }

}

module.exports = UserController;
