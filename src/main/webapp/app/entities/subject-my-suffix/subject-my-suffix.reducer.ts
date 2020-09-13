import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISubjectMySuffix, defaultValue } from 'app/shared/model/subject-my-suffix.model';

export const ACTION_TYPES = {
  FETCH_SUBJECT_LIST: 'subject/FETCH_SUBJECT_LIST',
  FETCH_SUBJECT: 'subject/FETCH_SUBJECT',
  CREATE_SUBJECT: 'subject/CREATE_SUBJECT',
  UPDATE_SUBJECT: 'subject/UPDATE_SUBJECT',
  DELETE_SUBJECT: 'subject/DELETE_SUBJECT',
  RESET: 'subject/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISubjectMySuffix>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type SubjectMySuffixState = Readonly<typeof initialState>;

// Reducer

export default (state: SubjectMySuffixState = initialState, action): SubjectMySuffixState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SUBJECT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SUBJECT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SUBJECT):
    case REQUEST(ACTION_TYPES.UPDATE_SUBJECT):
    case REQUEST(ACTION_TYPES.DELETE_SUBJECT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_SUBJECT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SUBJECT):
    case FAILURE(ACTION_TYPES.CREATE_SUBJECT):
    case FAILURE(ACTION_TYPES.UPDATE_SUBJECT):
    case FAILURE(ACTION_TYPES.DELETE_SUBJECT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_SUBJECT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_SUBJECT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SUBJECT):
    case SUCCESS(ACTION_TYPES.UPDATE_SUBJECT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SUBJECT):
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

const apiUrl = 'api/subjects';

// Actions

export const getEntities: ICrudGetAllAction<ISubjectMySuffix> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_SUBJECT_LIST,
  payload: axios.get<ISubjectMySuffix>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ISubjectMySuffix> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SUBJECT,
    payload: axios.get<ISubjectMySuffix>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ISubjectMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SUBJECT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISubjectMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SUBJECT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISubjectMySuffix> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SUBJECT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
