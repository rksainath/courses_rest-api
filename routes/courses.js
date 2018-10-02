const express = require('express');
const Joi = require('joi');

const router = express.Router();

const courses = [{ id: 1, subject: 'Maths' },
{ id: 2, subject: 'Physics' },
{ id: 3, subject: 'Chemistry' }];

router.get('/', (req, res) => {
    res.send(courses);
});

router.post('/', (req, res) => {
    const { error } = validateSchema(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const co = {
        id: courses.length + 1,
        subject: req.body.subject
    };
    courses.push(co);
    res.send(co);
});

router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id == parseInt(req.params.id));
    if (!course) return res.status(404).send('Sorry no resource');
    res.send(course);
});

router.put('/:id', (req, res) => {

    const course = courses.find(c => c.id == parseInt(req.params.id));
    if (!course) return res.status(404).send('Sorry no resource');

    const { error } = validateSchema(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    course.subject = req.body.subject;
    res.send(course);

})

router.delete('/:id', (req, res) => {
    const course = courses.find(c => c.id == parseInt(req.params.id));
    if (!course) return res.status(404).send('Sorry no resource');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

function validateSchema(course) {
    const schema = {
        subject: Joi.string().min(7).required()
    };
    return Joi.validate(course, schema);

}

module.exports = router;

