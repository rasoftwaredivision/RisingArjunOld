import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDiscountMySuffix, defaultValue } from 'app/shared/model/discount-my-suffix.model';

export const ACTION_TYPES = {
  FETCH_DISCOUNT_LIST: 'discount/FETCH_DISCOUNT_LIST',
  FETCH_DISCOUNT: 'discount/FETCH_DISCOUNT',
  CREATE_DISCOUNT: 'discount/CREATE_DISCOUNT',
  UPDATE_DISCOUNT: 'discount/UPDATE_DISCOUNT',
  DELETE_DISCOUNT: 'discount/DELETE_DISCOUNT',
  RESET: 'discount/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDiscountMySuffix>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type DiscountMySuffixState = Readonly<typeof initialState>;

// Reducer

export default (state: DiscountMySuffixState = initialState, action): DiscountMySuffixState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DISCOUNT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DISCOUNT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DISCOUNT):
    case REQUEST(ACTION_TYPES.UPDATE_DISCOUNT):
    case REQUEST(ACTION_TYPES.DELETE_DISCOUNT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DISCOUNT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DISCOUNT):
    case FAILURE(ACTION_TYPES.CREATE_DISCOUNT):
    case FAILURE(ACTION_TYPES.UPDATE_DISCOUNT):
    case FAILURE(ACTION_TYPES.DELETE_DISCOUNT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DISCOUNT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_DISCOUNT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DISCOUNT):
    case SUCCESS(ACTION_TYPES.UPDATE_DISCOUNT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DISCOUNT):
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

const apiUrl = 'api/discounts';

// Actions

export const getEntities: ICrudGetAllAction<IDiscountMySuffix> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_DISCOUNT_LIST,
  payload: axios.get<IDiscountMySuffix>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IDiscountMySuffix> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DISCOUNT,
    payload: axios.get<IDiscountMySuffix>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IDiscountMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DISCOUNT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDiscountMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DISCOUNT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDiscountMySuffix> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DISCOUNT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
