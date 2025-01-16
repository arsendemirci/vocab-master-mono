import Link from "next/link";
import { headers } from "next/headers";

export default function NotFound() {
  // const headersList = await headers();
  // const domain = headersList.get("host");
  // console.log("domain", domain);
  //   const data = await getSiteData(domain)
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <h2>Sorry, the page you are looking for does not exist.</h2>
      <p>
        <a href="/">Return to Homepage</a>
      </p>
    </div>
  );
}
