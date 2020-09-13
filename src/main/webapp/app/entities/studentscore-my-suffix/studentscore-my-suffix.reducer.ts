import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IStudentscoreMySuffix, defaultValue } from 'app/shared/model/studentscore-my-suffix.model';

export const ACTION_TYPES = {
  FETCH_STUDENTSCORE_LIST: 'studentscore/FETCH_STUDENTSCORE_LIST',
  FETCH_STUDENTSCORE: 'studentscore/FETCH_STUDENTSCORE',
  CREATE_STUDENTSCORE: 'studentscore/CREATE_STUDENTSCORE',
  UPDATE_STUDENTSCORE: 'studentscore/UPDATE_STUDENTSCORE',
  DELETE_STUDENTSCORE: 'studentscore/DELETE_STUDENTSCORE',
  RESET: 'studentscore/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IStudentscoreMySuffix>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type StudentscoreMySuffixState = Readonly<typeof initialState>;

// Reducer

export default (state: StudentscoreMySuffixState = initialState, action): StudentscoreMySuffixState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_STUDENTSCORE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_STUDENTSCORE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_STUDENTSCORE):
    case REQUEST(ACTION_TYPES.UPDATE_STUDENTSCORE):
    case REQUEST(ACTION_TYPES.DELETE_STUDENTSCORE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_STUDENTSCORE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_STUDENTSCORE):
    case FAILURE(ACTION_TYPES.CREATE_STUDENTSCORE):
    case FAILURE(ACTION_TYPES.UPDATE_STUDENTSCORE):
    case FAILURE(ACTION_TYPES.DELETE_STUDENTSCORE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_STUDENTSCORE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_STUDENTSCORE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_STUDENTSCORE):
    case SUCCESS(ACTION_TYPES.UPDATE_STUDENTSCORE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_STUDENTSCORE):
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

const apiUrl = 'api/studentscores';

// Actions

export const getEntities: ICrudGetAllAction<IStudentscoreMySuffix> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_STUDENTSCORE_LIST,
    payload: axios.get<IStudentscoreMySuffix>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IStudentscoreMySuffix> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_STUDENTSCORE,
    payload: axios.get<IStudentscoreMySuffix>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IStudentscoreMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_STUDENTSCORE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IStudentscoreMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_STUDENTSCORE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IStudentscoreMySuffix> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_STUDENTSCORE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
