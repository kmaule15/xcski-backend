// post.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { User } from 'src/users/entities/users.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<Post[]> {
    return this.postRepository.find({
      relations: ['author']
    });
  }

  findOne(id: number): Promise<Post> {
    return this.postRepository.findOne({
      where: { id },
      relations: ['author']
    });
  }

  async create(createPostDto: CreatePostDto, userId: number): Promise<Post> {
    const user = await this.usersRepository.findOneByOrFail({ id: userId})

    const post = new Post();
    post.title = createPostDto.title;
    post.content = createPostDto.content;
    post.author = user;

    return this.postRepository.save(post);
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<void> {
    await this.postRepository.update(id, updatePostDto);
  }

  async remove(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }
}
