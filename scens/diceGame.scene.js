const { bot } = require("../init/startBot");
const User = require("../models/user");

const Scene = require("telegraf/scenes/base");
const Extra = require("telegraf/extra");
const Markup = require("telegraf/markup");

const extraBoard = require("../helpers/diceExtra");
const actionsBord = require("../helpers/diceActions");

const diceGame = new Scene("diceGame");
diceGame.enter(async (ctx) => {
  const { demoBalance, mainBalance } = await User.findOne({
    userId: ctx.from.id,
  });

  const activeGame = ctx.session.state.activeGame;

  // Записываем в стейт начальный стейт и баланс игрока
  const initState = {
    rate: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      "1-2": 0,
      "3-4": 0,
      "5-6": 0,
      even: 0,
      odd: 0,
    },
    valueRate: 10,
    otherRate: 0,
    countRate: 0,
    activeGame,
    rateMenu: true,
    balance: activeGame === "mainGame" ? mainBalance : demoBalance,
  };
  ctx.session.state = initState;

  // Отправляем первое сообщение с пустой клавиатурой
  try {
    await bot.telegram.sendMessage(
      ctx.from.id,
      "Делайте ваши ставки",
      Extra.markup(Markup.keyboard([["🏡 Вернуться на главную"]]).resize())
    );

    let message = ({ balance }) => `Ваш баланс: ${balance} ₽`;

    // Отправляем init board
    ctx.session.state.activeBoard = await ctx.reply(
      message(initState),
      extraBoard(initState)
    );
  } catch (error) {
    console.log(error.message);
  }
});

diceGame.hears(
  "🏡 Вернуться на главную",
  async ({ scene, deleteMessage, session }) => {
    try {
      await deleteMessage(session.state.activeBoard.message_id);
    } catch (error) {
      console.log(error.message);
    }
    await scene.enter("showMainMenu");
  }
);

// Подключаем actions
actionsBord(diceGame);

module.exports = { diceGame };
