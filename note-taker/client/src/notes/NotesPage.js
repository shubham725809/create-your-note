import React from 'react';
import 'App.css';
import { Redirect } from 'react-router-dom'
import Loader from "globals/Loader";
import axios from "axios";
import config from "config";
import NoteCard from "notes/NoteCard";

import {
  Container, Col, Form, Row,
  FormGroup, Label, Input,
  Button, Modal, Alert, Card, 
  CardImg, CardBody, CardTitle, Spinner
} from 'reactstrap';

class Notes extends React.Component {
  constructor(props){  
    super(props);  
    this.state = {
      isLoggedIn: false,
      render: false,
      notes: []
    }
    this.getNotes();
  }

  getNotes = () => {
    axios.get(`${config.backEndServer}/notes/gated?token=${JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).token : ''}`, {
    })
    .then((res) => {
      this.setState({render: true, notes: res.data.notes});
    })
    .catch(e => {
      
    })
  }

  renderNotes = () => {
    return (
      <Row>
        {this.state.notes.map((prop, key) => (
          <Col sm="3">
            <NoteCard 
              title={prop.title}
              hasAccess={prop.hasAccess}
              slug={prop.slug}  
            />
          </Col>
          )
        )}
        <Col sm="3">
          <Card>
          <CardImg src="/new.png" alt="Note" />
            <CardBody>
              <CardTitle>{this.props.title}</CardTitle>
                <Button color="warning" href={`/add`}>
                  New note
                </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  }

  renderWelcome = () => {
    let search = this.props.location.search;
    let params = new URLSearchParams(search);
    if(params.get('welcome')) {
      return (
        <Alert color="primary">Welcome to Notes, You have successfully activated your account</Alert>
      )
    }
    return null;
  }

  render() {
    if(!this.state.render) {
      return <Loader/>
    }
    return (
      <div>
        {this.renderWelcome()}
        {this.renderNotes()}
      </div>
    );
  }
}

export default Notes;
