import React from 'react';

export const CustomerForm = ({firstName}) => (
    <form id="customer">
      <label htmlFor="firstName">First name</label>
      <input type="text" id="firstName" name="firstName" value={firstName} readOnly />
    </form>
);
