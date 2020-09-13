import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IUserdetailMySuffix, defaultValue } from 'app/shared/model/userdetail-my-suffix.model';

export const ACTION_TYPES = {
  FETCH_USERDETAIL_LIST: 'userdetail/FETCH_USERDETAIL_LIST',
  FETCH_USERDETAIL: 'userdetail/FETCH_USERDETAIL',
  CREATE_USERDETAIL: 'userdetail/CREATE_USERDETAIL',
  UPDATE_USERDETAIL: 'userdetail/UPDATE_USERDETAIL',
  DELETE_USERDETAIL: 'userdetail/DELETE_USERDETAIL',
  RESET: 'userdetail/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IUserdetailMySuffix>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type UserdetailMySuffixState = Readonly<typeof initialState>;

// Reducer

export default (state: UserdetailMySuffixState = initialState, action): UserdetailMySuffixState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_USERDETAIL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_USERDETAIL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_USERDETAIL):
    case REQUEST(ACTION_TYPES.UPDATE_USERDETAIL):
    case REQUEST(ACTION_TYPES.DELETE_USERDETAIL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_USERDETAIL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_USERDETAIL):
    case FAILURE(ACTION_TYPES.CREATE_USERDETAIL):
    case FAILURE(ACTION_TYPES.UPDATE_USERDETAIL):
    case FAILURE(ACTION_TYPES.DELETE_USERDETAIL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERDETAIL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERDETAIL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_USERDETAIL):
    case SUCCESS(ACTION_TYPES.UPDATE_USERDETAIL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_USERDETAIL):
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

const apiUrl = 'api/userdetails';

// Actions

export const getEntities: ICrudGetAllAction<IUserdetailMySuffix> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_USERDETAIL_LIST,
    payload: axios.get<IUserdetailMySuffix>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IUserdetailMySuffix> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_USERDETAIL,
    payload: axios.get<IUserdetailMySuffix>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IUserdetailMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_USERDETAIL,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IUserdetailMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_USERDETAIL,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IUserdetailMySuffix> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_USERDETAIL,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
