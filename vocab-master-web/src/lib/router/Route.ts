import { RouteOptions } from "@/types";
import Enum from "@enums";

export default class Route {
  public path;
  public type: Enum.Route.Type;
  public searchKeys?: string[];
  public isPublic: boolean;
  constructor(_type, _options: RouteOptions) {
    this.path = _options.path;
    this.isPublic = _options?.isPublic || false;
    this.type = _type;
    this.searchKeys = _options.searchKeys;
  }

  pathWithSearch(...vals) {
    let strWithSearch = this.path;
    if (
      this.searchKeys &&
      this.searchKeys.length &&
      vals &&
      vals.length === this.searchKeys.length
    ) {
      this.searchKeys.forEach((key, index) => {
        strWithSearch += `${index === 0 ? "?" : "&"}${key}=${vals[index]}`;
      });
    }
    return strWithSearch;
  }
}
