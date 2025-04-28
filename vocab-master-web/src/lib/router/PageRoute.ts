import Route from "./Route";
import { RouteOptions } from "@/types";
import Enum from "@enums";

export default class PageRoute extends Route {
  menu?: { order: number };
  name: Enum.Route.Name;
  token?: boolean = false;
  icon: Enum.Icon;
  children?: PageRoute[];

  constructor(_options: RouteOptions) {
    super(Enum.Route.Type.PAGE, _options);
    this.name = _options.name || Enum.Route.Name.NOT_FOUND;
    this.icon = _options.icon || Enum.Icon.NOT_FOUND;

    this.menu = _options.menu;
    this.token = _options.token;
    this.children = _options.children;
  }
}
