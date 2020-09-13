import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IUserpreferenceMySuffix, defaultValue } from 'app/shared/model/userpreference-my-suffix.model';

export const ACTION_TYPES = {
  FETCH_USERPREFERENCE_LIST: 'userpreference/FETCH_USERPREFERENCE_LIST',
  FETCH_USERPREFERENCE: 'userpreference/FETCH_USERPREFERENCE',
  CREATE_USERPREFERENCE: 'userpreference/CREATE_USERPREFERENCE',
  UPDATE_USERPREFERENCE: 'userpreference/UPDATE_USERPREFERENCE',
  DELETE_USERPREFERENCE: 'userpreference/DELETE_USERPREFERENCE',
  RESET: 'userpreference/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IUserpreferenceMySuffix>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type UserpreferenceMySuffixState = Readonly<typeof initialState>;

// Reducer

export default (state: UserpreferenceMySuffixState = initialState, action): UserpreferenceMySuffixState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_USERPREFERENCE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_USERPREFERENCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_USERPREFERENCE):
    case REQUEST(ACTION_TYPES.UPDATE_USERPREFERENCE):
    case REQUEST(ACTION_TYPES.DELETE_USERPREFERENCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_USERPREFERENCE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_USERPREFERENCE):
    case FAILURE(ACTION_TYPES.CREATE_USERPREFERENCE):
    case FAILURE(ACTION_TYPES.UPDATE_USERPREFERENCE):
    case FAILURE(ACTION_TYPES.DELETE_USERPREFERENCE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERPREFERENCE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERPREFERENCE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_USERPREFERENCE):
    case SUCCESS(ACTION_TYPES.UPDATE_USERPREFERENCE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_USERPREFERENCE):
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

const apiUrl = 'api/userpreferences';

// Actions

export const getEntities: ICrudGetAllAction<IUserpreferenceMySuffix> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_USERPREFERENCE_LIST,
  payload: axios.get<IUserpreferenceMySuffix>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IUserpreferenceMySuffix> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_USERPREFERENCE,
    payload: axios.get<IUserpreferenceMySuffix>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IUserpreferenceMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_USERPREFERENCE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IUserpreferenceMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_USERPREFERENCE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IUserpreferenceMySuffix> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_USERPREFERENCE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
