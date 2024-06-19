import { DEFAULT_AVATAR_FILE_NAME } from '../modules/user/user.constant.js';

const STATIC_UPLOAD_ROUTE = '/upload';
const STATIC_FILES_ROUTE = '/static';

const DEFAULT_STATIC_IMAGES = [DEFAULT_AVATAR_FILE_NAME];

const STATIC_RESOURCE_FIELDS = ['avatarUrl', 'images', 'previewUrl'];

export {
  STATIC_UPLOAD_ROUTE,
  STATIC_FILES_ROUTE,
  DEFAULT_STATIC_IMAGES,
  STATIC_RESOURCE_FIELDS,
};

