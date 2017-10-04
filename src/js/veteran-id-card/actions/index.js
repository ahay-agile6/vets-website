import { apiRequest } from '../../common/helpers/api';

export const ATTRS_FETCHING = 'ATTRS_FETCHING';
export const ATTRS_SUCCESS = 'ATTRS_SUCCESS';
export const ATTRS_FAILURE = 'ATTRS_FAILURE';

export function initiateIdRequest() {
  return dispatch => {
    dispatch({ type: ATTRS_FETCHING });

    apiRequest('/id_card/attributes',
      {},
      (response) => dispatch({
        type: ATTRS_SUCCESS,
        vicUrl: response.url,
        traits: response.traits
      }),
      (response) => dispatch({
        type: ATTRS_FAILURE,
        errors: response.errors
      })
    );
  };
}
