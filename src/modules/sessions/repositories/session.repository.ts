import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { SessionStatus } from "src/generated/prisma/client";

@Injectable()
export class SessionRepository {
    constructor(
        private readonly prismaService:PrismaService
    ) {}
    async create(data:{
        userId:number,
        refreshTokenHash:string,
        status?:SessionStatus
    }){
        return await this.prismaService.session.create({
            data:{
                userId:data.userId,
                refreshTokenHash:data.refreshTokenHash,
                status:data.status ?? SessionStatus.ACTIVE
            }
        })
    }
    async findActiveByUserId(userId:number){
        return await this.prismaService.session.findFirst({
            where:{
                userId:userId,
                status:SessionStatus.ACTIVE
            }
        })
    }
    async findById(id:number){
        return await this.prismaService.session.findUnique({
            where:{
                id:id
            }
        })
    }
    async updateStatus(id:number,status:SessionStatus){
        return await this.prismaService.session.update({
            where:{
                id:id
            },
            data:{
                status:status
            }
        })
    }
    async revokeAllActiveByUserId(userId:number){
        return await this.prismaService.session.updateMany({
            where:{
                userId:userId,
                status:SessionStatus.ACTIVE
            },
            data:{
                status:SessionStatus.REVOKED
            }
        })
    }
    async delete(id:number){
        return await this.prismaService.session.delete({
            where:{
                id:id
            }
        })
    }
}