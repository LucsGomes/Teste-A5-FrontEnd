import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const user = JSON.parse(`${cookies().get("currentUser")?.value}`);
  const headersList = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${user.Token}`,
  };

  const body = await request.json();
  const bodyContent = JSON.stringify(body);

  //https://d7oom0ivw6.execute-api.sa-east-1.amazonaws.com/PRD/contact/delete?cpfavaliacao=09671986072&guid=a49fc749-97f1-4ad4-ba9a-4d3face6fcf9

  const res = await fetch(
    `https://d7oom0ivw6.execute-api.sa-east-1.amazonaws.com/PRD/contact/delete?cpfavaliacao=09671986072&guid=${body.guid}`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  if (!res.ok) {
    const dataError = await res.text();
    return Response.json(dataError);
  }

  const data = await res.text();
  return Response.json(data);
}
