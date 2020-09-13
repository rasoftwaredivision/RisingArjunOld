import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEmployeeMySuffix, defaultValue } from 'app/shared/model/employee-my-suffix.model';

export const ACTION_TYPES = {
  FETCH_EMPLOYEE_LIST: 'employee/FETCH_EMPLOYEE_LIST',
  FETCH_EMPLOYEE: 'employee/FETCH_EMPLOYEE',
  CREATE_EMPLOYEE: 'employee/CREATE_EMPLOYEE',
  UPDATE_EMPLOYEE: 'employee/UPDATE_EMPLOYEE',
  DELETE_EMPLOYEE: 'employee/DELETE_EMPLOYEE',
  SET_BLOB: 'employee/SET_BLOB',
  RESET: 'employee/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEmployeeMySuffix>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type EmployeeMySuffixState = Readonly<typeof initialState>;

// Reducer

export default (state: EmployeeMySuffixState = initialState, action): EmployeeMySuffixState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EMPLOYEE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EMPLOYEE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_EMPLOYEE):
    case REQUEST(ACTION_TYPES.UPDATE_EMPLOYEE):
    case REQUEST(ACTION_TYPES.DELETE_EMPLOYEE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_EMPLOYEE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EMPLOYEE):
    case FAILURE(ACTION_TYPES.CREATE_EMPLOYEE):
    case FAILURE(ACTION_TYPES.UPDATE_EMPLOYEE):
    case FAILURE(ACTION_TYPES.DELETE_EMPLOYEE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPLOYEE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPLOYEE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_EMPLOYEE):
    case SUCCESS(ACTION_TYPES.UPDATE_EMPLOYEE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_EMPLOYEE):
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

const apiUrl = 'api/employees';

// Actions

export const getEntities: ICrudGetAllAction<IEmployeeMySuffix> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_EMPLOYEE_LIST,
  payload: axios.get<IEmployeeMySuffix>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IEmployeeMySuffix> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EMPLOYEE,
    payload: axios.get<IEmployeeMySuffix>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IEmployeeMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EMPLOYEE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEmployeeMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EMPLOYEE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEmployeeMySuffix> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EMPLOYEE,
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
