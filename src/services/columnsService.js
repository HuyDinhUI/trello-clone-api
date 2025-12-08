import { Board } from "../modules/boards.js";
import { Column } from "../modules/columns.js";

const createNew = async (data) => {
  try {
    const model = new Column(data);
    const column = await model.save();
    await Board.findByIdAndUpdate(
      data.boardId,
      {
        $push: {
          columns: column._id,
          columnsOrder: column._id,
        },
      },
      { new: true }
    ).populate("columnsOrder");

    

    return column;
  } catch (error) {
    throw error;
  }
};

const updateLabel = async (title, columnId) => {
  try {
    await Column.findByIdAndUpdate(
      columnId,
      { $set: { title } },
      { new: true }
    );
  } catch (error) {
    throw error;
  }
};

const deleteColumn = async (columnId, UserId) => {
  try {
    await Column.findByIdAndDelete(columnId);
  } catch (error) {
    throw error;
  }
};

export const columnServices = {
  createNew,
  updateLabel,
  deleteColumn
};
