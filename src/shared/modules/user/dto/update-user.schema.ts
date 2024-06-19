import Joi from 'joi';

import { UpdateUserDto } from './update-user.dto.js';

const updateUserDtoSchema = Joi.object<InstanceType<typeof UpdateUserDto>>({
  avatarUrl: Joi.string()
    .optional()
    .uri()
    .message('Avatar URL must be valid URL string'),
});
export { updateUserDtoSchema };

