import "dotenv/config";
import { Prisma } from "@prisma/client";
import { prisma, extendedclient } from "../prismaClient.js";
import { manager } from "./modelextensions/manager.extensions.js";
import { founder } from "./modelextensions/founder.extensions.js";
import { admin } from "./modelextensions/admin.extensions.js";
import { user } from "./modelextensions/user.extensions.js";
import { panelMember } from "./modelextensions/panelMember.extensions.js";

const modelextensions = {
  model: {
    $allModels: {
      async exists(where) {
        const context = Prisma.getExtensionContext(this);
        const result = await context.findFirst({ where });
        return result !== null;
      },
    },
    founder,
    admin,
    manager,
    user,
    panelMember,
  },
};

export default modelextensions;
