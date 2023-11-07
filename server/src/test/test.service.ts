import { Injectable } from "@nestjs/common";

@Injectable()
export class TestService {
    async test(): Promise<{message : string}> {
        return { message : "This is working" }
    }
}