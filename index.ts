import express, { Express } from "express";
import dotenv from "dotenv"
import bodyParser from "body-parser";
import cors from "cors"
//Require các thành phần vừa viết
import * as database from "./config/database"
import routesAdminVersion1 from "./api/v1/routes/admins/index.routes";
import routesClientVersion1 from "./api/v1/routes/clients/index.routes";
import routesEmployerVersion1 from "./api/v1/routes/employers/index.routes";


//Tạo một đối tượng app
const app: Express = express();

//Cấu hình để nhận data body khi request
app.use(bodyParser.json({ limit: '50mb' }))
//Cấu hình cors để tên miền nào được truy cập,mặc định không truyền là cho phép tất cả
app.use(cors(
  {
    origin:"*",
    methods:["POST","GET","DELETE","PUT","PATCH","OPTIONS"]
  }
))

//Import cấu hình file .env
dotenv.config()
//Kết nối vào database
database.connect();

//Nhúng app admin của routes vào index
routesAdminVersion1(app);
//Nhúng app client của routes vào index
routesClientVersion1(app);
//Nhúng app employer của routes vào index
routesEmployerVersion1(app);
//Lấy port trong file env hoặc ko có mặc định cổng 3000
const port: (number | string) = process.env.PORT || 3001;


//Express lắng nghe cổng của bạn nó sẽ tạo ra một cổn cho bạn chỉ định
app.listen(port, (): void => {
    console.log(`App Listening On Port ${port}`)
})

