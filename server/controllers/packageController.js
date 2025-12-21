const AgencyModel = require("../model/Agency/AgencyMode");
const PackageModel = require("../model/packages/package");

const getPackages = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 8,
      search = "",
      category,
      company,
      sort,
      mostLiked,
    } = req.query;

    const query = {};

    // 🔍 Apply search filter (destination or description)
    if (search) {
      query.$or = [
        { destination: { $regex: search, $options: "i" } },
        { packageDescription: { $regex: search, $options: "i" } },
      ];
    }

    // 🏝️ Filter by destination category
    if (category && category !== "All") {
      query.destinationCategory = category;
    }

    // 🏢 Filter by company name (get agencyId from agency model)
    if (company) {
      const agency = await AgencyModel.findOne({
        companyName: { $regex: company, $options: "i" },
      });

      if (agency) {
        query.agencyId = agency._id;
      } else {
        return res.json({ fetchedAgency: [] }); // no company matched
      }
    }

    // ↕️ Sorting logic
    let sortQuery = {};

    if (mostLiked === "true") {
      sortQuery = { likedBy: -1 }; // sort by number of likes (descending)
    } else if (sort === "company_asc") {
      sortQuery = { "agencyId.companyName": 1 }; // not directly sortable in Mongo
    } else if (sort === "company_desc") {
      sortQuery = { "agencyId.companyName": -1 }; // also not directly sortable
    }

    // 📦 Query the database with pagination
    let packagesQuery = PackageModel.find(query)
      .populate("agencyId", "companyName")
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    if (Object.keys(sortQuery).length > 0) {
      packagesQuery = packagesQuery.sort(sortQuery);
    }

    const packages = await packagesQuery.exec();

    res.json({ fetchedAgency: packages });
  } catch (error) {
    console.error("Error fetching packages:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getPackages };
