import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common'
import { CommentService } from './comment.service'
import { CreateCommentDto } from './dto/createComment.dto'
import { Comment } from './entities/comment.entity'

import { GetUser } from 'src/Authentication/decorators/get-user.decorator'
import { User } from 'src/users/entities/users.entity'
import { JwtAuthGuard } from 'src/Authentication/guards/jwt-auth.guard'


@Controller()
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Post('comments')
    @UseGuards(JwtAuthGuard)
    async createComment(
        @Body() createCommentDto: CreateCommentDto,
        @GetUser() user: User,       
    ) {
        return await this.commentService.createComment(createCommentDto, user.id)
    }

    @Get('comments')
    findAll(): Promise<Comment[]> {
        return this.commentService.findAll()
    }

    @Get('post/:postId/comments')
    async findAllTopLevelCommentsByPost(@Param('postId') postId: number): Promise<Comment[]> {
        
        return await this.commentService.findAllTopLevelCommentsByPost(postId)
    }

    @Get('child-comments/:parentId')
    async getChildComments(@Param('parentId') parentId: number): Promise<Comment[]> {
        return await this.commentService.findChildCommentsByParentId(parentId)
    }

    
}