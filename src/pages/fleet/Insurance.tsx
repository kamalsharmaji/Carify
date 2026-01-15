import { FleetTable } from "./index";

export default function Insurance() {
  return (
    <FleetTable
      title="Insurance Details"
      columns={["Vehicle", "Company", "Expiry Date"]}
      rows={[
        ["DL09AB1234", "ICICI", "12 Dec 2026"],
        ["HR26CT7890", "HDFC", "30 Nov 2025"],
      ]}
    />
  );
}
