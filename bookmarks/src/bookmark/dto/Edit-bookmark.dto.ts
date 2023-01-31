import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class EditBookmarkDto {
	@IsString()
	@IsNotEmpty()
	@IsOptional()
	title?: string

	@IsString()
	@IsOptional()
	description? : string

	@IsOptional()
	@IsString()
	link?: string
}