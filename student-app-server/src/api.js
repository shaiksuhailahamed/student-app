import { app } from "../index.js";
import bodyParser from "body-parser";
import { createSchool, deleteSchool, getSchool, updateSchool } from "./db/school.js";

export default function registerAPI() {



  app.use(bodyParser.json());

  // get school details by id
  app.get("/school/get/:id", (request, response) => {

    const id = request.params.id;

    getSchool(id, (school) => {      
      response.send(school)
    });

  });

  // delete school details by id  
  app.delete("/school/delete/:id", (req, res) => {

    const id = req.params.id;

    deleteSchool(id, (result) => {
      res.send(result ? { message: "school deleted successfully" } : { message: "Failed to delete school" });
    });
  });

  // create school details
  app.post("/school/create", (req, res) => {

    const body = req.body;

    createSchool(body, (result) => {
      res.send(result ? { message: "school created successfully" } : { message: "Failed to create school" });
    });
  });

    // update school details
    app.put("/school/update", (req, res) => {

      const body = req.body;
  
      updateSchool(body, (result) => {
        res.send(result ? { message: "school updated successfully" } : { message: "Failed to update school" });
      });
    });

}
