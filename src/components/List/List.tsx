"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface listProps {
  children?: React.ReactNode;
}

function List({ children }: listProps) {
  return (
    <div className="border-[1px] rounded-md p-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>CPF</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        {children ? (
          <TableBody>{children}</TableBody>
        ) : (
          <TableCaption>Não há contatos</TableCaption>
        )}
      </Table>
    </div>
  );
}

export { List };
