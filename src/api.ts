import { Router } from "./deps.ts";

import * as planets from "./models/planets.ts";
import * as launches from "./models/launches.ts";

const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = `
    8b,dPPYba,  ,adPPYYba, ,adPPYba, ,adPPYYba,  
    88P'   '"8a ""     'Y8 I8[    "" ""     'Y8  
    88       88 ,adPPPPP88  '"Y8ba,  ,adPPPPP88  
    88       88 88,    ,88 aa    ]8I 88,    ,88  
    88       88 '"8bbdP"Y8 '"YbbdP"' '"8bbdP"Y8  
                Mission Control API
    `;
});

router.get("/planets", (ctx) => {
  ctx.response.body = planets.getAllPlanets();
});

router.get("/launches", (ctx) => {
  ctx.response.body = launches.getAll();
});

router.get("/launches/:id", (ctx) => {
  if (ctx.params?.id) {
    const launchesList = launches.getOne(Number(ctx.params.id));
    launchesList
      ? (ctx.response.body = launchesList)
      : ctx.throw(400, "Launch with that ID doesn't exist");
  }
});

router.delete("/launches/:id", (ctx) => {
  if (ctx.params?.id) {
    const result = launches.removeOne(Number(ctx.params.id));
    ctx.response.body = { success: result };
  }
});

router.post("/launches", async (ctx) => {
  const launch = await ctx.request.body().value;

  if (!!launch) {
    launches.addOne(launch);
  }

  ctx.response.body = { success: true };
  ctx.response.status = 201;
});

export default router;
