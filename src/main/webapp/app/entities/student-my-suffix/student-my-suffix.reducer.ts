import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IStudentMySuffix, defaultValue } from 'app/shared/model/student-my-suffix.model';

export const ACTION_TYPES = {
  FETCH_STUDENT_LIST: 'student/FETCH_STUDENT_LIST',
  FETCH_STUDENT: 'student/FETCH_STUDENT',
  CREATE_STUDENT: 'student/CREATE_STUDENT',
  UPDATE_STUDENT: 'student/UPDATE_STUDENT',
  DELETE_STUDENT: 'student/DELETE_STUDENT',
  SET_BLOB: 'student/SET_BLOB',
  RESET: 'student/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IStudentMySuffix>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type StudentMySuffixState = Readonly<typeof initialState>;

// Reducer

export default (state: StudentMySuffixState = initialState, action): StudentMySuffixState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_STUDENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_STUDENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_STUDENT):
    case REQUEST(ACTION_TYPES.UPDATE_STUDENT):
    case REQUEST(ACTION_TYPES.DELETE_STUDENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_STUDENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_STUDENT):
    case FAILURE(ACTION_TYPES.CREATE_STUDENT):
    case FAILURE(ACTION_TYPES.UPDATE_STUDENT):
    case FAILURE(ACTION_TYPES.DELETE_STUDENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_STUDENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_STUDENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_STUDENT):
    case SUCCESS(ACTION_TYPES.UPDATE_STUDENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_STUDENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.SET_BLOB:
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType
        }
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/students';

// Actions

export const getEntities: ICrudGetAllAction<IStudentMySuffix> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_STUDENT_LIST,
    payload: axios.get<IStudentMySuffix>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IStudentMySuffix> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_STUDENT,
    payload: axios.get<IStudentMySuffix>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IStudentMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_STUDENT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IStudentMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_STUDENT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IStudentMySuffix> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_STUDENT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType
  }
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
