module.exports = (sequielize, DataTypes) => sequielize.define('Online', {
  addr: DataTypes.STRING,
  hostname: DataTypes.STRING,
  gamemode: DataTypes.STRING,
  mapname: DataTypes.STRING,
  password: DataTypes.BOOLEAN,
  players: DataTypes.INTEGER,
  maxplayers: DataTypes.INTEGER,
  ping: DataTypes.INTEGER
})