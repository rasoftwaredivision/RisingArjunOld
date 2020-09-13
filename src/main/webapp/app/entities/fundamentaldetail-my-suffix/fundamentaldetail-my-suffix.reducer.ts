import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFundamentaldetailMySuffix, defaultValue } from 'app/shared/model/fundamentaldetail-my-suffix.model';

export const ACTION_TYPES = {
  FETCH_FUNDAMENTALDETAIL_LIST: 'fundamentaldetail/FETCH_FUNDAMENTALDETAIL_LIST',
  FETCH_FUNDAMENTALDETAIL: 'fundamentaldetail/FETCH_FUNDAMENTALDETAIL',
  CREATE_FUNDAMENTALDETAIL: 'fundamentaldetail/CREATE_FUNDAMENTALDETAIL',
  UPDATE_FUNDAMENTALDETAIL: 'fundamentaldetail/UPDATE_FUNDAMENTALDETAIL',
  DELETE_FUNDAMENTALDETAIL: 'fundamentaldetail/DELETE_FUNDAMENTALDETAIL',
  RESET: 'fundamentaldetail/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFundamentaldetailMySuffix>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type FundamentaldetailMySuffixState = Readonly<typeof initialState>;

// Reducer

export default (state: FundamentaldetailMySuffixState = initialState, action): FundamentaldetailMySuffixState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FUNDAMENTALDETAIL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FUNDAMENTALDETAIL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FUNDAMENTALDETAIL):
    case REQUEST(ACTION_TYPES.UPDATE_FUNDAMENTALDETAIL):
    case REQUEST(ACTION_TYPES.DELETE_FUNDAMENTALDETAIL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_FUNDAMENTALDETAIL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FUNDAMENTALDETAIL):
    case FAILURE(ACTION_TYPES.CREATE_FUNDAMENTALDETAIL):
    case FAILURE(ACTION_TYPES.UPDATE_FUNDAMENTALDETAIL):
    case FAILURE(ACTION_TYPES.DELETE_FUNDAMENTALDETAIL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_FUNDAMENTALDETAIL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FUNDAMENTALDETAIL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FUNDAMENTALDETAIL):
    case SUCCESS(ACTION_TYPES.UPDATE_FUNDAMENTALDETAIL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FUNDAMENTALDETAIL):
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

const apiUrl = 'api/fundamentaldetails';

// Actions

export const getEntities: ICrudGetAllAction<IFundamentaldetailMySuffix> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_FUNDAMENTALDETAIL_LIST,
  payload: axios.get<IFundamentaldetailMySuffix>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IFundamentaldetailMySuffix> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FUNDAMENTALDETAIL,
    payload: axios.get<IFundamentaldetailMySuffix>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IFundamentaldetailMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FUNDAMENTALDETAIL,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFundamentaldetailMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FUNDAMENTALDETAIL,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFundamentaldetailMySuffix> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FUNDAMENTALDETAIL,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
