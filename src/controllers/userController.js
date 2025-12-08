import { StatusCodes } from "http-status-codes";
import { userService } from "../services/userService.js";

const getUser = async (req, res) => {
  const userId = req.jwtDecoded.id;

  try {
    const user = await userService.getUser(userId);
    res
      .status(StatusCodes.OK)
      .json({ code: 200, message: "", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateRecentBoards = async (req, res) => {
  const userId = req.jwtDecoded.id;

  try {
    const newRecentBoard = await userService.updateRecentBoards(
      req.params.boardId,
      userId
    );
    res
      .status(StatusCodes.CREATED)
      .json({ code: 201, message: "", data: newRecentBoard });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const userController = {
  getUser,
  updateRecentBoards,
};
