import { Injectable } from '@nestjs/common';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookmarkService {
	constructor(private prisma: PrismaService) {}

	getBookmarks(userId: number) {
		return this.prisma.bookMark.findMany({
			where: {
				userId,
			},
		});
	}
	
	getBookmarksById(userId: number, bookmarkId: number) {
		return this.prisma.bookMark.findFirst({
			where: {
				id: bookmarkId,
				userId,
			},
		});
	}
	
	async CreateBookmark(userId: number, dto: CreateBookmarkDto) {
		const  bookmark = await this.prisma.bookMark.create({
			data: {
				userId,
				...dto,
			},
		});
		return bookmark;
	}
	
	editBookmarkById(userId: number, dto: EditBookmarkDto, bookmarkId: number)
	{
		
	}

	deleteBookmarkNyId(userId: number, bookmarkId: number)
	{

	}
}
