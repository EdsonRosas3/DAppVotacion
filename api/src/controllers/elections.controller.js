const existElections = async (req, res) => {


    try {

        
      // estamos en etapa de postulacion -> {message: "estamos en etapa de postulacion", electiion:false, postulate:true}
      return res.status(200).json ({message: "estamos en etapa de postulacion", electiion:false, postulate:true});
      // no estamos en eleciones -> {messaage: "No hay elecciones",election:false, postulate:false}

      //estamos en eleciones -> los datos de la elecion con los postulantes {users,message: "Estamos en eleciones vota",election:true,postulate:false}
  
    } catch (error) {
      return res.status(500).json(error);
    }
  };

modulo.exports = {
    existElections,
}