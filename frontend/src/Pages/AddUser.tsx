import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { StyleSheet, css } from "aphrodite";
import NavBar from "../Components/NavBar/NavBar";
import Popover from "react-bootstrap/Popover";
import axios, { AxiosResponse } from "axios";


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

type deprProps = {
  id : string,
  title: string
}

export const AddUser = () => {
      
      const user = JSON.parse(localStorage.getItem('user') as any);
      const [username, setUsername ] = useState<string>();
      const [email, setEmail ] = useState<string>();
      const [phone, setPhone ] = useState<string>();
      const [password, setPassword ] = useState<string>();
      const [Cpassword, setCPassword ] = useState<string>();
      const [permission, setPermission] = useState<string>();
      const [Departements, setDepar] = useState<any[]>();
      
      
      useEffect(() =>{
        const DeparList = async () => {
          const res = await fetch("http://localhost:5100/api/v1/DeparList")
          const data = await res.json()
          setDepar(data)
        }
        DeparList();
      }, [])

      const handleAddNewUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

          if( password === Cpassword) {

            try{
              axios.post("http://localhost:5100/api/v1/adduser",
              {
                permission: permission,
                username: username,
                email: email,
                phone: phone,
                password: password,
                isAdmin: false
              },
              { headers: {
                Authorization: `Bearer ${user}` 
              },
            })
              .then((res: AxiosResponse<any>) => {
                console.log(res.data.message)
              })
              
            }catch(err) {
              console.log(err)
            }
    
          }
      }

      const AdminChoose = (item : deprProps) => {
        return (
          <div style={{width: '10rem', height: '0.6rem', display: 'block', accentColor: 'red'}}>
            <input
              required
              onChange={() => {setPermission(item.id)}}
              type="radio"
              id={item.id}
            />
            <label htmlFor={item.id} style={{ padding: 5 }}>
            {item.title}
            </label>
          </div>
        )
      }

      return (
      <>
        <NavBar />
        <form className={css(styles.formStyle)} onSubmit={handleAddNewUser}>
          <div>
            <label htmlFor="username">User name</label>
            <div>
              <input
                required onChange={(e)=>setUsername(e.target.value)}
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
                required onChange={(e)=>setEmail(e.target.value)}
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
                required onChange={(e)=>setPhone(e.target.value)}
                type="tel"
                id="phone"
                pattern="[0-9]{2}[0-9]{3}[0-9]{3}"
                className={css(styles.inputStyle)}
              />
            </div>
          </div>

          <div data-validate="Password is required">
            <label htmlFor="pass">Password</label>
            <div>
              <input
                required onChange={(e)=>setPassword(e.target.value)}
                type="password"
                id="pass"
                className={css(styles.inputStyle)}
              />
            </div>
          </div>

          <div data-validate="Password is required">
            <label htmlFor="pass">Confirm Password</label>
            <div>
              <input
                required onChange={(e)=>setCPassword(e.target.value)}
                type="password"
                id="Cpass"
                className={css(styles.inputStyle)}
              />
            </div>
          </div>

          <Popover id="popover-basic" style={{maxWidth: '21.5rem', paddingBottom: '1rem'}}>
            <Popover.Header as="h3">User Type</Popover.Header>
            <Popover.Body className={css(styles.popoverStyle)}>
            {Departements && Departements.map((depertement) =>
              {return <AdminChoose key={depertement.id} id={depertement.id} title={depertement.title}/> })}
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


export default AddUser;
