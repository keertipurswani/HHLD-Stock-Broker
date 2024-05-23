import addUser, {getUsers, getFunds} from "../controllers/users.controller.js"
import express from "express"

const router = express.Router();

router.post('/add', addUser);
router.get('/get', getUsers);
router.get('/getFunds', getFunds);

export default router;
