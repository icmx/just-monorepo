import React from 'react';

import { PersonComponentProps } from './types';

export const Person = ({ onChange }: PersonComponentProps) => {
  return (
    <section className="card flex is-column">
      <div className="field">
        <label htmlFor="full-name">Full Name</label>
        <input
          type="text"
          id="fullName"
          name="full-name"
          required
          placeholder="How should we call you?"
          onChange={(e) => {
            onChange({ fullName: e.target.value });
          }}
        />
      </div>
      <div className="field">
        <label htmlFor="contacts">Contact information</label>
        <textarea
          id="contacts"
          name="contacts"
          required
          placeholder="Your phone, e-mail etc."
          rows={2}
          onChange={(e) => {
            onChange({ contacts: e.target.value });
          }}
        ></textarea>
      </div>
    </section>
  );
};
