import React from 'react';
import config from "../config";
import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';
import {onError} from 'apollo-link-error';
import {ApolloLink} from 'apollo-link';
import {ApolloProvider} from '@apollo/react-hooks';
import {setContext} from 'apollo-link-context';
import {authService} from "../modules/auth/services";
import {useDefaultEventEmitter} from "../common/eventEmitter";

const httpLink = new HttpLink({
    uri: `${config.API_URL}/graphql`,
});
const authLink = setContext(async (_, {headers}) => {

// get the authentication token from local storage if it exists
    const authorization = await authService.getAuthorization();
    console.log(`authorization:${authorization}`);
    let h = {...headers};
    if (authorization)
        h = {
            ...headers,
            Authorization: authorization,
        };
    return {
        headers: h
    }
});
const link = ApolloLink.from([
    onError(({graphQLErrors, networkError}) => {
        if (graphQLErrors)
            graphQLErrors.forEach(({message, locations, path}) =>
                console.log(
                    `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                ),
            );
        if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    authLink,
    httpLink
]);
export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link
});

export const MyApolloProvider = (props: any) => {
    useDefaultEventEmitter('auth', () => client.resetStore());
    return (
        <ApolloProvider client={client}>
            {props.children}
        </ApolloProvider>
    );
};
