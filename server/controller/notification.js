const Notification = require("../models/notification");
const cron = require("node-cron");

const getNotification = async (req, res) => {
  const notification = await Notification.find().sort({ createdAt: -1 }).lean();
  if (!notification)
    return res.status(400).json({ message: "No Notification found" });

  res.status(200).json({
    success: true,
    notification,
  });
};

// update notification  ___ only admin
const updateNotification = async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ message: "ID required, 404" });

  const notification = await Notification.findById(id).exec();
  if (!notification) {
    return res.status(400).json({ message: "No Notification found" });
  }

  let notificationStatus = notification.status;

  notificationStatus =
    notificationStatus === "unread" ? "read" : notificationStatus;

  notification.status = notificationStatus;

  await notification.save();

  const notifications = await Notification.find()
    .sort({ createdAt: -1 })
    .lean();

  res.status(200).json({
    success: true,
    notifications,
  });
};

cron.schedule("0 0 0 * * *", async () => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  await Notification.deleteMany({
    status: "read",
    createdAt: { $lt: thirtyDaysAgo },
  });
  console.log("Delete Read notification");
});

module.exports = { getNotification, updateNotification };
