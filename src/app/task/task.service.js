const asyncHandler = require("../../utils/handler/asyncHandler");

const { getListTaskRepo, findTaskRepo, createTaskRepo, updateTaskRepo, deleteTaskRepo } = require("./task.repository");

const getListTasksService = asyncHandler(async (req, res) => {
  
  const tasks = await getListTaskRepo();

  if(tasks.length === 0) {
    return res.status(404).json({ message: "Task is still not created"});
  }

  res.status(200).json(tasks);
});

const findTaskService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const task = await findTaskRepo(id);

  if(!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.status(200).json(task);
});

const createTaskService = asyncHandler(async (req, res) => {

  const { projectId } = req.params;
  const { name, description } = req.body;
  const userId = req.user.id;

  const task = await createTaskRepo({ name, description, projectId, userId });

  res.status(201).json(task);
});

const updateTaskService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, isDone } = req.body;

  const task = await findTaskRepo(id);

  if(!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  if(task.userId !== req.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }
  else{
    const updatedTask = await updateTaskRepo(id, { name, description, isDone });
    res.status(200).json({ message: "Task updated" , data: updatedTask });
  }
});

const deleteTaskService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const task = await findTaskRepo(id);

  if(!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  if(task.userId !== req.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }
  else{
    await deleteTaskRepo(id);
    res.status(200).json({ message: "Task deleted" });
  }
});

module.exports = {
  getListTasksService,
  findTaskService,
  createTaskService,
  updateTaskService,
  deleteTaskService
};