const ExpressError = require("../utils/ExpressError");
const Program = require("../models/programs");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
    try {
        const allProgram = await Program.find({}).populate("feedbacks");
        res.json({ allProgram });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching programs." });
    }
};


module.exports.addProgram = async (req,res) => {
    let response = await geocodingClient.forwardGeocode({
        query: req.body.program.location,
        limit: 1
    })
        .send();

    const { path, filename } = req.file;
    console.log(req.file);
    if(!req.body.program){
        throw new ExpressError(400, "Send valid data for programs");
    }
    const newprogram = new Program(req.body.program);
    newprogram.image = { path, filename };
    newprogram.geometry = response.body.features[0].geometry;
    let savedprogram = await newprogram.save();
    console.log(savedprogram);
    req.flash("success", "Program Created Successfully!!");
    res.redirect("/programs");
}

module.exports.show = (async (req, res) => {
    let { id } = req.params;
    const program = await Program.findById(id).populate({ path: "feedbacks", populate: {path: "author"}});
    if (!program) {
        req.flash("error", "This program Doesn't Exist");
        console.log("Error");
        res.redirect("/programs");
    }
    else {
        let response = await geocodingClient.forwardGeocode({
            query: program.location,
            limit: 1
        })
            .send();

        program.geometry = response.body.features[0].geometry;
        res.json(program);
    }
});

module.exports.edit_save = (async (req, res) => {

    if (!req.body.program) {
        throw new ExpressError(400, "Send valid data for programs");
    }

    let { id } = req.params;
    console.log(req.file);
    
    let program = await Program.findByIdAndUpdate(id, { ...req.body.program });
    if (req.file) {
        const { path, filename } = req.file;
        program.image = { path, filename };
    }
    await program.save();
    req.flash("success", "program Updated!");
    res.json({message: "Program Updated successfully!" });
});

module.exports.delete = (async (req, res) => {
    let { id } = req.params;    
    await Program.findByIdAndDelete(id);
    console.log("Deleted");
    req.flash("success", "Program Deleted!");
    res.redirect("/programs");
});

module.exports.newPage = (req, res) => {
    // res.render("listings/new.ejs");
    console.log(req.user);
    res.send("Render new page hereeeee for PROGRAMS");
};

module.exports.editPage = (async (req, res) => {
    let { id } = req.params;
    const program = await Program.findById(id);
    if (!program) {
        req.flash("error", "This program Doesn't Exist");
        console.log("Error");
        res.redirect("/programs");
    }
    else {
        let orignalImageUrl = program.image.path;
        orignalImageUrl = orignalImageUrl.replace("/upload", "/upload/w_250");
        res.json({program, orignalImageUrl});
    }
});

module.exports.registeredUsers = async (req, res) => {
    console.log(req.user);
    let program = await Program.findById(req.params.id);
    if (req.user.isAdmin) {
        return res.json({error: "Admin Cannot Register!"});
    }
    if (program.registeredUsers.includes(req.user._id)) {
        return res.json({message: "User Already Registered!"});
    }
    program.registeredUsers.push(req.user._id);
    await program.save();
    res.json({message: "User Registered Successfully!"});
}