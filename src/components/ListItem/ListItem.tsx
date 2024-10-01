"use client";
import { Trash2 } from "lucide-react";
import { TableCell } from "../ui/table";
import { contactRepository } from "@/repositorys/contact/contactRepository";
import { createContext, useCallback, useState } from "react";
import { queryClient } from "@/services/tanstackQuery/queryClient";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { toast } from "sonner";
import { DialogChange } from "../DialogChange/DialogChange";
import { insertMaskInPhone } from "@/functions/insertMaskInPhone/insertMaskInPhone";
import { insertMaskInCpf } from "@/functions/insertMaskInCpf/insertMaskInCpf";
export const UserContext = createContext<string[]>([]);

interface listItemProps {
  guid: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  havephoto?: boolean;
}

function ListItem({ guid, name, cpf, email, phone }: listItemProps) {
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const { deleteContact } = contactRepository;
  const handleDelete = useCallback(async () => {
    setIsLoadingDelete(true);
    await deleteContact(guid)
      .then(() => {
        queryClient.refetchQueries({ queryKey: ["contact"] });
      })
      .finally(() => setIsLoadingDelete(false));
    toast.success("Contato Deletado", {
      description: "Contato deletado com sucesso",
    });
  }, [deleteContact, guid]);

  return (
    <>
      <TableCell></TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{insertMaskInCpf(cpf)}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{insertMaskInPhone(phone)}</TableCell>
      <TableCell>
        <UserContext.Provider value={[guid, name, cpf, email, phone]}>
          <DialogChange />
        </UserContext.Provider>
      </TableCell>
      <TableCell>
        <AlertDialog>
          <AlertDialogTrigger>
            <Trash2 className="text-red-500" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Deseja deletar?</AlertDialogTitle>
              <AlertDialogDescription>
                Essa ação não pode ser desfeita. Vai deletar permanentemente o
                contato da lista.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-500 hover:text-red-500 hover:bg-slate-400"
                disabled={isLoadingDelete}
              >
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </>
  );
}

export { ListItem };
