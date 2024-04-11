import type { Product } from "@core/entities/index.ts";
import type { IGenericRepository } from "./generic-repository.interface.ts";
import type { IAuthenticationRepository, ICategoriesRepository } from "./index.ts";

export interface IDataServices {
	users: IAuthenticationRepository;
	product: IGenericRepository<Product>;
  category: ICategoriesRepository;
}
