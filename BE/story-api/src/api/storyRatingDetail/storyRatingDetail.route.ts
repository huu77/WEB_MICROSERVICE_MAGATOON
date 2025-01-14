import { Router } from 'express'

import { StoryRatingDetailValidation } from './storyRatingDetail.validation'
import { JwtMiddleware } from '../../jwt/jwt.middleware'
import { StoryRatingDetailAuthorization } from './storyRatingDetail.authorization'
import { StoryRatingDetailController } from './storyRatingDetail.controller'

export const StoryRatingDetailRouter = Router()

StoryRatingDetailRouter.post('/', StoryRatingDetailValidation.createStoryRatingDetail, JwtMiddleware.authentication, StoryRatingDetailAuthorization.createStoryRatingDetail, StoryRatingDetailController.createStoryRatingDetail)
StoryRatingDetailRouter.put('/', StoryRatingDetailValidation.updateStoryRatingDetail, JwtMiddleware.authentication, StoryRatingDetailAuthorization.updateStoryRatingDetail, StoryRatingDetailController.updateStoryRatingDetail)
StoryRatingDetailRouter.get('/', StoryRatingDetailValidation.getStoryRatingDetail, StoryRatingDetailController.getStoryRatingDetail)
StoryRatingDetailRouter.get('/story/topRating', StoryRatingDetailValidation.getTopStoriesByRating, StoryRatingDetailController.getTopStoriesByRating)
StoryRatingDetailRouter.get('/story/:storyId/rating', StoryRatingDetailValidation.getRatingOfStory, StoryRatingDetailController.getRatingOfStory)