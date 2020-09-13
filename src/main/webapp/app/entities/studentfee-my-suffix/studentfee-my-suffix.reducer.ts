import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IStudentfeeMySuffix, defaultValue } from 'app/shared/model/studentfee-my-suffix.model';

export const ACTION_TYPES = {
  FETCH_STUDENTFEE_LIST: 'studentfee/FETCH_STUDENTFEE_LIST',
  FETCH_STUDENTFEE: 'studentfee/FETCH_STUDENTFEE',
  CREATE_STUDENTFEE: 'studentfee/CREATE_STUDENTFEE',
  UPDATE_STUDENTFEE: 'studentfee/UPDATE_STUDENTFEE',
  DELETE_STUDENTFEE: 'studentfee/DELETE_STUDENTFEE',
  RESET: 'studentfee/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IStudentfeeMySuffix>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type StudentfeeMySuffixState = Readonly<typeof initialState>;

// Reducer

export default (state: StudentfeeMySuffixState = initialState, action): StudentfeeMySuffixState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_STUDENTFEE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_STUDENTFEE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_STUDENTFEE):
    case REQUEST(ACTION_TYPES.UPDATE_STUDENTFEE):
    case REQUEST(ACTION_TYPES.DELETE_STUDENTFEE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_STUDENTFEE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_STUDENTFEE):
    case FAILURE(ACTION_TYPES.CREATE_STUDENTFEE):
    case FAILURE(ACTION_TYPES.UPDATE_STUDENTFEE):
    case FAILURE(ACTION_TYPES.DELETE_STUDENTFEE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_STUDENTFEE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_STUDENTFEE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_STUDENTFEE):
    case SUCCESS(ACTION_TYPES.UPDATE_STUDENTFEE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_STUDENTFEE):
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

const apiUrl = 'api/studentfees';

// Actions

export const getEntities: ICrudGetAllAction<IStudentfeeMySuffix> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_STUDENTFEE_LIST,
    payload: axios.get<IStudentfeeMySuffix>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IStudentfeeMySuffix> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_STUDENTFEE,
    payload: axios.get<IStudentfeeMySuffix>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IStudentfeeMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_STUDENTFEE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IStudentfeeMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_STUDENTFEE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IStudentfeeMySuffix> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_STUDENTFEE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
