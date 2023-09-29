import { IsNotEmpty, IsOptional, IsInt } from "class-validator";

export class CreateCommentDto {
    @IsNotEmpty()
    content: string

    @IsInt()
    @IsOptional()
    postId?: number

    @IsInt()
    @IsOptional()
    trailId?: number

    @IsInt()
    @IsOptional()
    parentCommentId?: number //optional as not all comments are replies 
}