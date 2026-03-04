const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const dataPath = path.join(__dirname, "data", "components.json");

const loadComponentsData = () => JSON.parse(fs.readFileSync(dataPath, "utf-8"));

const buildStore = {
  components: {},
  total: 0
};

const recalcTotal = () => {
  const items = Object.values(buildStore.components);
  buildStore.total = items.reduce((sum, item) => sum + item.price, 0);
};

const findComponent = (componentsData, type, id) => {
  const list = componentsData[type] || [];
  return list.find((item) => item.id === id);
};

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/components", (req, res) => {
  res.json(loadComponentsData());
});

app.get("/build", (req, res) => {
  const componentsData = loadComponentsData();
  Object.keys(buildStore.components).forEach((type) => {
    const current = buildStore.components[type];
    const latest = findComponent(componentsData, type, current.id);
    if (latest) {
      buildStore.components[type] = latest;
    }
  });
  recalcTotal();
  res.json(buildStore);
});

app.post("/build/add", (req, res) => {
  const { type, id } = req.body;
  if (!type || !id) {
    return res.status(400).json({ error: "type and id are required" });
  }
  const componentsData = loadComponentsData();
  const component = findComponent(componentsData, type, id);
  if (!component) {
    return res.status(404).json({ error: "component not found" });
  }
  buildStore.components[type] = component;
  recalcTotal();
  return res.json(buildStore);
});

app.post("/build/remove", (req, res) => {
  const { type } = req.body;
  if (!type) {
    return res.status(400).json({ error: "type is required" });
  }
  delete buildStore.components[type];
  recalcTotal();
  return res.json(buildStore);
});

app.post("/checkout", (req, res) => {
  const { pricing, payment, addons } = req.body;
  return res.json({
    success: true,
    pricing: pricing || "RegularPricing",
    payment: payment || "UPIPayment",
    addons: addons || [],
    total: buildStore.total
  });
});

app.listen(PORT, () => {
  console.log(`Custom PC Builder running on http://localhost:${PORT}`);
});
