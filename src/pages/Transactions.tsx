import TransactionTable from "../components/TransactionTable.tsx";
import { mockTransactions } from "../data/mockData.ts";

export default function Transactions() {
  return <TransactionTable transactions={mockTransactions} />;
}
