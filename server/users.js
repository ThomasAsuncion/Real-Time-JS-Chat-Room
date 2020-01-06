/**
 * File with helper functions that is used to manage users joining in, signing out, removing users, getting users, and keeping track of what users are in what room
 */

 const users = [];

 /**
  * Gets the id of the user (or socket instance), the name of the user and the room they will join
  * @param {*} param0 
  */
 const addUser = ({ id, name, room }) => {
    // If user the name 'THOmAs uSer' it needs to be converted to 'thomasuser' (all lowercase and all as one word) same with room
    name = name; // Originally had it trim() but we should be able to have a name with any chars and cases
    room = room; // Originally had it trim() but we should be able to have a name with any chars and cases

    // Goes through users array and tries to find if there is an existing name in that array where that user is in the same room with the same name (in other words no 2 users with the same name in the same room)
    const existingUser = users.find((user) => user.room === room && user.name === name);
    
    if(existingUser){
        return { error: 'Username is taken.' }
    }


    // If there is not an existing user it will create a new user and push the user to the user array
    const user = { id, name, room };
    users.push(user);

    return { user };

 }

 /**
  * Removes the user by the id. It will find a user by its id and if a user exists with that id it will splice the user out of the array
  * @param {*} id 
  */
 const removeUser = (id) => {

    // If the user.id is equal to the specified id (in other words there IS a user with that id)
    const index = users.findIndex((user) => user.id === id);

    if(index !== -1){
        return users.splice(index, 1)[0]; // returns our spliced user and then removes it from our user array
    }
 }

 /**
  * It will find the user based on the id provided. If the user exists with the id given then the user exists and it returns that user
  */
 const getUser = (id) => users.find((user) => user.id === id);

 /**
  * If the user has the same room thats provided then it will return all the users with the same room
  * @param {} room 
  */
 const getUsersInRoom = (room) => users.filter((user) => user.room === room); 

 // Exports it out to be used inside of our index.js file
 module.exports = { addUser, removeUser, getUser, getUsersInRoom};