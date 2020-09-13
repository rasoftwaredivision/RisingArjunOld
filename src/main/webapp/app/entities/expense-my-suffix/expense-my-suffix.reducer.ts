import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IExpenseMySuffix, defaultValue } from 'app/shared/model/expense-my-suffix.model';

export const ACTION_TYPES = {
  FETCH_EXPENSE_LIST: 'expense/FETCH_EXPENSE_LIST',
  FETCH_EXPENSE: 'expense/FETCH_EXPENSE',
  CREATE_EXPENSE: 'expense/CREATE_EXPENSE',
  UPDATE_EXPENSE: 'expense/UPDATE_EXPENSE',
  DELETE_EXPENSE: 'expense/DELETE_EXPENSE',
  SET_BLOB: 'expense/SET_BLOB',
  RESET: 'expense/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IExpenseMySuffix>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ExpenseMySuffixState = Readonly<typeof initialState>;

// Reducer

export default (state: ExpenseMySuffixState = initialState, action): ExpenseMySuffixState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EXPENSE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EXPENSE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_EXPENSE):
    case REQUEST(ACTION_TYPES.UPDATE_EXPENSE):
    case REQUEST(ACTION_TYPES.DELETE_EXPENSE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_EXPENSE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EXPENSE):
    case FAILURE(ACTION_TYPES.CREATE_EXPENSE):
    case FAILURE(ACTION_TYPES.UPDATE_EXPENSE):
    case FAILURE(ACTION_TYPES.DELETE_EXPENSE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_EXPENSE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_EXPENSE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_EXPENSE):
    case SUCCESS(ACTION_TYPES.UPDATE_EXPENSE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_EXPENSE):
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

const apiUrl = 'api/expenses';

// Actions

export const getEntities: ICrudGetAllAction<IExpenseMySuffix> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_EXPENSE_LIST,
    payload: axios.get<IExpenseMySuffix>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IExpenseMySuffix> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EXPENSE,
    payload: axios.get<IExpenseMySuffix>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IExpenseMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EXPENSE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IExpenseMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EXPENSE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IExpenseMySuffix> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EXPENSE,
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
