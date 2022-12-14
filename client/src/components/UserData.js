import { Table } from "react-bootstrap";

const UserData = (data) => {
  const Month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const batches = ["6AM to 7AM", "7AM to 8AM", "8AM to 9AM", "5PM to 6PM"];
  return (
    <Table bordered striped className="mt-3" style={{ width: "50%" }}>
      <tbody>
        <tr>
          <td>Name</td>
          <td>{data.data.name}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>{data.data.email}</td>
        </tr>
        <tr>
          <td>Age</td>
          <td>{data.data.age}</td>
        </tr>
        <tr>
          <td>Batch</td>
          <td>{batches[data.data.batch - 1]}</td>
        </tr>
        <tr>
          <td>Month</td>
          <td>{Month[data.data.month - 1]}</td>
        </tr>
      </tbody>
    </Table>
  );
};
export default UserData;
