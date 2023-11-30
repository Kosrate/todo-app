import React from 'react';
import './App.scss';
import TodoList from './components/TodoList';
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'


// Create a client
const queryClient = new QueryClient();

function App() {

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
        <TodoList />
      </QueryClientProvider>
    </div>
  );
}

export default App;
