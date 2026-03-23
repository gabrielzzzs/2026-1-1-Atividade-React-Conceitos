"use client";

import { useEffect, useState } from "react";
import { getProdutosTodos } from "@/services/api";

export default function Home() {
  const [produtos, atualizarProdutos] = useState([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    getProdutosTodos().then((resultado) => {
      atualizarProdutos(resultado.data.products);
    });
  }, []);

  // Filtra a lista baseada no que o usuário digita no input
  const produtosFiltrados = produtos.filter((p) =>
    p.title.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white">
      <header className="flex flex-col items-center p-8 border-b">
        <h1 className="text-xl font-bold mb-4">Pesquisa de produtos</h1>
        <input
          type="text"
          placeholder="Digite o título..."
          className="p-2 border rounded w-full max-w-md dark:bg-zinc-800"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </header>

      <main className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {produtosFiltrados.map((p) => (
          <div key={p.id} className="border p-4 rounded shadow-sm bg-white dark:bg-zinc-900">
            <img src={p.images[0]} alt={p.title} className="w-full h-48 object-contain mb-2" />
            <h2 className="font-bold">{p.title}</h2>
            <p className="text-sm text-zinc-500">{p.description}</p>
            <div className="mt-2 flex justify-between items-center">
              <span className="font-bold text-green-600">${p.price}</span>
              <span className="text-yellow-500">⭐ {p.rating}</span>
            </div>
            <div className="flex gap-1 mt-2 flex-wrap">
              {p.tags.map((tag) => (
                <span key={tag} className="bg-zinc-200 dark:bg-zinc-700 px-2 py-1 text-xs rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}