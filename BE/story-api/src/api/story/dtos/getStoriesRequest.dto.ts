import { Exclude, Expose, Transform } from 'class-transformer'
import { IsNotEmpty, IsOptional } from 'class-validator'

import { TransformerGroup } from './enums/group.enum'
import { IsInteger, Min } from '../../../helpers/classValidator.helper'
import { transformToNumber } from '../../../helpers/classTransformer.helper'

@Exclude()
export class GetStoriesRequestDTO {
    @Expose()
    @Transform(transformToNumber, {
        groups: [
            TransformerGroup.EXCLUDE
        ]
    })
    @IsOptional()
    @IsInteger()
    id?: number

    @Expose()
    @IsOptional()
    title?: string

    @Expose()
    @IsOptional()
    description?: string

    @Expose()
    @Transform(transformToNumber, {
        groups: [
            TransformerGroup.EXCLUDE
        ]
    })
    @IsOptional()
    @IsInteger()
    countryId?: number

    @Expose({
        groups: [
            TransformerGroup.EXCLUDE_PAGE_LIMIT
        ]
    })
    @Transform(transformToNumber, {
        groups: [
            TransformerGroup.EXCLUDE
        ]
    })
    @IsNotEmpty()
    @IsInteger()
    @Min(1)
    page: number

    @Expose({
        groups: [
            TransformerGroup.EXCLUDE_PAGE_LIMIT
        ]
    })
    @Transform(transformToNumber, {
        groups: [
            TransformerGroup.EXCLUDE
        ]
    })
    @IsNotEmpty()
    @IsInteger()
    @Min(1)
    limit: number
}