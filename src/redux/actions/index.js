import { ADD_CATEGORY,SELECT_CATEGORY,ADD_NEW_TASK,
  SELECT_TASK,MAKE_TASK_EDITABLE,IS_CATEGORY_EDITABLE,
  ADD_DESCRIPTION,MARK_US_COMPLETED,DELETE_TASK,TOGGLE_SIDEBAR,
  SORT_ASCENDING,SORT_DECENDING,ADD_STEP,DELETE_STEP,MARKSTEP_COMPLETED } from "../constants/action-types";

export function addCategory(payload) {
  return { type: ADD_CATEGORY, payload };
}

export function selectCategory(payload){
  return { type: SELECT_CATEGORY, payload };
}

export function addNewTask(payload){
  return { type: ADD_NEW_TASK, payload };
}


export function SelectTask(payload){
  return { type: SELECT_TASK, payload };
}

export function MakeEditable(payload){
  return { type: MAKE_TASK_EDITABLE, payload };
}

export function MakeCategoryEditable(payload){
  return { type: IS_CATEGORY_EDITABLE, payload };
}

export function addTaskDescription(payload){
  return { type: ADD_DESCRIPTION, payload };
}

export function markTaskusCompleted(payload){
  return { type: MARK_US_COMPLETED, payload };
}

export function deleteTask(payload){
  return { type: DELETE_TASK, payload };
}

export function toggleSideBar(payload){
  return { type: TOGGLE_SIDEBAR, payload };
}

export function sortAscending(payload){
  return { type: SORT_ASCENDING, payload };
}
export function sortDecending(payload){
  return { type: SORT_DECENDING, payload };
}

export function AddStep(payload){
  return {type:ADD_STEP,payload}
}

export function DeleteStep(payload){
  return {type:DELETE_STEP,payload}
}

export function MarkStepCompleted(payload){
  return {type:MARKSTEP_COMPLETED,payload}
}