import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICenterMySuffix, defaultValue } from 'app/shared/model/center-my-suffix.model';

export const ACTION_TYPES = {
  FETCH_CENTER_LIST: 'center/FETCH_CENTER_LIST',
  FETCH_CENTER: 'center/FETCH_CENTER',
  CREATE_CENTER: 'center/CREATE_CENTER',
  UPDATE_CENTER: 'center/UPDATE_CENTER',
  DELETE_CENTER: 'center/DELETE_CENTER',
  RESET: 'center/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICenterMySuffix>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type CenterMySuffixState = Readonly<typeof initialState>;

// Reducer

export default (state: CenterMySuffixState = initialState, action): CenterMySuffixState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CENTER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CENTER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CENTER):
    case REQUEST(ACTION_TYPES.UPDATE_CENTER):
    case REQUEST(ACTION_TYPES.DELETE_CENTER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CENTER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CENTER):
    case FAILURE(ACTION_TYPES.CREATE_CENTER):
    case FAILURE(ACTION_TYPES.UPDATE_CENTER):
    case FAILURE(ACTION_TYPES.DELETE_CENTER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CENTER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CENTER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CENTER):
    case SUCCESS(ACTION_TYPES.UPDATE_CENTER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CENTER):
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

const apiUrl = 'api/centers';

// Actions

export const getEntities: ICrudGetAllAction<ICenterMySuffix> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CENTER_LIST,
  payload: axios.get<ICenterMySuffix>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICenterMySuffix> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CENTER,
    payload: axios.get<ICenterMySuffix>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICenterMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CENTER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICenterMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CENTER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICenterMySuffix> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CENTER,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
