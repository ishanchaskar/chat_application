export const getSender = (loggedUser, users) => {
    if (!users || users.length < 2) {
      console.error('Invalid users array:', users);
      return 'Unknown Sender';
    }
  
    return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
  };
  
  export const getSenderFull = (loggedUser, users) => {
    if (!users || users.length < 2) {
      console.error('Invalid users array:', users);
      return null;
    }
  
    return users[0]._id === loggedUser._id ? users[1] : users[0];
  };
  
  export const isSameSender = (i , messages , m , userId) =>{
    return(
      i < messages.length - 1 && 
      (messages[i+1].sender._id !== m.sender._id || messages[i+1].sender._id === undefined) && 
      messages[i].sender._id !== userId
    )
  }

  export const isLastMessage = (messages , i , userId) => {
    return(
      i === messages.length - 1 && 
      messages[messages.length -1].sender._id !== userId &&
      messages[messages.length -1].sender._id
    )
  }