import { LoginLogs } from "../modules/logging.js";
import { User } from "../modules/users.js";
import bcrybt from "bcryptjs";
import geoip from "geoip-lite";
import { UAParser } from "ua-parser-js";
import axios from "axios";

const createLoginMonitor = ({ mlUrl, apiKey }) => {
  return async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      req.user = user;

      if (!email || !user) {
        return next(); // không có user -> bỏ qua
      }

      const isMatchPassword = await bcrybt.compare(password, user.password);
      req.loginResult = !!(user && isMatchPassword); // Đánh dấu kết quả đăng nhập

      // Nếu không có user (chưa đăng nhập thành công) thì bỏ qua

      // Lấy IP thật (x-forwarded-for nếu có proxy)
      const ip =
        req.headers["x-forwarded-for"]?.split(",")[0] ||
        req.connection.remoteAddress;

      // Lấy geo info
      const geo = geoip.lookup(ip) || {};

      // Lấy thông tin thiết bị từ User-Agent
      const parser = new UAParser(req.headers["user-agent"]);
      const device = parser.getResult();

      // Dữ liệu gửi sang ML
      const payload = {
        login_time: new Date().toISOString(),
        user_id: user._id.toString(),
        ip: ip,
        endpoint: "/login",
        ua: device.ua,
        device: "dev-ALICE-02",
        result: req.loginResult ? "success" : "failed",
      };

      //Gửi sang ML service
      const resp = await axios.post(`${mlUrl}/login`, payload);
      // const resp = { data: { anomaly: false, score: 0.1 } }; // mock

      console.log(resp.data)

      // ML verdict trả về
      req.alert = resp.data.final_label
      
      
    } catch (err) {
      console.error("Login monitor error:", err.message);
      req.login_anomaly = { error: true, reason: err.message };
    }

    next();
  };
};

// const saveLoginLog = async (req, res, next) => {
//   if (!req.user) return next(); // Không có user -> bỏ qua
//   const log = new LoginLogs({
//     userId: req.user._id,
//     ip: req.ip,
//     geo: req.geo || {},
//     device: req.device || {},
//     failed_attempts: req.session?.failedAttempts || 0,
//     login_result: req.loginResult ? "success" : "failed",
//     verdict: req.login_anomaly,
//   });
//   await log.save();

//   next();
// };

export const LoginMonitor = {
  createLoginMonitor,
  // saveLoginLog,
};
