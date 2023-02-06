const { users } = require("../models");
const removeVietnameseTones = require("../utils/convertText");

const that = {
  search: async function (req, res) {
    try {
      const id = req.id;
      const { fullName } = req.body;
      const newFullName = removeVietnameseTones(fullName).toLowerCase();
      const docs = await users
        .find({ fullNameSearch: { $regex: newFullName } })
        .limit(8)
        .select({ fullName: 1, id: 1, avatarUrl: 1 });
      if (docs.length > 0) {
        const newDocs = docs.map((doc) => {
          if (doc.id === id) {
            return {
              _id: doc.id,
              fullName: doc.fullName,
              avatarUrl: doc.avatarUrl,
              type: "yourself",
            };
          }
          return doc;
        });
        
        return res.status(200).json({ data: newDocs });
      } else {
        return res.status(200).json({ data: [] });
      }
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },
};

module.exports = that;
