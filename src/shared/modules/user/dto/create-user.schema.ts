import Joi from 'joi';
import { CreateUserDto } from './create-user.dto.js';

import { PasswordLength, UserNameLength } from '../../../constants/user.js';
import { UserType } from '../../../models/user.interface.js';

const createUserDtoSchema: Joi.Schema<InstanceType<typeof CreateUserDto>> =
  Joi.object<InstanceType<typeof CreateUserDto>>({
    name: Joi.string()
      .required()
      .ruleset.min(UserNameLength.MIN)
      .max(UserNameLength.MAX)
      .rule({
        message: `User name length must be between ${UserNameLength.MIN} and ${UserNameLength.MAX} characters`,
      }),
    password: Joi.string()
      .required()
      .ruleset.min(PasswordLength.MIN)
      .max(PasswordLength.MAX)
      .rule({
        message: `User password length must be between ${PasswordLength.MIN} and ${PasswordLength.MAX}`,
      }),

    email: Joi.string().email().message('User email is not valid').required(),
    avatarUrl: Joi.string()
      .optional()
      .uri()
      .message('Avatar URL must be valid URL string'),
    type: Joi.string()
      .required()
      .valid(...Object.values(UserType)),
  });

export { createUserDtoSchema };
