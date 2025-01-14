import { plainToClass } from 'class-transformer'
import { NextFunction, Request, Response } from 'express'
import path from 'path'

import { CreateStoryRequestDTO } from './dtos/createStoryRequest.dto'
import { validateOrReject } from 'class-validator'
import { Errors, handler } from '../../helpers/error.helper'
import { FsHelper } from '../../helpers/fs.helper'
import { UpdateStoryRequestBodyDTO, UpdateStoryRequestParamDTO } from './dtos/updateStoryRequest.dto'
import { GetStoriesRequestDTO } from './dtos/getStoriesRequest.dto'
import { SearchStoryRequestDTO } from './dtos/searchStoriesRequest.dto'
import { TransformerGroup } from './dtos/enums/group.enum'

export class StoryValidation {

    static createStory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createStoryRequestData = plainToClass(CreateStoryRequestDTO, {
                ... req.body,
                coverImageUrl: req.file?.path ? req.file.path : undefined
            } as CreateStoryRequestDTO)
            await validateOrReject(createStoryRequestData)
            return next()
        } catch (error) {
            handler(async () => {
                if (req.file?.path) {
                    await FsHelper.deleteFile(path.join(process.cwd(), req.file.path))
                }
            })
            return next(Errors.BadRequest)
        }
    }

    static updateStory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updateStoryRequestParamData = plainToClass(UpdateStoryRequestParamDTO, req.params)
            const updateStoryRequestBodyData = plainToClass(UpdateStoryRequestBodyDTO, req.body)
            await validateOrReject(updateStoryRequestParamData)
            await validateOrReject(updateStoryRequestBodyData)
            return next()
        } catch (error) {
            handler(async () => {
                if (req.file?.path) {
                    await FsHelper.deleteFile(path.join(process.cwd(), req.file.path))
                }
            })
            return next(Errors.BadRequest)
        }
    }

    static getStories = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getStoriesRequestData = plainToClass(GetStoriesRequestDTO, req.query, {
                groups: [
                    TransformerGroup.EXCLUDE_PAGE_LIMIT
                ]
            })
            await validateOrReject(getStoriesRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static searchStories = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const searchStoryRequestData = plainToClass(SearchStoryRequestDTO, req.query)
            await validateOrReject(searchStoryRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

}