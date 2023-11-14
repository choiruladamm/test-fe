import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { updateUserDto } from '@/dto/updateUserDto';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';

interface UserPageProps {}

const UserPage: FC<UserPageProps> = ({}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [photo, setPhoto] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const form = useForm<z.infer<typeof updateUserDto>>({
    resolver: zodResolver(updateUserDto),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      photo: '',
    },
  });

  useEffect(() => {
    const baseURL = 'https://devfortest.my.id'
    fetch(`${baseURL}/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token') as string}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // console.log(data.data);
          form.setValue('name', data.data.name);
          form.setValue('username', data.data.username);
          form.setValue('email', data.data.email);
          // form.setValue('photo', data.data.photo);
          setPhoto(data.data.photo);
        } else {
          console.log('error');
        }
      });
  }, []);

  const onSubmitForm = async (values: z.infer<typeof updateUserDto>) => {
    console.log(values);
    const response = await fetch(`https://devfortest.my.id/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token') as string}`,
      },
      body: JSON.stringify({
        name: values.name,
        username: values.username,
        email: values.email,
        photo: photo,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.data);
      toast({
        duration: 2000,
        title: 'Succesfully update user',
      });
      setIsEditing(false)
    }
  };

  return (
    <div className='mx-auto mt-4 space-y-3'>
      <h3>Detail User</h3>
      <div className='w-full md:w-[24rem]'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitForm)}>
            <div className='space-y-1'>
              <FormField
                name='name'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
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
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
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
                    <FormLabel>Photo Profile</FormLabel>
                    <FormControl
                      onChange={async (e) => {
                        const inputElement = e.target as HTMLInputElement;
                        if (
                          inputElement.files &&
                          inputElement.files.length > 0
                        ) {
                          const encodedImage = await encodeContent(
                            inputElement.files[0],
                          );
                          if (encodedImage) {
                            setPreviewImage(encodedImage as string);
                          }
                        }
                      }}
                    >
                      <Input type='file' {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <img
                className='h-32 rounded-xl'
                src={previewImage ? previewImage : photo}
              />
            </div>
            <div className='flex gap-2'>
              <Button
                type='button'
                variant={!isEditing ? 'secondary' : 'destructive'}
                className='mt-7 w-full'
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
              <Button type='submit' className='mt-7 w-full' disabled={!isEditing}>
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UserPage;


export async function encodeContent(content: Blob): Promise<string | null> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string) || null);
    reader.readAsDataURL(content);
  });
}
