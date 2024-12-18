import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET( req: Request) {
    
    try {

        const url = new URL(req.url)

        const book = url.searchParams.get('book')

        const chapters = await prismadb.chapter.findMany()

        return NextResponse.json(chapters)

    } catch (e) {

        return new NextResponse("Erro interno", { status: 500})

    }

}

export async function POST( req: Request) {

    try {

        const body = await req.json()
        
        const {title, content, bookId} = body

        if(!title) return new NextResponse("O campo título deve possuir um valor válido.", { status: 400 })
        if(!content) return new NextResponse("O campo conteúdo deve possuir um valor válido.", { status: 400 })
        if(!bookId) return new NextResponse("O campo bookId deve possuir um valor válido.", { status: 400 })

        const chapter = await prismadb.chapter.create({
            data: {
                title,
                content,
                bookId
            }
        })

        return NextResponse.json(chapter)

    } catch (e: any) {

        return new NextResponse(e, { status: 500})

    }
    
}