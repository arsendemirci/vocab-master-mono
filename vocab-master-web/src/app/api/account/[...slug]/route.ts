import * as AccountService from "@api/account";

export async function GET(
  request: Request,
  { params }: { params: { slug: string[] } }
) {
  let args = params.slug.length > 1 ? params.slug.slice(1) : [];

  return Response.json(await AccountService[params.slug[0]](...args));
}
export async function POST(
  request: Request,
  { params }: { params: { slug: string[] } }
) {
  console.log("burda mis sisalfjasdf", params.slug[0], request);
  const postData = await request.json();

  return Response.json(await AccountService[params.slug[0]](postData));
}
