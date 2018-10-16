import React from 'react';
import { PtsdNameTitle, incidentDateMoreInfo } from '../helpers';

import currentOrPastDateUI from 'us-forms-system/lib/js/definitions/currentOrPastDate';

const ptsdDateDescription = () => (
  <div>
    <h5>Event date</h5>
    <p>
      When did the first event happen? Please note, this date doesn’t have to be
      exact, but it’ll help with our research if you provide a date within a
      2-month range.
    </p>
    <p>
      If you can’t remember the exact date, we suggest you try to recall the
      time of year or a holiday that happened around the time of the event.
    </p>
    {incidentDateMoreInfo}
  </div>
);

export const uiSchema = {
  'ui:title': ({ formData }) => (
    <PtsdNameTitle formData={formData} formType="781a" />
  ),
  'ui:description': ptsdDateDescription,
  secondaryIncidentDate: currentOrPastDateUI(' '),
};

export const schema = {
  type: 'object',
  properties: {
    secondaryIncidentDate: {
      type: 'string',
    },
    'view:ptsdDateSecondaryDescription': {
      type: 'object',
      properties: {},
    },
  },
};