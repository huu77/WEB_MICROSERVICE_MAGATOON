import { Exclude, Expose } from 'class-transformer'
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

@Exclude()
export class CreateCommentRequestDTO {
    @Expose()
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(9999)
    content: string

    @Expose()
    @IsOptional()
    @IsInt()
    parentId: number

    @Expose()
    @IsNotEmpty()
    @IsInt()
    chapterId: number

    @Expose()
    @IsNotEmpty()
    @IsInt()
    userId: number
}