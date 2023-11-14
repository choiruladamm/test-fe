import { loginDto } from '@/dto/loginDto';
import { FC, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = ({}) => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginDto>>({
    resolver: zodResolver(loginDto),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmitForm = async (values: z.infer<typeof loginDto>) => {
    const baseURL = import.meta.env.VITE_BASE_URL;
    // const bearerToken = import.meta.env.VITE_BEARER_TOKEN;

    const response = await fetch(`${baseURL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer `,
      },
      body: JSON.stringify({
        username: values.username,
        password: values.password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.data.token);
      window.location.href = '/';
      // navigate('/');
      toast({
        duration: 2000,
        title: 'Loggin succes',
      });
    } else {
      toast({
        duration: 2000,
        variant: 'destructive',
        title: 'Loggin failed',
      });
    }
  };

  return (
    <div className='mx-4 grid min-h-screen place-items-center md:mx-0'>
      <Card className='w-full sm:w-[24rem]'>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            {`Don't have an account?`}
            <Link to='/register' className='pl-2 font-medium text-blue-600'>
              Register.
            </Link>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitForm)}>
              <div className='space-y-2'>
                <FormField
                  name='username'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter your username' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name='password'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder='Enter your password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type='submit' className='mt-7 w-full'>
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
