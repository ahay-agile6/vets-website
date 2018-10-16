import React from 'react';
import { IncidentIntroduction781 } from '../helpers';

export const uiSchema = {
  'ui:description': ({ formData }) => (
    <IncidentIntroduction781 formData={formData} formType="781" />
  ),
};

export const schema = {
  type: 'object',
  properties: {},
};