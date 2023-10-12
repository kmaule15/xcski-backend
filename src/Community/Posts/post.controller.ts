// post.controller.ts
import { Controller, Get, Post as HttpPost, Body, Param, Put, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { Post } from './entities/post.entity';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  findAll(): Promise<Post[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Post> {
    return this.postService.findOne(+id);
  }

  @HttpPost()
  create(@Body() createPostDto: CreatePostDto): Promise<Post> {
    return this.postService.create(createPostDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto): Promise<void> {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.postService.remove(+id);
  }
}
