import { E_COOKIES_KEYS } from "@/shared/constants/enums/ECookiesKeys";
import { IUserDTO } from "@/shared/dtos/IUserDTO";
import Cookies from "js-cookie";

type ManageAuthSaveProps = {
  user: IUserDTO;
};

const manageAuth = {
  saveAuth: async ({ user }: ManageAuthSaveProps) => {
    Cookies.set(E_COOKIES_KEYS.USER, JSON.stringify(user), { expires: 120 });
    return;
  },

  getAuth: (): IUserDTO | null => {
    const userInString = Cookies.get(E_COOKIES_KEYS.USER);
    return userInString ? JSON.parse(userInString) : null;
  },

  removeAuth: async () => {
    Cookies.remove(E_COOKIES_KEYS.USER);
    return;
  },
};

export { manageAuth };
