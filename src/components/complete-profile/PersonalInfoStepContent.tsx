import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TextInputField } from '../forms/TextInputField';
import {
  BuildingOfficeIcon,
  CalendarIcon,
  EnvelopeIcon,
  IdentificationIcon,
  MapIcon,
  PhoneIcon,
  PlusIcon,
  UserIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { GenderIcon } from '@/icons/GenderIcon';
import Motionbutton from '../ui/Motionbutton';
import { personalInfoSchema } from '@/schemas/wizard/personalInfoSchema';
import { useNavigate } from 'react-router-dom';
import { completeProfileService } from '@/services/complete-profile-service';
import { useUserStore } from '@/stores/user-store';
import { AxiosErrorResponse, formatAxiosError } from '@/lib/utils';
export const PersonalInfoStepContent = ({
  setCurrentStep,
}: {
  setCurrentStep: (step: string) => void
}) => {
  const user = useUserStore((state: any) => state.user);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      user: {
        email: '',
        wizard_step: 'password_step',
        user_detail_attributes: {
          first_name: '',
          last_name: '',
          birth_date: '',
          phone: '',
          dni: '',
          gender: '',
          username: '',
          address_attributes: {
            address: '',
            city: '',
            province: '',
            country: '',
            postal_code: '',
          },
          social_networks_attributes: [],
        },
      },
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await completeProfileService.updatePersonalInfo(
        user?.id?.toString() || '',
        data
      );
      setCurrentStep('update_password_step');
      navigate('/user/complete-profile/update-password');
    } catch (error) {
      formatAxiosError(error as AxiosErrorResponse);
    }
  };

  useEffect(() => {
    if (user) {
      form.reset({
        user: {
          email: user.email || '',
          wizard_step: 'password_step',
          user_detail_attributes: {
            first_name: user.user_detail?.first_name || '',
            last_name: user.user_detail?.last_name || '',
            birth_date: user.user_detail?.birth_date || '',
            phone: user.user_detail?.phone || '',
            dni: user.user_detail?.dni || '',
            gender: user.user_detail?.gender || 0,
            username: user.user_detail?.username || '',
            address_attributes: {
              address: user.user_detail?.address?.address || '',
              city: user.user_detail?.address?.city || '',
              province: user.user_detail?.address?.province || '',
              country: user.user_detail?.address?.country || '',
              postal_code: user.user_detail?.address?.postal_code || '',
            },
            social_networks_attributes: user.user_detail?.social_networks || [],
          },
        },
      });
    }
  }, [user, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex w-full flex-col space-y-4'
      >
        <Card>
          <CardHeader>
            <CardTitle className='text-2xl'>Información Personal</CardTitle>
            <CardDescription>
              Por favor, completa tus datos personales
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            {/* Datos básicos */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='user.email'
                render={({ field }) => (
                  <TextInputField
                    label='Email'
                    icon={EnvelopeIcon}
                    field={field}
                    placeholder='example@iswo.com.co'
                  />
                )}
              />

              <FormField
                control={form.control}
                name='user.user_detail_attributes.username'
                render={({ field }) => (
                  <TextInputField
                    label='Nombre de usuario'
                    icon={UserIcon}
                    placeholder='username'
                    field={field}
                  />
                )}
              />
            </div>

            {/* Información personal */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='user.user_detail_attributes.first_name'
                render={({ field }) => (
                  <TextInputField
                    label='Nombre'
                    icon={UserIcon}
                    placeholder='Tu nombre'
                    field={field}
                  />
                )}
              />

              <FormField
                control={form.control}
                name='user.user_detail_attributes.last_name'
                render={({ field }) => (
                  <TextInputField
                    label='Apellidos'
                    icon={UserIcon}
                    placeholder='Tus apellidos'
                    field={field}
                  />
                )}
              />
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
              <FormField
                control={form.control}
                name='user.user_detail_attributes.birth_date'
                render={({ field }) => (
                  <TextInputField
                    label='Fecha de nacimiento'
                    type='date'
                    icon={CalendarIcon}
                    field={field}
                  />
                )}
              />

              <FormField
                control={form.control}
                name='user.user_detail_attributes.phone'
                render={({ field }) => (
                  <TextInputField
                    label='Teléfono'
                    icon={PhoneIcon}
                    placeholder='+57 3152436636'
                    field={field}
                  />
                )}
              />

              <FormField
                control={form.control}
                name='user.user_detail_attributes.dni'
                render={({ field }) => (
                  <TextInputField
                    label='DNI'
                    icon={IdentificationIcon}
                    placeholder='12345678A'
                    field={field}
                  />
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='user.user_detail_attributes.gender'
              render={({ field }) => (
                <FormItem>
                  <div className='flex items-center gap-1'>
                    <GenderIcon className='size-5' />
                    <FormLabel>Género</FormLabel>
                  </div>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Selecciona tu género' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='male'>Masculino</SelectItem>
                      <SelectItem value='female'>Femenino</SelectItem>
                      <SelectItem value='other'>Otro</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Dirección */}
            <Card>
              <CardHeader>
                <CardTitle className='text-lg'>Dirección</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <FormField
                  control={form.control}
                  name='user.user_detail_attributes.address_attributes.address'
                  render={({ field }) => (
                    <TextInputField
                      label='Domicilio'
                      icon={MapIcon}
                      placeholder='Tu dirección'
                      field={field}
                    />
                  )}
                />

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name='user.user_detail_attributes.address_attributes.country'
                    render={({ field }) => (
                      <TextInputField
                        label='País'
                        icon={BuildingOfficeIcon}
                        placeholder='Tu país'
                        field={field}
                      />
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='user.user_detail_attributes.address_attributes.province'
                    render={({ field }) => (
                      <TextInputField
                        label='Provincia'
                        icon={BuildingOfficeIcon}
                        placeholder='Tu provincia'
                        field={field}
                      />
                    )}
                  />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name='user.user_detail_attributes.address_attributes.city'
                    render={({ field }) => (
                      <TextInputField
                        label='Ciudad'
                        icon={BuildingOfficeIcon}
                        placeholder='Tu ciudad'
                        field={field}
                      />
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='user.user_detail_attributes.address_attributes.postal_code'
                    render={({ field }) => (
                      <TextInputField
                        label='Código Postal'
                        icon={BuildingOfficeIcon}
                        placeholder='12345'
                        field={field}
                      />
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Redes Sociales */}
            <Card>
              <CardHeader>
                <CardTitle className='text-lg'>Redes Sociales</CardTitle>
                <CardDescription>Agrega tus redes sociales</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                {form
                  .watch(
                    'user.user_detail_attributes.social_networks_attributes'
                  )
                  ?.map((_, index) => (
                    <div
                      key={index}
                      className='flex flex-col sm:flex-row items-start sm:items-end gap-4'
                    >
                      <div className='w-full sm:flex-1'>
                        <FormField
                          control={form.control}
                          name={`user.user_detail_attributes.social_networks_attributes.${index}.platform`}
                          render={({ field }) => (
                            <TextInputField
                              label='Plataforma'
                              icon={BuildingOfficeIcon}
                              placeholder='Twitter, Instagram, etc.'
                              field={field}
                            />
                          )}
                        />
                      </div>
                      <div className='w-full sm:flex-[2]'>
                        <FormField
                          control={form.control}
                          name={`user.user_detail_attributes.social_networks_attributes.${index}.url`}
                          render={({ field }) => (
                            <TextInputField
                              label='URL'
                              icon={BuildingOfficeIcon}
                              placeholder='https://...'
                              field={field}
                            />
                          )}
                        />
                      </div>
                      <Motionbutton
                        type='button'
                        variant='destructive'
                        className='mt-2 sm:mt-0 sm:mb-6 h-10 w-10 flex items-center justify-center shrink-0'
                        onClick={() => {
                          const currentNetworks = form.getValues(
                            'user.user_detail_attributes.social_networks_attributes'
                          );
                          form.setValue(
                            'user.user_detail_attributes.social_networks_attributes',
                            currentNetworks.filter((_, i) => i !== index)
                          );
                        }}
                      >
                        <XMarkIcon className='h-4 w-4' />
                      </Motionbutton>
                    </div>
                  ))}

                <Motionbutton
                  type='button'
                  variant='outline'
                  className='w-full'
                  onClick={() => {
                    const currentNetworks =
                      form.getValues(
                        'user.user_detail_attributes.social_networks_attributes'
                      ) || [];
                    form.setValue(
                      'user.user_detail_attributes.social_networks_attributes',
                      [...currentNetworks, { platform: '', url: '' }]
                    );
                  }}
                >
                  <PlusIcon className='mr-2 size-4' />
                  Agregar Red Social
                </Motionbutton>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
        {/* Navigation Buttons */}
        <Motionbutton type='submit'>Siguiente</Motionbutton>
      </form>
    </Form>
  );
};

export default PersonalInfoStepContent;
