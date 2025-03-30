// import { extendedclient as prisma } from "../models/prismaClient.js";
// import jwt from "jsonwebtoken";
// import { ApiError } from "../utils/ApiError.js";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import { generateAccessAndRefreshToken as managergen } from "../controllers/manager/manager.controller.js";
// import { generateAccessAndRefreshToken as admingen } from "../controllers/admin/admin.controller.js";
// import { generateAccessAndRefreshToken as foundergen } from "../controllers/founder/founder.controller.js";

// // const verifyJWT = asyncHandler(async (req, _, next) => {
// //   try {
// //     const token =
// //       req.cookies?.accessToken ||
// //       req.header("Authorization")?.replace("Bearer ", "");
// //     const refreshtoken =
// //       req.cookies?.refreshToken ||
// //       req.header("Authorization")?.replace("Refresh ", "");

// //     if (!token) {
// //       if (!refreshtoken) throw new ApiError(402, "RefreshToken not found");
// //       const decodedRefreshToken = jwt.verify(
// //         refreshtoken,
// //         process.env.REFRESH_TOKEN_SECRET,
// //       );

// //       if (!decodedRefreshToken) {
// //         throw new ApiError(402, "Invalid Refresh Token");
// //       }

// //       const baseUrl = req.baseUrl.toString();

// //       if (baseUrl.includes("admin")) {
// //         const id = decodedRefreshToken.id;

// //         const admin = await prisma.admin.findUnique({
// //           where: { id },
// //           select: { id: true, username: true },
// //         });

// //         if (!admin) {
// //           throw new ApiError(402, "Invalid refresh token");
// //         }

// //         const newtokens = await admingen(admin.id);

// //         req.cook = {
// //           accessToken: newtokens.accessToken,
// //           refreshToken: newtokens.refresh,
// //         };
// //         req.user = admin;
// //       } else if (baseUrl.includes("manager")) {
// //         const id = decodedRefreshToken.id;

// //         const manager = await prisma.manager.findUnique({
// //           where: { id },
// //           select: { id: true, username: true, managertype: true },
// //         });

// //         if (!manager) {
// //           throw new ApiError(401, "Invalid refresh token");
// //         }

// //         const newtokens = await managergen(manager.id);

// //         req.cook = {
// //           accessToken: newtokens.accessToken,
// //           refreshToken: newtokens.refreshToken,
// //         };
// //         req.user = manager;
// //       } else if (baseUrl.includes("founder")) {
// //         const id = decodedRefreshToken.id;

// //         const founder = await prisma.founder.findUnique({
// //           where: { id },
// //           select: { id: true, username: true },
// //         });

// //         if (!founder) {
// //           throw new ApiError(401, "Invalid refresh token");
// //         }

// //         const newtokens = await foundergen(founder.id);

// //         req.cook = {
// //           accessToken: newtokens.accessToken,
// //           refreshToken: newtokens.refreshToken,
// //         };
// //         req.user = founder;
// //       }

// //       next();
// //     } else {
// //       const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

// //       if (!decodedToken) {
// //         throw new ApiError(402, "Invalid Access Token");
// //       }

// //       const baseUrl = req.baseUrl.toString();

// //       if (baseUrl.includes("admin")) {
// //         const id = decodedToken.id;

// //         const admin = await prisma.admin.findUnique({
// //           where: { id },
// //           select: { id: true, username: true },
// //         });

// //         if (!admin) {
// //           throw new ApiError(402, "Invalid access token");
// //         }

// //         req.user = admin;
// //       } else if (baseUrl.includes("manager")) {
// //         const id = decodedToken.id;

// //         const manager = await prisma.manager.findUnique({
// //           where: { id },
// //           select: { id: true, username: true, managertype: true },
// //         });

// //         if (!manager) {
// //           throw new ApiError(402, "Invalid access token");
// //         }

// //         req.user = manager;
// //       } else if (baseUrl.includes("founder")) {
// //         const id = decodedToken.id;

// //         const founder = await prisma.founder.findUnique({
// //           where: { id },
// //           select: { id: true, username: true },
// //         });

// //         if (!founder) {
// //           throw new ApiError(402, "Invalid access token");
// //         }

// //         req.user = founder;
// //       }
// //       next();
// //     }
// //   } catch (error) {
// //     throw new ApiError(
// //       500,
// //       error?.message || "Error occured while authenticating cookies.",
// //       error,
// //     );
// //   }
// // });

// const verifyJWT = asyncHandler(async (req, _, next) => {
//   try {
//     const token = req.headers.access;
//     // const refreshtoken =
//     // req.headers.refresh;
//     const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

//     if (!decodedToken) {
//       throw new ApiError(402, "Invalid Access Token");
//     }

//     if (decodedToken.role == "admin") {
//       const id = decodedToken.id;

//       const admin = await prisma.admin.findUnique({
//         where: { id },
//         select: { id: true, username: true, role: true },
//       });

//       if (!admin) {
//         throw new ApiError(402, "Invalid access token");
//       }

//       req.user = admin;
//     } else if (
//       decodedToken.role == "program_manager" ||
//       decodedToken.role == "incubation_manager" ||
//       decodedToken.role == "investment_manager"
//     ) {
//       const id = decodedToken.id;

//       const manager = await prisma.manager.findUnique({
//         where: { id },
//         select: { id: true, username: true, managertype: true, role: true },
//       });

//       if (!manager) {
//         throw new ApiError(402, "Invalid access token");
//       }

//       req.user = manager;
//     } else if (decodedToken.role == "founder") {
//       const id = decodedToken.id;

//       const founder = await prisma.founder.findUnique({
//         where: { id },
//         select: { id: true, username: true, role: true },
//       });

//       if (!founder) {
//         throw new ApiError(402, "Invalid access token");
//       }

//       req.user = founder;
//     }
//     next();
//   } catch (error) {
//     throw new ApiError(
//       401,
//       error?.message || "Error occured while authenticating.",
//       error,
//     );
//   }
// });

// const authorizeRoles = (...roles) => {
//   return asyncHandler((req, _, next) => {
//     if (!roles.includes(req.user?.role || "")) {
//       throw new ApiError(
//         401,
//         `${req.user?.role} is not allowed to access this resource`,
//       );
//     }
//     next();
//   });
// };

// export { verifyJWT, authorizeRoles };
