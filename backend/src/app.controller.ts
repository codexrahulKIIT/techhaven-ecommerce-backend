import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return "🚀 Server running on go and do fuck fucka fuck";
  }

  @Get('/')
  getRoot(): string {
    return "🚀 Server running on go and do fuck fucka fuck";
  }
}
