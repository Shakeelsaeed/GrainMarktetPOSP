import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditableRow from "../../../common/EditableRow";
import ReadOnlyRow from "../../../common/ReadOnlyRow";

export default function BasicTable(props) {
  React.useEffect(() => {}, [props.rows]);
  const rows = props.rows;
  console.log(props);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Account</TableCell>
            <TableCell align="left">Credit&nbsp;(Rs.)</TableCell>
            <TableCell align="left">Debit&nbsp;(Rs.)</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {props.editContactId === row.id ? (
                <EditableRow
                  editFormData={props.editFormData}
                  handleEditFormChange={props.handleEditFormChange}
                  handleCancelClick={props.handleCancelClick}
                  accountList={props.accountList}
                />
              ) : (
                <ReadOnlyRow
                  row={row}
                  handleEditClick={props.handleEditClick}
                  handleDeleteClick={props.handleDeleteClick}
                />
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
