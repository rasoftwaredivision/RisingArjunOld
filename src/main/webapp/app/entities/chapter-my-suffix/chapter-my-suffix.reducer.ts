import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IChapterMySuffix, defaultValue } from 'app/shared/model/chapter-my-suffix.model';

export const ACTION_TYPES = {
  FETCH_CHAPTER_LIST: 'chapter/FETCH_CHAPTER_LIST',
  FETCH_CHAPTER: 'chapter/FETCH_CHAPTER',
  CREATE_CHAPTER: 'chapter/CREATE_CHAPTER',
  UPDATE_CHAPTER: 'chapter/UPDATE_CHAPTER',
  DELETE_CHAPTER: 'chapter/DELETE_CHAPTER',
  RESET: 'chapter/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IChapterMySuffix>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ChapterMySuffixState = Readonly<typeof initialState>;

// Reducer

export default (state: ChapterMySuffixState = initialState, action): ChapterMySuffixState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CHAPTER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CHAPTER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CHAPTER):
    case REQUEST(ACTION_TYPES.UPDATE_CHAPTER):
    case REQUEST(ACTION_TYPES.DELETE_CHAPTER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CHAPTER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CHAPTER):
    case FAILURE(ACTION_TYPES.CREATE_CHAPTER):
    case FAILURE(ACTION_TYPES.UPDATE_CHAPTER):
    case FAILURE(ACTION_TYPES.DELETE_CHAPTER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHAPTER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHAPTER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CHAPTER):
    case SUCCESS(ACTION_TYPES.UPDATE_CHAPTER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CHAPTER):
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

const apiUrl = 'api/chapters';

// Actions

export const getEntities: ICrudGetAllAction<IChapterMySuffix> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CHAPTER_LIST,
  payload: axios.get<IChapterMySuffix>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IChapterMySuffix> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CHAPTER,
    payload: axios.get<IChapterMySuffix>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IChapterMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CHAPTER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IChapterMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CHAPTER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IChapterMySuffix> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CHAPTER,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
