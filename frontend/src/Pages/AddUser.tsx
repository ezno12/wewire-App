import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { StyleSheet, css } from "aphrodite";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import NavBar from "../Components/NavBar/NavBar";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

const styles = StyleSheet.create({
  formStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2rem",
    "margin-inline": "auto",
    padding: "2rem",
  },
  rembermeStyle: {
    display: "flex",
    flexDirection: "row",
    gap: "5rem",
  },
  inputStyle: {
    marginTop: "0.2rem",
    borderRadius: "1.6rem",
    padding: ".5rem",
    width: "20rem",
    borderColor: "grey",
    backgroundColor: "#c8c8c8 ",
    ":focus": {
      outline: "none",
      borderColor: "#ff1a1a",
    },
    
  },
  buttonStyle: {
    padding: "0.6rem 9.6rem",
    borderRadius: "1.6rem",
    backgroundColor: "#ff1a1a",
    border: "none",
    ":hover": {
      backgroundColor: "#ff4d4d",
    },
  },
  forgetStyle: {
    color: "#ff1a1a",
    textDecoration: "none",
  },
  profileImgeStyle: {
    height: "6rem",
    display: "flex",
    justifyContent: "center",
  },
  popoverStyle:{
    display: 'flex',
    flexFlow: 'row wrap',
    width: '33rem',
    gap: '1.1rem',
    
  }
});

export class AddUser extends Component {
  render() {
    return (
      <>
        <NavBar />
        <form className={css(styles.formStyle)}>
          <div>
            <label htmlFor="username">User name</label>
            <div>
              <input
                type="text"
                id="username"
                className={css(styles.inputStyle)}
              />
            </div>
          </div>

          <div data-validate="Valid email is required: ex@abc.xyz">
            <label htmlFor="email">Mail</label>
            <div>
              <input
                type="email"
                id="email"
                className={css(styles.inputStyle)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone">Phone number</label>
            <div>
              <input
                type="tel"
                id="phone"
                pattern="[0-9]{2}-[0-9]{3}-[0-9]{3}"
                className={css(styles.inputStyle)}
              />
            </div>
          </div>

          <div data-validate="Password is required">
            <label htmlFor="pass">Password</label>
            <div>
              <input
                type="password"
                id="pass"
                className={css(styles.inputStyle)}
              />
            </div>
          </div>

          <Popover id="popover-basic" style={{maxWidth: '21.5rem', paddingBottom: '1rem'}}>
            <Popover.Header as="h3">User Type</Popover.Header>
            <Popover.Body className={css(styles.popoverStyle)}>
            {deprtList.map((depertementAdmin) =>
              {return <AdminChoose key={depertementAdmin.id} id={depertementAdmin.id} title={depertementAdmin.title}/> })}
            </Popover.Body>
          </Popover>

          <div style={{ margin: "2.9rem 0" }}>
            <Button className={css(styles.buttonStyle)} type="submit">
              Add
            </Button>
          </div>
        </form>
      </>
    );
  }
}
type deprProps = {
  id : string,
  title: string
}
function AdminChoose(item : deprProps) {
  return (
    <div style={{width: '10rem', height: '0.6rem', display: 'block', accentColor: 'red'}}>
      <input
        type="checkbox"
        id={item.id}
      />
      <label htmlFor={item.id} style={{ padding: 5 }}>
      {item.title}
      </label>
    </div>
  )
}

const deprtList = [ 
  {
    id: 'regular',
    title: 'Regular User'
  },
  {
    id: 'mangement',
    title: 'Mangement Admin'
  },
  {
    id: 'maintenence',
    title: 'Maintenence Admin'
  },
  {
    id: 'quality ',
    title: 'Quality Admin'
  },
  {
    id: 'enviroment',
    title: 'Enviroment Admin'
  },
  {
    id: 'ie',
    title: 'IE Admin'
  },
  {
    id: 'logistic',
    title: 'Logistic Admin'
  },
  {
    id: 'it',
    title: 'IT Admin'
  },
  {
    id: 'production',
    title: 'Production Admin'
  },
  {
    id: 'hr',
    title: 'HR Admin'
  },
]





export default AddUser;
