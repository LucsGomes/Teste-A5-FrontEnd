import { cookies } from "next/headers";

export type Return = Contact[] | string;

export interface Contact {
  guid: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  havephoto: boolean;
}

export async function GET() {
  const user = JSON.parse(`${cookies().get("currentUser")?.value}`);
  const headersList = {
    Accept: "application/json",
    Authorization: `Bearer ${user.Token}`,
  };

  const res = await fetch(
    "https://d7oom0ivw6.execute-api.sa-east-1.amazonaws.com/PRD/contact/search?cpfavaliacao=09671986072",
    {
      method: "GET",
      headers: headersList,
    }
  );

  if (!res.ok) {
    const dataError = [
      {
        error: await res.text(),
      },
    ];
    return Response.json(dataError);
  }

  const data: Return = await res.json();
  return Response.json(data);
}
