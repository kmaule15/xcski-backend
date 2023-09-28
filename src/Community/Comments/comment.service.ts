import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IsNull, Repository } from 'typeorm'
import { Comment } from './entities/comment.entity'
import { CreateCommentDto } from './dto/createComment.dto'

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
    ) {}

    async findAll(): Promise<Comment[]> {
        return this.commentRepository.find()
    }

    async createComment(createCommentDto: CreateCommentDto, userId: number): Promise<Comment> {
        const { content, postId, trailId, parentCommentId } = createCommentDto

        console.log(parentCommentId)

        const newComment = this.commentRepository.create({
            content,
            postId,
            trailId,
            userId,
            parentComment: parentCommentId ? { id: parentCommentId } as Comment : undefined
        })

        console.log(newComment.parentComment)

        
        const savedComment = await this.commentRepository.save(newComment)

        return savedComment
    }

    async findAllTopLevelCommentsByPost(postId: number): Promise<Comment[]> {
        const comments = await this.commentRepository.find({
            where: {
                postId: postId,
                parentComment: { id: IsNull()}
            },
            relations: ['childComments']
        })

        
        return comments
    }
}