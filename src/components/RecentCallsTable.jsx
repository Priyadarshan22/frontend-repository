import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function RecentCallsTable({ calls }) {
  return (
    <div className="rounded-xl border bg-black text-white">
      <Table>
        <TableHeader>
          <TableRow>
           <TableHead className="text-green-600 font-bold">Caller Name</TableHead>
            <TableHead className="text-green-600 font-bold">Caller Number</TableHead>
           <TableHead className="text-green-600 font-bold">ReceiverNumber</TableHead>
           <TableHead className="text-green-600 font-bold">City</TableHead>
            <TableHead className="text-green-600 font-bold">Duration</TableHead>
            <TableHead className="text-green-600 font-bold">Cost</TableHead>
           <TableHead className="text-green-600 font-bold">CallStartTime</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {calls.slice(0, 100).map(call => (
            <TableRow key={call.id}>
              <TableCell>{call.callerName}</TableCell>
              <TableCell>{call.callerNumber}</TableCell>
              <TableCell>{call.receiverNumber}</TableCell>
              <TableCell>{call.city}</TableCell>
              <TableCell>{call.callDuration}s</TableCell>
              <TableCell>${call.callCost}</TableCell>
              <TableCell>
                {new Date(call.callStartTime).toLocaleString()}

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
