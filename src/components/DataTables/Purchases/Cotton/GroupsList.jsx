import React, { useEffect } from "react";
import EnhancedTable from "./DataTables";
import { groupList } from "../../../redux-implementation/actions";
import { connect } from "react-redux";
import { List } from "@material-ui/core";

function GroupsList({ list, groupList }) {
  useEffect(() => {
    groupList();
  }, [groupList]);
  console.log(list)
  return <EnhancedTable list={list && list} />;
}

const mapStateToProps = (state) => ({
  list: state.groupsList,
});
export default connect(mapStateToProps, { groupList })(GroupsList);
