interface NavItem {
  title: string;
  href?: string;
}

interface NavConfig {
  mainNav: NavItem[];
}

export const navConfig: NavConfig = {
  mainNav: [
    { title: 'Home', href: '/' },
    { title: 'About', href: '/about' },
    { title: 'Knowledge Hub', href: '/knowledge-hub' },
    { title: 'Enterprise Solutions', href: '/enterprise-solutions' },
    { title: 'Legal', href: '/legal' },
    { title: 'Get in Touch', href: '/get-in-touch' },
  ],
};
