import React from "react";
import {
  Form,
  TextArea,
  Comment,
  Button,
  Grid,
  Segment
} from "semantic-ui-react";

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = { edit: false };
  }

  edit = () => {
    console.log("edit");
    this.setState({
      edit: true
    });
  };

  save = () => {
    //console.log(this.inputtext.ref.value);
    //return;
    this.props.onSaveTrack({
      id: this.props.item.id,
      name: this.inputtext.ref.value
    });
    this.setState({
      edit: false
    });
  };

  remove = () => {
    this.props.onDeleteTrack(this.props.item.id);
  };

  viewNorm() {
    return (
      <Grid columns="equal">
        <Grid.Column>
          <Segment>
            <Comment>
              <Comment.Content>{this.props.children} </Comment.Content>
            </Comment>

            <Button onClick={this.edit} color="blue">
              Edit
            </Button>

            <Button onClick={this.remove} color="red">
              delete
            </Button>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }

  viewEdit() {
    return (
      <Grid columns="equal">
        <Grid.Column>
          <Form>
            <TextArea
              autoHeight
              placeholder="Fiel is empty ..."
              ref={text => {
                this.inputtext = text;
              }}
              defaultValue={this.props.children}
            />
          </Form>

          <Button onClick={this.save} positive>
            save
          </Button>
        </Grid.Column>
      </Grid>
    );
  }

  render() {
    if (this.state.edit) return this.viewEdit();
    return this.viewNorm();
  }
}

export default Task;
