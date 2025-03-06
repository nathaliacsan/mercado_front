'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  email: string;
  senha: string;
}

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const onSubmit = (data: FormData) => {
    console.log('Login realizado:', data);  
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center p-4" style={{ backgroundImage: "url('/fundo5.jpg')" }}>

      <Card className="relative w-full max-w-lg p-8 bg-white shadow-md rounded-xl z-10">
        <CardContent className="space-y-6">
          <h2 className="text-3xl font-bold text-center">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Input type="email" placeholder="Email" {...register('email', { required: 'Email é obrigatório' })} />
              {errors.email?.message && <p className="text-red-500 text-sm">{String(errors.email.message)}</p>}
            </div>

            <div>
              <Input type="password" placeholder="Senha" {...register('senha', { required: 'Senha é obrigatória' })} />
              {errors.senha?.message && <p className="text-red-500 text-sm">{String(errors.senha.message)}</p>}
            </div>

            <Button type="submit" className="w-full">Entrar</Button>
          </form>
          {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
          <div className="flex justify-between mt-6">
            <Button type="button" className="w-[48%] w-full" onClick={() => router.push('/cadastro')}>Cadastro</Button>
            
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
