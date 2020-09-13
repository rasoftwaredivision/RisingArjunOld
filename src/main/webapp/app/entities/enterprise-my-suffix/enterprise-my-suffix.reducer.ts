import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEnterpriseMySuffix, defaultValue } from 'app/shared/model/enterprise-my-suffix.model';

export const ACTION_TYPES = {
  FETCH_ENTERPRISE_LIST: 'enterprise/FETCH_ENTERPRISE_LIST',
  FETCH_ENTERPRISE: 'enterprise/FETCH_ENTERPRISE',
  CREATE_ENTERPRISE: 'enterprise/CREATE_ENTERPRISE',
  UPDATE_ENTERPRISE: 'enterprise/UPDATE_ENTERPRISE',
  DELETE_ENTERPRISE: 'enterprise/DELETE_ENTERPRISE',
  SET_BLOB: 'enterprise/SET_BLOB',
  RESET: 'enterprise/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEnterpriseMySuffix>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type EnterpriseMySuffixState = Readonly<typeof initialState>;

// Reducer

export default (state: EnterpriseMySuffixState = initialState, action): EnterpriseMySuffixState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ENTERPRISE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ENTERPRISE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ENTERPRISE):
    case REQUEST(ACTION_TYPES.UPDATE_ENTERPRISE):
    case REQUEST(ACTION_TYPES.DELETE_ENTERPRISE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ENTERPRISE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ENTERPRISE):
    case FAILURE(ACTION_TYPES.CREATE_ENTERPRISE):
    case FAILURE(ACTION_TYPES.UPDATE_ENTERPRISE):
    case FAILURE(ACTION_TYPES.DELETE_ENTERPRISE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ENTERPRISE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_ENTERPRISE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ENTERPRISE):
    case SUCCESS(ACTION_TYPES.UPDATE_ENTERPRISE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ENTERPRISE):
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

const apiUrl = 'api/enterprises';

// Actions

export const getEntities: ICrudGetAllAction<IEnterpriseMySuffix> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_ENTERPRISE_LIST,
    payload: axios.get<IEnterpriseMySuffix>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IEnterpriseMySuffix> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ENTERPRISE,
    payload: axios.get<IEnterpriseMySuffix>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IEnterpriseMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ENTERPRISE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEnterpriseMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ENTERPRISE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEnterpriseMySuffix> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ENTERPRISE,
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
