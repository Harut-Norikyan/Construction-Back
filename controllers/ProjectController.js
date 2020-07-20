// const httpError = require('http-errors');
// const jwt = require('jsonwebtoken');
const {Projects} = require('../models');
// const {JWT_TOKEN} = process.env
const _ = require('lodash');
const sequelize = require("../helpers/sequelize")
const { Op, literal,QueryTypes } = require("sequelize");

class ProjectController {



  static async getProjects(req, res, next) {
    try {
      const {page} = req.params || 1
      const projectCount = await Projects.count({});
      const projects = await Projects.findAll({
        limit : 9,
        offset:(page - 1) * 9
      });
      res.json({
        status: 'ok',
        projects,
        projectCount
      })
    } catch (e) {
      next(e)
    }
  }

  static async getProjectById(req, res, next) {
    try {
      const id = +req.params.id
      const projectById = await Projects.findOne({
        where:{id}
      });
      res.json({
        status: 'ok',
        projectById
      })
    } catch (e) {
      next(e)
    }
  }

  static async addProject(req, res, next) {
    try {
      const {title, desc} = req.body;
      const errors = {};
      if (!title) {
        errors.firstName = "title chka";
      }
      if (!desc) {
        errors.lastName = "desc chka";
      }
      if (!_.isEmpty(errors)) {
        return res.status(422).send({
          status: "error",
          errors,
        });
      }
      const images = req.files || {};
      const project = await Projects.create({title, desc ,images:images.map(u=>u.filename)});
      res.send({
        "status": "added project",
        project,
        errors
      });
    } catch (e) {
      next(e);
    }
  }

  static async updateProject(req, res, next) {
    try {
      const{id} = req.params
      let {title, desc} = req.body;
      const errors = {};
      if (!title) {
        errors.firstName = "title chka";
      }
      if (!desc) {
        errors.lastName = "desc chka";
      }
      if (!_.isEmpty(errors)) {
        return res.status(422).send({
          status: "error",
          errors,
        });
      }
      const images = req.files || {};
      const project = await Projects.update({title, desc ,images:images.map(u=>u.filename)},{where:{id}});
      res.send({
        "status": "project updated",
        project,
        errors
      });
    } catch (e) {
      next(e);
    }
  }
  static async deleteProject(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(422).send({
          status: "failed",
        });
      }
      await Projects.destroy({
        where: { id }
      });
      return res.status(201).send({
        status: "done",
      });
    } catch (e) {
      next(e);
    }
  }


}

module.exports = ProjectController;
