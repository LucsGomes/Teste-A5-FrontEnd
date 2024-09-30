"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { contactRepository } from "@/repositorys/contact/contactRepository";
import { queryClient } from "@/services/tanstackQuery/queryClient";
import { useState } from "react";
import { toast } from "sonner";

const { createContact } = contactRepository;

const formSchema = z.object({
  name: z.string().min(2).max(50),
  cpf: z.string().min(2).max(11),
  email: z.string().min(2).email(),
  phone: z.string().min(2).max(50),
});

function DialogAdd() {
  const [isOpen, setIsOpen] = useState(false);

  const handleChangeModal = (newValue: boolean) => setIsOpen(newValue);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cpf: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const newContact = {
      name: values.name,
      cpf: values.cpf,
      email: values.email,
      phone: values.phone,
    };
    await createContact(newContact).then(() => {
      queryClient.refetchQueries({ queryKey: ["contact"] });
      form.reset();
      handleChangeModal(false);
      toast.success("Contato adicionado", {
        description: "Novo contato adicionado com sucesso",
        action: {
          label: "Fechar",
          onClick: () => console.log("Undo"),
        },
      });
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleChangeModal}>
      <DialogTrigger asChild>
        <Button className="bg-green-400 text-white hover:bg-white hover:text-green-500">
          Adicionar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar contato</DialogTitle>
          <DialogDescription>
            Adicione um novo contato para sua lista.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      defaultValue=""
                      className="col-span-3"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <Input
                      id="cpf"
                      defaultValue=""
                      className="col-span-3"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      defaultValue=""
                      className="col-span-3"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input
                      id="phone"
                      defaultValue=""
                      className="col-span-3"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter className="pt-4">
              <Button
                type="submit"
                className="bg-green-400 text-white hover:bg-white hover:text-green-500"
              >
                Salvar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export { DialogAdd };
