import { FleetTable } from "./index";

export default function Customer() {
  return (
    <FleetTable
      title="Customer Records"
      columns={["Name", "Email", "Phone"]}
      rows={[
        ["Ramesh Gupta", "ramesh@gmail.com", "9998877665"],
        ["Suresh Mehta", "suresh@gmail.com", "8887766554"],
      ]}
    />
  );
}
