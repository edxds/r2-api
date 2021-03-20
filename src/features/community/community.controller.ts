import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Query,
  Delete,
  UseGuards,
  ParseIntPipe,
  Req,
  HttpException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { CommunityService } from './community.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';

@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createCommunityDto: CreateCommunityDto) {
    return this.communityService.create(createCommunityDto);
  }

  @Get()
  findAll(@Query('includeMembers') includeMembers: string) {
    return this.communityService.findAll({ includeMembers: !!includeMembers });
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('includeMembers') includeMembers: string) {
    return this.communityService.findOne({ id: +id, includeMembers: !!includeMembers });
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateCommunityDto: UpdateCommunityDto) {
    return this.communityService.update(+id, updateCommunityDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.communityService.remove(+id);
  }

  @Post(':id/join')
  @UseGuards(AuthGuard('jwt'))
  join(@Param('id', ParseIntPipe) id: number, @Req() request: Request) {
    if (!request.user) {
      throw new HttpException('Você precisa fazer login primeiro', 403);
    }

    return this.communityService.join(id, request.user['id']);
  }

  @Post(':id/leave')
  @UseGuards(AuthGuard('jwt'))
  leave(@Param('id', ParseIntPipe) id: number, @Req() request: Request) {
    if (!request.user) {
      throw new HttpException('Você precisa fazer login primeiro', 403);
    }

    return this.communityService.leave(id, request.user['id']);
  }
}
