const TOR = require("../models/TOR");

async function create(data) {
  return TOR.create(data);
}

async function findAll() {
  return TOR.find().sort({ publishedAt: -1 });
}

async function findById(id) {
  return TOR.findById(id);
}

async function update(id, data) {
  return TOR.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  });
}

async function remove(id) {
  return TOR.findByIdAndDelete(id);
}

async function upsertByRefId(refId, data) {
  return TOR.findOneAndUpdate({ refId }, data, {
    upsert: true,
    returnDocument: "after",
    runValidators: true,
  });
}

module.exports = { create, findAll, findById, remove, update, upsertByRefId };
