const {check, validationResult} = require('express-validator');
exports.addUser = [
    check('email').isEmail(),
    check('password').trim().isLength({ min: 6 }).withMessage('Password minimum length must be 6'),
    check('companyId').isInt().withMessage('Company id must be integer'),
    check('gender').isInt().withMessage('Gender must be integer'),
    check('node_suck').isBoolean().withMessage('Parameter must be boolean, default TRUE'),
];