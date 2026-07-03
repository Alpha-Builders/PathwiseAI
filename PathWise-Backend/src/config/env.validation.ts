import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  PORT: Joi.number().default(3000),

  NODE_ENV: Joi.string().required(),

  APP_NAME: Joi.string().required(),

  DATABASE_URL: Joi.string().required(),

  JWT_SECRET: Joi.string().required(),

  JWT_REFRESH_SECRET: Joi.string().required(),

  JWT_SECRET_EXPIRES_IN: Joi.string().required(),

  JWT_REFRESH_EXPIRES_IN: Joi.string().required(),

  MAIL_HOST: Joi.string().required(),

  MAIL_PORT: Joi.number().required(),

  MAIL_USER: Joi.string().required(),

  MAIL_PASS: Joi.string().required(),
});