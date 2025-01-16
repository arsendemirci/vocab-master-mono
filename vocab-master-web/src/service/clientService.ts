import axios from "axios";
import { formatString, getApiUrl } from "@/utils/stringUtils";
import {
  ClientServiceType,
  WordFormType,
  ListFormType,
  LoginFormType,
  RegisterFormType,
} from "@types";
import { ApiUrlEnum } from "@enums";

const ClientService: ClientServiceType = {
  word: {
    getWords: async () => {
      const data = await axios.get(ApiUrlEnum.GET_WORDS);
      return data;
    },
    addWord: async (data: WordFormType) => {
      const response = await axios.post(ApiUrlEnum.ADD_WORD, data);
      return response;
    },
    updateWord: async (data: WordFormType) => {
      const response = await axios.post(ApiUrlEnum.UPDATE_WORD, data);
      return response;
    },
    addWordToList: async (data: WordFormType, listId: number) => {
      const response = await axios.post(ApiUrlEnum.ADD_WORD_TO_LIST, {
        data,
        listId,
      });
      return response;
    },
    deleteWord: async (id: number) => {
      const response = await axios.delete(ApiUrlEnum.DELETE_WORD, { data: id });
      return response;
    },
    deleteWordFromList: async (wordId: number, listId: number) => {
      const response = await axios.post(ApiUrlEnum.DELETE_WORD_FROM_LIST, {
        wordId,
        listId,
      });
      return response;
    },
  },
  list: {
    getListById: async (listId: number) => {
      const response = await axios.get(
        formatString(ApiUrlEnum.GET_LIST_BY_ID, listId)
      );
      return response;
    },
    getListDetails: async (listId: number) => {
      const response = await axios.get(
        formatString(ApiUrlEnum.GET_LIST_DETAILS, listId)
      );
      return response;
    },

    getListsAll: async () => {
      const data = await axios.get(ApiUrlEnum.GET_LISTS);
      return data;
    },
    addList: async (data: ListFormType) => {
      const response = await axios.post(ApiUrlEnum.ADD_LIST, data);
      return response;
    },
    updateListDetails: async (data: ListFormType) => {
      const response = await axios.post(ApiUrlEnum.UPDATE_LIST, data);
      return response;
    },
    deleteList: async (id: number) => {
      const response = await axios.delete(ApiUrlEnum.DELETE_LIST, { data: id });
      return response;
    },
  },
  game: {},
  user: {},
  account: {
    login: async (data: LoginFormType, headers) => {
      const response = await axios.post(getApiUrl(ApiUrlEnum.LOGIN), data, {
        headers,
      });
      return response.data;
    },
    resetPassword: async (data: any) => {
      const response = await axios.post(
        getApiUrl(ApiUrlEnum.RESET_PASSWORD),
        data
      );
      return response.data;
    },
    register: async (data: RegisterFormType) => {
      const response = await axios.post(getApiUrl(ApiUrlEnum.REGISTER), data);
      return response.data;
    },
    loginWithToken: async (data: { token: string }) => {
      const response = await axios.post(
        getApiUrl(ApiUrlEnum.LOGIN_WITH_TOKEN),
        data
      );
      return response.data;
    },
  },
};
export const {
  user: UserService,
  game: GameService,
  list: ListService,
  word: WordService,
  account: AccountService,
} = ClientService;
export default ClientService;
