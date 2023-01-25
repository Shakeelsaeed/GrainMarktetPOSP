import React, { useEffect } from "react";
import EnhancedTable from "./DataTables";
import { accountList, groupList } from "../../../redux-implementation/actions";
import { connect } from "react-redux";

function AccountsList({ state, accountList, groupList }) {
  useEffect(() => {
    groupList();
    accountList();
  }, [accountList, groupList]);
  const headCells = [
    {
      id: "account_id",
      numeric: false,
      disablePadding: true,
      label: "Account ID",
    },
    {
      id: "account_name",
      numeric: true,
      disablePadding: false,
      label: "Account Name",
    },
    {
      id: "group_id",
      numeric: true,
      disablePadding: false,
      label: "Group",
    },
    {
      id: "phone_number",
      numeric: true,
      disablePadding: false,
      label: "Phone Number",
    },
    {
      id: "opening_balance",
      numeric: true,
      disablePadding: false,
      label: "Opening Balance",
    },
  ];
  return (
    <>
      {state.groupsList && state.accountsList && (
        <EnhancedTable
          headCells={headCells}
          groups={state.groupsList}
          list={state.accountsList}
        />
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  state: state,
});
export default connect(mapStateToProps, { accountList, groupList })(
  AccountsList
);
