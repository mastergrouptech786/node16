export default function(req, res){
    
    res.render("admin", { name : req.session.name });
}