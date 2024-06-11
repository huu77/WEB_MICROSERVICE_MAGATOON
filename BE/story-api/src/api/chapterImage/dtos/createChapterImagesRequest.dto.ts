import { Exclude, Expose, Transform } from 'class-transformer'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

import { IsInteger } from '../../../helpers/classValidator.helper'
import { transformToNumber } from '../../../helpers/classTransformer.helper'
import { TransformerGroup } from './enums/group.enum'

@Exclude()
export class CreateChapterImageRequestDTO {
    @Expose()
    @IsOptional()
    @IsString()
    path: string

    @Expose()
    @IsOptional()
    @IsInteger()
    order: number

    @Expose()
    @Transform(transformToNumber, {
        groups: [
            TransformerGroup.EXCLUDE
        ]
    })
    @IsNotEmpty()
    @IsInteger()
    chapterId: number
}