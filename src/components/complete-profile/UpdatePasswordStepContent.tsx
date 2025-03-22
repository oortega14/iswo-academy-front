import { useEffect, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TextInputField } from '@/components/forms/TextInputField';

import { useUserStore } from '@/stores/user-store';
import { useUIStore } from '@/stores/ui-store';
import { LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';
import { UploadIcon, UserCircleIcon } from 'lucide-react';
import { passwordStrength } from './PasswordStrength';

export const UpdatePasswordStepContent = ({
  setCurrentStep,
}: {
  setCurrentStep: (step: string) => void;
}) => {
  const [previewImage, setPreviewImage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const user = useUserStore((state) => state.user);
  const ApiURL = useUIStore((state) => state.ApiURL);

  const passwordStepSchema = z.object({
    user: z.object({
      password: z
        .string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres'),
      password_confirmation: z.string(),
      profile_picture: z.any().optional(),
      user_academies_attributes: z.array(
        z.object({
          id: z.number().optional(),
          role: z.string(),
          user_id: z.string(),
          academy_id: z.number().nullable(),
        })
      ),
    }),
  });

  const form = useForm<z.infer<typeof passwordStepSchema>>({
    resolver: zodResolver(passwordStepSchema),
    defaultValues: {
      user: {
        password: '',
        password_confirmation: '',
        user_academies_attributes: [
          {
            id: user?.user_academies?.[0]?.id,
            role: user?.user_academies?.[0]?.role,
            user_id: user?.id?.toString() || '',
            academy_id: user?.user_academies?.[0]?.academy_id
              ? Number(user?.user_academies?.[0]?.academy_id)
              : null,
          },
        ],
      },
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue('user.profile_picture', file);
    }
  };

  const handleSubmit = async (data: z.infer<typeof passwordStepSchema>) => {
    const formData = new FormData();

    formData.append('user[password]', data.user.password);
    formData.append(
      'user[password_confirmation]',
      data.user.password_confirmation
    );

    formData.append(
      'user[user_academies_attributes][0][role]',
      data.user.user_academies_attributes[0].role
    );
    formData.append(
      'user[user_academies_attributes][0][user_id]',
      data.user.user_academies_attributes[0].user_id
    );
    if (data.user.user_academies_attributes[0].id) {
      formData.append(
        'user[user_academies_attributes][0][id]',
        String(data.user.user_academies_attributes[0].id)
      );
    }
    if (data.user.user_academies_attributes[0].academy_id) {
      formData.append(
        'user[user_academies_attributes][0][academy_id]',
        String(data.user.user_academies_attributes[0].academy_id)
      );
    }

    if (data.user.profile_picture instanceof File) {
      formData.append('user[profile_picture]', data.user.profile_picture);
    }

    //await onStepSubmit(formData)
  };

  useEffect(() => {
    if (user?.user_academies?.[0]) {
      const userAcademy = user.user_academies[0];

      form.reset({
        user: {
          password: '',
          password_confirmation: '',
          profile_picture: undefined,
          user_academies_attributes: [
            {
              id: userAcademy.id,
              role: userAcademy.role,
              user_id: user.id?.toString() || '',
              academy_id: userAcademy.academy_id
                ? Number(userAcademy.academy_id)
                : null,
            },
          ],
        },
      });
    }
  }, [user, form]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='flex w-full flex-col space-y-4'
      >
        <Card>
          <CardHeader>
            <CardTitle>Configura tu contraseña</CardTitle>
            <CardDescription>
              Establece una contraseña segura para tu cuenta
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='space-y-2'>
              <div className='flex items-center space-x-2'>
                <UserIcon className='size-4 md:size-5 text-muted-foreground' />
                <label className='text-sm md:text-base font-medium leading-none'>
                  Foto de Perfil
                </label>
              </div>
              <div className='flex items-center gap-4'>
                <div className='relative size-24 md:size-32 lg:size-40 overflow-hidden rounded-full border-2'>
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt='Profile preview'
                      className='object-cover w-full h-full'
                    />
                  ) : (
                    <div className='flex size-full items-center justify-center bg-muted'>
                      <UserIcon className='size-12 md:size-16 lg:size-20 text-muted-foreground' />
                    </div>
                  )}
                </div>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => fileInputRef.current?.click()}
                  className='h-9 md:h-11 lg:h-12 px-4 md:px-6 text-sm md:text-base'
                >
                  <UploadIcon className='mr-2 size-4 md:size-5' />
                  Subir foto
                </Button>
                <input
                  type='file'
                  ref={fileInputRef}
                  className='hidden'
                  accept='image/*'
                  onChange={handleImageChange}
                />
              </div>
              <p className='text-xs md:text-sm text-muted-foreground'>
                Sube una foto de perfil (opcional)
              </p>
            </div>

            <div className='grid grid-cols-1 gap-4'>
              {/* Campo de nombre de usuario oculto para accesibilidad */}
              <input
                type='text'
                name='username'
                autoComplete='username'
                style={{ display: 'none' }}
                defaultValue={user?.email || ''}
              />

              <div className='space-y-2'>
                <FormField
                  control={form.control}
                  name='user.password'
                  render={({ field }) => (
                    <>
                      <TextInputField
                        label='Contraseña'
                        type='password'
                        placeholder='********'
                        field={field}
                        icon={LockClosedIcon}
                        watchError={false}
                        autocomplete='new-password'
                      />
                      {field.value && (
                        <div className='space-y-1'>
                          <div className='flex justify-between text-xs'>
                            <span>Fortaleza de la contraseña:</span>
                            <span
                              className={`font-medium ${passwordStrength(
                                field.value
                              ).color.replace('bg-', 'text-')}`}
                            >
                              {passwordStrength(field.value).label}
                            </span>
                          </div>
                          <div className='h-1.5 w-full bg-gray-200 rounded-full overflow-hidden'>
                            <div
                              className={`h-full ${
                                passwordStrength(field.value).color
                              } transition-all duration-300`}
                              style={{
                                width: `${
                                  (passwordStrength(field.value).score / 4) *
                                  100
                                }%`,
                              }}
                            />
                          </div>
                          <ul className='text-xs space-y-1 text-gray-500 mt-2'>
                            <li
                              className={
                                passwordStrength(field.value).validations.length
                                  ? 'text-green-500'
                                  : 'text-red-500'
                              }
                            >
                              • Mínimo 8 caracteres
                            </li>
                            <li
                              className={
                                passwordStrength(field.value).validations.number
                                  ? 'text-green-500'
                                  : 'text-red-500'
                              }
                            >
                              • Al menos un número
                            </li>
                            <li
                              className={
                                passwordStrength(field.value).validations.case
                                  ? 'text-green-500'
                                  : 'text-red-500'
                              }
                            >
                              • Mayúsculas y minúsculas
                            </li>
                            <li
                              className={
                                passwordStrength(field.value).validations
                                  .special
                                  ? 'text-green-500'
                                  : 'text-red-500'
                              }
                            >
                              • Al menos un carácter especial
                            </li>
                          </ul>
                        </div>
                      )}
                    </>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='user.password_confirmation'
                render={({ field }) => (
                  <TextInputField
                    label='Confirmar Contraseña'
                    type='password'
                    placeholder='********'
                    field={field}
                    icon={LockClosedIcon}
                    autocomplete='new-password'
                  />
                )}
              />

              <input
                type='hidden'
                value={user?.id?.toString() || ''}
                {...form.register('user.user_academies_attributes.0.user_id')}
              />

              <FormField
                control={form.control}
                name='user.user_academies_attributes.0.role'
                render={({ field }) => (
                  <FormItem>
                    <div className='mt-2 flex w-full items-center justify-start rounded-full'>
                      <UserCircleIcon className='mr-2 size-5' />
                      <label htmlFor='role'>Registrarse como:</label>
                    </div>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Escoje un rol' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='student'>Estudiante</SelectItem>
                        <SelectItem value='professor'>Profesor</SelectItem>
                        <SelectItem value='admin'>Administrador</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};

export default UpdatePasswordStepContent;
