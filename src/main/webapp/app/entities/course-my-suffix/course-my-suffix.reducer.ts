import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICourseMySuffix, defaultValue } from 'app/shared/model/course-my-suffix.model';

export const ACTION_TYPES = {
  FETCH_COURSE_LIST: 'course/FETCH_COURSE_LIST',
  FETCH_COURSE: 'course/FETCH_COURSE',
  CREATE_COURSE: 'course/CREATE_COURSE',
  UPDATE_COURSE: 'course/UPDATE_COURSE',
  DELETE_COURSE: 'course/DELETE_COURSE',
  RESET: 'course/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICourseMySuffix>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type CourseMySuffixState = Readonly<typeof initialState>;

// Reducer

export default (state: CourseMySuffixState = initialState, action): CourseMySuffixState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_COURSE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_COURSE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_COURSE):
    case REQUEST(ACTION_TYPES.UPDATE_COURSE):
    case REQUEST(ACTION_TYPES.DELETE_COURSE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_COURSE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_COURSE):
    case FAILURE(ACTION_TYPES.CREATE_COURSE):
    case FAILURE(ACTION_TYPES.UPDATE_COURSE):
    case FAILURE(ACTION_TYPES.DELETE_COURSE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_COURSE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_COURSE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_COURSE):
    case SUCCESS(ACTION_TYPES.UPDATE_COURSE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_COURSE):
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

const apiUrl = 'api/courses';

// Actions

export const getEntities: ICrudGetAllAction<ICourseMySuffix> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_COURSE_LIST,
  payload: axios.get<ICourseMySuffix>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICourseMySuffix> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_COURSE,
    payload: axios.get<ICourseMySuffix>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICourseMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_COURSE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICourseMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_COURSE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICourseMySuffix> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_COURSE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
