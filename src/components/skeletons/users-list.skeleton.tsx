import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import Skeleton from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";

export function UserListSkeleton() {
  return (
    <TableContainer>
      <Table aria-label="collapsible table" size="medium">
        <TableHead>
          <TableRow>
            <TableCell>
              <Skeleton width={100} />
            </TableCell>
            <TableCell>
              <Skeleton width={150} />
            </TableCell>
            <TableCell>
              <Skeleton width={120} />
            </TableCell>
            <TableCell>
              <Skeleton width={80} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton width={100} height={20} />
              </TableCell>
              <TableCell>
                <Skeleton width={150} height={20} />
              </TableCell>
              <TableCell>
                <Skeleton width={120} height={20} />
              </TableCell>
              <TableCell>
                <Skeleton width={80} height={20} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
