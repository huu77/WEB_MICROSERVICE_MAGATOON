import { plainToClass } from 'class-transformer'
import { Op, Sequelize } from 'sequelize'

import { Models } from '../../database/mysql.config'
import { CreateCommentRequestDTO } from './dtos/createCommentRequest.dto'
import { UpdateCommentRequestBodyDTO } from './dtos/updateCommentRequest.dto'
import { GetCommentRequestDTO } from './dtos/getCommentRequest.dto'
import { CommentStatus } from '../../enums/comment.enum'

export class CommentService {

    static createComment = (commentData: CreateCommentRequestDTO) => {
        return Models.comment.create(commentData)
    }

    static updateComment = (id: number, commentData: UpdateCommentRequestBodyDTO)=> {
        return Models.comment.update(plainToClass(Object, commentData, {
            exposeUnsetFields: false
        }), {
            where: {
                id
            }
        })
    }

    static getComment = (queries: GetCommentRequestDTO) => {
        return Models.comment.findAll({
            attributes: [
                ...Object.keys(Models.comment.getAttributes()),
                [
                    Sequelize.literal('(SELECT COUNT(*) FROM comment AS replies WHERE replies.parentId IS NOT NULL AND replies.parentId = comment.id)'),
                    'repliesCount'
                ]
            ],
            where: {
                status: {
                    [Op.ne]: CommentStatus.DELETED
                },
                chapterId: queries.chapterId,
                parentId: queries.parentId ?? null
            },
            order: [
                ['createdAt', queries.isOldest == 1 ? 'ASC' : 'DESC']
            ],
            offset: (queries.page-1)*queries.limit,
            limit: queries.limit
        })
    }

}