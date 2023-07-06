import { MythicalWeaponsStore, Weapon } from "../mythical_weapons";

const store = new MythicalWeaponsStore();

describe("Mythical Weapons Model", () => {
  it("should have index method", () => {
    expect(store.index).toBeDefined();
  });
  it("index method should return a list of products", async () => {
    const result = await store.index();
    expect(result).not.toEqual([]);
  });
  it("create method should add a weapon", async () => {
    const res: Weapon = {
      id: 1,
      name: "Bridge",
      type: "children",
    };
    const result = await store.create({
      id: 1,
      name: "Bridge",
      type: "children",
    });
    expect(result).toEqual(res);
  });
  it("show method should return the correct product", async () => {
    const res: Weapon = {
      id: 1,
      name: "Bridge",
      type: "children",
    };
    const result = await store.show("1");
    expect(result).toEqual(res);
  });

  //   it('delete method should remove the product', async () => {
  //     store.delete("1");
  //     const result = await store.index()
  //     expect(result).toEqual([]);
  //   });
});
