import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthGuard } from 'src/auth/auth.guard';
import { v4 as uuidv4 } from 'uuid';
import { PostInterface } from './post.interface';
import { PostService } from './post.service';

@UseGuards(AuthGuard)
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('get-posts')
  async findAll() {
    const posts = await this.postService.findAll();
    return posts;
  }

  @Post('add-post')
  async create(@Body() post: PostInterface) {
    return this.postService.create(post);
  }

  @Post('upload')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: 'public/files',
        filename: (req, file, cb) => {
          cb(null, `${uuidv4()}.${file.fieldname}`);
        },
      }),
    }),
  )
  uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    const file = files[0];
    return {
      path: `/${file.destination}/${file.filename}`,
    };
  }
}
