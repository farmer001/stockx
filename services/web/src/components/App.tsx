import * as React from "react";
import { SearchAppBar } from "./SearchAppBar";
import {
  Paper,
  Typography,
  Theme,
  createStyles,
  withStyles,
  CssBaseline,
  Divider
} from "@material-ui/core";
import { MainForm } from "./MainForm";

interface Props {
  classes: {
    layout: string;
    paper: string;
  };
}

class InnerApp extends React.Component<Props> {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <CssBaseline />
        <SearchAppBar onQuery={this.handleQuery} />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              What is True-to-Size?
            </Typography>

            <Typography component="p">
              True-to-size refers to whether or not a shoe fits as expected for
              a given size. True shoe sizes are measured using the Brannock
              device, the number shown on that device next to your toe is your
              true shoe size.
            </Typography>

            <Divider style={{ marginTop: "10px", marginBottom: "10px" }} />

            <MainForm onSubmit={this.handleSubmit} />
          </Paper>
        </main>
      </div>
    );
  }

  private handleSubmit = (name: string, size: number) => {
    console.log(`${name} -> ${size}`);
    // Basic validation
    if (!name || !size) {
      throw new Error("Fields must not be empty.");
    }

    return fetch(`http://true-size.localhost:8080/true-size`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, size })
    })
      .then(res => res.json())
      .then(({ error, avgValue }) => ({ error, avgValue }));
  };

  private handleQuery = (
    name: string
  ): Promise<{ avgValue: number | null; error: string | null }> => {
    return fetch(
      `http://true-size.localhost:8080/true-size/${encodeURIComponent(name)}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      }
    ).then(res => res.json());
  };
}

const styles = (theme: Theme) =>
  createStyles({
    layout: {
      width: "auto",
      marginLeft: theme.spacing.unit * 2,
      marginRight: theme.spacing.unit * 2,
      [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
        width: 600,
        marginLeft: "auto",
        marginRight: "auto"
      }
    },
    paper: {
      marginTop: theme.spacing.unit * 3,
      marginBottom: theme.spacing.unit * 3,
      padding: theme.spacing.unit * 2,
      [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
        marginTop: theme.spacing.unit * 6,
        marginBottom: theme.spacing.unit * 6,
        padding: theme.spacing.unit * 3
      }
    }
  });

export const App = withStyles(styles)(InnerApp);
