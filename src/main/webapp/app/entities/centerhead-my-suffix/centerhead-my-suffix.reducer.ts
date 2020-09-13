import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICenterheadMySuffix, defaultValue } from 'app/shared/model/centerhead-my-suffix.model';

export const ACTION_TYPES = {
  FETCH_CENTERHEAD_LIST: 'centerhead/FETCH_CENTERHEAD_LIST',
  FETCH_CENTERHEAD: 'centerhead/FETCH_CENTERHEAD',
  CREATE_CENTERHEAD: 'centerhead/CREATE_CENTERHEAD',
  UPDATE_CENTERHEAD: 'centerhead/UPDATE_CENTERHEAD',
  DELETE_CENTERHEAD: 'centerhead/DELETE_CENTERHEAD',
  RESET: 'centerhead/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICenterheadMySuffix>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type CenterheadMySuffixState = Readonly<typeof initialState>;

// Reducer

export default (state: CenterheadMySuffixState = initialState, action): CenterheadMySuffixState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CENTERHEAD_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CENTERHEAD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CENTERHEAD):
    case REQUEST(ACTION_TYPES.UPDATE_CENTERHEAD):
    case REQUEST(ACTION_TYPES.DELETE_CENTERHEAD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CENTERHEAD_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CENTERHEAD):
    case FAILURE(ACTION_TYPES.CREATE_CENTERHEAD):
    case FAILURE(ACTION_TYPES.UPDATE_CENTERHEAD):
    case FAILURE(ACTION_TYPES.DELETE_CENTERHEAD):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CENTERHEAD_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CENTERHEAD):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CENTERHEAD):
    case SUCCESS(ACTION_TYPES.UPDATE_CENTERHEAD):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CENTERHEAD):
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

const apiUrl = 'api/centerheads';

// Actions

export const getEntities: ICrudGetAllAction<ICenterheadMySuffix> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CENTERHEAD_LIST,
  payload: axios.get<ICenterheadMySuffix>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICenterheadMySuffix> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CENTERHEAD,
    payload: axios.get<ICenterheadMySuffix>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICenterheadMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CENTERHEAD,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICenterheadMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CENTERHEAD,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICenterheadMySuffix> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CENTERHEAD,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
