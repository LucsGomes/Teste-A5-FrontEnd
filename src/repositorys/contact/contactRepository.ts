import commonInstance from "@/services/axios";

type ReturnGetList = Contact[];

type CreateNewContactProps = {
  name: string;
  cpf: string;
  email: string;
  phone: string;
};

type ChangeContactProps = {
  guid: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
};

interface Contact {
  error?: string;
  guid: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  havephoto: boolean;
}

interface IContactsModel {
  getList: () => Promise<ReturnGetList>;
  createContact: (newContact: CreateNewContactProps) => Promise<string>;
  deleteContact: (guid: string) => Promise<string>;
  changeContact: (editContact: ChangeContactProps) => Promise<string>;
}

const contactRepository: IContactsModel = {
  getList: async () => {
    const { data } = await commonInstance.get<ReturnGetList>("/get-list");
    return data;
  },
  createContact: async (newContact: CreateNewContactProps) => {
    const { data } = await commonInstance.post<string>(
      "/post-user",
      newContact
    );
    return data;
  },
  deleteContact: async (guid: string) => {
    const { data } = await commonInstance.post<string>("/delete-user", {
      guid: guid,
    });
    return data;
  },
  changeContact: async (editContact: ChangeContactProps) => {
    const { data } = await commonInstance.patch<string>(
      "/patch-user",
      editContact
    );
    return data;
  },
};

export { contactRepository };
