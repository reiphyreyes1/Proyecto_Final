import React, { Component,useState} from "react";
import logo from "./logo.svg";
import "./App.css";
import firebase from "./firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import GoogleLogin from 'react-google-login';






var hoy = new Date();
var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
var fechaYHora = fecha + ' ' + hora;





class App extends React.Component {

  state = {
    data: [],
    modalInsertar: false,
    modalEditar: false,
    form:{
      Usuario: '',
      pass: '',
      titulo: '',
      cuerpo: '',
      fecha:fechaYHora
    },
    id: 0
  };

 

  peticionGet = () => {

    firebase.child("canales").on("value", (nombre) => {
      if (nombre.val() !== null) {
        this.setState({ ...this.state.data, data: nombre.val() });
      } else {
        this.setState({ data: [] });
      }
    });
  };

  peticionPost=()=>{
    firebase.child("canales").push(this.state.form,
      error=>{
        if(error)console.log(error)
      });
      this.setState({modalInsertar: false});
      this.setState({modalregistrar: false});

  }
  

  peticionPut=()=>{
    
    firebase.child(`canales/${this.state.id}`).set(
      this.state.form,
      error=>{
        if(error)console.log(error)
      });
      this.setState({modalEditar: false});
  }

 

  handleChange=e=>{
    this.setState({form:{
      ...this.state.form,
      [e.target.name]: e.target.value
    }})
    console.log(this.state.form);
  }

  seleccionarCanal=async(nombre, id, caso)=>{

    await this.setState({form: nombre, id: id});

    (caso==="Editar")?this.setState({modalEditar: true}):
    this.peticionDelete()

  }

  componentDidMount() {
    this.peticionGet();
  }

  submit(){
  
    console.log();
  }


  render() {

  
    return (


      <div className="App">
      

        <br />
        {Object.keys(this.state.data).map(i=>{

          if (this.state.data[i].Usuario == "Hector2@gmail.com" && this.state.data[i].pass == "1234") {
            return( <button className="btn btn-success"  onClick={()=>this.setState({modalInsertar: true})}>Insertar</button>)
                
          }

      })}


          <button className="btn btn-success"  onClick={()=>this.setState({modalInsertar: true})}>Insertar</button> {"   "}
        <button className="btn btn-success" onClick={()=>this.setState({modalsesion: true})}>sesion</button>
        <br />
        <br />
        

            {Object.keys(this.state.data).map(i=>{
             // console.log(i);
              return <tr key={i}>
                
                
                <div class="card">
                  
                  <div class="card-body">
                    <h5 class="card-title"> {this.state.data[i].titulo}
                    
                    </h5>
                    <p class="card-text">{this.state.data[i].cuerpo}</p>
                  </div>
                  <div class="card-footer text-muted">
                    {this.state.data[i].fecha }
                  </div>
                </div>  
                <br></br>
                <br></br>

              </tr>
            })}
        
        <Modal isOpen={this.state.modalInsertar}>
      <ModalHeader>Insertar Registro</ModalHeader>
      <ModalBody>
        <div className="form-group">
          
          <label>Titulo</label>
          <br />
          <input type="text" className="form-control" name="titulo" onChange={this.handleChange}/>
          <br />
          <label>Comentario: </label>
          <br />
          <textarea class="form-control" aria-label="With textarea" name="cuerpo" onChange={this.handleChange} ></textarea>
         
          
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>this.peticionPost()}>Insertar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>this.setState({modalInsertar: false})}>Cancelar</button>
      </ModalFooter>
    </Modal>


    <Modal isOpen={this.state.modalsesion}>
      <ModalHeader ><div id="iniciarTexto">Iniciar Sesion</div></ModalHeader>
      <ModalBody>
    
      <div className="form-group">
                <label htmlFor="email">Correo Electronico</label>
                <br />
                <input type="email" className="form-control" onChange={this.handleChange} id="Usuario" />
                <br />
                <label htmlFor="password">Contraseña</label>
                <br />
                <input type="password" className="form-control" onChange={this.handleChange} id="password"  />
                <br />
                <button className="btn btn-primary" id="iniciar"  onClick={()=>this.submit()}>Inicar</button>{"   "}
            </div>
      
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>this.setState({modalsesion: false, modalregistrar: true})}>Registrar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>this.setState({modalsesion: false})}>Cancelar</button>
      </ModalFooter>
    </Modal>

    <Modal isOpen={this.state.modalregistrar}>
      <ModalHeader>Registro</ModalHeader>
      <ModalBody>
        <div className="form-group">
          
          <label>Usuario</label>
          <br />
          <input type="email" className="form-control" name="Usuario" onChange={this.handleChange}/>
          <br />
          <label>Password: </label>
          <br />
          <input type="password" className="form-control" name="pass" onChange={this.handleChange}/>
         
          
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>this.peticionPost()}>Guardar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>this.setState({modalregistrar: false})}>Cancelar</button>
      </ModalFooter>
    </Modal>

      </div>
    );
  }
}



export default App;