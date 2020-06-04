import {
  ADD_CATEGORY, SELECT_CATEGORY, ADD_NEW_TASK, SELECT_TASK,
  MAKE_TASK_EDITABLE, IS_CATEGORY_EDITABLE,
   ADD_DESCRIPTION, MARK_US_COMPLETED, 
   DELETE_TASK, TOGGLE_SIDEBAR,
  SORT_ASCENDING,SORT_DECENDING,
  ADD_STEP,DELETE_STEP,MARKSTEP_COMPLETED,
 ADDFILE,REMOVEFILE} from "../constants/action-types";
import myday from '../../assets/ic_sun.png';
import important from '../../assets/ic_start.png';
import calender from '../../assets/ic_calendar.png';
import home from '../../assets/ic_home.png';

const initialState = {
  categories: [{ id: 1, name: "My Day", isSelected: true, tasks: [], isEditable: false,icon:myday },
  { id: 2, name: "Important", isSelected: false, tasks: [], isEditable: false,icon:important },
  { id: 3, name: "Planned", isSelected: false, tasks: [], isEditable: false,icon:calender },
  { id: 4, name: "Tasks", isSelected: false, tasks: [], isEditable: false,icon:home }],
  showDescription: false,
  isCategoryEditable: false,
  selectedTask: null,
  showFullCategory:true,
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

        case TOGGLE_SIDEBAR :       
        return {
            ...state,
            showFullCategory:action.payload,
            isCategoryEditable:false
          };   

          case SORT_ASCENDING :       
        
           var telist  = state.categories;

           var sortedlist = telist.filter(function (item) {
            return item.isSelected;
          })[0].tasks.sort((a, b) => (a.name > b.name) ? 1 : -1);

          console.log(sortedlist);
          
          return Object.assign({}, state, {
            categories: state.categories,
            isCategoryEditable:false,
            isEditable:false
          });

          case SORT_DECENDING :
   
            var dlist  = state.categories;

            var dsortedlist = dlist.filter(function (item) {
             return item.isSelected;
           })[0].tasks.sort((a, b) => (a.name < b.name) ? 1 : -1);
 
           console.log(dsortedlist);
           
           return Object.assign({}, state, {
             categories: state.categories,
             isCategoryEditable:false,
             isEditable:false
           });

       case ADD_STEP:  
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

       case DELETE_STEP:  
       var dstepslist = [];
       var dsteptask = {};
       state.categories.forEach(function (item) {
         if (item.isSelected) {
           item.tasks.forEach(function (task) {
            var asteps = [];
            if (task.id === action.payload.selectedtask) {
               task.steps.forEach(function(step){
                    if(step.id != action.payload.stepid){
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

       case MARKSTEP_COMPLETED :
       console.log('reducer');
       var stelist = [];
       var stetask = {};
       state.categories.forEach(function (item) {
         if (item.isSelected) {
           item.tasks.forEach(function (task) {
            var atep = [];
            if (task.id === action.payload.selectedtask) {
              console.log(task.steps);
               task.steps.forEach(function(step){
                console.log(action.payload.stepid+"/"+step.id+"/"+step.id === action.payload.stepid);    
                if(step.id === action.payload.stepid){
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
  
 
       case ADDFILE:  
       var filelist = [];
       var filetask = {};
       state.categories.forEach(function (item) {
         if (item.isSelected) {
           item.tasks.forEach(function (task) {
             if (task.id === action.payload.selectedtask) {
               task.files = action.payload.tfiles 
               filetask = task;
              }
           })
         }
         filelist.push(item);
       })
       return {
         ...state,
         categories: filelist,
         selectedTask: filetask
 
       };

       case REMOVEFILE:  
       var rfilelist = [];
       var rfiletask = {};
       state.categories.forEach(function (item) {
         if (item.isSelected) {
           item.tasks.forEach(function (task) {
            var afiles = [];
            if (task.id === action.payload.selectedtask) {
               task.files.forEach(function(step){
                    if(step.id != action.payload.fileid){
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

    default:
      return state;
  }

  
}

export default rootReducer;

