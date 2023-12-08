const Donnation = require("../model/Donnation");

async function add(req, res, next) {
  try {
    const donnation = new Donnation(req.body);
    await donnation.save();
    res.status(200).send("Donnation added successfully");
  } catch (err) {
    console.error(err);
  }
}
async function show(req, res, next) {
  try {
    const data = await Donnation.find();
    //res.json(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}
async function update(req, res, next) {
  try {
    const data = await Donnation.findByIdAndUpdate(req.params.id, req.body);
    res.send("updated");
  } catch (err) {}
}
async function deleteDonnation(req, res, next) {
    try{
     const data = await Donnation.findByIdAndDelete(req.params.id,req.body);
     res.send("removed");
    }
    catch(err){}
   }
   async function findDonnation(req, res, next) {
    try{
     const data = await Donnation.findById(req.params.id,req.body);
     res.send(data);
    }
    catch(err){}
   }
   async function findDonnationName(req, res, next) {
    try{
      
     const data = await Donnation.findOne(req.params);
     res.send(data);
    }
    catch(err){
  
    }
   }
   async function addDonnation(data) {
    try {
      const donnation = new Donnation({
        type: data.type,
        nom: data.nom,
        montant: data.montant,
        date: data.date
      });
      await donnation.save();
      //res.status(200).send("donneur added successfully");
    } catch (err) {
      console.error(err);
    }
  }
module.exports = { show, add, update,deleteDonnation,findDonnation,findDonnationName,addDonnation };
