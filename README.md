# Fastify Clean Architecture Repo(sport ecommerce api)
Sử dụng Clean Architecture(Nhánh phụ của Layered Architecture) và Monolithic Architecture để phát triển api

## Các bước để chạy

```bash
docker compose --profile debug up --build -d
docker exec -it drizzle_studio pnpm migration:up
docker exec -it drizzle_studio pnpm seeder:run
```

## Các điện chỉ có thể truy cập sau khi khởi chạy docker:
- http://localhost:3000/reference : Document Autogen của API, dùng để test api
- https://local.drizzle.studio/?port=3001 : Quản lý xem dữ liệu DB 
- http://localhost:9001/login : Quản lý minio, dùng để check file lưu thông qua send API request. Đăng nhập theo MINIO_ACCESS_KEY và MINIO_SECRET_KEY trong file `.env.example`