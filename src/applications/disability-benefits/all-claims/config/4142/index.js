import { hasPrivateEvidence, isNotUploadingPrivateMedical } from '../../utils';
import {
  privateMedicalRecords,
  privateMedicalRecordsRelease,
} from '../../pages';

import environment from '../../../../../platform/utilities/environment';

export default function() {
  let configObj = {};

  if (!environment.isProduction()) {
    configObj = {
      privateMedicalRecords: {
        title: 'Private Medical Records',
        path: 'supporting-evidence/private-medical-records',
        depends: hasPrivateEvidence,
        uiSchema: privateMedicalRecords.uiSchema,
        schema: privateMedicalRecords.schema,
      },
      privateMedicalRecordsRelease: {
        title: 'Private Medical Records',
        path: 'supporting-evidence/private-medical-records-release',
        depends: formData =>
          hasPrivateEvidence(formData) &&
          isNotUploadingPrivateMedical(formData),
        uiSchema: privateMedicalRecordsRelease.uiSchema,
        schema: privateMedicalRecordsRelease.schema,
      },
    };
  }

  return configObj;
}
