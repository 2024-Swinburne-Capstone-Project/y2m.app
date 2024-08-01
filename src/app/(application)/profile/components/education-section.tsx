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
  institution: z.string().min(2, {
    message: profileConfig.educationForm.institution.errorMessage,
  }),
  degree: z.string().min(2, {
    message: profileConfig.educationForm.degree.errorMessage,
  }),
  fieldOfStudy: z.string().min(2, {
    message: profileConfig.educationForm.fieldOfStudy.errorMessage,
  }),
  onGoing: z.boolean(),
  grade: z.string(),
  startDate: z.string().min(2, {
    message: profileConfig.educationForm.startDate.errorMessage,
  }),
  endDate: z.string().min(2, {
    message: profileConfig.educationForm.endDate.errorMessage,
  }),
});

export default function EducationSection() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      institution: '',
      degree: '',
      fieldOfStudy: '',
      onGoing: false,
      startDate: '',
      endDate: '',
      grade: '',
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    //TODO - send data to API
    // try {
    //   const response = await fetch('/api/update-education', {
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
    console.log(data);
    toast({
      title: profileConfig.educationForm.successMessage.text,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="institution"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{profileConfig.educationForm.institution.label}</FormLabel>
              <span className="text-red-600"> *</span>
              <FormControl>
                <Input
                  placeholder={profileConfig.educationForm.institution.placeholder}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="degree"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{profileConfig.educationForm.degree.label}</FormLabel>
              <span className="text-red-600"> *</span>
              <FormControl>
                <Input placeholder={profileConfig.educationForm.degree.placeholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fieldOfStudy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{profileConfig.educationForm.fieldOfStudy.label}</FormLabel>
              <span className="text-red-600"> *</span>
              <FormControl>
                <Input
                  placeholder={profileConfig.educationForm.fieldOfStudy.placeholder}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="onGoing"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center space-x-2">
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                <FormLabel>{profileConfig.educationForm.onGoing.label}</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="grade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{profileConfig.educationForm.grade.label}</FormLabel>
              <FormControl>
                <Input placeholder={profileConfig.educationForm.grade.placeholder} {...field} />
              </FormControl>
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
                <FormLabel>{profileConfig.educationForm.startDate.label}</FormLabel>
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
                <FormLabel>{profileConfig.educationForm.endDate.label}</FormLabel>
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
          <Button type="submit">{profileConfig.educationForm.submitButton.text}</Button>
        </div>
      </form>
    </Form>
  );
}
