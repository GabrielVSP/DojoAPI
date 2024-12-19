import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";


export async function GET( req: Request, { params }: { params: Promise<{ bookId: string }> }) {
 
    try {

        const { bookId } = await params

        if (!bookId) return new NextResponse("ID inválido", { status: 400 })

        const url = new URL(req.url)

        const authorParam = url.searchParams.get('author')
        const genreParam = url.searchParams.get('genre')

        const book = await prismadb.book.findFirst({
            where: {
                id: bookId,
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

export async function PATCH(req: Request, { params }: { params: Promise<{ bookId: string }> }) {

    try {

        const body = await req.json()
        const { bookId } = await params
        const {title, author, genre} = body
    
        if (!bookId) return new NextResponse("ID inválido", { status: 400 })
        
        const book = await prismadb.book.update({
            where: {
                id: bookId
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

export async function DELETE(req: Request, { params }: { params: Promise<{ bookId: string }> } ) {

    try {

        const { bookId } = await params
    
        if (!bookId) return new NextResponse("ID inválido", { status: 400 })
        
        const book = await prismadb.book.delete({
            where: {
                id: bookId
            }
        })

        return NextResponse.json(book)

    } catch {

        return new NextResponse("Erro interno", { status: 500})

    }

}