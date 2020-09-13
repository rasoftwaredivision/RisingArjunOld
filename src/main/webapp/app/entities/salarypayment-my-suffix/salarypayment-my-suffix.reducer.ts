import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISalarypaymentMySuffix, defaultValue } from 'app/shared/model/salarypayment-my-suffix.model';

export const ACTION_TYPES = {
  FETCH_SALARYPAYMENT_LIST: 'salarypayment/FETCH_SALARYPAYMENT_LIST',
  FETCH_SALARYPAYMENT: 'salarypayment/FETCH_SALARYPAYMENT',
  CREATE_SALARYPAYMENT: 'salarypayment/CREATE_SALARYPAYMENT',
  UPDATE_SALARYPAYMENT: 'salarypayment/UPDATE_SALARYPAYMENT',
  DELETE_SALARYPAYMENT: 'salarypayment/DELETE_SALARYPAYMENT',
  RESET: 'salarypayment/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISalarypaymentMySuffix>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type SalarypaymentMySuffixState = Readonly<typeof initialState>;

// Reducer

export default (state: SalarypaymentMySuffixState = initialState, action): SalarypaymentMySuffixState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SALARYPAYMENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SALARYPAYMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SALARYPAYMENT):
    case REQUEST(ACTION_TYPES.UPDATE_SALARYPAYMENT):
    case REQUEST(ACTION_TYPES.DELETE_SALARYPAYMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_SALARYPAYMENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SALARYPAYMENT):
    case FAILURE(ACTION_TYPES.CREATE_SALARYPAYMENT):
    case FAILURE(ACTION_TYPES.UPDATE_SALARYPAYMENT):
    case FAILURE(ACTION_TYPES.DELETE_SALARYPAYMENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_SALARYPAYMENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_SALARYPAYMENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SALARYPAYMENT):
    case SUCCESS(ACTION_TYPES.UPDATE_SALARYPAYMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SALARYPAYMENT):
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

const apiUrl = 'api/salarypayments';

// Actions

export const getEntities: ICrudGetAllAction<ISalarypaymentMySuffix> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_SALARYPAYMENT_LIST,
    payload: axios.get<ISalarypaymentMySuffix>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ISalarypaymentMySuffix> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SALARYPAYMENT,
    payload: axios.get<ISalarypaymentMySuffix>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ISalarypaymentMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SALARYPAYMENT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISalarypaymentMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SALARYPAYMENT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISalarypaymentMySuffix> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SALARYPAYMENT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
