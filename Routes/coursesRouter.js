const express = require("express");
const coursesRouter = express.Router();
const Joi = require("joi");

var mysql = require('mysql');  
var connection = mysql.createConnection({  
  host     : 'localhost',  
  user     : 'root',  
  password : '',  
  database : 'pruebas'  
});

coursesRouter.route('/getAll')
  .get((req, res) => {
    connection.query('SELECT * FROM courses', function(err, data, fields)
    {
      if (err) res.status(404).send(err);
      res.json(data);
    });
  })

coursesRouter.route('/byId/:id')
  .get((req, res) => {
    connection.query('SELECT * FROM courses WHERE id=' + req.params.id, function(err, data, fields)
    {
      if (err) res.status(404).send(err);
      res.send(data);
    });
  })
  .put((req, res) => {
    connection.query('SELECT * FROM courses WHERE id=' + req.params.id, function(err, data, fields)
    {
      if (err) res.status(404).send(err);
      data[0].name = req.body.name;
      const { error } = ValidateCourse(data[0]);
      if (error) return res.status(400).send(error.details[0].message);
      connection.query('UPDATE courses SET name ="' + req.body.name + '" WHERE id=' + req.params.id, function(err, data, fields)
      {
        if (err) res.status(404).send(err);
        res.send('Successful update');
      })
    })
  })
  .delete((req, res) => {
    connection.query('DELETE FROM courses WHERE id=' + req.params.id, function(err, data, fields)
    {
       if (err) res.status(404).send(err);
       res.send('Successful delete');
    })
  })

coursesRouter.route('/newCourse')
  .post((req, res) => {
    const { error } = ValidateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    connection.query('INSERT INTO courses (id, name) VALUES (null, "' + req.body.name + '")', function(err, data, fields)
    {
      if (err) res.status(404).send(err);
       res.send('Successful create');
    })
  })
  // req.query  <-- leer queryParams  

// VALIDATE
function ValidateCourse(course) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
    id: Joi.number()  
  };
  return Joi.validate(course, schema);
}

module.exports = coursesRouter;