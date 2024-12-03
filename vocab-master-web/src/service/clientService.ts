import axios from "axios";

import { ClientServiceType, WordFormType, ListFormType } from "@types";

const ClientService: ClientServiceType = {
  word: {
    getWords: {
      getUrl: () => `/api/word/getWords`,
      call: async () => {
        const data = await axios.get(ClientService.word.getWords.getUrl());
        return data;
      },
    },
    addWord: {
      getUrl: () => `/api/word/addWord`,
      call: async (data: WordFormType) => {
        const response = await axios.post(
          ClientService.word.addWord.getUrl(),
          data
        );
        return response;
      },
    },
    updateWord: {
      getUrl: () => `/api/word/updateWord`,
      call: async (data: WordFormType) => {
        const response = await axios.post(
          ClientService.word.updateWord.getUrl(),
          data
        );
        return response;
      },
    },
    addWordToList: {
      getUrl: () => `/api/word/addWordToList`,
      call: async (data: WordFormType, listId: number) => {
        const response = await axios.post(
          ClientService.word.addWordToList.getUrl(),
          { data, listId }
        );
        return response;
      },
    },
    deleteWord: {
      getUrl: () => `/api/word/deleteWord`,
      call: async (id: number) => {
        const response = await axios.delete(
          ClientService.word.deleteWord.getUrl(),
          { data: id }
        );
        return response;
      },
    },
    deleteWordFromList: {
      getUrl: () => `/api/word/deleteWordFromList`,
      call: async (wordId: number, listId: number) => {
        const response = await axios.post(
          ClientService.word.deleteWord.getUrl(),
          { wordId, listId }
        );
        return response;
      },
    },
  },
  list: {
    getListById: {
      getUrl: (listId: number) => `/api/list/getListById/${listId}`,
      call: async (listId: number) => {
        const response = await axios.get(
          ClientService.list.getListById.getUrl(listId)
        );
        return response;
      },
    },
    getListDetails: {
      getUrl: (listId: number) => `/api/list/getListDetails/${listId}`,
      call: async (listId: number) => {
        const response = await axios.get(
          ClientService.list.getListDetails.getUrl(listId)
        );
        return response;
      },
    },
    getListsAll: {
      getUrl: () => `/api/list/getListsAll`,
      call: async () => {
        const data = await axios.get(ClientService.list.getListsAll.getUrl());
        return data;
      },
    },
    addList: {
      getUrl: () => `/api/list/addList`,
      call: async (data: ListFormType) => {
        const response = await axios.post(
          ClientService.list.addList.getUrl(),
          data
        );
        return response;
      },
    },
    updateListDetails: {
      getUrl: () => `/api/list/updateListDetails`,
      call: async (data: ListFormType) => {
        const response = await axios.post(
          ClientService.list.updateListDetails.getUrl(),
          data
        );
        return response;
      },
    },
    deleteList: {
      getUrl: () => `/api/list/deleteList`,
      call: async (id: number) => {
        const response = await axios.delete(
          ClientService.list.deleteList.getUrl(),
          { data: id }
        );
        return response;
      },
    },
  },
  game: {},
  user: {
    login: {
      getUrl: () => `/api/user/login`,
      call: async () => {
        const data = await axios.get(ClientService.user.login.getUrl());
        return data;
      },
    },
  },
};

export default ClientService;
