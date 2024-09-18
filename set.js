const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;
module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkdEaTdDWFJoR3JHMVdJWTg3RFhGRzBNRmtlL1NZdXFjd1NZQjRIeVBsND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOXdQaThrbTJMNGlLZGt5cUR1OGYzRFQvOXNJMEwxT1QwQ0doZ05iZTVHQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQWdtOUptdUprMzdxUWZEVEVIQkxzUHhCcFJXYmVQQXpqYi9lWXg1VUU4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ6L0prMVR0NGREVGpON0lzMno0ekFnem1kUVdFZ0xKYTBpc0piSTRVNlJJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNPQ0M4NUo5VVRjbkpyTFRQdDBxZm9QcWM1NE5YYzlBR0NTbEtFSi8wVXc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtURWNjaHgxaGdOaGhRK2hGTGxnMnEyZXh0Mit1TmVzTm1HOCs4MVMvbnc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic01JM3Q3YnRIc2V5Skx6aFlLVHF3a3hjaXlvMGRSMXcrdVJmMU9TQkVtST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWTRiRG05aVRaZlZBT1kzblJUTlJmdEN3c1ZUb1FZUVVhemtMT09yaVBHYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtxMGlhd1d4TkZTakM5by81WloyMUt2SjJRNzlhM0loZVRNLzVxQVRlNFFhQ3dWYk9udnVrUm8vTVQ1dlJjZnJPNjNPOFl1SW5IbWJkRmx0djU2akFRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjM4LCJhZHZTZWNyZXRLZXkiOiJBOE5sdFFMM3F5Z0dZVkowaERvUHo4ZGswQ3ZMVGMvUkFNZ0VmQitaVHpJPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ3MTZGbGFwWFFhU2gxdTF6NzJHdThnIiwicGhvbmVJZCI6Ijk5NTFkMjRjLTg3MTMtNDBmNS1hODMzLTEwMmVjMjY5NjExNCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJyQlkweGs0RGZxM25taXFkdHhjODFiZ3dkUTA9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0NDUGNCTE5INmx5OEFEWXdQZVVabWxXcVIwPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkhMV0xSMzdOIiwibWUiOnsiaWQiOiI5MTgyMDcwNzUzMjM6MjdAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi77yo77yl77yy77yv77yi77yy77yp77yu77ylIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKU2c2MWNROE1pcnR3WVlDaUFBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJQZkgvcEZxS1VNWXdpYVMraVkva3dxY0xkOWs0ODFPcDNyalZKMmtUSWgwPSIsImFjY291bnRTaWduYXR1cmUiOiJGSEhZMGNrZTU3TERseXpMaVZiUEVwWVZ5dVhaa0VyRlRoMnBiaEhQMVU0ZmpKeW9rNmx4TDJiUUhtR0ZFZ2NUeWJXVU9FdGhUUmNUYUh1SHBvV1RCQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiRXVJMFFKeDVMWDNsVThLdUZMbS9qSHRvYWcyMjZoL3UxWGoyL2FLRDZYR2JIOTdDOEd3SW42ZGl2YnB6dHBIbldzeS95aTFJMWZicFRHZTE1MExmRHc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5MTgyMDcwNzUzMjM6MjdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVDN4LzZSYWlsREdNSW1rdm9tUDVNS25DM2ZaT1BOVHFkNjQxU2RwRXlJZCJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyNjY2OTk1MCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFMaUcifQ==',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "𝚂𝚄𝙱𝙰𝚁𝚄",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "919614477116",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "off",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || 'online',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech"
        : "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech",
    /* new Sequelize({
        dialect: 'sqlite',
        storage: DATABASE_URL,
        logging: false,
    })
    : new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        ssl: true,
        protocol: 'postgres',
        dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
        },
        logging: false,
    }), */
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
