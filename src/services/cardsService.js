import mongoose from "mongoose";
import { Card } from "../modules/cards.js";
import { Column } from "../modules/columns.js";

const getCard = async (CardId, UserId) => {
  try {
    return await Card.findOne({
      _id: CardId,
    }).populate("joined", "username email");
  } catch (err) {
    throw err;
  }
};

const createNew = async (data) => {
  try {
    const model = new Card(data);
    const card = await model.save();
    await Column.findByIdAndUpdate(data.columnId, {
      $push: { cards: card._id },
    });
    const dataRes = {
      card,
    };

    return dataRes;
  } catch (error) {
    throw error;
  }
};

const upadateContent = async (data, UserId) => {
  const { columnId, _id, ...FieldUpdate } = data;
  try {
    await Card.findOneAndUpdate(
      {
        _id: _id,
        $or: [
          {
            joined: UserId,
          },
          {
            columnId: columnId,
          },
        ],
      },
      { $set: FieldUpdate }
    );
  } catch (error) {
    throw error;
  }
};

const updateOrderAndPosition = async (BoardId, Columns) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  console.log("Column:", Columns);

  const isCardPlaceholder = Columns.find((c) =>
    c.cards.find((card) => card.FE_placeholderCard)
  );
  if (isCardPlaceholder) {
    isCardPlaceholder.cards = [];
  }

  console.log("Column:", Columns);

  try {
    for (const col of Columns) {
      await Column.findOneAndUpdate(
        {
          _id: col._id,
          boardId: BoardId,
        },
        { $set: { cards: col.cards.map((c) => c._id) } },
        { session }
      );

      await Card.updateMany(
        { _id: { $in: col.cards } },
        { $set: { columnId: col._id } },
        { session }
      );
    }

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    throw error;
  }
};

export const cardServices = {
  getCard,
  createNew,
  updateOrderAndPosition,
  upadateContent,
};
