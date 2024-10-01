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
import { useContext, useState } from "react";
import { toast } from "sonner";
import { UserPen } from "lucide-react";
import { UserContext } from "../ListItem/ListItem";

const { changeContact } = contactRepository;

const formSchema = z.object({
  name: z.string().min(2).max(50),
  cpf: z.string().min(2).max(11),
  email: z.string().min(2).email(),
  phone: z.string().min(2).max(11),
});

function DialogChange() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [guid, name, cpf, email, phone] = useContext(UserContext);

  const handleChangeModal = (newValue: boolean) => setIsOpen(newValue);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name,
      cpf: cpf,
      email: email,
      phone: phone,
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoadingUpdate(true);
    const editContact = {
      guid: guid,
      name: values.name,
      cpf: values.cpf,
      email: values.email,
      phone: values.phone,
    };

    await changeContact(editContact)
      .then(() => {
        queryClient.refetchQueries({ queryKey: ["contact"] });
        form.reset();
        handleChangeModal(false);
        toast.success("Contato Alterado", {
          description: "Contato alterado com sucesso",
        });
      })
      .finally(() => setIsLoadingUpdate(false));
  }
  return (
    <Dialog open={isOpen} onOpenChange={handleChangeModal}>
      <DialogTrigger asChild>
        <UserPen />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Alterar Contato</DialogTitle>
          <DialogDescription>
            Altere informações do seu contato.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
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
                      defaultValue={cpf}
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
                      defaultValue={email}
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
                      defaultValue={phone}
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
                disabled={isLoadingUpdate}
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

export { DialogChange };
