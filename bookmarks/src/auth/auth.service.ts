import { PrismaService } from "../prisma/prisma.service";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthDto } from "./dto";
import * as argon from 'argon2'
import { PrismaClientExtensionError } from "@prisma/client/runtime";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService{
	constructor(
		private prisma: PrismaService,
		private jwt: JwtService,
		private	config: ConfigService,
		){}

	async signup(dto: AuthDto) {
		try {
			const hash = await argon.hash(dto.password);
			const user = await this.prisma.user.create({
				data: {
					email: dto.email,
					hash,
				},
			});
			return	this.signToken(user.id, user.email); 
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
		return this.signToken(user.id, user.email);
	}

	async signToken(userId: number, email: String): Promise<{access_token: string}> 
	{
		const data = {
			sub: userId,
			email
		}

		const secrets = this.config.get('JWT_SECRET');
		const token = await this.jwt.signAsync(
			data, {
			expiresIn: '15m',
			secret: secrets,
		})

		return {
			access_token: token,
		};
	}
}