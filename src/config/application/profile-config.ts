import { ProfileConfig } from '@/types';

export const profileConfig: ProfileConfig = {
  profileForm: {
    header: {
      text: 'Profile',
    },
    fullName: {
      label: 'Full Name',
      placeholder: 'Full Name',
      errorMessage: 'Full name must be at least 2 characters.',
    },
    email: {
      label: 'Email',
      placeholder: 'Email',
      invalidErrorMessage: 'Please enter a valid email address.',
      errorMessage: 'Email is required.',
      tooltip:
        'You cannot change your email address here. Please contact support if you need to update it.',
    },
    aboutMe: {
      label: 'About Me',
      placeholder: 'Write a short paragraph for others to learn about you!',
      errorMessage: 'Please provide a short description about yourself.',
    },
    linkedInProfileLink: {
      label: 'LinkedIn Profile Link',
      placeholder: 'linkedin.com/in/sarahjane',
      invalidErrorMessage: 'Please enter a valid LinkedIn profile link.',
      errorMessage: '',
    },
    skills: {
      label: 'Skills',
      list: ['Skill 1', 'Skill 2', 'Skill 3'],
      errorMessage: 'Please select at least one skill',
    },
    isMentor: {
      label: 'I want to be a mentor',
    },
    isMentee: {
      label: 'I want to be a mentee',
    },
    mentorAreas: {
      label: 'Areas of Expertise',
      placeholder: 'Add area of expertise',
      addButtonText: 'Add Area',
    },
    menteeInterests: {
      label: 'Areas of Interest',
      placeholder: 'Add area of interest',
      addButtonText: 'Add Interest',
    },
    availability: {
      label: 'Availability',
      placeholder: 'e.g., Available weekday evenings, 2 hours per week',
    },
    submitButton: {
      text: 'Save',
    },
    successMessage: {
      text: 'Profile updated successfully!',
    },
  },
  educationForm: {
    header: {
      text: 'Education',
    },
    institution: {
      label: 'Institution',
      placeholder: 'Enter your Institution',
      errorMessage: 'Institution is required.',
    },
    degree: {
      label: 'Degree/Certificate',
      placeholder: 'Enter your Degree/Certificate',
      errorMessage: 'Degree/Certificate is required.',
    },
    fieldOfStudy: {
      label: 'Field of Study',
      placeholder: 'Enter your Field of Study',
      errorMessage: 'Field of Study is required.',
    },
    onGoing: {
      label: 'Ongoing',
    },
    startDate: {
      label: 'Start Date',
      errorMessage: 'Start Date is required.',
    },
    endDate: {
      label: 'End Date',
      errorMessage: 'End Date is required.',
    },
    grade: {
      label: 'Grade',
      placeholder: 'Enter your Grade',
    },
    submitButton: {
      text: 'Add',
    },
    successMessage: {
      text: 'Education updated successfully!',
    },
  },
  educationTable: {
    caption: 'My Education',
    headers: [
      'Institution',
      'Degree',
      'Field of Study',
      'Ongoing',
      'Grade',
      'Start Date',
      'End Date',
    ],
  },
  experienceForm: {
    header: {
      text: 'Experience',
    },
    position: {
      label: 'Position',
      placeholder: 'Enter your Position',
      errorMessage: 'Position is required.',
    },
    company: {
      label: 'Company',
      placeholder: 'Enter your Company',
      errorMessage: 'Company is required.',
    },
    location: {
      label: 'Location',
      placeholder: 'Enter company Location',
      errorMessage: 'Location is required.',
    },
    current: {
      label: 'I am currently working in this role',
    },
    startDate: {
      label: 'Start Date',
      errorMessage: 'Start Date is required.',
    },
    endDate: {
      label: 'End Date',
      errorMessage: 'End Date is required.',
    },
    submitButton: {
      text: 'Add',
    },
    successMessage: {
      text: 'Experience updated successfully!',
    },
  },
  experienceTable: {
    caption: 'My Experience',
    headers: ['Position', 'Company', 'Location', 'Current', 'Start Date', 'End Date'],
  },
};
