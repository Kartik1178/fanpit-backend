"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const spaces_service_1 = require("../spaces/spaces.service");
const brands_service_1 = require("../brands/brands.service");
const users_service_1 = require("../users/users.service");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, '../.env') });
async function seedSpaces() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const spacesService = app.get(spaces_service_1.SpacesService);
    const brandsService = app.get(brands_service_1.BrandsService);
    const usersService = app.get(users_service_1.UsersService);
    try {
        console.log('🌱 Starting spaces seeding...');
        const brands = await brandsService.findAll({ limit: 100 });
        if (brands.brands.length === 0) {
            console.log('❌ No brands found. Please seed brands first.');
            return;
        }
        const sampleSpaces = [
            {
                name: "T-Hub Chennai",
                description: "India's largest startup incubator in Chennai with state-of-the-art facilities, mentorship programs, and a vibrant ecosystem of entrepreneurs and innovators.",
                images: [
                    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop&q=80"
                ],
                location: {
                    address: "IT Corridor, OMR Road",
                    city: "Chennai",
                    state: "Tamil Nadu",
                    country: "India",
                    postalCode: "600096",
                    lat: 12.9141,
                    lng: 80.2206
                },
                brand: brands.brands[0]._id,
                amenities: ["WiFi", "Coffee", "Meeting Rooms", "Parking", "Air Conditioning", "Projector", "Mentorship", "Events"],
                capacity: 200,
                pricePerHour: 25,
                operatingHours: {
                    open: "08:00",
                    close: "20:00"
                },
                peakPricing: {
                    "morning": 30,
                    "evening": 28
                },
                isActive: true,
                tags: ["startup", "incubator", "tech", "entrepreneur"],
                category: "coworking",
            },
            {
                name: "CoWrks Anna Salai",
                description: "Premium coworking space in the heart of Chennai with modern amenities, networking events, and a professional environment for businesses of all sizes.",
                images: [
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=800&fit=crop&q=80"
                ],
                location: {
                    address: "Anna Salai, Teynampet",
                    city: "Chennai",
                    state: "Tamil Nadu",
                    country: "India",
                    postalCode: "600018",
                    lat: 13.0418,
                    lng: 80.2341
                },
                brand: brands.brands[0]._id,
                amenities: ["WiFi", "Coffee", "Meeting Rooms", "Parking", "Air Conditioning", "Reception", "Mail Handling"],
                capacity: 80,
                pricePerHour: 20,
                operatingHours: {
                    open: "08:00",
                    close: "20:00"
                },
                isActive: true,
                tags: ["premium", "business", "networking"],
                category: "coworking",
            },
            {
                name: "Innov8 T-Nagar",
                description: "Creative coworking space in T-Nagar with flexible seating, event spaces, and a community of creative professionals and freelancers.",
                images: [
                    "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=800&fit=crop&q=80"
                ],
                location: {
                    address: "T-Nagar, Pondy Bazaar",
                    city: "Chennai",
                    state: "Tamil Nadu",
                    country: "India",
                    postalCode: "600017",
                    lat: 13.0418,
                    lng: 80.2341
                },
                brand: brands.brands[1] ? brands.brands[1]._id : brands.brands[0]._id,
                amenities: ["WiFi", "Coffee", "Flexible Seating", "Event Space", "Air Conditioning", "Music System"],
                capacity: 60,
                pricePerHour: 15,
                operatingHours: {
                    open: "08:00",
                    close: "20:00"
                },
                isActive: true,
                tags: ["creative", "flexible", "events", "freelancer"],
                category: "coworking",
            },
            {
                name: "Café Coffee Day Workspace",
                description: "Popular café chain with dedicated workspace areas, perfect for casual meetings and remote work with reliable WiFi and great coffee.",
                images: [
                    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop&q=80"
                ],
                location: {
                    address: "Phoenix MarketCity, Velachery",
                    city: "Chennai",
                    state: "Tamil Nadu",
                    country: "India",
                    postalCode: "600042",
                    lat: 12.9818,
                    lng: 80.2206
                },
                brand: brands.brands[1] ? brands.brands[1]._id : brands.brands[0]._id,
                amenities: ["WiFi", "Coffee", "Food", "Air Conditioning", "Outdoor Seating"],
                capacity: 40,
                pricePerHour: 8,
                operatingHours: {
                    open: "08:00",
                    close: "20:00"
                },
                isActive: true,
                tags: ["cafe", "casual", "remote work", "coffee"],
                category: "cafe",
            },
            {
                name: "Starbucks Reserve Workspace",
                description: "Premium Starbucks location with dedicated workspace areas, premium coffee, and a professional atmosphere for business meetings.",
                images: [
                    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop&q=80"
                ],
                location: {
                    address: "Express Avenue Mall, Royapettah",
                    city: "Chennai",
                    state: "Tamil Nadu",
                    country: "India",
                    postalCode: "600014",
                    lat: 13.0418,
                    lng: 80.2341
                },
                brand: brands.brands[2] ? brands.brands[2]._id : brands.brands[0]._id,
                amenities: ["WiFi", "Premium Coffee", "Food", "Air Conditioning", "Quiet Zones"],
                capacity: 35,
                pricePerHour: 12,
                operatingHours: {
                    open: "08:00",
                    close: "20:00"
                },
                isActive: true,
                tags: ["premium", "coffee", "business", "quiet"],
                category: "cafe",
            },
            {
                name: "WeWork Chennai",
                description: "Global coworking giant with premium facilities, networking events, and a professional community of entrepreneurs and businesses.",
                images: [
                    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop&q=80"
                ],
                location: {
                    address: "DLF IT Park, Mount Poonamallee Road",
                    city: "Chennai",
                    state: "Tamil Nadu",
                    country: "India",
                    postalCode: "600089",
                    lat: 13.0418,
                    lng: 80.2341
                },
                brand: brands.brands[2] ? brands.brands[2]._id : brands.brands[0]._id,
                amenities: ["WiFi", "Coffee", "Meeting Rooms", "Parking", "Air Conditioning", "Reception", "Mail", "Events"],
                capacity: 150,
                pricePerHour: 30,
                operatingHours: {
                    open: "08:00",
                    close: "20:00"
                }, peakPricing: {
                    "morning": 35,
                    "evening": 32
                },
                isActive: true,
                tags: ["premium", "global", "networking", "professional"],
                category: "coworking",
            },
            {
                name: "The Hive Chennai",
                description: "Local coworking space with a community focus, regular workshops, and a supportive environment for startups and freelancers.",
                images: [
                    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop&q=80"
                ],
                location: {
                    address: "Alwarpet, Chennai",
                    city: "Chennai",
                    state: "Tamil Nadu",
                    country: "India",
                    postalCode: "600018",
                    lat: 13.0418,
                    lng: 80.2341
                },
                brand: brands.brands[0]._id,
                amenities: ["WiFi", "Coffee", "Workshops", "Air Conditioning", "Community Events"],
                capacity: 45,
                pricePerHour: 18,
                operatingHours: {
                    open: "08:00",
                    close: "20:00"
                },
                isActive: true,
                tags: ["community", "workshops", "startup", "local"],
                category: "coworking",
            },
            {
                name: "Costa Coffee Workspace",
                description: "British coffee chain with comfortable seating and reliable WiFi, perfect for casual work sessions and informal meetings.",
                images: [
                    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=800&fit=crop&q=80"
                ],
                location: {
                    address: "Forum Mall, Vadapalani",
                    city: "Chennai",
                    state: "Tamil Nadu",
                    country: "India",
                    postalCode: "600026",
                    lat: 13.0418,
                    lng: 80.2341
                },
                brand: brands.brands[1] ? brands.brands[1]._id : brands.brands[0]._id,
                amenities: ["WiFi", "Coffee", "Food", "Air Conditioning", "Comfortable Seating"],
                capacity: 30,
                pricePerHour: 10,
                operatingHours: {
                    open: "08:00",
                    close: "20:00"
                },
                isActive: true,
                tags: ["cafe", "casual", "comfortable", "british"],
                category: "cafe",
            },
            {
                name: "91springboard Chennai",
                description: "Startup accelerator and coworking space with mentorship programs, investor connections, and a vibrant startup ecosystem.",
                images: [
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop&q=80"
                ],
                location: {
                    address: "Guindy, Chennai",
                    city: "Chennai",
                    state: "Tamil Nadu",
                    country: "India",
                    postalCode: "600032",
                    lat: 13.0418,
                    lng: 80.2341
                },
                brand: brands.brands[2] ? brands.brands[2]._id : brands.brands[0]._id,
                amenities: ["WiFi", "Coffee", "Meeting Rooms", "Mentorship", "Investor Network", "Events", "Parking"],
                capacity: 120,
                pricePerHour: 22,
                operatingHours: {
                    open: "08:00",
                    close: "20:00"
                },
                isActive: true,
                tags: ["startup", "accelerator", "mentorship", "investor"],
                category: "coworking",
            },
            {
                name: "Blue Tokai Coffee Workspace",
                description: "Specialty coffee roastery with workspace areas, perfect for coffee enthusiasts and remote workers who appreciate quality coffee.",
                images: [
                    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=800&fit=crop&q=80"
                ],
                location: {
                    address: "Bessy, Chennai",
                    city: "Chennai",
                    state: "Tamil Nadu",
                    country: "India",
                    postalCode: "600028",
                    lat: 13.0418,
                    lng: 80.2341
                },
                brand: brands.brands[0]._id,
                amenities: ["WiFi", "Specialty Coffee", "Food", "Air Conditioning", "Quiet Atmosphere"],
                capacity: 25,
                pricePerHour: 14,
                operatingHours: {
                    open: "08:00",
                    close: "20:00"
                },
                isActive: true,
                tags: ["specialty coffee", "quiet", "quality", "roastery"],
                category: "cafe",
            },
            {
                name: "Birthday Party Palace",
                description: "Perfect venue for birthday celebrations with party decorations, music system, and catering facilities. Ideal for kids and adult birthday parties.",
                images: [
                    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1200&h=800&fit=crop&q=80"
                ],
                location: {
                    address: "T-Nagar, Chennai",
                    city: "Chennai",
                    state: "Tamil Nadu",
                    country: "India",
                    postalCode: "600017",
                    lat: 13.0418,
                    lng: 80.2341
                },
                brand: brands.brands[0]._id,
                amenities: ["Party Decorations", "Music System", "Catering", "Air Conditioning", "Parking", "Photography Setup", "Birthday Cake Service"],
                capacity: 50,
                pricePerHour: 40,
                operatingHours: {
                    open: "08:00",
                    close: "20:00"
                }, peakPricing: {
                    "weekend": 50,
                    "evening": 45
                },
                isActive: true,
                tags: ["birthday", "party", "celebration", "kids", "family"],
                category: "event"
            },
            {
                name: "Corporate Meeting Hall",
                description: "Professional meeting space with conference facilities, presentation equipment, and business amenities for corporate events and meetings.",
                images: [
                    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop&q=80"
                ],
                location: {
                    address: "Anna Salai, Chennai",
                    city: "Chennai",
                    state: "Tamil Nadu",
                    country: "India",
                    postalCode: "600018",
                    lat: 13.0418,
                    lng: 80.2341
                },
                brand: brands.brands[1] ? brands.brands[1]._id : brands.brands[0]._id,
                amenities: ["Projector", "Whiteboard", "Video Conferencing", "WiFi", "Coffee", "Air Conditioning", "Reception Service", "Catering"],
                capacity: 30,
                pricePerHour: 35,
                operatingHours: {
                    open: "08:00",
                    close: "20:00"
                }, peakPricing: {
                    "morning": 40,
                    "afternoon": 38
                },
                isActive: true,
                tags: ["corporate", "meeting", "business", "professional", "conference"],
                category: "business"
            },
            {
                name: "Art Studio & Gallery",
                description: "Creative art studio with natural lighting, art supplies, and exhibition space. Perfect for art workshops, painting classes, and art exhibitions.",
                images: [
                    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop&q=80"
                ],
                location: {
                    address: "Bessy, Chennai",
                    city: "Chennai",
                    state: "Tamil Nadu",
                    country: "India",
                    postalCode: "600028",
                    lat: 13.0418,
                    lng: 80.2341
                },
                brand: brands.brands[2] ? brands.brands[2]._id : brands.brands[0]._id,
                amenities: ["Art Supplies", "Natural Light", "Easels", "Exhibition Space", "WiFi", "Air Conditioning", "Storage", "Cleaning Station"],
                capacity: 25,
                pricePerHour: 25,
                operatingHours: {
                    open: "08:00",
                    close: "20:00"
                },
                isActive: true,
                tags: ["art", "creative", "workshop", "painting", "exhibition", "studio"],
                category: "creative"
            },
            {
                name: "Fitness & Yoga Studio",
                description: "Well-equipped fitness studio with yoga mats, weights, and mirrors. Perfect for fitness classes, yoga sessions, and personal training.",
                images: [
                    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop&q=80"
                ],
                location: {
                    address: "Alwarpet, Chennai",
                    city: "Chennai",
                    state: "Tamil Nadu",
                    country: "India",
                    postalCode: "600018",
                    lat: 13.0418,
                    lng: 80.2341
                },
                brand: brands.brands[0]._id,
                amenities: ["Yoga Mats", "Weights", "Mirrors", "Sound System", "Air Conditioning", "Changing Room", "Water Station", "Storage Lockers"],
                capacity: 20,
                pricePerHour: 30,
                operatingHours: {
                    open: "08:00",
                    close: "20:00"
                }, peakPricing: {
                    "morning": 35,
                    "evening": 32
                },
                isActive: true,
                tags: ["fitness", "yoga", "health", "wellness", "training", "exercise"],
                category: "fitness"
            },
            {
                name: "Gaming & Esports Center",
                description: "High-tech gaming center with gaming PCs, consoles, and esports setup. Perfect for gaming tournaments, LAN parties, and gaming events.",
                images: [
                    "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop&q=80"
                ],
                location: {
                    address: "Velachery, Chennai",
                    city: "Chennai",
                    state: "Tamil Nadu",
                    country: "India",
                    postalCode: "600042",
                    lat: 12.9818,
                    lng: 80.2206
                },
                brand: brands.brands[1] ? brands.brands[1]._id : brands.brands[0]._id,
                amenities: ["Gaming PCs", "Gaming Consoles", "High-Speed Internet", "Gaming Chairs", "Air Conditioning", "Snacks", "Tournament Setup", "Streaming Equipment"],
                capacity: 40,
                pricePerHour: 20,
                operatingHours: {
                    open: "08:00",
                    close: "20:00"
                }, peakPricing: {
                    "weekend": 25,
                    "evening": 22
                },
                isActive: true,
                tags: ["gaming", "esports", "tournament", "LAN party", "gaming", "entertainment"],
                category: "entertainment"
            },
            {
                name: "Bangalore Tech Hub",
                description: "Silicon Valley of India's premier coworking space with cutting-edge technology, mentorship, and a thriving startup ecosystem.",
                images: [
                    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop&q=80"
                ],
                location: {
                    address: "Electronic City, Bangalore",
                    city: "Bangalore",
                    state: "Karnataka",
                    country: "India",
                    postalCode: "560100",
                    lat: 12.8456,
                    lng: 77.6603
                },
                brand: brands.brands[1] ? brands.brands[1]._id : brands.brands[0]._id,
                amenities: ["WiFi", "Coffee", "Meeting Rooms", "Parking", "Air Conditioning", "Tech Support", "Events"],
                capacity: 180,
                pricePerHour: 28,
                operatingHours: {
                    open: "08:00",
                    close: "20:00"
                }, peakPricing: {
                    "morning": 32,
                    "evening": 30
                },
                isActive: true,
                tags: ["tech", "startup", "silicon valley", "innovation"],
                category: "coworking",
            },
            {
                name: "Mumbai Business Center",
                description: "Premium business center in the financial capital with executive facilities, meeting rooms, and corporate amenities.",
                images: [
                    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop&q=80"
                ],
                location: {
                    address: "Bandra Kurla Complex, Mumbai",
                    city: "Mumbai",
                    state: "Maharashtra",
                    country: "India",
                    postalCode: "400051",
                    lat: 19.0596,
                    lng: 72.8295
                },
                brand: brands.brands[2] ? brands.brands[2]._id : brands.brands[0]._id,
                amenities: ["WiFi", "Coffee", "Meeting Rooms", "Private Offices", "Reception", "Parking", "Concierge"],
                capacity: 100,
                pricePerHour: 35,
                operatingHours: {
                    open: "08:00",
                    close: "20:00"
                }, peakPricing: {
                    "morning": 40,
                    "evening": 38
                },
                isActive: true,
                tags: ["business", "corporate", "premium", "financial"],
                category: "business",
            },
            {
                name: "Delhi Creative Studio",
                description: "Artistic coworking space in the capital with creative workshops, art exhibitions, and a community of designers and artists.",
                images: [
                    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop&q=80"
                ],
                location: {
                    address: "Hauz Khas, New Delhi",
                    city: "New Delhi",
                    state: "Delhi",
                    country: "India",
                    postalCode: "110016",
                    lat: 28.5355,
                    lng: 77.1990
                },
                brand: brands.brands[0]._id,
                amenities: ["WiFi", "Coffee", "Art Supplies", "Exhibition Space", "Workshops", "Natural Light"],
                capacity: 50,
                pricePerHour: 20,
                operatingHours: {
                    open: "08:00",
                    close: "20:00"
                },
                isActive: true,
                tags: ["creative", "art", "design", "exhibition"],
                category: "creative",
            },
            {
                name: "Hyderabad IT Park",
                description: "Modern IT-focused coworking space with high-speed internet, tech amenities, and a community of software professionals.",
                images: [
                    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop&q=80"
                ],
                location: {
                    address: "HITEC City, Hyderabad",
                    city: "Hyderabad",
                    state: "Telangana",
                    country: "India",
                    postalCode: "500081",
                    lat: 17.4478,
                    lng: 78.3498
                },
                brand: brands.brands[1] ? brands.brands[1]._id : brands.brands[0]._id,
                amenities: ["WiFi", "Coffee", "Meeting Rooms", "Parking", "Air Conditioning", "Tech Support"],
                capacity: 80,
                pricePerHour: 18,
                operatingHours: {
                    open: "08:00",
                    close: "20:00"
                },
                isActive: true,
                tags: ["IT", "tech", "software", "modern"],
                category: "coworking",
            },
            {
                name: "Pune Startup Hub",
                description: "Vibrant startup ecosystem with mentorship programs, investor connections, and a supportive community for entrepreneurs.",
                images: [
                    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=800&fit=crop&q=80"
                ],
                location: {
                    address: "Koregaon Park, Pune",
                    city: "Pune",
                    state: "Maharashtra",
                    country: "India",
                    postalCode: "411001",
                    lat: 18.5204,
                    lng: 73.8567
                },
                brand: brands.brands[2] ? brands.brands[2]._id : brands.brands[0]._id,
                amenities: ["WiFi", "Coffee", "Meeting Rooms", "Mentorship", "Investor Network", "Events"],
                capacity: 70,
                pricePerHour: 16,
                operatingHours: {
                    open: "08:00",
                    close: "20:00"
                },
                isActive: true,
                tags: ["startup", "mentorship", "investor", "ecosystem"],
                category: "coworking",
            }
        ];
        console.log('🧹 Clearing existing spaces...');
        console.log('🏢 Creating spaces...');
        for (const spaceData of sampleSpaces) {
            try {
                const space = await spacesService.create(spaceData);
                console.log(`✅ Created space: ${space.name}`);
            }
            catch (error) {
                console.error(`❌ Failed to create space ${spaceData.name}:`, error.message);
            }
        }
        console.log('🎉 Spaces seeding completed!');
        console.log(`📊 Created ${sampleSpaces.length} spaces`);
    }
    catch (error) {
        console.error('❌ Error during spaces seeding:', error);
    }
    finally {
        await app.close();
    }
}
seedSpaces().catch(console.error);
//# sourceMappingURL=seed-spaces.js.map