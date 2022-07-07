//reducer helps to dispatch tthe action and to store the payload into the store.

import * as types from "./actionTypes";

const initState = {
  loading: false,
  error: false,
  tasks: [],
  status: false,
};

export const tasksReducer = (store = initState, { type, payload }) => {
  switch (type) {
    case types.GET_TASK_REQUEST: {
      return {
        ...store,
        isLoading: true,
        isError: false,
      };
    }
    case types.GET_TASK_SUCCESS: {
      return {
        ...store,
        tasks: payload,
        isLoading: false,
        isError: false,
      };
    }
    case types.GET_TASK_FAILURE: {
      return {
        ...store,
        isLoading: false,
        isError: true,
      };
    }
    case types.ADD_TASK_REQUEST: {
      return {
        ...store,
        isLoading: true,
        isError: false,
      };
    }
    case types.ADD_TASK_SUCCESS: {
      return {
        ...store,
        tasks: [...store.tasks, payload],
        isLoading: false,
        isError: false,
      };
    }
    case types.ADD_TASK_FAILURE: {
      return {
        ...store,
        isLoading: false,
        isError: true,
      };
    }
    case types.DELETE_TASK_REQUEST: {
      return {
        ...store,
        isLoading: true,
        isError: false,
      };
    }
    case types.DELETE_TASK_SUCCESS: {
      const updatedTasks = store.tasks.filter(
        (el, index) => index + 1 !== payload
      );
      
      return {
        ...store,
        tasks: updatedTasks,
        isLoading: false,
        isError: false,
      };
    }
    case types.DELETE_TASK_FAILURE: {
      return {
        ...store,
        isLoading: false,
        isError: true,
      };
    }
    case types.PATCH_TASK_REQUEST: {
      return {
        ...store,
        isLoading: true,
        isError: false,
      };
    }
    case types.PATCH_TASK_SUCCESS: {
      console.log("patchSuccessData", payload);
      return {
        ...store,
        tasks: [...store.tasks, payload],
        isLoading: false,
        isError: false,
      };
    }
    case types.PATCH_TASK_FAILURE: {
      return {
        ...store,
        isLoading: false,
        isError: true,
      };
    }
    default:
      return store;
  }
};
