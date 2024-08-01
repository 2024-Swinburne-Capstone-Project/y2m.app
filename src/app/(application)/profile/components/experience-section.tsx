'use client';
import { z } from 'zod';
import { profileConfig } from '@/config/application/profile-config';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/components/ui/use-toast';
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
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
  position: z.string().min(2, {
    message: profileConfig.experienceForm.position.errorMessage,
  }),
  company: z.string().min(2, {
    message: profileConfig.experienceForm.company.errorMessage,
  }),
  location: z.string().min(2, {
    message: profileConfig.experienceForm.location.errorMessage,
  }),
  current: z.boolean(),
  startDate: z.string().min(2, {
    message: profileConfig.experienceForm.startDate.errorMessage,
  }),
  endDate: z.string().min(2, {
    message: profileConfig.experienceForm.endDate.errorMessage,
  }),
});

export default function ExperienceSection() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      position: '',
      company: '',
      location: '',
      current: false,
      startDate: '',
      endDate: '',
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    //TODO - send data to API
    // try {
    //   const response = await fetch('/api/update-experience', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data),
    //   });

    //   if (!response.ok) {
    //     alert('Failed to update profile.');
    //   }
    // } catch (error) {
    //   console.error('Error updating profile:', error);
    //   alert('Error updating profile.');
    // }
    toast({
      title: profileConfig.experienceForm.successMessage.text,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{profileConfig.experienceForm.position.label}</FormLabel>
              <span className="text-red-600"> *</span>
              <FormControl>
                <Input placeholder={profileConfig.experienceForm.position.placeholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{profileConfig.experienceForm.company.label}</FormLabel>
              <span className="text-red-600"> *</span>
              <FormControl>
                <Input placeholder={profileConfig.experienceForm.company.placeholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{profileConfig.experienceForm.location.label}</FormLabel>
              <span className="text-red-600"> *</span>
              <FormControl>
                <Input placeholder={profileConfig.experienceForm.location.placeholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="current"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center space-x-2">
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                <FormLabel>{profileConfig.experienceForm.current.label}</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2.5">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{profileConfig.experienceForm.startDate.label}</FormLabel>
                <span className="text-red-600"> *</span>
                <div>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{profileConfig.experienceForm.endDate.label}</FormLabel>
                <span className="text-red-600"> *</span>
                <div>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit">{profileConfig.experienceForm.submitButton.text}</Button>
        </div>
      </form>
    </Form>
  );
}
