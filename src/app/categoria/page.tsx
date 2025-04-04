'use client';
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

type Categoria = {
    id: number;
    nome: string;
};

export default function CategoriaCrud() {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [novaCategoria, setNovaCategoria] = useState("");
    const [editandoId, setEditandoId] = useState<number | null>(null);
    const [editandoNome, setEditandoNome] = useState("");

    const API_URL = "http://localhost:3300/categoria"; // ajuste conforme seu backend

    useEffect(() => {
        buscarCategorias();
    }, []);

    const buscarCategorias = async () => {
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            setCategorias(data);
        } catch (error) {
            console.error("Erro ao buscar categorias", error);
        }
    };

    const adicionarCategoria = async () => {
        if (!novaCategoria.trim()) return;

        try {
            await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome: novaCategoria }),
            });
            setNovaCategoria("");
            buscarCategorias();
        } catch (error) {
            console.error("Erro ao adicionar categoria", error);
        }
    };

    const deletarCategoria = async (id: number) => {
        try {
            await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            buscarCategorias();
        } catch (error) {
            console.error("Erro ao deletar categoria", error);
        }
    };

    const salvarEdicao = async (id: number) => {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome: editandoNome }),
            });
            setEditandoId(null);
            buscarCategorias();
        } catch (error) {
            console.error("Erro ao editar categoria", error);
        }
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center  bg-cover bg-center" style={{ backgroundImage: "url('/fundo5.jpg')" }}>
            <Card className="relative w-full max-w-lg p-10 mt-8 bg-white shadow-md rounded-xl z-10">
                <div className="flex flex-col gap-4 max-w-2xl justify-center  mx-auto " >
            <h1 className="text-2xl font-bold mb-4">Categorias</h1>

            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    className="border p-2 rounded w-full"
                    placeholder="Cadastre uma nova categoria"
                    value={novaCategoria}
                    onChange={(e) => setNovaCategoria(e.target.value)}
                />
                <button
                    onClick={adicionarCategoria}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Adicionar
                </button>
            </div>

            <div className="grid gap-4">
                {categorias.map((cat) => (
                    <div
                        key={cat.id}
                        className="border p-4 rounded flex justify-between items-center"
                    >
                        {editandoId === cat.id ? (
                            <input
                                type="text"
                                value={editandoNome}
                                onChange={(e) => setEditandoNome(e.target.value)}
                                className="border p-1 rounded w-full mr-2"
                            />
                        ) : (
                            <span>{cat.nome}</span>
                        )}

                        <div className="flex gap-2">
                            {editandoId === cat.id ? (
                                <button
                                    onClick={() => salvarEdicao(cat.id)}
                                    className="text-green-600"
                                >
                                    Salvar
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        setEditandoId(cat.id);
                                        setEditandoNome(cat.nome);
                                    }}
                                    className="text-yellow-600"
                                >
                                    Editar
                                </button>
                            )}
                            <button
                                onClick={() => deletarCategoria(cat.id)}
                                className="text-red-600"
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
            </Card>
        </div>
    );
}
