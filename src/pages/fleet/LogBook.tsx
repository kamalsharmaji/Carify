import { FleetTable } from "./index";

export default function LogBook() {
  return (
    <FleetTable
      title="Vehicle Log Book"
      columns={["Vehicle", "Driver", "Date", "KM"]}
      rows={[
        ["DL09AB1234", "Amit", "12 Jan", "320"],
        ["HR26CT7890", "Rohit", "14 Jan", "180"],
      ]}
    />
  );
}
