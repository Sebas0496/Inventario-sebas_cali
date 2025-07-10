import {body} from "express-validator";

//Crear usuarios
// Reglas de validación para la creación de usuarios
export const UserValidationRules = [
    // Validación para el campo 'id'
    body('id')
    .exists({checkNull: true}).withMessage('El campo es obligatorio no puede ser nulo') // El campo debe existir y no ser nulo
    .isInt().withMessage('El id debe de ser un numero entero') // El campo debe ser un número entero
    .notEmpty(), // El campo no puede estar vacío

    // Validación para el campo 'name'
    body('name')
    .isString().withMessage('de de ser un campo de texto') // El campo debe ser un texto
    .notEmpty().withMessage('El campo es ibligatorio NO puede estar vacio') // El campo no puede estar vacío
    .isLength({min: 3}).withMessage('El nombre debe de tener almenos 3 caracteres'), // El nombre debe tener al menos 3 caracteres

    // Validación para el campo 'email'
    body('email')
    .isEmail().withMessage('El campo debe de ser un email valido') // El campo debe ser un email válido
    .optional() // El campo es opcional
    .normalizeEmail(), // Normaliza el email
];

export const UserValidationEditRules = [
    body('name')
    .optional()
    .isString().withMessage('de de ser un campo de texto')
    .isLength({min:3}).withMessage('El nombre debe de tener almenos 3 caracteres'),
    body('email')
    .optional()
    .isEmail().withMessage('El campo debe de ser un email valido')
    .optional()
    .normalizeEmail(),
];

