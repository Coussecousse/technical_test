import { Controller, Get } from "@nestjs/common";
import { TestService } from "./test.service";

@Controller()
export class TestController {
    constructor(private testService: TestService) {}

    @Get('/test')
    test(): Promise<{message: string}> {
        return this.testService.test();
    }
}