import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { BookmarkService } from './bookmark.service';
import { GetUser } from 'src/auth/decorator';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
	constructor (private bookmarkService: BookmarkService) {}

	@Post()
	createBookmark(@GetUser('id') userId: number, @Body() dto: CreateBookmarkDto)
	{
		return this.bookmarkService.CreateBookmark(
			userId,
			dto,
		);
	}
	
	@Get()
	getBookmarks(@GetUser('id') userId: number) {
		return this.bookmarkService.getBookmarks(
			userId,
		);
	}
	
	@Get(':id')
	getBookmarksById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookmarkId: number)
	{
		return this.bookmarkService.getBookmarksById(
			userId,
			bookmarkId,
		);
	}
	
	@Patch(':id')
	editBookmarkById(@GetUser('id') userId: number, @Body() dto: EditBookmarkDto, @Param('id', ParseIntPipe) bookmarkId: number)
	{
		return this.bookmarkService.editBookmarkById(
			userId,
			dto,
			bookmarkId,
		);
	}
	
	@Delete(':id')
	deleteBookmarkNyId(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookmarkId: number)
	{
		return this.bookmarkService.deleteBookmarkNyId(
			userId,
			bookmarkId,
		);
	}
}
