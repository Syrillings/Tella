const users = [];

function userjoin(id, username, room){
    const user = {id, username, room};
    users.push(user);

    return user;
}

function userleft(id) {
  
    const index = users.findIndex(user => (user.id) === id);
    if (index !== -1) {
      return users.splice(index, 1)[0];
    }
  }
  
function getcurrentuser(id){
    return users.find(user => user.id === id);
}

function getroomusers(room) {
    if (typeof room !== 'string') {
      throw new Error('Room must be a string');
    }
    return users.filter(user => user.room && user.room.toLowerCase() === room.toLowerCase());
}
  
  
  
module.exports = {
    userjoin,
    getcurrentuser,
    userleft,
    getroomusers
}


