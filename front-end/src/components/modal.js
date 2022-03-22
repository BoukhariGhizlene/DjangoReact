import React, { Component } from "react";
// importing all of these classes from reactstrap module
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

// build a class base component
class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem
    };
  }
  // changes handler to check if a checkbox is chekced or not
  handleChange = e => {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };

  // rendering modal in the custommodal class received toggle and on save as props,
  render() {
    const { toggle, onSave } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Demandes Item </ModalHeader>
        <ModalBody>
        
          <Form>

            {/* 3 formgroups
            1 title label */}
            <FormGroup>
              <Label for="Nom">Nom</Label>
              <Input
                type="text"
                name="Nom"
                value={this.state.activeItem.Nom}
                onChange={this.handleChange}
                placeholder="Saisir le nom de client"
              />
            </FormGroup>

            {/* 2 description label */}
            <FormGroup>
              <Label for="Adresse">Adresse</Label>
              <Input
                type="text"
                name="Adresse"
                value={this.state.activeItem.Adresse}
                onChange={this.handleChange}
                placeholder="Saisir l'adresse du client"
              />
            </FormGroup>

            {/* 3 description label */}
            <FormGroup>
              <Label for="Demande">Demande</Label>
              <Input
                type="text"
                name="Demande"
                value={this.state.activeItem.Demande}
                onChange={this.handleChange}
                placeholder="Saisir la demande du client"
              />
            </FormGroup>


            {/* 4 completed label */}
            <FormGroup check>
              <Label for="livré">
                <Input
                  type="checkbox"
                  name="livré"
                  checked={this.state.activeItem.livré}
                  onChange={this.handleChange}
                />
                Livré
              </Label>
            </FormGroup>
          </Form>
        </ModalBody>
        {/* create a modal footer */}
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.activeItem)}>
            Enregistrer
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
export default CustomModal