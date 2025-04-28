import { ApiResponse } from "@types";
import Enum from "@enums";
import dbConnect from "@/server/db/mongoDB";
import { Handler, RequestDTO } from "@types";
// import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";

export const wrapResponse = async <T>(
  fn: () => Promise<T>
): Promise<ApiResponse> => {
  let response: ApiResponse = { status: Enum.Api.Response.Status.FAIL };
  await dbConnect();
  try {
    const data = await fn();
    response.status = Enum.Api.Response.Status.OK;
    response.data = data;
  } catch (error: any) {
    response.error = error.message || "Something went wrong";
  }

  return response;
};

export const wrapRequest = async (handler: Handler) => {
  let response: ApiResponse = { status: Enum.Api.Response.Status.FAIL };
  const session = await getServerSession(authOptions);
  let reqDto: RequestDTO = {};
  if (session && session.user && session.user.id) {
    reqDto.userId = session.user.id;
  }

  response = await wrapResponse(async () => {
    const data = await handler(reqDto);
    return data;
  });

  return response;
};
