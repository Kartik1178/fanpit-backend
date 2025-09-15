import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    register(createUserDto: CreateUserDto): Promise<{
        user: import("./schemas/user.schema").User;
        token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        user: import("./schemas/user.schema").User;
        token: string;
    }>;
    logout(user: any): Promise<{
        message: string;
    }>;
    getProfile(user: any): Promise<import("./schemas/user.schema").User>;
    findAll(): Promise<import("./schemas/user.schema").User[]>;
    findAllPublic(): Promise<import("./schemas/user.schema").User[]>;
    findOne(id: string): Promise<import("./schemas/user.schema").User>;
    updateProfile(req: any, updateData: any): Promise<import("./schemas/user.schema").User>;
}
