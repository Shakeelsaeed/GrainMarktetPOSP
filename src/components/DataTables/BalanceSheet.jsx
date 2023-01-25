import "jspdf-autotable";
import React from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "./BalanceSheet.css";
import { CSVLink } from "react-csv";
import { loadCSS } from "fg-loadcss";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import YearPicker from "react-year-picker";
import { Button, Grid } from "@mui/material";
import DataTable from "react-data-table-component";
import DownloadIcon from "@mui/icons-material/Download";
import {
  getbalancesheet,
  accountList,
} from "../../redux-implementation/actions";

class BalanceSheet extends React.Component {
  constructor() {
    super();

    this.columns = [
      {
        name: "Name",
        selector: "account_id",
        sortable: true,
      },
      {
        name: "description",
        selector: "description",
        sortable: true,
      },
      {
        name: "Date",
        selector: "date",
        sortable: true,
      },
      {
        name: "Credit",
        selector: "amount",
        sortable: false,
      },
      {
        name: "Debit",
        selector: "amount",
        sortable: false,
      },
      {
        name: "Active",
        button: true,
        cell: (row) => (
          <Form.Check
            type="switch"
            id="custom-switch"
            checked={row.active}
            disabled
          />
        ),
      },
      {
        name: "Action",
        button: true,
        cell: (row) => (
          <a href={"/edit-document-category/" + row.docCategoryUID} exact>
            Edit
          </a>
        ),
      },
    ];
    this.state = { original_rows: [], rows: [], search: "" };
    this.columns_data_for_export = this.columns
      .slice(0, this.columns.length - 1)
      .map((d) => d.name);
    this.rows_data_for_export = this.state.rows.map((d1) =>
      this.columns
        .slice(0, this.columns.length - 1)
        .map((d2) => d2.selector)
        .map((d3) => d1[d3])
    );
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.do_search = this.do_search.bind(this);
    this.download_pdf = this.download_pdf.bind(this);
  }

  componentDidMount() {
    const start = `${new Date().getFullYear()}-01-01`;
    const end = `${new Date().getFullYear()}-12-31`;
    this.props.accountList();
    this.props.getbalancesheet(start, end);
    // eslint-disable-next-line no-lone-blocks
    {
      this.props.state.balanceSheet &&
        // eslint-disable-next-line array-callback-return
        this.props.state.balanceSheet.credit_list.map((c) => {
          // eslint-disable-next-line array-callback-return
          this.props.state.accountsList.map((a) => {
            if (a.account_id === c.account_id) console.log(a.account_name);
          });
        });
    }

    const node = loadCSS(
      "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );

    return () => {
      node.parentNode.removeChild(node);
    };
  }

  handleInputChange(event) {
    this.setState({ search: event.target.value });
  }

  handleKeyDown(event) {
    if (event.key === "Enter") {
      this.do_search();
    }
  }

  do_search() {
    const temp_rows = this.state.original_rows.filter(
      (e) => JSON.stringify(e).indexOf(this.state.search) >= 0
    );
    this.setState({ rows: temp_rows });
  }

  download_pdf() {
    const doc = new jsPDF();

    const temp_rows = this.state.rows.map((d1) =>
      this.columns
        .slice(0, this.columns.length - 1)
        .map((d2) => d2.selector)
        .map((d3) => d1[d3])
    );
    doc.autoTable({
      head: [this.columns_data_for_export],
      body: temp_rows,
    });
    console.log(this.columns_data_for_export, temp_rows);
    let docname = `BalanceSheetof${new Date().getFullYear()}.pdf`;
    console.log(docname);
    doc.save("BalanceSheetof.pdf");
  }

  handleDateChange(e) {
    console.log(e);
  }

  render() {
    return (
      <div className="pageContainer">
        <p className="pageHeading">Balance Sheet</p>
        <div className="pageBox">
          <Grid container spacing={2} margin="normal">
            <Grid item xs={4}>
              <Form.Control
                type="text"
                placeholder="Search"
                style={{
                  padding: 10,
                  borderRadius: "5px",
                  border: "1px solid gray",
                }}
                onChange={this.handleInputChange}
                onKeyDown={this.handleKeyDown}
              />
            </Grid>
            <Grid item xs={2}>
              <Button variant="primary" className="primaryBtn">
                <DownloadIcon />
                <CSVLink
                  data={this.rows_data_for_export}
                  headers={this.columns_data_for_export}
                  filename={"client_list.csv"}
                >
                  Excel
                </CSVLink>
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="primary"
                className="marginLeft primaryBtn"
                onClick={this.download_pdf}
              >
                <DownloadIcon />
                Pdf
              </Button>
            </Grid>
          </Grid>
          <div className="clientContainer_old">
            <div className="tableContainer">
              <DataTable
                title="Client List"
                columns={this.columns}
                data={this.state.rows}
                pagination
                striped
                dense
                noHeader
              />
            </div>
          </div>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              Select Year to find Balance Sheet
            </Grid>
            <Grid item xs={4}>
              <YearPicker onChange={this.handleDateChange} />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  state: state,
});
const mapDispatchToProps = (disptch) => ({
  getbalancesheet: (start, end) => disptch(getbalancesheet(start, end)),
  accountList: () => disptch(accountList()),
});
export default connect(mapStateToProps, mapDispatchToProps)(BalanceSheet);
