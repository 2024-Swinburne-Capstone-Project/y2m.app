// components/get-in-touch.tsx
'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
import { Textarea } from '../../../components/ui/textarea';
import { Checkbox } from '../../../components/ui/checkbox';
import { enterpriseSolutionsConfig } from '@/config/enterprise-solutions';

const FormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email({ message: 'Invalid email address' }),
  message: z.string(),
  demo: z.boolean(),
});

export default function GetInTouch() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      message: '',
      demo: false,
    },
  });

  function onSubmit() {
    toast({
      title: enterpriseSolutionsConfig.form.toast.title,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{enterpriseSolutionsConfig.form.firstName.label}</FormLabel>
              <FormControl>
                <Input
                  placeholder={enterpriseSolutionsConfig.form.firstName.placeholder}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{enterpriseSolutionsConfig.form.lastName.label}</FormLabel>
              <FormControl>
                <Input
                  placeholder={enterpriseSolutionsConfig.form.lastName.placeholder}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{enterpriseSolutionsConfig.form.email.label}</FormLabel>
              <FormControl>
                <Input placeholder={enterpriseSolutionsConfig.form.email.placeholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="demo"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center space-x-2">
                <Checkbox {...field} value={field.value ? 'true' : 'false'} />
                <FormLabel>{enterpriseSolutionsConfig.form.demo.label}</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{enterpriseSolutionsConfig.form.message.label}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={enterpriseSolutionsConfig.form.message.placeholder}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{enterpriseSolutionsConfig.form.submitButton.text}</Button>
      </form>
    </Form>
  );
}
