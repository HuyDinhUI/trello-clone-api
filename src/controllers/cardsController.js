import { StatusCodes } from "http-status-codes";
import { cardServices } from "../services/cardsService.js";

const getCard = async (req, res) => {
  const UserId = req.jwtDecoded.id;
  try {
    const card = await cardServices.getCard(req.params.id, UserId);

    res.status(StatusCodes.OK).json(card);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createNew = async (req, res) => {
  try {
    const createCard = await cardServices.createNew(req.body);

    res.status(StatusCodes.CREATED).json(createCard);
  } catch (error) {
    res.status(500).json({ code: 500, message: err.message });
  }
};

const updateOrderAndPosition = async (req, res) => {
  try {
    const { boardId, columns } = req.body;

    await cardServices.updateOrderAndPosition(boardId, columns);

    res.status(StatusCodes.OK).json();
  } catch (error) {
    res.status(500).json({ code: 500, message: err.message });
  }
};

const upadateContent = async (req, res) => {
  const UserId = req.jwtDecoded.id;
  try {
    await cardServices.upadateContent(req.body, UserId);

    res.status(StatusCodes.OK).json();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteCard = async (req, res) => {
  const UserId = req.jwtDecoded.id;
  try {
    await cardServices.deleteCard(req.params.id, UserId);

    res.status(StatusCodes.OK).json({
      code: 200,
      message: "Delete is success",
    });
  } catch (err) {
    res.status(500).json({ code: 500, message: err.message });
  }
};

export const cardControllers = {
  getCard,
  createNew,
  updateOrderAndPosition,
  upadateContent,
  deleteCard,
};
