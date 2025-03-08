'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  nome: string;
  dt_nascimento: Date;
  cpf: string;
  email: string; 
  senha: string;
  confirmarSenha: string;
}

export default function Cadastro() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const formatDate = (date: string): string => {
    const parts = date.split('/');
    if (parts.length === 3) {
      // Formato esperado pelo backend: YYYY-MM-DD
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return date; // Caso a data já esteja no formato correto
  };

  const onSubmit = async (data: FormData) => {
    setMessage('');
    setErrorMessage('');

    // Formatar a data corretamente antes de enviar
    const formattedData = {
      ...data,
      dt_nascimento: formatDate(data.dt_nascimento as unknown as string), // Convertendo para string no formato correto
    };

    console.log('Dados enviados:', formattedData);

    try {
      const response = await fetch('http://localhost:3300/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedData),
      });

      console.log('Resposta do backend:', response);

      const result = await response.json();
      console.log('Resposta JSON:', result);

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao cadastrar. Verifique os dados.');
      }

      setMessage('Cadastro realizado com sucesso!');
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        router.push('/login');
      }, 2000);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Erro desconhecido.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/fundo5.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

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

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                {...register("senha", {
                  required: "Senha é obrigatória",
                  minLength: { value: 6, message: "A senha deve ter pelo menos 6 caracteres" },
                })}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="relative">
              <Input  type={showConfirmPassword ? "text" : "password"} placeholder="Confirme sua Senha" {...register('confirmarSenha', { required: 'Senha é obrigatória', minLength: { value: 6, message: 'A senha deve ter pelo menos 6 caracteres' } })} />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                onClick= { toggleConfirmPasswordVisibility }
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.confirmarSenha?.message && <p className="text-red-500 text-sm">{String(errors.confirmarSenha.message)}</p>}
            </div>

            <Button type="submit" className="w-full ">Cadastrar</Button>
            {/* <Button type="button" className="w-[48%] w-full" onClick={() => router.push('/login')}>Login</Button> */}
          </form>

        </CardContent>
      </Card>
      {showModal && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-6 rounded-xl shadow-lg w-1/3 text-center">
            <p className="text-lg font-semibold">Usuário cadastrado. Você está sendo redirecionado para a tela de Login.</p>
          </div>
        </div>
      )}
    </div>
  );
}