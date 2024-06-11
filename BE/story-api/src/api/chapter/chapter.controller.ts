import { plainToClass } from 'class-transformer'
import { NextFunction, Request, Response } from 'express'

import { CreateChapterRequestDTO } from './dtos/createChapterRequest.dto'
import { ChapterService } from './chapter.service'
import { AppResponse } from '../../helpers/response.helper'
import { UpdateChapterRequestBodyDTO, UpdateChapterRequestParamDTO } from './dtos/updateChapterRequest.dto'
import { TransformerGroup } from './dtos/enums/group.enum'
import { GetChapterRequestDTO } from './dtos/getChapterRequest.dto'
import { ChapterPublisher } from '../../amqp/publisher/ChapterPublisher.class'
import { sequelize } from '../../database/mysql.config'
import { CreateChapterReqFromAmqpDTO } from '../../amqp/dtos/createChapterReqFromAmqp.dto'

export class ChapterController {

    static createChapter = async (req: Request, res: Response, next: NextFunction) => {
        const transaction = await sequelize.transaction()
        try {
            const createChapterRequestData = plainToClass(CreateChapterRequestDTO, req.body)
            const chapter = await ChapterService.createChapter(createChapterRequestData, transaction)
            const chapterPublisher = await ChapterPublisher.getInstance()
            chapterPublisher.chapterCreate(plainToClass(CreateChapterReqFromAmqpDTO ,{
                id: chapter.id,
                storyId: chapter.dataValues.storyId
            } as CreateChapterReqFromAmqpDTO))
            await transaction.commit()
            return res.send(new AppResponse(true, null))
        } catch (error) {
            await transaction.rollback()
            return next(error)
        }
    }

    static updateChapter = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updateChapterRequestParamData = plainToClass(UpdateChapterRequestParamDTO, req.params, {
                groups: [
                    TransformerGroup.EXCLUDE
                ]
            })
            const updateChapterRequestData = plainToClass(UpdateChapterRequestBodyDTO, req.body)
            const affectedCount = await ChapterService.updateChapter(updateChapterRequestParamData.id, updateChapterRequestData)
            if (affectedCount[0] > 0) {
                return res.send(new AppResponse(true, null))
            }
            return res.send(new AppResponse(false, null))
        } catch (error) {
            return next(error)
        }
    }

    static getChapter = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getChapterRequestData = plainToClass(GetChapterRequestDTO, req.query, {
                groups: [
                    TransformerGroup.EXCLUDE,
                    TransformerGroup.EXCLUDE_PAGE_LIMIT
                ]
            })
            const chapters = await ChapterService.getChapter(getChapterRequestData)
            const count = await ChapterService.getChapterOfStoryCount(getChapterRequestData.storyId)
            return res.send(new AppResponse({ chapters, count }, null))
        } catch (error) {
            return next(error)
        }
    }

}