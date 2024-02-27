import React from "react";
import { Game, Profile, Words, Home } from "#views";

const routes = {
  Home: {
    path: "/main_window",
    index: true,
    element: <Home />,
    title: "Home",
  },
  CreateGame: {
    path: "/game",
    element: <Game />,
    title: "Create Game",
  },
  QuickGame: {
    path: "/game/:quick",
    navigate: () => {
      return "/game/quick";
    },
    element: <Game />,
    title: "Quick Game",
  },
  Profile: {
    path: "/profile",
    element: <Profile />,
    title: "User Profiles",
  },
  Words: {
    path: "/words",
    element: <Words />,
    title: "Words",
  },
  NotFound: {
    path: "/*",
    element: <Home />,
    title: "NotFound",
  },
};
let links = {};

Object.entries(routes).map(([name, route]) => {
  //console.log('mapp',name,route)
  links[name] =
    route["navigate"] ||
    (() => {
      return route["path"];
    });
});

const sideMenu = [
  {
    navigate: () => links.QuickGame(),
    public: true,
    icon: "play",
    label: "Quick Play",
  },
  {
    navigate: () => links.CreateGame(),
    public: false,
    icon: "home",
    label: "Create Game",
  },
  {
    navigate: () => links.Words(),
    public: false,
    icon: "package",
    label: "Words",
  },
  {
    navigate: () => links.Profile(),
    public: false,
    icon: "gear",
    label: "Profile",
  },
];

export default routes;
export { links, sideMenu };
