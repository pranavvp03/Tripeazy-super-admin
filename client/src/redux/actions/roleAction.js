export const setPermissions = (permissions) => ({
    type: "SET_PERMISSIONS",
    payload: { permissions },   
    
})

export const getRoles=(roles)=>({
    type:"SET_ROLES",
    payload:{roles}
})
export const searchAdmins=(admins)=>({
    type:"SEARCH_ADMINS",
    payload:admins
})
export const singleRole =(value)=>({
    type:"SINGLE_ROLE",
    payload:value
})