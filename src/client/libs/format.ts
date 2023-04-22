export default (messages: Record<string, string>[]) => {
  // console.log(JSON.parse(messages));
  return messages?.map((message) => {
    return {
      user: {
        firstName: message['First Name'],
        lastName: message['Last Name'],
        office: message.Office,
        role: message.Role,
        isNinja: message.Ninja,
      },
      response: {
        to: message.To,
        body: message.Message,
        from: message.From,
      },
    };
  });
};
