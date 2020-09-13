import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IScholarshipMySuffix, defaultValue } from 'app/shared/model/scholarship-my-suffix.model';

export const ACTION_TYPES = {
  FETCH_SCHOLARSHIP_LIST: 'scholarship/FETCH_SCHOLARSHIP_LIST',
  FETCH_SCHOLARSHIP: 'scholarship/FETCH_SCHOLARSHIP',
  CREATE_SCHOLARSHIP: 'scholarship/CREATE_SCHOLARSHIP',
  UPDATE_SCHOLARSHIP: 'scholarship/UPDATE_SCHOLARSHIP',
  DELETE_SCHOLARSHIP: 'scholarship/DELETE_SCHOLARSHIP',
  RESET: 'scholarship/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IScholarshipMySuffix>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ScholarshipMySuffixState = Readonly<typeof initialState>;

// Reducer

export default (state: ScholarshipMySuffixState = initialState, action): ScholarshipMySuffixState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SCHOLARSHIP_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SCHOLARSHIP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SCHOLARSHIP):
    case REQUEST(ACTION_TYPES.UPDATE_SCHOLARSHIP):
    case REQUEST(ACTION_TYPES.DELETE_SCHOLARSHIP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_SCHOLARSHIP_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SCHOLARSHIP):
    case FAILURE(ACTION_TYPES.CREATE_SCHOLARSHIP):
    case FAILURE(ACTION_TYPES.UPDATE_SCHOLARSHIP):
    case FAILURE(ACTION_TYPES.DELETE_SCHOLARSHIP):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_SCHOLARSHIP_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_SCHOLARSHIP):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SCHOLARSHIP):
    case SUCCESS(ACTION_TYPES.UPDATE_SCHOLARSHIP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SCHOLARSHIP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/scholarships';

// Actions

export const getEntities: ICrudGetAllAction<IScholarshipMySuffix> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_SCHOLARSHIP_LIST,
  payload: axios.get<IScholarshipMySuffix>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IScholarshipMySuffix> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SCHOLARSHIP,
    payload: axios.get<IScholarshipMySuffix>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IScholarshipMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SCHOLARSHIP,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IScholarshipMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SCHOLARSHIP,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IScholarshipMySuffix> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SCHOLARSHIP,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
