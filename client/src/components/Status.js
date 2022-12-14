const Status = ({ message }) => {
  console.log(message);
  return (
    <div
      style={{
        width: "100%",
        fontSize: "20px",
        textAlign: "center",
        color: "Blue",
      }}
    >
      {message}
    </div>
  );
};
export default Status;
