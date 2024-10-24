import { NavLinkType } from "@types";

const routes: Array<NavLinkType> = [
  {
    name: "Home",
    href: "/home",
    icon: "home",
    inMenu: true,
  },
  {
    name: "Create Game",
    href: "/game",
    icon: "joystick",
    inMenu: true,
  },
  {
    name: "Words",
    href: "/words",
    icon: "package",
    inMenu: true,
  },
  {
    name: "Lists",
    href: "/lists",
    icon: "list",
    inMenu: true,
    subRoutes: [
      {
        name: "Edit List",
        href: "/lists/edit/{id}",
        icon: "wrench",
        inMenu: false,
      },
    ],
  },
  {
    name: "Profile",
    href: "/profile",
    icon: "user",
    inMenu: true,
  },
];

export default routes;
