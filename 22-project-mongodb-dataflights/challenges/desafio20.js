db.voos.findOne({ rtk: { $exists: false } }, { _id: 0, vooId: 1 });
