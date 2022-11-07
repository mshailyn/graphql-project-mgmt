import Header from "./components/Header";
import Clients from "./components/Clients";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import AddClientModal from "./components/AddClientModal";

//Create Cache and Create merge function to avoid loss of data
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

//Connect Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache,
})

function App() {
  return (
    <>
      <ApolloProvider client={client}>
      <Header />
      <div className="container">
        <AddClientModal />
        <Clients />
      </div>
      </ApolloProvider>
    </>
  );
}

export default App;
