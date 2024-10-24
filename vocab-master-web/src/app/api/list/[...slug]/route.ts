import * as ListService from "@api/list";

export async function GET(
  request: Request,
  { params }: { params: { slug: string[] } }
) {
  let args = params.slug.length > 1 ? params.slug.slice(1) : [];

  return Response.json(await ListService[params.slug[0]](...args));
}
export async function POST(
  request: Request,
  { params }: { params: { slug: string[] } }
) {
  const postData = await request.json();

  return Response.json(await ListService[params.slug[0]](postData));
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string[] } }
) {
  const reqData = await request.json();

  return Response.json(await ListService[params.slug[0]](reqData));
}
