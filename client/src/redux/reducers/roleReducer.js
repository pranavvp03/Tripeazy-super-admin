import { singleRole } from "../actions/roleAction";

const initialState = {
    Permissions: [], 
      Role:[],
      Admins:[],
      SingleRole:""

}

const roleReducers = (state= initialState, action)=>{
    switch(action.type){
        case 'SET_PERMISSIONS':
            return {
                ...state,
                permissions: action.payload.permissions
            };
         case 'SET_ROLES':
            return{
                ...state,
                Role:action.payload.roles
            }   
         case 'SEARCH_ADMINS':
            return{
                ...state,
                Admins:action.payload

            }
         case 'SINGLE_ROLE':
            return{
                ...state,
                SingleRole:action.payload

            }

            default :
                return state 
    }

}
export default roleReducers