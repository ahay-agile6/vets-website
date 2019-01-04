import {
  individualsInvolved,
  individualsInvolvedFollowUp,
  incidentSupport,
  incidentDate,
  incidentLocation,
  secondaryIncidentDate,
  secondaryUploadSources,
  secondaryUploadSourcesChoice,
  secondaryIncidentLocation,
  incidentUnitAssignment,
  secondaryIncidentUnitAssignment,
  incidentDescription,
  secondaryIncidentDescription,
  secondaryIncidentPermissionNotice,
  secondaryIncidentAuthorities,
  ptsdAdditionalEvents,
  ptsdSecondaryAdditionalEvents,
  medals,
  secondaryOtherSources,
  secondaryOtherSourcesHelp,
  newPTSDFollowUp,
  ptsdWalkthroughChoice781,
  uploadPtsdDocuments,
  finalIncident,
  additionalRemarks781,
  conclusionCombat,
  ptsdWalkthroughChoice781a,
  uploadPersonalPtsdDocuments,
  secondaryFinalIncident,
  physicalHealthChanges,
  mentalHealthChanges,
  workBehaviorChanges,
  socialBehaviorChanges,
  additionalBehaviorChanges,
  conclusionAssault,
  choosePtsdType,
} from '../../pages';

import {
  isAnswering781Questions,
  isAnswering781aQuestions,
  isUploading781aSupportingDocuments,
  isAddingIndividuals,
  wantsHelpWithOtherSourcesSecondary,
  wantsHelpWithPrivateRecordsSecondary,
  wantsHelpRequestingStatementsSecondary,
  capitalizeEachWord,
  needsToEnter781,
  isUploading781Form,
  showPtsdCombatConclusion,
  needsToEnter781a,
  isUploading781aForm,
  showPtsdAssaultConclusion,
} from '../../utils';

import { hasNewPtsdDisability } from '../../validations';

import { ptsd781NameTitle } from '../../content/ptsdClassification';
import { ptsdFirstIncidentIntro } from '../../content/ptsdFirstIncidentIntro';
import { PTSD_INCIDENT_ITERATION } from '../../constants';

import environment from '../../../../../platform/utilities/environment';

const numberToWords = {
  0: 'First',
  1: 'Second',
  2: 'Third',
  3: 'Fourth',
  4: 'Fifth',
  5: 'Sixth',
  6: 'Seventh',
  7: 'Eighth',
  8: 'Ninth',
  9: 'Tenth',
};

const REVIEW_TITLE_TOKEN = '[index]';

/**
 * This removes "First " from the title if there is only one incident.
 *
 * @param {string} [title] Displayed as the section summary header.
 * If contains REVIEW_TITLE_TOKEN and there is more than one incident, replaces REVIEW_TITLE_TOKEN with numberToWords[index].toLowerCase().
 * If does not contain REVIEW_TITLE_TOKEN appends numberToWords[index] to front of title.
 * @param {int} index Index of numberToWords
 * @param {string} formType Indicates what type of form is calling function; 781, 781a
 * @returns {object} title
 */
const setReviewTitle = (title, index, formType) => formData => {
  const additionalIncidentKeyIndex = index === 0 ? index : index - 1;
  const additionalIncidentKey = `view:enterAdditional${
    formType === '781a' ? 'Secondary' : ''
  }Events${additionalIncidentKeyIndex}`;

  let formattedTitle = title;

  if (formData[additionalIncidentKey]) {
    if (title.search(REVIEW_TITLE_TOKEN) > 0) {
      formattedTitle = title.replace(
        REVIEW_TITLE_TOKEN,
        ` ${numberToWords[index].toLowerCase()} `,
      );
    } else {
      // If does not contain REVIEW_TITLE_TOKEN put numberToWords[index] at start of title
      formattedTitle = `${numberToWords[index]} ${title}`;
    }
  } else {
    formattedTitle = title.replace(REVIEW_TITLE_TOKEN, ' '); // can do this without a search check
  }

  return formattedTitle;
};

function createFormConfig781(iterations) {
  let configObj = {};
  const formType = '781';
  for (let index = 0; index < iterations; index++) {
    configObj = {
      ...configObj,
      // 781 PAGE CONFIGS GO HERE
      // 3.  MEDALS OR  CITATIONS
      [`medals${index}`]: {
        title: setReviewTitle(
          `Medals or citations associated with${REVIEW_TITLE_TOKEN}event`,
          index,
          formType,
        ),
        path: `disabilities/ptsd-medals-${index}`,
        depends: isAnswering781Questions(index),
        uiSchema: medals.uiSchema(index),
        schema: medals.schema(index),
      },
      // 4. EVENT DATE
      [`incidentDate${index}`]: {
        title: setReviewTitle(
          `Date of${REVIEW_TITLE_TOKEN}event`,
          index,
          formType,
        ),
        path: `disabilities/ptsd-incident-date-${index}`,
        depends: isAnswering781Questions(index),
        uiSchema: incidentDate.uiSchema(index),
        schema: incidentDate.schema(index),
      },
      // 5. UNIT ASSIGNMENT
      [`incidentUnitAssignment${index}`]: {
        title: setReviewTitle(
          `Unit assignment for${REVIEW_TITLE_TOKEN}event`,
          index,
          formType,
        ),
        path: `disabilities/ptsd-incident-unit-assignment-${index}`,
        depends: isAnswering781Questions(index),
        uiSchema: incidentUnitAssignment.uiSchema(index),
        schema: incidentUnitAssignment.schema(index),
      },
      // 6. EVENT LOCATION
      [`incidentLocation${index}`]: {
        title: setReviewTitle(
          `Location of${REVIEW_TITLE_TOKEN}event`,
          index,
          formType,
        ),
        path: `disabilities/ptsd-incident-location-${index}`,
        depends: isAnswering781Questions(index),
        uiSchema: incidentLocation.uiSchema(index),
        schema: incidentLocation.schema(index),
      },
      // 7. INDIVIDUALS INVOLVED Y/N
      [`individualsInvolved${index}`]: {
        title: setReviewTitle(
          `Were other people involved in the${REVIEW_TITLE_TOKEN}event?`,
          index,
          formType,
        ),
        path: `disabilities/ptsd-individuals-involved-${index}`,
        depends: isAnswering781Questions(index),
        uiSchema: individualsInvolved.uiSchema(index),
        schema: individualsInvolved.schema(index),
      },
      // 8. TAKE A BREAK
      [`incidentSupport${index}`]: {
        title: setReviewTitle('PTSD incident support', index, formType),
        path: `disabilities/ptsd-incident-support-${index}`,
        depends: isAnswering781Questions(index),
        uiSchema: incidentSupport.uiSchema('781'),
        schema: incidentSupport.schema,
      },
      // 9. INDIVIDUALS INVOLVED DETAILS (if Yes for step 7)
      [`individualsInvolvedFollowUp${index}`]: {
        title: setReviewTitle(
          'PTSD incident individuals involved',
          index,
          formType,
        ),
        path: `disabilities/ptsd-individuals-involved-questions-${index}`,
        depends: isAddingIndividuals(index),
        uiSchema: individualsInvolvedFollowUp.uiSchema(index),
        schema: individualsInvolvedFollowUp.schema(index),
      },
      // 10. TAKE A BREAK
      [`incidentSupportAdditional${index}`]: {
        title: setReviewTitle(
          'PTSD incident support additional break',
          index,
          formType,
        ),
        path: `disabilities/ptsd-incident-support-additional-break-${index}`,
        depends: isAddingIndividuals(index),
        uiSchema: incidentSupport.uiSchema('781'),
        schema: incidentSupport.schema,
      },
      // 11. EVENT DESCRIPTION
      [`incidentDescription${index}`]: {
        title: setReviewTitle(
          `Description of${REVIEW_TITLE_TOKEN}event`,
          index,
          formType,
        ),
        path: `disabilities/ptsd-incident-description-${index}`,
        depends: isAnswering781Questions(index),
        uiSchema: incidentDescription.uiSchema(index),
        schema: incidentDescription.schema(index),
      },
      // 12. ADDITIONAL EVENTS OR SITUATIONS Y/N
      // This should be the last page in the config loop
      [`ptsdAdditionalEvents${index}`]: {
        title: 'Add another event or situation?',
        path: `disabilities/ptsd-additional-events-${index}`,
        depends: isAnswering781Questions(index),
        uiSchema: ptsdAdditionalEvents.uiSchema(index),
        schema: ptsdAdditionalEvents.schema(index),
      },
    };
  }

  return configObj;
}

function createFormConfig781a(iterations) {
  let configObj = {};
  const formType = '781a';
  for (let index = 0; index < iterations; index++) {
    configObj = {
      ...configObj,
      // 781a PAGE CONFIGS GO HERE
      // 3. Event Date
      [`secondaryIncidentDate${index}`]: {
        title: setReviewTitle(
          `Date of${REVIEW_TITLE_TOKEN}event`,
          index,
          formType,
        ),
        path: `disabilities/ptsd-secondary-incident-date-${index}`,
        depends: isAnswering781aQuestions(index),
        uiSchema: secondaryIncidentDate.uiSchema(index),
        schema: secondaryIncidentDate.schema(index),
      },
      // 4. Unit Assignment
      [`secondaryIncidentUnitAssignment${index}`]: {
        title: setReviewTitle(
          `Unit assignment for${REVIEW_TITLE_TOKEN}event`,
          index,
          formType,
        ),
        path: `disabilities/ptsd-secondary-incident-unit-assignment-${index}`,
        depends: isAnswering781aQuestions(index),
        uiSchema: secondaryIncidentUnitAssignment.uiSchema(index),
        schema: secondaryIncidentUnitAssignment.schema(index),
      },
      // 5. Event Location
      [`secondaryIncidentLocation${index}`]: {
        title: setReviewTitle(
          `Location of${REVIEW_TITLE_TOKEN}event`,
          index,
          formType,
        ),
        path: `disabilities/ptsd-secondary-incident-location-${index}`,
        depends: isAnswering781aQuestions(index),
        uiSchema: secondaryIncidentLocation.uiSchema(index),
        schema: secondaryIncidentLocation.schema(index),
      },
      // 6. Take a break
      [`secondaryIncidentSupport${index}`]: {
        title: setReviewTitle('PTSD assault incident support', index, formType),
        path: `disabilities/ptsd-secondary-incident-support-${index}`,
        depends: isAnswering781aQuestions(index),
        uiSchema: incidentSupport.uiSchema('781a'),
        schema: incidentSupport.schema,
      },
      // 7. Event Description
      [`secondaryIncidentDescription${index}`]: {
        title: setReviewTitle(
          `Description of${REVIEW_TITLE_TOKEN}event`,
          index,
          formType,
        ),
        path: `disabilities/ptsd-secondary-incident-description-${index}`,
        depends: isAnswering781aQuestions(index),
        uiSchema: secondaryIncidentDescription.uiSchema(index),
        schema: secondaryIncidentDescription.schema(index),
      },
      // 8. OTHER SOURCES OF INFORMATION Y/N
      [`secondaryOtherSources${index}`]: {
        title: setReviewTitle(
          `781a PTSD Other sources of information`,
          index,
          formType,
        ),
        path: `disabilities/ptsd-secondary-other-sources-${index}`,
        depends: isAnswering781aQuestions(index),
        uiSchema: secondaryOtherSources.uiSchema(index),
        schema: secondaryOtherSources.schema(index),
      },
      [`secondaryOtherSourcesHelp${index}`]: {
        title: setReviewTitle(
          `781a PTSD Help with other sources of information`,
          index,
          formType,
        ),
        path: `disabilities/ptsd-secondary-other-sources-help-${index}`,
        depends: wantsHelpWithOtherSourcesSecondary(index),
        uiSchema: secondaryOtherSourcesHelp.uiSchema(index),
        schema: secondaryOtherSourcesHelp.schema(index),
      },
      // 8a. OTHER SOURCES OF INFORMATION: NEED HELP
      // If Yes, then PMR explanation page
      [`secondaryIncidentPermissionNotice${index}`]: {
        title: setReviewTitle(
          'PTSD assault permission notice',
          index,
          formType,
        ),
        path: `disabilities/ptsd-secondary-permission-notice-${index}`,
        depends: wantsHelpWithPrivateRecordsSecondary(index),
        uiSchema: secondaryIncidentPermissionNotice.uiSchema,
        schema: secondaryIncidentPermissionNotice.schema,
      },
      // 8b. OTHER SOURCES OF INFORMATION: REPORTS FROM AUTHORITIES
      [`secondaryIncidentAuthorities${index}`]: {
        title: 'Reports from authorities',
        path: `disabilities/ptsd-secondary-authorities-${index}`,
        depends: wantsHelpRequestingStatementsSecondary(index),
        uiSchema: secondaryIncidentAuthorities.uiSchema(index),
        schema: secondaryIncidentAuthorities.schema(index),
      },
      // 9. SUPPORTING DOCUMENTS UPLOAD
      [`secondaryUploadSourcesChoice${index}`]: {
        title: `${
          numberToWords[index]
        } 781a PTSD Upload Supporting Sources Choice`,
        path: `disabilities/ptsd-secondary-upload-supporting-sources-choice-${index}`,
        depends: isAnswering781aQuestions(index),
        uiSchema: secondaryUploadSourcesChoice.uiSchema(index),
        schema: secondaryUploadSourcesChoice.schema(index),
      },
      [`secondaryUploadSources${index}`]: {
        title: setReviewTitle(
          '781a PTSD Upload Supporting Sources',
          index,
          formType,
        ),
        path: `disabilities/ptsd-secondary-upload-supporting-sources-${index}`,
        depends: isUploading781aSupportingDocuments(index),
        uiSchema: secondaryUploadSources.uiSchema(index),
        schema: secondaryUploadSources.schema(index),
      },
      // 10. ADDITIONAL EVENTS OR SITUATIONS Y/N
      // This should be the last page in the config loop
      [`ptsdSecondaryAdditionalEvents${index}`]: {
        title: 'Add another event or situation?',
        path: `disabilities/ptsd-781a-additional-events-${index}`,
        depends: isAnswering781aQuestions(index),
        uiSchema: ptsdSecondaryAdditionalEvents.uiSchema(index),
        schema: ptsdSecondaryAdditionalEvents.schema(index),
      },
    };
  }
  return configObj;
}

export default function() {
  let configObj = {};

  if (!environment.isProduction()) {
    configObj = {
      // 781/a - 1. REVIEW INTRODUCTION PAGE
      newPTSDFollowUp: {
        title: formData => capitalizeEachWord(formData.condition),
        path: 'new-disabilities/ptsd-intro',
        depends: hasNewPtsdDisability,
        uiSchema: newPTSDFollowUp.uiSchema,
        schema: newPTSDFollowUp.schema,
      },
      // 781/a - 2. SELECT ONE (OR ALL) OF THE PTSD TYPES LISTED
      choosePtsdType: {
        title: 'Factors that contributed to PTSD',
        path: 'new-disabilities/ptsd-type',
        depends: hasNewPtsdDisability,
        uiSchema: choosePtsdType.uiSchema,
        schema: choosePtsdType.schema,
      },
      // 781 - 2a.  SELECT UPLOAD OPTION
      // 781 - 2b. SELECT 'I WANT TO ANSWER QUESTIONS' AND LAUNCH INTERVIEW
      ptsdWalkthroughChoice781: {
        title: 'Answer online questions or upload paper 21-0781',
        path: 'new-disabilities/walkthrough-781-choice',
        depends: formData =>
          hasNewPtsdDisability(formData) && needsToEnter781(formData),
        uiSchema: ptsdWalkthroughChoice781.uiSchema,
        schema: ptsdWalkthroughChoice781.schema,
      },
      incidentIntro: {
        title: 'PTSD intro to questions',
        path: 'new-disabilities/ptsd-intro-to-questions',
        depends: isAnswering781Questions(0),
        uiSchema: {
          'ui:title': ptsd781NameTitle,
          'ui:description': ptsdFirstIncidentIntro,
        },
        schema: {
          type: 'object',
          properties: {},
        },
      },
      // 781 - Pages 3 - 12 (Event Loop)
      ...createFormConfig781(PTSD_INCIDENT_ITERATION),
      // 781 - ?. ???
      uploadPtsdDocuments781: {
        title: 'Upload PTSD Documents - 781',
        path: 'new-disabilities/ptsd-781-upload',
        depends: formData =>
          hasNewPtsdDisability(formData) &&
          needsToEnter781(formData) &&
          isUploading781Form(formData),
        uiSchema: uploadPtsdDocuments.uiSchema,
        schema: uploadPtsdDocuments.schema,
      },
      // 781 - 13. ADDITIONAL EVENTS (ONLY DISPLAYS FOR 4TH EVENT)
      finalIncident: {
        path: 'new-disabilities/ptsd-additional-incident',
        title: 'Additional PTSD event',
        depends: isAnswering781Questions(PTSD_INCIDENT_ITERATION),
        uiSchema: finalIncident.uiSchema,
        schema: finalIncident.schema,
      },
      // 781 - 14. ADDITIONAL REMARKS
      additionalRemarks781: {
        title: 'Additional Remarks',
        path: 'new-disabilities/additional-remarks-781',
        depends: isAnswering781Questions(0),
        uiSchema: additionalRemarks781.uiSchema,
        schema: additionalRemarks781.schema,
      },
      // 781 - 15. PTSD CONCLUSION
      conclusionCombat: {
        path: 'ptsd-conclusion-combat',
        title: 'PTSD combat conclusion',
        depends: showPtsdCombatConclusion,
        uiSchema: conclusionCombat.uiSchema,
        schema: conclusionCombat.schema,
      },
      // 781a - 2a. SELECT UPLOAD OPTION
      // 781a - 2b. SELECT 'I WANT TO ANSWER QUESTIONS' AND LAUNCH INTERVIEW
      ptsdWalkthroughChoice781a: {
        title: 'Answer online questions or upload paper 21-0781A?',
        path: 'new-disabilities/walkthrough-781a-choice',
        depends: formData =>
          hasNewPtsdDisability(formData) && needsToEnter781a(formData),
        uiSchema: ptsdWalkthroughChoice781a.uiSchema,
        schema: ptsdWalkthroughChoice781a.schema,
      },
      // 781a - Pages 3 - 10 (Event Loop)
      ...createFormConfig781a(PTSD_INCIDENT_ITERATION),
      // 781a - ?. ???
      uploadPtsdDocuments781a: {
        title: 'Upload PTSD Documents - 781a',
        path: 'new-disabilities/ptsd-781a-upload',
        depends: formData =>
          hasNewPtsdDisability(formData) &&
          needsToEnter781a(formData) &&
          isUploading781aForm(formData),
        uiSchema: uploadPersonalPtsdDocuments.uiSchema,
        schema: uploadPersonalPtsdDocuments.schema,
      },
      // 781a - 11. ADDITIONAL EVENTS (ONLY DISPLAYS FOR 4TH EVENT)
      secondaryFinalIncident: {
        path: 'new-disabilities/ptsd-assault-additional-incident',
        title: 'Additional assault PTSD event',
        depends: isAnswering781aQuestions(PTSD_INCIDENT_ITERATION),
        uiSchema: secondaryFinalIncident.uiSchema,
        schema: secondaryFinalIncident.schema,
      },
      // 781a - 12. BEHAVIOR CHANGES: PHYSICAL
      physicalHealthChanges: {
        title: 'Additional changes in behavior - physical',
        path: 'new-disabilities/ptsd-781a-physical-changes',
        depends: isAnswering781aQuestions(0),
        uiSchema: physicalHealthChanges.uiSchema,
        schema: physicalHealthChanges.schema,
      },
      // 781a - 13. BEHAVIOR CHANGES: MENTAL/SUBSTANCE ABUSE
      mentalHealthChanges: {
        title: 'Additional changes in behavior - mental/substance abuse',
        path: 'new-disabilities/ptsd-781a-mental-changes',
        depends: isAnswering781aQuestions(0),
        uiSchema: mentalHealthChanges.uiSchema,
        schema: mentalHealthChanges.schema,
      },
      // 781a - 14. BEHAVIOR CHANGES: AT WORK
      workBehaviorChanges: {
        title: 'Additional changes in behavior - work',
        path: 'new-disabilities/ptsd-781a-work-changes',
        depends: isAnswering781aQuestions(0),
        uiSchema: workBehaviorChanges.uiSchema,
        schema: workBehaviorChanges.schema,
      },
      // 781a - 15. BEHAVIOR CHANGES: SOCIAL
      socialBehaviorChanges: {
        title: 'Additional changes in behavior - social',
        path: 'new-disabilities/ptsd-781a-social-changes',
        depends: isAnswering781aQuestions(0),
        uiSchema: socialBehaviorChanges.uiSchema,
        schema: socialBehaviorChanges.schema,
      },
      // 781a - 16. BEHAVIOR CHANGES: ADDITIONAL INFORMATION
      additionalBehaviorChanges: {
        title: 'Additional changes in behavior - more information',
        path: 'new-disabilities/ptsd-781a-additional-changes',
        depends: isAnswering781aQuestions(0),
        uiSchema: additionalBehaviorChanges.uiSchema,
        schema: additionalBehaviorChanges.schema,
      },
      // 781a - 17. PTSD CONCLUSION
      conclusionAssault: {
        path: 'ptsd-conclusion-assault',
        title: 'PTSD assault conclusion',
        depends: showPtsdAssaultConclusion,
        uiSchema: conclusionAssault.uiSchema,
        schema: conclusionAssault.schema,
      },
    };
  }

  return configObj;
}
