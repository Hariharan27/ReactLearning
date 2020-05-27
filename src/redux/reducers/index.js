import {
  ADD_CATEGORY, SELECT_CATEGORY, ADD_NEW_TASK, SELECT_TASK,
  MAKE_TASK_EDITABLE, IS_CATEGORY_EDITABLE, ADD_DESCRIPTION, MARK_US_COMPLETED, DELETE_TASK
} from "../constants/action-types";

const initialState = {
  categories: [{ id: 1, name: "My Day", isSelected: true, tasks: [], isEditable: false, },
  { id: 2, name: "Important", isSelected: false, tasks: [], isEditable: false, },
  { id: 3, name: "Planned", isSelected: false, tasks: [], isEditable: false, },
  { id: 4, name: "Tasks", isSelected: false, tasks: [], isEditable: false, }],
  showDescription: false,
  isCategoryEditable: false,
  selectedTask: null
};

function rootReducer(state = initialState, action) {


  switch (action.type) {

    case ADD_CATEGORY:
      return Object.assign({}, state, {
        categories: state.categories.concat(action.payload),
        isCategoryEditable: false
      });
    case SELECT_CATEGORY:
      var list = [];
      state.categories.forEach(function (item) {
        if (action.payload.id === item.id) {
          item.isSelected = true;
        } else {
          item.isSelected = false
        }
        list.push(item);
      })
      return {
        ...state,
        categories: list,
        showDescription: false,
        isEditable: false,
        isCategoryEditable: false,
        selectedTask:null
      };
    case ADD_NEW_TASK:
      var catlist = [];
      state.categories.forEach(function (item) {
        if (item.isSelected) {
          item.tasks.push(action.payload);
        }
        catlist.push(item);
      })
      return {
        ...state,
        categories: catlist,
        isEditable: false,
        isCategoryEditable: false
      };

    case SELECT_TASK:
      const selectedtask = state.categories.filter(function (item) {
        return item.isSelected;
      })[0].tasks.filter(function (task) {
        return task.id === action.payload.selectedtask;
      })[0];
      return {
        ...state,
        showDescription: action.payload.showDescription,
        isEditable: false,
        isCategoryEditable: false,
        selectedTask: selectedtask
      };

    case MAKE_TASK_EDITABLE:
      console.log(action.payload);
      return {
        ...state,
        isEditable: action.payload,
        isCategoryEditable: false

      };

    case IS_CATEGORY_EDITABLE:
      return {
        ...state,
        isCategoryEditable: action.payload
      };

    case ADD_DESCRIPTION:
      var descrptionlist = [];
      var stask = {};
      state.categories.forEach(function (item) {
        if (item.isSelected) {
          item.tasks.forEach(function (task) {
            if (task.id === action.payload.selectedtask) {
              stask = task;
              task.description = action.payload.description;
            }
          })
        }
        descrptionlist.push(item);
      })
      return {
        ...state,
        categories: descrptionlist,
        selectedTask: stask

      };

    case MARK_US_COMPLETED:
      var todolist = [];
      state.categories.forEach(function (item) {
        if (item.isSelected) {
          item.tasks.forEach(function (task) {
            if (task.id == action.payload.selectedtask) {
              task.isCompleted = action.payload.selection;
            }
          })
        }
        todolist.push(item);
      })
      return {
        ...state,
        categories: todolist,
      };

      case DELETE_TASK :
        var afterdeleted = [];
        state.categories.forEach(function (item) {
          var aftertask = [];
          item.tasks.forEach(function (task) {
            if (task.id !== action.payload.taskid) {
              aftertask.push(task);
            }
          })
        item.tasks = aftertask;
        afterdeleted.push(item);            
        });       
      return {
          ...state,
          categories:afterdeleted,
          showDescription:false
        };   

    default:
      return state;
  }
}

export default rootReducer;

