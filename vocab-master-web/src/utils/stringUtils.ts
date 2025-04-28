import { ApiUrl, SearchParams } from "@types";
import Enum from "@enums";

export const formatString = (str: string, ...args: any[]) => {
  return str.replace(/{(\d+)}/g, function (match: any, number: any) {
    return typeof args[number] != "undefined" ? args[number] : match;
  });
};
export const getApiUrl = (str: Enum.Api.Url, ...args: any[]): ApiUrl => {
  let urlWithHost = `${process.env.BASE_URL}${str}`;
  return formatString(urlWithHost as string, args) as ApiUrl;
};
export const getPageUrl = (
  str: string,
  ...args: { key: string; value: any }[]
): string => {
  let search = "";
  if (args) {
    args.forEach(({ key, value }, index) => {
      search += `${index === 0 ? "?" : "&"}${key}=${value}`;
    });
  }

  return `${process.env.BASE_URL}${str}${search}`;
};
export const setSearchParams = (str: string, arr?: SearchParams): string => {
  let strWithSearch = str;
  if (arr) {
    Object.entries(arr).forEach(([key, value], index) => {
      strWithSearch += `${index === 0 ? "?" : "&"}${key}=${value}`;
    });
  }
  return strWithSearch;
};
