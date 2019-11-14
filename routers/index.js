const express = require('express');
const router = express.Router();
const constants = require('../config/constants');
const {check, validationResult} = require('express-validator');

const models = require('../models');
let validate = require('../validators/addUser');

router.get('/404', function (req, res) {
    res.send('error');
});
router.get('/user/:id', function (req, res) {
    console.log(req.params.id);
    models.Profile.findOne({
        where: {
            user_id: req.params.id,
        },
        raw: true,
        include: [
            'User', 'userCompany'
        ],
    }).then(function (result) {
        console.log(result);
        res.send(result);
    }).catch(function (e) {
        res.send(e);
    });
});

router.get('/company/:id', [
], function (req, res) {
    if (!validationResult(req).isEmpty()) {
        return res.status(422).json({errors: validationResult(req).array()});
    }
    models.Company.findOne({
        where: {
            id: req.params.id,
        },
        raw: true,
        // include: [
        //     'User', 'Profiles'
        // ],
    }).then(function (result) {
        console.log(result);
        res.send(result);
    }).catch(function (e) {
        res.send(e);
    });
});

router.post('/user', [
    validate.addUser
], function (req, res) {
    const errors = validationResult(req);
    if (!validationResult(req).isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    let data = req.body;
    data.status = constants.USER_STATUS_ACTIVE;
    data.Profile = JSON.parse(JSON.stringify(req.body));
    models.User.create(data,
        {
            raw: true,
            include: [models.Profile, models.Company],
        }).then(user => res.json(user)).catch(function (e) {
        console.log(JSON.parse(JSON.stringify(e.errors))[0].type);
        res.status(422).send(e);
    });
});

module.exports = router;

