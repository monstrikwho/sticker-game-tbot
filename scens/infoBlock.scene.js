const Scene = require("telegraf/scenes/base");
const Extra = require("telegraf/extra");
const Markup = require("telegraf/markup");

const { bot } = require("../init/startBot");

const infoBlock = new Scene("infoBlock");
infoBlock.enter(async (ctx) => {
  return await bot.telegram.sendMessage(
    ctx.chat.id,
    `Lucky Cat Games - бот с мини-играми основанный на механике смайлов от телеграмм.
Именно по-этому Вы можете сразу исключить вероятность каких-либо накруток или мошенничества с нашей стороны, так как мы не можем влиять на то что вам выпадет. Вы просто отправляете нам смайл (можно вручную, но для Вашего удобства сделана кнопка) а по результатам случайного выпадения - мы выплачиваем Вам выигрыш. 

💦 Вы можете играть на демо счете БЕСПЛАТНО.
🔥 Моментальный вывод средств на кошелек QIWI, карты российских и банков других стран.
⚠️ Деньги с демо-счета не выводятся. 

Как играть?
1) Выбираете размер ставки;
2) Делаете ставку;
3) Отправляете смайлик.

<a href="http://t.me/LuckyCatGames">❓ Поддержка</a>
<a href="http://t.me/joinchat/P0el-xuDN6g-ZsY7decv7A">💬 Чат для общения с игроками</a>
<a href="http://t.me/luckycat_orders">💳 Чат, в котором публикуются платежи</a>`,
    {
      parse_mode: "HTML",
      reply_markup: {
        keyboard: [
          [
            {
              text: "↪️ Вернуться назад",
            },
          ],
        ],
        resize_keyboard: true,
      },
      disable_web_page_preview: true,
    }
  );
});

infoBlock.hears("↪️ Вернуться назад", async ({ scene }) => {
  return await scene.enter("showMainMenu");
});

module.exports = { infoBlock };
