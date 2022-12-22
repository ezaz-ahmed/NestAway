import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post("signin")
	login() {
		return this.authService.signin();
	}

	@Post("signup")
	signup() {
		return this.authService.signup();
	}
}
