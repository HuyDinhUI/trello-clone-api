import { StatusCodes } from "http-status-codes";
import { columnServices } from "../services/columnsService.js";

const createNew = async (req, res, next) => {
  try {
    const createColumn = await columnServices.createNew(req.body);

    res.status(StatusCodes.CREATED).json(createColumn);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateLabel = async (req, res) => {
  try {
    await columnServices.updateLabel(req.body.title, req.body.columnId);

    res.status(StatusCodes.OK).json({
      code: 200,
      message: "Update is success",
    });
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
};

const deleteColumn = async (req, res) => {
  const UserId = req.jwtDecoded.id;
  try {
    await columnServices.deleteColumn(
      req.params.id,
      UserId
    );

    res.status(StatusCodes.OK).json({
      code: 200,
      message: "Delete is success",
    });
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
};

export const columnControllers = {
  createNew,
  updateLabel,
  deleteColumn,
};
