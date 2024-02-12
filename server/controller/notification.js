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
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(400).json({ message: "No Notification found" });
    }

    let notificationStatus = notification.status;

    // Conditionally update notificationStatus to "read" if it is truthy
    notificationStatus = notificationStatus ? "read" : notificationStatus;

    // Update the status of the notification
    notification.status = notificationStatus;

    // Save the updated notification
    await notification.save();

    // Retrieve all notifications sorted by createdAt
    const notifications = await Notification.find()
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    console.error("Error updating notification:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
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
