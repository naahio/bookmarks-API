import { PrismaService } from "../prisma/prisma.service";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthDto } from "./dto";
import * as argon from 'argon2'
import { PrismaClientExtensionError } from "@prisma/client/runtime";

@Injectable()
export class AuthService{
	constructor(private prisma: PrismaService) {}

	async signup(dto: AuthDto) {
		try {
			const hash = await argon.hash(dto.password);
			const user = await this.prisma.user.create({
				data: {
					email: dto.email,
					hash,
				},
			});
			return user; 
		}catch(error) {
			if (error instanceof PrismaClientExtensionError){
				throw new ForbiddenException('Credentials taken');
			}
		}
	}
	async signin(dto: AuthDto) {
		// find user
		const user = await this.prisma.user.findUnique({
			where: {
				 email: dto.email,
			},
		});
		if (!user)
			throw new ForbiddenException( 'Credentials insorrect' );
		//compare paswword
		const pwMatches = await argon.verify(
			user.hash, dto.password
		);
		if (!pwMatches)
			throw new ForbiddenException ('Credentials incorrect');
		// if user doesn't exist throw exception
			delete user.hash;
		//
		return user;
	}
}