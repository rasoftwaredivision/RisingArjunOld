import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITeachershareMySuffix, defaultValue } from 'app/shared/model/teachershare-my-suffix.model';

export const ACTION_TYPES = {
  FETCH_TEACHERSHARE_LIST: 'teachershare/FETCH_TEACHERSHARE_LIST',
  FETCH_TEACHERSHARE: 'teachershare/FETCH_TEACHERSHARE',
  CREATE_TEACHERSHARE: 'teachershare/CREATE_TEACHERSHARE',
  UPDATE_TEACHERSHARE: 'teachershare/UPDATE_TEACHERSHARE',
  DELETE_TEACHERSHARE: 'teachershare/DELETE_TEACHERSHARE',
  RESET: 'teachershare/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITeachershareMySuffix>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type TeachershareMySuffixState = Readonly<typeof initialState>;

// Reducer

export default (state: TeachershareMySuffixState = initialState, action): TeachershareMySuffixState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TEACHERSHARE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TEACHERSHARE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TEACHERSHARE):
    case REQUEST(ACTION_TYPES.UPDATE_TEACHERSHARE):
    case REQUEST(ACTION_TYPES.DELETE_TEACHERSHARE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TEACHERSHARE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TEACHERSHARE):
    case FAILURE(ACTION_TYPES.CREATE_TEACHERSHARE):
    case FAILURE(ACTION_TYPES.UPDATE_TEACHERSHARE):
    case FAILURE(ACTION_TYPES.DELETE_TEACHERSHARE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TEACHERSHARE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_TEACHERSHARE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TEACHERSHARE):
    case SUCCESS(ACTION_TYPES.UPDATE_TEACHERSHARE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TEACHERSHARE):
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

const apiUrl = 'api/teachershares';

// Actions

export const getEntities: ICrudGetAllAction<ITeachershareMySuffix> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_TEACHERSHARE_LIST,
    payload: axios.get<ITeachershareMySuffix>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ITeachershareMySuffix> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TEACHERSHARE,
    payload: axios.get<ITeachershareMySuffix>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITeachershareMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TEACHERSHARE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITeachershareMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TEACHERSHARE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITeachershareMySuffix> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TEACHERSHARE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
