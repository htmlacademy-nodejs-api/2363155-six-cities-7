import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { CommentService } from './comment-service.interface.js';
import { Component } from '../../models/component.enum.js';
import { DefaultCommentService } from './comment.service.js';
import { CommentEntity, CommentModel } from './comment.entity.js';
import { Controller } from '../../libs/index.js';
import { CommentController } from './comment.controller.js';

const createCommentContainer = () => {
  const commentContainer = new Container();
  commentContainer
    .bind<CommentService>(Component.CommentService)
    .to(DefaultCommentService)
    .inSingletonScope();

  commentContainer
    .bind<types.ModelType<CommentEntity>>(Component.CommentModel)
    .toConstantValue(CommentModel);

  commentContainer
    .bind<Controller>(Component.CommentController)
    .to(CommentController)
    .inSingletonScope();

  return commentContainer;
};

export { createCommentContainer };
