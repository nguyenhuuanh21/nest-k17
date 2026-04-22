export class UserMapper {
    static toResponse(user: any) {
        return {
            id: user.id,
            email: user.email,
            role: user.role,
            status: user.status,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }
    }
}