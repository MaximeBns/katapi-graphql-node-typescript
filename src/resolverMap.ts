import { IResolvers } from "@graphql-tools/utils";

const resolverMap: IResolvers = {
    Query: {
        helloWorld(_: void): string {
            return `👋 Hello world! 👋`;
        },
    },
};

export default resolverMap;
