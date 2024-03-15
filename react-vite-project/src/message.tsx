// PascalCase
function Message() {
  const name = "User1";
  if (name)
    return (
      // JSX (JavaScript XML)
      <h1>Hello {name}</h1>  //Put the actual name of the user.
    );

  return <h1>Hello User</h1>;
}

export default Message;
