import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Motionbutton from '../ui/Motionbutton';
import TextInputField from '../forms/TextInputField';
import { Form, FormField } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { RegisterFormSchema } from '@/schemas/auth/registerSchema';
import { EnvelopeIcon, PencilIcon } from '@heroicons/react/24/solid';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AxiosErrorResponse, formatAxiosError } from '@/lib/utils';

export default function RegisterFormContainer() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      email: '',
      user_detail_attributes: {
        first_name: '',
        last_name: '',
      },
    },
  });

  const onSubmit = async (data: z.infer<typeof RegisterFormSchema>) => {
    try {
      await register({
        user: {
          email: data.email,
          user_detail_attributes: {
            first_name: data.user_detail_attributes.first_name,
            last_name: data.user_detail_attributes.last_name,
          },
        },
      });

      toast.success('Registro exitoso');
      navigate('/user/email-step');
    } catch (error) {
      const errorMessage = formatAxiosError(error as AxiosErrorResponse);
      toast.error(errorMessage);
    }
  };

  return (
    <div
      className='
          flex  min-h-[420px] w-full flex-col items-center justify-center  lg:min-h-[550px] lg:w-1/2 mt-10 lg:mt-0 px-6
        '>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          delay: 0.3,
          type: 'spring',
          stiffness: 260,
          damping: 20,
          duration: 2,
        }}
        className='w-full'>
        <div className=' border border-dark-blue dark:border-white rounded-lg w-full p-4 shadow-lg dark:shadow-white/50'>
          <h2 className='mt-3 text-center text-xl font-bold'>
            Vamos a crear tu cuenta
          </h2>
          <div className='mt-2 border-t border-slate-300 bg-slate-200' />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='flex w-full flex-col p-0'>
              {/* Nombres */}
              <FormField
                control={form.control}
                name='user_detail_attributes.first_name'
                render={({ field }) => (
                  <TextInputField
                    label='Nombre(s)'
                    icon={PencilIcon}
                    placeholder='Pon tu nombre aquí'
                    field={field}
                  />
                )}
              />

              {/* Apellidos */}
              <FormField
                control={form.control}
                name='user_detail_attributes.last_name'
                render={({ field }) => (
                  <TextInputField
                    label='Apellidos'
                    icon={PencilIcon}
                    placeholder='Pon aquí tus apellidos'
                    field={field}
                  />
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <TextInputField
                    label='Email'
                    icon={EnvelopeIcon}
                    placeholder='ejemplo@iswoacademy.com'
                    field={field}
                  />
                )}
              />
              <Motionbutton type='submit' className='my-3 w-full'>
                Registrarse
              </Motionbutton>
            </form>
          </Form>
          <Link
            to={'/login'}
            className=' my-3 w-full items-start hover:underline'>
            ¿Ya tienes cuenta? Inicia sesión ahora!
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
