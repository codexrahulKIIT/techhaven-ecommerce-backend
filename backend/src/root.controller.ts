import { Controller, Get } from "@nestjs/common";

@Controller()
export class RootController {
  @Get()
  getHello(): string {
    return "🚀 Server running on go and do fuck fucka fuck";
  }
}
