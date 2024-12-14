import { FindOneOptions } from "typeorm";
import { User } from "../../entity/User";
import { IUserSignUp } from "../../utils/interfaces/user";
import { AppDataSource } from "../../data-source";

const userRepository = AppDataSource.getRepository(User);
export const createUser = async (payload: IUserSignUp): Promise<User> => {
  const user = userRepository.create(payload);
  await userRepository.save(user);
  return user;
};

export const getUser = async (payload: Partial<User>) => {
  const options: FindOneOptions<User> = { where: payload };
  const user = await userRepository.findOne(options);
  return user;
};
