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
import { Textarea } from '@/components/ui/textarea';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: profileConfig.profileForm.fullName.errorMessage,
  }),
  email: z
    .string()
    .email({
      message: profileConfig.profileForm.email.invalidErrorMessage,
    })
    .min(1, { message: profileConfig.profileForm.email.errorMessage }),
  aboutMe: z.string().min(2, {
    message: profileConfig.profileForm.aboutMe.errorMessage,
  }),
  linkedInProfileLink: z.string().url({
    message: profileConfig.profileForm.linkedInProfileLink.invalidErrorMessage,
  }),
  skills: z.array(z.string()).nonempty({
    message: profileConfig.profileForm.skills.errorMessage,
  }),
});

export default function ProfileSection() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      aboutMe: '',
      linkedInProfileLink: '',
      skills: selectedSkills,
    },
  });

  useEffect(() => {
    if (selectedSkills.length > 0) {
      form.setValue('skills', selectedSkills as [string, ...string[]]);
    }
  }, [selectedSkills, form]);

  const handleSkillChange = (skill: string, isChecked: boolean) => {
    setSelectedSkills((prevSkills) =>
      isChecked ? [...prevSkills, skill] : prevSkills.filter((s) => s !== skill)
    );
  };

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const response = await fetch('/api/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        alert('Failed to update profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile.');
    }
    toast({
      title: profileConfig.profileForm.successMessage.text,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{profileConfig.profileForm.fullName.label}</FormLabel>
              <span className="text-red-600"> *</span>
              <FormControl>
                <Input placeholder={profileConfig.profileForm.fullName.placeholder} {...field} />
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
              <FormLabel>{profileConfig.profileForm.email.label}</FormLabel>
              <span className="text-red-600"> *</span>
              <FormControl>
                <Input placeholder={profileConfig.profileForm.email.placeholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="aboutMe"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{profileConfig.profileForm.aboutMe.label}</FormLabel>
              <span className="text-red-600"> *</span>
              <FormControl>
                <Textarea placeholder={profileConfig.profileForm.aboutMe.placeholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="linkedInProfileLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{profileConfig.profileForm.linkedInProfileLink.label}</FormLabel>
              <span className="text-red-600"> *</span>
              <FormControl>
                <Input
                  placeholder={profileConfig.profileForm.linkedInProfileLink.placeholder}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="skills"
          render={(field) => (
            <FormItem>
              <FormLabel>{profileConfig.profileForm.skills.label}</FormLabel>
              <span className="text-red-600"> *</span>
              <div className="flex gap-2.5">
                <FormControl>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary">Select Skills</Button>
                    </DropdownMenuTrigger>
                    <Input disabled {...field.field} placeholder="Selected Skills..." />
                    <DropdownMenuContent className="w-56">
                      {profileConfig.profileForm.skills.list.map((skill) => (
                        <DropdownMenuCheckboxItem
                          key={skill}
                          checked={selectedSkills.includes(skill)}
                          onCheckedChange={(isChecked) => handleSkillChange(skill, isChecked)}
                        >
                          {skill}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit">{profileConfig.profileForm.submitButton.text}</Button>
        </div>
      </form>
    </Form>
  );
}
