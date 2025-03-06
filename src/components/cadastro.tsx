'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  nome: string;
  dt_nascimento: number;
  cpf: string;
  email: string;
  senha: string;
  confirmarSenha: string;
}

export default function Cadastro() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    setMessage('');
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:3300/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao cadastrar. Verifique os dados.');
      }

      setMessage('Cadastro realizado com sucesso!');
      setTimeout(() => router.push('/login'), 2000); // Redireciona após 2s
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Erro desconhecido.');
    }
  };


  return (
    <div 
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/fundo5.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Camada escura */}
      
      <Card className="relative w-full max-w-md p-6 bg-white shadow-md rounded-xl z-10">
        <CardContent>
          <h2 className="text-2xl font-bold text-center mb-4">Cadastro</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input type="text" placeholder="Nome" {...register('nome', { required: 'Nome é obrigatório' })} />
              {errors.nome?.message && <p className="text-red-500 text-sm">{String(errors.nome.message)}</p>}
            </div>

            <div>
              <Input type="text" placeholder="Data Nascimento" {...register('dt_nascimento', { required: 'Data nascimento obrigatório' })} />
              {errors.dt_nascimento?.message && <p className="text-red-500 text-sm">{String(errors.dt_nascimento.message)}</p>}
            </div>

            <div>
              <Input type="cpf" placeholder="Cpf" {...register('cpf', { required: 'Cpf Obrigatório' })} />
              {errors.cpf?.message && <p className="text-red-500 text-sm">{String(errors.cpf.message)}</p>}
            </div>

            <div>
              <Input type="email" placeholder="Email" {...register('email', { required: 'Email é obrigatório' })} />
              {errors.email?.message && <p className="text-red-500 text-sm">{String(errors.email.message)}</p>}
            </div>

            <div>
              <Input type="password" placeholder="Senha" {...register('senha', { required: 'Senha é obrigatória', minLength: { value: 6, message: 'A senha deve ter pelo menos 6 caracteres' } })} />
              {errors.senha?.message && <p className="text-red-500 text-sm">{String(errors.senha.message)}</p>}
            </div>

            <div>
              <Input type="confirmSenha" placeholder="Confirme sua senha" {...register('confirmarSenha', { required: 'Senha é obrigatória', minLength: { value: 6, message: 'A senha deve ter pelo menos 6 caracteres' } })} />
              {errors.confirmarSenha?.message && <p className="text-red-500 text-sm">{String(errors.confirmarSenha.message)}</p>}
            </div>

            <Button type="submit" className="w-full">Cadastrar</Button>
            <Button type="button" className="w-[48%] w-full" onClick={() => router.push('/login')}>Login</Button>
          </form>
          
        </CardContent>
      </Card>
    </div>
  );
}
