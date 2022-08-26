import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { expect } from '@jest/globals';
import App from '../App';
import store from '../redux/store';

describe('teste do foods', () => {
  afterEach(() => jest.clearAllMocks());

  it('testa /foods (redirecionamento arrabiata)', async () => {
    const history = createMemoryHistory();
    history.push('/foods');
    render(
      <Provider store={ store }>
        <Router history={ history }>
          <App />
        </Router>
        ,
      </Provider>,
    );

    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);

    const name = screen.getByTestId('name-search-radio');
    const inpuText = screen.getByTestId('search-input');
    const search = screen.getByTestId('exec-search-btn');

    userEvent.click(name);

    userEvent.type(inpuText, 'arrabiata');
    userEvent.click(search);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/foods/52771');
    }, { timeout: 2000 });
    history.push('/foods');
  });
});
