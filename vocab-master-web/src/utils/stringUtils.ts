// First, checks if it isn't implemented yet.
export const formatString = (str: string, ...args: any[]) => {
  return str.replace(/{(\d+)}/g, function (match: any, number: any) {
    return typeof args[number] != "undefined" ? args[number] : match;
  });
};
