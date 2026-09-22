declare const prismaClientSingleton: () => import("./generated/prisma/internal/class.js").PrismaClient<never, import("./generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined, import("@prisma/client/runtime/client").DefaultArgs>;
declare global {
    var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}
export declare const prisma: import("./generated/prisma/internal/class.js").PrismaClient<never, import("./generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined, import("@prisma/client/runtime/client").DefaultArgs>;
export default prisma;
export * from "./generated/prisma/client.js";
//# sourceMappingURL=index.d.ts.map