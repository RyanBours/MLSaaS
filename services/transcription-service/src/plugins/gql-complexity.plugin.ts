
import { GraphQLSchemaHost } from "@nestjs/graphql";
import { Plugin } from "@nestjs/apollo";
import {
    ApolloServerPlugin,
    GraphQLRequestListener,
} from '@apollo/server';
import { GraphQLError } from 'graphql';
import {
    fieldExtensionsEstimator,
    getComplexity,
    simpleEstimator,
} from 'graphql-query-complexity';

@Plugin()
export class ComplexityPlugin implements ApolloServerPlugin {
    constructor(private gqlSchemaHost: GraphQLSchemaHost) {}

    async requestDidStart(): Promise<GraphQLRequestListener<any>> {
        const maxComplexity = 20;
        const { schema } = this.gqlSchemaHost;

        return {
            async didResolveOperation({ request, document }) {
                const complexity = getComplexity({
                    schema,
                    operationName: request.operationName,
                    query: document,
                    variables: request.variables,
                    estimators: [
                        fieldExtensionsEstimator(),
                        simpleEstimator({ defaultComplexity: 1 }),
                    ],
                });
                console.log('Query Complexity:', complexity);
                if (complexity > maxComplexity) {
                    throw new GraphQLError(
                        `Query is too complex: ${complexity}. Maximum allowed complexity: ${maxComplexity}`,
                    );
                }
            },
        };
    }
}
