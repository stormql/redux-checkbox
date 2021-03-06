import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { toggleCheckbox } from "../actions";

import { connect } from 'react-redux';
import compose from 'recompose/compose';

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
    this.handleSave = this.handleSave.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleClear() {
    const key = this.props.repo;
    this.setState({ checked: [] });
    localStorage.removeItem(key);
  }

  handleSave() {
    const key = this.props.repo;
    const myAry = this.state.checked;
    localStorage.setItem(key, JSON.stringify(myAry));
  }

  handleToggle = value => () => {
    const datadir = value.name;
    console.log('handleToggle ', datadir);
    toggleCheckbox(datadir);
  }

  handleToggleNoRedux = value => () => {
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
          onClick={this.handleSave}
          variant="raised"
          color="primary"
          className={classes.button}
        >
          Save to LocalStorage
        </Button>

        <Button
          onClick={this.handleClear}
          variant="raised"
          color="secondary"
          className={classes.button}
        >
          Clear Data
        </Button>
      </div>
    );
  }
}

FileSelector.propTypes = {
  classes: PropTypes.object.isRequired,
  repo: PropTypes.string.isRequired,
  files: PropTypes.array.isRequired
};

const mapDispatchToProps = dispatch => ({
  handleToggle: value => dispatch(this.handleToggle(value))
})

export default compose(
  withStyles(styles, {
    name: 'FileSelector'
  }),
  connect(mapDispatchToProps),
)(FileSelector);
