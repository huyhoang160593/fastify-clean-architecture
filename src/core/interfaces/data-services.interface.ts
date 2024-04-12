import type {
	IAuthenticationRepository,
	ICategoriesRepository,
	IProductsRepository,
} from "./index.ts";

export interface IDataServices {
	users: IAuthenticationRepository;
	product: IProductsRepository;
	category: ICategoriesRepository;
}
