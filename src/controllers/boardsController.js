import { StatusCodes } from "http-status-codes";
import { boardServices } from "../services/boardsService.js";

const getAllBoard = async (req, res) => {
  try {
    const UserId = req.jwtDecoded.id;
    const boards = await boardServices.getAllBoardByUser(UserId);

    res.status(StatusCodes.OK).json(boards);
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
};

const search = async (req, res) => {
  const UserId = req.jwtDecoded.id;
  try {
    const boards = await boardServices.search(req.query.keyword, UserId);

    res.status(StatusCodes.OK).json(boards);
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
};

const getOneBoard = async (req, res) => {
  try {
    const UserId = req.jwtDecoded.id;
    const BoardId = req.params.id;
    const board = await boardServices.getOneBoard(UserId, BoardId);

    res.status(StatusCodes.OK).json(board);
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
};

const createNew = async (req, res) => {
  try {
    const UserId = req.jwtDecoded.id;

    const createBoard = await boardServices.createNew(req.body, UserId);

    res.status(StatusCodes.CREATED).json({
      code: 201,
      message: "Create board is success",
      board: createBoard,
    });
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
};

const updateReorder = async (req, res) => {
  try {
    const UserId = req.jwtDecoded.id;
    const BoardId = req.params.id;
    const { columnsOrder } = req.body;

    const newBoard = await boardServices.updateReorder(
      BoardId,
      UserId,
      columnsOrder
    );

    res.status(StatusCodes.OK).json(newBoard);
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
};

const starred = async (req, res) => {
  const UserId = req.jwtDecoded.id;
  try {
    const newBoard = await boardServices.starred(
      req.query.boardId,
      req.query.starred
    );
    res.status(StatusCodes.CREATED).json({ code: 201, message: "", newBoard });
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
};

const updateVisibility = async (req, res) => {
  const userId = req.jwtDecoded.id;
  try {
    const newBoard = await boardServices.updateVisibility(
      req.query.boardId,
      req.query.visibility
    );
    res.status(StatusCodes.OK).json({ code: 200, message: "", newBoard });
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
};

const updateCover = async (req, res) => {
  const userId = req.jwtDecoded.id;
  try {
    const newBoard = await boardServices.updateCover(
      req.query.boardId,
      req.query.cover
    );

    res.status(StatusCodes.OK).json({ code: 200, message: "", newBoard });
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
};

const updateStatusBoard = async (req, res) => {
  const userId = req.jwtDecoded.id;
  try {
    const newBoard = await boardServices.updateStatusBoard(
      req.query.boardId,
      req.query.status
    );

    res.status(StatusCodes.OK).json({ code: 200, message: "", newBoard });
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
};

const editLabel = async (req, res) => {
  const userId = req.jwtDecoded.id;
  try {
    const newBoard = await boardServices.editLabel(
      req.query.boardId,
      req.query.title
    );

    res.status(StatusCodes.OK).json({ code: 200, message: "", newBoard });
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
};

export const boardControllers = {
  createNew,
  getAllBoard,
  getOneBoard,
  updateReorder,
  starred,
  search,
  updateVisibility,
  updateCover,
  updateStatusBoard,
  editLabel
};
