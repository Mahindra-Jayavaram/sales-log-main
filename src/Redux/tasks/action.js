// this is the actions for the actions types this shows what type of action has been performed at particular event triggered.


import axios from "axios";
import * as types from "./actionTypes";

const getTaskRequest = () => {
  return {
    type: types.GET_TASK_REQUEST,
  };
};
const getTaskFailure = () => {
  return {
    type: types.GET_TASK_FAILURE,
  };
};
const getTaskSuccess = (payload) => {
  return {
    type: types.GET_TASK_SUCCESS,
    payload,
  };
};

const addTaskRequest = () => {
  return {
    type: types.ADD_TASK_REQUEST,
  };
};
const addTaskFailure = () => {
  return {
    type: types.ADD_TASK_FAILURE,
  };
};
const addTaskSuccess = (payload) => {
  return {
    type: types.ADD_TASK_SUCCESS,
    payload,
  };
};

const deleteTaskRequest = () => {
  return {
    type: types.DELETE_TASK_REQUEST,
  };
};
const deleteTaskFailure = () => {
  return {
    type: types.DELETE_TASK_FAILURE,
  };
};
const deleteTaskSuccess = (payload) => {
  return {
    type: types.DELETE_TASK_SUCCESS,
    payload,
  };
};
const patchTaskRequest = () => {
  return {
    type: types.PATCH_TASK_REQUEST,
  };
};
const patchTaskFailure = () => {
  return {
    type: types.PATCH_TASK_FAILURE,
  };
};
const patchTaskSuccess = (payload) => {
  return {
    type: types.PATCH_TASK_SUCCESS,
    payload,
  };
};


const getData = () => (dispatch) => {
  dispatch(getTaskRequest());
  axios
    .get("https://sales-log.herokuapp.com/data")
    .then((res) => {
      dispatch(getTaskSuccess(res.data));
    })
    .catch((err) => {
      dispatch(getTaskFailure(err));
    });
};
const deleteTasks = (id) => (dispatch) => {
  dispatch(deleteTaskRequest());
  axios
    .delete(`https://sales-log.herokuapp.com/data/${id}`)
    .then((res) => dispatch(deleteTaskSuccess(id)))
    .catch((err) => dispatch(deleteTaskFailure(err.message)));
};

const getEditData = (id) => (dispatch) => {
  dispatch(patchTaskRequest());
  axios
    .get(`https://sales-log.herokuapp.com/data/${id}`)
    .then((res) => dispatch(patchTaskSuccess(res.data)))
    .catch((err) => dispatch(patchTaskFailure(err.message)));
};

export {
  getTaskFailure,
  getTaskRequest,
  getTaskSuccess,
  getData,
  addTaskFailure,
  addTaskRequest,
  addTaskSuccess,
  deleteTaskFailure,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTasks,
  patchTaskFailure,
  patchTaskRequest,
  patchTaskSuccess,
  getEditData,
};
