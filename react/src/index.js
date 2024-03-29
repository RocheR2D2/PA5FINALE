import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { ApolloProvider, Query } from "react-apollo";
import ApolloClient, { gql } from "apollo-boost";

import Root from "./Root";
import Auth from "./components/Auth";


const client = new ApolloClient({
    uri: "http://ec2-34-243-179-141.eu-west-1.compute.amazonaws.com:8001/graphql/",
    fetchOptions: {
      credentials: "include"
    },
    clientState: {
      defaults: {
        isLoggedIn: !!localStorage.getItem("authToken")
      }
    },
    request: operation => {
        const token = localStorage.getItem("authToken") || "";
        operation.setContext({
          headers: {
            Authorization: `JWT ${token}`
          }
        });
      },
  });

const IS_LOGGED_IN_QUERY = gql`
  query {
    isLoggedIn @client
  }
`;

ReactDOM.render(
  <ApolloProvider client={client}>
    <Query query={IS_LOGGED_IN_QUERY}>
      {({ data }) => (data.isLoggedIn ? <Root /> : <Auth />)}
    </Query>
  </ApolloProvider>,
  document.getElementById("root")
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
