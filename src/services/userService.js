import { User } from "../modules/users.js";

const getUser = async (userId) => {
  try {
    const recentBoards = await User.findById(userId).populate(
      "recentBoards.board"
    );

    return recentBoards;
  } catch (error) {
    throw error;
  }
};

const updateRecentBoards = async (boardId, userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) throw Error("User not found");

    user.recentBoards = user.recentBoards.filter(
      (i) => i.board.toString() !== boardId
    );

    user.recentBoards.unshift({ board: boardId, visitedAt: new Date() });

    user.recentBoards = user.recentBoards.slice(0, 10);

    await user.save();

    return user.recentBoards;
  } catch (error) {
    throw error;
  }
};

export const userService = {
  getUser,
  updateRecentBoards,
};
