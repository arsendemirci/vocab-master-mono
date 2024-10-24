// In this file, we can define any type of request as follows:
//  A simple GET Example
import * as WordService from "@api/word";

export async function GET(
  request: Request,
  { params }: { params: { slug: string[] } }
) {
  let args = params.slug.slice(1);
  return Response.json(await WordService[params.slug[0]](...args));
}
export async function POST(
  request: Request,
  { params }: { params: { slug: string[] } }
) {
  const postData = await request.json();
  console.log(`postData`, postData);
  return Response.json(await WordService[params.slug[0]](postData));
}
