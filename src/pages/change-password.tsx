import { changePasswordDto } from '@/dto/changePasswordDto';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

interface ChangePasswordPageProps {}

const ChangePasswordPage: FC<ChangePasswordPageProps> = ({}) => {
  const form = useForm<z.infer<typeof changePasswordDto>>({
    resolver: zodResolver(changePasswordDto),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const onSubmitForm = async (values: z.infer<typeof changePasswordDto>) => {
    console.log(values);
    const baseURL = import.meta.env.VITE_BASE_URL;

    const response = await fetch(`${baseURL}/user/change-password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token') as string}`,
      },
      body: JSON.stringify({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        confirmNewPassword: values.newPassword,
      }),
    });

    if (response.ok) {
      const data = await response.json()
      form.reset()
      toast({
        duration: 2000,
        title: 'Succesfully change password',
      });
    }
  };

  return (
    <div className='mx-auto mt-4 space-y-3'>
      <h3>Change Password User</h3>
      <div className='w-[20rem] md:w-[24rem]'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitForm)}
          >
            <div className='space-y-1'>
              <FormField
                name='oldPassword'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Old Password</FormLabel>
                    <FormControl>
                      <Input type='password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='newPassword'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type='password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='confirmNewPassword'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input type='password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type='submit' className='mt-7 w-full'>
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
