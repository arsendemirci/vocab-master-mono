import Route from "./Route";
import { RouteOptions } from "@/types";
import axios from "@/lib/http";
import Enum from "@enums";

export default class ApiRoute extends Route {
  method: "post" | "get" | "delete";
  callUrl: string;
  private baseUrl = process.env.BASE_URL;
  constructor(_options: RouteOptions) {
    super(Enum.Route.Type.API, _options);

    this.method = _options?.method || "get";
    this.callUrl = `${this.baseUrl}${this.path}`;
  }
  async call(_data?, headers?) {
    try {
      console.log("ARSEN - resp -> ", _data, headers);
      const resp =
        this.method === "delete"
          ? await axios[this.method](this.callUrl, {
              data: { ..._data },
              headers,
            })
          : await axios[this.method](this.callUrl, _data, { headers });

      return resp.data;
    } catch (err) {
      return { status: Enum.Api.Response.Status.FAIL, error: err };
    }
  }
  setQuery(...args) {
    if (
      this.searchKeys &&
      this.searchKeys.length &&
      args &&
      args.length === this.searchKeys.length
    ) {
      let search = "";
      this.searchKeys.forEach((key, index) => {
        search += `${index === 0 ? "?" : "&"}${key}=${args[index]}`;
      });
      this.callUrl = `${this.baseUrl}${this.path}${search}`;
    }
    return this;
  }
}
