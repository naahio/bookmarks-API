import { IsEmail, IsOptional, IsString } from "class-validator"

export class EditUserDto {
	@IsEmail()
	email?: string
	@IsString()
	@IsOptional()
	firstname?: string
	@IsString()
	@IsOptional()
	lastname?: string

}