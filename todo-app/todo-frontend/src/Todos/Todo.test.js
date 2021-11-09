import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Todo from './Todo';

test('renders content', () => {
  const todo = {
    text: 'test content',
    done: 'false',
  };

  const mockCompleteHandler = jest.fn();
  const mockDeleteHandler = jest.fn();

  const component = render(
    <Todo
      todo={todo}
      deleteTodo={mockDeleteHandler}
      completeTodo={mockCompleteHandler}
    />
  );

  expect(component.container).toHaveTextContent('test content');
});
