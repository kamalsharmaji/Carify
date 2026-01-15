import { FleetTable } from "./index";

export default function Maintenance() {
  return (
    <FleetTable
      title="Maintenance History"
      columns={["Vehicle", "Service Type", "Cost"]}
      rows={[
        ["DL09AB1234", "Engine Oil", "₹3,000"],
        ["HR26CT7890", "Brake Service", "₹5,500"],
      ]}
    />
  );
}
