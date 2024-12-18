import prismadb from "@/lib/prismadb";
import bcrypt from "bcrypt"
import { NextResponse } from "next/server";

export async function GET( req: Request) {
    
    try {

        const users = await prismadb.user.findMany()

        return NextResponse.json(users)

    } catch (e) {

        return new NextResponse("Erro interno", { status: 500})

    }

}

export async function POST( req: Request) {

    try {

        const body = await req.json()
        
        const {name, email, password} = body

        if(!name) return new NextResponse("O campo nome deve possuir um valor válido.", { status: 400 })
        if(!email) return new NextResponse("O campo email deve possuir um valor válido.", { status: 400 })
        if(!password) return new NextResponse("O campo senha deve possuir um valor válido.", { status: 400 })

        const userExists = await prismadb.user.findFirst({
            where: {
                OR: [
                    { email },
                    { name }
                ]
            }
        })

        if(userExists) return new NextResponse("Um usuário com esses dados já existe.", { status: 400 })

        const pass = await bcrypt.hash(password, bcrypt.genSaltSync(10))

        const user = await prismadb.user.create({
            data: {
                name,
                email,
                password: pass,
                subscriptions: {},
                token: ''
            }
        })

        return NextResponse.json(user)

    } catch (e) {

        return new NextResponse("Erro interno", { status: 500})

    }
    
}