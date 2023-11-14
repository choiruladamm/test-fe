import { FC, useState } from 'react';
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
import { registerDto } from '@/dto/registerDto';
import { toast } from '@/components/ui/use-toast';

interface RegisterPageProps {}

const RegisterPage: FC<RegisterPageProps> = ({}) => {
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof registerDto>>({
    resolver: zodResolver(registerDto),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      photo: '',
    },
  });

  const onSubmitForm = async (values: z.infer<typeof registerDto>) => {
    console.log(values);
    const baseURL = import.meta.env.VITE_BASE_URL;

    const response = await fetch(`${baseURL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer `,
      },
      body: JSON.stringify({
        name: values.name,
        username: values.username,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
        photo: values.photo
      }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.data.token);
      // window.location.href = '/';
      navigate('/login');
      toast({
        duration: 2000,
        title: 'Register succes',
      });
    } else {
      toast({
        duration: 2000,
        variant: 'destructive',
        title: 'Register failed',
      });
    }
  };

  

  return (
    <div className='mx-4 grid min-h-screen place-items-center md:mx-0'>
      <Card className='w-full md:w-[24rem]'>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            {`Already have an account?`}
            <Link to='/login' className='pl-2 font-medium text-blue-600'>
              Login.
            </Link>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitForm)}>
              <div className='space-y-5'>
                <FormField
                  name='name'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder='Enter your name' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name='username'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder='Enter your username' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name='email'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder='levi@test.com' {...field} />
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
                <FormField
                  name='confirmPassword'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder='Re-Enter your password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name='photo'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type='file'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt='Preview'
                    style={{ maxWidth: '100px' }}
                  />
                )}
              </div>
              <Button type='submit' className='mt-7 w-full'>
                Register
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
