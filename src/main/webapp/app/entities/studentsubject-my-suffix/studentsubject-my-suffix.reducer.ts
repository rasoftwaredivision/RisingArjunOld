import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IStudentsubjectMySuffix, defaultValue } from 'app/shared/model/studentsubject-my-suffix.model';

export const ACTION_TYPES = {
  FETCH_STUDENTSUBJECT_LIST: 'studentsubject/FETCH_STUDENTSUBJECT_LIST',
  FETCH_STUDENTSUBJECT: 'studentsubject/FETCH_STUDENTSUBJECT',
  CREATE_STUDENTSUBJECT: 'studentsubject/CREATE_STUDENTSUBJECT',
  UPDATE_STUDENTSUBJECT: 'studentsubject/UPDATE_STUDENTSUBJECT',
  DELETE_STUDENTSUBJECT: 'studentsubject/DELETE_STUDENTSUBJECT',
  RESET: 'studentsubject/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IStudentsubjectMySuffix>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type StudentsubjectMySuffixState = Readonly<typeof initialState>;

// Reducer

export default (state: StudentsubjectMySuffixState = initialState, action): StudentsubjectMySuffixState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_STUDENTSUBJECT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_STUDENTSUBJECT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_STUDENTSUBJECT):
    case REQUEST(ACTION_TYPES.UPDATE_STUDENTSUBJECT):
    case REQUEST(ACTION_TYPES.DELETE_STUDENTSUBJECT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_STUDENTSUBJECT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_STUDENTSUBJECT):
    case FAILURE(ACTION_TYPES.CREATE_STUDENTSUBJECT):
    case FAILURE(ACTION_TYPES.UPDATE_STUDENTSUBJECT):
    case FAILURE(ACTION_TYPES.DELETE_STUDENTSUBJECT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_STUDENTSUBJECT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_STUDENTSUBJECT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_STUDENTSUBJECT):
    case SUCCESS(ACTION_TYPES.UPDATE_STUDENTSUBJECT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_STUDENTSUBJECT):
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

const apiUrl = 'api/studentsubjects';

// Actions

export const getEntities: ICrudGetAllAction<IStudentsubjectMySuffix> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_STUDENTSUBJECT_LIST,
  payload: axios.get<IStudentsubjectMySuffix>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IStudentsubjectMySuffix> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_STUDENTSUBJECT,
    payload: axios.get<IStudentsubjectMySuffix>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IStudentsubjectMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_STUDENTSUBJECT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IStudentsubjectMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_STUDENTSUBJECT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IStudentsubjectMySuffix> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_STUDENTSUBJECT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
