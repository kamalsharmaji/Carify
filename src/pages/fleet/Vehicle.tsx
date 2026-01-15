import { FleetTable } from "./index";

export default function Vehicle() {
  return (
    <FleetTable
      title="Vehicle Details"
      columns={["Vehicle No", "Type", "Status"]}
      rows={[
        ["DL09AB1234", "Sedan", "Available"],
        ["HR26CT7890", "SUV", "In Service"],
      ]}
    />
  );
}
