import prismadb from "@/lib/prismadb";
import bcrypt from "bcrypt";
import { connect } from "http2";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const key: string = process.env.JWT as string

export async function GET( req: Request, { params }: { params: { userEmail: string } }) {
    
    try {

        const user = await prismadb.user.findFirst({
            where: {
                email: params.userEmail
            },
            include: {
                subscriptions: true
            }
        })

        return NextResponse.json(user)

    } catch (e) {

        return new NextResponse("Erro interno", { status: 500})

    }

}

export async function POST( req: Request, { params }: { params: { userEmail: string } } ) {

    try {

        const body = await req.json()
        
        const {password} = body

        const user = await prismadb.user.findFirst({
            where: {
                email: params.userEmail
            }
        })

        if(!user?.email) return new NextResponse("Email inválido.", { status: 400 })
        if(!password) return new NextResponse("O campo senha deve possuir um valor válido.", { status: 400 })
        
        const hashPass = bcrypt.compareSync(password, user.password)

        if(!hashPass) return new NextResponse("Senha incorreta.", { status: 400})

        const token = jwt.sign({
            id: user.id,
            email: user.email
        },
        key,
        { expiresIn: "1h"}
        )

        await prismadb.user.updateMany({
            where: {
                email: params.userEmail
            },
            data: {
                token
            }
        })

        return NextResponse.json("Usuário autenticado.")

    } catch (e) {

        return new NextResponse("Erro interno", { status: 500})

    }
    
}

export async function PATCH( req: Request, { params }: { params: { userEmail: string } } ) {

    try {

        const body = await req.json()
        
        const { subscriptions} = body

        if(!params.userEmail) return new NextResponse("Email inválido.", { status: 400 })

        const user = await prismadb.user.findFirst({
            where: {
                email: params.userEmail
            }
        })

        if(!user?.token) return new NextResponse("Token de usuário inválido.", { status: 400 })

        const verify = jwt.verify(user.token, key)

        if(!verify) return new NextResponse("Usuário não autenticado no momento")

        const patchedUser = await prismadb.user.update({
            where: {
                email: params.userEmail
            },
            data: {
                subscriptions: {
                    connect: subscriptions.map((id: string) => (id))
                }
            },
            include: {
                subscriptions: true
            }
        })

        return NextResponse.json(patchedUser)

    } catch (e: any) {

        return new NextResponse(e, { status: 500})

    }
    
}