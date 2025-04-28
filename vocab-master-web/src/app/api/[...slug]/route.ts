// In this file, we can define any type of request as follows:
//  A simple GET Example
import * as api from "@/server/services";
import { type NextRequest } from "next/server";
import { wrapRequest } from "@/utils/apiUtils";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  let args: Record<string, string> = {};
  const search = request.nextUrl.searchParams;
  if (search) {
    args = Object.fromEntries(search.entries());
  }
  const response = await wrapRequest(async ({ userId }) =>
    api[params.slug[0]][params.slug[1]]({ userId, data: { ...args } })
  );

  return Response.json(response);
}
export async function POST(
  request: Request,
  { params }: { params: { slug: string[] } }
) {
  const data = await request.json();

  const response = await wrapRequest(async ({ userId }) =>
    api[params.slug[0]][params.slug[1]]({ userId, data })
  );

  return Response.json(response);
}
export async function DELETE(
  request: Request,
  { params }: { params: { slug: string[] } }
) {
  const data = await request.json();

  const response = await wrapRequest(async ({ userId }) =>
    api[params.slug[0]][params.slug[1]]({ userId, data })
  );

  return Response.json(response);
}
