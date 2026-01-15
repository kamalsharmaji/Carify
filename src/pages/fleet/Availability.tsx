import { FleetTable } from "./index";

export default function Availability() {
  return (
    <FleetTable
      title="Vehicle Availability"
      columns={["Vehicle", "Available"]}
      rows={[
        ["DL09AB1234", "Yes"],
        ["HR26CT7890", "No"],
      ]}
    />
  );
}
