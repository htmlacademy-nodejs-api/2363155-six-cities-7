import Joi from 'joi';
import { createUserDtoSchema } from './create-user.schema.js';
import { LoginUserDto } from './login-user.dto.js';

const loginUserDtoSchema = Joi.object<InstanceType<typeof LoginUserDto>>({
  email: createUserDtoSchema.extract('email'),
  password: createUserDtoSchema.extract('password'),
});

export { loginUserDtoSchema };
