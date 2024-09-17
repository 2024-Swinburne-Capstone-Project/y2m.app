import { NavItem } from '@/types';

export const marketingNavItems: NavItem[] = [
  {
    title: 'About',
    href: '/about',
    childMenuItems: [{ title: 'Media Centre', href: '/media-centre' }],
  },
  { title: 'Knowledge Hub', href: '/knowledge-hub' },
  { title: 'Enterprise Solutions', href: '/enterprise-solutions' },
  { title: 'Legal', href: '/legal' },
  { title: 'Get in Touch', href: '/get-in-touch' },
];

export const applicationNavItems: NavItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Development Hub', href: '/development-hub' },
  { title: 'Messages', href: '/messages' },
  { title: 'Mentors', href: '/mentors/search' },
];
