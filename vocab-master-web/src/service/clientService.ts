import axios from "axios";
import { setSearchParams } from "@/utils/stringUtils";
import { SearchParams } from "@types";
import Enum from "@enums";

class ClientApi {
  private url = `${process.env.BASE_URL}/api/`;

  constructor(service: Enum.Api.Service) {
    this.url = `${this.url}${service}`;
  }

  async get(method: Enum.Api.Method, query?: SearchParams) {
    const response = await axios.get(setSearchParams(method, query));
    return response;
  }
  async post(method: Enum.Api.Method, data, headers?) {
    const response = await axios.post(`${this.url}/${method}`, data, {
      headers,
    });
    return response.data;
  }
}

export const AccountService = new ClientApi(Enum.Api.Service.ACCOUNT);
export const ListService = new ClientApi(Enum.Api.Service.LIST);
export const WordService = new ClientApi(Enum.Api.Service.WORD);
export const UserService = new ClientApi(Enum.Api.Service.USER);
export default ClientApi;
