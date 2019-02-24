import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

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
  };
}

interface State {
  queryValue: string;
}

class InnerAppBar extends React.Component<Props, State> {
  state: State = {
    queryValue: ""
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
      </div>
    );
  }

  private handleQuery = async () => {
    const result = await this.props.onQuery(this.state.queryValue);
    console.log(result);
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
    }
  });

export const SearchAppBar = withStyles(styles)(InnerAppBar);
