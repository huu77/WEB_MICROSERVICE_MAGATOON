import { NextFunction, Request, Response } from 'express'
import { validateOrReject } from 'class-validator'
import { plainToClass } from 'class-transformer'
import path from 'path'

import { Errors, handler } from '../../helpers/error.helper'
import { CreateChapterImageRequestDTO } from './dtos/createChapterImagesRequest.dto'
import { TransformerGroup } from './dtos/enums/group.enum'
import { FsHelper } from '../../helpers/fs.helper'
import { UpdateChapterImageRequestBodyDTO, UpdateChapterImageRequestParamDTO } from './dtos/updateChapterImageRequest.dto'
import { DeleteChapterImageRequestParamDTO } from './dtos/deleteChapterImageRequest.dto'
import { GetChapterImagesByChapterIdRequestDTO } from './dtos/getChapterImagesByChapterIdRequest.dto'

export class ChapterImagesValidation {

    static createChapterImage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createChapterImagesRequestData = plainToClass(CreateChapterImageRequestDTO, req.body, {
                groups: [
                    TransformerGroup.EXCLUDE
                ]
            })
            await validateOrReject(createChapterImagesRequestData)
            return next()
        } catch (error) {
            handler(async () => {
                const imgs = req.files as Express.Multer.File[]
                for (let img of imgs) {
                    await FsHelper.deleteFile(path.join(process.cwd(), img.path))
                }
            })
            return next(Errors.BadRequest)
        }
    }

    static updateChapterImage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updateChapterImagesRequestParamData = plainToClass(UpdateChapterImageRequestParamDTO, req.params)
            const updateChapterImagesRequestBodyData = plainToClass(UpdateChapterImageRequestBodyDTO, req.body)
            await validateOrReject(updateChapterImagesRequestParamData)
            await validateOrReject(updateChapterImagesRequestBodyData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static deleteChapterImage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deleteChapterImagesRequestParamData = plainToClass(DeleteChapterImageRequestParamDTO, req.params)
            await validateOrReject(deleteChapterImagesRequestParamData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static getChapterImagesByChapterId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getChapterImagesByChapterIdRequestData = plainToClass(GetChapterImagesByChapterIdRequestDTO, req.query)
            await validateOrReject(getChapterImagesByChapterIdRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

}