import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Project from './pages/Project';
import NotFound from './pages/NotFound';
import Header from "./components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

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
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/project/:id' element={<Project />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
