"use client"

import { useEffect, useState } from "react";

export default function Home() {

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if(!isMounted) return

  return (
    <main className="p-5">

      <section>

        <h2 className="font-bold text-2xl my-3">Livros</h2>

        <div className="p-2 border border-gray-300 rounded-md my-2">
          <div className="flex items-center">
            <h3 className="px-1 text-md bg-green-500 text-white w-fit rounded-md my-2 mr-3">GET</h3>
            <p>Retorna todos os livros.</p>
          </div>
          <p className="font-bold rounded-sm px-1 bg-gray-200">{process.env.url}books?author=&genre=/</p>
        </div>

        <div className="p-2 border border-gray-300 rounded-md my-2">
          <div className="flex items-center">
            <h3 className="px-1 text-md bg-green-500 text-white w-fit rounded-md my-2 mr-3">GET</h3>
            <p>Retorna um livro específico.</p>
          </div>
          <p className="font-bold rounded-sm px-1 bg-gray-200">{process.env.url}books/[id]?author=&genre=/</p>
        </div>

        <div className="p-2 border border-gray-300 rounded-md my-2">
          <div className="flex items-center">
            <h3 className="px-1 text-md bg-yellow-500 text-white w-fit rounded-md my-2 mr-3">POST</h3>
            <p>Adiciona um livro.</p>
          </div>
          <p className="font-bold rounded-sm px-1 bg-gray-200">{process.env.url}books/</p>
        </div>

        <div className="p-2 border border-gray-300 rounded-md my-2">
          <div className="flex items-center">
            <h3 className="px-1 text-md bg-teal-500 text-white w-fit rounded-md my-2 mr-3">PATCH</h3>
            <p>Atualiza os dados de um livro.</p>
          </div>
          <p className="font-bold rounded-sm px-1 bg-gray-200">{process.env.url}books/[id]</p>
        </div>

        <div className="p-2 border border-gray-300 rounded-md my-2">
          <div className="flex items-center">
            <h3 className="px-1 text-md bg-red-500 text-white w-fit rounded-md my-2 mr-3">DELETE</h3>
            <p>Remove um livro.</p>
          </div>
          <p className="font-bold rounded-sm px-1 bg-gray-200">{process.env.url}books/[id]</p>
        </div>

        <div className="p-2 bg-slate-700 uppercase text-slate-300 font-bold w-1/4 ml-2">
          <p>id: <span className="text-teal-500">string</span></p>
          <p>author: <span className="text-teal-500">string</span></p>
          <p>genre: <span className="text-teal-500">string</span></p>
          <p>chapter: <span className="text-teal-500">Chapter[ ]</span></p>
          <p>users: <span className="text-teal-500">User[ ]</span></p>
        </div>

      </section>

      <section>

        <h2 className="font-bold text-2xl my-3">Capítulos</h2>

        <div className="p-2 border border-gray-300 rounded-md my-2">
          <div className="flex items-center">
            <h3 className="px-1 text-md bg-green-500 text-white w-fit rounded-md my-2 mr-3">GET</h3>
            <p>Retorna todos os capítulo.</p>
          </div>
          <p className="font-bold rounded-sm px-1 bg-gray-200">{process.env.url}chapters</p>
        </div>

        <div className="p-2 border border-gray-300 rounded-md my-2">
          <div className="flex items-center">
            <h3 className="px-1 text-md bg-yellow-500 text-white w-fit rounded-md my-2 mr-3">POST</h3>
            <p>Adiciona um capítulo.</p>
          </div>
          <p className="font-bold rounded-sm px-1 bg-gray-200">{process.env.url}chapters/</p>
        </div>

        <div className="p-2 bg-slate-700 uppercase text-slate-300 font-bold w-1/4 ml-2">
          <p>id: <span className="text-teal-500">string</span></p>
          <p>title: <span className="text-teal-500">string</span></p>
          <p>content: <span className="text-teal-500">string</span></p>
          <p>book: <span className="text-teal-500">Book</span></p>
          <p>bookId: <span className="text-teal-500">string</span></p>
        </div>

      </section>
      
      <section>

        <h2 className="font-bold text-2xl my-3">Usuários</h2>

        <div className="p-2 border border-gray-300 rounded-md my-2">
          <div className="flex items-center">
            <h3 className="px-1 text-md bg-green-500 text-white w-fit rounded-md my-2 mr-3">GET</h3>
            <p>Retorna todos os usuários.</p>
          </div>
          <p className="font-bold rounded-sm px-1 bg-gray-200">{process.env.url}users/</p>
        </div>

        <div className="p-2 border border-gray-300 rounded-md my-2">
          <div className="flex items-center">
            <h3 className="px-1 text-md bg-green-500 text-white w-fit rounded-md my-2 mr-3">GET</h3>
            <p>Retorna um usuário específico.</p>
          </div>
          <p className="font-bold rounded-sm px-1 bg-gray-200">{process.env.url}users/[email]</p>
        </div>

        <div className="p-2 border border-gray-300 rounded-md my-2">
          <div className="flex items-center">
            <h3 className="px-1 text-md bg-yellow-500 text-white w-fit rounded-md my-2 mr-3">POST</h3>
            <p>Adiciona um usuário.</p>
          </div>
          <p className="font-bold rounded-sm px-1 bg-gray-200">{process.env.url}users/</p>
        </div>

        <div className="p-2 border border-gray-300 rounded-md my-2">
          <div className="flex items-center">
            <h3 className="px-1 text-md bg-yellow-500 text-white w-fit rounded-md my-2 mr-3">POST</h3>
            <p>Realiza o login do usuário, o body deve conter a senha.</p>
          </div>
          <p className="font-bold rounded-sm px-1 bg-gray-200">{process.env.url}users/[email]</p>
        </div>

        <div className="p-2 border border-gray-300 rounded-md my-2">
          <div className="flex items-center">
            <h3 className="px-1 text-md bg-teal-500 text-white w-fit rounded-md my-2 mr-3">PATCH</h3>
            <p>Atualiza as inscrições do usuário(apenas quando autenticado).</p>
          </div>
          <p className="font-bold rounded-sm px-1 bg-gray-200">{process.env.url}users/[email]</p>
        </div>

        <div className="p-2 bg-slate-700 uppercase text-slate-300 font-bold w-1/4 ml-2">
          <p>id: <span className="text-teal-500">string</span></p>
          <p>name: <span className="text-teal-500">string</span></p>
          <p>email: <span className="text-teal-500">string</span></p>
          <p>password: <span className="text-teal-500">string</span></p>
          <p>token: <span className="text-teal-500">string</span></p>
          <p>subscriptions: <span className="text-teal-500">Book[ ]</span></p>
        </div>

      </section> 

    </main>
  );
}
