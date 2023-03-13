const express = require('express');
const app = express();
const config = require('./config');
const Student = require('./models/student');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


config.authenticate()
    .then(function () {
        console.log('Database is connected.');
    })
    .catch(function (err) {
        console.log(err);

    });

//Adding a new student
app.post('/students', function (req, res) {
    let student_data = req.body;

    Student.create(student_data)
        .then(function (result) {
            res.status(200).send(result);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
});

// Retrieving all the students
app.get('/students', function (req, res) {
    Student.findAll().then(function (results) {
        res.status(200).send(results);
    }).catch(function (err) {
        res.status(500).send(err);
    });
});


// Retrieving a student based on their ID

app.get('/students/:student_id', function (req, res) {
    let student_id = parseInt(req.params.student_id);

    Student.findByPk(student_id)
        .then(function (result) {
            res.status(200).send(result);
        })
        .catch(function (err) {
            res.status(500).send(err);
        })
});

// Updating a student

app.put('/students/:student_id', function (req, res) {
    let student_id = parseInt(req.params.student_id);
    let student_data = req.body;
    Student.findByPk(student_id)
        .then(function (result) {

            if (!result) {
                res.status(404).send('Student not found');
            }

            else {
                result.name = student_data.name;
                result.section = student_data.section;
                result.gpa = student_data.gpa;
                result.nationality = student_data.nationality;

                result.save()
                    .then(function () {
                        res.status(200).send(result);
                    })

                    .catch(function (err) {
                        res.status(500).send(err);
                    });
            }
        })
        .catch(function (err) {
            res.status(500).send(err);
        });

});

// Deleting a student

app.delete('/students/:student_id', function (req, res) {
    let student_id = parseInt(req.params.student_id);

    Student.findByPk(student_id)
        .then(function (result) {

            if (!result) {
                res.status(404).send('Student not found');
            }

            else {
                result.destroy()
                    .then(function () {
                        res.status(200).send(result);
                    })

                    .catch(function (err) {
                        res.status(500).send(err);
                    });
            }
        })
        .catch(function (err) {
            res.status(500).send(err);
        });

});




app.listen(3000, function () {
    console.log('server is running on port 3000...')
});