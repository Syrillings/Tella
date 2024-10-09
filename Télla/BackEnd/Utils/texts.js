const moment = require('moment');

function format(username, message, room){
    return{
        username,
        message,
        room,
        time: moment().format('h:mm A')
    }
}

module.exports = format;