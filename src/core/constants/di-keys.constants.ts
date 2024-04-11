export const CONTAINER_KEYS = {
	repository: {
		authentication: "repository.authentication",
		product: "repository.product",
    category: "repository.category",
	},
	services: "services",
	useCase: {
		user: "useCase.user",
		product: "useCase.product",
    category: "useCase.category",
	},
	controller: {
		authen: "controller.authen",
		product: "controller.product",
    category: "controller.category",
	},
} as const;
