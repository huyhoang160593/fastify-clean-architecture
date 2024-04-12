import type * as schema from "../../drizzle/schema"

//#region SeederData
export const privilegesSeedingData: (typeof schema.privilege.$inferInsert)[] = [
  {
    code: "admin",
    description: "Admin privilege",
  },
  {
    code: "user",
    description: "User privilege",
  },
  {
    code: "seller",
    description: "Seller privilege",
  },
];
