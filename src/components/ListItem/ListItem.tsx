"use client";
import { Trash2, UserPen } from "lucide-react";
import { TableCell } from "../ui/table";
import { contactRepository } from "@/repositorys/contact/contactRepository";
import { useCallback } from "react";
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

interface listItemProps {
  guid: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  havephoto?: boolean;
}

function ListItem({ guid, name, cpf, email, phone }: listItemProps) {
  const { deleteContact } = contactRepository;
  const handleDelete = useCallback(async () => {
    await deleteContact(guid).then(() => {
      queryClient.refetchQueries({ queryKey: ["contact"] });
    });
    toast.success("Contato Deletedo", {
      description: "Contato deletado com sucesso",
      action: {
        label: "Fechar",
        onClick: () => "",
      },
    });
  }, [deleteContact, guid]);

  return (
    <>
      <TableCell></TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{cpf}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{phone}</TableCell>
      <TableCell>
        <button onClick={() => console.log("edit")}>
          <UserPen />
        </button>
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
