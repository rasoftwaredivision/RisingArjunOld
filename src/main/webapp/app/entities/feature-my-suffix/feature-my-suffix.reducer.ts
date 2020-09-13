import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFeatureMySuffix, defaultValue } from 'app/shared/model/feature-my-suffix.model';

export const ACTION_TYPES = {
  FETCH_FEATURE_LIST: 'feature/FETCH_FEATURE_LIST',
  FETCH_FEATURE: 'feature/FETCH_FEATURE',
  CREATE_FEATURE: 'feature/CREATE_FEATURE',
  UPDATE_FEATURE: 'feature/UPDATE_FEATURE',
  DELETE_FEATURE: 'feature/DELETE_FEATURE',
  RESET: 'feature/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFeatureMySuffix>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type FeatureMySuffixState = Readonly<typeof initialState>;

// Reducer

export default (state: FeatureMySuffixState = initialState, action): FeatureMySuffixState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FEATURE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FEATURE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FEATURE):
    case REQUEST(ACTION_TYPES.UPDATE_FEATURE):
    case REQUEST(ACTION_TYPES.DELETE_FEATURE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_FEATURE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FEATURE):
    case FAILURE(ACTION_TYPES.CREATE_FEATURE):
    case FAILURE(ACTION_TYPES.UPDATE_FEATURE):
    case FAILURE(ACTION_TYPES.DELETE_FEATURE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_FEATURE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FEATURE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FEATURE):
    case SUCCESS(ACTION_TYPES.UPDATE_FEATURE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FEATURE):
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

const apiUrl = 'api/features';

// Actions

export const getEntities: ICrudGetAllAction<IFeatureMySuffix> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_FEATURE_LIST,
  payload: axios.get<IFeatureMySuffix>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IFeatureMySuffix> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FEATURE,
    payload: axios.get<IFeatureMySuffix>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IFeatureMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FEATURE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFeatureMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FEATURE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFeatureMySuffix> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FEATURE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
