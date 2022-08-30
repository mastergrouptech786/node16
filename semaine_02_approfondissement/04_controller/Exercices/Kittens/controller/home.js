
import { all } from '../model/kitten.js'

export default  (req, res) =>{
    const kittens = all() ;
    
    res.render("home", {
      kittens,
    });
  }