import { Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
declare const JwtStrategyNew_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithoutRequest] | [opt: import("passport-jwt").StrategyOptionsWithRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategyNew extends JwtStrategyNew_base {
    private usersService;
    constructor(usersService: UsersService);
    validate(payload: any): Promise<{
        sub: any;
        email: any;
        role: any;
    }>;
}
export {};
