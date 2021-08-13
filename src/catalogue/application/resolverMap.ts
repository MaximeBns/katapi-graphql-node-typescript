import { IResolvers } from "@graphql-tools/utils";

const resolverMap: IResolvers = {
    Query: {
        recupererLesProduits(_: void): String {
            return `👋 Hello world! 👋`;
        },
    },
};

export default resolverMap;
