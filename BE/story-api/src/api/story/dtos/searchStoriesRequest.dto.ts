import { Exclude, Expose } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'

@Exclude()
export class SearchStoryRequestDTO {
    @Expose()
    @IsNotEmpty()
    @IsString()
    keyword: string
}