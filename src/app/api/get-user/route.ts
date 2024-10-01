type Return = {
  token: string;
};

export async function GET() {
  const headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  const bodyContent = JSON.stringify({
    User: "A5Solutions",
    Password: "P@ssw0rd",
    CpfAvaliacao: "09671986072",
  });

  const res = await fetch(
    "https://d7oom0ivw6.execute-api.sa-east-1.amazonaws.com/PRD/contact/token",
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
      cache: "no-store",
    }
  );

  if (!res.ok) {
    const dataError = await res.text();
    return Response.json(dataError);
  }

  const user: Return = await res.json();

  return Response.json(user);
}
