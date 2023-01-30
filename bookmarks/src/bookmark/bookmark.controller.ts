import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { BookmarkService } from './bookmark.service';
import { GetUser } from 'src/auth/decorator';
import { createBookmarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
	constructor (private bookmarkService: BookmarkService) {}

	@Post()
	createBookmark(@GetUser('id') userId: number, @Body() DTO: CreateBookmarkDto)
	{}
	
	@Get()
	getBookmarks(@GetUser('id') userId: number) {}
	
	@Get()
	getBookmarksById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookmark: number)
	{}
	
	@Patch()
	editBookmarkById(@GetUser('id') userId: number) {}
	
	@Delete()
	deleteBookmarkNyId(@GetUser('id') userId: number) {}
}
