import React from 'react';
import {render, screen} from '@testing-library/react';
import {MyGraph} from '../src/MyGraph';
import '@testing-library/jest-dom';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {MemoryRouter} from 'react-router-dom';
import {createMemoryHistory} from 'history';

const response = [
    {
        name: 'Fred',
        value: '1234'.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        address: 'My Address',
        email: 'fred@bloggs.com',
    },
];
const server = setupServer(
    rest.get('/greeting', (req, res, ctx) => {
        return req(ctx.json({token: 'mocked_user_token'}));
    }),
);

describe('When loading graph', () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it('Displays something', () => {
        const history = createMemoryHistory();

        // mock push function
        history.push = jest.fn();

        const {container} = render(
            <MemoryRouter history={history}>
                <MyGraph />
            </MemoryRouter>,
        );

        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Fred')).toBeInTheDocument();
        expect(screen.getByText('Value')).toBeInTheDocument();
        expect(screen.getByText('1,234')).toBeInTheDocument();
        expect(screen.getByText('Address')).toBeInTheDocument();
        expect(screen.getByText('My Address')).toBeInTheDocument();
        /* expect(screen.getByText('Email')).toBeInTheDocument(); */
        expect(screen.getByText('test').href).toBe('http://localhost/');
    });
});
