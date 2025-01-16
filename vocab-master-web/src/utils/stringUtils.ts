import { ApiUrlEnum } from "@enums";
import { ApiUrl } from "@types";

export const formatString = (str: string, ...args: any[]) => {
  console.log("[CLIENT LOG formatString] ", str, args);
  return str.replace(/{(\d+)}/g, function (match: any, number: any) {
    return typeof args[number] != "undefined" ? args[number] : match;
  });
};
export const getApiUrl = (str: ApiUrlEnum, ...args: any[]): ApiUrl => {
  let urlWithHost = `${process.env.BASE_URL}${str}`;
  return formatString(urlWithHost as string, args) as ApiUrl;
};
