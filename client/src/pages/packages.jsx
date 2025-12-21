import { useEffect, useRef, useState, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Skeletoncom from "../Skeleton";
// import Like from "src/Additional/Like";
// import SaveToggle from "src/Additional/Save";
import { useSelector } from "react-redux";

const tabs = [
  { name: "Packages", path: "/posts" },
  { name: "Organized", path: "/posts/package/organized" },
  { name: "Guides", path: "/posts/package/guides" },
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Navigation = () => {
  const hasAccess = useSelector((state) => state.auth.userInfo);
  const [loading, setLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // "company_asc" | "company_desc"
  const [mostLiked, setMostLiked] = useState(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [category, setCategory] = useState("All");
  const [likeToggle, setLikeToggle] = useState(false);
  const observer = useRef();
  const pageRef = useRef(1);
  const limit = 8;

  const navigate = useNavigate();

  const fetchPackages = async (reset = false) => {
    if (reset) {
      setFetchedData([]);
      pageRef.current = 1;
      setHasMore(true);
      setInitialLoadComplete(false);
    }

    setLoading(true);
    
    try {
      console.log("this is api")
      const res = await axios.get("http://localhost:3001/api/packages/fetchPackages", {
        params: {
          page: pageRef.current,
          limit,
          search: searchQuery,
          category,
          company: companyFilter,
          sort: sortOrder,
          mostLiked,
        },
      });

      const packages = res.data.fetchedAgency || [];

      if (reset) {
        setFetchedData(packages);
      } else {
        setFetchedData((prev) => [...prev, ...packages]);
      }

      if (packages.length < limit) {
        setHasMore(false);
      } else {
        pageRef.current += 1;
      }

    } catch (err) {
      console.error("Error fetching packages", err);
    } finally {
      setLoading(false);
      setInitialLoadComplete(true);
    }
  };

  // Initial & filter-triggered load
  useEffect(() => {
    fetchPackages(true);
  }, [searchQuery, category, companyFilter, sortOrder, mostLiked, likeToggle]);

  // Infinite scroll observer
  const lastItemRef = useCallback(
    (node) => {
      if (loading || !initialLoadComplete || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            fetchPackages();
          }
        },
        { threshold: 0.5 }
      );

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, initialLoadComplete]
  );

  const handleNavigation = (id) => {
    const props = fetchedData.find((item) => item._id === id);
    navigate("/posts/package/more", { state: props });
  };

  const categories = [
    "All",
    "Historical Places",
    "Top Cities",
    "Industries",
    "Beach",
    "Forest",
    "Adventure",
  ];

  // const addPackage = () => {
  //   if (hasAccess.status === "Accepted") {
  //     navigate("/posts/package/addPackage");
  //   }
  // };

  return (
    <div className="w-full">
      <div className="flex justify-center items-center space-x-6 shadow-md bg-white h-16 sticky -top-1 z-50">
        {tabs.map((tab) => (
          <NavLink
            key={tab.name}
            to={tab.path}
            className={({ isActive }) =>
              `text-gray-800 transition-colors ${
                isActive
                  ? "text-blue-600 font-bold"
                  : "hover:text-blue-500 hover:font-semibold"
              }`
            }
          >
            {tab.name}
          </NavLink>
        ))}
      </div>

      {/* Controls */}
      <div className="p-4 flex flex-wrap gap-4 justify-center items-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search packages..."
          className="w-60 p-2 border border-gray-300 rounded-lg"
        />

        <input
          type="text"
          value={companyFilter}
          onChange={(e) => setCompanyFilter(e.target.value)}
          placeholder="Filter by company"
          className="w-52 p-2 border border-gray-300 rounded-lg"
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg"
        >
          <option value="">Sort by company</option>
          <option value="company_asc">A-Z</option>
          <option value="company_desc">Z-A</option>
        </select>

        <button
          onClick={() => setMostLiked((prev) => !prev)}
          className={`px-4 py-2 rounded-lg text-white ${
            mostLiked ? "bg-blue-800" : "bg-purple-700"
          }`}
        >
          {mostLiked ? "Most Liked ✓" : "Most Liked"}
        </button>
      </div>

      {/* Category Buttons */}
      <div className="flex flex-wrap gap-2 p-4 justify-center">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setCategory(cat)}
            className={`text-white px-4 py-2 text-sm rounded-full transition duration-300 w-32 h-10 flex items-center justify-center truncate ${
              category === cat
                ? "bg-blue-950"
                : "bg-purple-700 hover:bg-blue-950"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Package Cards */}
      <div className="py-10 px-5">
        <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">
          Featured Posts
        </h2>

        {/* {!initialLoadComplete && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeletoncom key={i} />
            ))}
          </div>
        )} */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {fetchedData.map((post, index) => {
            const isLastItem = fetchedData.length === index + 1;
            return (
              <div
                key={post._id}
                ref={isLastItem ? lastItemRef : null}
                className="w-full bg-white rounded-lg shadow-md overflow-hidden transition-all duration-500 ease-in-out hover:shadow-xl hover:-translate-y-1"
                // onClick={() => handleNavigation(post._id)}
              >
                {post.images && (
                  <Slider {...sliderSettings}>
                    {post.images.map((img, i) => (
                      <div key={i}>
                        <img
                          src={img.url}
                          alt={`Post ${i + 1}`}
                          className="w-full h-40 object-cover"
                        />
                      </div>
                    ))}
                  </Slider>
                )}
                <div className="p-4">
                  <span className="px-3 py-1 text-sm font-semibold rounded">
                    {post.destination}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold">
                    {post.destinationCategory}
                  </h3>
                  <h3 className="mt-2 text-lg font-semibold">
                    {post.agencyId?.companyName}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {post.packageDescription.length > 100
                      ? post.packageDescription.slice(0, 100) + "..."
                      : post.packageDescription}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <button
                      // onClick={() => handleNavigation(post._id)}
                      className="text-purple-600 font-semibold text-sm"
                    >
                      Read More →
                    </button>
                    {/* <div className="flex items-center gap-2">
                      <Like
                        packageId={post._id}
                        like={post.likeCount}
                        likeCount={post.likeCount}
                        likedBy={post.likedBy}
                        onToggle={() => setLikeToggle((prev) => !prev)}
                      />
                      <SaveToggle />
                    </div> */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {loading && initialLoadComplete && (
          <div className="text-center py-4 font-semibold text-gray-500">
            Loading more...
          </div>
        )}

        {!hasMore && (
          <div className="text-center py-4 font-medium text-gray-500">
            No More Packages
          </div>
        )}
      </div>

      <div style={{ height: "100px" }}></div>

      {/* <div className="fixed bottom-5 right-5">
        <button
          onClick={addPackage}
          className="bg-blue-500 text-white text-3xl w-16 h-16 flex items-center justify-center rotate-45 rounded-3xl"
        >
          ×
        </button>
      </div> */}
    </div>
  );
};

export default Navigation;
