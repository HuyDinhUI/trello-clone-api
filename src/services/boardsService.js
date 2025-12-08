import { Board } from "../modules/boards.js";
import { slugtify } from "../utils/formatter.js";

const getAllBoardByUser = async (UserId) => {
  try {
    return await Board.find({
      $or: [{ ownerIds: UserId }, { memberIds: UserId }],
    })
      .populate("ownerIds", "username email")
      .populate("memberIds", "username email")
      .populate({
        path: "columns",
        populate: { path: "cards" },
      });
  } catch (error) {
    throw error;
  }
};

const search = async (keyword, UserId) => {
  try {
    return await Board.find({
      $and: [
        {
          $or: [{ ownerIds: UserId }, { memberIds: UserId }],
        },
        { $text: { $search: keyword } },
      ],
    })
      .populate("ownerIds", "username email")
      .populate("memberIds", "username email")
      .populate({
        path: "columns",
        populate: { path: "cards" },
      });
  } catch (error) {
    throw error;
  }
};

const getOneBoard = async (UserId, BoardId) => {
  try {
    return await Board.findOne({
      _id: BoardId,
      $or: [
        { ownerIds: UserId },
        { memberIds: UserId },
        { visibility: "public" },
      ],
    })
      .populate("ownerIds", "username email")
      .populate("memberIds", "username email")
      .populate({
        path: "columnsOrder",
        populate: { path: "cards" },
      });
  } catch (error) {
    throw error;
  }
};

const createNew = async (reqData, UserId) => {
  try {
    const data = {
      ...reqData,
      ownerIds: UserId,
    };

    const model = new Board(data);
    const newData = await model.save();
    const newBoard = {
      newData,
      slug: slugtify(newData.title),
    };

    return newBoard;
  } catch (error) {
    throw error;
  }
};

const updateReorder = async (BoardId, UserId, columnsOrder) => {
  try {
    const newBoard = await Board.findOneAndUpdate(
      {
        _id: BoardId,
        $or: [
          { ownerIds: UserId },
          { memberIds: UserId },
          { visibility: "public" },
        ],
      },
      { $set: { columnsOrder } },
      { new: true }
    );

    return newBoard;
  } catch (error) {
    throw error;
  }
};

const starred = async (BoardId, starred) => {
  try {
    const newBoard = await Board.findOneAndUpdate(
      {
        _id: BoardId,
      },
      { $set: { starred } },
      { new: true }
    );
    return newBoard;
  } catch (error) {
    throw error;
  }
};

export const boardServices = {
  createNew,
  getAllBoardByUser,
  getOneBoard,
  updateReorder,
  starred,
  search,
};
