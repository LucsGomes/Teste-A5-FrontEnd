import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function PATCH(request: NextRequest) {
  const user = JSON.parse(`${cookies().get("currentUser")?.value}`);
  const headersList = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${user.Token}`,
  };

  const body = await request.json();
  const bodyContent = JSON.stringify(body);

  const res = await fetch(
    "https://d7oom0ivw6.execute-api.sa-east-1.amazonaws.com/PRD/contact/update?cpfavaliacao=09671986072",
    {
      method: "PATCH",
      body: bodyContent,
      headers: headersList,
      cache: "no-store",
    }
  );

  if (!res.ok) {
    const dataError = await res.text();
    return Response.json(dataError);
  }

  const data = await res.text();
  return Response.json(data);
}
