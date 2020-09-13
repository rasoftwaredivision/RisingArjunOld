import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAcademicsessionMySuffix, defaultValue } from 'app/shared/model/academicsession-my-suffix.model';

export const ACTION_TYPES = {
  FETCH_ACADEMICSESSION_LIST: 'academicsession/FETCH_ACADEMICSESSION_LIST',
  FETCH_ACADEMICSESSION: 'academicsession/FETCH_ACADEMICSESSION',
  CREATE_ACADEMICSESSION: 'academicsession/CREATE_ACADEMICSESSION',
  UPDATE_ACADEMICSESSION: 'academicsession/UPDATE_ACADEMICSESSION',
  DELETE_ACADEMICSESSION: 'academicsession/DELETE_ACADEMICSESSION',
  RESET: 'academicsession/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAcademicsessionMySuffix>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type AcademicsessionMySuffixState = Readonly<typeof initialState>;

// Reducer

export default (state: AcademicsessionMySuffixState = initialState, action): AcademicsessionMySuffixState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ACADEMICSESSION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ACADEMICSESSION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ACADEMICSESSION):
    case REQUEST(ACTION_TYPES.UPDATE_ACADEMICSESSION):
    case REQUEST(ACTION_TYPES.DELETE_ACADEMICSESSION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ACADEMICSESSION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ACADEMICSESSION):
    case FAILURE(ACTION_TYPES.CREATE_ACADEMICSESSION):
    case FAILURE(ACTION_TYPES.UPDATE_ACADEMICSESSION):
    case FAILURE(ACTION_TYPES.DELETE_ACADEMICSESSION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ACADEMICSESSION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ACADEMICSESSION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ACADEMICSESSION):
    case SUCCESS(ACTION_TYPES.UPDATE_ACADEMICSESSION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ACADEMICSESSION):
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

const apiUrl = 'api/academicsessions';

// Actions

export const getEntities: ICrudGetAllAction<IAcademicsessionMySuffix> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ACADEMICSESSION_LIST,
  payload: axios.get<IAcademicsessionMySuffix>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IAcademicsessionMySuffix> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ACADEMICSESSION,
    payload: axios.get<IAcademicsessionMySuffix>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IAcademicsessionMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ACADEMICSESSION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAcademicsessionMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ACADEMICSESSION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAcademicsessionMySuffix> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ACADEMICSESSION,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
