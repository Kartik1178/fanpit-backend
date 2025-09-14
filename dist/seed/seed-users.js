"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const users_service_1 = require("../users/users.service");
const user_schema_1 = require("../users/schemas/user.schema");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
async function seedUsers() {
    console.log('🌱 Starting user seeding...');
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const usersService = app.get(users_service_1.UsersService);
    const usersToSeed = [
        {
            email: 'john.doe@example.com',
            password: 'password123',
            firstName: 'John',
            lastName: 'Doe',
            phone: '+1234567890',
            role: user_schema_1.UserRole.CONSUMER,
        },
        {
            email: 'sarah.wilson@example.com',
            password: 'password123',
            firstName: 'Sarah',
            lastName: 'Wilson',
            phone: '+1234567891',
            role: user_schema_1.UserRole.CONSUMER,
        },
        {
            email: 'mike.johnson@example.com',
            password: 'password123',
            firstName: 'Mike',
            lastName: 'Johnson',
            phone: '+1234567892',
            role: user_schema_1.UserRole.CONSUMER,
        },
        {
            email: 'jane.smith@brand.com',
            password: 'password123',
            firstName: 'Jane',
            lastName: 'Smith',
            phone: '+1234567893',
            role: user_schema_1.UserRole.BRAND_OWNER,
        },
        {
            email: 'alex.brown@brand.com',
            password: 'password123',
            firstName: 'Alex',
            lastName: 'Brown',
            phone: '+1234567894',
            role: user_schema_1.UserRole.BRAND_OWNER,
        },
        {
            email: 'emma.davis@brand.com',
            password: 'password123',
            firstName: 'Emma',
            lastName: 'Davis',
            phone: '+1234567895',
            role: user_schema_1.UserRole.BRAND_OWNER,
        },
        {
            email: 'bob.johnson@company.com',
            password: 'password123',
            firstName: 'Bob',
            lastName: 'Johnson',
            phone: '+1234567896',
            role: user_schema_1.UserRole.STAFF,
        },
        {
            email: 'lisa.garcia@company.com',
            password: 'password123',
            firstName: 'Lisa',
            lastName: 'Garcia',
            phone: '+1234567897',
            role: user_schema_1.UserRole.STAFF,
        },
        {
            email: 'tom.wilson@company.com',
            password: 'password123',
            firstName: 'Tom',
            lastName: 'Wilson',
            phone: '+1234567898',
            role: user_schema_1.UserRole.STAFF,
        },
        {
            email: 'admin@company.com',
            password: 'password123',
            firstName: 'Alice',
            lastName: 'Admin',
            phone: '+1234567899',
            role: user_schema_1.UserRole.ADMIN,
        },
        {
            email: 'superadmin@company.com',
            password: 'password123',
            firstName: 'Super',
            lastName: 'Admin',
            phone: '+1234567800',
            role: user_schema_1.UserRole.ADMIN,
        },
    ];
    let successCount = 0;
    let errorCount = 0;
    for (const userData of usersToSeed) {
        try {
            const result = await usersService.create(userData);
            console.log(`✅ Created ${userData.role}: ${result.user.email}`);
            successCount++;
        }
        catch (error) {
            if (error.message.includes('already exists')) {
                console.log(`⚠️  User already exists: ${userData.email}`);
            }
            else {
                console.log(`❌ Error creating user ${userData.email}:`, error.message);
                errorCount++;
            }
        }
    }
    console.log('\n📊 Seeding Summary:');
    console.log(`✅ Successfully created: ${successCount} users`);
    console.log(`❌ Errors: ${errorCount} users`);
    console.log(`📝 Total processed: ${usersToSeed.length} users`);
    console.log('\n🔐 Test Credentials:');
    console.log('Consumer: john.doe@example.com / password123');
    console.log('Brand Owner: jane.smith@brand.com / password123');
    console.log('Staff: bob.johnson@company.com / password123');
    console.log('Admin: admin@company.com / password123');
    await app.close();
    console.log('\n🎉 Seeding completed!');
}
seedUsers().catch(console.error);
//# sourceMappingURL=seed-users.js.map