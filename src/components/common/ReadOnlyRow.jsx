import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, TableCell } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const ReadOnlyRow = ({ row, handleEditClick, handleDeleteClick }) => {
  return (
    <>
      <TableCell align="left">{row.account}</TableCell>
      <TableCell align="left">{row.credit}</TableCell>
      <TableCell align="left">{row.debit}</TableCell>
      <TableCell align="left">{row.date}</TableCell>
      <TableCell align="left">{row.description}</TableCell>
      <TableCell align="left">
        <IconButton
          aria-label="edit"
          onClick={(event) => handleEditClick(event, row)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          onClick={() => handleDeleteClick(row.id)}
        >
          <DeleteForeverIcon />
        </IconButton>
      </TableCell>
    </>
  );
};

export default ReadOnlyRow;
