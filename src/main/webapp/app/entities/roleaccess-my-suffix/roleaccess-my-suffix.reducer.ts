import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IRoleaccessMySuffix, defaultValue } from 'app/shared/model/roleaccess-my-suffix.model';

export const ACTION_TYPES = {
  FETCH_ROLEACCESS_LIST: 'roleaccess/FETCH_ROLEACCESS_LIST',
  FETCH_ROLEACCESS: 'roleaccess/FETCH_ROLEACCESS',
  CREATE_ROLEACCESS: 'roleaccess/CREATE_ROLEACCESS',
  UPDATE_ROLEACCESS: 'roleaccess/UPDATE_ROLEACCESS',
  DELETE_ROLEACCESS: 'roleaccess/DELETE_ROLEACCESS',
  RESET: 'roleaccess/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IRoleaccessMySuffix>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type RoleaccessMySuffixState = Readonly<typeof initialState>;

// Reducer

export default (state: RoleaccessMySuffixState = initialState, action): RoleaccessMySuffixState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ROLEACCESS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ROLEACCESS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ROLEACCESS):
    case REQUEST(ACTION_TYPES.UPDATE_ROLEACCESS):
    case REQUEST(ACTION_TYPES.DELETE_ROLEACCESS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ROLEACCESS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ROLEACCESS):
    case FAILURE(ACTION_TYPES.CREATE_ROLEACCESS):
    case FAILURE(ACTION_TYPES.UPDATE_ROLEACCESS):
    case FAILURE(ACTION_TYPES.DELETE_ROLEACCESS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ROLEACCESS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ROLEACCESS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ROLEACCESS):
    case SUCCESS(ACTION_TYPES.UPDATE_ROLEACCESS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ROLEACCESS):
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

const apiUrl = 'api/roleaccesses';

// Actions

export const getEntities: ICrudGetAllAction<IRoleaccessMySuffix> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ROLEACCESS_LIST,
  payload: axios.get<IRoleaccessMySuffix>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IRoleaccessMySuffix> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ROLEACCESS,
    payload: axios.get<IRoleaccessMySuffix>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IRoleaccessMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ROLEACCESS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IRoleaccessMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ROLEACCESS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IRoleaccessMySuffix> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ROLEACCESS,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
