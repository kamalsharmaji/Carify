import { FleetTable } from "./index";

export default function Booking() {
  return (
    <FleetTable
      title="Booking History"
      columns={["Customer", "Vehicle", "Date", "Status"]}
      rows={[
        ["Ramesh", "DL09AB1234", "10 Jan", "Completed"],
        ["Suresh", "HR26CT7890", "13 Jan", "Pending"],
      ]}
    />
  );
}
