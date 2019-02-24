import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { Modal } from "@material-ui/core";
import { getBaseModalStyle } from "../getBaseModalStyle";

const KEY_CODE_ENTER = 13;

interface Props {
  onQuery: (
    name: string
  ) => Promise<{ avgValue: number | null; error: string | null }>;
  classes: {
    root: string;
    title: string;
    grow: string;
    search: string;
    searchIcon: string;
    inputRoot: string;
    inputInput: string;
    paper: string;
  };
}

interface State {
  queryValue: string;
  modalText: string | null;
}

class InnerAppBar extends React.Component<Props, State> {
  state: State = {
    queryValue: "",
    modalText: null
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
              noWrap
            >
              StockX - True to Size
            </Typography>
            <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                value={this.state.queryValue}
                placeholder="Search..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                onChange={e => {
                  this.setState({ queryValue: e.target.value });
                }}
                onKeyUp={e => {
                  if (e.keyCode === KEY_CODE_ENTER) {
                    this.handleQuery();
                  }
                }}
              />
            </div>
          </Toolbar>
        </AppBar>

        <Modal
          aria-labelledby="modal"
          aria-describedby="modal"
          open={this.state.modalText !== null}
          onClose={() => {
            this.setState({ modalText: null });
          }}
        >
          <div style={getBaseModalStyle()} className={classes.paper}>
            <Typography variant="subtitle1" id="modal">
              {this.state.modalText}
            </Typography>
          </div>
        </Modal>
      </div>
    );
  }

  private handleQuery = async () => {
    if (!this.state.queryValue) {
      return;
    }

    const result = await this.props.onQuery(this.state.queryValue);

    if (result.error) {
      this.setState({
        modalText: `Something went wrong. Please try again. Error: ${
          result.error
        }`
      });
    }

    if (result.avgValue) {
      this.setState({
        modalText: `The average True-ToSize value for ${
          this.state.queryValue
        } is ${result.avgValue}`
      });
    } else {
      this.setState({
        modalText: `There are no true-to-size entries for '${
          this.state.queryValue
        }'`
      });
    }
  };
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "100%"
    },
    grow: {
      flexGrow: 1
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block"
      }
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing.unit,
        width: "auto"
      }
    },
    searchIcon: {
      width: theme.spacing.unit * 9,
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    inputRoot: {
      color: "inherit",
      width: "100%"
    },
    inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: 120,
        "&:focus": {
          width: 200
        }
      }
    },
    paper: {
      position: "absolute",
      width: theme.spacing.unit * 50,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
      outline: "none"
    }
  });

export const SearchAppBar = withStyles(styles)(InnerAppBar);
