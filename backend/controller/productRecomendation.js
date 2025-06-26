const CustomError = require("./../errors/index");
const Products = require("./../model/Products");
const Orders = require("./../model/Orders");
const { StatusCodes } = require("http-status-codes");

const getProductRecommendations = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  // پیدا کردن تمام سفارش‌های کاربر
  const userOrders = await Orders.find({ user: id }).populate({
    path: "orderItems.product",
    select: "name price productImage category",
    model:'products'
  });
  console.log("User Orders Count:", userOrders.length); // دیباگ: تعداد سفارش‌ها
  console.log("User Orders:", userOrders); // دیباگ: جزئیات سفارش‌ها


  
  // // اگر سفارشی وجود ندارد، محصولات محبوب را پیشنهاد بده
  if (!userOrders || userOrders.length === 0) {
    console.log("No orders found for user.");
    const popularProducts = await Products.find({})
      .sort({ createdAt: -1 }) // مرتب‌سازی بر اساس جدیدترین
      .limit(5)
      .select("name price productImage category");
    return res.status(StatusCodes.OK).json({
      recommendations: popularProducts,
      message: "No orders found, suggesting popular products.",
    });
  }

  // // جمع‌آوری محصولات خریداری‌شده و دسته‌بندی‌ها
  const purchasedProductIds = new Set();
  const purchasedCategories = new Set();

  userOrders.forEach((order) => {
    order.orderItems.forEach((item) => {
      if (item.product && item.product._id && item.product.category) {
        purchasedProductIds.add(item.product._id.toString());
        purchasedCategories.add(item.product.category);
      }
    });
  });

  console.log("Purchased Product IDs:", [...purchasedProductIds]); // دیباگ
  console.log("Purchased Categories:", [...purchasedCategories]); // دیباگ

  // // اگر هیچ دسته‌بندی‌ای پیدا نشد، محصولات تصادفی پیشنهاد بده
  if (purchasedCategories.size === 0) {
    console.log("No categories found for purchased products.");
    const randomProducts = await Products.find({})
      .limit(5)
      .select("name price productImage category");
    return res.status(StatusCodes.OK).json({
      recommendations: randomProducts,
      message: "No categories found, suggesting random products.",
    });
  }

  // // بررسی تعداد محصولات موجود در دسته‌بندی‌ها
  const availableProducts = await Products.find({
    category: { $in: [...purchasedCategories] },
  }).select("_id");
  console.log("Available Products in Categories:", availableProducts.length); // دیباگ

  // پیدا کردن محصولات پیشنهادی
  const recommendations = await Products.find({
    category: { $in: [...purchasedCategories] },
    _id: { $nin: [...purchasedProductIds] },
  })
    .limit(5)
    .select("name price productImage category");

  console.log("Recommendations:", recommendations); // دیباگ

  // اگر هیچ محصول جدیدی پیدا نشد، محصولات تصادفی پیشنهاد بده
  if (recommendations.length === 0) {
    console.log("No new products found in purchased categories.");
    const randomProducts = await Products.find({
      _id: { $nin: [...purchasedProductIds] },
    })
      .limit(5)
      .select("name price productImage category");
    return res.status(StatusCodes.OK).json({
      recommendations: randomProducts,
      message: "No new products in categories, suggesting random products.",
    });
  }

  res.status(StatusCodes.OK).json({ recommendations });
  // res.status(StatusCodes.OK).json({ recommendations:true });
};

module.exports = {
  getProductRecommendations,
};