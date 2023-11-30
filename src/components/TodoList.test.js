   import React from "react";
  import { render, screen, fireEvent } from "@testing-library/react";
  import TodoList from "./TodoList";
  import axios from "axios";
  import MockAdapter from "axios-mock-adapter";
  import {QueryClient, QueryClientProvider} from 'react-query';
  import {act} from 'react-dom/test-utils';
  import '@testing-library/jest-dom/extend-expect';
  
  const mock = new MockAdapter(axios);

  jest.mock('axios', () => ({
    create: () => {},
    get: jest.fn(),
    post: jest.fn(),
  }));
  
  //Mock the react-query hooks
  jest.mock('react-query', () => ({
      ...jest.requireActual('react-query'),
      useQuery: jest.fn(),
      useMutation: jest.fn(),
      useQueryClient: jest.fn(),
  }));
  
  const queryClient = new QueryClient();

describe('TodoList component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders without errors', async () => {
        render(
        <QueryClientProvider client={queryClient}>
            <TodoList />
        </QueryClientProvider>
        );

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });

        expect(screen.getByText('Todo List')).toBeInTheDocument();
    });

test('displays loading message while loading', () => {
    const { container } = render(<TodoList />);
    expect(container).toHaveTextContent('Loading todos from the server...');
});

test('displays an error message if there is an error', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    const { container } = render(<TodoList />);
    expect(container.toHaveTextContent('Something went wrong!'));
});

test('renders tabs for "ALL," "In Progress," and "Completed"', () => {
    render(<TodoList />);
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
});

// You can write more specific tests for user interactions and mutations
test('calls createMutation when submitting the form', () => {
    // Mock your createMutation and its onSuccsess function
    const createMutation = jest.fn();
    createMutation.mockResolvedValueOnce({ data: { id: 1 } });
    const onSuccess = jest.fn();

    // Render the component with the mocked createMutation and onSuccess
    render(
        <QueryClientProvider client={queryClient}>
            <TodoList createMutation={createMutation} onSuccess={onSuccess} />
        </QueryClientProvider>
    );

    // Simulate submitting the form
    fireEvent.submit(screen.getByTestId('todos-form'));

    // Assert that createMutation was called
    expect(createMutation).toHaveBeenCalled();
});

test('renders todos correctly', () => {
    // Mock your useQuery hook to return a list of todos
    useQuery.mockReturnValue({
        isLoading: false,
        error: null,
        data: [{ id: 1, title: 'Test Todo', status: 'In Progress' }],
    });

    render(<TodoList />);

    expect(screen.getByText('Test Todo')).toBeInTheDocument();
});

test('displays correct number of todos', () => {
    // Mock your useQuery hook to return a list of todos
    useQuery.mockReturnValue({
        isLoading: false,
        error: null,
        data: [{ id: 1, title: 'Test Todo', status: 'In Progress' }],
    });

    render(<TodoList />);

    expect(screen.getAllByTestId('todo-item')).toHaveLength(1);
});

test('filters todos correctly', () => {
    // Mock your useQuery hook to return a list of todos
    useQuery.mockReturnValue({
        isLoading: false,
        error: null,
        data: [
            { id: 1, title: 'Test Todo 1', status: 'In Progress' },
            { id: 2, title: 'Test Todo 2', status: 'Completed' },
        ],
    });

    render(<TodoList />);

    fireEvent.click(screen.getByText('In Progress'));

    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    expect(screen.queryByText('Test Todo 2')).not.toBeInTheDocument();
});

test('updates todo status correctly', () => {
    // Mock your useMutation hook to simulate marking a todo as completed
    useMutation.mockReturnValue([jest.fn(), { isLoading: false }]);

    // Mock your useQuery hook to return a list of todos
    useQuery.mockReturnValue({
        isLoading: false,
        error: null,
        data: [{ id: 1, title: 'Test Todo', status: 'In Progress' }],
    });

    render(<TodoList />);

    fireEvent.click(screen.getByText('Mark as Completed'));

    // Assert that the todo's status is updated correctly
    // This will depend on how you implement the "Mark as Completed" feature
});

test('adds new todo correctly', () => {
    // Mock your useMutation hook to simulate adding a new todo
    useMutation.mockReturnValue([jest.fn(), { isLoading: false }]);

    // Mock your useQuery hook to return a list of todos
    useQuery.mockReturnValue({
        isLoading: false,
        error: null,
        data: [],
    });

    render(<TodoList />);

    fireEvent.change(screen.getByPlaceholderText('Add a new todo'), {
        target: { value: 'Test Todo' },
    });
    fireEvent.click(screen.getByText('Add'));

    // Assert that the new todo is added to the list of todos
    // This will depend on how you implement the "Add" feature
});

});






