import {
  uiSchema as ptsdTypeUISchema,
  schema as ptsdTypeSchema,
} from './choosePtsdType';

import {
  uiSchema as ptsd781UISchema,
  schema as ptsd781Schema,
} from './uploadPtsd';

import {
  uiSchema as ptsd781aUISchema,
  schema as ptsd781aSchema,
} from './uploadPtsdSecondary';

import {
  uiSchema as ptsdChoiceUISchema,
  schema as ptsdChoiceSchema,
} from './ptsdChoice';

import {
  uiSchema as ptsdSecondaryChoiceUISchema,
  schema as ptsdSecondaryChoiceSchema,
} from './ptsdSecondaryChoice';

import {
  uiSchema as ptsdSecondaryIncidentDateUISchema,
  schema as ptsdSecondaryIncidentDateSchema,
} from './ptsdSecondaryIncidentDate';

import {
  uiSchema as ptsdSecondaryAssignmentUISchema,
  schema as ptsdSecondaryAssignmentSchema,
} from './ptsdSecondaryAssignmentDetails';

import {
  uiSchema as ptsdSecondaryLocationUISchema,
  schema as ptsdSecondaryLocationSchema,
} from './ptsdSecondaryLocation';

import {
  uiSchema as informationInterviewCombatUISchema,
  schema as informationInterviewCombatSchema,
} from './informationInterviewCombat';

import {
  uiSchema as informationInterviewAssaultUISchema,
  schema as informationInterviewAssaultSchema,
} from './informationInterviewAssault';

import {
  uiSchema as stressfulIncSecDescUISchema,
  schema as stressfulIncSecDescSchema,
} from './stressfulIncSecDesc';

import {
  uiSchema as otherSourcesSecondaryUISchema,
  schema as otherSourcesSecondarySchema,
} from './otherSourcesSecondary';

import {
  uiSchema as privateMedicalTreatmentSecondaryUISchema,
  schema as privateMedicalTreatmentSecondarySchema,
} from './privateMedicalTreatmentSecondary';

import {
  uiSchema as requestingStatementsSecondaryUISchema,
  schema as requestingStatementsSecondarySchema,
} from './requestingStatementsSecondary';

import {
  uiSchema as uploadSupportingDocumentsSecondaryUISchema,
  schema as uploadSupportingDocumentsSecondarySchema,
} from './uploadSupportingDocumentsSecondary';

export const ptsdType = {
  uiSchema: ptsdTypeUISchema,
  schema: ptsdTypeSchema,
};

export const ptsdChoice = {
  uiSchema: ptsdChoiceUISchema,
  schema: ptsdChoiceSchema,
};

export const ptsdSecondaryChoice = {
  uiSchema: ptsdSecondaryChoiceUISchema,
  schema: ptsdSecondaryChoiceSchema,
};

export const ptsdSecondaryIncidentDate = {
  uiSchema: ptsdSecondaryIncidentDateUISchema,
  schema: ptsdSecondaryIncidentDateSchema,
};

export const ptsdSecondaryAssignmentDetails = {
  uiSchema: ptsdSecondaryAssignmentUISchema,
  schema: ptsdSecondaryAssignmentSchema,
};

export const ptsdSecondaryLocation = {
  uiSchema: ptsdSecondaryLocationUISchema,
  schema: ptsdSecondaryLocationSchema,
};

export const uploadPtsd = {
  uiSchema: ptsd781UISchema,
  schema: ptsd781Schema,
};

export const uploadPtsdSecondary = {
  uiSchema: ptsd781aUISchema,
  schema: ptsd781aSchema,
};

export const informationInterviewCombat = {
  uiSchema: informationInterviewCombatUISchema,
  schema: informationInterviewCombatSchema,
};

export const informationInterviewAssault = {
  uiSchema: informationInterviewAssaultUISchema,
  schema: informationInterviewAssaultSchema,
};

export const stressfulIncSecDesc = {
  uiSchema: stressfulIncSecDescUISchema,
  schema: stressfulIncSecDescSchema,
};

export const otherSourcesSecondary = {
  uiSchema: otherSourcesSecondaryUISchema,
  schema: otherSourcesSecondarySchema,
};

export const privateMedicalTreatmentSecondary = {
  uiSchema: privateMedicalTreatmentSecondaryUISchema,
  schema: privateMedicalTreatmentSecondarySchema,
};

export const requestingStatementsSecondary = {
  uiSchema: requestingStatementsSecondaryUISchema,
  schema: requestingStatementsSecondarySchema,
};

export const uploadSupportingDocumentsSecondary = {
  uiSchema: uploadSupportingDocumentsSecondaryUISchema,
  schema: uploadSupportingDocumentsSecondarySchema,
};
