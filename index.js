const express = require("express");

const server = express();

server.use(express.json());

const projects = [];
const getProjectIndex = id => {
  let i = 0;
  for (project of projects) {
    if (project.id === id) {
      return i;
    }
    i++;
  }
  return null;
};
const checkProjectExists = (req, res, next) => {
  const { id } = req.params;
  if (!getProjectIndex(id)) {
    return res.status(400).json({ error: "Project does not exists" });
  }
  return next();
};

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.post("/projects", (req, res) => {
  const { id, title } = req.body;
  projects.push({ id, title });

  return res.json(projects);
});

server.put("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  projects[getProjectIndex(id)].title = title;

  return res.json(projects);
});

server.delete("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  projects.splice(getProjectIndex(id), 1);
  return res.send();
});

server.listen(3000);
