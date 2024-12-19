import prismadb from "@/lib/prismadb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const key: string = process.env.JWT as string

export async function GET( req: Request, { params }: { params: Promise<{ userEmail: string }> }) {
    
    try {

        const auth = req.headers.get("Authorization");

        if (!auth) return new NextResponse("Token não fornecido", { status: 401 })

        const token = jwt.verify(auth, key) as { userId: string }
        
        const user = await prismadb.user.findFirst({
            where: { 
                id: token.userId 
            },
            include: {
                subscriptions: true
            }
        });

        if (!user) return new NextResponse("Usuário não encontrado", { status: 404 })

        const subscriptions = user?.subscriptions.map((subs) => (subs.id))
    
        const notifications = await prismadb.queue.findMany({
            where: {
                bookId: {
                    in: subscriptions
                }
            }
        })

        return NextResponse.json({
            user,
            notifications: notifications.map((not) => (not.payload))
        });

    } catch {

        return new NextResponse('Erro interno.', { status: 500})

    }

}