// In this file, we can define any type of request as follows:
//  A simple GET Example
import WordService, { apiKeys } from "@api/word";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  for (let key of apiKeys) {
    if (params.slug === key) {
      return Response.json(await WordService[params.slug]());
    }
  }
}
