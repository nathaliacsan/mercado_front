'use client';
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

type Produto = {
  id: number;
  nome: string;
  valor: number;
};

export default function ProdutoCrud() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [novoNome, setNovoNome] = useState("");
  const [novoValor, setNovoValor] = useState("");
  const API_URL = "http://localhost:3300/produto";

  const buscarProdutos = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProdutos(data);
    } catch (error) {
      console.error("Erro ao buscar produtos", error);
    }
  };

  const adicionarProduto = async () => {
    if (!novoNome.trim() || !novoValor) return;

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: novoNome,
          valor: parseFloat(novoValor),
        }),
      });
      setNovoNome("");
      setNovoValor("");
      buscarProdutos();
    } catch (error) {
      console.error("Erro ao adicionar produto", error);
    }
  };

  const deletarProduto = async (id: number) => {
    try {
      await fetch(`${API_URL}/${id}`, 
        { method: "DELETE" });
      buscarProdutos();
    } catch (error) {
      console.error("Erro ao deletar produto", error);
    }
  };

  useEffect(() => {
    buscarProdutos();
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center p-8 bg-cover bg-center" style={{ backgroundImage: "url('/fundo5.jpg')" }}>
      <Card className="w-full max-w-xl p-6 bg-white rounded shadow">
        <h1 className="text-xl font-bold mb-4">Cadastro de Produtos</h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Insira o nome do produto"
            value={novoNome}
            onChange={(e) => setNovoNome(e.target.value)}
            className="border rounded px-2 py-1 w-full"
          />
          <input
            type="number"
            placeholder="Valor"
            value={novoValor}
            onChange={(e) => setNovoValor(e.target.value)}
            className="border rounded px-2 py-1 w-40"
          />
          <button
            onClick={adicionarProduto}
            className="bg-blue-600 text-white px-4 py-1 rounded"
          >
            Adicionar
          </button>
        </div>

        <div className="grid gap-3">
          {produtos.map((p) => (
            <div key={p.id} className="border p-3 rounded flex justify-between items-center">
              <div>
                <span className="block font-medium">{p.nome}</span>
                <span className="text-gray-500 text-sm">R$ {p.valor.toFixed(2)}</span>
              </div>
              <button
                onClick={() => deletarProduto(p.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Excluir
              </button>
            </div>
          ))}
        </div>

      </Card>
    </div>
  );
}
