import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET( req: Request, { params }: { params: {bookId: string}}) {
    
    try {

        if (!params.bookId) return new NextResponse("ID inválido", { status: 400 })

        const url = new URL(req.url)

        const authorParam = url.searchParams.get('author')
        const genreParam = url.searchParams.get('genre')

        const book = await prismadb.book.findFirst({
            where: {
                id: params.bookId,
                OR: [
                    {author: authorParam ? {contains: authorParam, mode: 'insensitive'} : {}},
                    {genre: genreParam ? {contains: genreParam, mode: 'insensitive'} : {}}
                ]
            },
            include: {
                chapters: true
            }
        })

        return NextResponse.json(book)

    } catch {

        return new NextResponse("Erro interno", { status: 500})

    }

}

export async function PATCH(req: Request, { params }: { params: {bookId: string}}) {

    try {

        const body = await req.json()
        const {title, author, genre} = body
    
        if (!params.bookId) return new NextResponse("ID inválido", { status: 400 })
        
        const book = await prismadb.book.update({
            where: {
                id: params.bookId
            },
            data: {
                title,
                author,
                genre
            }
        })

        return NextResponse.json(book)

    } catch {

        return new NextResponse("Erro interno", { status: 500})

    }

}

export async function DELETE(req: Request, { params }: { params: {bookId: string}}) {

    try {

    
        if (!params.bookId) return new NextResponse("ID inválido", { status: 400 })
        
        const book = await prismadb.book.delete({
            where: {
                id: params.bookId
            }
        })

        return NextResponse.json(book)

    } catch {

        return new NextResponse("Erro interno", { status: 500})

    }

}