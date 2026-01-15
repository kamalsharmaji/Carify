import { FleetTable } from "./index";

export default function FuelHistory() {
  return (
    <FleetTable
      title="Fuel History"
      columns={["Vehicle", "Date", "Liters", "Amount"]}
      rows={[
        ["DL09AB1234", "15 Jan", "20L", "₹2,000"],
        ["HR26CT7890", "16 Jan", "25L", "₹2,600"],
      ]}
    />
  );
}
