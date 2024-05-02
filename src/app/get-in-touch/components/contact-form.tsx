import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { getInTouchConfig } from '@/config/get-in-touch';

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: getInTouchConfig.form.firstName.errorMessage,
  }),
  lastName: z.string().min(2, {
    message: getInTouchConfig.form.lastName.errorMessage,
  }),
  email: z.string().email({
    message: getInTouchConfig.form.email.errorMessage,
  }),
  feedback: z.boolean(),
  question: z.boolean(),
  message: z.string().min(10, {
    message: getInTouchConfig.form.message.errorMessage,
  }),
});

const ContactForm: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      feedback: false,
      question: false,
      message: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const { form: formConfig } = getInTouchConfig;

  return (
    <Card className="mx-5 mb-16 md:m-auto md:mt-16 md:w-2/3">
      <CardHeader>
        <CardTitle>{getInTouchConfig.heroSection.title.text}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formConfig.firstName.label}</FormLabel>
                  <FormControl>
                    <Input placeholder={formConfig.firstName.placeholder} {...field} />
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
                  <FormLabel>{formConfig.lastName.label}</FormLabel>
                  <FormControl>
                    <Input placeholder={formConfig.lastName.placeholder} {...field} />
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
                  <FormLabel>{formConfig.email.label}</FormLabel>
                  <FormControl>
                    <Input placeholder={formConfig.email.placeholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex space-x-4">
              <FormField
                control={form.control}
                name="feedback"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-3">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="mb-0">{formConfig.feedback.label}</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-3">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="mb-0">{formConfig.question.label}</FormLabel>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formConfig.message.label}</FormLabel>
                  <FormControl>
                    <Textarea placeholder={formConfig.message.placeholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">{formConfig.submitButton.text}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
