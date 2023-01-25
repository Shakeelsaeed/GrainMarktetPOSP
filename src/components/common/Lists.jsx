import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DescriptionIcon from "@mui/icons-material/Description";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { Link, useLocation } from "react-router-dom";
import WheatIcon from "../../assets/icons/wheat.png";
import CottonIcon from "../../assets/icons/cotton.png";

export default function NestedList() {
  const [open, setOpen] = React.useState(true);
  const path = useLocation().pathname;
  const handleClick = () => {
    setOpen(!open);
  };
  const displayList = () => {
    if (path.match("accounts")) {
      return (
        <React.Fragment>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <ManageAccountsIcon />
            </ListItemIcon>
            <ListItemText primary="Accounts" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="/accounts/add-accounts">
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <PersonAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add Account" />
                </ListItemButton>
              </Link>
              <Link to="/accounts/add-groups">
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <GroupAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add Groups" />
                </ListItemButton>
              </Link>
              <Link to="/accounts/accounts-list">
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <RecentActorsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Accounts List" />
                </ListItemButton>
              </Link>
              <Link to="/accounts/add-products">
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <AddCircleOutlineIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add Products" />
                </ListItemButton>
              </Link>
              <Link to="/accounts/balance-sheet">
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <DescriptionIcon />
                  </ListItemIcon>
                  <ListItemText primary="Balance Sheet" />
                </ListItemButton>
              </Link>
            </List>
          </Collapse>
        </React.Fragment>
      );
    }
    if (path.match("transactions")) {
      return (
        <React.Fragment>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <PointOfSaleIcon />
            </ListItemIcon>
            <ListItemText primary="Transactions" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="/transactions/add-wheat-purchase">
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <img
                      src={WheatIcon}
                      alt="Wheat Purchase"
                      width={20}
                      height={20}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Wheat Purchase" />
                </ListItemButton>
              </Link>
              <Link to="/transactions/add-wheat-sale">
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <MonetizationOnIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sale Wheat" />
                </ListItemButton>
              </Link>
              <Link to="/transactions/add-cotton-purchase">
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <img
                      src={CottonIcon}
                      alt="Cotton Purchase"
                      width={20}
                      height={20}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Cotton Purchase" />
                </ListItemButton>
              </Link>
              <Link to="/transactions/add-cotton-sale">
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <MonetizationOnIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sale Cotton" />
                </ListItemButton>
              </Link>
              <Link to="/transactions/general-voucher">
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ConfirmationNumberOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="General Voucher" />
                </ListItemButton>
              </Link>
              <Link to="/accounts/add-products">
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <AddCircleOutlineIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add Products" />
                </ListItemButton>
              </Link>
              <Link to="/accounts/account-position">
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <DescriptionIcon />
                  </ListItemIcon>
                  <ListItemText primary="A/C Position" />
                </ListItemButton>
              </Link>
            </List>
          </Collapse>
        </React.Fragment>
      );
    }
    if (path.match("report")) {
      return (
        <React.Fragment>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <ManageAccountsIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="/reports/wheat-purchases">
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <PersonAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Wheat Purchases" />
                </ListItemButton>
              </Link>
              <Link to="/reports/wheat-sales">
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <GroupAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Wheat Sales" />
                </ListItemButton>
              </Link>
              <Link to="/reports/cotton-purchases">
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <RecentActorsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Cotton Purchases" />
                </ListItemButton>
              </Link>
              <Link to="/reports/cotton-sales">
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <AddCircleOutlineIcon />
                  </ListItemIcon>
                  <ListItemText primary="Cotton Sales" />
                </ListItemButton>
              </Link>
              <Link to="/reports/account-transections">
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <DescriptionIcon />
                  </ListItemIcon>
                  <ListItemText primary="A/C Transactions" />
                </ListItemButton>
              </Link>
            </List>
          </Collapse>
        </React.Fragment>
      );
    }
    if (path.match("tools")) {
      return (
        <React.Fragment>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <ManageAccountsIcon />
            </ListItemIcon>
            <ListItemText primary="Tools" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="/accounts/add-accounts">
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <PersonAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add Account" />
                </ListItemButton>
              </Link>
              <Link to="/accounts/add-groups">
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <GroupAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add Groups" />
                </ListItemButton>
              </Link>
              <Link to="/accounts/accounts-list">
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <RecentActorsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Accounts List" />
                </ListItemButton>
              </Link>
              <Link to="/accounts/add-products">
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <AddCircleOutlineIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add Products" />
                </ListItemButton>
              </Link>
              <Link to="/accounts/account-position">
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <DescriptionIcon />
                  </ListItemIcon>
                  <ListItemText primary="Account Position" />
                </ListItemButton>
              </Link>
            </List>
          </Collapse>
        </React.Fragment>
      );
    }
  };
  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {/* <ListItemButton>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Sent mail" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="Drafts" />
      </ListItemButton> */}
      {displayList()}
    </List>
  );
}
