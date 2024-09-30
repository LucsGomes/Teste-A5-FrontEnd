"use client";
import { List } from "@/components/List/List";
import { ListOptions } from "@/components/ListOptions/ListOptions";
import { contactRepository } from "@/repositorys/contact/contactRepository";
import { userRepository } from "@/repositorys/user/userRepository";
import { manageAuth } from "@/services/manageAuth";
import { useEffect } from "react";
import { ListItem } from "@/components/ListItem/ListItem";
import { TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { getAuth, saveAuth } = manageAuth;

  const { getUser } = userRepository;
  const { getList } = contactRepository;

  useEffect(() => {
    const user = getAuth();
    (async () => {
      if (user?.Token) {
        return;
      }

      const userLogin = {
        User: "A5Solutions",
        Password: "P@ssw0rd",
        CpfAvaliacao: "09671986072",
      };

      await getUser(userLogin).then((response) => {
        const newUser = { user: response };
        saveAuth(newUser);
      });
    })();
  }, [getUser, saveAuth, getAuth]);

  const { data: contactList, isLoading } = useQuery({
    queryKey: ["contact"],
    queryFn: () => getList(),
  });

  if (isLoading) {
    return <h3>Carregando...</h3>;
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ListOptions />
        <div className="flex flex-col">
          <List>
            {!contactList?.[0].error && (
              <>
                {contactList?.map((item) => (
                  <TableRow key={item?.guid}>
                    <ListItem
                      key={item?.guid}
                      guid={item?.guid}
                      name={item?.name}
                      cpf={item?.cpf}
                      email={item?.email}
                      phone={item?.phone}
                    />
                  </TableRow>
                ))}
              </>
            )}
          </List>
        </div>
      </main>
    </div>
  );
}
