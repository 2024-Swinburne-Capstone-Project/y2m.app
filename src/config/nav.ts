interface NavItem {
  title: string
  href?: string
}

interface NavConfig {
  mainNav: NavItem[]
}

export const navConfig: NavConfig = {
  mainNav: [
    {
      title: "Lorem",
      href: "/Lorem",
    },
    {
      title: "Ipsum",
      href: "/Ipsum",
    },
  ],
}