import {
  ADD_CATEGORY, SELECT_CATEGORY, ADD_NEW_TASK, SELECT_TASK,
  MAKE_TASK_EDITABLE, IS_CATEGORY_EDITABLE,
  ADD_DESCRIPTION, MARK_US_COMPLETED,
  DELETE_TASK, TOGGLE_SIDEBAR,
  SORT_ASCENDING, SORT_DECENDING,
  ADD_STEP, DELETE_STEP, MARKSTEP_COMPLETED,
  ADDFILE, REMOVEFILE
} from "../constants/action-types";
import myday from '../assets/ic_sun.png';
import important from '../assets/ic_start.png';
import calender from '../assets/ic_calendar.png';
import home from '../assets/ic_home.png';

const initialState = {
  categories: [{ id: 1, name: "My Day", isSelected: true, tasks: [], isEditable: false, icon: myday },
  { id: 2, name: "Important", isSelected: false, tasks: [], isEditable: false, icon: important },
  { id: 3, name: "Planned", isSelected: false, tasks: [], isEditable: false, icon: calender },
  { id: 4, name: "Tasks", isSelected: false, tasks: [], isEditable: false, icon: home }],
  showDescription: false,
  isCategoryEditable: false,
  selectedTask: null,
  showFullCategory: true,
};

function rootReducer(state = initialState, action) {

  const AddCategory = () => {
    return Object.assign({}, state, {
      categories: state.categories.concat(action.payload),
      isCategoryEditable: false
    });
  }

  const SelectCategory = () => {
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
      selectedTask: null
    };
  }

  const AddNewTask = () => {

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

  }

  const SelectTask = () => {

   var selectedtask = state.categories.filter(function (item) {
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

  }

  const makeTaskEditable = () => {
    console.log(action.payload);
    return {
      ...state,
      isEditable: action.payload,
      isCategoryEditable: false

    };

  }

  const makeCategotyEditable = () => {
    return {
      ...state,
      isCategoryEditable: action.payload
    };

  }

  const addTaskDescription = () => {
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
  }

  const markTaskusCompleted = () => {
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

  }

  const deleteTask = () => {
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
      categories: afterdeleted,
      showDescription: false
    };
  }

  const toggleSidbar = () => {
    return {
      ...state,
      showFullCategory: action.payload,
      isCategoryEditable: false
    };

  }

  const sorAscending = () => {
    var telist = state.categories;

    var sortedlist = telist.filter(function (item) {
      return item.isSelected;
    })[0].tasks.sort((a, b) => (a.name > b.name) ? 1 : -1);

    console.log(sortedlist);

    return Object.assign({}, state, {
      categories: state.categories,
      isCategoryEditable: false,
      isEditable: false
    });
  }


  const sortDescending = () => {

    var dlist = state.categories;

    var dsortedlist = dlist.filter(function (item) {
      return item.isSelected;
    })[0].tasks.sort((a, b) => (a.name < b.name) ? 1 : -1);

    console.log(dsortedlist);

    return Object.assign({}, state, {
      categories: state.categories,
      isCategoryEditable: false,
      isEditable: false
    });
  }

  const addTaskStep = () => {
    var stepslist = [];
    var steptask = {};
    state.categories.forEach(function (item) {
      if (item.isSelected) {
        item.tasks.forEach(function (task) {
          if (task.id === action.payload.selectedtask) {
            task.steps.push(action.payload.step);
            steptask = task;
          }
        })
      }
      stepslist.push(item);
    })
    return {
      ...state,
      categories: stepslist,
      selectedTask: steptask

    };

  }


  const deleteTaskStep = () => {

    var dstepslist = [];
    var dsteptask = {};
    state.categories.forEach(function (item) {
      if (item.isSelected) {
        item.tasks.forEach(function (task) {
          var asteps = [];
          if (task.id === action.payload.selectedtask) {
            task.steps.forEach(function (step) {
              if (step.id != action.payload.stepid) {
                asteps.push(step);
              }
            })
            task.steps = asteps
            dsteptask = task;
          }
        })
      }
      dstepslist.push(item);
    })
    return {
      ...state,
      categories: dstepslist,
      selectedTask: dsteptask

    };
  }


  const markTaskStpeasCompleted = () => {

    console.log('reducer');
    var stelist = [];
    var stetask = {};
    state.categories.forEach(function (item) {
      if (item.isSelected) {
        item.tasks.forEach(function (task) {
          var atep = [];
          if (task.id === action.payload.selectedtask) {
            console.log(task.steps);
            task.steps.forEach(function (step) {
              console.log(action.payload.stepid + "/" + step.id + "/" + step.id === action.payload.stepid);
              if (step.id === action.payload.stepid) {
                step.isCompleted = action.payload.completed;
              }
              atep.push(step);
            })
            task.steps = atep
            stetask = task;
          }
        })
      }
      stelist.push(item);
    })
    return {
      ...state,
      categories: stelist,
      selectedTask: stetask

    };
  }

  const addTaskFiles = () => {

    var filelist = [];
    var filetask = {};
    state.categories.forEach(function (item) {
      if (item.isSelected) {
        item.tasks.forEach(function (task) {
          if (task.id === action.payload.selectedtask) {
            task.files.push(action.payload.tfiles);
            filetask = task;
          }
        })
      }
      filelist.push(item);
    })
    console.log('------>');
    return {
      ...state,
      categories: filelist,
      selectedTask: filetask

    };
  }

  const removeTaskfile = () => {

    var rfilelist = [];
    var rfiletask = {};
    state.categories.forEach(function (item) {
      if (item.isSelected) {
        item.tasks.forEach(function (task) {
          var afiles = [];
          if (task.id === action.payload.selectedtask) {
            task.files.forEach(function (step) {
              if (step.id != action.payload.fileid) {
                afiles.push(step);
              }
            })
            task.files = afiles;
            rfiletask = task;
          }
        })
      }
      rfilelist.push(item);
    })
    return {
      ...state,
      categories: rfilelist,
      selectedTask: rfiletask

    };
  }

  switch (action.type) {

    case ADD_CATEGORY:
      return AddCategory();
    case SELECT_CATEGORY:
      return SelectCategory();
    case ADD_NEW_TASK:
      return AddNewTask();
    case SELECT_TASK:
      return SelectTask();
    case MAKE_TASK_EDITABLE:
      return makeTaskEditable();
    case IS_CATEGORY_EDITABLE:
      return makeCategotyEditable();
    case ADD_DESCRIPTION:
      return addTaskDescription();
    case MARK_US_COMPLETED:
      return markTaskusCompleted();
    case DELETE_TASK:
      return deleteTask();
    case TOGGLE_SIDEBAR:
      return toggleSidbar();
    case SORT_ASCENDING:
      return sorAscending();
    case SORT_DECENDING:
      return sortDescending();
    case ADD_STEP:
      return addTaskStep();
    case DELETE_STEP:
      return deleteTaskStep();
    case MARKSTEP_COMPLETED:
      return markTaskStpeasCompleted();
    case ADDFILE:
      return addTaskFiles();
    case REMOVEFILE:
      return removeTaskfile();
    default:
      return state;
  }


}

export default rootReducer;

