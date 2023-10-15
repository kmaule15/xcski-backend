// post.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  findOne(id: number): Promise<Post> {
    return this.postRepository.findOneBy({id: id});
  }

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const post = new Post();
    post.title = createPostDto.title;
    post.content = createPostDto.content;

    return this.postRepository.save(post);
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<void> {
    await this.postRepository.update(id, updatePostDto);
  }

  async remove(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }
}
