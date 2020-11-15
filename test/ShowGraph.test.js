import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MyGraph, getData } from '../src/MyGraph';
import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const response = [
    {
        name: 'Fred',
        value: '1234',
        address: 'My Address',
        email: 'fred@bloggs.com',
    },
];
const server = setupServer(
    rest.get('http://127.0.0.1/greeting', (req, res, ctx) => {
        return res(ctx.json(response));
    }),
);

describe('When loading graph', () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it('Displays something', async () => {
        const history = createMemoryHistory();

        // mock push function
        history.push = jest.fn();

        const getDataMock = jest.fn(() => ({
            data: response,
        }));

        render(
            <MemoryRouter>
                <MyGraph getFunc={getDataMock} />
            </MemoryRouter>,
        );

        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Fred')).toBeInTheDocument();
        expect(screen.getByText('Value')).toBeInTheDocument();
        expect(screen.getByText('1234')).toBeInTheDocument();
        expect(screen.getByText('Address')).toBeInTheDocument();
        expect(screen.getByText('My Address')).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByText('fred@bloggs.com').href).toBe(
                'http://localhost/',
            );
        });
        /* expect(screen.getByText('test').href).toBe('http://localhost/'); */
    });

    it('Checks axios call', async () => {
        const getResponse = await getData();

        expect(getResponse.data).toEqual(response);
    });
});
