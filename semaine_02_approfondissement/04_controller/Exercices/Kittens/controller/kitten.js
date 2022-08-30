import { find } from '../model/kitten.js';

export default (req, res) => {
    const kitten = find(req.params.id);
    
    if (kitten) {
      res.render("kitten", {
        kitten,
      });
  
      return;
    }
  
    res.send("404");
}