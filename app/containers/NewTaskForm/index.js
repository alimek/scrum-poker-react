import React from 'react';

import styles from './styles.css';
import { Button, Input } from '../../components';
import { createTask } from '../../actions/TaskActions';

class NewTaskForm extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor() {
    super();
    this.state = {
      taskName: '',
    };

    this.addTask = this.addTask.bind(this);
  }

  addTask() {
    if (!this.isValid()) return;

    createTask(this.state.taskName)
      .then(() => {
        this.setState({ taskName: '' });
      });
  }

  isNameValid() {
    return this.state.taskName === '' || this.state.taskName.length > 0;
  }

  isValid() {
    return this.state.taskName !== '' && this.isNameValid();
  }

  render() {
    return (
      <section className={styles.newTaskForm}>
        <header className={styles.header}>Add new task</header>
        <Input
          value={this.state.taskName}
          name="newTaskName"
          isValid={this.isNameValid()}
          onChange={(event) => this.setState({ taskName: event.target.value })}
          placeholder="Enter task name"
          style={{ marginBottom: '0.5rem' }}
        />
        <Button
          text="Add new task"
          onClick={this.addTask}
        />
      </section>
    );
  }
}

export default NewTaskForm;