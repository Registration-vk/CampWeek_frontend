import { AxiosInstance, AxiosResponse } from "axios";

import { ApiBase } from "@/services/ApiBase";
import { User } from "@/services/users";

export class UserService extends ApiBase<User> {
  constructor(axiosInstance: AxiosInstance, baseUrl: string) {
    super(axiosInstance, baseUrl);
  }

  async getAll(): Promise<User[]> {
    return super.getAll();
  }

  async getById(id: number): Promise<User> {
    return super.getById(id);
  }

  async getCurrentProfile(): Promise<User> {
    const { data }: AxiosResponse<User> = await this.axiosInstance.get("/profile");
    return data;
  }
}
