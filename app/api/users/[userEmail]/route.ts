import prismadb from "@/lib/prismadb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const key: string = process.env.JWT as string

export async function GET( req: Request, { params }: { params: { email: string } }) {
    
    try {

        const user = await prismadb.user.findFirst({
            where: {
                email: params.email
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

export async function POST( req: Request, { params }: { params: { email: string } } ) {

    try {

        const body = await req.json()
        
        const {password} = body

        const user = await prismadb.user.findFirst({
            where: {
                email: params.email
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
        { expiresIn: "3h"}
        )

        return NextResponse.json(token)

    } catch (e) {

        return new NextResponse("Erro interno", { status: 500})

    }
    
}