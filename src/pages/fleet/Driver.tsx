import { FleetTable } from "./index";

export default function Driver() {
  return (
    <FleetTable
      title="Driver Management"
      columns={["Name", "License No", "Phone", "Status"]}
      rows={[
        ["Amit Kumar", "DL45874", "9876543210", "Active"],
        ["Rohit Sharma", "DL99812", "9998887771", "Inactive"],
      ]}
    />
  );
}
