import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  button: {
    margin: theme.spacing.unit
  }
});

class FileSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = { checked: [] };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const myAry = this.state.checked;
    if (myAry.length === 0) {
      console.log("Nothing was written to local storage");
    } else {
      console.log("Write data to local storage");
    }
  }

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List>
          {this.props.files.map(value => (
            <ListItem
              key={value.name}
              role={undefined}
              dense
              button
              onClick={this.handleToggle(value)}
              className={classes.listItem}
            >
              <Checkbox
                checked={this.state.checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary={value.name} />
            </ListItem>
          ))}
        </List>

        <Button
          onClick={this.handleClick}
          variant="raised"
          color="primary"
          className={classes.button}
        >
          Save to LocalStorage
        </Button>
      </div>
    );
  }
}

FileSelector.propTypes = {
  classes: PropTypes.object.isRequired,
  files: PropTypes.array.isRequired
};

export default withStyles(styles)(FileSelector);
