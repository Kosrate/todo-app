jest.mock('axios', () => ({
    create: () => {},
    get: jest.fn(),
    post: jest.fn(),
  }));
  
  import React from "react";
  import { render, screen, fireEvent } from "@testing-library/react";
  import TodosForm from "./TodosForm";
  import axios from 'axios';
  import MockAdapter from 'axios-mock-adapter';
  
  const mock = new MockAdapter(axios);
  import '@testing-library/jest-dom/extend-expect';
  
  const mockOnFormSubmit = jest.fn();
  
  test('renders TodosForm correctly', () => {
      const { getByPlaceholderText, getByText } = render(<TodosForm onFormSubmit={mockOnFormSubmit} />);
  
      const inputElement = getByPlaceholderText('What do you need to do?');
      const addButton = getByText('Add Todo');
  
      expect(inputElement).toBeInTheDocument();
      expect(addButton).toBeInTheDocument();
  });
  
  test('calls onFormSubmit with the correct todo when form is submitted', () => {
      const { getByPlaceholderText, getByText } = render(<TodosForm onFormSubmit={mockOnFormSubmit} />);
  
      let inputElement = getByPlaceholderText('What do you need to do?');
      
  
      fireEvent.change(inputElement, {target: {value: 'Test Todo'} });
  
      const addButton = getByText('Add Todo');
      fireEvent.click(addButton);
  
      expect(mockOnFormSubmit).toHaveBeenCalledWith({
          title: 'Test Todo',
          completed: false,
      });
  });