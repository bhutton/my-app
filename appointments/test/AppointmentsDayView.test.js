import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { Appointment, AppointmentsDayView } from '../src/AppointmentsDayView';
import { createContainer } from './domManipulators';
import { CustomerForm } from '../src/CustomerForm';

describe('Appointment', () => {
    let container;
    let customer;
    const render = component => ReactDOM.render(component, container);

    beforeEach(() => {
        container = document.createElement('div');
    });

    it('my first test', () => {
        customer = { firstName: 'Ashley' };
        render(<Appointment customer={customer} />);
        expect(container.textContent).toMatch('Ashley');
    });

    it('my second test', () => {
        customer = { firstName: 'Jordan' };
        render(<Appointment customer={customer} />);
        expect(container.textContent).toMatch('Jordan');
    });
});

describe('AppointsmentsDayView', () => {
    const today = new Date();
    const appointments = [
        {
            startsAt: today.setHours(12, 0),
            customer: { firstName: 'Ashley' }
        },
        {
            startsAt: today.setHours(13, 0),
            customer: { firstName: 'Jordan' }
        }
    ];

    let render, container;

    beforeEach(() => {
        ({ render, container } = createContainer());
    });

    const form = id => container.querySelector(`form[id="${id}"]`);
    const firstNameField = () => form('customer').elements.firstName;

    it('renders a div with the right id', () => {
        render(<AppointmentsDayView appointments={[]} />);
        expect(container.querySelector('div#appointmentsDayView')).not.toBeNull();
    });

    it('renders multiple appointments in an ol element', () => {
        render(<AppointmentsDayView appointments={appointments} />);
        expect(container.querySelector('ol')).not.toBeNull();
        expect(container.querySelector('ol').children).toHaveLength(2);
    });

    it('renders each appointment in an li element', () => {
        render(<AppointmentsDayView appointments={appointments} />);
        expect(container.querySelectorAll('li')[0].textContent).toEqual('12:00');
        expect(container.querySelectorAll('li')[1].textContent).toEqual('13:00');
    });

    it('initially shows a message saying there are no appointments today', () => {
        render(<AppointmentsDayView appointments={[]} />);
        expect(container.textContent).toMatch(
            'There are no appointments scheduled for today.'
        );
    });

    it('selects the first appointment by default', () => {
        render(<AppointmentsDayView appointments={appointments} />);
        expect(container.textContent).toMatch('Ashley');
    });

    it('has a button element in each li', () => {
        render(<AppointmentsDayView appointments={appointments} />);
        expect(container.querySelectorAll('li > button')).toHaveLength(2);
        expect(container.querySelectorAll('li > button')[0].type).toEqual('button');
    });

    it('renders another appointment when selected', () => {
        render(<AppointmentsDayView appointments={appointments} />);
        const button = container.querySelectorAll('button')[1];
        ReactTestUtils.Simulate.click(button);
        expect(container.textContent).toMatch('Jordan');
    });

    it('renders a form', () => {
        render(<CustomerForm />);
        expect(form('customer')).not.toBeNull();
    });

    it('renders the first name field as a test box', () => {
        render(<CustomerForm />);
        expect(firstNameField()).not.toBeNull();
        expect(firstNameField().tagName).toEqual('INPUT');
        expect(firstNameField().type).toEqual('text');
    });

    it('includes the existing values for the first name', () => {
        render(<CustomerForm firstName="Ashley" />);
        expect(firstNameField().value).toEqual('Ashley');
    });

    const labelFor = formElement =>
        container.querySelector(`label[for="${formElement}"]`);

    it('renders a label for the first name field', () => {
        render(<CustomerForm />);
        expect(labelFor('firstName')).not.toBeNull();
        expect(labelFor('firstName').textContent).toEqual('First name');
    });

    it('assigns an id that matches the label id to the first name field', () => {
        render(<CustomerForm />);
        expect(firstNameField().id).toEqual('firstName');
    });

    // page 70
    it('saves existing first name when submitted', async () => {
        expect.hasAssertions();

        render(
            <CustomerForm
                firstName="Ashley"
                onSubmit={({ firstName }) =>
                    expect(firstName).toEqual('Ashley')
                }
            />
        );

        await ReactTestUtils.Simulate.submit(form('customer'));
    });

});
