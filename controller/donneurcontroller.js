const Donneur = require("../model/Donneur");
const Donnation = require("../model/Donnation");
async function add(req, res, next) {
  try {
    const donneur = new Donneur(req.body);
    await donneur.save();
    res.status(200).send("donneur added successfully");
  } catch (err) {
    console.error(err);
  }
}
async function addDonneur(data) {
  try {
    const donneur = new Donneur({
      nom: data.nom,
      prenom: data.prenom,
      cin: data.cin,
      email: data.email,
      adresse: data.adresse,
    });
    await donneur.save();
    //res.status(200).send("donneur added successfully");
  } catch (err) {
    console.error(err);
  }
}

async function show(req, res, next) {
  try {
    const data = await Donneur.find();
    res.json(data);
  } catch (err) {
    console.log(err);
  }
}
async function update(req, res, next) {
  try {
    const data = await Donneur.findByIdAndUpdate(req.params.id, req.body);
    res.send("updated");
  } catch (err) {}
}
async function deleteDonneur(req, res, next) {
    try{
     const data = await Donneur.findByIdAndDelete(req.params.id,req.body);
     res.send("removed");
    }
    catch(err){}
   }
   async function findDonneur(req, res, next) {
    try{
     const data = await Donneur.findById(req.params.id,req.body);
     res.send(data);
    }
    catch(err){}
   }
   async function findDonneurName(req, res, next) {
    try{
      
     const data = await Donneur.findOne(req.params);
     res.send(data);
    }
    catch(err){
  
    }
   }
  async function AfficherTous(req, res, next) {
    try {
      // Récupérer l'ID du donneur à partir des paramètres de la requête, par exemple, req.params.donneurId
      const donneurId = req.params.donneurId;

      // Chercher le donneur par ID
      const donneur = await Donneur.findById(donneurId);

      // Vérifier si le donneur existe
      if (!donneur) {
          return res.status(404).json({ error: "Donneur non trouvé" });
      }

      // Récupérer toutes les donations associées à cet ID de donneur
      const donations = await Donnation.find({ donneur: donneurId });

      // Créer un objet résultat avec les informations du donneur et les donations
      const result = {
          donneur: donneur,
          donations: donations
      };

      // Envoyer les données au format JSON
      //res.json(result);
      return result
  } catch (err) {
      // Gérer les erreurs
     // res.status(500).json({ error: err.message });
  }

}




module.exports = { show, add, update,deleteDonneur,findDonneur,findDonneurName,addDonneur,AfficherTous };
