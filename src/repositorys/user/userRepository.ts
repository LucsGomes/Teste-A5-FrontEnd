import commonInstance from "@/services/axios";

type GetUserProps = {
  User: string;
  Password: string;
  CpfAvaliacao: string;
};

type Return = {
  Token: string;
};

interface IUserModel {
  getUser: (user: GetUserProps) => Promise<Return>;
}

const userRepository: IUserModel = {
  getUser: async (user: GetUserProps) => {
    const { data } = await commonInstance.get<Return>("/get-user", {
      params: user,
    });
    return data;
  },
};

export { userRepository };
