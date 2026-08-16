import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BlogPostsService } from './public.service';

@ApiTags('BlogPosts')
@Controller('public')
export class BlogPostsController {
  constructor(private readonly service: BlogPostsService) {}
}
