const Rout = require("express").Router();

const PublicSchema = require("../modules/PublicProjectSchema");

Rout.delete("/public/Project/delete/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    // console.log(_id;

    const allProject = await PublicSchema.findByIdAndDelete(
      { _id },
      function (err, docs) {
        if (err) {
         
          res.status(500).json({ massege: "somthis is wrong" });
        } else {
          
          res.status(200).json({ massege: "resource deleted successfully" });
        }
      }
    )
      .clone()
      .catch(function (err) {
        console.log(err);
      });

    
  } catch (error) {
    console.log(error);
  }
});

module.exports = Rout;