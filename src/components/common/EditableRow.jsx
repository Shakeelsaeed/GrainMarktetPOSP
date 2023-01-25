import React from "react";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { IconButton, TableCell } from "@mui/material";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <>
      <TableCell align="left">
        <input
          type="text"
          required="required"
          placeholder="Enter a name..."
          name="account"
          style={{ width: "120px" }}
          value={editFormData.account}
          onChange={handleEditFormChange}
        ></input>
      </TableCell>
      <TableCell align="left">
        <input
          type="text"
          required="required"
          placeholder="Enter a name..."
          name="credit"
          style={{ width: "120px" }}
          disabled={editFormData.credit === 0 ? true : false}
          value={editFormData.credit}
          onChange={handleEditFormChange}
        ></input>
      </TableCell>
      <TableCell align="left">
        <input
          type="text"
          required="required"
          placeholder="Enter a name..."
          name="debit"
          style={{ width: "120px" }}
          disabled={editFormData.debit === 0 ? true : false}
          value={editFormData.debit}
          onChange={handleEditFormChange}
        ></input>
      </TableCell>
      <TableCell align="left">
        <input
          type="date"
          required="required"
          placeholder="Enter a name..."
          name="date"
          style={{ width: "120px" }}
          value={editFormData.date}
          onChange={handleEditFormChange}
        ></input>
      </TableCell>
      <TableCell align="left">
        <input
          type="text"
          required="required"
          placeholder="Enter a name..."
          name="description"
          style={{ width: "120px" }}
          value={editFormData.description}
          onChange={handleEditFormChange}
        ></input>
      </TableCell>
      <td>
        <IconButton type="submit">
          <SaveIcon />
        </IconButton>
        <IconButton onClick={handleCancelClick}>
          <CancelIcon />
        </IconButton>
      </td>
    </>
  );
};

export default EditableRow;
