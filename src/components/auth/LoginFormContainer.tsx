import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
} from '@/components/ui/form';
import { LoginFormSchema } from '@/schemas/auth/loginSchema';
import { useUserStore } from '@/stores/user-store';
import { authService } from '@/services/auth-service';
import { LockClosedIcon } from '@heroicons/react/24/solid';
import { IswoIconSmall } from '@/icons';
import { TextInputField } from '../forms/TextInputField';
import Motionbutton from '../ui/Motionbutton';

const LoginFormContainer = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof LoginFormSchema>) {
    try {
      const response = await authService.login(values);
      if (response.status === 201) {
        toast.success('Ingreso Exitoso');
        setUser(response.user);
        if (!response.user.is_profile_completed) {
          switch (response.user.wizard_step) {
            case 'personal_info_step':
              navigate('/user/complete-profile/personal-info');
              return;
            case 'password_step':
              navigate('/user/complete-profile/password');
              return;
            case 'academy_selection':
              navigate('/select-academy');
              return;
            case 'documents_pending':
              navigate('/upload-documents');
              return;
          }
          return;
        } else {
          navigate('/choose-academy');
        }
      } else {
        console.log(response);
        console.error(response);
      }
    } catch (e: any) {
      console.error(e);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex w-full flex-col p-0'>
          {/* Email */}
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <TextInputField
                label='Email'
                icon={IswoIconSmall}
                placeholder='ejemplo@iswoacademy.com'
                field={field}
                type='text'
              />
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <TextInputField
                label='Contraseña'
                icon={LockClosedIcon}
                placeholder='*********'
                field={field}
                type='password'
              />
            )}
          />

          {/* Submit */}
          <Motionbutton type='submit' className='mb-3 mt-5'>
            Iniciar Sesión
          </Motionbutton>
        </form>
      </Form>
      <Link
        to={'/reset-password'}
        className='mt-4 w-full items-start hover:underline'>
        ¿Olvidaste tu contraseña? ¡Recupérala aquí!
      </Link>
      <Link
        to={'/register'}
        className='mt-4 w-full items-start hover:underline'>
        ¿Aún no tienes una cuenta? Registrate ahora!
      </Link>
    </>
  );
};

export default LoginFormContainer;
