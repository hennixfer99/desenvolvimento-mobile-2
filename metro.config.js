// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// ─── Excluir database/ e server/ do file watcher do Metro ───
// Quando o Express grava no db.json, o Metro NÃO deve disparar
// hot reload. Os arquivos continuam acessíveis para import
// (seed), apenas não são vigiados para mudanças em runtime.
config.watcher = {
    ...config.watcher,
    additionalExcludes: [
        ...(config.watcher?.additionalExcludes || []),
        path.join(__dirname, "database"),
        path.join(__dirname, "server"),
    ],
};

module.exports = config;
