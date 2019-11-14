const {check, validationResult} = require('express-validator');
const models = require('../models');
exports.addUser = [
    check('email').isEmail()
        .custom(async (val, {req}) => {
            return await models.User.findOne({
                    limit: 1,
                    where: (
                        {email: val}
                    )
                }).then((user) => {
                    if (user) throw new Error('This email address is already in use'); else return true;
                });
        }),
    check('password').trim().isLength({min: 6})
        .custom((val, {req, loc, path}) => {
            if (val !== req.body.confirm_password.trim()) {
                throw new Error("Passwords don't match");
            } else {
                return val;
            }
        }).withMessage('Password minimum length must be 6'),
    check('companyId').isInt()
        .custom(async (val, {req}) => {
        return await models.Company.findOne({
            limit: 1,
            where: (
                {id: val}
            )
        }).then((company) => {
            if (company) return true; else throw new Error('Company with id "' + val + '" not exist');
        });
    }).withMessage('Company id must be integer'),
    check('gender').isInt().withMessage('Gender must be integer'),
    check('node_suck').isBoolean().withMessage('Parameter must be boolean, default TRUE'),
];