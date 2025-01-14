import { plainToClass } from 'class-transformer'
import { NextFunction, Request, Response } from 'express'

import { DeleteHistoryDetailByIdRequestDTO } from './dtos/deleteHistoryDetailByIdRequest.dto'
import { TransformerGroup } from './dtos/enums/group.enum'
import { HistoryDetailService } from './historyDetail.service'
import { AppResponse } from '../../helpers/response.helper'
import { sequelize } from '../../database/mysql.config'
import { GetHistoryDetailByUserIdRequestDTO } from './dtos/getHistoryDetailByUserIdRequest.dto'

export class HistoryDetailController {

    static deleteHistoryDetailbyId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deleteHistoryDetailByIdRequestData = plainToClass(DeleteHistoryDetailByIdRequestDTO, req.params, {
                groups: [
                    TransformerGroup.EXCLUDE
                ]
            })
            const deletedCount = await HistoryDetailService.deleteHistoryDetailById(deleteHistoryDetailByIdRequestData.id)
            if (deletedCount > 0) {
                return res.send(new AppResponse(true, null))
            }
            return res.send(new AppResponse(false, null))
        } catch (error) {
            return next(error)
        }
    }

    static deleteHistoryDetailbyUserId = async (req: Request, res: Response, next: NextFunction) => {
        const transaction = await sequelize.transaction()
        try {
            const deletedCount = await HistoryDetailService.deleteHistoryDetailByUserId(req.user!.userId, transaction)
            await transaction.commit()
            if (deletedCount > 0) {
                return res.send(new AppResponse(true, null))
            }
            return res.send(new AppResponse(false, null))
        } catch (error) {
            await transaction.rollback()
            return next(error)
        }
    }

    static getHistoryDetailbyUserId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getHistoryDetailbyUserIdRequestData = plainToClass(GetHistoryDetailByUserIdRequestDTO, req.query, {
                groups: [
                    TransformerGroup.EXCLUDE
                ]
            })
            const historyDetails = await HistoryDetailService.getHistoryDetailByUserId(req.user!.userId, getHistoryDetailbyUserIdRequestData)
            return res.send(new AppResponse(historyDetails, null))
        } catch (error) {
            return next(error)
        }
    }

}