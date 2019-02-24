import * as React from "react";
import {
  Theme,
  createStyles,
  withStyles,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Modal,
  Typography
} from "@material-ui/core";
import { getBaseModalStyle } from "../getBaseModalStyle";

interface Props {
  onSubmit: (
    name: string,
    size: number
  ) => Promise<{ error: string | null; avgValue: number | null }>;
  classes: {
    formControl: string;
    button: string;
    paper: string;
  };
}

interface State {
  modelName: string;
  modelValue: number | "";
  error: string | null;
  modalText: string | null;
}

class InnerForm extends React.Component<Props, State> {
  state: State = {
    modelName: "",
    modelValue: "",
    error: null,
    modalText: null
  };
  render() {
    const { classes } = this.props;

    return (
      <div>
        {this.state.error && (
          <h5 style={{ color: "red" }}>{this.state.error}</h5>
        )}

        <FormControl className={classes.formControl}>
          <TextField
            required
            id="model"
            name="model"
            label="Model"
            fullWidth
            onChange={this.handleModelNameChange}
          />
        </FormControl>

        <FormControl className={classes.formControl} required>
          <InputLabel htmlFor="size-simple">Size</InputLabel>
          <Select
            value={this.state.modelValue}
            onChange={this.handleChange}
            inputProps={{
              name: "size",
              id: "size-simple"
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>1 - Really Small</MenuItem>
            <MenuItem value={2}>2 - Small</MenuItem>
            <MenuItem value={3}>3 - True to Size</MenuItem>
            <MenuItem value={4}>4 - Big</MenuItem>
            <MenuItem value={5}>5 - Really Big</MenuItem>
          </Select>
        </FormControl>

        <Button
          color="primary"
          className={classes.button}
          onClick={this.handleSubmit}
          disabled={!this.state.modelName || !this.state.modelValue}
        >
          Submit
        </Button>

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

  private handleModelNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({ modelName: event.target.value });
  };

  private handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (!event.target.value) {
      return;
    }

    try {
      const modelValue = parseInt(event.target.value);
      this.setState({ modelValue });
    } catch (err) {
      // Do nothing.
    }
  };

  private handleSubmit = async () => {
    const { modelName, modelValue } = this.state;

    if (modelValue === "") {
      return;
    }

    const response = await this.props.onSubmit(modelName, modelValue);
    if (!response.error) {
      this.setState({
        error: null,
        modalText: `Success! The average True-to-Size value is ${
          response.avgValue
        }`,
        modelName: "",
        modelValue: ""
      });
    } else {
      this.setState({ error: response.error });
    }
  };
}

const styles = (theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120
    },
    button: {
      margin: theme.spacing.unit
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

export const MainForm = withStyles(styles)(InnerForm);
