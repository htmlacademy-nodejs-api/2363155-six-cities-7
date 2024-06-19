import Joi from 'joi';

import { UpdateUserDto } from './update-user.dto.js';
import { createUserDtoSchema } from './create-user.schema.js';

const updateUserDtoSchema = Joi.object<InstanceType<typeof UpdateUserDto>>({
  avatarUrl: createUserDtoSchema.extract('avatarUrl').optional(),
});
export { updateUserDtoSchema };
