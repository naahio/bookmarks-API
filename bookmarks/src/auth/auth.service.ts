import { Injectable } from "@nestjs/common";
import { User, BookMark } from "@prisma/client";

@Injectable({})
export class AuthService{
	signup() {
		return {msg: 'hello from service'}
	}
	signin() {
		return 'i am signin'
	}
}