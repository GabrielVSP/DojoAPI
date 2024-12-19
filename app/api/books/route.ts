/* eslint-disable @typescript-eslint/no-explicit-any */

import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET( req: Request) {
    
    try {

        const url = new URL(req.url)

        const authorParam = url.searchParams.get('author')
        const genreParam = url.searchParams.get('genre')

        const books = await prismadb.book.findMany({
            where: {
                OR: [
                    { author: authorParam ? {contains: authorParam, mode: 'insensitive'} : {} },
                    { genre: genreParam ? {contains: genreParam, mode: 'insensitive'} : {} }
                ]
            }
        })

        return NextResponse.json(books)

    } catch (e: any) {

        console.log("ERROR GET BOOKS -> " + e)

        return new NextResponse(e, { status: 500})

    }

}

export async function POST( req: Request) {

    try {

        const body = await req.json()
        
        const {title, author, genre} = body

        if(!title) return new NextResponse("O campo título deve possuir um valor válido.", { status: 400 })
        if(!author) return new NextResponse("O campo autor deve possuir um valor válido.", { status: 400 })
        if(!genre) return new NextResponse("O campo gênero deve possuir um valor válido.", { status: 400 })

        const book = await prismadb.book.create({
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