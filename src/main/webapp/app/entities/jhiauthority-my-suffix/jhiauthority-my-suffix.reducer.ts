import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IJhiauthorityMySuffix, defaultValue } from 'app/shared/model/jhiauthority-my-suffix.model';

export const ACTION_TYPES = {
  FETCH_JHIAUTHORITY_LIST: 'jhiauthority/FETCH_JHIAUTHORITY_LIST',
  FETCH_JHIAUTHORITY: 'jhiauthority/FETCH_JHIAUTHORITY',
  CREATE_JHIAUTHORITY: 'jhiauthority/CREATE_JHIAUTHORITY',
  UPDATE_JHIAUTHORITY: 'jhiauthority/UPDATE_JHIAUTHORITY',
  DELETE_JHIAUTHORITY: 'jhiauthority/DELETE_JHIAUTHORITY',
  RESET: 'jhiauthority/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IJhiauthorityMySuffix>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type JhiauthorityMySuffixState = Readonly<typeof initialState>;

// Reducer

export default (state: JhiauthorityMySuffixState = initialState, action): JhiauthorityMySuffixState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_JHIAUTHORITY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_JHIAUTHORITY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_JHIAUTHORITY):
    case REQUEST(ACTION_TYPES.UPDATE_JHIAUTHORITY):
    case REQUEST(ACTION_TYPES.DELETE_JHIAUTHORITY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_JHIAUTHORITY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_JHIAUTHORITY):
    case FAILURE(ACTION_TYPES.CREATE_JHIAUTHORITY):
    case FAILURE(ACTION_TYPES.UPDATE_JHIAUTHORITY):
    case FAILURE(ACTION_TYPES.DELETE_JHIAUTHORITY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_JHIAUTHORITY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_JHIAUTHORITY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_JHIAUTHORITY):
    case SUCCESS(ACTION_TYPES.UPDATE_JHIAUTHORITY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_JHIAUTHORITY):
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

const apiUrl = 'api/jhiauthorities';

// Actions

export const getEntities: ICrudGetAllAction<IJhiauthorityMySuffix> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_JHIAUTHORITY_LIST,
  payload: axios.get<IJhiauthorityMySuffix>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IJhiauthorityMySuffix> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_JHIAUTHORITY,
    payload: axios.get<IJhiauthorityMySuffix>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IJhiauthorityMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_JHIAUTHORITY,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IJhiauthorityMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_JHIAUTHORITY,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IJhiauthorityMySuffix> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_JHIAUTHORITY,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
